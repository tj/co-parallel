
/**
 * Module dependencies.
 */

var thread = require('co-thread');

module.exports = function *parallel(thunks, n){
  var n = Math.min(n || 5, thunks.length);
  var ret = [];
  var index = 0;

  function *next() {
    while(index < thunks.length) {
      var i = index++;
      ret[i] = yield thunks[i];
    }
  }

  yield thread(next, n);

  return ret;
};
