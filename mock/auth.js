const responseJson = (data) => {
  return {
    code: 0,
    data
  }
}
const menu = [
  {
    id: 1,
    name: '概览',
    icon: 'dashboard',
    url: '/dashboard',
  },
  {
    id: 2,
    name: '系统管理',
    icon: 'setting',
    url: '/system',
    children: [
      {
        id: 21,
        name: '用户管理',
        icon: 'user',
        url: '/system/user',
      }
    ]
  },
];

export default {
  // 支持值为 Object 和 Array
  'GET /api/menu': (req, res) => {
    setTimeout(() => {
      res.send(responseJson(menu));
    }, 300);
  },
  // GET POST 可省略
  '/api/users/1': { id: 1 },

  // 支持自定义函数，API 参考 express@4
  'POST /api/users/create': (req, res) => { res.end('OK'); },
};
