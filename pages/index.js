import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react';
import { loadConstants } from '../lib/util';
import { ethers } from "ethers";


export async function getServerSideProps(context) {
  var constants = await loadConstants();
  return {
    props: {
      constants: {...constants}
    }
  }
}


export default function Home(props) {

  const [currentNetwork,updateCurrentNetwork] = useState();

  async function updateCurrentNetworkWrapper() {
    await updateCurrentNetwork(window.ethereum.networkVersion);
  }

  useEffect(() => {
    updateCurrentNetworkWrapper()
  }, []);
  
  async function switchChainIfNeeded(constants) {
    
    if(window.ethereum.networkVersion !== constants.network_params.MUMBAI_TESTNET.MUMBAI_TESTNET_NETWORK_VERSION) {
      // Store the MUMBAI_TESTNET config params
      const params = constants.network_params.MUMBAI_TESTNET.MUMBAI_TESTNET_PARAMS;
      
      try{
        const chainSwitchResponse = await window.ethereum.request({ method: 'wallet_addEthereumChain', params})
      }
      catch(err) {
        console.log("err.code: ", err.code)
        alert(err.message)
      }
    }
  }

  async function connectToMetamask(constants) {

    // Check if ethereum object present and MetaMask installed
    if(typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {

      ethereum
        .request({
          method: 'wallet_requestPermissions',
          params: [{ eth_accounts: {} }],
        })
        .then((permissions) => {
          const accountsPermission = permissions.find(
            (permission) => permission.parentCapability === 'eth_accounts'
          );
          if (accountsPermission) {
            console.log('eth_accounts permission successfully requested!');
          }
        })
        .catch((error) => {
          if (error.code === 4001) {
            // EIP-1193 userRejectedRequest error
            console.log('Permissions needed to continue.');
          } else {
            console.error(error);
          }
        });

      switchChainIfNeeded(constants)

    }
  }

  async function fireChainChangedEventListener() {
    window.ethereum.on('chainChanged', (chainId) => {
      updateCurrentNetworkWrapper()
      window.location.reload()
    });
  }

  fireChainChangedEventListener()

  return (
    <div className={styles.container}>
      <div>
        <p>Hexagon</p>
        <p>Currently on chain: {currentNetwork}</p>
      </div>
      <button onClick = {() => {connectToMetamask(props.constants)}}>Log-in with MetaMask</button>
    </div>
  )
}
