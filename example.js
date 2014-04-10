
/**
 * Module dependencies.
 */

var request = require('co-request');
var co = require('co');
var parallel = require('./');

var urls = {
  google       : 'http://google.com',
  yahoo        : 'http://yahoo.com',
  ign          : 'http://ign.com',
  cloudup      : 'http://cloudup.com',
  myspace      : 'http://myspace.com',
  facebook     : 'http://facebook.com',
  cuteoverload : 'http://cuteoverload.com',
  uglyoverload : 'http://uglyoverload.com',
  segment      : 'http://segment.io'
};

function *status(url) {
  console.log('GET %s', url);
  var s = (yield request(url)).statusCode;
  return [url, s];
}

co(function *(){
  var start = Date.now();
  var reqs = {}
  for (var key in urls) reqs[key] = status(urls[key]);
  var res = yield parallel(reqs, 3);
  console.log(res);
  console.log('duration: %dms', Date.now() - start);
})();
