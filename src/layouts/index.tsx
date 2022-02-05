import { useAccount } from '@/hooks.ts/wallet';
import { getFiat, getTransactions } from '@/utils/helper-api';
import { useInterval } from 'ahooks';
import { formatNearAmount } from 'near-api-js/lib/utils/format';
import { useEffect } from 'react';
import {
  setLocale,
  useCurrentNetworkConfig,
  useDispatch,
  useSelector,
  WalletStateType,
} from 'umi';

const layout: React.FC<{}> = ({ children }) => {
  const { updateAccount } = useAccount();
  const dispatch = useDispatch();
  const { accountId, account, balanceInfo } = useSelector<any, WalletStateType>(
    (state) => state.wallet,
  );
  const currentNetWork = useCurrentNetworkConfig();
  const info = async () => {
    if (account && accountId) {
      const info = await account.state();
      const usdPrice = await getFiat({
        ACCOUNT_HELPER_URL: currentNetWork.helperUrl,
      });
      const nearAccount = formatNearAmount(info.amount);
      const nearUsdPrice = (usdPrice?.near?.usd).toFixed(2);
      const myNearPrice = (parseInt(nearAccount) * usdPrice?.near?.usd).toFixed(
        2,
      );
      dispatch({
        type: 'wallet/setBalance',
        payload: {
          nearUsdPrice,
          myNearPrice,
          nearBalance: nearAccount,
          uiNearBalance: parseInt(nearAccount).toFixed(4),
        },
      });
    }
  };
  useInterval(
    () => {
      info();
    },
    10e3,
    {
      immediate: true,
    },
  );
  useEffect(() => {
    if (!localStorage.umi_locale) {
      setLocale('en-US', false);
    }
    // TODO add account and switch chian
    updateAccount();
    info();
  }, [accountId]);
  return <>{children}</>;
};
export default layout;
