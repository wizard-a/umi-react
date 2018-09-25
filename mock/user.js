const responseJson = (data, code = 0) => {
  return {
    code,
    data
  }
}

const time = (fun) => {
  setTimeout(() => {
    fun && fun();
  }, 300);
};

const users = ['admin', 'user'];

export default {
  'POST /api/login': (req, res) => {
    const { name, password } = req.body;
    if (users.some(u => u === name) && password === '123456') {
      setTimeout(() => {
        res.send(responseJson({id: 1, name}));
      }, 300);
    } else {
      setTimeout(() => {
        res.send(responseJson({msg: '用户名密码错误'}, 1));
      }, 300);
    }
  },
  'POST /api/logout': (req, res) => {
    time(() => {
      res.send(responseJson('ok'));
    });
  },
};
