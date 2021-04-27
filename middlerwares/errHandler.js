function errHandler(err, _, res, _) {
  console.log(JSON.stringify(err))
};

module.exports = errHandler;