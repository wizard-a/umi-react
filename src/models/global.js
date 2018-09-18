const defaultState = {
  currLocale: 'zh-CN',
}

export default {
  namespace: 'global',

  state: defaultState,

  effects: {
  },

  reducers: {
    setLocale(state, { payload }) {
      return {
        ...state,
        currLocale: payload,
      };
    },
  },
};
