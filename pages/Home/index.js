
import React, { Component, useEffect, useState } from 'react';
import Collapsibles from '../../components/Collapsibles';
import Web3ModalButton from '../../components/Web3ModalButton';
import CzfLogo from '../../public/static/assets/images/czflogo.png';
import CzusdLogo from '../../public/static/assets/images/czusd.png';
import CznumisLogo from '../../public/static/assets/logo.png';
import "./index.module.scss";
import {getIpfsUrl} from '../../utils/getIpfsJson';
import {getUstsdMetadata} from '../../utils/getUstsdMetadata';
import { useEthers, shortenAddress, useLookupAddress, useChainMeta, useChainState  } from '@usedapp/core'
import { get } from 'lodash';
import { utils } from 'ethers'
const CZUSD = "0xE68b79e51bf826534Ff37AA9CeE71a3842ee9c70";
const CZF = "0x7c1608C004F20c3520f70b924E2BfeF092dA0043";
const CZF_CZUSD_LP = "0x98b5f5e7ec32cda1f3e89936c9972f92296afe47";
const TWITTER = "https://twitter.com/zodiacs_c";
const TELEGRAM = "https://t.me/CZodiacofficial";
const CZUSD_AUTOFARM_STAKE = "https://autofarm.network/bsc/602/";
const CZUSD_ELLIPSIS_POOL = "https://ellipsis.finance/pool/0";
const CZODIAC_NFT = "0x6Bf5843b39EB6D5d7ee38c0b789CcdE42FE396b4";

function BackToTop() {
  return(
    <div className="has-text-right mr-3 mb-3 mt-3 is-size-7">
      <a href="#" className="button is-small is-outlined is-rounded">
        <span style={{padding:"0"}}>back to top</span>
        <span className="icon" style={{position:'relative',top:"-0.1em",left:"-0.15em"}}>
          <i className="fas fa-angles-up"></i>
        </span>
      </a>
    </div>
  )
}

 function Home() {
  const {account,library,chainId} = useEthers();
  const [nftMetadata,setNftMetadata] = useState([])
  const [loadingNftId,setLoadingNftId] = useState(0);
  const [viewWallet,setViewWallet] = useState("");
  useEffect(()=>{
    if(!library) return;
    let cancel = getUstsdMetadata(library,(i,res)=>{
      setNftMetadata((prevNftMetadata)=>{
        let newNftMetadata = [...prevNftMetadata]
        newNftMetadata[i] = res;
        return newNftMetadata;
      });
      setLoadingNftId(i);
    });
    return ()=>cancel();
  },[chainId,library])
  return (<>
    <section id="top" className="hero is-fullheight has-background-gradient has-text-centered">
        <div>
            <div className="hero-head has-text-left">
                <Web3ModalButton />
              <div className="mt-3">
                  <a href="https://numis.cz.cash">
                    <figure className="image is-64x64 is-rounded m-0 is-pulled-left ml-5 mr-5 mb-5" style={{display:"inline-block",top:"2px",position:"relative"}}>
                        <img src={CznumisLogo} />
                    </figure>
                  </a>
                  <p className="title ml-5">CZ Numismatics</p>
                  <p className="subtitle is-size-6 mr-5 " >Collect rare US coinage with 1:1 backed NFTs. Kept in trust with <a target="_blank" className="is-underlined" href="https://rafalovichcoins.com/nfts">Rafalovich Coins</a> and redeemable.</p>
              </div>
              <div className="is-clearfix"></div>
            </div>
            <div className='hero-body p-4'>
              <div className="container">
                <div className="container">
                  <input class="input" type="text" style={{textAlign:"left",fontFamily:"monospace",maxWidth:"27em"}} placeholder={account} value={viewWallet} onChange={
                    (event)=>{
                      let val = event.target.value;
                      if(utils.isAddress(val)) setViewWallet(val);
                    }
                  }/><br/>
                  <div class="buttons has-addons mt-3 has-text-centered" style={{display:"inline-block"}}>
                  <button className="button is-primary is-rounded is-outlined " onClick={()=>setViewWallet("0x70e1cB759996a1527eD1801B169621C18a9f38F9")}>View Reserves</button>
                  <button className="button is-primary is-rounded is-outlined " onClick={()=>setViewWallet(account)}>View Yours</button>
                  <button className="button is-primary is-rounded is-outlined " onClick={()=>setViewWallet("")}>View All</button>
                  </div><br/>
                </div>
                <p>
                  USTSD Loaded: {loadingNftId+1}
                </p>
                {nftMetadata.filter(nft=> !viewWallet ? true : viewWallet.toUpperCase()==nft.owner.toUpperCase()).map((nft,index)=>{
                  return(<div key={index} className="container m-2" 
                  style={{display:"inline-block",border:"solid #9c968a",background:"white"}}
                  >
                  <a href={getIpfsUrl(nft.image,index)} target="_blank">
                    <figure className="image is-256x256 m-2" style={{width:"256px",display:"inline-block"}}>
                        <img src={getIpfsUrl(nft.image,index)} />
                    </figure>
                  </a>
                  <p className="has-text-left pl-4 pb-2 is-size-7" > ${nft.price.toFixed(2)} SN:{nft.serial} (#{nft.id}) <span className='is-underlined' style={{cursor:"pointer"}} onClick={()=>setViewWallet(nft.owner)}>{shortenAddress(nft.owner)}</span></p>
                </div>)})}
              </div>
            </div>
        </div>
    </section>
    
    <footer id="footer" className="footer is-dark">
      <div className="content has-text-centered">
        <div>
          <a className="m-2 mr-4" href={"https://bscscan.com/token/"+CZF} target="_blank">
            <figure className="image is-16x16 is-rounded m-0" style={{display:"inline-block",top:"2px",position:"relative"}}>
                <img src={CzfLogo} />
            </figure>
          </a>
          <a className="m-2 mr-3" href={"https://bscscan.com/token/"+CZUSD} target="_blank">
            <figure className="image is-16x16 is-rounded m-0" style={{display:"inline-block",top:"2px",position:"relative"}}>
                <img src={CzusdLogo} />
            </figure>
          </a>
          <a className="m-2" href={TELEGRAM} target="_blank">
            <span className="icon"><i className="fa-brands fa-telegram"></i></span>
          </a>
          <a className="m-2" href={TWITTER} target="_blank">
            <span className="icon"><i className="fa-brands fa-twitter"></i></span>
          </a>
          <a className="m-2" href="https://czodiacs.medium.com/" target="_blank">
            <span className="icon"><i className="fa-brands fa-medium"></i></span>
          </a>
          <a className="m-2" href="https://github.com/chinese-zodiac" target="_blank">
            <span className="icon"><i className="fa-brands fa-github"></i></span>
          </a>
          <a className="m-2" href="https://discord.gg/nzHjq6Vewd" target="_blank">
            <span className="icon"><i className="fa-brands fa-discord"></i></span>
          </a>
          <a className="m-2" href="https://czodiac.gitbook.io/czodiac-litepapper" target="_blank">
            <span className="icon"><i className="fa-solid fa-book"></i></span>
          </a>
        </div>
        <div className="container has-text-centered ">
            <a className="button is-rounded m-1 is-small" href="https://cz.cash" target="_blank">
                <span className="icon">
                    <i className="fa-solid fa-arrow-right-arrow-left" style={{position:'relative',top:"-0.1em",left:"0.1em"}}></i>
                </span>
                <span style={{padding:"0"}}>cz.cash</span>
            </a>
            <a className="button is-rounded m-1 is-small" href="https://cz.farm" target="_blank">
                <span className="icon">
                    <i className="fa-solid fa-tractor" style={{position:'relative',top:"-0.1em",left:"0.1em"}}></i>
                </span>
                <span style={{padding:"0"}}>cz.farm</span>
            </a>
            <a className="button is-rounded m-1 is-small" href="https://app.czodiac.com" target="_blank">
                <span className="icon">
                    <i className="fa-solid fa-box-archive" style={{position:'relative',top:"-0.1em",left:"0.1em"}}></i>
                </span>
                <span style={{padding:"0"}}>v1 dapp</span>
            </a>
        </div>
        <br/>
        <div>
          <p>            
          <strong>Prices</strong><br/>
            For convenience, all CZodiac treasury prices are set by its on-chain price oracle fed by <a className='is-underline' href="https://www.pcgs.com/prices/detail/morgan-dollar/744/most-active">PCGS</a>. Coins are not PCGS certified unless identified otherwise.
          </p>
          <p>
            <strong>Ownership Rights</strong><br/>
            Each NFT has a unique serial number representing its documented and graded physical coin held in trust by <a target="_blank" className="is-underlined" href="https://rafalovichcoins.com/nfts">Rafalovich Coins</a>. When you purchase the NFT, you get copyright and redemption rights as set by Rafalovich Coins. The NFTs may be redeemed for the physical coin; to do so, you will need to burn the NFT and pay a handling fee. Contact <a target="_blank" className="is-underlined" href="https://rafalovichcoins.com/">Rafalovich Coins</a> for additional information on redemption and copyright policies.
          </p>
          <strong>Legal Disclaimer</strong><br/>
          <span className="is-size-7">
            Nothing on this site or on related channels should be considered a promise by anyone, including but not limited to the developers and promoters of this site, to perform work to generate profits for anyone including but not limited to the following: the users of this site; FairTribe community members; CZF holders; CZUSD holders; or anyone using any of the sites, smart contracts, social media channels, and any other media or tech related to CZF, CZUSD, and CZodiac or any of the community members. CZodiac, CZF, CZUSD, czodiac.com, cz.cash, cz.farm, and related technologies plus media are all experimental and must be used according to your personal financial situation and risk profile. There are no guarantees of profits, but the smart contracts are guaranteed to perform as written on the BSC blockchain.
          </span>
        </div>
        <p>
          <strong>Contact</strong><br/>
          team@czodiac.com
        </p>
      </div>
    </footer>
  </>);
}

export default Home
