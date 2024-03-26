const Pagination = (req, res, nxt) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let pageSize = parseInt(req.query.pageSize) || 100;

    req.query.pagination = {
      page: page > 0 ? page : 1,
      pageSize: pageSize > 0 ? pageSize : 100,
      sortBy: "",
      sortOrder: "",
    };

    req.query.pagination.skip = (req.query.pagination.page - 1) * req.query.pagination.pageSize;
    req.query.pagination.limit = req.query.pagination.pageSize;

    nxt();
  } catch (e) {
    console.log(e, "eeeeeeeeeeeeeeeeeeee");
    res.handler.serverError(e);
  }
};

module.exports = Pagination;
