import IPFSGatewayTools from '@pinata/ipfs-gateway-tools/dist/node';
import fetchRetry from './fetchRetry';
import { memoize } from 'lodash';

const gatewayTools = new IPFSGatewayTools();

export const getIpfsUrl = (sourceUrl) => {
    return gatewayTools.convertToDesiredGateway(sourceUrl, "https:/ipfs.fleek.co");
}

export const getIpfsJson = memoize(async (sourceUrl) => {
    return (await fetchRetry(
        getIpfsUrl(sourceUrl)
    )).json();
})