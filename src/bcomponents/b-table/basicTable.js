import React, { PureComponent } from 'react';
import { Table } from 'antd';

class BasicTable extends PureComponent {

  /**
   * 处理column排序
   */
  handleColumn = () => {
    const { columns, sorter } = this.props;
    const newColumns = [];
    for (const column of columns) {
      if (column.sorter) {
        newColumns.push({
          ...column,
          sortOrder: sorter.filed === column.dataIndex ? `${sorter.order}end` : false,
        });
        continue;
      }
      newColumns.push(column);
    };
    return newColumns;
  }

  render() {
    const {
      columns,
      sorter,
      ...otherProps} = this.props;
    const newColumns = this.handleColumn();
    return (
      <div>
        <Table
          columns={newColumns}
          {...otherProps}
        />
      </div>
    )
  }
}

export default BasicTable;
