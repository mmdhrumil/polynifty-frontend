export const MUMBAI_TESTNET_PARAMS = [{
  chainId: '0x13881',
  chainName: 'Mumbai Testnet',
  nativeCurrency: {
    name: 'MATIC Token',
    symbol: 'MATIC',
    decimals: 18
  },
  rpcUrls: ['https://rpc-mumbai.matic.today'],
  blockExplorerUrls: ['https://mumbai-explorer.matic.today']
}];

export const MUMBAI_TESTNET_NETWORK_VERSION = '80001';

export const NETWORK_SWITCH_REJECT_ERROR_CODE = 4001;

export const NETWORK_SWITCH_REJECT_FEEDBACK_MSG = "Please sign-in using your Polygon credentials";