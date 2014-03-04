
/**
 * Module dependencies.
 */

var thread = require('co-thread');

module.exports = function *parallel(thunks, n){
  var n = Math.min(n || 5, thunks.length);
  var ret = [];
  var index = 0;

  function *next() {
    var i = index++;
    ret[i] = yield thunks[i];
    if (index < thunks.length) yield next;
  }

  yield thread(next, n);

  return ret;
};
