#subtext

HTTP payload parser.

[![Build Status](https://secure.travis-ci.org/hapijs/subtext.png)](http://travis-ci.org/hapijs/subtext)

Lead Maintainer - [John Brett](https://github.com/johnbrett)

subtext parses the request body and exposes it in a callback.

## Example

```javascript
var Http = require('http');
var Subtext = require('subtext');

Http.createServer(function (request, response) {

    Subtext.parse(request, null, { parse: true, output: 'data' }, function (err, parsed) {

        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.end('Payload contains: ' + parsed.payload.toString());
    });

}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');

```

## API

See the [API Reference](API.md)
