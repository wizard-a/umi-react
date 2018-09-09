/**
 * 系统初始化和提供的一些公共方法
 */
import localStorage from 'utils/localStorage';

/**
 * 设置 localStorage user 到 redux store 里
 */
function setStoreUser() {
  const { dispatch } = window.g_app._store;
  const user = localStorage.get('user');
  if (user) {
    dispatch({
      type: 'user/setUser',
      payload: JSON.parse(user),
    })
  }
}

/**
 * 用户是否登录
 */
export const checkLogin = () => {
  const { getState } = window.g_app._store;
  const user = getState().user.user;
  return Object.keys(user).length > 0;
}

/**
 * 初始化操作
 */
export const init = () => {
  setStoreUser();
}
