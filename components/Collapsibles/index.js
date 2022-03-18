import React, { Component } from 'react';
import bulmaAccordion from 'bulma-accordion';

class Collapsibles extends Component {
  componentDidMount() {
    bulmaAccordion.attach();
  }

  render() {
    return (
     <section class="accordions has-text-left">
      <article class="accordion">
        <div class="accordion-header toggle">
          <p>Q1: What is KYIV?</p>
        </div>
        <div class="accordion-body has-background-white-ter">
          <div class="accordion-content">
            KYIV is a charity token with 2% of each buy and sell generating CZUSD rewards for the Ukrainian official donation wallet. An additional 1% of each transaction is distributed to KYIV holders automatically.
            KYIV is a deflationary token with 1% of sells only burned. KYIV has no team tokens, insider tokens, or presale. 100% of the supply is distributed from an initial fair launch on the KYIV/CZUSD pair.
            The total and circulating supply of KYIV is 43 million at launch.<br/>
            CA: {this.props.KYIV}
          </div>
        </div>
      </article>
      <article class="accordion">
        <div class="accordion-header toggle">
          <p>Q2: What is CZUSD?</p>
        </div>
        <div class="accordion-body has-background-white-ter">
          <div class="accordion-content">
            CZUSD is a stablecoin backed by a basket of stablecoin yield assets. It is the primary token used by FairTribe for funding new launches. CZUSD is operated by CZodiac, a community project dedicated to innovative defi products.
            CZUSD has over $200k in liquidity on Pancakeswap. Additionally, it has an "A" rating of 10 on Ellipsis generating an effective liquidity of over $2.3 million.<br/>
            CA: {this.props.CZUSD}
          </div>
        </div>
      </article>
      <article class="accordion">
        <div class="accordion-header toggle">
          <p>Q3: How do I collect my CZUSD rewards?</p>
        </div>
        <div class="accordion-body has-background-white-ter">
          <div class="accordion-content">
            CZUSD rewards are automatically distributed once the contract collects enough gas. You may also manually&nbsp;
            <a class="is-underlined" href={this.props.CLAIM_REWARDS} target="_blank">
              claim
            </a>.
          </div>
        </div>
      </article>
      <article class="accordion">
        <div class="accordion-header toggle">
          <p>Q4: What slippage is best?</p>
        </div>
        <div class="accordion-body has-background-white-ter">
          <div class="accordion-content">
            You should set your slippage to at least 3% on buys and 4% on sells. However, when there is a lot of volume you may need to set a higher slippage.
          </div>
        </div>
      </article>
      <article class="accordion">
        <div class="accordion-header toggle">
          <p>Q5: Why cant I trade BNB for KYIV?</p>
        </div>
        <div class="accordion-body has-background-white-ter">
          <div class="accordion-content">
            Pancakeswap does not yet route trades through CZUSD. You should buy CZUSD first on Pancakeswap or Ellipsis then trade CZUSD for KYIV.
          </div>
        </div>
      </article>
      <article class="accordion">
        <div class="accordion-header toggle">
          <p>Q6: What is the contract address?</p>
        </div>
        <div class="accordion-body has-background-white-ter">
          <div class="accordion-content">
            KYIV CA: {this.props.KYIV}<br/>
            CZUSD CA: {this.props.CZUSD}
          </div>
        </div>
      </article>
      <article class="accordion">
        <div class="accordion-header toggle">
          <p>Q7: Will there be other utility?</p>
        </div>
        <div class="accordion-body has-background-white-ter">
          <div class="accordion-content">
            KYIV is a community project. As the community is strongly focused on assisting Ukraine, additional utility may be developed if the community volunteers choose to add it.
            Some ideas include fundraising NFTs, metaverse gaming fundraisers, and partnerships.
          </div>
        </div>
      </article>
      <article class="accordion">
        <div class="accordion-header toggle">
          <p>Q8: Who is the team?</p>
        </div>
        <div class="accordion-body has-background-white-ter">
          <div class="accordion-content">
            Our team of volunteers is doxxed. There are no team tokens or payments to the team.<br/>
            xCrypto, CEO, tg @TurnipCrypto<br/>
            Plastic Digits, CTO, tg @PlasticDigits<br/>
            t4c0, COO, tg @t4c0s0x<br/>
            Sai, CM, tg @IAS221
          </div>
        </div>
      </article>
      <article class="accordion">
        <div class="accordion-header toggle">
          <p>Q9: Why are you using CZUSD?</p>
        </div>
        <div class="accordion-body has-background-white-ter">
          <div class="accordion-content">
            FairTribe provided an initial donation of $50k in CZUSD to seed our initial liquidity. By using this donation, KYIV does not need to have any presale or insiders to fund the initial liquidity.
          </div>
        </div>
      </article>
      <article class="accordion">
        <div class="accordion-header toggle">
          <p>Q10: What is the total supply?</p>
        </div>
        <div class="accordion-body has-background-white-ter">
          <div class="accordion-content">
            As a FairTribe launch, 100% of the supply is circulating and started in the initial liquidity pool. There are no locked tokens, team distribution, or insiders. The initial supply is 43 million representing the population of Ukraine. The supply will gradually decrease due to the 1% burn on sells.
          </div>
        </div>
      </article>
      <article class="accordion">
        <div class="accordion-header toggle">
          <p>Q11: How can donations be audited?</p>
        </div>
        <div class="accordion-body has-background-white-ter">
          <div class="accordion-content">
            The 2% rewards for donation are collected by the deployer wallet as CZUSD. This CZUSD is then exchanged for USDT which is sent via a bridge to the Ethereum donation address publicly posted and verified by Ukraine. An audit log is available on request.
          </div>
        </div>
      </article>
      <article class="accordion">
        <div class="accordion-header toggle">
          <p>Q12: Is the wallet the real Ukraine one?</p>
        </div>
        <div class="accordion-body has-background-white-ter">
          <div class="accordion-content">
            Yes, and has been verified by Ukraine multiple times. You can view the <a href="https://etherscan.io/address/0x165cd37b4c644c2921454429e7f9358d18a45e14">wallet on etherscan here</a>. <br/>
            Official Public Verifications:<br/>
            Olex Scherba (Ukrainian Ambassador to Austria): <a href="https://twitter.com/olex_scherba/status/1497601344206557184">Verification Here</a><br/>
            Larry Cermak (The Block): <a href="https://twitter.com/lawmaster/status/1497606008906174470">Verification Here</a><br/>
            Tomicah Tillemann (US State Dept): <a href="https://twitter.com/TomicahTD/status/1497601610775769094">Verification Here</a><br/>
            Connor Stephton (Skynews, Coinmarketcap): <a href="https://twitter.com/ConnorSephton/status/1497605811786461185">Verification Here</a>
          </div>
        </div>
      </article>
    </section>
    )
  }
}


export default Collapsibles;