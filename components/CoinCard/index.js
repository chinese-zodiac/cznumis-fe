import React, { Component, useEffect, useState, memo } from 'react';
import { ADDRESS_USTSD_RESERVES, ADDRESS_BUSD} from '../../constants/addresses';
import { SOCIAL_PCGS_CHART_MORGAN, SOCIAL_PCGS_CHART_PEACE} from '../../constants/social';
import {getIpfsUrl} from '../../utils/getIpfsJson';
import { constants } from 'ethers'
import { useEthers, shortenAddress, useCall, useContractFunction, useTokenAllowance  } from '@usedapp/core'
import BuyCoinModalButton from '../BuyCoinModalButton';

let renderCount = 0;

function priceChartLink(serial) {
    let year = Number(serial.substr(0,4));
    let grade = serial.substr(5,2);
    let baseUrl = year < 1922 ? SOCIAL_PCGS_CHART_MORGAN : SOCIAL_PCGS_CHART_PEACE;
    return baseUrl + grade;
}

const CoinCard = memo(({image,id,price,serial,refresh,owner,sendBuy,sendSell,sendBusdApprove,ustsdIsApproved,sendUstsdApproval,isEnoughBusdAllowance,isEnoughBusd,isEnoughCzusd}) => {
    const {account} = useEthers();
    return(
    <div className="container m-2" style={{display:"inline-block",border:"solid #9c968a",background:"white"}}>
        <a href={getIpfsUrl(image,id)} target="_blank">
        <figure className="image is-256x256 m-2" style={{width:"256px",display:"inline-block"}}>
            <img src={getIpfsUrl(image,id)} />
        </figure>
        </a>
        <p className="has-text-left pl-4 pb-2 is-size-7" > ${(price+0.99).toFixed(2)} ID:{id} SN:{serial} <span className='is-underlined' style={{cursor:"pointer"}} onClick={()=>setViewWallet(owner)}>{shortenAddress(owner)}</span>
        <br/>
        <button className="button is-small is-primary is-outlined" onClick={refresh}>
        <span className="icon pr-1 pt-1">
            <i className="fa-solid fa-refresh" style={{position:'relative',top:"-0.1em",left:"0.1em"}}></i>
        </span>
        </button>
        <a class="button ml-2 is-small is-primary is-outlined" href={priceChartLink(serial)} target="_blank">
            <span class="icon">
                <i class="fa-solid fa-chart-line"></i>
            </span>
        </a>

        {(owner.toUpperCase()==ADDRESS_USTSD_RESERVES.toUpperCase()) && (<BuyCoinModalButton {...{image,id,owner,price,serial,sendBuy,sendBusdApprove,isEnoughBusdAllowance,isEnoughBusd,isEnoughCzusd}} />)}

        {(!!account && owner.toUpperCase()==account.toUpperCase()) && (
        (!!ustsdIsApproved) ? (
            <button className="button is-small is-danger is-outlined ml-2" onClick={()=>sendSell([id])}>
            <span style={{display:"inline-block",top:"2px",left:"0px",position:"relative"}} >
                SELL
            </span>
            </button>
        ) : (
            <button className="button is-small is-info is-outlined ml-2" onClick={()=>sendUstsdApproval(ADDRESS_USTSD_RESERVES,true)}>
            <span style={{display:"inline-block",top:"2px",left:"0px",position:"relative"}} >
                APPROVE FOR SELL
            </span>
            </button>
        ))}
        </p>
    </div>);
});

export default CoinCard;