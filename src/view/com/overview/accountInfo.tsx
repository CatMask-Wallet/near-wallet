import { useDispatch, useIntl, useSelector, WalletStateType } from 'umi';
import { Typography } from 'antd';
import { useEffect, useState } from 'react';
import { AccountView } from 'near-api-js/lib/providers/provider';
import {
  formatNearAmount,
  parseNearAmount,
} from 'near-api-js/lib/utils/format';

const { Paragraph } = Typography;
export const OverviewAccountInfo = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { accountId, account } = useSelector(
    (state: any) => state.wallet as WalletStateType,
  );

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 20,
        }}
      >
        <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
          {intl.formatMessage({ id: 'account' })}
        </p>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 5,
        }}
        className="gray"
      >
        <Paragraph copyable>{accountId}</Paragraph>
      </div>
    </>
  );
};
