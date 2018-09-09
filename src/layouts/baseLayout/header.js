import React, { Component } from 'react';
import { Avatar, Dropdown, Menu, Switch, Icon } from 'antd';
import { connect } from 'dva';
import styles from './baseLayout.less';

@connect()
class Header extends Component {

  /**
   * 退出登录
   */
  logout = () => {
    this.props.dispatch({
      type: 'user/logout',
    })
  }

  render() {
    const menu =  (
      <Menu>
        <Menu.Item>
          <span onClick={this.logout}>
            <Icon type="logout" theme="outlined" />
            <span style={{ marginLeft: '10px' }}>退出登录</span>
          </span>
        </Menu.Item>
      </Menu>
    );
    return (
      <div className={styles.header}>
        <Dropdown overlay={menu} placement='bottomCenter'>
          <div className={styles.headerButton}>
            <Avatar icon="user" />
            <span className={styles.headerUser}>admin</span>
          </div>
        </Dropdown>
        <div className={styles.headerButton}>
          <Switch checkedChildren="EN" unCheckedChildren="ZH" defaultChecked />
        </div>
      </div>
    )
  }
}


export default Header;
