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
  'GET /api/table/list': (req, res) => {
    const { pageNum, pageIndex, keyworks } = req.query;
    const result = [];
    for (let i = 0; i < pageNum; i++) {
      const name = `${keyworks !== '' ? 'lisi' : 'zhangsan'}${(pageIndex - 1) * pageNum + i }`;
      result.push({
        name,
        email: `${name}@163.com`,
      });
    }
    time(() => {
      res.send(responseJson(result));
    })
  },
};
