form-urldecoded
===============
**(c)[Bumblehead][0], 2016** [MIT-license](#license)

simple and generalised query string parsing.

```javascript
function (uri, ishash) {
    var args,
        uriVals = {};

    if (ishash) {
        uriVals.hash = uri.replace(/[^#]*#?/, '');
    }

    uri = uri.replace(/#.*$/, ''); // remove hash
    args = uri.match(/\?/) && uri.replace(/^[^?]*\?/, '');
    
    if (args && (args = args.split(/&/))) {
        uriVals = args.reduce(function (uriVals, argpair) {
            var arg = argpair.split(/=/),
                key = arg[0],
                val = decodeURIComponent(arg[1].replace(/\+/g, ''));
            
            uriVals[key + ''] = isNaN(+val) ? val : +val;
            
            return uriVals;
        }, uriVals);
    }
    return uriVals;
}
```



[0]: http://www.bumblehead.com                            "bumblehead"
[7]: https://raw.githubusercontent.com/iambumblehead/es5classic/master/es5classic_120x120.png


![scrounge](https://github.com/iambumblehead/scroungejs/raw/master/img/hand.png)[![es5 classic][7]][7] 


(The MIT License)

Copyright (c) 2016 [Bumblehead][0] <chris@bumblehead.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
