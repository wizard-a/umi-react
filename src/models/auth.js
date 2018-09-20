
import { getMenu } from '../services/auth';

export default {
  namespace: 'auth',

  state: {
    menu: []
  },

  effects: {
    *getMenu(_, { put, select, call }) {
      const {name} = yield select(s => s.user.user);
      const menu = yield call(getMenu, name);
      yield put({
        type: 'setMenu',
        payload: menu,
      });
    },
  },

  reducers: {
    setMenu(state, { payload }) {
      return {
        ...state,
        menu: payload,
      };
    },
  },
};
