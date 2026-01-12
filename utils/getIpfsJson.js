import { memoize } from 'lodash';

const gateways = [
    "https://ipfs.czodiac.com",
    "https://czodiac.mypinata.cloud",
    "https://cloudflare-ipfs.com",
    "https://dweb.link",
    "https://ipfs.io",
    "https://w3s.link"
]

const MAX_RETRIES = gateways.length * 2; // Try each gateway twice before giving up

// Convert IPFS URL to use a specific gateway
const convertToGateway = (sourceUrl, gateway) => {
    if (!sourceUrl) return sourceUrl;
    
    // Handle ipfs:// protocol
    if (sourceUrl.startsWith('ipfs://')) {
        const cid = sourceUrl.replace('ipfs://', '');
        return `${gateway}/ipfs/${cid}`;
    }
    
    // Handle already gateway URLs - extract CID and use new gateway
    const ipfsMatch = sourceUrl.match(/\/ipfs\/([^/?#]+)/);
    if (ipfsMatch) {
        const cid = ipfsMatch[1];
        const path = sourceUrl.split(ipfsMatch[0])[1] || '';
        return `${gateway}/ipfs/${cid}${path}`;
    }
    
    // Return as-is if not an IPFS URL
    return sourceUrl;
}

export const getIpfsUrl = (sourceUrl, cycle = 0) => {
    return convertToGateway(sourceUrl, gateways[cycle % gateways.length]);
}

export const getIpfsJson = memoize(async (sourceUrl) => {
    if (typeof window === 'undefined') {
        // Server-side: just fetch without localStorage
        return await fetchWithRetry(sourceUrl);
    }
    
    let s = window.localStorage;
    try {
        let item = JSON.parse(s.getItem(sourceUrl));
        if (item != null) return item;
    } catch {
        // Invalid JSON in localStorage, continue to fetch
    }

    const item = await fetchWithRetry(sourceUrl);
    if (item) {
        try {
            s.setItem(sourceUrl, JSON.stringify(item));
        } catch {
            // localStorage might be full, continue anyway
        }
    }
    return item;
})

async function fetchWithRetry(sourceUrl) {
    let cycle = 0;
    let lastError = null;
    
    while (cycle < MAX_RETRIES) {
        try {
            const url = getIpfsUrl(sourceUrl, cycle);
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
            
            const result = await fetch(url, { signal: controller.signal });
            clearTimeout(timeoutId);
            
            if (!result.ok) {
                throw new Error(`HTTP ${result.status}`);
            }
            
            return await result.json();
        } catch (err) {
            lastError = err;
            cycle++;
            // Small delay before retry
            await new Promise(r => setTimeout(r, 500));
        }
    }
    
    console.error('Failed to fetch IPFS content after', MAX_RETRIES, 'retries:', sourceUrl, lastError);
    return null;
}