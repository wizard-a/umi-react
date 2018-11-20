import React, { Component } from 'react';
import request from 'utils/request';
import { stringify as qsStringify } from 'qs';
// import { Table } from 'antd';
import BasicTable from './basicTable';


function handlerParamsError(params) {
  if (params.url === undefined) {
    throw Error('tableEffectHoc params url require!');
  }

  if (!(params.BTable || params.columns)) {
    throw Error('tableEffectHoc params BTable or columns require!');
  }
}

export default ({url, reqMethod = 'get', BTable, ...tableProps}) => (WrappedComponent) =>  class TableLoader extends Component {

  constructor() {

    handlerParamsError({url, BTable, ...tableProps});

    super();
    this.page = {
      search: '',
      pageIndex: 1,
      pageNum: 10,
      orderName: 'createTime',
      orderBy: 'desc',
    }

    this.state = {
      data: [],
      total: 0,
      loading: false,
      sortedInfo: {
        order: 'descend',
        columnKey: 'createTime',
      }
    }
  }

  componentDidMount = () => {
    this.getData();
  }

  onPageChange = (pageIndex, pageNum) => {
    this.getData({
      pageIndex,
    });
  }

  onShowSizeChange = (pageIndex, pageNum) => {
    this.getData({
      pageIndex: 1,
      pageNum,
    });
  }

  onChange = (pagination, filters, sorter, extra) => {
    const {current, pageSize} = pagination;

    if (Object.keys(sorter).length === 0) {
      this.page.orderBy = this.page.orderBy === 'asc' ? 'desc' : 'asc';
    } else {
      this.page.orderName = sorter.field;
      this.page.orderBy = sorter.order === 'descend' ? 'desc' : 'asc';
    }

    /**
     * 处理filter
     */
    Object.keys(filters).forEach(key => {
      const currValue = filters[key]
      if (currValue.length > 0) {
        this.page[key] = currValue.join(',');
      } else {
        delete this.page[key];
      }
    })

    this.getData({
      pageIndex: current,
      pageNum: pageSize,
    });
  }

  /**
   * 异步获取列表数据
   */
  getData = (params) => {
    this.page = {
      ...this.page,
      ...params,
    }

    this.setState({
      loading: true,
    });
    const requestUrl = `${url}?${qsStringify(this.page)}`;
    request[reqMethod](requestUrl).then(res => {
      this.setState({
        data: res.rows,
        total: res.count,
        loading: false,
      });
    });
  }

  render() {
    const {data, total, loading} = this.state;
    const NewTable = (BTable === null || BTable === undefined) ? BasicTable : BTable;
    return (
      <React.Fragment>
        <WrappedComponent getData={this.getData} />
        <NewTable
          getData={this.getData}
          sorter={{
            filed: this.page.orderName,
            order: this.page.orderBy,
          }}
          loading={{
            delay: 100,
            spinning: loading,
          }}
          rowKey='_id'
          dataSource={data}
          total={total}
          onChange={this.onChange}
          pagination={{
            current: this.page.pageIndex,
            pageSize: this.page.pageNum,
            total: total,
            showSizeChanger: true,
          }}
          {...tableProps}
        />
      </React.Fragment>
    )
  }
}
