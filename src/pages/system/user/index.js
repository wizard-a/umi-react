import React from 'react';
import {Icon} from 'antd';


const IconFont = Icon.createFromIconfontCN({
  scriptUrl: 'https//localhost:8000/fonts/iconfont/iconfont.js',
})

class User extends React.Component {

  render() {
    return (
      <div>
        User List
        sdfs
        <IconFont type='close-square-o' />
      </div>
    );
  }
}

export default User;
