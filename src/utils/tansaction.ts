import BN from 'bn.js';
import { sha256 } from 'js-sha256';
import { transactions } from 'near-api-js';
import {
  createTransaction,
  SCHEMA,
  Signature,
  SignedTransaction,
} from 'near-api-js/lib/transaction';
import { KeyPair, PublicKey } from 'near-api-js/lib/utils';
import { baseDecode, serialize } from 'near-api-js/node_modules/borsh';
// @ts-expect-error
import { parseSeedPhrase } from 'near-seed-phrase';
import { sendJsonRpc } from './helper-api';

export const keysSort = (o: Object) => Object.keys(o).sort().join(',');
export const auctionTransferKeySort = keysSort({ deposit: 1 });
export const auctionStakeKeySort = keysSort({ stake: 1, publicKey: 1 });
export const auctionIsTransafer = (auction: IAuction) =>
  keysSort(auction) === auctionTransferKeySort;
export const auctionIsStake = (auction: IAuction) =>
  keysSort(auction) === auctionStakeKeySort;

export interface IAuction {
  methodName: string;
  args: object;
  gas: string;
  deposit?: string;
  // stake
  stake?: string;
  publickey?: string;
}
interface transactionParams {
  contractId: string;
  actions: IAuction[];
  nodeUrl: string;
  accountId: string;
  publicKey: string;
}
export const actionsObjToHash = async ({
  contractId,
  actions: actionsObj,
  nodeUrl,
  accountId,
  publicKey,
}: transactionParams) => {
  const actions = actionsObj.map((auction) => {
    if (auctionIsTransafer(auction) && auction.deposit) {
      return transactions.transfer(new BN(auction.deposit));
    }
    if (auctionIsStake(auction) && auction.stake && auction.publickey) {
      return transactions.stake(
        new BN(auction.stake),
        PublicKey.from(auction.publickey),
      );
    }
    return transactions.functionCall(
      auction.methodName,
      Buffer.from(JSON.stringify(auction.args)),
      new BN(auction.gas),
      new BN(auction?.deposit ?? 0),
    );
  });
  const blockRes = await sendJsonRpc(nodeUrl, 'block', {
    finality: 'final',
  });
  const blockHashStr = blockRes.result.header.hash;
  const blockHash = baseDecode(blockHashStr);
  const receiverId = contractId;
  const accessKeyRes = await sendJsonRpc(nodeUrl, 'query', {
    request_type: 'view_access_key',
    account_id: accountId,
    public_key: publicKey,
    finality: 'optimistic',
  });
  const nonce = ++accessKeyRes.result.nonce;
  const transaction = createTransaction(
    accountId,
    PublicKey.from(publicKey),
    receiverId,
    nonce,
    actions,
    blockHash,
  );
  const message = serialize(SCHEMA, transaction);
  const hash = new Uint8Array(sha256.array(message));
  const signature = getSign({ message: hash.toString() });
  if (!signature) {
    return { hash: Buffer.from(hash).toString('hex'), error: 'not signature' };
  }

  const signedTx = new SignedTransaction({
    transaction,
    signature: new Signature({
      keyType: transaction.publicKey.keyType,
      data: signature.signature,
    }),
  });
  const bytes = signedTx.encode();
  try {
    const rpcRes = await sendJsonRpc(nodeUrl, 'broadcast_tx_commit', [
      Buffer.from(bytes).toString('base64'),
    ]);
    return {
      hash: Buffer.from(hash).toString('hex'),
      res: rpcRes?.result ?? rpcRes,
    };
  } catch (error) {
    return { hash: Buffer.from(hash).toString('hex'), error };
  }
};

export const getSign = (json: { message: string }) => {
  const recoverySeedPhrase = localStorage.recoverySeedPhrase;
  if (!recoverySeedPhrase) return console.log('not SeedPhras');
  if (!json.message) return console.log('not message');
  const { secretKey } = parseSeedPhrase(recoverySeedPhrase);
  const keyPair = KeyPair.fromString(secretKey);
  const sign = keyPair.sign(
    Buffer.from(new Uint8Array(json.message.split(',').map((e) => Number(e)))),
  );
  return sign;
};
