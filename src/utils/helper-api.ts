export async function getAccountIds({
  publicKey,
  ACCOUNT_HELPER_URL,
}: {
  publicKey: string;
  ACCOUNT_HELPER_URL: string;
}) {
  const controller = new AbortController();
  return await fetch(`${ACCOUNT_HELPER_URL}/publicKey/${publicKey}/accounts`, {
    signal: controller.signal,
  }).then((res) => res.json());
}
export async function getFiat({
  ACCOUNT_HELPER_URL,
}: {
  ACCOUNT_HELPER_URL: string;
}) {
  const controller = new AbortController();
  return (await fetch(`${ACCOUNT_HELPER_URL}/fiat`, {
    signal: controller.signal,
  }).then((res) => res.json())) as {
    near: {
      cny: number;
      eur: number;
      last_updated_at: number;
      usd: number;
    };
  };
}

export interface transactionsResponseItem {
  action_index: number;
  action_kind: string;
  args: {
    deposit?: string;
    access_key?: {
      nonce: number;
      permission: {
        permission_kind: string; //FULL_ACCESS
      };
    };
    public_key?: string;
  };
  block_hash: string;
  block_timestamp: string;
  hash: string;
  receiver_id: string;
  signer_id: string;
}
export async function getTransactions({
  accountId,
  ACCOUNT_HELPER_URL,
}: {
  accountId: string;
  ACCOUNT_HELPER_URL: string;
}) {
  if (!accountId) return {};

  const txs: transactionsResponseItem[] = await fetch(
    `${ACCOUNT_HELPER_URL}/account/${accountId}/activity`,
  ).then((res) => res.json());

  return txs.map((t, i) => ({
    ...t,
    // kind: t.action_kind
    //   .split('_')
    //   .map((s) => s.substr(0, 1) + s.substr(1).toLowerCase())
    //   .join(''),
    kind: t.action_kind,
    block_timestamp: parseInt(t.block_timestamp.substr(0, 13), 10),
    hash_with_index: t.action_index + ':' + t.hash,
    checkStatus: !(i && t.hash === txs[i - 1].hash),
  }));
}
