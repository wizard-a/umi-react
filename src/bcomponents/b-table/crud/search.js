import React, { Component } from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types'
const InputSearch = Input.Search;

let time = null;

class Search extends Component {

  onChange = (e) => {
    const {value} = e.target;
    if (time) {
      clearTimeout(time);
    }
    time = setTimeout(() => {
      this.getData(value);
    }, 300);
  }

  onSearch = (value) => {
    this.getData(value);
  }

  getData = (value) => {
    const { getData } = this.props;
    getData && getData({
      search: value,
    });
  }

  render() {
    const {getData, ...otherProps} = this.props;
    return (
      <InputSearch
        style={{width: 300}}
        placeholder="请输入关键字"
        enterButton
        onSearch={this.onSearch}
        {...otherProps}
        onChange={this.onChange}
      />
    )
  }
}

Search.propTypes = {
  getData: PropTypes.func.isRequired
}

export default Search;

