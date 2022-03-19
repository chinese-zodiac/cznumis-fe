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
        const ipfsMetadata = await getIpfsJson(results[1]);
        return {
            owner:results[0],
            tokenURI:results[1],
            serial:results[2],
            price:results[3]/100,
            ...ipfsMetadata
        }
    } catch(err) {
        console.log("USTSD",id,"err:",err)
        return {err:"Failed to load token ID "+id}
    }
});

//NOTE: Only works for nft that starts with id#0 and increments
export const getUstsdMetadata = ((library) => {
    console.log("Running getUstsdMetadata...")
    console.log(library)
    let result = [];
    (async ()=>{
        console.log("Running getUstsdMetadata async...")
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
        const totalSupply = (await USTSD.totalSupply()).toNumber();
        console.log("Total supply", totalSupply)
        for(let i = 0; i<totalSupply; i++) {
            result[i] = await getUstsdMetadataSingle(i,USTSD,USTSDPriceOracle);
            console.log(result)
        }
    })()
    return result;
});