import { Link, useIntl, useLocation } from 'umi';
import styles from './sendReceive.less';

export const SendReceiveTab = () => {
  const location = useLocation();
  const intl = useIntl();
  return (
    <>
      <div className={styles.tab}>
        <Link
          to={'/send'}
          role="button"
          className={location.pathname === '/send' ? styles.active : ''}
        >
          {intl.formatMessage({ id: 'baseAction.send' })}
        </Link>
        <Link
          to={'/receive'}
          role="button"
          className={location.pathname === '/receive' ? styles.active : ''}
        >
          {intl.formatMessage({ id: 'baseAction.receive' })}
        </Link>
      </div>
    </>
  );
};
