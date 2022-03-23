import { memoize } from 'lodash';
import { Contract, Provider} from "ethcall";
import { utils, BigNumber} from "ethers";
import { getIpfsJson } from "./getIpfsJson";
import USTSDAbi from "../abi/USTSD.json";
import USTSDPriceOracleAbi from "../abi/USTSDPriceOracle.json";
import { ADDRESS_USTSD, ADDRESS_USTSD_PRICE_ORACLE } from '../constants/addresses';
const {Interface} = utils;

const epoch = () => {
    return new Date()/1000;;
}

const getUstsdMetadataSet = memoize(async (startId,batchSize,multicallProvider,USTSD,USTSDPriceOracle,cb) => {
    let initEpoch = epoch();
    let calls = Array(batchSize).fill(null).map((_,i)=>{
        let id = startId + i;
        return [
            USTSD.ownerOf(id),
            USTSD.tokenURI(id),
            USTSD.serial(id),
            USTSDPriceOracle.getCoinNftPriceCents(ADDRESS_USTSD,id)
        ]
    }).flat(1);
    try{
        const multicallResults = await multicallProvider.all(calls);
        let results = Array(batchSize).fill(null).map((_,i)=>{
            let o = i*4;
            if(!multicallResults[o+1]) throw new Error("no tokenURI metadata")
            return {
                id:multicallResults+i,
                owner:multicallResults[o+0],
                tokenURI:multicallResults[o+1],
                serial:multicallResults[o+2],
                price:multicallResults[o+3]/100
            }
        });
        for(let i=0; i<results.length; i++) {
            let ipfsMetadata = await getIpfsJson(results[i].tokenURI);
            console.log(ipfsMetadata.image);
            if(!ipfsMetadata.image) throw new Error("no tokenURI image");
            results[i] = {...results[i],...ipfsMetadata}
            cb(i+startId,results[i]);
        }
        return results;
    } catch(err) {
        console.log("USTSD",startId,"err:",err)
        return {isErr:true,err:"Failed to load token ID "+startId}
    }
});

//NOTE: Only works for nft that starts with id#0 and increments
//callbacak accepts index, result.
export const getUstsdMetadata = ((library,cb) => {
    let isCanceled = false;
    let cancel = () => isCanceled = true;
    (async ()=>{
        const multicallProvider = new Provider();
        await multicallProvider.init(library);
        const USTSD = new Contract(
            ADDRESS_USTSD,
            USTSDAbi
        );
        const USTSDPriceOracle = new Contract(
            ADDRESS_USTSD_PRICE_ORACLE,
            USTSDPriceOracleAbi
        );
        let totalSupply;
        try{
            totalSupply = (await multicallProvider.all([USTSD.totalSupply()]))[0].toNumber();
        }catch(err){
            console.log("TotalSupply err:",err)
            return;
        }
        if(isCanceled) return;
        let increment = 25;
        for(let i = 0; i<totalSupply; i+=increment) {
            let batchSize = i+increment<totalSupply ? increment : totalSupply-i;
            let results = await getUstsdMetadataSet(i,batchSize,multicallProvider,USTSD,USTSDPriceOracle,cb);
            if(results.isErr){
                getUstsdMetadataSet.cache.delete(i);
                i-=increment;
            } else{
                results.forEach((val,j)=>{
                    cb(i+j,val);
                })
            }
            if(isCanceled) break;
        }
    })();
    return cancel;
});