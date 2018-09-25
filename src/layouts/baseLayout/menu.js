import React from 'react';
import { Menu, Icon } from 'antd';
import router from 'umi/router';

const SubMenu = Menu.SubMenu;

class MenuComponent extends React.Component {

  link = (url) => {
    router.push(url);
  }

  renderMenu = (data) => {
    const {currLocale} = this.props;
    return data && data.map(d => {
      const name = currLocale === 'zh_CN' ? d.name : d.enName;
      if (d.children && d.children.length > 0) {
        return <SubMenu
          key={d.id}
          title={<span><Icon type={d.icon} /><span>{name}</span></span>}
        >
          {this.renderMenu(d.children)}
        </SubMenu>
      }
      return (
          <Menu.Item
            key={d.id}
            onClick={() => {this.link(d.url)}}
          >
            {d.icon && <Icon type={d.icon} />}
            <span>{name}</span>
        </Menu.Item>
      )
    });
  }

  render() {
    const { menu } = this.props;
    return (
      <Menu theme='dark'
        defaultSelectedKeys={['1']}
        mode='inline'
      >
        {
          this.renderMenu(menu)
        }
      </Menu>
    );
  }
}

export default MenuComponent;
