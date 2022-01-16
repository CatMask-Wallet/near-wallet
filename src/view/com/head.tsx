import { Link, useDispatch, useHistory, useLocation, useSelector, WalletStateType } from 'umi';
import { NearMaskIcon } from '../icon/nearMask';
import { LocaleSwitch } from './localeSwitch';
import { NetworkSwitch } from './networkSwitch';
import { Drawer, Button, Divider } from 'antd';
import { LeftOutlined, SettingOutlined } from '@ant-design/icons';
import { useState } from 'react';

export const Header = () => {
  const { replace } = useHistory();
  const dispatch = useDispatch()
  const location = useLocation();
  const { accountId, account, balanceInfo } = useSelector<any, WalletStateType>(
    (state) => state.wallet ,
  );
  const [visible, setVisible] = useState(false);
  
  return (
    <>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#f2f3f4',
        }}
        className="pd10"
      >

        {location.pathname === '/login' ? <b>CatMask</b> : <Link to={accountId ? '/' : '/login'}>
          
          {
            accountId ? <NearMaskIcon /> : <LeftOutlined />
          }
        </Link>}
        <NetworkSwitch />
        <div onClick={() => setVisible(true)}>
          <SettingOutlined />
        </div>
      </header>
      <Drawer
        title="Setting"
        placement="right"
        closable={false}
        visible={visible}
        onClose={() => setVisible(false)}
        getContainer={false}
        // style={{ position: 'absolute', maxWidth: '60vw' }}
        width={280}
      >
        <LocaleSwitch />

        <Divider />
        <Button
          onClick={() => {
            localStorage.clear();
            dispatch({type: 'wallet/reStore', payload: 0})
            replace('/login');
          }}
        >
          Login Out
        </Button>
      </Drawer>
    </>
  );
};
