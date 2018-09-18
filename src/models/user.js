
import { login, logout } from 'services/user';
import router from 'umi/router';
import storage from 'utils/localStorage';

const defaultState = {
  loginErr: false,
  user: {},
};

export default {
  namespace: 'user',
  state: defaultState,
  effects: {
    *login({ payload }, { put, select, call }) {
      const res = yield call(login, payload);
      if (res) {
        yield put({
          type: 'setLoginErr',
          payload: false,
        });
        yield put({
          type: 'setUser',
          payload: res,
        })
        router.push('/');
        storage.add('user', res);

      } else {
        yield put({
          type: 'setLoginErr',
          payload: true,
        });
      }
    },
    *logout(_, { call, put }) {
      const res = yield call(logout);
      if (res) {
        yield put({
          type: 'setUser',
          payload: {},
        })
        storage.remove('user');
        router.push('/login');
      }
    },
  },

  reducers: {
    setLoginErr(state, { payload }) {
      return {
        ...state,
        loginErr: payload,
      };
    },
    setUser(state, { payload }) {
      return {
        ...state,
        user: payload,
      }
    }
  },
};
