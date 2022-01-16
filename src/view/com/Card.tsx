export const Card: React.FC<{}> = ({ children }) => {
  return (
    <div style={{ maxWidth: 500, minWidth: 400, margin: '20px auto' }}>
      <div style={{ maxWidth: '80vw', margin: 'auto' }}>{children}</div>
    </div>
  );
};
