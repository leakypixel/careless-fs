Careless FS
===
[![Build Status](https://api.travis-ci.org/leakypixel/careless-fs.svg)](https://travis-ci.org/leakypixel/careless-fs)
[![Code Climate](https://codeclimate.com/github/leakypixel/careless-fs/badges/gpa.svg)](https://codeclimate.com/github/leakypixel/careless-fs)
[![Test Coverage](https://codeclimate.com/github/leakypixel/careless-fs/badges/coverage.svg)](https://codeclimate.com/github/leakypixel/careless-fs/coverage)

Promises and defaults to make reading and writing files a breeze. Makes the directory if it doesn't exist on write, requires only a path and passes errors through promise rejections. Returns file content as a string by default rather than readable streams, and defaults to utf-8 encoding - otherwise sticks to defaults as per [NodeJS's FS module](https://nodejs.org/api/fs.html).

## Usage
```
const fs = require('careless-fs');
```

Write can take a single file object or an array of file objects.
Single returns single, array returns an array of file objects.
Uses the same defaults as [fs.createWriteStream](https://nodejs.org/api/fs.html#fs_fs_createwritestream_path_options), which is used internally. Returns the file content as it was passed in.
```
fs.write({
  path: '/path/to/file',
  content: 'Content to write - can be a string, buffer or readableStream. Defaults to empty',
  encoding: 'defaults to utf-8',
  arbitraryKey: 'this will be preserved'
})
  .then(doSomething)
  .catch((err) => handleError(err));

```
Read works more or less the same, and preserves object values passed
in unless they would be overwritten by the read (content, encoding).
Uses the same defaults as [fs.createReadStream](https://nodejs.org/api/fs.html#fs_fs_createreadstream_path_options), but defaults
to returning a string rather than a readable stream.
```
fs.read([
  {
    path: '/path/to/file',
    stream: defaults to false and returns a string, if true content is returned as a readableStream,
    arbitraryKey: 'this will be preserved',
    encoding: 'defaults to utf-8, so content is returned as a string - set to null to get a buffer back'
  },
  {
    path: '/path/to/another/file',
  },
])
  .then(doSomething)
  .catch((err) => handleError(err));
```
