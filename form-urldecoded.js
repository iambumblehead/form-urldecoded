// Filename: form-urldecoded.js  
// Timestamp: 2016.04.28-13:17:16 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  

var formurldecoded = module.exports = function (uri, ishash) {
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
};
