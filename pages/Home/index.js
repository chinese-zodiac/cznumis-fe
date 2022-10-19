
import React, { Component, useEffect, useState } from 'react';
import Collapsibles from '../../components/Collapsibles';
import Web3ModalButton from '../../components/Web3ModalButton';
import Footer from '../../components/Footer';
import CoinCard from '../../components/CoinCard';
import CzfLogo from '../../public/static/assets/images/czflogo.png';
import CzusdLogo from '../../public/static/assets/images/czusd.png';
import CznumisLogo from '../../public/static/assets/logo.png';
import "./index.module.scss";
import { getIpfsUrl } from '../../utils/getIpfsJson';
import { getUstsdMetadata } from '../../utils/getUstsdMetadata';
import { useEthers, shortenAddress, useCall, useContractFunction, useTokenAllowance, useTokenBalance } from '@usedapp/core'
import { get, set } from 'lodash';
import { utils, Contract } from 'ethers'
import CZUSTSDReservesAbi from "../../abi/CZUSTSD_RESERVES.json";
import USTSDAbi from "../../abi/USTSD.json";
import USTSDPriceOracleAbi from "../../abi/USTSDPriceOracle.json";
import IERC20Abi from "../../abi/IERC20.json";
import { ADDRESS_USTSD, ADDRESS_USTSD_PRICE_ORACLE, ADDRESS_CZUSD, ADDRESS_BUSD, ADDRESS_CZF, ADDRESS_CZF_CZUSD_LP, ADDRESS_USTSD_RESERVES, ADDRESS_ZERO } from '../../constants/addresses';
import { SOCIAL_TWITTER, SOCIAL_TELEGRAM, SOCIAL_AUTOFARM_CZUSD, SOCIAL_ELLIPSIS_CZUSD } from '../../constants/social';
const { formatEther, parseEther, Interface } = utils;

const ADDRESSS_STORAGE_KEY = 'UserWalletAddress';

const czustsdReservesInterface = new Interface(CZUSTSDReservesAbi);
const ustsdInterface = new Interface(USTSDAbi);
const ustsdPriceInterface = new Interface(USTSDPriceOracleAbi);
const IERC20Interface = new Interface(IERC20Abi);

const CONTRACT_BUSD = new Contract(ADDRESS_BUSD, IERC20Interface);
const CONTRACT_USTSD = new Contract(ADDRESS_USTSD, ustsdInterface);
const CONTRACT_USTSD_RESERVES = new Contract(ADDRESS_USTSD_RESERVES, czustsdReservesInterface);

function BackToTop() {
  return (
    <div className="has-text-right mr-3 mb-3 mt-3 is-size-7">
      <a href="#" className="button is-small is-outlined is-rounded">
        <span style={{ padding: "0" }}>back to top</span>
        <span className="icon" style={{ position: 'relative', top: "-0.1em", left: "-0.15em" }}>
          <i className="fas fa-angles-up"></i>
        </span>
      </a>
    </div>
  )
}

function parseEtherCents(_cents) {
  console.log(_cents, parseEther(_cents.toString()).div("100"))
  return parseEther(_cents.toString()).div("100");
}

const sortGradeAscending = (a, b) => a?.serial?.substr(5, 2) - b?.serial?.substr(5, 2);
const sortGradeDescending = (a, b) => b?.serial?.substr(5, 2) - a?.serial?.substr(5, 2);
const sortYearAscending = (a, b) => a?.serial?.substr(0, 4) - b?.serial?.substr(0, 4);
const sortYearDescending = (a, b) => b?.serial?.substr(0, 4) - a?.serial?.substr(0, 4);
const sortIdAscending = (a, b) => a?.id - b?.id;
const sortIdDescending = (a, b) => b?.id - a?.id;


function Home() {
  const { account, library, chainId, activateBrowserWallet } = useEthers();
  const [nftMetadata, setNftMetadata] = useState([])
  const [loadingNftId, setLoadingNftId] = useState(0);
  const [viewWallet, setViewWallet] = useState("");
  const [sorting, setSorting] = useState(() => sortIdAscending); //react invokes lambdas

  const { value: totalSupplyUstsd, error: totalSupplyUstsdErr } = useCall({
    contract: CONTRACT_USTSD,
    method: 'totalSupply',
    args: []
  }) ?? {}

  const { value: ustsdIsApproved, error: ustsdIsApprovedErr } = useCall({
    contract: CONTRACT_USTSD,
    method: 'isApprovedForAll',
    args: [!!account ? account : ADDRESS_ZERO, ADDRESS_USTSD_RESERVES]
  }) ?? {}

  const { state: stateUstsdApproval, send: sendUstsdApproval } = useContractFunction(CONTRACT_USTSD, 'setApprovalForAll');

  const { state: stateBuy, send: sendBuy } = useContractFunction(CONTRACT_USTSD_RESERVES, 'buy');
  const { state: stateSell, send: sendSell } = useContractFunction(CONTRACT_USTSD_RESERVES, 'sell');
  const { state: stateBusdApprove, send: sendBusdApprove } = useContractFunction(CONTRACT_BUSD, 'approve');
  const busdAllowance = useTokenAllowance(ADDRESS_BUSD, account, ADDRESS_USTSD_RESERVES);
  const busdBalance = useTokenBalance(ADDRESS_BUSD, account);
  const czusdBalance = useTokenBalance(ADDRESS_CZUSD, account);

  useEffect(() => {
    if (!library) return;
    let cancel = getUstsdMetadata(library, (i, res) => {
      setNftMetadata((prevNftMetadata) => {
        let newNftMetadata = [...prevNftMetadata]
        newNftMetadata[i] = res;
        return newNftMetadata;
      });
      setLoadingNftId(i);
    });
    return () => cancel();
  }, [chainId])

  useEffect(() => {
    const sessionAddress = localStorage.getItem(ADDRESSS_STORAGE_KEY);
    if (sessionAddress && !account) {
      activateBrowserWallet();
    }
  }, []);

  useEffect(() => {
    if (account) {
      localStorage.setItem(ADDRESSS_STORAGE_KEY, account);
    }
  }, [account]);

  return (<>
    <section id="top" className="hero is-fullheight has-background-gradient has-text-centered">
      <div>
        <div className="hero-head has-text-left">
          <Web3ModalButton busdBalance={busdBalance} czusdBalance={czusdBalance} />
          <div className="mt-3">
            <a href="https://numis.cz.cash">
              <figure className="image is-64x64 is-rounded m-0 is-pulled-left ml-5 mr-5 mb-5" style={{ display: "inline-block", top: "2px", position: "relative" }}>
                <img src={CznumisLogo} />
              </figure>
            </a>
            <p className="title ml-5">CZ Numismatics</p>
            <p className="subtitle is-size-6 mr-5 " >Collect rare US coinage with 1:1 backed NFTs. Kept in trust with <a target="_blank" className="is-underlined" href="https://rafalovichcoins.com/nfts">Rafalovich Coins</a> and redeemable. Taxes: 0% on buy, 12.5% on sell.</p>
          </div>
          <div className="is-clearfix"></div>
        </div>
        <div className='hero-body p-4'>
          <div className="container">
            <div className="container">
              <input className="input" type="text" style={{ textAlign: "left", fontFamily: "monospace", maxWidth: "27em" }} placeholder={account} value={viewWallet} onChange={
                (event) => {
                  let val = event.target.value;
                  if (utils.isAddress(val)) setViewWallet(val);
                }
              } /><br />
              <div className="buttons has-addons mt-3 has-text-centered" style={{ display: "inline-block" }}>
                <button className="button is-primary is-rounded is-outlined " onClick={() => setViewWallet(ADDRESS_USTSD_RESERVES)}>View Reserves</button>
                {!!account && (<button className="button is-primary is-rounded is-outlined " onClick={() => setViewWallet(account)}>View Yours</button>)}
                <button className="button is-primary is-rounded is-outlined " onClick={() => setViewWallet("")}>View All</button>
              </div><br />
            </div>
            <p>
              USTSD All: {loadingNftId + 1} of {totalSupplyUstsd?.toString()} ({!totalSupplyUstsd ? "0" : (Math.round(100 * (loadingNftId + 1) / Number(totalSupplyUstsd.toString())))}%)
              <br />
              Viewing:&nbsp;
              {nftMetadata.filter(nft => !viewWallet ? true : viewWallet.toUpperCase() == nft.owner.toUpperCase()).length}&nbsp;
              (${nftMetadata.filter(nft => !viewWallet ? true : viewWallet.toUpperCase() == nft.owner.toUpperCase()).reduce((prev, curr) => prev + curr.price + 0.99, 0).toFixed(2)})
              <br />
              <button className="button is-small is-inline-block is-primary is-outlined m-0" style={{ width: "140px" }} onClick={() => {
                setSorting(() => sortGradeAscending);
              }}>Sort Grade Ascending</button>
              <button className="button is-small is-inline-block is-primary is-outlined m-0 mr-2" style={{ width: "140px" }} onClick={() => {
                setSorting(() => sortGradeDescending);
              }}>Sort Grade Descending</button>
              <button className="button is-small is-inline-block is-primary is-outlined m-0" style={{ width: "140px" }} onClick={() => {
                setSorting(() => sortIdAscending);
              }}>Sort ID Ascending</button>
              <button className="button is-small is-inline-block is-primary is-outlined m-0 mr-2" style={{ width: "140px" }} onClick={() => {
                setSorting(() => sortIdDescending);
              }}>Sort ID Descending</button>
              <button className="button is-small is-inline-block is-primary is-outlined m-0" style={{ width: "140px" }} onClick={() => {
                setSorting(() => sortYearAscending);
              }}>Sort Year Ascending</button>
              <button className="button is-small is-inline-block is-primary is-outlined m-0 mr-2" style={{ width: "140px" }} onClick={() => {
                setSorting(() => sortYearDescending);
              }}>Sort Year Descending</button>
            </p>
            {[].concat(nftMetadata).filter(
              nft => !viewWallet ? true : viewWallet.toUpperCase() == nft.owner.toUpperCase())
              .sort(sorting)
              .map((nft, index) => <CoinCard key={nft.id} {...nft} sendBuy={sendBuy} sendSell={sendSell} sendUstsdApproval={sendUstsdApproval} sendBusdApprove={sendBusdApprove}
                ustsdIsApproved={!!ustsdIsApproved && ustsdIsApproved[0]}
                isEnoughBusdAllowance={busdAllowance?.gte(parseEther(nft.price.toString()))}
                isEnoughBusd={busdBalance?.gte(parseEther(nft.price.toString()))}
                isEnoughCzusd={czusdBalance?.gte(parseEther(nft.price.toString()))}
              />)}
          </div>
        </div>
      </div>
    </section>

    <Footer />

  </>);
}

export default Home
