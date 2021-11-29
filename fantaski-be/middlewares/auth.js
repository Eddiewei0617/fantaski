module.exports = {
  loginCheckMiddleware: function (req, res, next) {
    if (req.session.member) {
      //有member且不是null
      console.log("確認使用者已登入");
      next();
    } else {
      return res.sendStatus(401);
    }
  },
};
