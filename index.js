module.exports = function *parallel(thunks, n){
  var n = n || 5;
  var ret = [];
  var first = thunks.slice(0, n);
  var queue = thunks.slice(n);

  var res = yield first.map(function *(item) {
    var curr = yield item;
    var next = queue.pop();
    if (next)
      ret.push(yield next);

    return curr;
  })
  ret = ret.concat(res);

  while (queue.length);
  return ret;
};
