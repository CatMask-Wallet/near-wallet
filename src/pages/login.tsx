import { Card } from '@/view/com/Card';
import { Header } from '@/view/com/head';
import { Drawer, Button, Divider, message } from 'antd';
import { Link, useIntl } from 'umi';

export default () => {
  const intl = useIntl()
  return (
    <>
      <Header />
      <Card>
        <div style={{ height: 20 }}></div>
        <h1>Near Wallet</h1>
        {/* <Button
          onClick={() => {
            message.info('coming soon')
          }}
        >
          Create
        </Button> */}
        <div style={{ height: 20 }}></div>
        <div>
          {/* {intl.formatMessage({id: ''})} */}
          <Button
            // type="primary"
            shape="round"
            block
            style={{ height: 48 }}
          >
            {intl.formatMessage({id: 'create'})} &nbsp; <span > (coming soon)</span>
          </Button>
        </div>
        <div style={{ height: 20 }}></div>
        <Button
          type="primary"
          shape="round"
          block
          style={{ height: 48 }}
        >
          <Link to="/recover">{intl.formatMessage({ id: 'recover.text.button' })}</Link>
        </Button>
      </Card>
    </>
  );
};
