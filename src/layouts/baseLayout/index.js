import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import { connect } from 'dva';
import styles from './baseLayout.less';
import MenuComponent from './menu';
import HeaderComponent from './header';
import router from 'umi/router';
import { checkLogin } from '../init';
const { Header, Content, Footer, Sider } = Layout;

@connect(({auth, global}) => {
  return {
    menu: auth.menu,
    currLocale: global.currLocale,
  }
})
class BaseLayout extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: false,
      initDone: false,
    }
    // 检测是否登录
    const isLogin  = checkLogin();
    if (!isLogin) {
      router.push('/login');
    }
  }

  componentDidMount = () => {
    // 获取 menu 数据
    this.props.dispatch({
      type: 'auth/getMenu',
    })
  }

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  changeLoacle = (locale) => {
    this.props.dispatch({
      type: 'global/changeLocale',
      payload: locale,
    });
  }

  render() {
    const { menu, currLocale } = this.props;
    const {collapsed} = this.state;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={this.onCollapse}
        >
          <div className={styles.logo} style={{textAlign: 'center', lineHeight: '32px'}}>
            <span style={{fontSize: '18px', color: '#fff'}}>
              {collapsed ? 'U-R' : 'Umi-React' }
            </span>
          </div>
          <MenuComponent currLocale={currLocale} menu={menu} />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <HeaderComponent currLocale={currLocale} />
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
