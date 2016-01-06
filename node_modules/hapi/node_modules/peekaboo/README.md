#peekaboo

A Peekable node stream.

A Peekaboo stream works just like a `PassThrough` stream, it can be piped to and from without any transformation of the chunks. The difference is that a Peekaboo stream will emit each chunk as a `peek` event on an EventEmitter of your choosing, letting you spy on stream chunks in an uninvasive way.

[![Build Status](https://secure.travis-ci.org/hapijs/peekaboo.png)](http://travis-ci.org/hapijs/peekaboo)

Lead Maintainer - [Eran Hammer](https://github.com/hueniverse)

## Example

We can report the download process of a request by peeking on response stream events:

```javascript
var Events = require('events');
var Fs = require('fs');
var Https = require('https');
var Peekaboo = require('peekaboo');

var emitter = new Events.EventEmitter();
var peek = new Peekaboo(emitter);

Https.get('https://codeload.github.com/hapijs/hapi/zip/master', function (res) {

    res.pipe(peek).pipe(Fs.createWriteStream('./hapi.zip'));

    var downloaded = 0;
    emitter.on('peek', function (chunk) {

        downloaded += chunk.length;
        var pct = (downloaded / res.headers['content-length'] * 100).toFixed(1);
        process.stdout.write(pct + '% downloaded\r');
    });
});
```
