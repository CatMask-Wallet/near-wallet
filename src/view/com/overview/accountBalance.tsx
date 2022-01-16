import { getFiat } from '@/utils/helper-api';
import { AccountView } from 'near-api-js/lib/providers/provider';
import { formatNearAmount } from 'near-api-js/lib/utils/format';
import { useEffect, useState } from 'react';
import {
  useCurrentNetworkConfig,
  useDispatch,
  useIntl,
  useSelector,
  WalletStateType,
} from 'umi';

export const AccountBalance = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { accountId, account, balanceInfo } = useSelector(
    (state: any) => state.wallet as WalletStateType,
  );
  const nearBalance = balanceInfo?.nearBalance;
  const myNearPrice = balanceInfo?.myNearPrice;

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
          <div style={{ fontSize: 32, fontWeight: 650 }}>
            <span>{nearBalance && parseInt(nearBalance).toFixed(4)}</span>&nbsp;
            Near
          </div>
          <div className="gray">
            {intl.formatMessage({ id: 'overview.balance' })} ≈ ${myNearPrice}
          </div>
        </div>
      </div>
    </>
  );
};
