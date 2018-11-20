import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {Form, Modal, Button} from 'antd';
import request from 'utils/request';

@Form.create()
class Create extends Component {

  static defaultProps = {
    reqMethod: 'post',
    params: {},
  }

  state = {
    visible: false,
  }

  create = () => {
    this.setState({visible: true});
  }

  handleCancel = () => {
    this.setState({visible: false});
  }

  handleOk = () => {
    const {form: {validateFields}, params, url, reqMethod, getData} = this.props;
    validateFields((err, reqParams) => {
      if (!err) {
        request[reqMethod](url, {...reqParams, ...params }).then(res => {
          if (res) {
            this.setState({visible: false});
            getData && getData({
              pageIndex: 1,
            });
          }
        })
      }
    });
  }

  render() {
    const {visible} = this.state;
    const {children, form} = this.props;
    return (
      <React.Fragment>
        <Button
          type='primary'
          onClick={this.create}
        >添加</Button>
        <Modal
          title="添加"
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

Create.propTypes = {
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
}

Create.displayName = 'BTable(Create)'

export default Create;

