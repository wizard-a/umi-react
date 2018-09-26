
import { getList } from 'services/table';

export default {
  namespace: 'tableList',

  state: {
    data: [],
    params: {
      pageIndex: 1,
      pageNum: 20,
      keyworks: '',
    }
  },

  effects: {
    *getList({ payload }, { put, select, call }) {
      const { data, params } = yield select(s => s.tableList);
      const p = {...params, ...payload}
      const res = yield call(getList, p);
      yield put({
        type: 'setData',
        payload: {
          data: data.concat(res),
          params: p,
        } ,
      });
    },
  },

  reducers: {
    setData(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    clearData(state, { payload }) {
      return {
        ...state,
        data: [],
      };
    },
  },
};
