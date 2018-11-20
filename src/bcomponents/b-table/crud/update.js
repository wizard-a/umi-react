import React, { Component } from 'react';
import {Form, Modal} from 'antd';
import PropTypes from 'prop-types'
import request from 'utils/request';

@Form.create()
class Update extends Component {

  handleCancel = () => {
    const {onCancel} = this.props;
    onCancel && onCancel();

  }

  handleOk = () => {
    const {form: {validateFields}, params, url, getData, onCancel, reqMethod} = this.props;
    validateFields((err, reqParams) => {
      if (!err) {
        request[reqMethod](url, {...reqParams, ...params }).then(res => {
          if (res) {
            this.setState({visible: false});
            getData && getData();
            onCancel && onCancel();
          }
        })
      }
    });
  }

  render() {
    const {visible, children, form} = this.props;
    return (
      <React.Fragment>
        <Modal
          title="编辑"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          destroyOnClose={true}
        >
          {children && children(form)}

        </Modal>
      </React.Fragment>
    )
  }
}

Update.propTypes = {
  /**
   * 接口地址
   */
  url: PropTypes.string.isRequired,
  /**
   * 接口请求方式
   */
  reqMethod: PropTypes.oneOf(['get', 'post', 'put', 'delete']),
  /**
   * 请求携带其它参数
   */
  params: PropTypes.object,
  /**
   * 请求列表数据方法
   */
  getData: PropTypes.func.isRequired,
  /**
   * 弹框是否显示
   */
  visible: PropTypes.bool,

  /**
   * 弹框关闭事件
   */
  onCancel: PropTypes.func,
}

Update.defaultProps = {
  reqMethod: 'put',
  params: {},
  visible: false,
}


Update.displayName = 'BTable(Update)'

export default Update;
