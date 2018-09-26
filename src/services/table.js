import request from '../utils/request';
/**
 * 获取菜单数据
 * @param {*} params
 */
export async function getList(params) {
  return request.get('/api/table/list', params);
}
