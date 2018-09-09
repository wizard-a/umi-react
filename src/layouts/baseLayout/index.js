import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import styles from './baseLayout.less';
import MenuComponent from './menu';
import HeaderComponent from './header';
import router from 'umi/router';
import { checkLogin } from '../init';
const { Header, Content, Footer, Sider } = Layout;

class BaseLayout extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: false,
    }
    // 检测是否登录
    const isLogin  = checkLogin();
    if (!isLogin) {
      router.push('login');
    }
  }

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className={styles.logo} />
          <MenuComponent />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <HeaderComponent />
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default BaseLayout;
