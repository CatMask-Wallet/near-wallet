import { AssetsItem } from '@/view/com/assetsItem';
import { Card } from '@/view/com/Card';
import { Header } from '@/view/com/head';
import { SendReceiveTab } from '@/view/com/sendReceive';
import { useState } from 'react';
import {
  useHistory,
  useIntl,
  useRequest,
  useSelector,
  WalletStateType,
} from 'umi';
import styles from './send.less';
import { Input, Button } from 'antd';
import { Account } from 'near-api-js';
import { parseNearAmount } from 'near-api-js/lib/utils/format';
import BN from 'bn.js';

const send = async (account: Account, receive: string, amount: string) => {
  // TODO check amount is number
  if (amount) {
    try {
      await account.sendMoney(
        receive,
        new BN(parseNearAmount(amount) as string),
      );
      return true;
    } catch (err) {}
  }
};
export default () => {
  const intl = useIntl();
  const { accountId, account, balanceInfo, uiNetworkId } = useSelector(
    (state: any) => state.wallet as WalletStateType,
  );
  const usdPrice = balanceInfo?.nearUsdPrice;
  const myNearPrice = balanceInfo?.myNearPrice;
  const uiNearBalance = balanceInfo?.uiNearBalance;

  const [inputPrice, setInputPrice] = useState('');
  const [receive, setReceive] = useState('');
  const { push } = useHistory();
  const onMax = () => {
    setInputPrice(uiNearBalance ?? '0');
  };
  const [isInvalid, setInvalid] = useState(false);
  const color = isInvalid ? { color: '#f55' } : {};
  const [loading, setLoading] = useState(false);

  // TODO check receive account id
  const onSubmit = async () => {
    console.log('inputPrice---->', inputPrice);
    if (!inputPrice || !isInvalid) {
      return;
    }
    if (!account) {
      return console.error('not fund account');
    }
    setLoading(true);
    // TODO fail tips
    await send(account, receive, inputPrice);
    setLoading(false);
    push('/success');
  };
  return (
    <>
      <Header />
      <Card>
        <SendReceiveTab />
        <div className={styles.amountInputWrapper}>
          <input
            type="number"
            placeholder="0"
            data-test-id="sendMoneyAmountInput"
            maxLength={18}
            value={inputPrice}
            onInput={(e: any) => {
              const v = e.target.value;
              setInputPrice(v);
              setInvalid(v > parseInt(uiNearBalance ?? '0'));
            }}
            style={{
              fontSize: parseFloat(inputPrice || '0') > 1e6 ? 40 : 68,
              ...color,
            }}
          />
        </div>
        <div className={styles.usdAmount}>
          <div>
            <div className={styles.fiatAmount}>
              ≈ ${parseFloat(usdPrice || '0') * parseFloat(inputPrice || '0')}{' '}
              USD
            </div>
          </div>
        </div>
        <button type="button" onClick={onMax} className={styles.max}>
          {intl.formatMessage({ id: 'balance.max' })}
        </button>
        <div style={{ height: 30 }}></div>
        <AssetsItem />
        {/* <div className={styles.accountItem}>
          <div className={styles.top}>
            <div>{intl.formatMessage({ id: 'account' })} ID</div>
            <div></div>
          </div>
          <div className={styles.bottom}>
            <input />
            <span>.{uiNetworkId}</span>
          </div>
        </div> */}
        <div style={{ height: 30 }}></div>
        <Input
          style={{ height: 48, borderRadius: 8 }}
          prefix={<b>{intl.formatMessage({ id: 'balance.sendTo' })}</b>}
          suffix={
            <span className="gray">
              {intl.formatMessage({ id: 'account' })} ID
            </span>
          }
          value={receive}
          onInput={(event: any) => setReceive(event?.target?.value)}
        />
        <div
          style={{ minHeight: 30, marginBottom: 15, marginTop: 10 }}
          className="gray"
        >
          {intl.formatMessage({ id: 'balance.sendToTips' })}
        </div>
        <Button
          type="primary"
          shape="round"
          onClick={onSubmit}
          block
          disabled={isInvalid || !inputPrice || !receive}
          loading={loading}
          style={{ height: 48 }}
        >
          {intl.formatMessage({ id: 'balance.sendToConfirm' })}
        </Button>
      </Card>
    </>
  );
};
