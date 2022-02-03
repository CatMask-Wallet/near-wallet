import { LocaleSwitch } from '@/view/com/localeSwitch';
import {
  setLocale,
  useDispatch,
  useHistory,
  useIntl,
  useLocation,
  useParams,
  useSelector,
  WalletStateType,
} from 'umi';
import { useEffect } from 'react';
import { Divider } from 'antd';
import { WalletBaseAction } from '@/view/com/baseAction';
import { NetworkSwitch } from '@/view/com/networkSwitch';
import { NearMaskIcon } from '@/view/icon/nearMask';
import { OverviewAccountInfo } from '@/view/com/overview/accountInfo';
import { useAccount } from '@/hooks.ts/wallet';
import { AccountBalance } from '@/view/com/overview/accountBalance';
import { Header } from '@/view/com/head';
import { RecentActivity } from '@/view/com/ren';
import { BackgroundMessagePage } from '@/background/message/index';
// import { derivePath } from 'near-hd-key';
// import bs58 from 'bs58';
// import nacl from 'tweetnacl';
// import { KeyPair } from 'near-api-js';
// import {mnemonicToSeedSync} from 'bip39';
// const KEY_DERIVATION_PATH = "m/44'/397'/0'"
// import {Buffer} from 'buffer'

// const normalizeSeedPhrase = (seedPhrase: string) => seedPhrase.trim().split(/\s+/).map(part => part.toLowerCase()).join(' ')

// const parseSeedPhrase = (seedPhrase: any, derivationPath?: string) => {
//   const seed = mnemonicToSeedSync(normalizeSeedPhrase(seedPhrase))
//   const { key } = derivePath(derivationPath || KEY_DERIVATION_PATH, seed.toString('hex'))
//   const keyPair = nacl.sign.keyPair.fromSeed(key)
//   const publicKey = 'ed25519:' + bs58.encode(Buffer.from(keyPair.publicKey))
//   const secretKey = 'ed25519:' + bs58.encode(Buffer.from(keyPair.secretKey))
//   return { seedPhrase, secretKey, publicKey }
// }

export default function IndexPage() {
  const params = useLocation() as any;
  const type = params?.query?.type;
  console.log('type', type);
  if (type === 'backgroundMessage') {
    return <BackgroundMessagePage />;
  }
  const history = useHistory();
  const { accountId, account, balanceInfo } = useSelector<any, WalletStateType>(
    (state) => state.wallet,
  );
  useEffect(() => {
    if (!accountId && !Boolean(localStorage.currentAccountId)) {
      history.replace('/login');
    }
  }, [accountId]);
  // const normalizeSeedPhrase = (seedPhrase: string) => seedPhrase.trim().split(/\s+/).map(part => part.toLowerCase()).join(' ')

  // useEffect(() => {
  //   const recoverySeedPhrase = localStorage.recoverySeedPhrase
  //   const { publicKey, secretKey } = parseSeedPhrase(recoverySeedPhrase);
  //       // console.log('parseSeedPhrase----->', publicKey.toString(), secretKey);
  //       const keyPair = KeyPair.fromString(secretKey);
  //       console.log(
  //         'sign--->',
  //         keyPair.sign(Buffer.from('aa')).signature,
  //         publicKey.toString()
  //     )

  //     console.log(
  //       'derivePath--->',
  //       derivePath("m/44'/397'/0'", Buffer.from('test').toString('hex'))
  //     )
  // }, [])
  return (
    <div>
      <Header />
      <OverviewAccountInfo />
      <Divider />
      <AccountBalance />
      <WalletBaseAction />
      <Divider />
      <RecentActivity />
    </div>
  );
}
