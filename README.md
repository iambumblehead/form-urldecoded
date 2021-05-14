form-urldecoded
===============
**(c)[Frabarz][1], [Bumblehead][0]** [MIT-license](#license)

[![npm version](https://badge.fury.io/js/form-urldecoded.svg)](https://badge.fury.io/js/form-urldecoded) [![Build Status](https://github.com/iambumblehead/form-urldecoded/workflows/nodejs-ci/badge.svg)][2]


Returns an object from a [query string.][2]
``` javascript
console.log(formurldecoded(
  'www.myurl.com?'
    + 'arr%5B%5D=3&arr%5B%5D%5Bprop%5D=false&arr%5B%5D=1&arr'
    + '%5B%5D=6&num=0&obj%5Bprop2%5D%5B%5D=elem&str=val'));
// {
//   obj: { prop2: ['elem'] },
//   arr: [ 3, { prop: false }, 1, 6 ],
//   num: 0,
//   str: 'val'
// }
```

[0]: http://www.bumblehead.com                            "bumblehead"
[1]: https://frabarz.cl/                                     "frabarz"
[2]: https://github.com/iambumblehead/form-urlencoded     "urlencoded"

![scrounge](https://github.com/iambumblehead/scroungejs/raw/master/img/hand.png)

(The MIT License)

Copyright (c) [Bumblehead][0] <chris@bumblehead.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
