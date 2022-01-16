import { Menu, Dropdown } from 'antd';
import { setLocale } from 'umi';
import { EnZhIcon } from '../icon/enZh';

export const LocaleSwitch = () => {
  const menu = (
    <Menu>
      <Menu.Item onClick={() => setLocale('en-US', false)}>English</Menu.Item>
      <Menu.Item onClick={() => setLocale('zh-CN', false)}>中文简体</Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu}>
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        <EnZhIcon />
      </a>
    </Dropdown>
  );
};
