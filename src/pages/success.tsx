import { Card } from '@/view/com/Card';
import { Header } from '@/view/com/head';
import { OverviewAccountInfo } from '@/view/com/overview/accountInfo';
import { Result } from 'antd';

const SuccessPage = () => {
  return (
    <>
      <Header />
      <Card>
        {/* <OverviewAccountInfo /> */}
        {/* <Divider /> */}
        <Result
          status="success"
          title="Transfer success"
          // subTitle="。。。"
          extra={[]}
        />
      </Card>
    </>
  );
};
export default SuccessPage;
