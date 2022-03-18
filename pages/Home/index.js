
import React, { Component } from 'react';
import Collapsibles from '../../components/Collapsibles';
import Web3ModalButton from '../../components/Web3ModalButton';
console.log(Web3ModalButton)
import CzfLogo from '../../public/static/assets/images/czflogo.png';
import CzusdLogo from '../../public/static/assets/images/czusd.png';
import CznumisLogo from '../../public/static/assets/logo.png';
import "./index.module.scss";
const CZUSD = "0xE68b79e51bf826534Ff37AA9CeE71a3842ee9c70";
const CZF = "0x7c1608C004F20c3520f70b924E2BfeF092dA0043";
const CZF_CZUSD_LP = "0x98b5f5e7ec32cda1f3e89936c9972f92296afe47";
const TWITTER = "https://twitter.com/zodiacs_c";
const TELEGRAM = "https://t.me/CZodiacofficial";
const CZUSD_AUTOFARM_STAKE = "https://autofarm.network/bsc/602/";
const CZUSD_ELLIPSIS_POOL = "https://ellipsis.finance/pool/0";
const CZODIAC_NFT = "0x6Bf5843b39EB6D5d7ee38c0b789CcdE42FE396b4";


class BackToTop extends Component {
    render() {
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
  }

  class Home extends Component {
    render() {
      return (<>
        <section id="top" className="hero is-fullheight has-background-gradient">
            <div>
                <div className="hero-head">
                    <Web3ModalButton />
                </div>
                <div className="mt-3">
                    <a href="https://numis.cz.cash">
                      <figure className="image is-64x64 is-rounded m-0 is-pulled-left ml-5 mr-5" style={{display:"inline-block",top:"2px",position:"relative"}}>
                          <img src={CznumisLogo} />
                      </figure>
                    </a>
                    <p className="title ml-5">CZ Numismatics</p>
                    <p className="subtitle is-size-6 mr-5 " >Seamless & secured coin collecting with each NFT 1:1 uniquely backed.</p>
                </div>
            </div>
        </section>
        
        <footer id="footer" className="footer is-dark">
          <div className="content has-text-centered">
            <p>
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
            </p>
            <p>
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
            </p>
            <br/>
            <p>
              <strong>Legal Disclaimer</strong><br/>
              <span className="is-size-7">
                Nothing on this site or on related channels should be considered a promise by anyone, including but not limited to the developers and promoters of this site, to perform work to generate profits for anyone including but not limited to the following: the users of this site; FairTribe community members; CZF holders; CZUSD holders; or anyone using any of the sites, smart contracts, social media channels, and any other media or tech related to CZF, CZUSD, and CZodiac or any of the community members. CZodiac, CZF, CZUSD, czodiac.com, cz.cash, cz.farm, and related technologies plus media are all experimental and must be used according to your personal financial situation and risk profile. There are no guarantees of profits, but the smart contracts are guaranteed to perform as written on the BSC blockchain.
                </span>
              </p>
            <p>
              <strong>Contact</strong><br/>
              team@czodiac.com
            </p>
          </div>
        </footer>
      </>);
    }
}

export default Home
