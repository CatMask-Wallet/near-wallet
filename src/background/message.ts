import { derivePath } from 'near-hd-key';
import bs58 from 'bs58';
import nacl from 'tweetnacl';
import { KeyPair } from 'near-api-js';
// import { Buffer } from 'buffer'

// if(!window.Buffer){
//     window.Buffer = Buffer
// }

import { mnemonicToSeedSync } from 'bip39';
// const bip39 = require('bip39-light');

const KEY_DERIVATION_PATH = "m/44'/397'/0'";
const CAT_MASK_MESSAGE_BTOC_TYPE =
  'chrome_web3_wallet_CatMaskMessageType_background_to_content';

// const generateSeedPhrase = (entropy: any) => {
//     return parseSeedPhrase(entropy !== undefined ? bip39.entropyToMnemonic(entropy) : bip39.generateMnemonic())
// }

const normalizeSeedPhrase = (seedPhrase: string) =>
  seedPhrase
    .trim()
    .split(/\s+/)
    .map((part) => part.toLowerCase())
    .join(' ');

const parseSeedPhrase = (seedPhrase: any, derivationPath?: string) => {
  const seed = mnemonicToSeedSync(normalizeSeedPhrase(seedPhrase));
  const { key } = derivePath(
    derivationPath || KEY_DERIVATION_PATH,
    seed.toString('hex'),
  );
  const keyPair = nacl.sign.keyPair.fromSeed(key);
  const secretKey = 'ed25519:' + bs58.encode(Buffer.from(keyPair.secretKey));
  const publicKey = 'ed25519:' + bs58.encode(Buffer.from(keyPair.publicKey));
  return { seedPhrase, secretKey, publicKey };
};

window.onload = function () {
  try {
    const json = JSON.parse(localStorage.ptc_message_json);
    // @ts-ignore
    window['message-view'].innerText = json?.message;
    // @ts-ignore
    window['origin-view'].innerText = json.origin;
  } catch (error) {
    console.log(error);
  }
};

// @ts-ignore
window['message-approved-button'].onclick = function () {
  console.log(
    'derivePath--->',
    derivePath("m/44'/397'/0'", Buffer.from('test').toString('hex')),
  );

  // @ts-ignore
  const json = JSON.parse(localStorage.ptc_message_json);
  // @ts-ignore
  chrome.tabs.query(
    { active: true, currentWindow: false },
    (tabs: { id: number }[]) => {
      const recoverySeedPhrase = localStorage.recoverySeedPhrase;
      if (!recoverySeedPhrase) {
        return console.error('not SeedPhras');
      }
      if (!json.message) {
        return console.error('not message');
      }
      const { publicKey, secretKey } = parseSeedPhrase(recoverySeedPhrase);
      // console.log('parseSeedPhrase----->', publicKey.toString(), secretKey);
      const keyPair = KeyPair.fromString(secretKey);

      console.log('sign--->', keyPair.sign(Buffer.from(json.message)));
      tabs.map((tab) => {
        // @ts-ignore
        chrome.tabs.sendMessage(
          tab.id,
          {
            type: CAT_MASK_MESSAGE_BTOC_TYPE,
            data: 'sign::' + publicKey.toString(), //TODO
            origin: json.origin,
          },
          () => {
            // window.close()
          },
        );
      });
    },
  );
};
