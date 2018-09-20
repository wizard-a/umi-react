import request from '../utils/request';
/**
 * 获取菜单数据
 * @param {*} params
 */
export async function getMenu(userName) {
  return request.get(`/api/menu/${userName}`);
}
