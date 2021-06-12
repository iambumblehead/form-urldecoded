export default data => {
  const keyValRe = /^([^"=]*)=([\s\S]*)/,
        keyRemRe = /([^[]*)\[([^"\]]*)?\]([\s\S]*)?/,
        headQueryRe = /[^=]*\?([\s\S]*)/,
        restQueryRe = /^([^"&]*)&([\s\S]*)/,
        boolRe = /^(true|false)$/,
        hashRe = /#.*$/,
        intRe = /^\d*$/;

  const rmHash = str => str.replace(hashRe, '');

  const rmLead = str => str.replace(headQueryRe, (m, s) => s);

  const decode = str => decodeURIComponent(str.replace(/\+/g, ' '));

  const splitKeyVal = (str, match = str.match(keyValRe)) =>
    match ? match.slice(1) : [str];

  const parseValue = value => !Number.isNaN(+value)
    ? +value
    : boolRe.test(value)
      ? value === 'true'
      : value === 'null' || !value ? null : value;

  const assignValue = (ns, [key, val, subkey], match = key.match(keyRemRe)) => {
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
  };

  const split = (str, parts = [], match = str.match(restQueryRe)) => {
    if (match)
      parts = split(match[2], parts.concat(match[1]));
    else if (str)
      parts = parts.concat(str);

    return parts;
  };

  return typeof data === 'string'
    ? split(decode(rmHash(rmLead(data)))).reduce(
      (o, qs) => assignValue(o, splitKeyVal(qs)), {})
    : {};
};
