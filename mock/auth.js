const responseJson = (data) => {
  return {
    code: 0,
    data
  }
}
const adminMenu = [
  {
    id: 1,
    name: '概览',
    enName: 'Dashboard',
    icon: 'dashboard',
    url: '/dashboard',
  },
  {
    id: 2,
    name: '大表格渲染',
    enName: 'Table',
    icon: 'table',
    url: '/table',
    children: [{
      id: 21,
      name: '基础列表',
      enName: 'Basic Table',
      url: '/table/basic',
    }, {
      id: 22,
      name: '基础列表2',
      enName: 'Basic Table',
      url: '/table/basic/basic2',
    }, {
      id: 23,
      name: '大列表',
      enName: 'Big Table',
      url: '/table/big',
    }],
  },
  {
    id: 3,
    name: '图表',
    enName: 'chart',
    icon: 'bar-chart',
    url: '/chart',
  },
  {
    id: 4,
    name: '系统管理',
    enName: 'System',
    icon: 'setting',
    url: '/system',
    children: [
      {
        id: 41,
        name: '用户管理',
        enName: 'User',
        url: '/system/user',
      },
      {
        id: 42,
        name: '消息中心',
        enName: 'Message',
        url: '/system/message',
      }
    ]
  },
];


const userMenu = [
  {
    id: 1,
    name: '概览',
    enName: 'Dashboard',
    icon: 'dashboard',
    url: '/dashboard',
  },
  {
    id: 2,
    name: '列表',
    enName: 'Table',
    icon: 'table',
    url: '/table',
    children: [{
      id: 21,
      name: '基础列表',
      enName: 'Basic Table',
      url: '/table/basic',
    }, {
      id: 22,
      name: '基础列表2',
      enName: 'Basic Table',
      url: '/table/basic/basic2',
    }, {
      id: 23,
      name: '大列表',
      enName: 'Big Table',
      url: '/table/big',
    }],
  },
  {
    id: 3,
    name: '图表',
    enName: 'chart',
    icon: 'bar-chart',
    url: '/chart',
  },
];

export default {
  // 支持值为 Object 和 Array
  'GET /api/menu/:usreName': (req, res) => {
    setTimeout(() => {
      // console.log(req);
      const {usreName} = req.params;
      const menu = usreName === 'admin' ? adminMenu : userMenu;
      res.send(responseJson(menu));
    }, 300);
  },
  // GET POST 可省略
  '/api/users/1': { id: 1 },

  // 支持自定义函数，API 参考 express@4
  'POST /api/users/create': (req, res) => { res.end('OK'); },
};
