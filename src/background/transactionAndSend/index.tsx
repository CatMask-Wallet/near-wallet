import { Card } from '@/view/com/Card';
import { Divider, Collapse } from 'antd';
const { Panel } = Collapse;
import Button from 'antd/lib/button';
import { FC, useEffect, useState } from 'react';
// @ts-expect-error
import { parseSeedPhrase } from 'near-seed-phrase';
import { CAT_MASK_MESSAGE_BTOC_TYPE } from '../constant';
import { actionsObjToHash, IAuction } from '@/utils/tansaction';
import { INetworkItemConfig } from '@/models/wallet';
import { formatNearAmount } from 'near-api-js/lib/utils/format';

interface ITransactionPostData {
  contractId: string;
  actions: IAuction[];
  origin: string;
}
export const BackgroundTransacationAndSendPage: FC<{}> = () => {
  const [messageContractId, setMessageContractId] = useState<string>();
  const [messageActions, setMessageActions] = useState<IAuction[]>();
  const [originText, setOriginText] = useState('--');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    try {
      const { contractId, actions, origin } = JSON.parse(
        localStorage.ptc_message_json,
      ) as ITransactionPostData;
      setMessageContractId(contractId);
      setMessageActions(actions);
      setOriginText(origin);
    } catch (error) {
      console.log(error);
    }
  }, []);
  const onApprove = async () => {
    setLoading(true);
    try {
      const { contractId, actions } = JSON.parse(
        localStorage.ptc_message_json,
      ) as ITransactionPostData;
      const netWorkConfig = JSON.parse(localStorage.netWorkConfigs) as {
        [key: string]: INetworkItemConfig;
      };

      const recoverySeedPhrase = localStorage.recoverySeedPhrase;
      const nodeUrl = netWorkConfig[localStorage.currentNetwork].nodeUrl;
      if (!recoverySeedPhrase) {
        setLoading(false);
        return console.error('not SeedPhras');
      }
      if (!nodeUrl) {
        setLoading(false);
        return console.error(
          'not find network nodeUrl',
          netWorkConfig,
          localStorage.currentNetwork,
        );
      }
      if (actions.length === 0) {
        setLoading(false);
        return console.error('not auctions');
      }
      const { publicKey } = parseSeedPhrase(recoverySeedPhrase);
      const res = await actionsObjToHash({
        contractId,
        actions,
        nodeUrl,
        accountId: localStorage.currentAccountId,
        publicKey,
      });
      // @ts-ignore
      chrome.tabs.query(
        { active: true, currentWindow: false },
        (tabs: { id: number }[]) => {
          tabs.map((tab) => {
            // @ts-ignore
            chrome.tabs.sendMessage(
              tab.id,
              {
                type: CAT_MASK_MESSAGE_BTOC_TYPE,
                data: res,
                origin: originText,
              },
              () => {
                window.close();
              },
            );
          });
        },
      );
    } catch (error) {
      setLoading(false);
      return console.error(error);
    }
    setLoading(false);
  };
  return (
    <>
      <Card>
        <div style={{ textAlign: 'center' }}>
          <h1>Transaction And Send</h1>
          <h3>
            Origin: <span style={{ fontSize: 14 }}>{originText}</span>
          </h3>
        </div>
        <Divider />
        <div>
          <h3>ContractId: </h3>
          <h4 style={{ paddingLeft: 20, fontSize: 16 }}>{messageContractId}</h4>
          <Divider />
          <h3>Actions: </h3>
          <div>
            {messageActions?.map((auction) => {
              return (
                <div key={auction.methodName}>
                  <Collapse defaultActiveKey={[]}>
                    <Panel header={auction.methodName} key={auction.methodName}>
                      <div style={{ padding: '0px 0px 0px 20px' }}>
                        <p>deposit: {formatNearAmount(auction.deposit)} Near</p>
                        <p>gas: {auction.gas}</p>
                      </div>
                      <Collapse defaultActiveKey={[]} ghost>
                        <Panel header="args" key="1">
                          <p>{JSON.stringify(auction.args)}</p>
                        </Panel>
                      </Collapse>
                    </Panel>
                  </Collapse>
                </div>
              );
            })}
          </div>
        </div>
        <Divider />
        <Button
          loading={loading}
          id="message-approved-button"
          onClick={onApprove}
        >
          approve
        </Button>
      </Card>
    </>
  );
};
