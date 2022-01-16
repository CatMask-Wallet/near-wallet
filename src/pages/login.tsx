import { Card } from '@/view/com/Card';
import { Header } from '@/view/com/head';
import { Drawer, Button, Divider } from 'antd';
export default () => {
  return (
    <>
      <Header />
      <Card>
        <Button
          onClick={() => {
            // TODO
          }}
        >
          Create
        </Button>
        <Button
          onClick={() => {
            // TODO
          }}
        >
          Reset
        </Button>
      </Card>
    </>
  );
};
