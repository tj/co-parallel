
/**
 * Module dependencies.
 */

var request = require('co-request');
var co = require('co');
var parallel = require('./');

var urls = [
  'http://google.com',
  'http://yahoo.com',
  'http://ign.com',
  'http://cloudup.com',
  'http://myspace.com',
  'http://facebook.com',
  'http://segment.io'
];

function *status(url) {
  console.log('GET %s', url);
  var s = (yield request(url)).statusCode;
  return [url, s];
}

co(function *(){
  var reqs = urls.map(status);
  var res = yield parallel(reqs, 2);
  console.log(res);
})();
