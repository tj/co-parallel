
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
  return (yield request(url)).statusCode;
}

co(function *(){
  var reqs = urls.map(status);
  var res = yield parallel(reqs, 2);
  console.log(res);
})();
```

## API

### parallel(thunks, [concurrency])

  Execute `thunks` in parallel, with the given
  `concurrency` defaulting to 5.

# License

  MIT