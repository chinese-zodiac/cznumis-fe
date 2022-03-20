import IPFSGatewayTools from '@pinata/ipfs-gateway-tools/dist/node';
import fetchRetry from './fetchRetry';
import { memoize, random } from 'lodash';

const gatewayTools = new IPFSGatewayTools();
const gateways = [
    "https://ipfs.fleek.co",
    "https://cloudflare-ipfs.com",
    //"https://ipfs.azurewebsites.net",
]

export const getIpfsUrl = (sourceUrl,cycle=0) => {
    return gatewayTools.convertToDesiredGateway(sourceUrl, gateways[cycle%gateways.length]);
}

let cycle = 0;
export const getIpfsJson = memoize(async (sourceUrl) => {
    cycle++;
    return (await fetchRetry(
        getIpfsUrl(sourceUrl, cycle)
    )).json();
})