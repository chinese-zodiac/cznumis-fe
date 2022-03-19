import IPFSGatewayTools from '@pinata/ipfs-gateway-tools/dist/node';
import fetchRetry from './fetchRetry';
import { memoize } from 'lodash';

const gatewayTools = new IPFSGatewayTools();

export const getIpfsUrl = (sourceUrl) => {
    return gatewayTools.convertToDesiredGateway(sourceUrl, "https://gateway.pinata.cloud");
}

export const getIpfsJson = memoize(async (sourceUrl) => {
    console.log("Not Memoized:")
    return (await fetchRetry(
        getIpfsUrl(sourceUrl)
    )).json();
})