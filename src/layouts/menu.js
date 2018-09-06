import React from 'react';
import { connect } from 'dva';
import { Menu, Icon } from 'antd';
import router from 'umi/router';

const SubMenu = Menu.SubMenu;

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
