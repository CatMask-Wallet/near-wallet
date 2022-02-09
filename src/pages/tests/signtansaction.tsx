import { useCurrentNetworkConfig, WalletStateType } from '@/models/wallet';
import { Button } from 'antd';
import { BN } from 'bn.js';
import { transactions } from 'near-api-js';
import {
  createTransaction,
  SCHEMA,
  Signature,
  SignedTransaction,
} from 'near-api-js/lib/transaction';
import { KeyPair, PublicKey } from 'near-api-js/lib/utils';
import { baseDecode, serialize } from 'near-api-js/node_modules/borsh';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import sha256 from 'js-sha256';
// @ts-expect-error
import { parseSeedPhrase } from 'near-seed-phrase';
import { sendJsonRpc } from '@/utils/helper-api';
import { actionsObjToHash } from '@/utils/tansaction';

export default () => {
  const { accountId, account, balanceInfo, publicKey } = useSelector<
    any,
    WalletStateType
  >((state) => state.wallet);

  const currentNetWork = useCurrentNetworkConfig();

  const onDeposit = async () => {
    if (!accountId) return console.error('not account');
    if (!publicKey) return console.error('not publicKey');
    const contractId = 'wrap.testnet';
    const methodName = 'near_deposit';
    const actions = [
      transactions.functionCall(
        methodName,
        Buffer.from(JSON.stringify({})),
        new BN('10000000000000'),
        new BN(10).pow(new BN(24)),
      ),
    ];

    console.log('actions---->', actions);
    const blockRes = await sendJsonRpc(currentNetWork.nodeUrl, 'block', {
      finality: 'final',
    });
    const blockHashStr = blockRes.result.header.hash;
    const blockHash = baseDecode(blockHashStr);
    console.log('blockHash----->', blockHash);
    console.log('publicKey----->', publicKey);

    const receiverId = contractId;
    const accessKeyRes = await sendJsonRpc(currentNetWork.nodeUrl, 'query', {
      request_type: 'view_access_key',
      account_id: accountId,
      public_key: publicKey,
      finality: 'optimistic',
    });
    const nonce = ++accessKeyRes.result.nonce;
    console.log('nonce---->', nonce);
    // const nonce = Date.now() + (Math.random() * 1e6 | 0)
    const transaction = createTransaction(
      accountId,
      PublicKey.from(publicKey),
      receiverId,
      nonce,
      actions,
      blockHash,
    );
    const message = serialize(SCHEMA, transaction);
    const hash = new Uint8Array(sha256.sha256.array(message));

    // @ts-ignore
    catMask.signTransaction(
      hash.toString(),
      async ({ message }: { message: { signature: string } }) => {
        const signature = new Uint8Array(
          message.signature.split(',').map((e) => Number(e)),
        );
        const signedTx = new SignedTransaction({
          transaction,
          signature: new Signature({
            keyType: transaction.publicKey.keyType,
            data: signature,
          }),
        });

        console.log('hash---->', hash.toString());
        console.log('signedTx---->', signedTx);
        console.log('signature------>', signature);

        const bytes = signedTx.encode();
        const rpcRes = await sendJsonRpc(
          currentNetWork.nodeUrl,
          'broadcast_tx_commit',
          [Buffer.from(bytes).toString('base64')],
        );

        console.log('rpcRes---->', rpcRes);
        // sendTransaction(signedTx)
      },
    );
  };
  const contractId = 'wrap.testnet';
  const methodName = 'near_deposit';
  const onDeposit2 = async () => {
    if (!accountId) return console.error('not account');
    if (!publicKey) return console.error('not publicKey');
    const res = await actionsObjToHash({
      accountId,
      publicKey,
      contractId,
      actions: [
        {
          methodName,
          args: {},
          gas: '10000000000000',
          deposit: new BN(10).pow(new BN(24)).toString(),
        },
      ],
      nodeUrl: currentNetWork.nodeUrl,
    });
    console.log('res------>', res);
  };
  return (
    <>
      <Button onClick={onDeposit}>depositWrapNear -- hash</Button>
      <Button onClick={onDeposit2}>
        depositWrapNear TransactionAndSendRaw
      </Button>
    </>
  );
};
