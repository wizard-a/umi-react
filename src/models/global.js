import intl from 'react-intl-universal';
import locales from '../locales';
import storage from 'utils/localStorage';

const defaultState = {
  currLocale: storage.get('locale') || 'zh_CN',
  localeLoad: false,
}

export default {
  namespace: 'global',

  state: defaultState,

  effects: {
    *changeLocale({ payload }, { call, put }) {
      const params = {
        currentLocale: payload, // TODO: determine locale here
        locales
      };
      // 初始化国际化
      yield intl.init(params);

      yield put({
        type: 'setLocale',
        payload: {
          currLocale: payload,
          localeLoad: true,
        }
      });
      storage.add('locale', payload);
    },
  },

  reducers: {
    setLocale(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
