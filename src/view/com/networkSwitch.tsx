import {
  CURRENT_NETWORK_KEY,
  getUiNetWorkName,
  WalletStateType,
} from '@/models/wallet';
import { Menu, Dropdown } from 'antd';
import { useState } from 'react';
import { DownIcon } from '../icon/downIcon';
import styles from './netWorkSwitch.less';
import { connect, useDispatch, useSelector } from 'umi';

export const NetworkSwitch = () => {
  const { uiNetworkId, networkConfig } = useSelector(
    (state: any) => state.wallet as WalletStateType,
  );
  const setUiNetworkId = (networkId: string) => {
    dispatch({ type: 'wallet/setUiNetworkId', payload: networkId });
  };
  const dispatch = useDispatch();
  const menu = (
    <Menu>
      {Object.keys(networkConfig).map((networkId) => {
        return (
          <Menu.Item
            key={networkId}
            onClick={() => {
              localStorage.setItem(CURRENT_NETWORK_KEY, networkId);
              setUiNetworkId(networkId);
            }}
            disabled={networkId === uiNetworkId}
          >
            {getUiNetWorkName(networkId)}
          </Menu.Item>
        );
      })}
    </Menu>
  );
  return (
    <Dropdown overlay={menu}>
      <a className={styles.networkWrap} onClick={(e) => e.preventDefault()}>
        <div>
          {getUiNetWorkName(uiNetworkId)}
          <DownIcon style={{ display: 'inline-block', marginLeft: 6 }} />
        </div>
      </a>
    </Dropdown>
  );
};
