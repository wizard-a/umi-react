import React from 'react';
import { BTable } from 'bcomponents';

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
}]


@BTable.tableEffectHoc({
  url: '/api/table/list',
  columns: columns
})
class BasicTable extends React.Component {

  render() {
    return (
      <div style={{marginBottom: '20px'}}>
        基础 Table
      </div>
    );
  }
}

export default BasicTable;
