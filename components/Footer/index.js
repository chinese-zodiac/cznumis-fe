import React from 'react';
import { ADDRESS_CZF, ADDRESS_CZUSD } from '../../constants/addresses';
import { SOCIAL_TELEGRAM, SOCIAL_TWITTER } from '../../constants/social';
import CzfLogo from '../../public/static/assets/images/czflogo.png';
import CzusdLogo from '../../public/static/assets/images/czusd.png';

function Footer() {
  return (<footer id="footer" className="footer is-dark">
    <div className="content has-text-centered">
      <div>

        <h1 style={{ maxWidth: '720px', marginLeft: 'auto', marginRight: 'auto' }}>Persons under US Jurisdiction must not use NUMIS.CZ.CASH or other CZODIAC dapps, tokens, or services.</h1>
        <p style={{ maxWidth: '720px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '5em' }}>All persons under US jurisdiction must not use CZODIAC dapps, tokens, or services. It is your responsibility to determine if you are under US jurisdiction and remove yourself from the project as czodiac does not have the capability to do so.</p>
      </div>
      <div>
        <a className="m-2 mr-4" href={"https://bscscan.com/token/" + ADDRESS_CZF} target="_blank">
          <figure className="image is-16x16 is-rounded m-0" style={{ display: "inline-block", top: "2px", position: "relative" }}>
            <img src={CzfLogo} />
          </figure>
        </a>
        <a className="m-2 mr-3" href={"https://bscscan.com/token/" + ADDRESS_CZUSD} target="_blank">
          <figure className="image is-16x16 is-rounded m-0" style={{ display: "inline-block", top: "2px", position: "relative" }}>
            <img src={CzusdLogo} />
          </figure>
        </a>
        <a className="m-2" href={SOCIAL_TELEGRAM} target="_blank">
          <span className="icon"><i className="fa-brands fa-telegram"></i></span>
        </a>
        <a className="m-2" href={SOCIAL_TWITTER} target="_blank">
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
            <i className="fa-solid fa-arrow-right-arrow-left" style={{ position: 'relative', top: "-0.1em", left: "0.1em" }}></i>
          </span>
          <span style={{ padding: "0" }}>cz.cash</span>
        </a>
        <a className="button is-rounded m-1 is-small" href="https://cz.farm" target="_blank">
          <span className="icon">
            <i className="fa-solid fa-tractor" style={{ position: 'relative', top: "-0.1em", left: "0.1em" }}></i>
          </span>
          <span style={{ padding: "0" }}>cz.farm</span>
        </a>
        <a className="button is-rounded m-1 is-small" href="https://app.czodiac.com" target="_blank">
          <span className="icon">
            <i className="fa-solid fa-box-archive" style={{ position: 'relative', top: "-0.1em", left: "0.1em" }}></i>
          </span>
          <span style={{ padding: "0" }}>v1 dapp</span>
        </a>
      </div>
      <br />
      <div>
        <p>
          <strong>Prices</strong><br />
          For convenience, all CZodiac treasury prices are set by its on-chain price oracle fed by <a className='is-underline' href="https://www.pcgs.com/prices/detail/morgan-dollar/744/most-active">PCGS</a>. Coins are not PCGS certified unless identified otherwise.
        </p>
        <p>
          <strong>Ownership Rights</strong><br />
          Each NFT has a unique serial number representing its documented and graded physical coin held in trust by <a target="_blank" className="is-underlined" href="https://rafalovichcoins.com/nfts">Rafalovich Coins</a>. When you purchase the NFT, you get copyright and redemption rights as set by Rafalovich Coins. The NFTs may be redeemed for the physical coin; to do so, you will need to burn the NFT and pay a handling fee. Contact <a target="_blank" className="is-underlined" href="https://rafalovichcoins.com/">Rafalovich Coins</a> for additional information on redemption and copyright policies.
        </p>
        <strong>Legal Disclaimer</strong><br />
        <span className="is-size-7">
          Nothing on this site or on related channels should be considered a promise by anyone, including but not limited to the developers and promoters of this site, to perform work to generate profits for anyone including but not limited to the following: the users of this site; FairTribe community members; CZF holders; CZUSD holders; or anyone using any of the sites, smart contracts, social media channels, and any other media or tech related to CZF, CZUSD, and CZodiac or any of the community members. CZodiac, CZF, CZUSD, czodiac.com, cz.cash, cz.farm, and related technologies plus media are all experimental and must be used according to your personal financial situation and risk profile. There are no guarantees of profits, but the smart contracts are guaranteed to perform as written on the BSC blockchain.
        </span>
      </div>
      <p>
        <strong>Contact</strong><br />
        team@czodiac.com
      </p>
    </div>
  </footer>);
}

export default Footer;