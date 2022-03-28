import React, { useEffect, useState } from 'react'
import type { ChainId } from '@usedapp/core'
import { useEthers, shortenAddress, useLookupAddress, useChainMeta, useChainState  } from '@usedapp/core'
import styled from 'styled-components'
import Web3Modal from 'web3modal'
import { AccountModal } from '../AccountModal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { parseEther } from '@ethersproject/units'

const Web3ModalButton = ({busdBalance,czusdBalance}) => {
  const { account, activate, deactivate, chainId } = useEthers();

  const ens = useLookupAddress();
  const [showModal, setShowModal] = useState(false);
  const [activateError, setActivateError] = useState('');
  const { error } = useEthers();
  useEffect(() => {
    if (error) {
      console.log(error);
      setActivateError(error.message)
    }
  }, [error])

  const activateProvider = async () => {
    const providerOptions = {
      injected: {
        display: {
          name: 'Metamask',
          description: 'Connect with the provider in your Browser',
        },
        package: null,
      },
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          bridge: 'https://bridge.walletconnect.org',
          infuraId: 'd8df2cb7844e4a54ab0a782f608749dd',
          rpc: {
            56: "https://rpc.ankr.com/bsc"
          }
        },
      },
    }

    const web3Modal = new Web3Modal({
      providerOptions,
    })
    try {
      const provider = await web3Modal.connect()
      await activate(provider)
      setActivateError('')
    } catch (error: any) {
      setActivateError(error.message)
    }
  }

  return (
    <div className="container has-text-right mr-5 mt-3">
      {showModal && <AccountModal setShowModal={setShowModal} />}
    {activateError && false && (
        <div 
            className="message is-warning is-inline-block mt-2 has-text-warning-dark has-background-warning pb-0 pt-1 pr-3 pl-3 is-small mb-0" 
            >
            {activateError}
        </div>
    )}
      {account ? (
        <>
        <div className='is-inline-block mt-2 is-size-7' style={{position:"relative"}} onClick={() => setShowModal(!showModal)}>
          {ens ?? shortenAddress(account)}
          <div style={{position:"absolute",right:"0px",width:"50vw",top:"1.1em"}}>
          {!!busdBalance ? Math.floor(Number(parseEther(busdBalance.toString()))).toFixed(2) : "..."} BUSD 
          {!!czusdBalance ? " "+Math.floor(Number(parseEther(czusdBalance.toString()))).toFixed(2) : " ..."} CZUSD
          </div>
          </div>
        {chainId && chainId == 56 ? (<div 
            className="message is-inline-block mt-2 is-success has-text-success pb-0 pt-1 pr-3 pl-3 is-small mb-0 ml-2" 
        >BSC</div>) : (
            <div 
                className="message is-inline-block mt-2 is-warning has-text-warning-dark has-background-warning pb-0 pt-1 pr-3 pl-3 is-small mb-0 ml-2" 
            >BSC Not Connected</div>
        )}
        <button className="button is-inline-block ml-2 is-small is-primary is-outlined is-rounded" style={{marginTop:"3px",paddingTop:"6px"}} onClick={() => deactivate()}>Disconnect</button>
        </>
      ) : (
        <button className="button is-inline-block ml-2 is-small is-primary is-outlined is-rounded" style={{marginTop:"3px",paddingTop:"6px"}}  onClick={activateProvider}>Connect</button>
      )}
    </div>
  )
}

export default Web3ModalButton;