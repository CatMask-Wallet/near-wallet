import { LocaleSwitch } from '@/view/com/localeSwitch';
import {
  setLocale,
  useDispatch,
  useHistory,
  useIntl,
  useLocation,
  useParams,
  useSelector,
  WalletStateType,
} from 'umi';
import { useEffect } from 'react';
import { Divider } from 'antd';
import { WalletBaseAction } from '@/view/com/baseAction';
import { NetworkSwitch } from '@/view/com/networkSwitch';
import { NearMaskIcon } from '@/view/icon/nearMask';
import { OverviewAccountInfo } from '@/view/com/overview/accountInfo';
import { useAccount } from '@/hooks.ts/wallet';
import { AccountBalance } from '@/view/com/overview/accountBalance';
import { Header } from '@/view/com/head';
import { RecentActivity } from '@/view/com/ren';
import { BackgroundMessagePage } from '@/background/message/index';
import { BackgroundTransacationPage } from '@/background/transaction';

export default function IndexPage() {
  const params = useLocation() as any;
  const type = params?.query?.type;
  if (type === 'backgroundMessage') {
    return <BackgroundMessagePage />;
  }
  if (type === 'backgroundTransaction') {
    return <BackgroundTransacationPage />;
  }
  const history = useHistory();
  const { accountId, account, balanceInfo } = useSelector<any, WalletStateType>(
    (state) => state.wallet,
  );
  useEffect(() => {
    if (!accountId && !Boolean(localStorage.currentAccountId)) {
      history.replace('/login');
    }
  }, [accountId]);

  return (
    <div>
      <Header />
      <OverviewAccountInfo />
      <Divider />
      <AccountBalance />
      <WalletBaseAction />
      <Divider />
      <RecentActivity />
    </div>
  );
}
