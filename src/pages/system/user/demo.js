import React from 'react';
import Button from './button';

class Demo extends React.Component {

  get instructions() {
    if (this.props.do) {
      return 'Click the button: ';
    }
    return 'Do NOT click the button: ';
  }

  click = () => {
    alert('ss');
  }

  render() {
    return (
      <div>
        {this.instructions}
        <Button onClick={() => {}}>点击</Button>
      </div>
    );
  }
}

export default Demo;
