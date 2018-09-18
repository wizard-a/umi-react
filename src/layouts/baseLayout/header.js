import React, { Component } from 'react';
import { Avatar, Dropdown, Menu, Icon, Select } from 'antd';
import { connect } from 'dva';
import intl from 'react-intl-universal';
import styles from './baseLayout.less';

const Option = Select.Option;

@connect(({user}) => {
  return {
    user: user.user
  }
})
class Header extends Component {

  constructor() {
    super();
    this.state = {

    }
  }

  /**
   * 退出登录
   */
  logout = () => {
    this.props.dispatch({
      type: 'user/logout',
    })
  }

  /**
   * 切换语言
   */
  onLocaleChange = (value) => {
    this.props.dispatch({
      type: 'global/changeLocale',
      payload: value,
    })
  }

  render() {
    const {currLocale, user} = this.props;
    const menu =  (
      <Menu>
        <Menu.Item>
          <span onClick={this.logout}>
            <Icon type='logout' theme='outlined' />
            <span style={{ marginLeft: '10px' }}>{intl.get('user.logout')}</span>
          </span>
        </Menu.Item>
      </Menu>
    );
    return (
      <div className={styles.header}>
        <Dropdown overlay={menu} placement='bottomCenter'>
          <div className={styles.headerButton}>
            <Avatar icon='user' />
            <span className={styles.headerUser}>{user.name}</span>
          </div>
        </Dropdown>
        <div className={styles.headerButton}>
          <Select
            defaultValue={currLocale}
            style={{ width: 100 }}
            onChange={this.onLocaleChange}>
            <Option value='zh_CN'>中文</Option>
            <Option value='en_US'>English</Option>
          </Select>
        </div>
      </div>
    )
  }
}


export default Header;
