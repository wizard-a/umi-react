import React from 'react';
import {Divider, Form, Input} from 'antd';
import { BTable } from 'bcomponents';
import layoutConfig from 'config/layoutConfig';
import formValid from 'utils/FormValid';

const Update = BTable.Update;
const FormItem = Form.Item;

const formItemLayout = layoutConfig.form.default;

class List extends React.Component {

  state = {
    updateData: null,
    visible: false,
  }

  onUpdate = (data) => {
    this.setState({
      updateData: data,
      visible: true,
    });
  }

  onUpdateCancel = () => {
    this.setState({
      visible: false,
    });
  }

  onDel = (data) => {
    const {getData} = this.props;
    BTable.Del({
      url: `/api/table/${data.id}`,
      getData,
    })
  }

  render() {
    const { pagination: { current, pageSize } } = this.props;
    const startIndex = (current - 1) * pageSize;
    const columns = [{
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
    }, {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: true,
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      sorter: true,
    }, {
      title: '操作',
      dataIndex: 'Action',
      key: 'Action',
      render: (text, record) => (
        <span>
          <a onClick={() => this.onUpdate(record)}>编辑</a>
          <Divider type="vertical" />
          <a onClick={() => this.onDel(record) }>删除</a>
        </span>
      ),
    }];

    const {updateData, visible} = this.state;
    return (
      <React.Fragment>
        <BTable
          columns={columns}
          {...this.props}
        />
        {
          updateData && (
            <Update
              visible={visible}
              url={`/api/table/${updateData.id}`}
              onCancel={this.onUpdateCancel}
              getData={this.props.getData}
            >
              {
                ({getFieldDecorator}) => (
                  <React.Fragment>
                    <FormItem {...formItemLayout} label="名称">
                      {getFieldDecorator('name', {
                        initialValue: updateData.name,
                        validateFirst: true,
                        rules: [
                          formValid.require(),
                          formValid.name(),
                        ],
                      })(
                        <Input placeholder="请输入渠道" />
                      )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="Email">
                      {getFieldDecorator('email', {
                        initialValue: updateData.email,
                        validateFirst: true,
                        rules: [
                          {type: 'email', message: '请输入正确的Email'},
                          formValid.require(),
                        ],
                      })(
                        <Input placeholder="请输入email" />
                      )}
                    </FormItem>
                  </React.Fragment>
                )
              }
            </Update>
          )
        }
      </React.Fragment>
    );
  }
}

export default List;
