import { Card } from '@/view/com/Card';
import { Divider } from 'antd';
import Button from 'antd/lib/button';
import { KeyPair } from 'near-api-js';
import { FC, useEffect, useState } from 'react';
// @ts-expect-error
import { parseSeedPhrase } from 'near-seed-phrase';
const CAT_MASK_MESSAGE_BTOC_TYPE =
  'chrome_web3_wallet_CatMaskMessageType_background_to_content';

export const BackgroundMessagePage: FC<{}> = () => {
  const [messageText, setMessageText] = useState('--');
  const [originText, setOriginText] = useState('--');
  useEffect(() => {
    try {
      const json = JSON.parse(localStorage.ptc_message_json);
      // const json = {message: 'xx', origin: 'oo'}
      setMessageText(json?.message);
      setOriginText(json?.origin);
    } catch (error) {
      console.log(error);
    }
  }, []);
  const onApprove = () => {
    const json = JSON.parse(localStorage.ptc_message_json);
    // @ts-ignore
    chrome.tabs.query(
      { active: true, currentWindow: false },
      (tabs: { id: number }[]) => {
        const recoverySeedPhrase = localStorage.recoverySeedPhrase;
        if (!recoverySeedPhrase) return console.error('not SeedPhras');
        if (!json.message) return console.error('not message');
        const { publicKey, secretKey } = parseSeedPhrase(recoverySeedPhrase);
        const keyPair = KeyPair.fromString(secretKey);
        const sign = keyPair.sign(Buffer.from(json.message));

        tabs.map((tab) => {
          // @ts-ignore
          chrome.tabs.sendMessage(
            tab.id,
            {
              type: CAT_MASK_MESSAGE_BTOC_TYPE,
              data: {
                publicKey: publicKey.toString(),
                signature: Buffer.from(sign.signature).toString('base64'),
              },
              origin: json.origin,
            },
            () => {
              window.close();
            },
          );
        });
      },
    );
  };
  return (
    <>
      <Card>
        <div style={{ textAlign: 'center' }}>
          <h1>Message</h1>
          <h3>
            Origin: <span style={{ fontSize: 14 }}>{originText}</span>
          </h3>
        </div>
        <Divider />
        <div>
          <h3>Message: </h3>
          <div>{messageText}</div>
        </div>
        <Divider />
        <Button id="message-approved-button" onClick={onApprove}>
          approve
        </Button>
      </Card>
    </>
  );
};
