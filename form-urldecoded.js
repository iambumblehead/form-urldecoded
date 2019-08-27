// Filename: form-urldecoded.js
// Timestamp: 2018.08.15-17:52:43 (last modified)
// Author(s): frabarz <francisco@datawheel.us>

module.exports = data => {
  const keyValRe = /^([^"=]*)=([\s\S]*)/,
    keyRemnantRe = /([^[]*)\[([^"\]]*)?\]([\s\S]*)?/,
    headQueryRe = /[^=]*\?([\s\S]*)/,
    restQueryRe = /^([^"&]*)&([\s\S]*)/,
    boolRe = /^(true|false)$/,
    hashRe = /#.*$/,
    intRe = /^\d*$/,

    rmHash = str => str.replace(hashRe, ''),

    rmLead = str => str.replace(headQueryRe, (m, s) => s),

    decode = str => decodeURIComponent(str).replace(/\+/g, ' '),

    splitKeyVal = (str, match = str.match(keyValRe)) =>
      match ? match.slice(1) : [str],

    parseValue = value => !Number.isNaN(+value)
      ? +value
      : boolRe.test(value)
        ? value === 'true'
        : value === 'null' || !value ? null : value,

    assignValue = (ns, [key, val, subkey], match = key.match(keyRemnantRe)) => {
      if (match) {
        [, key, subkey] = match;

        subkey = intRe.test(subkey) ? parseInt(subkey, 10) : subkey;
        ns[key] = ns[key] || (/undefined|number/.test(typeof subkey) ? [] : {});
        subkey = /string|number/.test(typeof subkey) ? subkey : ns[key].length;

        if (match[3]) {
          ns[key] = assignValue(ns[key], [subkey + match[3], val]);
        } else if (val) {
          ns[key][subkey] = parseValue(val);
        }
      } else if (val) {
        ns[key] = parseValue(val);
      }

      return ns;
    },

    split = (str, parts = [], match = str.match(restQueryRe)) => {
      if (match)
        parts = split(match[2], parts.concat(match[1]));
      else if (str)
        parts = parts.concat(str);

      return parts;
    };

  return typeof data === 'string'
    ? split(decode(rmHash(rmLead(data))))
      .reduce((o, qs) => assignValue(o, splitKeyVal(qs)), {})
    : {};
};
