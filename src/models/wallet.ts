import { transactionsResponseItem } from '@/utils/helper-api';
import { Account } from 'near-api-js';
import { useSelector } from 'umi';

export enum EnumNetworkSwitch {
  TestNet = 'testnet',
  Mainnet = 'mainnet',
  Betanet = 'betanet',
}

export interface INetworkItemConfig {
  networkId: EnumNetworkSwitch;
  nodeUrl: string;
  helperUrl: string;
  explorerUrl: string;
}

export const DefaultNetWorkConfig = {
  [EnumNetworkSwitch.TestNet]: {
    networkId: EnumNetworkSwitch.TestNet,
    nodeUrl: 'https://rpc.testnet.near.org',
    helperUrl: 'https://helper.testnet.near.org',
    explorerUrl: 'https://explorer.testnet.near.org',
  },
  [EnumNetworkSwitch.Mainnet]: {
    networkId: EnumNetworkSwitch.Mainnet,
    nodeUrl: 'https://rpc.mainnet.near.org',
    helperUrl: 'https://helper.mainnet.near.org',
    explorerUrl: 'https://explorer.mainnet.near.org',
  },
  [EnumNetworkSwitch.Betanet]: {
    networkId: EnumNetworkSwitch.Betanet,
    nodeUrl: 'https://rpc.betanet.near.org',
    helperUrl: 'https://helper.betanet.near.org',
    explorerUrl: 'https://explorer.betanet.near.org',
  },
};

export const getUiNetWorkName = (v: string) => {
  return v[0].toLocaleUpperCase() + v.substring(1, v.length);
};
export const CURRENT_NETWORK_KEY = 'currentNetwork';
const getCurrentNetwork = () => {
  return localStorage.getItem(CURRENT_NETWORK_KEY) ?? EnumNetworkSwitch.Mainnet;
};
export const useCurrentNetworkConfig = () => {
  const { networkConfig } = useSelector(
    (state: any) => state.wallet as WalletStateType,
  );
  return (
    networkConfig[getCurrentNetwork()] ??
    networkConfig[EnumNetworkSwitch.Mainnet]
  );
};

const model: WalletModelType = {
  namespace: 'wallet',
  state: {
    uiNetworkId: getCurrentNetwork(),
    networkConfig: {
      ...DefaultNetWorkConfig,
      // TODO custom config
    },
    account: void 0,
    accountId: void 0,
    publicKey: void 0,
    uiPublicKey: void 0,
    transactions: [],
  },
  reducers: {
    setUiNetworkId(state: WalletStateType, action: { payload: string }) {
      return {
        ...state,
        uiNetworkId: action.payload,
      };
    },
    setAccount(state: WalletStateType, action: { payload: Account }) {
      return {
        ...state,
        account: action.payload,
      };
    },
    setAccountId(state: WalletStateType, action: { payload: string }) {
      localStorage.currentAccountId = action.payload
      return {
        ...state,
        accountId: action.payload,
      };
    },
    setPublicKey(state: WalletStateType, action: { payload: string }) {
      return {
        ...state,
        publicKey: action.payload,
        uiPublicKey: action.payload.replace('ed25519:', ''),
      };
    },
    setBalance(state: WalletStateType, action: { payload: IBalanceInfo }) {
      return {
        ...state,
        publicKey: action.payload,
        balanceInfo: action.payload,
      };
    },
    setTransactions(
      state: WalletStateType,
      action: { payload: transactionsResponseItem },
    ) {
      return {
        ...state,
        transactions: action.payload,
      };
    },
    reStore(state: WalletStateType,) {
      return {
        ...state,
        account: void 0,
        accountId: void 0,
        networkConfig: {
          ...DefaultNetWorkConfig,
          // TODO custom config
        },
        uiNetworkId: getCurrentNetwork(),
      }
    }
  },
};

const defaultInitState = Object.assign({}, model)
export default model;

export interface WalletStateType {
  uiNetworkId: string;
  networkConfig: { [network: string]: INetworkItemConfig };
  account?: Account;
  accountId?: string;
  publicKey?: string;
  uiPublicKey?: string;
  balanceInfo?: IBalanceInfo;
  transactions: transactionsResponseItem[];
}

interface WalletModelType {
  namespace: 'wallet';
  state: WalletStateType;
  reducers: any;
}

interface IBalanceInfo {
  nearUsdPrice: string;
  myNearPrice: string;
  nearBalance: string;
  uiNearBalance: string;
}
