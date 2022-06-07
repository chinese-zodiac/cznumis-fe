import React, { Component, useEffect, useState, memo } from 'react';
import { ADDRESS_USTSD_RESERVES, ADDRESS_BUSD} from '../../constants/addresses';
import { SOCIAL_ELLIPSIS_CZUSD} from '../../constants/social';
import {getIpfsUrl} from '../../utils/getIpfsJson';
import { constants } from 'ethers'
import { useEthers, shortenAddress, useCall, useContractFunction, useTokenAllowance  } from '@usedapp/core'

let renderCount = 0;

const BuyCoinModalButton = ({image,id,price,owner,serial,sendBuy,sendBusdApprove,isEnoughBusdAllowance,isEnoughBusd,isEnoughCzusd}) => {
    const {account} = useEthers();
    const [isActive,setIsActive] = useState(false);
    return(<>
      <button className='button is-small is-success is-outlined ml-2 pt-2' onClick={()=>setIsActive(true)}>BUY</button>
        <div className={"modal "+(isActive && "is-active")}>
        <div class="modal-background"></div>
        <div className="modal-card" style={{maxWidth:"90vw",width:"350px"}}>
        
          <header className="modal-card-head">
            <p className="modal-card-title is-size-5 mt-1">Purchase {serial} for ${(price+0.99).toFixed(2)}</p>
            <button className="delete" aria-label="close" onClick={()=>setIsActive(false)}></button>
          </header>
          <section className="modal-card-body">
            <a href={getIpfsUrl(image,id)} target="_blank">
            <figure className="image is-256x256 m-2" style={{width:"256px",display:"inline-block"}}>
                <img src={getIpfsUrl(image,id)} />
            </figure>
            </a>
        <p className="has-text-left pl-4 pb-2 is-size-7" >
            ${(price+0.99).toFixed(2)} ID:{id} SN:{serial} <span className='is-underlined' style={{cursor:"pointer"}} onClick={()=>setViewWallet(owner)}>{shortenAddress(owner)}</span>
            <br/><span className='has-text-danger'>{(!isEnoughCzusd && !isEnoughBusd) && "You need more CZUSD or BUSD to purchase."}</span>
        </p>
          </section>
          <footer className="modal-card-foot">
          {isEnoughCzusd ? (
                <button className="button is-success is-outlined ml-2" onClick={()=>{sendBuy([id],0);setIsActive(false)}}>
                <span style={{display:"inline-block",top:"2px",left:"0px",position:"relative"}} >
                    BUY (CZUSD)
                </span>
                </button>
            ) : (
                <a className="button is-info is-outlined ml-2" href={SOCIAL_ELLIPSIS_CZUSD} target="_blank">
                <span style={{display:"inline-block",top:"2px",left:"0px",position:"relative"}} >
                    GET CZUSD
                </span>
                </a>
            )}

            {(isEnoughBusd && isEnoughBusdAllowance) ? (
                <button className="button is-success is-outlined ml-2" onClick={()=>{sendBuy([id],1);setIsActive(false)}}>
                <span style={{display:"inline-block",top:"2px",left:"0px",position:"relative"}} >
                    BUY (BUSD)
                </span>
                </button>
            ) : ((isEnoughBusdAllowance) ? (
                <a className="button is-info is-outlined ml-2" href={"https://pancakeswap.finance/swap/?outputCurrency="+ADDRESS_BUSD} target="_blank">
                <span style={{display:"inline-block",top:"2px",left:"0px",position:"relative"}} >
                    GET BUSD
                </span>
                </a>) : (
                    <button className="button is-info is-outlined ml-2" onClick={()=>sendBusdApprove(ADDRESS_USTSD_RESERVES,constants.MaxUint256)}>
                    <span style={{display:"inline-block",top:"2px",left:"0px",position:"relative"}} >
                        APPROVE BUSD
                    </span>
                    </button>
                )
            )}
          </footer>
        </div>
      </div>
      </>);
      
};

export default BuyCoinModalButton;