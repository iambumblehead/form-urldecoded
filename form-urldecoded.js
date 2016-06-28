// Filename: form-urldecoded.js  
// Timestamp: 2016.06.28-11:21:02 (last modified)
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
                key = String(arg[0]),
                val = decodeURIComponent(arg[1].replace(/\+/g, ''));

            if (!isNaN(+val)) {
                uriVals[key] = +val;
            } else if (val === 'true') {
                uriVals[key] = true;
            } else if (val === 'false') {
                uriVals[key] = false;                
            } else {
                uriVals[key] = val;
            }
            
            return uriVals;
        }, uriVals);
    }
    return uriVals;  
};
