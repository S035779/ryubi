/**
 * Copy the enumerable properties of p to o, and return o.
 * If o and p have a property by the same name, o's property is 
 * overwritten. This function does not handle getters and setters 
 * or copy attributes.
 *
 * @param {object} o
 * @param {object} p
 * @returns {object}
 */
const extend = function(o, p) {
  for(prop in p) {            // For all props in p.
    o[prop] = p[prop];        // Add the property to o.
  }
  return o;
};
module.exports.extend = extend;

/**
 * Copy the enumerable properties of p to o, and return o.
 * If o and p have a property by the same name, o's property is 
 * left alone. This function does not handle getters and setters 
 * or copy attributes.
 *
 * @param {object} o
 * @param {object} p
 * @returns {object}
 */
const merge = function(o, p) {
  for(prop in p) {            // For all props in p.
    if (o.hasOwnProperty[prop]) continue;
                              // Except those already in o.
    o[prop] = p[prop];        // Add the property to o.
  }
  return o;
};
module.exports.merge = merge;

/**
 * Remove properties from o if there is not a property with the 
 * same name in p. Return o.
 *
 * @param {object} o
 * @param {object} p
 * @returns {object}
 */
const restrict = function(o, p) {
  for(prop in o) {            // For all props in o
    if (!(prop in p)) delete o[prop];
                              // Delete if not in p
  }
  return o;
};
module.exports.restrict = restrict;

/**
 * For each property of p, delete the property with the same name 
 * from o. Return o.
 *
 * @param {object} o
 * @param {object} p
 * @returns {object}
 */
const subtract = function(o, p) {
  for(prop in p) {            // For all props in p
    delete o[prop];           // Delete from o (deleting a
                              // nonexistent prop is harmless)
  }
  return o;
};
module.exports.subtract = subtract;

/**
 * Return a new object that holds the properties of both o and p.
 * If o and p have properties by the same name, the values 
 * from o are used.
 *
 * @param {object} o
 * @param {object} p
 * @returns {object}
 */
const union = function(o,p) { return extend(extend({},o), p); }
module.exports.union = union;

/**
 * Return a new object that holds only the properties of o that 
 * also appear in p. This is something like the intersection of o 
 * and p, but the values of the properties in p are discarded
 *
 * @param {object} o
 * @param {object} p
 * @returns {object}
 */
const intersection = function(o,p) { 
  return restrict(extend({}, o), p); 
};
module.exports.intersection = intersection;

/**
 * Return an array that holds the names of the enumerable own 
 * properties of o.
 *
 * @param {object} o
 * @returns {array}
 */
const keys = function(o) {
  if (typeof o !== "object") throw TypeError();
                              // Object argument required
  let result = [];            // The array we will return
  for(let prop in o) {        // For all enumerable properties
    if (o.hasOwnProperty(prop)) 
                              // If it is an own property
      result.push(prop);      // add it to the array.
  }
  return result;              // Return the array.
};
module.exports.keys = keys;

/**
 * and
 *
 * @param {array} o
 * @param {array} p
 * @returns {array}
 */
const and = function(o, p) {
  if (!Array.isArray(o) || !Array.isArray(p)) throw TypeError();
  const _o = o.filter(function(x){ return x });
  const _p = p.filter(function(x){ return x });
  const result = _o.concat(_p)
   .filter(function(x, i, y){ 
     return y.indexOf(x) !== y.lastIndexOf(x); })
   .filter(function(x, i, y){ 
     return y.indexOf(x) === i; });
  return result;
};
module.exports.and = and;

/**
 * del
 *
 * @param {array} o
 * @param {array} p
 * @returns {array}
 */
const del = function(o, p) {
  if (!Array.isArray(o) || !Array.isArray(p)) throw TypeError();
  const _o = o.filter(function(x){ return x });
  const _p = p.filter(function(x){ return x });
  const result =
   _o.filter(function(x, i, y) { return _p.indexOf(x) === -1; });
  return result;
};
module.exports.del = del;

/**
 * add
 *
 * @param {array} o
 * @param {array} p
 * @returns {array}
 */
const add = function(o, p) {
  if (!Array.isArray(o) || !Array.isArray(p)) throw TypeError();
  const _o = o.filter(function(x){ return x });
  const _p = p.filter(function(x){ return x });
  const result =
   _p.filter(function(x, i, y) { return _o.indexOf(x) === -1; });
  return result;
};
module.exports.add = add;

/**
 * dif
 *
 * @param {array} o
 * @param {array} p
 * @returns {array}
 */
const dif = function(o, p) {
  if (!Array.isArray(o) || !Array.isArray(p)) throw TypeError();
  const _o = o.filter(function(x){ return x });
  const _p = p.filter(function(x){ return x });
  const result =
    _o.filter(function(x, i, y) { return _p.indexOf(x) === -1; })
   .concat(
      _p.filter(function(x, i, y) { 
        return _o.indexOf(x) === -1; })
    );
  return result;
};
module.exports.dif = dif;

/**
 * dup
 *
 * @param {array} o
 * @param {array} p
 * @returns {array}
 */
const dup = function(o, p) {
  if (!Array.isArray(o) || !Array.isArray(p)) throw TypeError();
  const _o = o.filter(function(x){ return x });
  const _p = p.filter(function(x){ return x });
  const result = _o.concat(_p)
   .filter(function(x, i, y){ return y.indexOf(x) === i; });
  return result;
};
module.exports.dup = dup;

/**
 * dst
 *
 * @param {array} o
 * @returns {array}
 */
const dst = function(o) { 
  if (!Array.isArray(o)) throw TypeError();
  const _o = o.filter(function(x){ return x });
  const _p = _o.sort(function(s, t){
    const a=s.toString().toLowerCase();
    const b=t.toString().toLowerCase();
    if(a<b) return -1;
    if(a>b) return 1;
    return 0;
  });
  const result =  _p.filter(function(x, i, y) {
    if(i===0) return true;
    return x!==y[i-1];
  })
  return result;
};
module.exports.dst = dst;

/**
 * getTimeStamp
 *
 * @returns {string}
 */
const getTimeStamp = function() {
  const dt = new Date();
  return dt.toISOString();
};
module.exports.getTimeStamp = getTimeStamp;

/**
 * getLocalTimeStamp
 *
 * @param {string} s
 * @returns {string}
 */
const getLocalTimeStamp = function (s) {
  const dt = new Date(s);
  const _yr = dt.getFullYear();
  const _mo = dt.getMonth() + 1;
  const _dy = dt.getDate();
  const _tm = dt.toTimeString().split(' ')[0];
  return `${_yr}-${_mo}-${_dy} ${_tm}`;
};
module.exports.getLocalTimeStamp = getLocalTimeStamp;

/**
 * setTimeStamp
 *
 * @param {string} s
 * @returns {object}
 */
const setTimeStamp = function (s) {
	const matches = /^(\d+)\/(\d+)\/(\d+)$/.exec(s);
	if(!matches) {
		return false;
	}
	const y = parseInt(matches[1]);
	const m = parseInt(matches[2]);
	const d = parseInt(matches[3]);
	if(m < 1 || m > 12 || d < 1 || d > 31) {
		return null;
	}
	const dt = new Date(y, m - 1, d, 0, 0, 0, 0);
	if(dt.getFullYear() !== y
			|| dt.getMonth() !== m - 1
			|| dt.getDate() !== d)
	{
		return null;
	}
	return dt.toISOString();
};
module.exports.setTimeStamp = setTimeStamp;

const isValidDate = function (s) {
	const matches = /^(\d+)\/(\d+)\/(\d+)$/.exec(s);
	if(!matches) {
		return false;
	}
	const y = parseInt(matches[1]);
	const m = parseInt(matches[2]);
	const d = parseInt(matches[3]);
	if(m < 1 || m > 12 || d < 1 || d > 31) {
		return false;
	}
	const dt = new Date(y, m - 1, d, 0, 0, 0, 0);
	if(dt.getFullYear() !== y
			|| dt.getMonth() !== m - 1
			|| dt.getDate() !== d)
	{
		return false;
	}
	return true;
};
module.exports.isValidDate = isValidDate;

/**
 * Schedule an invocation or invovations of fn() in the future.
 * Note that the call to invoke() does not block: it returns 
 * right away.
 *
 * @param {function} fn - If interval is specified but end is 
 *                          omited, then never stop invoking fn.
 *                        If interval and end are omited, then 
 *                          just invoke fn once after start ms.
 *                        If only fn is specified, behave as is 
 *                          start was 0.
 * @param {number} s -  Wait start milliseconds, then call fn().
 * @param {number} i -  Call fn() every interval milliseconds.
 * @param {number} e -  Stopping after a total of start+end 
 *                      milliseconds.
 */
const invoke = function(fn, s, i, e) {
  if (!s) s = 0;
  setTimeout(fn, s);
  if (arguments.length >= 3) {
    setTimeout(function() {
      const h = setInterval(fn, i);
      if (e) setTimeout(function() { clearInterval(h); }, e);
    }, s);
  }
}
module.exports.invoke = invoke;

/**
 * Encode the properties of an object as if they were name/value 
 * pairs from an HTML form, 
 * using application/x-www-form-urlencoded format
 */
exports.encodeFormData = function(data) {
  if (!data) return "";
  let pairs = [];
  for(let name in data) {
    if (!data.hasOwnProperty(name)) continue;
    if (typeof data[name] === "function") continue;
    const value = data[name].toString();
    name = encodeURIComponent(name.replace(" ", "+"));
    value = encodeURIComponent(value.replace(" ", "+"));
    pairs.push(name + "=" + value);
  }
  return pairs.join('&');
}

/**
 * Decode an HTML form as if they were name/value pairs from 
 * the properties of an object, 
 * using application/x-www-form-urlencoded format↲
 */
exports.decodeFormData = function(text, sep, eq, isDecode) {
  text = text || location.search.substr(1);
  sep = sep || '&';
  eq = eq || '=';
  const decode = (isDecode) ? decodeURIComponent 
    : function(a) { return a; };
  return text.split(sep).reduce(function(obj, v) {
    const pair = v.split(eq);
    obj[pair[0]] = decode(pair[1]);
    return obj;
  }, {});
};

/**
 * Generated a randam characters, using 'Math.random()' method.
 * $length: number of characters to be generated.
 */
exports.makeRandStr = function(length) {
  const chars =
'abcdefghijklmnopqrstuvwxyzABCDEFGHIJLKMNOPQRSTUVWXYZ0123456789';
  let str = '';
  for (let i = 0; i < length; ++i) {
    str += chars[ Math.floor( Math.random() * 62 ) ];
  }
  return str;
}

/**
 * Generated a randam characters, using 'Math.random()' method.
 * $length: number of characters to be generated.
 */
exports.makeRandInt = function(length) {
  const chars = '123456789';
  let str = '';
  for (let i = 0; i < length; ++i) {
    str += chars[ Math.floor( Math.random() * 9 ) ];
  }
  return parseInt(str, 10);
}

