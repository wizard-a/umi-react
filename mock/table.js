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
    const { pageNum, pageIndex, search } = req.query;
    const result = [];
    for (let i = 0; i < pageNum; i++) {
      const idx = (pageIndex - 1) * pageNum + i + 1;
      const name = `${search !== '' ? 'lisi' : 'zhangsan'}${idx}`;
      result.push({
        id: idx,
        name,
        email: `${name}@163.com`,
        createTime: new Date(),
      });
    }
    time(() => {
      res.send(responseJson({
        rows: result,
        count: 25,
      }));
    })
  },
  'POST /api/table': (req, res) => {
    res.send(responseJson('添加成功!'));
  },
  'PUT /api/table/:id': (req, res) => {
    res.send(responseJson('编辑成功!'));
  },
  'DELETE /api/table/:id': (req, res) => {
    res.send(responseJson('删除成功!'));
  }
};
