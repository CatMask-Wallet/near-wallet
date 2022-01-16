import { Card } from '@/view/com/Card';
import { Link, useLocation, useSelector, WalletStateType } from 'umi';

export default () => {
  const location = useLocation();
  const { accountId, account, balanceInfo } = useSelector<any, WalletStateType>(
    (state) => state.wallet ,
  );
  return (
    <>
      <br />
      <br />
      <br />
      <Card>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <h2 style={{ padding: '20px', fontSize: 32, color: '#555' }}>404</h2>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Link to={accountId ? "/" : "/login"}>To Wallet Overview</Link>
        </div>
      </Card>
    </>
  );
};
