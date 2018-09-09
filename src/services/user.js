import request from '../utils/request';
/**
 * 登录
 * @param {*} params
 */
export async function login(params) {
  return request.postD('/api/login', params);
}

/**
 * 退出登录
 */
export async function logout() {
  return request.postD('/api/logout');
}
