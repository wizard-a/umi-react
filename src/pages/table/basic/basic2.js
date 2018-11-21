import React from 'react';
import { BTable } from 'bcomponents';
import { Row, Col, Input, Form } from 'antd';
import formValid from 'utils/FormValid';
import ListTable from './_components/list';
import layoutConfig from 'config/layoutConfig';

const formItemLayout = layoutConfig.form.default;
const Search = BTable.Search;
const Create = BTable.Create;
const FormItem = Form.Item;

@BTable.tableEffectHoc({
  url: '/api/table/list',
  BTable: ListTable,
})
class BasicTable extends React.Component {

  render() {
    const {getData} = this.props;
    return (
      <React.Fragment>
        <Row justify='space-between' style={{ marginBottom: '20px' }}>
          <Col span={12}>
            <Search getData={getData} />
          </Col>
          <Col span={12} style={{textAlign: 'right'}}>
            <Create
              url='/api/table'
              getData={getData}
            >
              {
                ({getFieldDecorator}) => (
                  <React.Fragment>
                    <FormItem {...formItemLayout} label="名称">
                      {getFieldDecorator('name', {
                        initialValue: '',
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
                        initialValue: '',
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
            </Create>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default BasicTable;
