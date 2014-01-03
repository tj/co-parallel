
module.exports = function *parallel(thunks, n){
  var ret = [];
  n = n || 5;

  while (thunks.length) {
    var res = yield thunks.slice(0, n);
    ret = ret.concat(res);
    thunks = thunks.slice(n);
  }

  return ret;
};