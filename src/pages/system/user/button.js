import React from 'react';

class Button extends React.PureComponent {

  render() {
    const { children, onClick } = this.props;
    console.log('button render');
    return (
      <div>
        <button onClick={onClick}>
          {children}
        </button>
      </div>
    );
  }
}

export default Button;
