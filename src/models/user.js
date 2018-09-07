
import { login } from 'services/user';
import router from 'umi/router';

const defaultState = {
  loginErr: false
};

export default {
  namespace: 'user',
  state: defaultState,
  effects: {
    *login({ payload }, { put, select, call }) {
      const res = yield call(login, payload);
      console.log('res', res);
      if (res) {
        yield put({
          type: 'setLoginErr',
          payload: false,
        });
        router.push('/');

      } else {
        yield put({
          type: 'setLoginErr',
          payload: true,
        });
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
  },
};
