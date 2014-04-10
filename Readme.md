
# co-parallel

  Parallel execution with concurrency support that maintains result ordering.

## Installation

```
$ npm install co-parallel
```

## Example

```js
var parallel = require('co-parallel');
var request = require('co-request');
var co = require('co');

var urls = {
  google   : 'http://google.com',
  yahoo    : 'http://yahoo.com',
  ign      : 'http://ign.com',
  cloudup  : 'http://cloudup.com',
  myspace  : 'http://myspace.com',
  facebook : 'http://facebook.com',
  segment  : 'http://segment.io'
};

function *status(url) {
  console.log('GET %s', url);
  return (yield request(url)).statusCode;
}

co(function *(){
  var reqs = {}
  for (var key in urls) reqs[key] = status(urls[key]);
  var res = yield parallel(reqs, 2);
  console.log(res);
})();
```

## API

### parallel(thunks, [concurrency])

  Execute `thunks` in parallel with the given `concurrency`, defaulting to 5.

# License

  MIT
