import { Card } from '@/view/com/Card';
import { Header } from '@/view/com/head';
import { EnumNetworkSwitch, useCurrentNetworkConfig } from 'umi';
export default () => {
  const current = useCurrentNetworkConfig();
  const createUrl =
    current.networkId === EnumNetworkSwitch.Mainnet
      ? 'https://wallet.near.org/create'
      : 'https://wallet.testnet.near.org/create';
  return (
    <>
      <Header />
      <Card>
        <div>
          create Account {'---->'} &nbsp;
          {createUrl}
        </div>
      </Card>
    </>
  );
};
