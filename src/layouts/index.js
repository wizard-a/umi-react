import React from 'react';
import BaseLayout from './baseLayout';
import Redirect from 'umi/redirect';

export default function(props) {
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
