import React from 'react';
import PropTypes from 'prop-types';
import request from 'utils/request';
import {Modal} from 'antd';

const confirm = Modal.confirm;

function handleError({url, getData }) {
  if (!url) {
    throw Error('b-table delete params url require!');
  }

  if (!getData) {
    throw Error('b-table delete params getData require!');
  }
}

function del({url, reqMethod = 'delete', getData }) {
  handleError({url, getData});
  confirm({
    title: '确定要删除吗?',
    onOk() {
      console.log('OK');
      request[reqMethod](url).then(res => {
        if (res) {
         getData();
        }
      });
    },
    onCancel() {
    },
  });
}

export default del;
