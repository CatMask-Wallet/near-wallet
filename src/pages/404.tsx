import { Link } from 'umi';

export default () => {
  return (
    <>
      <br />
      <br />
      <br />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h2 style={{ padding: '20px', fontSize: 32, color: '#555' }}>404</h2>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Link to="/">To Wallet Overview</Link>
      </div>
    </>
  );
};
