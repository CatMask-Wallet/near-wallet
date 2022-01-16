import { useIntl, useSelector, WalletStateType } from 'umi';
import styles from './assetsItem.less';
export const AssetsItem = () => {
  const { accountId, account, balanceInfo } = useSelector(
    (state: any) => state.wallet as WalletStateType,
  );
  const intl = useIntl();
  const uiNearBalance = balanceInfo?.uiNearBalance;
  const myNearPrice = balanceInfo?.myNearPrice;

  return (
    <div className={styles.assetsItem}>
      <div>
        {intl.formatMessage({ id: 'balance.transferable' })}
        <div className={styles.right}>
          <div>
            <div className={styles.nearAmount}>{uiNearBalance} NEAR</div>
            <div className={styles.fiatAmount}>≈ ${myNearPrice} USD</div>
          </div>
        </div>
      </div>
    </div>
  );
};
