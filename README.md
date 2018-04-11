Careless FS
===

Promises and defaults to make reading and writing files a breeze. Makes the directory if it doesn't exist on write, takes no mode operations and passes errors through promise rejections.

## Usage
```
const fs = require('careless-fs');

// Write can take a single file object or an array of file objects.
// Single returns single, array returns an array of file objects.
// If no encoding is specified, utf-8 is used.
fs.write({
  path: '/path/to/file',
  content: 'Content to write',
  encoding: 'utf-8 is default'
})
  .then(doSomething)
  .catch((err) => handleError(err));

// Read works more or less the same, and preserves object values passed
// in unless they would be overwritten by the read (content).
fs.read([
  {
    path: '/path/to/file',
    arbitraryKey: 'this will be preserved'
  },
  {
    path: '/path/to/another/file',
  },
])
  .then(doSomething)
  .catch((err) => handleError(err));
```
