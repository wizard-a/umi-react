import React from 'react';
import intl from 'react-intl-universal';
import locales from '../../locales';
import BaseLayout from './baseLayout';
import { connect } from 'dva';

@connect(({global}) => ({
  currLocale: global.currLocale,
}))
class Locale extends React.Component {
  componentDidMount = () => {
    this.loadLocales();
  }

  loadLocales() {
    const { currLocale, dispatch } = this.props;
    intl.init({
      currentLocale: currLocale, // TODO: determine locale here
      locales,
    })
    .then(() => {
      dispatch({
        type: 'global/setLocale',
        payload: currLocale,
      });
      // After loading CLDR locale data, start to render
	    this.setState({initDone: true});
    });
  }

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  render() {
    const { currLocale } = this.props;
    return (
      <React.Fragment>
        {currLocale && <BaseLayout />}
      </React.Fragment>
    );
  }
}

export default Locale;
