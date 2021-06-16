import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const params = [{
  chainId: '0x13881',
  chainName: 'Mumbai Testnet',
  nativeCurrency: {
    name: 'MATIC Token',
    symbol: 'MATIC',
    decimals: 18
  },
  rpcUrls: ['https://rpc-mumbai.matic.today'],
  blockExplorerUrls: ['https://mumbai-explorer.matic.today']
}]


async function connectToMetamask() {
  if(typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    if(window.ethereum.networkVersion !== 80001) {
      const chainSwitchResponse = await window.ethereum.request({ method: 'wallet_addEthereumChain', params})
      console.log("chainSwitchResponse")
      console.log(chainSwitchResponse)
    }
  }
}
export default function Home() {
  return (
    <div className={styles.container}>
      NFT-Market

      <button onClick = {connectToMetamask}>Log-in with MetaMask</button>
    </div>
  )
}
