import React from 'react';
import Demo from './demo';

class User extends React.Component {

  state = {
    do: false,
  }

  onCollapse = () => {
    this.setState({
      do: !this.state.do
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.onCollapse}>切换</button>
        <Demo do={this.state.do} />
      </div>
    );
  }
}

export default User;
