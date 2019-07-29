// Filename: form-urldecoded.js  
// Timestamp: 2017.03.09-11:57:43 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  

const formurldecoded = module.exports = (uri, ishash) => {
  let args,
      uriVals = {};

  if (ishash) {
    uriVals.hash = uri.replace(/[^#]*#?/, '');
  }

  uri = uri.replace(/#.*$/, ''); // remove hash
  args = uri.replace(/^[^?]*\?/, '');
  
  if (args && (args = args.split(/&/))) {
    uriVals = args.reduce((uriVals, argpair) => {
      let [key, val] = argpair.split(/=/);
      
      val = val && decodeURIComponent(val.replace(/\+/g, ''));

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
