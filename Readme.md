### 基于umi搭建React快速开发框架

### 介绍
基于umi搭建一个快速开发框架，react 应用框架。umi 以路由为基础的，支持类 next.js 的约定式路由，以及各种进阶的路由功能，并以此进行功能扩展，比如支持路由级的按需加载。
我们会在基于umi的基础上，开发出一个框架通用功能和业务功能
框架功能列表
* 全局layout
* 权限管理
* 封装列表增删改查
* 国际化
* 集成 g2 chart图表
* 集成 socket.io
* ....(后续补充)

业务功能
* 用户管理
* ....(后续补充)
### 创建项目
umi 提供了脚手架供我们快速创建项目。参考[umi脚手架创建项目](https://umijs.org/zh/guide/create-umi-app.html)
包管理器我们推荐用[yarn](https://yarn.bootcss.com/)来替换npm,yarn在包安装速度上确实提升不少

1.在你的空目录下执行，
```
yarn create umi

我们需要选择 antd,code splitting, dll, hard source
```
2.安装依赖
```
yarn
```
3.启动本地开发
```
yarn start
```

### 构建全局layout和菜单
umi规定 `src/layouts` 目录下存放我们全局layout组件, 在`index.js`中加入代码如下
```
class BaseLayout extends React.Component {
  state = {
    collapsed: false,
  };

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
          <Header style={{ background: '#fff', padding: 0 }} />
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
```
layout 组件需要 `MenuComponent`, 我们来构建一下`MenuComponent`组件。
在构建组件之前我们需要先mock菜单数据，umi支持mock，我们在mock文件下添加 auth.js

```
@connect(({auth}) => {
  return {
    menu: auth.menu,
  }
})
class MenuComponent extends React.Component {

  componentDidMount() {
    // 获取 menu 数据
    this.props.dispatch({
      type: 'auth/getMenu',
    })
  }

  link = (url) => {
    router.push(url);
  }

  renderMenu = (data) => {
    return data && data.map(d => {
      if (d.children && d.children.length > 0) {
        return <SubMenu
          key={d.id}
          title={<span><Icon type={d.icon} /><span>{d.name}</span></span>}
        >
          {this.renderMenu(d.children)}
        </SubMenu>
      }
      return (
          <Menu.Item
            key={d.id}
            onClick={() => {this.link(d.url)}}
          >
            <Icon type={d.icon} />
            <span>{d.name}</span>
        </Menu.Item>
      )
    });
  }

  render() {
    const { menu } = this.props;
    return (
      <Menu theme='dark'
        defaultSelectedKeys={['1']}
        mode='inline'>
        {
          this.renderMenu(menu)
        }
      </Menu>
    );
  }
}

export default MenuComponent;

```
总的来说，menu组件会访问会调用saga effect,发出异步请求获取数据，然后通过dva connect获取menu数据做渲染。