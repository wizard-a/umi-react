import React, { Component } from 'react'
import BaseLayout from './baseLayout';
import { init } from './init';

export class Index extends Component {
  constructor() {
    super();
    init();
  }
  render() {
    const {location: {pathname}, children} = this.props;
    if (pathname === '/login') {
      return <React.Fragment>
        {children}
      </React.Fragment>;
    }
    return (
      <BaseLayout {...this.props} />
    );
  }
}

export default Index;
