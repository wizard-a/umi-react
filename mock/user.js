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

export default {
  'POST /api/login': (req, res) => {
    const { name, password } = req.body;
    if (name === 'admin' && password === '123456') {
      setTimeout(() => {
        res.send(responseJson({id: 1, name: 'admin'}));
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
