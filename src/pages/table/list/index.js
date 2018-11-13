import React from 'react';
import { List, message, Avatar, Spin, Input } from 'antd';
import { connect } from 'dva';
import {WindowScroller, AutoSizer, List as VList, InfiniteLoader} from 'react-virtualized'

const Search = Input.Search;
@connect(({tableList}) => ({
  ...tableList,
}))
class ListDemo extends React.Component {
  state = {
    loading: false,
    isSearch: false,
  }

  ifLoader = React.createRef();
  loadedRowsMap = {}

  getData = (params = {}) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableList/getList',
      payload: params,
    });
  }

  componentDidMount() {
    this.getData();
  }

  onSearch = (value) => {
    console.log('value', value);
    window.registerChild = this.ifLoader;
    console.log('_registeredChild', this.ifLoader.current._registeredChild);
    this.loadedRowsMap = {};
    this.props.dispatch({
      type: 'tableList/clearData'
    });
    // this.ifLoader.current.resetLoadMoreRowsCache();
    this.getData({
      pageIndex: 1,
      keyworks: value,
    });
  }

  handleInfiniteOnLoad = ({ startIndex, stopIndex }) => {
    const { data, params } = this.props;
    this.setState({
      loading: true,
    });
    for (let i = startIndex; i <= stopIndex; i++) {
      // 1 means loading
      this.loadedRowsMap[i] = 1;
    }
    // if (data.length > 200) {
    //   message.warning('Virtualized List loaded all');
    //   this.setState({
    //     loading: false,
    //   });
    //   return;
    // }
    params.pageIndex++;
    this.getData(params);
  }

  isRowLoaded = ({ index }) => {
    return !!this.loadedRowsMap[index];
  }

  renderItem = ({ index, key, style }) => {
    const { data } = this.props;
    const item = data[index];
    return (
      <List.Item key={key} style={style}>
        <List.Item.Meta
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title={<a href="https://ant.design">{item && item.name}</a>}
          description={item && item.email}
        />
        <div>Content</div>
      </List.Item>
    );
  }

  render() {
    const { data } = this.props;
    console.log('data', data);
    const vlist = ({ height, isScrolling, onChildScroll, scrollTop, onRowsRendered, width, registerChild }) => (
      <VList
        ref={registerChild}
        autoHeight
        height={height}
        isScrolling={isScrolling}
        onScroll={onChildScroll}
        overscanRowCount={2}
        rowCount={200}
        rowHeight={73}
        rowRenderer={this.renderItem}
        onRowsRendered={onRowsRendered}
        scrollTop={scrollTop}
        width={width}
      />
    );
    const autoSize = ({ height, isScrolling, onChildScroll, scrollTop, onRowsRendered, registerChild }) => (
      <AutoSizer disableHeight>
        {({ width }) => vlist({ height, isScrolling, onChildScroll, scrollTop, onRowsRendered, width, registerChild })}
      </AutoSizer>
    );
    const infiniteLoader = ({ height, isScrolling, onChildScroll, scrollTop }) => (
      <InfiniteLoader
        ref={this.ifLoader}
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.handleInfiniteOnLoad}
        rowCount={200}
      >
        {({ onRowsRendered, registerChild }) => autoSize({ height, isScrolling, onChildScroll, scrollTop, onRowsRendered, registerChild })}
      </InfiniteLoader>
    );
    return (
      <div>
        <Search
          placeholder="input search text"
          onSearch={this.onSearch}
          style={{ width: '100%' }}
        />
        {
          data.length > 0 && (
            <WindowScroller>
              {infiniteLoader}
            </WindowScroller>
          )
        }
        {/* {this.state.loading && <Spin className="demo-loading" />} */}
      </div>
    );
  }
}

export default ListDemo;
