import { getTransactions } from '@/utils/helper-api';
import { useInterval } from 'ahooks';
import {
  formatNearAmount,
  parseNearAmount,
} from 'near-api-js/lib/utils/format';
import { useEffect } from 'react';
import {
  useCurrentNetworkConfig,
  useDispatch,
  useIntl,
  useSelector,
  WalletStateType,
} from 'umi';
import { Divider } from 'antd';
import { Card } from './Card';
import { ActionTimeStamp } from './wallet/time';
import styles from './ren.less';

export const RecentActivity = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const { accountId, account, balanceInfo, transactions } = useSelector<
    any,
    WalletStateType
  >((state) => state.wallet);
  const currentNetWork = useCurrentNetworkConfig();
  const info = async () => {
    if (accountId) {
      const transactions = await getTransactions({
        accountId,
        ACCOUNT_HELPER_URL: currentNetWork.helperUrl,
      });
      if (!transactions) {
        return console.log('get Transaction error');
      }

      // console.log('transactions----->', transactions);
      dispatch({
        type: 'wallet/setTransactions',
        payload: transactions,
      });
    }
  };
  useInterval(
    () => {
      info();
    },
    15e3,
    {
      immediate: true,
    },
  );
  useEffect(() => {
    info();
  }, [accountId]);

  const list = transactions.filter(
    (transaction) =>
      transaction.action_kind === 'TRANSFER' && transaction.args.deposit,
  );
  return (
    <>
      <Card>
        <h2 className={styles.title}>
          {intl.formatMessage({ id: 'overview.activity' })}
        </h2>
        {list.map((transaction, index, array) => {
          // TODO
          const isAdd = transaction.receiver_id === accountId;
          return (
            <div key={transaction.hash}>
              <a
                className={styles.item}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
                href={[
                  currentNetWork.explorerUrl,
                  'transactions',
                  transaction.hash,
                ].join('/')}
                target="_blank"
              >
                <div className={styles.typeName}>
                  {isAdd
                    ? intl.formatMessage({ id: 'baseAction.receive' })
                    : intl.formatMessage({ id: 'baseAction.send' })}
                </div>
                <div className={styles.right}>
                  <div
                    className={[styles.price, isAdd ? styles.add : ''].join(
                      ' ',
                    )}
                  >
                    {isAdd ? '+' : '-'}
                    {parseFloat(
                      formatNearAmount(transaction.args.deposit ?? '0'),
                    ).toFixed(2)}
                  </div>
                  <ActionTimeStamp timeStamp={transaction.block_timestamp} />
                </div>
              </a>
              {index !== array.length - 1 && (
                <Divider style={{ marginTop: 8, marginBottom: 8 }} />
              )}
            </div>
          );
        })}
        {list.length === 0 && <div>Not List</div>}
      </Card>
    </>
  );
};
