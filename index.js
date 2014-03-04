
module.exports = function *parallel(thunks, n){
  var ret = [];
  n = Math.min(n || 5, thunks.length);

  var index = 0;

  function *next() {
    var i = index;
    index++;
    ret[i] = yield thunks[i];
    index < thunks.length && (yield next);
  }

  var nexts = [];
  while (n--) {
    nexts.push(next);
  }
  yield nexts;

  return ret;
};
