import React from 'react';
import BaseLayout from './baseLayout';
import { init } from './init';

export default function(props) {
  init();
  const {location: {pathname}} = props;
  if (pathname === '/login') {
    return <React.Fragment>
      {props.children}
    </React.Fragment>;
  }
  return (
    <BaseLayout />
  );
}
