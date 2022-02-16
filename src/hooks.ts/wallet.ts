import BN from 'bn.js';
// @ts-expect-error
import { parseSeedPhrase } from 'near-seed-phrase';
import {
  formatNearAmount,
  parseNearAmount,
} from 'near-api-js/lib/utils/format';
import { useState } from 'react';
import { useCurrentNetworkConfig, useDispatch } from 'umi';
import { connect, Contract, InMemorySigner, KeyPair } from 'near-api-js';
import { getAccountIds } from '@/utils/helper-api';

class KeyStore {
  keyPair: KeyPair;
  constructor({ keyPair }: { keyPair: KeyPair }) {
    this.keyPair = keyPair;
  }
  async setKey(networkId: string, accountId: string, keyPair: KeyPair) {}
  async getKey(networkId: string, accountId: string) {
    return this.keyPair;
  }
  async removeKey(networkId: string, accountId: string) {}
  async clear() {}
  async getNetworks() {
    return [''];
  }
  async getAccounts(networkId: string) {
    return [''];
  }
}

export const useAccount = () => {
  const dispatch = useDispatch();
  const currentNetWork = useCurrentNetworkConfig();
  const nodeUrl = currentNetWork.nodeUrl;

  const updateAccount = async (paramRecoverySeedPhrase?: string) => {
    const recoverySeedPhrase =
      paramRecoverySeedPhrase || localStorage.recoverySeedPhrase;
    if (!recoverySeedPhrase) {
      return console.log('not login');
    }
    const { publicKey, secretKey } = parseSeedPhrase(recoverySeedPhrase);
    // console.log('parseSeedPhrase----->', publicKey.toString(), secretKey);
    const keyPair = KeyPair.fromString(secretKey);
    const accountIdsByPublicKey = await getAccountIds({
      publicKey,
      ACCOUNT_HELPER_URL: currentNetWork.helperUrl,
    });

    // console.log('account accountIdsByPublicKey---->', accountIdsByPublicKey);
    const accountId = accountIdsByPublicKey[0];
    if (!accountId) {
      return console.log('not find account');
    }

    const keyStore = new KeyStore({ keyPair });
    const near = await connect({
      networkId: currentNetWork.networkId,
      signer: new InMemorySigner(keyStore),
      nodeUrl,
      headers: { 'Content-Type': 'application/json' },
    });
    const account = await near.account(accountId);

    dispatch({ type: 'wallet/setAccount', payload: account });
    dispatch({ type: 'wallet/setAccountId', payload: accountId });
    dispatch({ type: 'wallet/setPublicKey', payload: publicKey });

    return account;
  };
  return {
    updateAccount,
  };
};
