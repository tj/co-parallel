
/**
 * Module dependencies.
 */

var thread = require('co-thread');

module.exports = function *parallel(thunks, n){
  var keys = Object.keys(thunks);
  var n = Math.min(n || 5, keys.length);
  var ret = new (thunks.constructor || Object);
  var index = 0;

  function *next() {
    var i = index++;
    var key = keys[i];
    ret[key] = yield thunks[key];
    if (index < keys.length) yield next;
  }

  yield thread(next, n);

  return ret;
};
