import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import * as constants from '../config/constants';
import { useState, useEffect } from 'react';
import { loadConstants } from '../lib/util';

// const params = [{
//   chainId: '0x13881',
//   chainName: 'Mumbai Testnet',
//   nativeCurrency: {
//     name: 'MATIC Token',
//     symbol: 'MATIC',
//     decimals: 18
//   },
//   rpcUrls: ['https://rpc-mumbai.matic.today'],
//   blockExplorerUrls: ['https://mumbai-explorer.matic.today']
// }]


export async function getServerSideProps(context) {
  var constants = await loadConstants();
  return {
    props: {
      constants: {...constants}
    }
  }
}

async function connectToMetamask(constants) {

  // Store the MUMBAI_TESTNET config params
  const params = constants.network_params.MUMBAI_TESTNET.MUMBAI_TESTNET_PARAMS;

  // Check if ethereum object present and MetaMask installed
  if(typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {

    // Request MetaMask account login
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

    // Request user to switch chain if not MUMBAI_TESTNET
    if(window.ethereum.networkVersion !== constants.network_params.MUMBAI_TESTNET.MUMBAI_TESTNET_NETWORK_VERSION) {

      try{
        const chainSwitchResponse = await window.ethereum.request({ method: 'wallet_addEthereumChain', params})
      }
      catch(err) {
        console.log("err.code: ", err.code)
        console.log("network_params.NETWORK_SWITCH_REJECT_ERROR_CODE: ", constants.NETWORK_SWITCH_REJECT_ERROR_CODE)
        if(err.code === constants.NETWORK_SWITCH_REJECT_ERROR_CODE) {
          alert(constants.NETWORK_SWITCH_REJECT_FEEDBACK_MSG);
        }
      }
    }
  }
}


export default function Home(props) {

  return (
    <div className={styles.container}>
      NFT-Market

      <button onClick = {() => {connectToMetamask(props.constants)}}>Log-in with MetaMask</button>
    </div>
  )
}
