import { useIntl, Link } from 'umi';
import styles from './baseAction.less';
export const WalletBaseAction = () => {
  const intl = useIntl();
  return (
    <div>
      <div className={styles.buttons}>
        <button className="sc-bdvvtL bAHmiV dark-gray">
          <Link to="send">
            <svg
              className="send-icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 2L11 13"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M22 2L15 22L11 13L2 9L22 2Z"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </Link>
          {intl.formatMessage({ id: 'baseAction.send' })}
        </button>
        <button
          className="sc-bdvvtL bAHmiV dark-gray"
          data-test-id="balancesTab.receive"
        >
          <Link to="receive">
            <svg
              className="down-arrow-icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 15L9 20L4 15"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M20 4H13C11.9391 4 10.9217 4.42143 10.1716 5.17157C9.42143 5.92172 9 6.93913 9 8V20"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </Link>
          {intl.formatMessage({ id: 'baseAction.receive' })}
        </button>
        {false && (
          <button
            className="sc-bdvvtL bAHmiV dark-gray"
            data-test-id="balancesTab.buy"
          >
            <div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M12 8V16"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M8 12H16"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
            {intl.formatMessage({ id: 'baseAction.topUp' })}
          </button>
        )}
      </div>
    </div>
  );
};
