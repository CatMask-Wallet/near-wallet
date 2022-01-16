import { Link, useHistory } from 'umi';
import { NearMaskIcon } from '../icon/nearMask';
import { LocaleSwitch } from './localeSwitch';
import { NetworkSwitch } from './networkSwitch';
import { Drawer, Button, Divider } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { useState } from 'react';

export const Header = () => {
  const { replace } = useHistory();
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
        <Link to={'/'}>
          <NearMaskIcon />
        </Link>
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
            replace('/login');
          }}
        >
          Login Out
        </Button>
      </Drawer>
    </>
  );
};
