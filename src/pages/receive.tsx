import { AssetsItem } from '@/view/com/assetsItem';
import { Typography } from 'antd';
import { Card } from '@/view/com/Card';
import { Header } from '@/view/com/head';
import { SendReceiveTab } from '@/view/com/sendReceive';
import { useIntl, useSelector, WalletStateType } from 'umi';
const { Paragraph } = Typography;
import styles from './send.less';
// @ts-ignore
import QRCode from 'qrcode.react';

export default () => {
  const { accountId, account, balanceInfo, uiNetworkId } = useSelector<
    any,
    WalletStateType
  >((state) => state.wallet);
  const intl = useIntl();
  return (
    <>
      <Header />
      <Card>
        <SendReceiveTab />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '50px auto',
          }}
        >
          <QRCode value={accountId ?? ''} size={190} fgColor="#000000" />
        </div>
        <div className={styles.accountItem}>
          <div className={styles.top}>
            <div>{intl.formatMessage({ id: 'account' })} ID</div>
            <div></div>
          </div>
          <div className={styles.bottom}>
            <Paragraph style={{ marginBottom: 0 }} copyable>
              {accountId}
            </Paragraph>
          </div>
        </div>
        <div style={{ height: 15 }}></div>
        <AssetsItem />
      </Card>
    </>
  );
};
