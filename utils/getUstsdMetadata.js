import { memoize } from 'lodash';
import { Contract, utils, BigNumber} from "ethers";
import { getIpfsJson } from "./getIpfsJson";
import USTSDAbi from "../abi/USTSD.json";
import USTSDPriceOracleAbi from "../abi/USTSDPriceOracle.json";
import { ADDRESS_USTSD, ADDRESS_USTSD_PRICE_ORACLE } from '../constants/addresses';
const {Interface} = utils;

const getUstsdMetadataSingle = memoize(async (id,USTSD,USTSDPriceOracle) => {
    try{
        const results = await Promise.all([
            USTSD.ownerOf(id),
            USTSD.tokenURI(id),
            USTSD.serial(id),
            USTSDPriceOracle.getCoinNftPriceCents(ADDRESS_USTSD,id)
        ])
        if(!results[1]) throw new Error("no tokenURI metadata")
        const ipfsMetadata = await getIpfsJson(results[1]);
        if(!ipfsMetadata.image) throw new Error("no tokenURI image")
        return {
            owner:results[0],
            tokenURI:results[1],
            serial:results[2],
            price:results[3]/100,
            ...ipfsMetadata
        }
    } catch(err) {
        console.log("USTSD",id,"err:",err)
        return {isErr:true,err:"Failed to load token ID "+id}
    }
});

//NOTE: Only works for nft that starts with id#0 and increments
//callbacak accepts index, result.
export const getUstsdMetadata = ((library,cb) => {
    let isCanceled = false;
    let cancel = () => isCanceled = true;
    (async ()=>{
        const USTSD = new Contract(
            ADDRESS_USTSD,
            new Interface(USTSDAbi),
            library
        );
        const USTSDPriceOracle = new Contract(
            ADDRESS_USTSD_PRICE_ORACLE,
            new Interface(USTSDPriceOracleAbi),
            library
        );
        let totalSupply;
        try{
            totalSupply = (await USTSD.totalSupply()).toNumber();
        }catch(err){
            return;
        }
        if(isCanceled) return;
        for(let i = 0; i<totalSupply; i++) {
            let result = await getUstsdMetadataSingle(i,USTSD,USTSDPriceOracle);
            if(result.isErr){
                getUstsdMetadataSingle.cache.delete(i);
                i--;
            } else{
                result.id = i;
                console.log(result)
                cb(i,result)
                await new Promise(r => setTimeout(r, 150*(Math.random()+0.5)));
            }
            if(isCanceled) break;
        }
    })();
    return cancel;
});