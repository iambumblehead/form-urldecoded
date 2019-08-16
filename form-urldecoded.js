// Filename: form-urldecoded.js
// Timestamp: 2018.08.15-17:52:43 (last modified)
// Author(s): frabarz <francisco@datawheel.us>

/**
* @param {string} uri The query string to parse. Can be a simple urlencoded string or a full URL.
* @param {Options} opts Additional options
* @returns {any}
*/
const formurldecoded = (module.exports = (data, opts = {}) => {
  const ignoreNull = Boolean(opts.ignorenull);
  const skipIndex = Boolean(opts.skipIndex);

  const assignValue = (param, value, target) => {
    const [key, remnant] = parseKey(param);
    if (remnant !== undefined) {
      const targetObj = target[key] || defaultTarget(remnant);
      assignValue(remnant, value, targetObj);
      target[key] = targetObj;
    }
    else if (!Array.isArray(target) || !skipIndex || isNaN(+key) || key !== "") {
      target[key] = value;
    }
    else {
      target.push(value);
    }
    return target;
  };

  const defaultTarget = key => {
    const targetKey = key.split("[", 1).shift();
    return targetKey === "" || !isNaN(+targetKey) ? [] : {};
  };

  const parseKey = key => {
    const openIndex = key.indexOf("[");
    return openIndex > -1
      ? [key.slice(0, openIndex), key.slice(openIndex + 1).replace("]", "")]
      : [key];
  };


  const rmHash = str => String(str).replace(/#.*$/, '');

  const decode = str => decodeURIComponent(String(str)).replace(/\+/g, ' ');

  // remove question mark char not nested in querystring
  const rmLead = str => str.replace(/[^=]*\?([\s\S]*)/, (m, s) => s);

  // split string w/ '&' not found in nested quotation
  const split = ( str, parts = [] ) => {
    if ( !str )
      return parts;

    var match = str.match(/^([^"&]*)&([\s\S]*)/);

    if ( match )
      return split( match[2], parts.concat(match[1]) );
    
    return split( null, parts.concat( str ) );
  };

  const splitKeyVal = str => {
    var match = str.match(/^([^"=]*)=([\s\S]*)/);

    return match ? match.slice(1) : [str];
  };
  
  const parseValue = value =>
    !isNaN(+value)
      ? +value
      : /^(true|false)$/.test(value)
        ? value === "true"
        : value === "null" || !value ? null : value;

  data = typeof data === 'string'
    ? decode( rmHash( rmLead( data ) ) ) : '';
  
  return split( data ).reduce((uriVals, param) => {
    const [key, val] = splitKeyVal( param );
    const value = parseValue(val);
    return value != null || !ignoreNull ? assignValue(key, value, uriVals) : uriVals;
  }, {});
});

/**
* @typedef Options
* @property {boolean} [ignorenull] Determines if parameters without value should be included in the parsed object. If so, their value will be null.
* @property {boolean} [skipIndex] Determines if bracketed numbers should be used to set the order of the values in an array.
*/
