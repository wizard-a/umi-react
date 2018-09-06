import request from '../utils/request';
/**
 * 获取菜单数据
 * @param {*} params
 */
export async function getMenu() {
  return request.get('/api/menu');
}
