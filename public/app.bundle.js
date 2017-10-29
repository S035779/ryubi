webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export M */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return log; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return spn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return str; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_spin__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_spin___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utils_spin__);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };



var Logger = null;
var Spiner = null;
var target = null;

var M = {
  fork: function fork(join, func1, func2) {
    return function (val) {
      return join(func1(val), func2(val));
    };
  }
};

var log = {
  Logger: Logger,
  config: function config(apd, lyt, flv, nam) {
    var apds = {
      'alert': new Log4js.JSAlertAppender(),
      'console': new Log4js.BrowserConsoleAppender()
    };
    var lyts = {
      'basic': new Log4js.BasicLayout(),
      'json': new Log4js.JSONLayout(),
      'xml': new Log4js.XMLLayout()
    };
    var flvs = {
      'OFF': Log4js.Level.OFF,
      'FATAL': Log4js.Level.FATAL,
      'ERROR': Log4js.Level.ERROR,
      'WARN': Log4js.Level.WARN,
      'INFO': Log4js.Level.INFO,
      'DEBUG': Log4js.Level.DEBUG,
      'TRACE': Log4js.Level.TRACE,
      'ALL': Log4js.Level.ALL
    };
    var appender = apds[apd];
    appender.setLayout(lyts[lyt]);
    var logger = new Log4js.getLogger(nam);
    logger.addAppender(appender);
    this.Logger = logger;
  },
  logger: function logger(mlv, msg) {
    var _msg = msg.map(function (val) {
      if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {
        return JSON.stringify(val, null, 4);
      } else if (val == null) {
        return '?';
      } else {
        return val;
      }
    });
    this.Logger.log(mlv, _msg.join(' '), null);
  },
  fatal: function fatal(msg) {
    var args = Array.prototype.slice.call(arguments);
    this.logger('FATAL', args);
  },
  error: function error(msg) {
    var args = Array.prototype.slice.call(arguments);
    this.logger('ERROR', args);
  },
  warn: function warn(msg) {
    var args = Array.prototype.slice.call(arguments);
    this.logger('WARN', args);
  },
  info: function info(msg) {
    var args = Array.prototype.slice.call(arguments);
    this.logger('INFO', args);
  },
  debug: function debug(msg) {
    var args = Array.prototype.slice.call(arguments);
    this.logger('DEBUG', args);
  },
  trace: function trace(msg) {
    var args = Array.prototype.slice.call(arguments);
    this.logger('TRACE', args);
  }
};

var spn = {
  Spinner: __WEBPACK_IMPORTED_MODULE_0__utils_spin___default.a,
  target: target,
  config: function config(target) {
    var opts = {
      lines: 13 // The number of lines to draw
      , length: 28 // The length of each line
      , width: 14 // The line thickness
      , radius: 42 // The radius of the inner circle
      , scale: 1 // Scales overall size of the spinner
      , corners: 1 // Corner roundness (0..1)
      , color: '#000' // #rgb or #rrggbb or array of colors
      , opacity: 0.25 // Opacity of the lines
      , rotate: 0 // The rotation offset
      , direction: 1 // 1: clockwise, -1: counterclockwise
      , speed: 1 // Rounds per second
      , trail: 60 // Afterglow percentage
      , fps: 20 // Frames per second when using
      // setTimeout() as
      // a fallback for CSS
      , zIndex: 2e9 // The z-index (defaults to 2000000000)
      , className: 'spinner' // The CSS class to assign to the
      //  spinner
      , top: '49%' // Top position relative to parent
      , left: '49%' // Left position relative to parent
      , shadow: false // Whether to render a shadow
      , hwaccel: false // Whether to use hardware acceleration
      , position: 'absolute' // Element positioning
    };
    this.Spinner = new __WEBPACK_IMPORTED_MODULE_0__utils_spin___default.a(opts);
    this.target = document.getElementById(target);
  },
  spin: function spin() {
    this.Spinner.spin(this.target);
  },
  stop: function stop() {
    this.Spinner.stop();
  }
};

var str = {
  /**
   * setCookies
   *
   * @param name
   * @param value
   * @param daysToLive
   */
  setCookies: function setCookies(name, value, daysToLive) {
    var cookie = name + "=" + encodeURIComponent(value);
    if (typeof daysToLive === "number") cookie += "; max-age=" + daysToLive * 60 * 60 * 24;
    document.cookie = cookie;
  },


  /**
   * getCookies
   * Return the document's cookies as an object of name/value
   * pairs.Assume that cookie values are encoded with
   * encodeURIComponent().
   *
   * @returns {object} - Store name and value in object.
   */
  getCookies: function getCookies() {
    var cookies = {};
    var all = document.cookie;
    if (all === "") return cookies;
    var list = all.split("; ");
    for (var i = 0; i < list.length; i++) {
      var cookie = list[i];
      var p = cookie.indexOf("=");
      var name = cookie.substring(0, p);
      var value = cookie.substring(p + 1);
      value = decodeURIComponent(value);
      cookies[name] = value;
    }
    return cookies;
  },


  /**
   * CookieStorage
   * This class implements the Storage API that localStorage and
   * sessionStorage do, but implements it on top of HTTP Cookies.
   *
   * @param maxage {number} - lifetime
   * @param path {string} - scope
   */
  CookieStorage: function CookieStorage(maxage, path) {
    var cookies = function () {
      var cookies = {};
      var all = document.cookie;
      if (all === "") return cookies;
      var list = all.split("; ");
      for (var i = 0; i < list.length; i++) {
        var cookie = list[i];
        var p = cookie.indexOf("=");
        var name = cookie.substring(0, p);
        var value = cookie.substring(p + 1);
        value = decodeURIComponent(value);
        cookies[name] = value;
      }
      return cookies;
    }();
    var keys = [];
    for (var key in cookies) {
      keys.push(key);
    }this.length = keys.length;
    this.key = function (n) {
      if (n < 0 || n >= keys.length) return null;
      return keys[n];
    };
    this.getItem = function (name) {
      return cookies[name] || null;
    };
    this.setItem = function (key, value) {
      if (!(key in cookies)) {
        keys.push(key);
        this.length++;
      }
      cookies[key] = value;
      var cookie = key + "=" + encodeURIComponent(value);
      if (maxage) cookie += "; max-age=" + maxage;
      if (path) cookie += "; path=" + path;
      document.cookie = cookie;
    };
    this.removeItem = function (key) {
      if (!(key in cookies)) return;
      delete cookies[key];
      for (var i = 0; i < keys.length; i++) {
        if (keys[i] === key) {
          keys.splice(i, 1);
          break;
        }
      }
      this.length--;
      document.cookie = key + "=; max-age=0";
    };
    this.clear = function () {
      for (var i = 0; i < keys.length; i++) {
        document.cookie = keys[i] + "=; max-age=0";
      }cookies = {};
      keys = [];
      this.length = 0;
    };
  },


  /**
   * UserDataStorage
   * Create a document element and install the special userData
   * behavior on it so it gets save() and load() methods.
   *
   * @param {number} maxage - If maxage is specified, expire the
   *                  userData in maxage seconds
   */
  UserDataStorage: function UserDataStorage(maxage) {
    var memory = document.createElement("div");
    memory.style.display = "none";
    memory.style.behavior = "url('#default#userData')";
    document.body.appendChild(memory);
    if (maxage) {
      var now = new Date().getTime();
      var expires = now + maxage * 1000;
      memory.expires = new Date(expires).toUTCString();
    }
    memory.load("UserDataStorage");
    this.getItem = function (key) {
      return memory.getAttribute(key) || null;
    };
    this.setItem = function (key, value) {
      memory.setAttribute(key, value);
      memory.save("UserDataStorage");
    };
    this.removeItem = function (key) {
      memory.removeAttribute(key);
      memory.save("UserDataStorage");
    };
  }
};

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

module.exports.Container = __webpack_require__(64);
module.exports.Mixin = __webpack_require__(66);
module.exports.ReduceStore = __webpack_require__(67);
module.exports.Store = __webpack_require__(39);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return dispatch; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_flux__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_flux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_flux__);


var dispatcher = new __WEBPACK_IMPORTED_MODULE_0_flux__["Dispatcher"]();

/* harmony default export */ __webpack_exports__["a"] = (dispatcher);
var dispatch = dispatcher.dispatch.bind(dispatcher);

/***/ }),
/* 9 */
/***/ (function(module, exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
var extend = function extend(o, p) {
  for (prop in p) {
    // For all props in p.
    o[prop] = p[prop]; // Add the property to o.
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
var merge = function merge(o, p) {
  for (prop in p) {
    // For all props in p.
    if (o.hasOwnProperty[prop]) continue;
    // Except those already in o.
    o[prop] = p[prop]; // Add the property to o.
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
var restrict = function restrict(o, p) {
  for (prop in o) {
    // For all props in o
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
var subtract = function subtract(o, p) {
  for (prop in p) {
    // For all props in p
    delete o[prop]; // Delete from o (deleting a
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
var union = function union(o, p) {
  return extend(extend({}, o), p);
};
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
var intersection = function intersection(o, p) {
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
var keys = function keys(o) {
  if ((typeof o === "undefined" ? "undefined" : _typeof(o)) !== "object") throw TypeError();
  // Object argument required
  var result = []; // The array we will return
  for (var prop in o) {
    // For all enumerable properties
    if (o.hasOwnProperty(prop))
      // If it is an own property
      result.push(prop); // add it to the array.
  }
  return result; // Return the array.
};
module.exports.keys = keys;

/**
 * and
 *
 * @param {array} o
 * @param {array} p
 * @returns {array}
 */
var and = function and(o, p) {
  if (!Array.isArray(o) || !Array.isArray(p)) throw TypeError();
  var _o = o.filter(function (x) {
    return x;
  });
  var _p = p.filter(function (x) {
    return x;
  });
  var result = _o.concat(_p).filter(function (x, i, y) {
    return y.indexOf(x) !== y.lastIndexOf(x);
  }).filter(function (x, i, y) {
    return y.indexOf(x) === i;
  });
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
var del = function del(o, p) {
  if (!Array.isArray(o) || !Array.isArray(p)) throw TypeError();
  var _o = o.filter(function (x) {
    return x;
  });
  var _p = p.filter(function (x) {
    return x;
  });
  var result = _o.filter(function (x, i, y) {
    return _p.indexOf(x) === -1;
  });
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
var add = function add(o, p) {
  if (!Array.isArray(o) || !Array.isArray(p)) throw TypeError();
  var _o = o.filter(function (x) {
    return x;
  });
  var _p = p.filter(function (x) {
    return x;
  });
  var result = _p.filter(function (x, i, y) {
    return _o.indexOf(x) === -1;
  });
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
var dif = function dif(o, p) {
  if (!Array.isArray(o) || !Array.isArray(p)) throw TypeError();
  var _o = o.filter(function (x) {
    return x;
  });
  var _p = p.filter(function (x) {
    return x;
  });
  var result = _o.filter(function (x, i, y) {
    return _p.indexOf(x) === -1;
  }).concat(_p.filter(function (x, i, y) {
    return _o.indexOf(x) === -1;
  }));
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
var dup = function dup(o, p) {
  if (!Array.isArray(o) || !Array.isArray(p)) throw TypeError();
  var _o = o.filter(function (x) {
    return x;
  });
  var _p = p.filter(function (x) {
    return x;
  });
  var result = _o.concat(_p).filter(function (x, i, y) {
    return y.indexOf(x) === i;
  });
  return result;
};
module.exports.dup = dup;

/**
 * dst
 *
 * @param {array} o
 * @returns {array}
 */
var dst = function dst(o) {
  if (!Array.isArray(o)) throw TypeError();
  var _o = o.filter(function (x) {
    return x;
  });
  var _p = _o.sort(function (s, t) {
    var a = s.toString().toLowerCase();
    var b = t.toString().toLowerCase();
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });
  var result = _p.filter(function (x, i, y) {
    if (i === 0) return true;
    return x !== y[i - 1];
  });
  return result;
};
module.exports.dst = dst;

/**
 * getTimeStamp
 *
 * @returns {string}
 */
var getTimeStamp = function getTimeStamp() {
  var dt = new Date();
  return dt.toISOString();
};
module.exports.getTimeStamp = getTimeStamp;

/**
 * getLocalTimeStamp
 *
 * @param {string} s
 * @returns {string}
 */
var getLocalTimeStamp = function getLocalTimeStamp(s) {
  var dt = new Date(s);
  var _yr = dt.getFullYear();
  var _mo = dt.getMonth() + 1;
  var _dy = dt.getDate();
  var _tm = dt.toTimeString().split(' ')[0];
  return _yr + "-" + _mo + "-" + _dy + " " + _tm;
};
module.exports.getLocalTimeStamp = getLocalTimeStamp;

/**
 * setTimeStamp
 *
 * @param {string} s
 * @returns {object}
 */
var setTimeStamp = function setTimeStamp(s) {
  var matches = /^(\d+)\/(\d+)\/(\d+)$/.exec(s);
  if (!matches) {
    return false;
  }
  var y = parseInt(matches[1]);
  var m = parseInt(matches[2]);
  var d = parseInt(matches[3]);
  if (m < 1 || m > 12 || d < 1 || d > 31) {
    return null;
  }
  var dt = new Date(y, m - 1, d, 0, 0, 0, 0);
  if (dt.getFullYear() != y || dt.getMonth() != m - 1 || dt.getDate() != d) {
    return null;
  }
  return dt.toISOString();
};
module.exports.setTimeStamp = setTimeStamp;

var isValidDate = function isValidDate(s) {
  var matches = /^(\d+)\/(\d+)\/(\d+)$/.exec(s);
  if (!matches) {
    return false;
  }
  var y = parseInt(matches[1]);
  var m = parseInt(matches[2]);
  var d = parseInt(matches[3]);
  if (m < 1 || m > 12 || d < 1 || d > 31) {
    return false;
  }
  var dt = new Date(y, m - 1, d, 0, 0, 0, 0);
  if (dt.getFullYear() != y || dt.getMonth() != m - 1 || dt.getDate() != d) {
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
var invoke = function invoke(fn, s, i, e) {
  if (!s) s = 0;
  setTimeout(fn, s);
  if (arguments.length >= 3) {
    setTimeout(function () {
      var h = setInterval(fn, i);
      if (e) setTimeout(function () {
        clearInterval(h);
      }, e);
    }, s);
  }
};
module.exports.invoke = invoke;

/**
 * Encode the properties of an object as if they were name/value 
 * pairs from an HTML form, 
 * using application/x-www-form-urlencoded format
 */
exports.encodeFormData = function (data) {
  if (!data) return "";
  var pairs = [];
  for (var name in data) {
    if (!data.hasOwnProperty(name)) continue;
    if (typeof data[name] === "function") continue;
    var value = data[name].toString();
    name = encodeURIComponent(name.replace(" ", "+"));
    value = encodeURIComponent(value.replace(" ", "+"));
    pairs.push(name + "=" + value);
  }
  return pairs.join('&');
};

/**
 * Decode an HTML form as if they were name/value pairs from 
 * the properties of an object, 
 * using application/x-www-form-urlencoded format↲
 */
exports.decodeFormData = function (text, sep, eq, isDecode) {
  text = text || location.search.substr(1);
  sep = sep || '&';
  eq = eq || '=';
  var decode = isDecode ? decodeURIComponent : function (a) {
    return a;
  };
  return text.split(sep).reduce(function (obj, v) {
    var pair = v.split(eq);
    obj[pair[0]] = decode(pair[1]);
    return obj;
  }, {});
};

/**
 * Generated a randam characters, using 'Math.random()' method.
 * $length: number of characters to be generated.
 */
exports.makeRandStr = function (length) {
  var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJLKMNOPQRSTUVWXYZ0123456789';
  var str = '';
  for (var i = 0; i < length; ++i) {
    str += chars[Math.floor(Math.random() * 62)];
  }
  return str;
};

/**
 * Generated a randam characters, using 'Math.random()' method.
 * $length: number of characters to be generated.
 */
exports.makeRandInt = function (length) {
  var chars = '123456789';
  var str = '';
  for (var i = 0; i < length; ++i) {
    str += chars[Math.floor(Math.random() * 9)];
  }
  return parseInt(str, 10);
};

/***/ }),
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
/***/ (function(module, exports) {

module.exports = {
  convert: function convert(containerClass) {
    var tmp = containerClass;
    containerClass = function containerClass() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return new (Function.prototype.bind.apply(tmp, [null].concat(args)))();
    };
    containerClass.prototype = tmp.prototype;
    containerClass.getStores = tmp.getStores;
    containerClass.calculateState = tmp.calculateState;
    return containerClass;
  }
};

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dispatcher__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_NoteApiClient__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_webutils__ = __webpack_require__(1);




var pspid = 'AppAction';

/* harmony default export */ __webpack_exports__["a"] = ({
  selectedContent: function selectedContent(selected, title) {
    __WEBPACK_IMPORTED_MODULE_2__utils_webutils__["a" /* log */].trace(pspid + '>', selected, title);
    Object(__WEBPACK_IMPORTED_MODULE_0__dispatcher__["b" /* dispatch */])({ type: 'content/select', selected: selected, title: title });
  },
  fetchConfig: function fetchConfig() {
    return __WEBPACK_IMPORTED_MODULE_1__services_NoteApiClient__["a" /* default */].fetchConfig().then(function (config) {
      Object(__WEBPACK_IMPORTED_MODULE_0__dispatcher__["b" /* dispatch */])({ type: 'config/fetch/appid', config: config });
      __WEBPACK_IMPORTED_MODULE_2__utils_webutils__["a" /* log */].info(pspid + '>', 'Response: config/fetch/appid');
      __WEBPACK_IMPORTED_MODULE_2__utils_webutils__["a" /* log */].trace(pspid + '>', 'Config:', config);
      __WEBPACK_IMPORTED_MODULE_2__utils_webutils__["b" /* spn */].stop();
    });
  },
  writeConfig: function writeConfig(obj) {
    return __WEBPACK_IMPORTED_MODULE_1__services_NoteApiClient__["a" /* default */].writeConfig(obj).then(function (config) {
      Object(__WEBPACK_IMPORTED_MODULE_0__dispatcher__["b" /* dispatch */])({ type: 'config/write/appid', config: config });
      __WEBPACK_IMPORTED_MODULE_2__utils_webutils__["a" /* log */].info(pspid + '>', 'Response: config/write/appid');
      __WEBPACK_IMPORTED_MODULE_2__utils_webutils__["a" /* log */].trace(pspid + '>', 'Config:', config);
      __WEBPACK_IMPORTED_MODULE_2__utils_webutils__["b" /* spn */].stop();
    });
  }
});

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_iso8601_duration__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_iso8601_duration___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_iso8601_duration__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_webutils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_stdutils__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_stdutils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__utils_stdutils__);




__WEBPACK_IMPORTED_MODULE_1__utils_webutils__["a" /* log */].config('console', 'basic', 'ALL', 'note-renderer');
__WEBPACK_IMPORTED_MODULE_1__utils_webutils__["b" /* spn */].config('app');

var pspid = 'eBAPIClient';

//const v1 = 'http://svcs.ebay.com/services/search/FindingService/v1'
//const v2 = 'http://open.api.ebay.com/shopping';
//const s1 = 'http://svcs.sandbox.ebay.com/services/search/FindingService/v1';
//const s2 = 'http://open.api.sandbox.ebay.com/shopping';
//const appid = 'Develope-WatchNot-PRD-05d7a0307-e288d29c';

var eBay = new Object();

/* harmony default export */ __webpack_exports__["a"] = ({
  request: function request(action, response) {
    __WEBPACK_IMPORTED_MODULE_1__utils_webutils__["a" /* log */].info(pspid + '>', 'Request:', action);
    switch (action) {
      case 'config/fetch':
        return new Promise(function (resolve) {
          var memory = window.localStorage || window.UserDataStorage && new __WEBPACK_IMPORTED_MODULE_1__utils_webutils__["c" /* str */].UserDataStorage() || new __WEBPACK_IMPORTED_MODULE_1__utils_webutils__["c" /* str */].CookieStorage();
          eBay = JSON.parse(memory.getItem("eBay_config"));
          resolve(eBay);
        });
      case 'config/write':
        return new Promise(function (resolve) {
          var memory = window.localStorage || window.UserDataStorage && new __WEBPACK_IMPORTED_MODULE_1__utils_webutils__["c" /* str */].UserDataStorage() || new __WEBPACK_IMPORTED_MODULE_1__utils_webutils__["c" /* str */].CookieStorage();
          memory.setItem("eBay_config", JSON.stringify(response));
          resolve(response);
        });
      case 'findItemsByKeywords':
        return new Promise(function (resolve) {
          JSONP.request(eBay.findingApi, response, function (obj) {
            resolve(obj);
          });
        });
      case 'findCompletedItems':
        return new Promise(function (resolve) {
          JSONP.request(eBay.findingApi, response, function (obj) {
            resolve(obj);
          });
        });
      case 'findItemsByProduct':
        return new Promise(function (resolve) {
          JSONP.request(eBay.findingApi, response, function (obj) {
            resolve(obj);
          });
        });
      default:
        return new Promise(function (resolve) {
          __WEBPACK_IMPORTED_MODULE_1__utils_webutils__["a" /* log */].warn(pspid + '> Unknown request !!');
          resolve(response);
        });
    }
  },
  fetchConfig: function fetchConfig() {
    return this.request('config/fetch');
  },
  writeConfig: function writeConfig(config) {
    return this.request('config/write', config);
  },
  putItems: function putItems(items) {
    return this.request('writeItemsByKeywords', items);
  },
  getItems: function getItems(options, page) {
    return this.request('findItemsByKeywords', this.optItems({
      appid: eBay.appid, page: page, operation: 'findItemsByKeywords'
    }, options));
  },
  fetchItems: function fetchItems(options, page) {
    __WEBPACK_IMPORTED_MODULE_1__utils_webutils__["a" /* log */].trace(pspid + '>', 'options:', options);
    __WEBPACK_IMPORTED_MODULE_1__utils_webutils__["a" /* log */].trace(pspid + '>', 'page:', page);
    __WEBPACK_IMPORTED_MODULE_1__utils_webutils__["b" /* spn */].spin();
    return this.getItems(options, page).then(this.resItems).then(this.setItems)
    //.then(R.tap(this.traceLog.bind(this)))
    .catch(this.errorLog.bind(this));
  },
  writeItems: function writeItems(options) {
    var _this = this;

    var pages = options.pages;
    __WEBPACK_IMPORTED_MODULE_1__utils_webutils__["a" /* log */].trace(pspid + '>', 'options:', options);
    __WEBPACK_IMPORTED_MODULE_1__utils_webutils__["a" /* log */].trace(pspid + '>', 'pages:', pages);
    __WEBPACK_IMPORTED_MODULE_1__utils_webutils__["b" /* spn */].spin();
    var mapIndexed = R.addIndex(R.map);
    return this.getItems(options, 1).then(this.resItems).then(R.curry(this.forItems.bind(this))(options)).then(R.map(this.resItems.bind(this))).then(R.map(this.setItems.bind(this))).then(R.flatten).then(R.filter(R.curry(this.filterItem.bind(this))(options))).then(mapIndexed(function (obj, idx) {
      return _this.renderItem(obj, idx + 1);
    })).then(this.addHeader.bind(this)).then(R.map(this.toCSV.bind(this)))
    //.then(R.tap(this.traceLog.bind(this)))
    .catch(this.errorLog.bind(this));
  },
  addHeader: function addHeader(obj) {
    var arr = new Array();
    for (var prop in obj[0]) {
      arr.push(prop);
    }
    obj.unshift(arr);
    return obj;
  },
  toCSV: function toCSV(obj) {
    var arr = new Array();
    for (var prop in obj) {
      arr.push(obj[prop]);
    }
    return arr.join();
  },
  forItems: function forItems(options, res) {
    var pages = options.pages;
    var page = Number(res.paginationOutput[0].totalPages[0]) < pages ? Number(res.paginationOutput[0].totalPages[0]) : pages;
    var newItems = [];

    for (var idx = 1; idx <= page; idx++) {
      newItems.push(this.getItems(options, idx));
    }
    return Promise.all(newItems);
  },
  resItems: function resItems(obj) {
    return obj.hasOwnProperty('findItemsByKeywordsResponse') ? obj.findItemsByKeywordsResponse[0] : null;
  },
  putCompleteItems: function putCompleteItems(items) {
    return this.request('writeCompletedItems', items);
  },
  getCompleteItems: function getCompleteItems(options, page) {
    return this.request('findCompletedItems', this.optItems({
      appid: eBay.appid, page: page, operation: 'findCompletedItems'
    }, options));
  },
  fetchCompleteItems: function fetchCompleteItems(options, page) {
    __WEBPACK_IMPORTED_MODULE_1__utils_webutils__["a" /* log */].trace(pspid + '>', 'options:', options);
    __WEBPACK_IMPORTED_MODULE_1__utils_webutils__["a" /* log */].trace(pspid + '>', 'page:', page);
    __WEBPACK_IMPORTED_MODULE_1__utils_webutils__["b" /* spn */].spin();
    return this.getCompleteItems(options, page).then(this.resCompleteItems).then(this.setItems)
    //.then(R.tap(this.traceLog.bind(this)))
    .catch(this.errorLog.bind(this));
  },
  writeCompleteItems: function writeCompleteItems(options) {
    var _this2 = this;

    var pages = options.pages;
    __WEBPACK_IMPORTED_MODULE_1__utils_webutils__["a" /* log */].trace(pspid + '>', 'options:', options);
    __WEBPACK_IMPORTED_MODULE_1__utils_webutils__["a" /* log */].trace(pspid + '>', 'pages:', pages);
    __WEBPACK_IMPORTED_MODULE_1__utils_webutils__["b" /* spn */].spin();
    var mapIndexed = R.addIndex(R.map);
    return this.getCompleteItems(options, 1).then(this.resCompleteItems).then(R.curry(this.forCompleteItems.bind(this))(options)).then(R.map(this.resCompleteItems.bind(this))).then(R.map(this.setItems.bind(this))).then(R.flatten).then(R.filter(R.curry(this.filterItem.bind(this))(options))).then(mapIndexed(function (obj, idx) {
      return _this2.renderItem(obj, idx + 1);
    })).then(this.addHeader.bind(this)).then(R.map(this.toCSV.bind(this)))
    //.then(R.tap(this.traceLog.bind(this)))
    .catch(this.errorLog.bind(this));
  },
  forCompleteItems: function forCompleteItems(options, res) {
    var pages = options.pages;
    var page = Number(res.paginationOutput[0].totalPages[0]) < pages ? Number(res.paginationOutput[0].totalPages[0]) : pages;
    var newItems = [];

    for (var idx = 1; idx <= page; idx++) {
      newItems.push(this.getCompleteItems(options, idx));
    }
    return Promise.all(newItems);
  },
  resCompleteItems: function resCompleteItems(obj) {
    return obj.hasOwnProperty('findCompletedItemsResponse') ? obj.findCompletedItemsResponse[0] : null;
  },
  putProductsItems: function putProductsItems(items) {
    return this.request('writeItemsByProduct', items);
  },
  getProductsItems: function getProductsItems(options, page) {
    return this.request('findItemsByProduct', this.optProducts({
      appid: eBay.appid, page: page, operation: 'findItemsByProduct'
    }, options));
  },
  fetchProductsItems: function fetchProductsItems(options, page) {
    __WEBPACK_IMPORTED_MODULE_1__utils_webutils__["a" /* log */].trace(pspid + '>', 'options:', options);
    __WEBPACK_IMPORTED_MODULE_1__utils_webutils__["a" /* log */].trace(pspid + '>', 'page:', page);
    __WEBPACK_IMPORTED_MODULE_1__utils_webutils__["b" /* spn */].spin();
    return this.getProductsItems(options, page).then(this.resProductsItems).then(this.setItems)
    //.then(R.tap(this.traceLog.bind(this)))
    .catch(this.errorLog.bind(this));
  },
  writeProductsItems: function writeProductsItems(options) {
    var _this3 = this;

    var pages = options.pages;
    __WEBPACK_IMPORTED_MODULE_1__utils_webutils__["a" /* log */].trace(pspid + '>', 'options:', options);
    __WEBPACK_IMPORTED_MODULE_1__utils_webutils__["a" /* log */].trace(pspid + '>', 'pages:', pages);
    __WEBPACK_IMPORTED_MODULE_1__utils_webutils__["b" /* spn */].spin();
    var mapIndexed = R.addIndex(R.map);
    return this.getProductsItems(options, 1).then(this.resProductsItems).then(R.curry(this.forProductsItems.bind(this))(options)).then(R.map(this.resProductsItems.bind(this))).then(R.map(this.setItems.bind(this))).then(R.flatten).then(R.filter(R.curry(this.filterItem.bind(this))(options))).then(mapIndexed(function (obj, idx) {
      return _this3.renderItem(obj, idx + 1);
    })).then(this.addHeader.bind(this)).then(R.map(this.toCSV.bind(this)))
    //.then(R.tap(this.traceLog.bind(this)))
    .catch(this.errorLog.bind(this));
  },
  forProductsItems: function forProductsItems(options, res) {
    var pages = options.pages;
    var page = Number(res.paginationOutput[0].totalPages[0]) < pages ? Number(res.paginationOutput[0].totalPages[0]) : pages;
    var newItems = [];

    for (var idx = 1; idx <= page; idx++) {
      newItems.push(this.getProductsItems(options, idx));
    }
    return Promise.all(newItems);
  },
  resProductsItems: function resProductsItems(obj) {
    return obj.hasOwnProperty('findItemsByProductResponse') ? obj.findItemsByProductResponse[0] : null;
  },
  setItems: function setItems(obj) {
    return obj && obj.ack[0] === 'Success' ? obj.searchResult[0].item : null;
  },
  optProducts: function optProducts(o, p) {
    var _o = o;
    var _p = p ? p : {};
    var options = new Object();
    options['GLOBAL-ID'] = 'EBAY-US';
    options['MESSAGE-ENCODING'] = 'UTF-8';
    options['OPERATION-NAME'] = _o.operation;
    options['REQUEST-DATA-FORMAT'] = 'NV';
    options['RESPONSE-DATA-FORMAT'] = 'JSON';
    options['REST-PAYLOAD'] = '';
    options['SECURITY-APPNAME'] = _o.appid;
    options['SERVICE-VERSION'] = '1.13.0';
    options['outputSelector'] = 'SellerInfo';
    options['paginationInput.entriesPerPage'] = 20;
    options['paginationInput.pageNumber'] = _o.page;

    if (_p.productId && _p.productType) {
      options['productId'] = _p.productId;
      options['productId.@type'] = _p.productType;
    } else {
      options['productId'] = '';
      options['productId.@type'] = '';
    }

    var n = 0;
    if (_p.seller && _p.seller.length) {
      options['itemFilter(' + n + ').name'] = 'Seller';
      _p.seller.forEach(function (slr, idx) {
        return options['itemFilter(' + n + ').value(' + idx + ')'] = slr;
      });
      n++;
    }

    if (_p.highestPrice) {
      options['itemFilter(' + n + ').name'] = 'MaxPrice';
      options['itemFilter(' + n + ').value(0)'] = _p.highestPrice;
      n++;
    }

    if (_p.lowestPrice) {
      options['itemFilter(' + n + ').name'] = 'MinPrice';
      options['itemFilter(' + n + ').value(0)'] = _p.lowestPrice;
      n++;
    }

    if (_p.condition && _p.condition.length) {
      options['itemFilter(' + n + ').name'] = 'Condition';
      _p.condition.forEach(function (cdn, idx) {
        return options['itemFilter(' + n + ').value(' + idx + ')'] = cdn;
      });
      n++;
    }

    __WEBPACK_IMPORTED_MODULE_1__utils_webutils__["a" /* log */].trace(pspid + '>', 'Request:', options);
    return options;
  },
  optItems: function optItems(o, p) {
    var _o = o;
    var _p = p ? p : {};
    var options = new Object();
    options['GLOBAL-ID'] = 'EBAY-US';
    options['MESSAGE-ENCODING'] = 'UTF-8';
    options['OPERATION-NAME'] = _o.operation;
    options['REQUEST-DATA-FORMAT'] = 'NV';
    options['RESPONSE-DATA-FORMAT'] = 'JSON';
    options['REST-PAYLOAD'] = '';
    options['SECURITY-APPNAME'] = _o.appid;
    options['SERVICE-VERSION'] = '1.13.0';
    options['outputSelector'] = 'SellerInfo';
    options['paginationInput.entriesPerPage'] = 20;
    options['paginationInput.pageNumber'] = _o.page;

    if (_p.searchString) {
      options['keywords'] = _p.searchString;
    } else {
      options['keywords'] = '';
    }

    var n = 0;
    if (_p.seller && _p.seller.length) {
      options['itemFilter(' + n + ').name'] = 'Seller';
      _p.seller.forEach(function (slr, idx) {
        return options['itemFilter(' + n + ').value(' + idx + ')'] = slr;
      });
      n++;
    }

    if (_p.highestPrice) {
      options['itemFilter(' + n + ').name'] = 'MaxPrice';
      options['itemFilter(' + n + ').value(0)'] = _p.highestPrice;
      n++;
    }

    if (_p.lowestPrice) {
      options['itemFilter(' + n + ').name'] = 'MinPrice';
      options['itemFilter(' + n + ').value(0)'] = _p.lowestPrice;
      n++;
    }

    if (_p.condition && _p.condition.length) {
      options['itemFilter(' + n + ').name'] = 'Condition';
      _p.condition.forEach(function (cdn, idx) {
        return options['itemFilter(' + n + ').value(' + idx + ')'] = cdn;
      });
      n++;
    }

    if (_p.soldItemOnly === true) {
      options['itemFilter(' + n + ').name'] = 'SoldItemOnly';
      options['itemFilter(' + n + ').value(0)'] = 'true';
      n++;
    }

    if (__WEBPACK_IMPORTED_MODULE_2__utils_stdutils___default.a.isValidDate(_p.startDate)) {
      options['itemFilter(' + n + ').name'] = 'EndTimeFrom';
      options['itemFilter(' + n + ').value(0)'] = __WEBPACK_IMPORTED_MODULE_2__utils_stdutils___default.a.setTimeStamp(_p.startDate);
      n++;
    }

    if (__WEBPACK_IMPORTED_MODULE_2__utils_stdutils___default.a.isValidDate(_p.endDate)) {
      options['itemFilter(' + n + ').name'] = 'EndTimeTo';
      options['itemFilter(' + n + ').value(0)'] = __WEBPACK_IMPORTED_MODULE_2__utils_stdutils___default.a.setTimeStamp(_p.endDate);
      n++;
    }

    __WEBPACK_IMPORTED_MODULE_1__utils_webutils__["a" /* log */].trace(pspid + '>', 'Request:', options);
    return options;
  },
  traceLog: function traceLog(obj) {
    return __WEBPACK_IMPORTED_MODULE_1__utils_webutils__["a" /* log */].trace(pspid + '>', 'Trace log:', obj);
  },
  errorLog: function errorLog(err) {
    return __WEBPACK_IMPORTED_MODULE_1__utils_webutils__["a" /* log */].error(pspid + '>', 'Error occurred:', err);
  },
  renderStatus: function renderStatus(status) {
    switch (status) {
      case 0:
        return 'Now available.';
      case 1:
        return 'New added.';
      case 2:
        return 'Removed.';
    }
  },
  renderExtension: function renderExtension(date) {
    return __WEBPACK_IMPORTED_MODULE_2__utils_stdutils___default.a.getLocalTimeStamp(Object(__WEBPACK_IMPORTED_MODULE_0_iso8601_duration__["end"])(Object(__WEBPACK_IMPORTED_MODULE_0_iso8601_duration__["parse"])(date)));
  },
  renderItem: function renderItem(item, idx) {
    var Img = item.hasOwnProperty('galleryURL') ? item.galleryURL[0] : '';
    var Aid = item.itemId[0];
    var Pid = item.hasOwnProperty('productId') ? item.productId.map(function (obj) {
      return obj.__value__ + ' ( ' + obj['@type'] + ' )';
    }) : ['---'];
    var Sid = item.sellerInfo[0].sellerUserName[0];
    var Stm = __WEBPACK_IMPORTED_MODULE_2__utils_stdutils___default.a.getLocalTimeStamp(item.listingInfo[0].startTime[0]);
    var Etm = __WEBPACK_IMPORTED_MODULE_2__utils_stdutils___default.a.getLocalTimeStamp(item.listingInfo[0].endTime[0]);
    var Url = item.viewItemURL[0];
    var Ttl = item.title[0];
    var Pc1 = item.sellingStatus[0].currentPrice[0].__value__;
    var Ci1 = item.sellingStatus[0].currentPrice[0]['@currencyId'];
    var Pc2 = item.sellingStatus[0].convertedCurrentPrice[0].__value__;
    var Ci2 = item.sellingStatus[0].convertedCurrentPrice[0]['@currencyId'];
    var Cdn = item.hasOwnProperty('condition') ? item.condition[0].conditionDisplayName[0] : '---';
    var Cgp = item.primaryCategory[0].categoryName[0];
    var Shp = item.shippingInfo[0].shipToLocations[0];
    var Stt = item.sellingStatus[0].sellingState[0];
    var Ext = item.sellingStatus[0].hasOwnProperty('timeLeft') ? this.renderExtension(item.sellingStatus[0].timeLeft[0]) : '';
    var stt = this.renderStatus(0);
    var Upd = __WEBPACK_IMPORTED_MODULE_2__utils_stdutils___default.a.getLocalTimeStamp(Date.now());

    return {
      'Key': idx,
      'Image': Img,
      'Url': Url,
      'Title': Ttl,
      'Sell Start': Stm,
      'Sell Stop': Etm,
      'Condition': Cdn,
      'Seller': Sid,
      'ItemID': Aid,
      'ProductID': Pid.join('/'),
      'Category': Cgp,
      'Shipping': Shp,
      'Price': Pc1,
      'Currency': Ci1,
      'Convert Price': Pc2,
      'Convert Currency': Ci2,
      'Status': Stt,
      'Extention': Ext,
      'Avail': stt,
      'Updated': Upd
    };
  },
  filterItem: function filterItem(options, obj) {
    var item = obj;
    if (options != null) {
      if (!options.shipping.some(function (shipping) {
        return shipping === item.shippingInfo[0].shipToLocations[0];
      }) && options.shipping.length) return false;
      if (!options.condition.some(function (condition) {
        return condition === item.condition[0].conditionId[0];
      }) && options.condition.length) return false;
      if (!options.status.some(function (status) {
        return status === item.sellingStatus[0].sellingState[0];
      }) && options.status.length) return false;
      if (!options.categoryPath.some(function (path) {
        return path === item.primaryCategory[0].categoryName[0];
      }) && options.categoryPath.length) return false;
      if (!options.seller.some(function (selr) {
        return selr === item.sellerInfo[0].sellerUserName[0];
      }) && options.seller.length) return false;
      if (!options.itemId.some(function (itemid) {
        return itemid === item.itemId[0];
      }) && options.itemId.length) return false;
      if (!isFinite(options.lowestPrice) || !isFinite(options.highestPrice)) return false;
      if (Number(options.lowestPrice) > item.sellingStatus[0].convertedCurrentPrice[0].__value__ && options.lowestPrice !== '') return false;
      if (Number(options.highestPrice) < item.sellingStatus[0].convertedCurrentPrice[0].__value__ && options.highestPrice !== '') return false;
    }
    return true;
  }
});

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
 * @description A module for parsing ISO8601 durations
 */

/**
 * The pattern used for parsing ISO8601 duration (PnYnMnDTnHnMnS).
 * This does not cover the week format PnW.
 */

// PnYnMnDTnHnMnS
var numbers = '\\d+(?:[\\.,]\\d{0,3})?';
var weekPattern = '(' + numbers + 'W)';
var datePattern = '(' + numbers + 'Y)?(' + numbers + 'M)?(' + numbers + 'D)?';
var timePattern = 'T(' + numbers + 'H)?(' + numbers + 'M)?(' + numbers + 'S)?';

var iso8601 = 'P(?:' + weekPattern + '|' + datePattern + '(?:' + timePattern + ')?)';
var objMap = ['weeks', 'years', 'months', 'days', 'hours', 'minutes', 'seconds'];

/**
 * The ISO8601 regex for matching / testing durations
 */
var pattern = exports.pattern = new RegExp(iso8601);

/** Parse PnYnMnDTnHnMnS format to object
 * @param {string} durationString - PnYnMnDTnHnMnS formatted string
 * @return {Object} - With a property for each part of the pattern
 */
var parse = exports.parse = function parse(durationString) {
	// slice away first entry in match-array
	return durationString.match(pattern).slice(1).reduce(function (prev, next, idx) {
		prev[objMap[idx]] = parseFloat(next) || 0;
		return prev;
	}, {});
};

/**
 * Convert ISO8601 duration object to an end Date.
 *
 * @param {Object} duration - The duration object
 * @param {Date} startDate - The starting Date for calculating the duration
 * @return {Date} - The resulting end Date
 */
var end = exports.end = function end(duration, startDate) {
	// create two equal timestamps, add duration to 'then' and return time difference
	var timestamp = startDate ? startDate.getTime() : Date.now();
	var then = new Date(timestamp);

	then.setFullYear(then.getFullYear() + duration.years);
	then.setMonth(then.getMonth() + duration.months);
	then.setDate(then.getDate() + duration.days);
	then.setHours(then.getHours() + duration.hours);
	then.setMinutes(then.getMinutes() + duration.minutes);
	// then.setSeconds(then.getSeconds() + duration.seconds);
	then.setMilliseconds(then.getMilliseconds() + duration.seconds * 1000);
	// special case weeks
	then.setDate(then.getDate() + duration.weeks * 7);

	return then;
};

/**
 * Convert ISO8601 duration object to seconds
 *
 * @param {Object} duration - The duration object
 * @param {Date} startDate - The starting point for calculating the duration
 * @return {Number}
 */
var toSeconds = exports.toSeconds = function toSeconds(duration, startDate) {
	var timestamp = startDate ? startDate.getTime() : Date.now();
	var now = new Date(timestamp);
	var then = end(duration, startDate);

	var seconds = (then.getTime() - now.getTime()) / 1000;
	return seconds;
};

exports.default = {
	end: end,
	toSeconds: toSeconds,
	pattern: pattern,
	parse: parse
};

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var Radio = function (_React$Component) {
  _inherits(Radio, _React$Component);

  function Radio(props) {
    _classCallCheck(this, Radio);

    var _this = _possibleConstructorReturn(this, (Radio.__proto__ || Object.getPrototypeOf(Radio)).call(this, props));

    _this.state = {
      value: props.defaultValue
    };
    return _this;
  }

  _createClass(Radio, [{
    key: "handleChange",
    value: function handleChange(event) {
      if (this.props.onChange) {
        this.props.onChange(event);
      }
      this.setState({
        value: event.target.value
      });
    }
  }, {
    key: "render",
    value: function render() {
      var value = this.props.value || this.state.value;
      var children = __WEBPACK_IMPORTED_MODULE_0_react___default.a.Children.map(this.props.children, function (child, i) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "div",
          { className: "radio" },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "label",
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "radio",
              name: this.props.name,
              value: child.props.value,
              checked: child.props.value === value,
              onChange: this.handleChange.bind(this) }),
            child.props.children
          )
        );
      }.bind(this));
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "span",
        null,
        children
      );
    }
  }]);

  return Radio;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (Radio);
;

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule FluxStoreGroup
 * 
 */



function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

var invariant = __webpack_require__(2);

/**
 * FluxStoreGroup allows you to execute a callback on every dispatch after
 * waiting for each of the given stores.
 */

var FluxStoreGroup = function () {
  function FluxStoreGroup(stores, callback) {
    var _this = this;

    _classCallCheck(this, FluxStoreGroup);

    this._dispatcher = _getUniformDispatcher(stores);

    // Precompute store tokens.
    var storeTokens = stores.map(function (store) {
      return store.getDispatchToken();
    });

    // Register with the dispatcher.
    this._dispatchToken = this._dispatcher.register(function (payload) {
      _this._dispatcher.waitFor(storeTokens);
      callback();
    });
  }

  FluxStoreGroup.prototype.release = function release() {
    this._dispatcher.unregister(this._dispatchToken);
  };

  return FluxStoreGroup;
}();

function _getUniformDispatcher(stores) {
  !(stores && stores.length) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Must provide at least one store to FluxStoreGroup') : invariant(false) : undefined;
  var dispatcher = stores[0].getDispatcher();
  if (process.env.NODE_ENV !== 'production') {
    for (var _iterator = stores, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var store = _ref;

      !(store.getDispatcher() === dispatcher) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'All stores in a FluxStoreGroup must use the same dispatcher') : invariant(false) : undefined;
    }
  }
  return dispatcher;
}

module.exports = FluxStoreGroup;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule FluxStore
 * 
 */



function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

var _require = __webpack_require__(68);

var EventEmitter = _require.EventEmitter;

var invariant = __webpack_require__(2);

/**
 * This class represents the most basic functionality for a FluxStore. Do not
 * extend this store directly; instead extend FluxReduceStore when creating a
 * new store.
 */

var FluxStore = function () {
  function FluxStore(dispatcher) {
    var _this = this;

    _classCallCheck(this, FluxStore);

    this.__className = this.constructor.name;

    this.__changed = false;
    this.__changeEvent = 'change';
    this.__dispatcher = dispatcher;
    this.__emitter = new EventEmitter();
    this._dispatchToken = dispatcher.register(function (payload) {
      _this.__invokeOnDispatch(payload);
    });
  }

  FluxStore.prototype.addListener = function addListener(callback) {
    return this.__emitter.addListener(this.__changeEvent, callback);
  };

  FluxStore.prototype.getDispatcher = function getDispatcher() {
    return this.__dispatcher;
  };

  /**
   * This exposes a unique string to identify each store's registered callback.
   * This is used with the dispatcher's waitFor method to declaratively depend
   * on other stores updating themselves first.
   */

  FluxStore.prototype.getDispatchToken = function getDispatchToken() {
    return this._dispatchToken;
  };

  /**
   * Returns whether the store has changed during the most recent dispatch.
   */

  FluxStore.prototype.hasChanged = function hasChanged() {
    !this.__dispatcher.isDispatching() ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s.hasChanged(): Must be invoked while dispatching.', this.__className) : invariant(false) : undefined;
    return this.__changed;
  };

  FluxStore.prototype.__emitChange = function __emitChange() {
    !this.__dispatcher.isDispatching() ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s.__emitChange(): Must be invoked while dispatching.', this.__className) : invariant(false) : undefined;
    this.__changed = true;
  };

  /**
   * This method encapsulates all logic for invoking __onDispatch. It should
   * be used for things like catching changes and emitting them after the
   * subclass has handled a payload.
   */

  FluxStore.prototype.__invokeOnDispatch = function __invokeOnDispatch(payload) {
    this.__changed = false;
    this.__onDispatch(payload);
    if (this.__changed) {
      this.__emitter.emit(this.__changeEvent);
    }
  };

  /**
   * The callback that will be registered with the dispatcher during
   * instantiation. Subclasses must override this method. This callback is the
   * only way the store receives new data.
   */

  FluxStore.prototype.__onDispatch = function __onDispatch(payload) {
     true ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s has not overridden FluxStore.__onDispatch(), which is required', this.__className) : invariant(false) : undefined;
  };

  return FluxStore;
}();

module.exports = FluxStore;

// private

// protected, available to subclasses

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 * 
 * @providesModule EmitterSubscription
 * @typechecks
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function, not ' + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var EventSubscription = __webpack_require__(70);

/**
 * EmitterSubscription represents a subscription with listener and context data.
 */

var EmitterSubscription = function (_EventSubscription) {
  _inherits(EmitterSubscription, _EventSubscription);

  /**
   * @param {EventSubscriptionVendor} subscriber - The subscriber that controls
   *   this subscription
   * @param {function} listener - Function to invoke when the specified event is
   *   emitted
   * @param {*} context - Optional context object to use when invoking the
   *   listener
   */

  function EmitterSubscription(subscriber, listener, context) {
    _classCallCheck(this, EmitterSubscription);

    _EventSubscription.call(this, subscriber);
    this.listener = listener;
    this.context = context;
  }

  return EmitterSubscription;
}(EventSubscription);

module.exports = EmitterSubscription;

/***/ }),
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_App_App__ = __webpack_require__(63);




__WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__pages_App_App__["a" /* default */], null), document.getElementById('app'));

/***/ }),
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_flux_utils__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_flux_utils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_flux_utils__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__FluxContainerConverter__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__FluxContainerConverter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__FluxContainerConverter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__stores_appStore__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__actions_AppAction__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_AppBody_AppBody__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_Note_Note__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_Complete_Complete__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_Products_Products__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_Tabs_Tabs__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_Contents_Contents__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_GlobalHeader_GlobalHeader__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_GlobalFooter_GlobalFooter__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__utils_webutils__ = __webpack_require__(1);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
















var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      __WEBPACK_IMPORTED_MODULE_4__actions_AppAction__["a" /* default */].fetchConfig();
    }
  }, {
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'window' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_11__components_GlobalHeader_GlobalHeader__["a" /* default */], { title: this.state.title }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_9__components_Tabs_Tabs__["a" /* default */],
          { selected: this.state.selected },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span', { label: 'Search of items' }),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span', { label: 'Search of Completed items' }),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span', { label: 'Search of Product IDs' }),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span', { label: 'Preference' })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_10__components_Contents_Contents__["a" /* default */],
          { selected: this.state.selected },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__pages_Note_Note__["a" /* default */], null),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__pages_Complete_Complete__["a" /* default */], null),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__pages_Products_Products__["a" /* default */], null),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__components_AppBody_AppBody__["a" /* default */], { config: this.state.config })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12__components_GlobalFooter_GlobalFooter__["a" /* default */], null)
      );
    }
  }], [{
    key: 'getStores',
    value: function getStores() {
      return [__WEBPACK_IMPORTED_MODULE_3__stores_appStore__["a" /* default */]];
    }
  }, {
    key: 'calculateState',
    value: function calculateState() {
      return __WEBPACK_IMPORTED_MODULE_3__stores_appStore__["a" /* default */].getState();
    }
  }]);

  return App;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1_flux_utils__["Container"].create(__WEBPACK_IMPORTED_MODULE_2__FluxContainerConverter___default.a.convert(App)));

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule FluxContainer
 * 
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function, not ' + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var FluxContainerSubscriptions = __webpack_require__(65);
var React = __webpack_require__(0);

var invariant = __webpack_require__(2);
var shallowEqual = __webpack_require__(24);

var Component = React.Component;

var DEFAULT_OPTIONS = {
  pure: true,
  withProps: false,
  withContext: false
};

/**
 * A FluxContainer is used to subscribe a react component to multiple stores.
 * The stores that are used must be returned from a static `getStores()` method.
 *
 * The component receives information from the stores via state. The state
 * is generated using a static `calculateState()` method that each container
 * must implement. A simple container may look like:
 *
 *   class FooContainer extends Component {
 *     static getStores() {
 *       return [FooStore];
 *     }
 *
 *     static calculateState() {
 *       return {
 *         foo: FooStore.getState(),
 *       };
 *     }
 *
 *     render() {
 *       return <FooView {...this.state} />;
 *     }
 *   }
 *
 *   module.exports = FluxContainer.create(FooContainer);
 *
 * Flux container also supports some other, more advanced use cases. If you need
 * to base your state off of props as well:
 *
 *   class FooContainer extends Component {
 *     ...
 *
 *     static calculateState(prevState, props) {
 *       return {
 *         foo: FooStore.getSpecificFoo(props.id),
 *       };
 *     }
 *
 *     ...
 *   }
 *
 *   module.exports = FluxContainer.create(FooContainer, {withProps: true});
 *
 * Or if your stores are passed through your props:
 *
 *   class FooContainer extends Component {
 *     ...
 *
 *     static getStores(props) {
 *       const {BarStore, FooStore} = props.stores;
 *       return [BarStore, FooStore];
 *     }
 *
 *     static calculateState(prevState, props) {
 *       const {BarStore, FooStore} = props.stores;
 *       return {
 *         bar: BarStore.getState(),
 *         foo: FooStore.getState(),
 *       };
 *     }
 *
 *     ...
 *   }
 *
 *   module.exports = FluxContainer.create(FooContainer, {withProps: true});
 */
function create(Base, options) {
  enforceInterface(Base);

  // Construct the options using default, override with user values as necessary.
  var realOptions = _extends({}, DEFAULT_OPTIONS, options || {});

  var getState = function getState(state, maybeProps, maybeContext) {
    var props = realOptions.withProps ? maybeProps : undefined;
    var context = realOptions.withContext ? maybeContext : undefined;
    return Base.calculateState(state, props, context);
  };

  var getStores = function getStores(maybeProps, maybeContext) {
    var props = realOptions.withProps ? maybeProps : undefined;
    var context = realOptions.withContext ? maybeContext : undefined;
    return Base.getStores(props, context);
  };

  // Build the container class.

  var ContainerClass = function (_Base) {
    _inherits(ContainerClass, _Base);

    function ContainerClass(props, context) {
      var _this = this;

      _classCallCheck(this, ContainerClass);

      _Base.call(this, props, context);
      this._fluxContainerSubscriptions = new FluxContainerSubscriptions();
      this._fluxContainerSubscriptions.setStores(getStores(props));
      this._fluxContainerSubscriptions.addListener(function () {
        _this.setState(function (prevState, currentProps) {
          return getState(prevState, currentProps, context);
        });
      });
      var calculatedState = getState(undefined, props, context);
      this.state = _extends({}, this.state || {}, calculatedState);
    }

    // Make sure we override shouldComponentUpdate only if the pure option is
    // specified. We can't override this above because we don't want to override
    // the default behavior on accident. Super works weird with react ES6 classes.

    ContainerClass.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps, nextContext) {
      if (_Base.prototype.componentWillReceiveProps) {
        _Base.prototype.componentWillReceiveProps.call(this, nextProps, nextContext);
      }

      if (realOptions.withProps || realOptions.withContext) {
        // Update both stores and state.
        this._fluxContainerSubscriptions.setStores(getStores(nextProps, nextContext));
        this.setState(function (prevState) {
          return getState(prevState, nextProps, nextContext);
        });
      }
    };

    ContainerClass.prototype.componentWillUnmount = function componentWillUnmount() {
      if (_Base.prototype.componentWillUnmount) {
        _Base.prototype.componentWillUnmount.call(this);
      }

      this._fluxContainerSubscriptions.reset();
    };

    return ContainerClass;
  }(Base);

  var container = realOptions.pure ? createPureComponent(ContainerClass) : ContainerClass;

  // Update the name of the container before returning
  var componentName = Base.displayName || Base.name;
  container.displayName = 'FluxContainer(' + componentName + ')';
  return container;
}

function createPureComponent(BaseComponent) {
  var PureComponent = function (_BaseComponent) {
    _inherits(PureComponent, _BaseComponent);

    function PureComponent() {
      _classCallCheck(this, PureComponent);

      _BaseComponent.apply(this, arguments);
    }

    PureComponent.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
      return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
    };

    return PureComponent;
  }(BaseComponent);

  return PureComponent;
}

function enforceInterface(o) {
  !o.getStores ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Components that use FluxContainer must implement `static getStores()`') : invariant(false) : undefined;
  !o.calculateState ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Components that use FluxContainer must implement `static calculateState()`') : invariant(false) : undefined;
}

/**
 * This is a way to connect stores to a functional stateless view. Here's a
 * simple example:
 *
 *   // FooView.js
 *
 *   function FooView(props) {
 *     return <div>{props.value}</div>;
 *   }
 *
 *   module.exports = FooView;
 *
 *
 *   // FooContainer.js
 *
 *   function getStores() {
 *     return [FooStore];
 *   }
 *
 *   function calculateState() {
 *     return {
 *       value: FooStore.getState();
 *     };
 *   }
 *
 *   module.exports = FluxContainer.createFunctional(
 *     FooView,
 *     getStores,
 *     calculateState,
 *   );
 *
 */
function createFunctional(viewFn, _getStores, _calculateState, options) {
  var FunctionalContainer = function (_Component) {
    _inherits(FunctionalContainer, _Component);

    function FunctionalContainer() {
      _classCallCheck(this, FunctionalContainer);

      _Component.apply(this, arguments);
    }

    // Update the name of the component before creating the container.

    FunctionalContainer.getStores = function getStores(props, context) {
      return _getStores(props, context);
    };

    FunctionalContainer.calculateState = function calculateState(prevState, props, context) {
      return _calculateState(prevState, props, context);
    };

    FunctionalContainer.prototype.render = function render() {
      return viewFn(this.state);
    };

    return FunctionalContainer;
  }(Component);

  var viewFnName = viewFn.displayName || viewFn.name || 'FunctionalContainer';
  FunctionalContainer.displayName = viewFnName;
  return create(FunctionalContainer, options);
}

module.exports = { create: create, createFunctional: createFunctional };

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule FluxContainerSubscriptions
 * 
 */



function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

var FluxStoreGroup = __webpack_require__(38);

function shallowArrayEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (a.length !== b.length) {
    return false;
  }
  for (var i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

var FluxContainerSubscriptions = function () {
  function FluxContainerSubscriptions() {
    _classCallCheck(this, FluxContainerSubscriptions);

    this._callbacks = [];
  }

  FluxContainerSubscriptions.prototype.setStores = function setStores(stores) {
    var _this = this;

    if (this._stores && shallowArrayEqual(this._stores, stores)) {
      return;
    }
    this._stores = stores;
    this._resetTokens();
    this._resetStoreGroup();

    var changed = false;
    var changedStores = [];

    if (process.env.NODE_ENV !== 'production') {
      // Keep track of the stores that changed for debugging purposes only
      this._tokens = stores.map(function (store) {
        return store.addListener(function () {
          changed = true;
          changedStores.push(store);
        });
      });
    } else {
      (function () {
        var setChanged = function setChanged() {
          changed = true;
        };
        _this._tokens = stores.map(function (store) {
          return store.addListener(setChanged);
        });
      })();
    }

    var callCallbacks = function callCallbacks() {
      if (changed) {
        _this._callbacks.forEach(function (fn) {
          return fn();
        });
        changed = false;
        if (process.env.NODE_ENV !== 'production') {
          // Uncomment this to print the stores that changed.
          // console.log(changedStores);
          changedStores = [];
        }
      }
    };
    this._storeGroup = new FluxStoreGroup(stores, callCallbacks);
  };

  FluxContainerSubscriptions.prototype.addListener = function addListener(fn) {
    this._callbacks.push(fn);
  };

  FluxContainerSubscriptions.prototype.reset = function reset() {
    this._resetTokens();
    this._resetStoreGroup();
    this._resetCallbacks();
    this._resetStores();
  };

  FluxContainerSubscriptions.prototype._resetTokens = function _resetTokens() {
    if (this._tokens) {
      this._tokens.forEach(function (token) {
        return token.remove();
      });
      this._tokens = null;
    }
  };

  FluxContainerSubscriptions.prototype._resetStoreGroup = function _resetStoreGroup() {
    if (this._storeGroup) {
      this._storeGroup.release();
      this._storeGroup = null;
    }
  };

  FluxContainerSubscriptions.prototype._resetStores = function _resetStores() {
    this._stores = null;
  };

  FluxContainerSubscriptions.prototype._resetCallbacks = function _resetCallbacks() {
    this._callbacks = [];
  };

  return FluxContainerSubscriptions;
}();

module.exports = FluxContainerSubscriptions;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule FluxMixinLegacy
 * 
 */



var FluxStoreGroup = __webpack_require__(38);

var invariant = __webpack_require__(2);

/**
 * `FluxContainer` should be preferred over this mixin, but it requires using
 * react with classes. So this mixin is provided where it is not yet possible
 * to convert a container to be a class.
 *
 * This mixin should be used for React components that have state based purely
 * on stores. `this.props` will not be available inside of `calculateState()`.
 *
 * This mixin will only `setState` not replace it, so you should always return
 * every key in your state unless you know what you are doing. Consider this:
 *
 *   var Foo = React.createClass({
 *     mixins: [
 *       FluxMixinLegacy([FooStore])
 *     ],
 *
 *     statics: {
 *       calculateState(prevState) {
 *         if (!prevState) {
 *           return {
 *             foo: FooStore.getFoo(),
 *           };
 *         }
 *
 *         return {
 *           bar: FooStore.getBar(),
 *         };
 *       }
 *     },
 *   });
 *
 * On the second calculateState when prevState is not null, the state will be
 * updated to contain the previous foo AND the bar that was just returned. Only
 * returning bar will not delete foo.
 *
 */
function FluxMixinLegacy(stores) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? { withProps: false } : arguments[1];

  stores = stores.filter(function (store) {
    return !!store;
  });

  return {
    getInitialState: function getInitialState() {
      enforceInterface(this);
      return options.withProps ? this.constructor.calculateState(null, this.props) : this.constructor.calculateState(null, undefined);
    },

    componentWillMount: function componentWillMount() {
      var _this = this;

      // This tracks when any store has changed and we may need to update.
      var changed = false;
      var setChanged = function setChanged() {
        changed = true;
      };

      // This adds subscriptions to stores. When a store changes all we do is
      // set changed to true.
      this._fluxMixinSubscriptions = stores.map(function (store) {
        return store.addListener(setChanged);
      });

      // This callback is called after the dispatch of the relevant stores. If
      // any have reported a change we update the state, then reset changed.
      var callback = function callback() {
        if (changed) {
          _this.setState(function (prevState) {
            return options.withProps ? _this.constructor.calculateState(prevState, _this.props) : _this.constructor.calculateState(prevState, undefined);
          });
        }
        changed = false;
      };
      this._fluxMixinStoreGroup = new FluxStoreGroup(stores, callback);
    },

    componentWillUnmount: function componentWillUnmount() {
      this._fluxMixinStoreGroup.release();
      for (var _iterator = this._fluxMixinSubscriptions, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var subscription = _ref;

        subscription.remove();
      }
      this._fluxMixinSubscriptions = [];
    }
  };
}

function enforceInterface(o) {
  !o.constructor.calculateState ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Components that use FluxMixinLegacy must implement ' + '`calculateState()` on the statics object') : invariant(false) : undefined;
}

module.exports = FluxMixinLegacy;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule FluxReduceStore
 * 
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function, not ' + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var FluxStore = __webpack_require__(39);

var abstractMethod = __webpack_require__(72);
var invariant = __webpack_require__(2);

/**
 * This is the basic building block of a Flux application. All of your stores
 * should extend this class.
 *
 *   class CounterStore extends FluxReduceStore<number> {
 *     getInitialState(): number {
 *       return 1;
 *     }
 *
 *     reduce(state: number, action: Object): number {
 *       switch(action.type) {
 *         case: 'add':
 *           return state + action.value;
 *         case: 'double':
 *           return state * 2;
 *         default:
 *           return state;
 *       }
 *     }
 *   }
 */

var FluxReduceStore = function (_FluxStore) {
  _inherits(FluxReduceStore, _FluxStore);

  function FluxReduceStore(dispatcher) {
    _classCallCheck(this, FluxReduceStore);

    _FluxStore.call(this, dispatcher);
    this._state = this.getInitialState();
  }

  /**
   * Getter that exposes the entire state of this store. If your state is not
   * immutable you should override this and not expose _state directly.
   */

  FluxReduceStore.prototype.getState = function getState() {
    return this._state;
  };

  /**
   * Constructs the initial state for this store. This is called once during
   * construction of the store.
   */

  FluxReduceStore.prototype.getInitialState = function getInitialState() {
    return abstractMethod('FluxReduceStore', 'getInitialState');
  };

  /**
   * Used to reduce a stream of actions coming from the dispatcher into a
   * single state object.
   */

  FluxReduceStore.prototype.reduce = function reduce(state, action) {
    return abstractMethod('FluxReduceStore', 'reduce');
  };

  /**
   * Checks if two versions of state are the same. You do not need to override
   * this if your state is immutable.
   */

  FluxReduceStore.prototype.areEqual = function areEqual(one, two) {
    return one === two;
  };

  FluxReduceStore.prototype.__invokeOnDispatch = function __invokeOnDispatch(action) {
    this.__changed = false;

    // Reduce the stream of incoming actions to state, update when necessary.
    var startingState = this._state;
    var endingState = this.reduce(startingState, action);

    // This means your ending state should never be undefined.
    !(endingState !== undefined) ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s returned undefined from reduce(...), did you forget to return ' + 'state in the default case? (use null if this was intentional)', this.constructor.name) : invariant(false) : undefined;

    if (!this.areEqual(startingState, endingState)) {
      this._state = endingState;

      // `__emitChange()` sets `this.__changed` to true and then the actual
      // change will be fired from the emitter at the end of the dispatch, this
      // is required in order to support methods like `hasChanged()`
      this.__emitChange();
    }

    if (this.__changed) {
      this.__emitter.emit(this.__changeEvent);
    }
  };

  return FluxReduceStore;
}(FluxStore);

module.exports = FluxReduceStore;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var fbemitter = {
  EventEmitter: __webpack_require__(69),
  EmitterSubscription: __webpack_require__(40)
};

module.exports = fbemitter;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule BaseEventEmitter
 * @typechecks
 */



function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

var EmitterSubscription = __webpack_require__(40);
var EventSubscriptionVendor = __webpack_require__(71);

var emptyFunction = __webpack_require__(6);
var invariant = __webpack_require__(2);

/**
 * @class BaseEventEmitter
 * @description
 * An EventEmitter is responsible for managing a set of listeners and publishing
 * events to them when it is told that such events happened. In addition to the
 * data for the given event it also sends a event control object which allows
 * the listeners/handlers to prevent the default behavior of the given event.
 *
 * The emitter is designed to be generic enough to support all the different
 * contexts in which one might want to emit events. It is a simple multicast
 * mechanism on top of which extra functionality can be composed. For example, a
 * more advanced emitter may use an EventHolder and EventFactory.
 */

var BaseEventEmitter = function () {
  /**
   * @constructor
   */

  function BaseEventEmitter() {
    _classCallCheck(this, BaseEventEmitter);

    this._subscriber = new EventSubscriptionVendor();
    this._currentSubscription = null;
  }

  /**
   * Adds a listener to be invoked when events of the specified type are
   * emitted. An optional calling context may be provided. The data arguments
   * emitted will be passed to the listener function.
   *
   * TODO: Annotate the listener arg's type. This is tricky because listeners
   *       can be invoked with varargs.
   *
   * @param {string} eventType - Name of the event to listen to
   * @param {function} listener - Function to invoke when the specified event is
   *   emitted
   * @param {*} context - Optional context object to use when invoking the
   *   listener
   */

  BaseEventEmitter.prototype.addListener = function addListener(eventType, listener, context) {
    return this._subscriber.addSubscription(eventType, new EmitterSubscription(this._subscriber, listener, context));
  };

  /**
   * Similar to addListener, except that the listener is removed after it is
   * invoked once.
   *
   * @param {string} eventType - Name of the event to listen to
   * @param {function} listener - Function to invoke only once when the
   *   specified event is emitted
   * @param {*} context - Optional context object to use when invoking the
   *   listener
   */

  BaseEventEmitter.prototype.once = function once(eventType, listener, context) {
    var emitter = this;
    return this.addListener(eventType, function () {
      emitter.removeCurrentListener();
      listener.apply(context, arguments);
    });
  };

  /**
   * Removes all of the registered listeners, including those registered as
   * listener maps.
   *
   * @param {?string} eventType - Optional name of the event whose registered
   *   listeners to remove
   */

  BaseEventEmitter.prototype.removeAllListeners = function removeAllListeners(eventType) {
    this._subscriber.removeAllSubscriptions(eventType);
  };

  /**
   * Provides an API that can be called during an eventing cycle to remove the
   * last listener that was invoked. This allows a developer to provide an event
   * object that can remove the listener (or listener map) during the
   * invocation.
   *
   * If it is called when not inside of an emitting cycle it will throw.
   *
   * @throws {Error} When called not during an eventing cycle
   *
   * @example
   *   var subscription = emitter.addListenerMap({
   *     someEvent: function(data, event) {
   *       console.log(data);
   *       emitter.removeCurrentListener();
   *     }
   *   });
   *
   *   emitter.emit('someEvent', 'abc'); // logs 'abc'
   *   emitter.emit('someEvent', 'def'); // does not log anything
   */

  BaseEventEmitter.prototype.removeCurrentListener = function removeCurrentListener() {
    !!!this._currentSubscription ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Not in an emitting cycle; there is no current subscription') : invariant(false) : undefined;
    this._subscriber.removeSubscription(this._currentSubscription);
  };

  /**
   * Returns an array of listeners that are currently registered for the given
   * event.
   *
   * @param {string} eventType - Name of the event to query
   * @return {array}
   */

  BaseEventEmitter.prototype.listeners = function listeners(eventType) /* TODO: Array<EventSubscription> */{
    var subscriptions = this._subscriber.getSubscriptionsForType(eventType);
    return subscriptions ? subscriptions.filter(emptyFunction.thatReturnsTrue).map(function (subscription) {
      return subscription.listener;
    }) : [];
  };

  /**
   * Emits an event of the given type with the given data. All handlers of that
   * particular type will be notified.
   *
   * @param {string} eventType - Name of the event to emit
   * @param {*} Arbitrary arguments to be passed to each registered listener
   *
   * @example
   *   emitter.addListener('someEvent', function(message) {
   *     console.log(message);
   *   });
   *
   *   emitter.emit('someEvent', 'abc'); // logs 'abc'
   */

  BaseEventEmitter.prototype.emit = function emit(eventType) {
    var subscriptions = this._subscriber.getSubscriptionsForType(eventType);
    if (subscriptions) {
      var keys = Object.keys(subscriptions);
      for (var ii = 0; ii < keys.length; ii++) {
        var key = keys[ii];
        var subscription = subscriptions[key];
        // The subscription may have been removed during this event loop.
        if (subscription) {
          this._currentSubscription = subscription;
          this.__emitToSubscription.apply(this, [subscription].concat(Array.prototype.slice.call(arguments)));
        }
      }
      this._currentSubscription = null;
    }
  };

  /**
   * Provides a hook to override how the emitter emits an event to a specific
   * subscription. This allows you to set up logging and error boundaries
   * specific to your environment.
   *
   * @param {EmitterSubscription} subscription
   * @param {string} eventType
   * @param {*} Arbitrary arguments to be passed to each registered listener
   */

  BaseEventEmitter.prototype.__emitToSubscription = function __emitToSubscription(subscription, eventType) {
    var args = Array.prototype.slice.call(arguments, 2);
    subscription.listener.apply(subscription.context, args);
  };

  return BaseEventEmitter;
}();

module.exports = BaseEventEmitter;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule EventSubscription
 * @typechecks
 */



/**
 * EventSubscription represents a subscription to a particular event. It can
 * remove its own subscription.
 */

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

var EventSubscription = function () {

  /**
   * @param {EventSubscriptionVendor} subscriber the subscriber that controls
   *   this subscription.
   */

  function EventSubscription(subscriber) {
    _classCallCheck(this, EventSubscription);

    this.subscriber = subscriber;
  }

  /**
   * Removes this subscription from the subscriber that controls it.
   */

  EventSubscription.prototype.remove = function remove() {
    if (this.subscriber) {
      this.subscriber.removeSubscription(this);
      this.subscriber = null;
    }
  };

  return EventSubscription;
}();

module.exports = EventSubscription;

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 * 
 * @providesModule EventSubscriptionVendor
 * @typechecks
 */



function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

var invariant = __webpack_require__(2);

/**
 * EventSubscriptionVendor stores a set of EventSubscriptions that are
 * subscribed to a particular event type.
 */

var EventSubscriptionVendor = function () {
  function EventSubscriptionVendor() {
    _classCallCheck(this, EventSubscriptionVendor);

    this._subscriptionsForType = {};
    this._currentSubscription = null;
  }

  /**
   * Adds a subscription keyed by an event type.
   *
   * @param {string} eventType
   * @param {EventSubscription} subscription
   */

  EventSubscriptionVendor.prototype.addSubscription = function addSubscription(eventType, subscription) {
    !(subscription.subscriber === this) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'The subscriber of the subscription is incorrectly set.') : invariant(false) : undefined;
    if (!this._subscriptionsForType[eventType]) {
      this._subscriptionsForType[eventType] = [];
    }
    var key = this._subscriptionsForType[eventType].length;
    this._subscriptionsForType[eventType].push(subscription);
    subscription.eventType = eventType;
    subscription.key = key;
    return subscription;
  };

  /**
   * Removes a bulk set of the subscriptions.
   *
   * @param {?string} eventType - Optional name of the event type whose
   *   registered supscriptions to remove, if null remove all subscriptions.
   */

  EventSubscriptionVendor.prototype.removeAllSubscriptions = function removeAllSubscriptions(eventType) {
    if (eventType === undefined) {
      this._subscriptionsForType = {};
    } else {
      delete this._subscriptionsForType[eventType];
    }
  };

  /**
   * Removes a specific subscription. Instead of calling this function, call
   * `subscription.remove()` directly.
   *
   * @param {object} subscription
   */

  EventSubscriptionVendor.prototype.removeSubscription = function removeSubscription(subscription) {
    var eventType = subscription.eventType;
    var key = subscription.key;

    var subscriptionsForType = this._subscriptionsForType[eventType];
    if (subscriptionsForType) {
      delete subscriptionsForType[key];
    }
  };

  /**
   * Returns the array of subscriptions that are currently registered for the
   * given event type.
   *
   * Note: This array can be potentially sparse as subscriptions are deleted
   * from it when they are removed.
   *
   * TODO: This returns a nullable array. wat?
   *
   * @param {string} eventType
   * @return {?array}
   */

  EventSubscriptionVendor.prototype.getSubscriptionsForType = function getSubscriptionsForType(eventType) {
    return this._subscriptionsForType[eventType];
  };

  return EventSubscriptionVendor;
}();

module.exports = EventSubscriptionVendor;

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule abstractMethod
 * 
 */



var invariant = __webpack_require__(2);

function abstractMethod(className, methodName) {
   true ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Subclasses of %s must override %s() with their own implementation.', className, methodName) : invariant(false) : undefined;
}

module.exports = abstractMethod;

/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_flux_utils__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_flux_utils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_flux_utils__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dispatcher__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_webutils__ = __webpack_require__(1);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var pspid = 'appStore';

var AppStore = function (_ReduceStore) {
  _inherits(AppStore, _ReduceStore);

  function AppStore() {
    _classCallCheck(this, AppStore);

    return _possibleConstructorReturn(this, (AppStore.__proto__ || Object.getPrototypeOf(AppStore)).apply(this, arguments));
  }

  _createClass(AppStore, [{
    key: 'getInitialState',
    value: function getInitialState() {
      return {
        selected: 0,
        title: '',
        config: {
          selected: '',
          title: '',
          appid: '',
          findingApi: '',
          shoppingApi: ''
        }
      };
    }
  }, {
    key: 'reduce',
    value: function reduce(state, action) {
      __WEBPACK_IMPORTED_MODULE_2__utils_webutils__["a" /* log */].info(pspid + '> Request: ' + action.type);
      switch (action.type) {
        case 'content/select':
          return Object.assign({}, state, { selected: action.selected, title: action.title });
        case 'config/fetch/appid':
          return Object.assign({}, state, { config: action.config });
        case 'config/write/appid':
          return Object.assign({}, state, { config: action.config });
        default:
          return state;
      }
    }
  }]);

  return AppStore;
}(__WEBPACK_IMPORTED_MODULE_0_flux_utils__["ReduceStore"]);

/* harmony default export */ __webpack_exports__["a"] = (new AppStore(__WEBPACK_IMPORTED_MODULE_1__dispatcher__["a" /* default */]));

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

module.exports.Dispatcher = __webpack_require__(75);

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Dispatcher
 * 
 * @preventMunge
 */



exports.__esModule = true;

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

var invariant = __webpack_require__(2);

var _prefix = 'ID_';

/**
 * Dispatcher is used to broadcast payloads to registered callbacks. This is
 * different from generic pub-sub systems in two ways:
 *
 *   1) Callbacks are not subscribed to particular events. Every payload is
 *      dispatched to every registered callback.
 *   2) Callbacks can be deferred in whole or part until other callbacks have
 *      been executed.
 *
 * For example, consider this hypothetical flight destination form, which
 * selects a default city when a country is selected:
 *
 *   var flightDispatcher = new Dispatcher();
 *
 *   // Keeps track of which country is selected
 *   var CountryStore = {country: null};
 *
 *   // Keeps track of which city is selected
 *   var CityStore = {city: null};
 *
 *   // Keeps track of the base flight price of the selected city
 *   var FlightPriceStore = {price: null}
 *
 * When a user changes the selected city, we dispatch the payload:
 *
 *   flightDispatcher.dispatch({
 *     actionType: 'city-update',
 *     selectedCity: 'paris'
 *   });
 *
 * This payload is digested by `CityStore`:
 *
 *   flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'city-update') {
 *       CityStore.city = payload.selectedCity;
 *     }
 *   });
 *
 * When the user selects a country, we dispatch the payload:
 *
 *   flightDispatcher.dispatch({
 *     actionType: 'country-update',
 *     selectedCountry: 'australia'
 *   });
 *
 * This payload is digested by both stores:
 *
 *   CountryStore.dispatchToken = flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'country-update') {
 *       CountryStore.country = payload.selectedCountry;
 *     }
 *   });
 *
 * When the callback to update `CountryStore` is registered, we save a reference
 * to the returned token. Using this token with `waitFor()`, we can guarantee
 * that `CountryStore` is updated before the callback that updates `CityStore`
 * needs to query its data.
 *
 *   CityStore.dispatchToken = flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'country-update') {
 *       // `CountryStore.country` may not be updated.
 *       flightDispatcher.waitFor([CountryStore.dispatchToken]);
 *       // `CountryStore.country` is now guaranteed to be updated.
 *
 *       // Select the default city for the new country
 *       CityStore.city = getDefaultCityForCountry(CountryStore.country);
 *     }
 *   });
 *
 * The usage of `waitFor()` can be chained, for example:
 *
 *   FlightPriceStore.dispatchToken =
 *     flightDispatcher.register(function(payload) {
 *       switch (payload.actionType) {
 *         case 'country-update':
 *         case 'city-update':
 *           flightDispatcher.waitFor([CityStore.dispatchToken]);
 *           FlightPriceStore.price =
 *             getFlightPriceStore(CountryStore.country, CityStore.city);
 *           break;
 *     }
 *   });
 *
 * The `country-update` payload will be guaranteed to invoke the stores'
 * registered callbacks in order: `CountryStore`, `CityStore`, then
 * `FlightPriceStore`.
 */

var Dispatcher = function () {
  function Dispatcher() {
    _classCallCheck(this, Dispatcher);

    this._callbacks = {};
    this._isDispatching = false;
    this._isHandled = {};
    this._isPending = {};
    this._lastID = 1;
  }

  /**
   * Registers a callback to be invoked with every dispatched payload. Returns
   * a token that can be used with `waitFor()`.
   */

  Dispatcher.prototype.register = function register(callback) {
    var id = _prefix + this._lastID++;
    this._callbacks[id] = callback;
    return id;
  };

  /**
   * Removes a callback based on its token.
   */

  Dispatcher.prototype.unregister = function unregister(id) {
    !this._callbacks[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.unregister(...): `%s` does not map to a registered callback.', id) : invariant(false) : undefined;
    delete this._callbacks[id];
  };

  /**
   * Waits for the callbacks specified to be invoked before continuing execution
   * of the current callback. This method should only be used by a callback in
   * response to a dispatched payload.
   */

  Dispatcher.prototype.waitFor = function waitFor(ids) {
    !this._isDispatching ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): Must be invoked while dispatching.') : invariant(false) : undefined;
    for (var ii = 0; ii < ids.length; ii++) {
      var id = ids[ii];
      if (this._isPending[id]) {
        !this._isHandled[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): Circular dependency detected while ' + 'waiting for `%s`.', id) : invariant(false) : undefined;
        continue;
      }
      !this._callbacks[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): `%s` does not map to a registered callback.', id) : invariant(false) : undefined;
      this._invokeCallback(id);
    }
  };

  /**
   * Dispatches a payload to all registered callbacks.
   */

  Dispatcher.prototype.dispatch = function dispatch(payload) {
    !!this._isDispatching ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.') : invariant(false) : undefined;
    this._startDispatching(payload);
    try {
      for (var id in this._callbacks) {
        if (this._isPending[id]) {
          continue;
        }
        this._invokeCallback(id);
      }
    } finally {
      this._stopDispatching();
    }
  };

  /**
   * Is this Dispatcher currently dispatching.
   */

  Dispatcher.prototype.isDispatching = function isDispatching() {
    return this._isDispatching;
  };

  /**
   * Call the callback stored with the given id. Also do some internal
   * bookkeeping.
   *
   * @internal
   */

  Dispatcher.prototype._invokeCallback = function _invokeCallback(id) {
    this._isPending[id] = true;
    this._callbacks[id](this._pendingPayload);
    this._isHandled[id] = true;
  };

  /**
   * Set up bookkeeping needed when dispatching.
   *
   * @internal
   */

  Dispatcher.prototype._startDispatching = function _startDispatching(payload) {
    for (var id in this._callbacks) {
      this._isPending[id] = false;
      this._isHandled[id] = false;
    }
    this._pendingPayload = payload;
    this._isDispatching = true;
  };

  /**
   * Clear bookkeeping used for dispatching.
   *
   * @internal
   */

  Dispatcher.prototype._stopDispatching = function _stopDispatching() {
    delete this._pendingPayload;
    this._isDispatching = false;
  };

  return Dispatcher;
}();

module.exports = Dispatcher;

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Copyright (c) 2011-2014 Felix Gnass
 * Licensed under the MIT license
 * http://spin.js.org/
 *
 * Example:
    var opts = {
      lines: 12             // The number of lines to draw
    , length: 7             // The length of each line
    , width: 5              // The line thickness
    , radius: 10            // The radius of the inner circle
    , scale: 1.0            // Scales overall size of the spinner
    , corners: 1            // Roundness (0..1)
    , color: '#000'         // #rgb or #rrggbb
    , opacity: 1/4          // Opacity of the lines
    , rotate: 0             // Rotation offset
    , direction: 1          // 1: clockwise, -1: counterclockwise
    , speed: 1              // Rounds per second
    , trail: 100            // Afterglow percentage
    , fps: 20               // Frames per second when using setTimeout()
    , zIndex: 2e9           // Use a high z-index by default
    , className: 'spinner'  // CSS class to assign to the element
    , top: '50%'            // center vertically
    , left: '50%'           // center horizontally
    , shadow: false         // Whether to render a shadow
    , hwaccel: false        // Whether to use hardware acceleration (might be buggy)
    , position: 'absolute'  // Element positioning
    }
    var target = document.getElementById('foo')
    var spinner = new Spinner(opts).spin(target)
 */
;(function (root, factory) {

  /* CommonJS */
  if (( false ? 'undefined' : _typeof(module)) == 'object' && module.exports) module.exports = factory();

  /* AMD module */
  else if (true) !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

    /* Browser global */
    else root.Spinner = factory();
})(this, function () {
  "use strict";

  var prefixes = ['webkit', 'Moz', 'ms', 'O'] /* Vendor prefixes */
  ,
      animations = {} /* Animation rules keyed by their name */
  ,
      useCssAnimations /* Whether to use CSS animations or setTimeout */
  ,
      sheet; /* A stylesheet to hold the @keyframe or VML rules. */

  /**
   * Utility function to create elements. If no tag name is given,
   * a DIV is created. Optionally properties can be passed.
   */
  function createEl(tag, prop) {
    var el = document.createElement(tag || 'div'),
        n;

    for (n in prop) {
      el[n] = prop[n];
    }return el;
  }

  /**
   * Appends children and returns the parent.
   */
  function ins(parent /* child1, child2, ...*/) {
    for (var i = 1, n = arguments.length; i < n; i++) {
      parent.appendChild(arguments[i]);
    }

    return parent;
  }

  /**
   * Creates an opacity keyframe animation rule and returns its name.
   * Since most mobile Webkits have timing issues with animation-delay,
   * we create separate rules for each line/segment.
   */
  function addAnimation(alpha, trail, i, lines) {
    var name = ['opacity', trail, ~~(alpha * 100), i, lines].join('-'),
        start = 0.01 + i / lines * 100,
        z = Math.max(1 - (1 - alpha) / trail * (100 - start), alpha),
        prefix = useCssAnimations.substring(0, useCssAnimations.indexOf('Animation')).toLowerCase(),
        pre = prefix && '-' + prefix + '-' || '';

    if (!animations[name]) {
      sheet.insertRule('@' + pre + 'keyframes ' + name + '{' + '0%{opacity:' + z + '}' + start + '%{opacity:' + alpha + '}' + (start + 0.01) + '%{opacity:1}' + (start + trail) % 100 + '%{opacity:' + alpha + '}' + '100%{opacity:' + z + '}' + '}', sheet.cssRules.length);

      animations[name] = 1;
    }

    return name;
  }

  /**
   * Tries various vendor prefixes and returns the first supported property.
   */
  function vendor(el, prop) {
    var s = el.style,
        pp,
        i;

    prop = prop.charAt(0).toUpperCase() + prop.slice(1);
    if (s[prop] !== undefined) return prop;
    for (i = 0; i < prefixes.length; i++) {
      pp = prefixes[i] + prop;
      if (s[pp] !== undefined) return pp;
    }
  }

  /**
   * Sets multiple style properties at once.
   */
  function css(el, prop) {
    for (var n in prop) {
      el.style[vendor(el, n) || n] = prop[n];
    }

    return el;
  }

  /**
   * Fills in default values.
   */
  function merge(obj) {
    for (var i = 1; i < arguments.length; i++) {
      var def = arguments[i];
      for (var n in def) {
        if (obj[n] === undefined) obj[n] = def[n];
      }
    }
    return obj;
  }

  /**
   * Returns the line color from the given string or array.
   */
  function getColor(color, idx) {
    return typeof color == 'string' ? color : color[idx % color.length];
  }

  // Built-in defaults

  var defaults = {
    lines: 12 // The number of lines to draw
    , length: 7 // The length of each line
    , width: 5 // The line thickness
    , radius: 10 // The radius of the inner circle
    , scale: 1.0 // Scales overall size of the spinner
    , corners: 1 // Roundness (0..1)
    , color: '#000' // #rgb or #rrggbb
    , opacity: 1 / 4 // Opacity of the lines
    , rotate: 0 // Rotation offset
    , direction: 1 // 1: clockwise, -1: counterclockwise
    , speed: 1 // Rounds per second
    , trail: 100 // Afterglow percentage
    , fps: 20 // Frames per second when using setTimeout()
    , zIndex: 2e9 // Use a high z-index by default
    , className: 'spinner' // CSS class to assign to the element
    , top: '50%' // center vertically
    , left: '50%' // center horizontally
    , shadow: false // Whether to render a shadow
    , hwaccel: false // Whether to use hardware acceleration (might be buggy)
    , position: 'absolute' // Element positioning


    /** The constructor */
  };function Spinner(o) {
    this.opts = merge(o || {}, Spinner.defaults, defaults);
  }

  // Global defaults that override the built-ins:
  Spinner.defaults = {};

  merge(Spinner.prototype, {
    /**
     * Adds the spinner to the given target element. If this instance is already
     * spinning, it is automatically removed from its previous target b calling
     * stop() internally.
     */
    spin: function spin(target) {
      this.stop();

      var self = this,
          o = self.opts,
          el = self.el = createEl(null, { className: o.className });

      css(el, {
        position: o.position,
        width: 0,
        zIndex: o.zIndex,
        left: o.left,
        top: o.top
      });

      if (target) {
        target.insertBefore(el, target.firstChild || null);
      }

      el.setAttribute('role', 'progressbar');
      self.lines(el, self.opts);

      if (!useCssAnimations) {
        // No CSS animation support, use setTimeout() instead
        var i = 0,
            start = (o.lines - 1) * (1 - o.direction) / 2,
            alpha,
            fps = o.fps,
            f = fps / o.speed,
            ostep = (1 - o.opacity) / (f * o.trail / 100),
            astep = f / o.lines;(function anim() {
          i++;
          for (var j = 0; j < o.lines; j++) {
            alpha = Math.max(1 - (i + (o.lines - j) * astep) % f * ostep, o.opacity);

            self.opacity(el, j * o.direction + start, alpha, o);
          }
          self.timeout = self.el && setTimeout(anim, ~~(1000 / fps));
        })();
      }
      return self;
    }

    /**
     * Stops and removes the Spinner.
     */
    , stop: function stop() {
      var el = this.el;
      if (el) {
        clearTimeout(this.timeout);
        if (el.parentNode) el.parentNode.removeChild(el);
        this.el = undefined;
      }
      return this;
    }

    /**
     * Internal method that draws the individual lines. Will be overwritten
     * in VML fallback mode below.
     */
    , lines: function lines(el, o) {
      var i = 0,
          start = (o.lines - 1) * (1 - o.direction) / 2,
          seg;

      function fill(color, shadow) {
        return css(createEl(), {
          position: 'absolute',
          width: o.scale * (o.length + o.width) + 'px',
          height: o.scale * o.width + 'px',
          background: color,
          boxShadow: shadow,
          transformOrigin: 'left',
          transform: 'rotate(' + ~~(360 / o.lines * i + o.rotate) + 'deg) translate(' + o.scale * o.radius + 'px' + ',0)',
          borderRadius: (o.corners * o.scale * o.width >> 1) + 'px'
        });
      }

      for (; i < o.lines; i++) {
        seg = css(createEl(), {
          position: 'absolute',
          top: 1 + ~(o.scale * o.width / 2) + 'px',
          transform: o.hwaccel ? 'translate3d(0,0,0)' : '',
          opacity: o.opacity,
          animation: useCssAnimations && addAnimation(o.opacity, o.trail, start + i * o.direction, o.lines) + ' ' + 1 / o.speed + 's linear infinite'
        });

        if (o.shadow) ins(seg, css(fill('#000', '0 0 4px #000'), { top: '2px' }));
        ins(el, ins(seg, fill(getColor(o.color, i), '0 0 1px rgba(0,0,0,.1)')));
      }
      return el;
    }

    /**
     * Internal method that adjusts the opacity of a single line.
     * Will be overwritten in VML fallback mode below.
     */
    , opacity: function opacity(el, i, val) {
      if (i < el.childNodes.length) el.childNodes[i].style.opacity = val;
    }

  });

  function initVML() {

    /* Utility function to create a VML tag */
    function vml(tag, attr) {
      return createEl('<' + tag + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', attr);
    }

    // No CSS transforms but VML support, add a CSS rule for VML elements:
    sheet.addRule('.spin-vml', 'behavior:url(#default#VML)');

    Spinner.prototype.lines = function (el, o) {
      var r = o.scale * (o.length + o.width),
          s = o.scale * 2 * r;

      function grp() {
        return css(vml('group', {
          coordsize: s + ' ' + s,
          coordorigin: -r + ' ' + -r
        }), { width: s, height: s });
      }

      var margin = -(o.width + o.length) * o.scale * 2 + 'px',
          g = css(grp(), { position: 'absolute', top: margin, left: margin }),
          i;

      function seg(i, dx, filter) {
        ins(g, ins(css(grp(), { rotation: 360 / o.lines * i + 'deg', left: ~~dx }), ins(css(vml('roundrect', { arcsize: o.corners }), { width: r,
          height: o.scale * o.width,
          left: o.scale * o.radius,
          top: -o.scale * o.width >> 1,
          filter: filter
        }), vml('fill', { color: getColor(o.color, i), opacity: o.opacity }), vml('stroke', { opacity: 0 }) // transparent stroke to fix color bleeding upon opacity change
        )));
      }

      if (o.shadow) for (i = 1; i <= o.lines; i++) {
        seg(i, -2, 'progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)');
      }

      for (i = 1; i <= o.lines; i++) {
        seg(i);
      }return ins(el, g);
    };

    Spinner.prototype.opacity = function (el, i, val, o) {
      var c = el.firstChild;
      o = o.shadow && o.lines || 0;
      if (c && i + o < c.childNodes.length) {
        c = c.childNodes[i + o];c = c && c.firstChild;c = c && c.firstChild;
        if (c) c.opacity = val;
      }
    };
  }

  if (typeof document !== 'undefined') {
    sheet = function () {
      var el = createEl('style', { type: 'text/css' });
      ins(document.getElementsByTagName('head')[0], el);
      return el.sheet || el.styleSheet;
    }();

    var probe = css(createEl('group'), { behavior: 'url(#default#VML)' });

    if (!vendor(probe, 'transform') && probe.adj) initVML();else useCssAnimations = vendor(probe, 'animation');
  }

  return Spinner;
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(77)(module)))

/***/ }),
/* 77 */
/***/ (function(module, exports) {

module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function get() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function get() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_AppSidebar_AppSidebar__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_AppForm_AppForm__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_webutils__ = __webpack_require__(1);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var pspid = 'AppBodyView';

var AppBody = function (_React$Component) {
  _inherits(AppBody, _React$Component);

  function AppBody() {
    _classCallCheck(this, AppBody);

    return _possibleConstructorReturn(this, (AppBody.__proto__ || Object.getPrototypeOf(AppBody)).apply(this, arguments));
  }

  _createClass(AppBody, [{
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'pane-group' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__components_AppSidebar_AppSidebar__["a" /* default */], null),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__components_AppForm_AppForm__["a" /* default */], { config: this.props.config })
      );
    }
  }]);

  return AppBody;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (AppBody);
;

/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actions_AppAction__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_webutils__ = __webpack_require__(1);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var pspid = 'AppSidebarView';

var AppSidebar = function (_React$Component) {
  _inherits(AppSidebar, _React$Component);

  function AppSidebar(props) {
    _classCallCheck(this, AppSidebar);

    var _this = _possibleConstructorReturn(this, (AppSidebar.__proto__ || Object.getPrototypeOf(AppSidebar)).call(this, props));

    _this.state = Object.assign({}, props.config);
    return _this;
  }

  _createClass(AppSidebar, [{
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'pane pane-sm sidebar' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'nav',
          { className: 'nav-group' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h5',
            { className: 'nav-group-title' },
            'My account'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'nav-group-item' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span', { className: 'icon icon-key' }),
            'Application Keys'
          )
        )
      );
    }
  }]);

  return AppSidebar;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (AppSidebar);
;

/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actions_AppAction__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_webutils__ = __webpack_require__(1);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var pspid = 'AppFormView';

var AppForm = function (_React$Component) {
  _inherits(AppForm, _React$Component);

  function AppForm(props) {
    _classCallCheck(this, AppForm);

    var _this = _possibleConstructorReturn(this, (AppForm.__proto__ || Object.getPrototypeOf(AppForm)).call(this, props));

    _this.state = Object.assign({}, props.config);
    return _this;
  }

  _createClass(AppForm, [{
    key: 'handleChangeSave',
    value: function handleChangeSave(e) {
      __WEBPACK_IMPORTED_MODULE_2__utils_webutils__["a" /* log */].info(pspid + '>', 'Request: handleChangeSave');
      __WEBPACK_IMPORTED_MODULE_2__utils_webutils__["a" /* log */].trace(pspid + '>', this.props.config);
      e.preventDefault();
      __WEBPACK_IMPORTED_MODULE_1__actions_AppAction__["a" /* default */].writeConfig(this.state);
    }
  }, {
    key: 'handleChangeText',
    value: function handleChangeText(name, e) {
      var newState = {};
      newState[name] = e.target.value;
      this.setState(newState);
    }
  }, {
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'pane' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'form',
          { className: 'padded-less' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'form-group' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              null,
              'Application Key ID'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'text',
              className: 'form-control',
              placeholder: 'Key ID',
              value: this.state.appid,
              onChange: this.handleChangeText.bind(this, 'appid') })
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'form-group' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              null,
              'Finding API URL'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'text',
              className: 'form-control',
              placeholder: 'URL',
              value: this.state.findingApi,
              onChange: this.handleChangeText.bind(this, 'findingApi') })
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'form-group' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              null,
              'Shopping API URL'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'text',
              className: 'form-control',
              placeholder: 'URL',
              value: this.state.shoppingApi,
              onChange: this.handleChangeText.bind(this, 'shoppingApi') })
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'form-actions' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'button',
              { type: 'submit', className: 'btn btn-large btn-form btn-primary',
                onClick: this.handleChangeSave.bind(this) },
              'Save'
            )
          )
        )
      );
    }
  }]);

  return AppForm;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (AppForm);

/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_flux_utils__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_flux_utils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_flux_utils__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__FluxContainerConverter__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__FluxContainerConverter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__FluxContainerConverter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__stores_noteStore__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_NoteBody_NoteBody__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_webutils__ = __webpack_require__(1);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








var pspid = 'NoteControlerView';

var Note = function (_React$Component) {
  _inherits(Note, _React$Component);

  function Note() {
    _classCallCheck(this, Note);

    return _possibleConstructorReturn(this, (Note.__proto__ || Object.getPrototypeOf(Note)).apply(this, arguments));
  }

  _createClass(Note, [{
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__components_NoteBody_NoteBody__["a" /* default */], {
        page: this.state.page,
        items: this.state.items,
        options: this.state.options });
    }
  }], [{
    key: 'getStores',
    value: function getStores() {
      return [__WEBPACK_IMPORTED_MODULE_3__stores_noteStore__["a" /* default */]];
    }
  }, {
    key: 'calculateState',
    value: function calculateState() {
      return __WEBPACK_IMPORTED_MODULE_3__stores_noteStore__["a" /* default */].getState();
    }
  }]);

  return Note;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1_flux_utils__["Container"].create(__WEBPACK_IMPORTED_MODULE_2__FluxContainerConverter___default.a.convert(Note)));

/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_flux_utils__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_flux_utils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_flux_utils__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dispatcher__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_webutils__ = __webpack_require__(1);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var pspid = 'noteStore';

var NoteStore = function (_ReduceStore) {
  _inherits(NoteStore, _ReduceStore);

  function NoteStore() {
    _classCallCheck(this, NoteStore);

    return _possibleConstructorReturn(this, (NoteStore.__proto__ || Object.getPrototypeOf(NoteStore)).apply(this, arguments));
  }

  _createClass(NoteStore, [{
    key: 'getInitialState',
    value: function getInitialState() {
      return {
        page: 0,
        items: null,
        options: {
          searchString: '',
          pages: '',
          highestPrice: '',
          lowestPrice: '',
          shipping: [],
          condition: [],
          status: [],
          itemId: [],
          categoryPath: [],
          seller: [],
          startDate: '',
          endDate: ''
        }
      };
    }
  }, {
    key: 'reduce',
    value: function reduce(state, action) {
      __WEBPACK_IMPORTED_MODULE_2__utils_webutils__["a" /* log */].info(pspid + '> Request: ' + action.type);
      switch (action.type) {
        case 'item/fetch/note':
          return Object.assign({}, state, { items: action.items, options: action.options,
            page: action.page });
        default:
          return state;
      }
    }
  }]);

  return NoteStore;
}(__WEBPACK_IMPORTED_MODULE_0_flux_utils__["ReduceStore"]);

/* harmony default export */ __webpack_exports__["a"] = (new NoteStore(__WEBPACK_IMPORTED_MODULE_1__dispatcher__["a" /* default */]));

/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_NoteSidebar_NoteSidebar__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_NoteTable_NoteTable__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_webutils__ = __webpack_require__(1);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var pspid = 'NoteBodyView';

var NoteBody = function (_React$Component) {
  _inherits(NoteBody, _React$Component);

  function NoteBody() {
    _classCallCheck(this, NoteBody);

    return _possibleConstructorReturn(this, (NoteBody.__proto__ || Object.getPrototypeOf(NoteBody)).apply(this, arguments));
  }

  _createClass(NoteBody, [{
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'pane-group' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__components_NoteSidebar_NoteSidebar__["a" /* default */], {
          page: this.props.page,
          items: this.props.items,
          options: this.props.options }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__components_NoteTable_NoteTable__["a" /* default */], {
          items: this.props.items,
          options: this.props.options })
      );
    }
  }]);

  return NoteBody;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (NoteBody);
;

/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actions_NoteAction__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Radio_Radio__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_webutils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_stdutils__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_stdutils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__utils_stdutils__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_fs__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_fs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_electron__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_electron__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









var remote = __WEBPACK_IMPORTED_MODULE_6_electron___default.a.remote;
var dialog = __WEBPACK_IMPORTED_MODULE_6_electron___default.a.remote.dialog;

var pspid = 'NoteSidebarView';

var NoteSidebar = function (_React$Component) {
  _inherits(NoteSidebar, _React$Component);

  function NoteSidebar(props) {
    _classCallCheck(this, NoteSidebar);

    var _this = _possibleConstructorReturn(this, (NoteSidebar.__proto__ || Object.getPrototypeOf(NoteSidebar)).call(this, props));

    _this.state = Object.assign({}, props.options);
    return _this;
  }

  _createClass(NoteSidebar, [{
    key: 'handleClickSave',
    value: function handleClickSave() {
      var _this2 = this;

      var options = this.props.options;
      this.showSaveDialog(function (filename) {
        __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].info(pspid + '>', 'Save file:', filename);
        __WEBPACK_IMPORTED_MODULE_1__actions_NoteAction__["a" /* default */].writeItems(options).then(function (items) {
          return _this2.saveItems(filename, items);
        })
        //.then(console.log)
        .catch(_this2.showErrorBox);
      });
    }
  }, {
    key: 'saveItems',
    value: function saveItems(filename, items) {
      __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].trace('' + pspid, filename, items);
      return new Promise(function (resolve) {
        __WEBPACK_IMPORTED_MODULE_5_fs___default.a.writeFile(filename, items.join('\n'), function (err) {
          if (err) reject(err.message);
          resolve('The file has been saved!');
        });
      });
    }
  }, {
    key: 'showSaveDialog',
    value: function showSaveDialog(callback) {
      var win = remote.getCurrentWindow();
      var options = {
        title: 'Save',
        filters: [{ name: 'CSV File', extensions: ['csv'] }, { name: 'All Files', extensions: ['*'] }] };
      dialog.showSaveDialog(win, options, callback);
    }
  }, {
    key: 'showErrorBox',
    value: function showErrorBox(err) {
      dialog.showErrorBox("Error", err.message);
    }
  }, {
    key: 'handleChangeHome',
    value: function handleChangeHome() {
      __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].info(pspid + '>', 'Request: handleChangeHome');
      __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].trace(pspid + '>', this.props.options);
      __WEBPACK_IMPORTED_MODULE_1__actions_NoteAction__["a" /* default */].increment(this.props.options, 0);
    }
  }, {
    key: 'handleIncrement',
    value: function handleIncrement() {
      __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].info(pspid + '>', 'Request: handleIncrement');
      __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].trace(pspid + '>', this.props.options);
      __WEBPACK_IMPORTED_MODULE_1__actions_NoteAction__["a" /* default */].increment(this.props.options, this.props.page);
    }
  }, {
    key: 'handleDecrement',
    value: function handleDecrement() {
      __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].info(pspid + '> Request: handleDecrement');
      __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].trace(pspid + '>', this.props.options);
      __WEBPACK_IMPORTED_MODULE_1__actions_NoteAction__["a" /* default */].decrement(this.props.options, this.props.page);
    }
  }, {
    key: 'handleChangeSearch',
    value: function handleChangeSearch(e) {
      __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].info(pspid + '>', 'Request: handleChangeSearch');
      __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].trace(pspid + '>', this.state);
      e.preventDefault();
      __WEBPACK_IMPORTED_MODULE_1__actions_NoteAction__["a" /* default */].increment(this.state, 0);
    }
  }, {
    key: 'handleChangeReset',
    value: function handleChangeReset() {
      __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].info(pspid + '>', 'Request: handleChangeReset');
      __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].trace(pspid + '>', this.state);
      this.setState({
        highestPrice: '',
        lowestPrice: '',
        shipping: [],
        condition: [],
        status: [],
        itemId: [],
        categoryPath: [],
        seller: [],
        startDate: '',
        endDate: ''
      });
    }
  }, {
    key: 'handleChangeText',
    value: function handleChangeText(name, e) {
      var newState = {};
      newState[name] = e.target.value;
      this.setState(newState);
    }
  }, {
    key: 'handleChangeCheckbox',
    value: function handleChangeCheckbox(name, e) {
      var newState = {};
      newState[name] = e.target.checked;
      this.setState(newState);
    }
  }, {
    key: 'handleChangeRadio',
    value: function handleChangeRadio(name, e) {
      var newState = {};
      newState[name] = e.target.value;
      this.setState(newState);
    }
  }, {
    key: 'handleChangeSelect',
    value: function handleChangeSelect(name, e) {
      var newState = {};
      var options = e.target.options;
      var values = [];
      for (var i = 0; i < options.length; i++) {
        if (options[i].selected) values.push(options[i].value);
      }
      newState[name] = values;
      this.setState(newState);
    }
  }, {
    key: 'renderOption',
    value: function renderOption(objs, prop1, prop2) {
      if (!objs) return null;
      var len = arguments.length;
      var items = objs.map(function (obj) {
        return len === 2 ? obj[prop1][0] : obj[prop1][0][prop2][0];
      });
      var opts = __WEBPACK_IMPORTED_MODULE_4__utils_stdutils___default.a.dst(items);
      return opts.map(function (opt, idx) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'option',
          {
            key: "choice-" + idx, value: opt },
          opt
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var page = this.props.page;
      var optPaths = this.renderOption(this.props.items, 'primaryCategory', 'categoryName');
      var optSelrs = this.renderOption(this.props.items, 'sellerInfo', 'sellerUserName');
      var optImIDs = this.renderOption(this.props.items, 'itemId');
      var optShpgs = this.renderOption(this.props.items, 'shippingInfo', 'shipToLocations');
      var optSttss = this.renderOption(this.props.items, 'sellingStatus', 'sellingState');
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'pane pane-sm sidebar' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'nav',
          { className: 'nav-group' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h5',
            { className: 'nav-group-title' },
            'Title'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'nav-group-item' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'form-group' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'text',
                className: 'form-control',
                placeholder: 'Search of items',
                value: this.state.searchString,
                onChange: this.handleChangeText.bind(this, 'searchString') })
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h5',
            { className: 'nav-group-title' },
            'End time'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'nav-group-item' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'form-group' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'text',
                className: 'form-control',
                placeholder: 'From date (yyyy/mm/dd)',
                value: this.state.startDate,
                onChange: this.handleChangeText.bind(this, 'startDate') })
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'form-group' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'text',
                className: 'form-control',
                placeholder: 'To date (yyyy/mm/dd)',
                value: this.state.endDate,
                onChange: this.handleChangeText.bind(this, 'endDate') })
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'nav-group-item' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'form-actions' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'button',
                { className: 'btn btn-mini btn-default',
                  onClick: this.handleChangeReset.bind(this) },
                'Reset'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'button',
                { className: 'btn btn-mini btn-primary',
                  onClick: this.handleChangeSearch.bind(this) },
                'Search'
              )
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h5',
            { className: 'nav-group-title' },
            'Functions'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'nav-group-item',
              onClick: this.handleChangeHome.bind(this) },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span', { className: 'icon icon-home' }),
            'Home (',
            page,
            ' page)'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'nav-group-item',
              onClick: this.handleIncrement.bind(this) },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span', { className: 'icon icon-right-bold' }),
            'Next'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'nav-group-item',
              onClick: this.handleDecrement.bind(this) },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span', { className: 'icon icon-left-bold' }),
            'Previous'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h5',
            { className: 'nav-group-title' },
            'Output'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'nav-group-item' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'form-group' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'text',
                className: 'form-control',
                placeholder: 'Number of pages',
                value: this.state.pages,
                onChange: this.handleChangeText.bind(this, 'pages') })
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'nav-group-item' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'form-actions' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'button',
                { className: 'btn btn-mini btn-primary',
                  onClick: this.handleClickSave.bind(this) },
                'Save'
              )
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h5',
            { className: 'nav-group-title' },
            'Category'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'nav-group-item' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'select',
              { className: 'form-control',
                multiple: true,
                value: this.state.categoryPath,
                onChange: this.handleChangeSelect.bind(this, 'categoryPath')
              },
              optPaths
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h5',
            { className: 'nav-group-title' },
            'Seller'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'nav-group-item' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'select',
              { className: 'form-control',
                multiple: true,
                value: this.state.seller,
                onChange: this.handleChangeSelect.bind(this, 'seller')
              },
              optSelrs
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h5',
            { className: 'nav-group-title' },
            'ItemID'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'nav-group-item' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'select',
              { className: 'form-control',
                multiple: true,
                value: this.state.itemId,
                onChange: this.handleChangeSelect.bind(this, 'itemId')
              },
              optImIDs
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h5',
            { className: 'nav-group-title' },
            'Price'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'nav-group-item' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'form-group' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'text',
                className: 'form-control',
                placeholder: 'Highest price',
                value: this.state.highestPrice,
                onChange: this.handleChangeText.bind(this, 'highestPrice') })
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'form-group' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'text',
                className: 'form-control',
                placeholder: 'Lowest price',
                value: this.state.lowestPrice,
                onChange: this.handleChangeText.bind(this, 'lowestPrice') })
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h5',
            { className: 'nav-group-title' },
            'Shipping'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'nav-group-item' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'select',
              { className: 'form-control',
                multiple: true,
                value: this.state.shipping,
                onChange: this.handleChangeSelect.bind(this, 'shipping')
              },
              optShpgs
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h5',
            { className: 'nav-group-title' },
            'Condition'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'nav-group-item' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'select',
              { className: 'form-control',
                multiple: true,
                value: this.state.condition,
                onChange: this.handleChangeSelect.bind(this, 'condition') },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'option',
                { value: '1000' },
                'New'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'option',
                { value: '1500' },
                'New other (see details)'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'option',
                { value: '1750' },
                'New with defects'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'option',
                { value: '2000' },
                'Manufacturer refurbished'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'option',
                { value: '2500' },
                'Seller refurbished'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'option',
                { value: '3000' },
                'Used'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'option',
                { value: '4000' },
                'Very Good'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'option',
                { value: '5000' },
                'Good'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'option',
                { value: '6000' },
                'Acceptable'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'option',
                { value: '7000' },
                'For parts or not working'
              )
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h5',
            { className: 'nav-group-title' },
            'Status'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'nav-group-item' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'select',
              { className: 'form-control',
                multiple: true,
                value: this.state.status,
                onChange: this.handleChangeSelect.bind(this, 'status')
              },
              optSttss
            )
          )
        )
      );
    }
  }]);

  return NoteSidebar;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (NoteSidebar);
;

/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dispatcher__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_NoteApiClient__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_webutils__ = __webpack_require__(1);




var pspid = 'NoteAction';

/* harmony default export */ __webpack_exports__["a"] = ({
  increment: function increment(options, page) {
    __WEBPACK_IMPORTED_MODULE_2__utils_webutils__["a" /* log */].trace(pspid + '>', options);
    page = ++page > 0 ? page : 1;
    return __WEBPACK_IMPORTED_MODULE_1__services_NoteApiClient__["a" /* default */].fetchItems(options, page).then(function (items) {
      Object(__WEBPACK_IMPORTED_MODULE_0__dispatcher__["b" /* dispatch */])({ type: 'item/fetch/note', items: items, options: options, page: page });
      __WEBPACK_IMPORTED_MODULE_2__utils_webutils__["a" /* log */].info(pspid + '>', 'Response: item/fetch/note');
      __WEBPACK_IMPORTED_MODULE_2__utils_webutils__["b" /* spn */].stop();
    });
  },
  decrement: function decrement(options, page) {
    page = --page > 0 ? page : 1;
    return __WEBPACK_IMPORTED_MODULE_1__services_NoteApiClient__["a" /* default */].fetchItems(options, page).then(function (items) {
      Object(__WEBPACK_IMPORTED_MODULE_0__dispatcher__["b" /* dispatch */])({ type: 'item/fetch/note', items: items, options: options, page: page });
      __WEBPACK_IMPORTED_MODULE_2__utils_webutils__["a" /* log */].info(pspid + '> Response: item/fetch/note');
      __WEBPACK_IMPORTED_MODULE_2__utils_webutils__["b" /* spn */].stop();
    });
  },
  writeItems: function writeItems(options) {
    return __WEBPACK_IMPORTED_MODULE_1__services_NoteApiClient__["a" /* default */].writeItems(options).then(function (items) {
      __WEBPACK_IMPORTED_MODULE_2__utils_webutils__["b" /* spn */].stop();
      return items;
    });
  }
});

/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_stdutils__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_stdutils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__utils_stdutils__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_webutils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_iso8601_duration__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_iso8601_duration___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_iso8601_duration__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var pspid = 'NoteTableView';

var NoteTable = function (_React$Component) {
  _inherits(NoteTable, _React$Component);

  function NoteTable() {
    _classCallCheck(this, NoteTable);

    return _possibleConstructorReturn(this, (NoteTable.__proto__ || Object.getPrototypeOf(NoteTable)).apply(this, arguments));
  }

  _createClass(NoteTable, [{
    key: 'renderStatus',
    value: function renderStatus(status) {
      var styles = void 0;
      switch (status) {
        case 0:
          styles = { fontWeight: 'bold', color: 'blue' };
          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { style: styles },
            'Now available.'
          );
        case 1:
          styles = { fontWeight: 'bold', color: 'orange' };
          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { style: styles },
            'New added.'
          );
        case 2:
          styles = { fontWeight: 'bold', color: 'red' };
          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { style: styles },
            'Removed.'
          );
      }
    }
  }, {
    key: 'renderExtension',
    value: function renderExtension(date) {
      var duration = __WEBPACK_IMPORTED_MODULE_1__utils_stdutils___default.a.getLocalTimeStamp(Object(__WEBPACK_IMPORTED_MODULE_3_iso8601_duration__["end"])(Object(__WEBPACK_IMPORTED_MODULE_3_iso8601_duration__["parse"])(date)));
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        null,
        '( ',
        duration,
        ' )'
      );
    }
  }, {
    key: 'renderItem',
    value: function renderItem(obj, idx) {
      var item = obj;
      var Img = item.hasOwnProperty('galleryURL') ? item.galleryURL[0] : '';
      var Aid = item.itemId[0];
      var Pid = item.hasOwnProperty('productId') ? item.productId.map(function (obj) {
        return obj.__value__ + ' ( ' + obj['@type'] + ' )';
      }) : ['---'];
      var Sid = item.sellerInfo[0].sellerUserName[0];
      var Stm = __WEBPACK_IMPORTED_MODULE_1__utils_stdutils___default.a.getLocalTimeStamp(item.listingInfo[0].startTime[0]);
      var Etm = __WEBPACK_IMPORTED_MODULE_1__utils_stdutils___default.a.getLocalTimeStamp(item.listingInfo[0].endTime[0]);
      var Url = item.viewItemURL[0];
      var Ttl = item.title[0];
      var Pc1 = item.sellingStatus[0].currentPrice[0].__value__;
      var Ci1 = item.sellingStatus[0].currentPrice[0]['@currencyId'];
      var Pc2 = item.sellingStatus[0].convertedCurrentPrice[0].__value__;
      var Ci2 = item.sellingStatus[0].convertedCurrentPrice[0]['@currencyId'];
      var Cdn = item.hasOwnProperty('condition') ? item.condition[0].conditionDisplayName[0] : '---';
      var Cgp = item.primaryCategory[0].categoryName[0];
      var Shp = item.shippingInfo[0].shipToLocations[0];
      var Stt = item.sellingStatus[0].sellingState[0];
      var Ext = item.sellingStatus[0].hasOwnProperty('timeLeft') ? this.renderExtension(item.sellingStatus[0].timeLeft[0]) : '';
      var stt = this.renderStatus(0);
      var Upd = __WEBPACK_IMPORTED_MODULE_1__utils_stdutils___default.a.getLocalTimeStamp(Date.now());

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'tbody',
        { key: idx },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'tr',
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'td',
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { src: Img, width: '128', height: '128' })
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'td',
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              null,
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'a',
                { href: Url, target: '_blank' },
                Ttl
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null)
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              null,
              'Sell period : ',
              Stm,
              ' ~ ',
              Etm,
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
              'Condition : ',
              Cdn,
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
              'Seller : ',
              Sid,
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
              'ItemID : ',
              Aid,
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
              'ProductID : ',
              Pid.join(' '),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
              'Category : ',
              Cgp
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'td',
            null,
            Shp
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'td',
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              null,
              Pc1,
              ' ',
              Ci1
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              null,
              '( ',
              Pc2,
              ' ',
              Ci2,
              ' )'
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'td',
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              null,
              Stt
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              null,
              Ext
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'td',
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              null,
              stt
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              null,
              Upd
            )
          )
        )
      );
    }
  }, {
    key: 'filterItems',
    value: function filterItems(objs, options) {
      __WEBPACK_IMPORTED_MODULE_2__utils_webutils__["a" /* log */].trace(pspid + '>', options);
      return objs.filter(function (obj) {
        var item = obj;
        if (options != null) {
          if (!options.shipping.some(function (shipping) {
            return shipping === item.shippingInfo[0].shipToLocations[0];
          }) && options.shipping.length) return false;
          if (!options.condition.some(function (condition) {
            return condition === item.condition[0].conditionId[0];
          }) && options.condition.length) return false;
          if (!options.status.some(function (status) {
            return status === item.sellingStatus[0].sellingState[0];
          }) && options.status.length) return false;
          if (!options.categoryPath.some(function (path) {
            return path === item.primaryCategory[0].categoryName[0];
          }) && options.categoryPath.length) return false;
          if (!options.seller.some(function (selr) {
            return selr === item.sellerInfo[0].sellerUserName[0];
          }) && options.seller.length) return false;
          if (!options.itemId.some(function (itemid) {
            return itemid === item.itemId[0];
          }) && options.itemId.length) return false;
          if (!isFinite(options.lowestPrice) || !isFinite(options.highestPrice)) return false;
          if (Number(options.lowestPrice) > item.sellingStatus[0].convertedCurrentPrice[0].__value__ && options.lowestPrice !== '') return false;
          if (Number(options.highestPrice) < item.sellingStatus[0].convertedCurrentPrice[0].__value__ && options.highestPrice !== '') return false;
        }
        return true;
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var options = this.props.options;
      var items = this.props.items ? this.filterItems(this.props.items, options).map(function (item, idx) {
        return _this2.renderItem(item, idx);
      }) : null;
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'pane' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'table',
          { className: 'table-striped' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'thead',
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'tr',
              null,
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'th',
                null,
                'Image'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'th',
                null,
                'Detail'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'th',
                null,
                'Shipping'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'th',
                null,
                'Price'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'th',
                null,
                'Status'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'th',
                null,
                'Update'
              )
            )
          ),
          items
        )
      );
    }
  }]);

  return NoteTable;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (NoteTable);
;

/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_flux_utils__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_flux_utils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_flux_utils__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__FluxContainerConverter__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__FluxContainerConverter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__FluxContainerConverter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__stores_completeStore__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_CompleteBody_CompleteBody__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_webutils__ = __webpack_require__(1);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








var pspid = 'CompleteControlerView';

var Complete = function (_React$Component) {
  _inherits(Complete, _React$Component);

  function Complete() {
    _classCallCheck(this, Complete);

    return _possibleConstructorReturn(this, (Complete.__proto__ || Object.getPrototypeOf(Complete)).apply(this, arguments));
  }

  _createClass(Complete, [{
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__components_CompleteBody_CompleteBody__["a" /* default */], {
        page: this.state.page,
        items: this.state.items,
        options: this.state.options });
    }
  }], [{
    key: 'getStores',
    value: function getStores() {
      return [__WEBPACK_IMPORTED_MODULE_3__stores_completeStore__["a" /* default */]];
    }
  }, {
    key: 'calculateState',
    value: function calculateState() {
      return __WEBPACK_IMPORTED_MODULE_3__stores_completeStore__["a" /* default */].getState();
    }
  }]);

  return Complete;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1_flux_utils__["Container"].create(__WEBPACK_IMPORTED_MODULE_2__FluxContainerConverter___default.a.convert(Complete)));

/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_flux_utils__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_flux_utils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_flux_utils__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dispatcher__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_webutils__ = __webpack_require__(1);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var pspid = 'completeStore';

var CompleteStore = function (_ReduceStore) {
  _inherits(CompleteStore, _ReduceStore);

  function CompleteStore() {
    _classCallCheck(this, CompleteStore);

    return _possibleConstructorReturn(this, (CompleteStore.__proto__ || Object.getPrototypeOf(CompleteStore)).apply(this, arguments));
  }

  _createClass(CompleteStore, [{
    key: 'getInitialState',
    value: function getInitialState() {
      return {
        page: 0,
        items: null,
        options: {
          searchString: '',
          pages: '',
          highestPrice: '',
          lowestPrice: '',
          shipping: [],
          condition: [],
          status: [],
          itemId: [],
          categoryPath: [],
          seller: [],
          soldItemOnly: false,
          startDate: '',
          endDate: ''
        }
      };
    }
  }, {
    key: 'reduce',
    value: function reduce(state, action) {
      __WEBPACK_IMPORTED_MODULE_2__utils_webutils__["a" /* log */].info(pspid + '> Request: ' + action.type);
      switch (action.type) {
        case 'item/fetch/complete':
          return Object.assign({}, state, { items: action.items, options: action.options,
            page: action.page });
        default:
          return state;
      }
    }
  }]);

  return CompleteStore;
}(__WEBPACK_IMPORTED_MODULE_0_flux_utils__["ReduceStore"]);

/* harmony default export */ __webpack_exports__["a"] = (new CompleteStore(__WEBPACK_IMPORTED_MODULE_1__dispatcher__["a" /* default */]));

/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_CompleteSidebar_CompleteSidebar__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_CompleteTable_CompleteTable__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_webutils__ = __webpack_require__(1);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var pspid = 'CompleteBodyView';

var CompleteBody = function (_React$Component) {
  _inherits(CompleteBody, _React$Component);

  function CompleteBody() {
    _classCallCheck(this, CompleteBody);

    return _possibleConstructorReturn(this, (CompleteBody.__proto__ || Object.getPrototypeOf(CompleteBody)).apply(this, arguments));
  }

  _createClass(CompleteBody, [{
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'pane-group' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__components_CompleteSidebar_CompleteSidebar__["a" /* default */], {
          page: this.props.page,
          items: this.props.items,
          options: this.props.options }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__components_CompleteTable_CompleteTable__["a" /* default */], {
          items: this.props.items,
          options: this.props.options })
      );
    }
  }]);

  return CompleteBody;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (CompleteBody);
;

/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actions_CompleteAction__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Radio_Radio__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_webutils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_stdutils__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_stdutils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__utils_stdutils__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_fs__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_fs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_electron__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_electron__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









var app = __WEBPACK_IMPORTED_MODULE_6_electron___default.a.app;
var remote = __WEBPACK_IMPORTED_MODULE_6_electron___default.a.remote;
var dialog = __WEBPACK_IMPORTED_MODULE_6_electron___default.a.remote.dialog;

var pspid = 'CompleteSidebarView';

var CompleteSidebar = function (_React$Component) {
  _inherits(CompleteSidebar, _React$Component);

  function CompleteSidebar(props) {
    _classCallCheck(this, CompleteSidebar);

    var _this = _possibleConstructorReturn(this, (CompleteSidebar.__proto__ || Object.getPrototypeOf(CompleteSidebar)).call(this, props));

    _this.state = Object.assign({}, props.options);
    return _this;
  }

  _createClass(CompleteSidebar, [{
    key: 'handleClickSave',
    value: function handleClickSave() {
      var _this2 = this;

      var options = this.props.options;
      this.showSaveDialog(function (filename) {
        __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].info(pspid + '>', 'Save file:', filename);
        __WEBPACK_IMPORTED_MODULE_1__actions_CompleteAction__["a" /* default */].writeCompleteItems(options).then(function (items) {
          return _this2.saveItems(filename, items);
        })
        //.then(console.log)
        .catch(_this2.showErrorBox);
      });
    }
  }, {
    key: 'saveItems',
    value: function saveItems(filename, items) {
      __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].trace('' + pspid, filename, items);
      return new Promise(function (resolve) {
        __WEBPACK_IMPORTED_MODULE_5_fs___default.a.writeFile(filename, items.join('\n'), function (err) {
          if (err) reject(err.message);
          resolve('The file has been saved!');
        });
      });
    }
  }, {
    key: 'showSaveDialog',
    value: function showSaveDialog(callback) {
      var win = remote.getCurrentWindow();
      var options = {
        title: 'Save',
        filters: [{ name: 'CSV File', extensions: ['csv'] }, { name: 'All Files', extensions: ['*'] }] };
      dialog.showSaveDialog(win, options, callback);
    }
  }, {
    key: 'showErrorBox',
    value: function showErrorBox(err) {
      dialog.showErrorBox("Error", err.message);
    }
  }, {
    key: 'handleChangeHome',
    value: function handleChangeHome() {
      __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].info(pspid + '>', 'Request: handleChangeHome');
      __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].trace(pspid + '>', this.props.options);
      __WEBPACK_IMPORTED_MODULE_1__actions_CompleteAction__["a" /* default */].increment(this.props.options, 0);
    }
  }, {
    key: 'handleIncrement',
    value: function handleIncrement() {
      __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].info(pspid + '>', 'Request: handleIncrement');
      __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].trace(pspid + '>', this.props.options);
      __WEBPACK_IMPORTED_MODULE_1__actions_CompleteAction__["a" /* default */].increment(this.props.options, this.props.page);
    }
  }, {
    key: 'handleDecrement',
    value: function handleDecrement() {
      __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].info(pspid + '> Request: handleDecrement');
      __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].trace(pspid + '>', this.props.options);
      __WEBPACK_IMPORTED_MODULE_1__actions_CompleteAction__["a" /* default */].decrement(this.props.options, this.props.page);
    }
  }, {
    key: 'handleChangeSearch',
    value: function handleChangeSearch(e) {
      __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].info(pspid + '>', 'Request: handleChangeSearch');
      __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].trace(pspid + '>', this.state);
      e.preventDefault();
      __WEBPACK_IMPORTED_MODULE_1__actions_CompleteAction__["a" /* default */].increment(this.state, 0);
    }
  }, {
    key: 'handleChangeReset',
    value: function handleChangeReset() {
      __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].info(pspid + '>', 'Request: handleChangeReset');
      __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].trace(pspid + '>', this.state);
      this.setState({
        highestPrice: '',
        lowestPrice: '',
        shipping: [],
        condition: [],
        status: [],
        itemId: [],
        categoryPath: [],
        seller: [],
        startDate: '',
        endDate: ''
      });
    }
  }, {
    key: 'handleChangeText',
    value: function handleChangeText(name, e) {
      var newState = {};
      newState[name] = e.target.value;
      this.setState(newState);
    }
  }, {
    key: 'handleChangeCheckbox',
    value: function handleChangeCheckbox(name, e) {
      var newState = {};
      newState[name] = e.target.checked;
      this.setState(newState);
    }
  }, {
    key: 'handleChangeRadio',
    value: function handleChangeRadio(name, e) {
      var newState = {};
      newState[name] = e.target.value;
      this.setState(newState);
    }
  }, {
    key: 'handleChangeSelect',
    value: function handleChangeSelect(name, e) {
      var newState = {};
      var options = e.target.options;
      var values = [];
      for (var i = 0; i < options.length; i++) {
        if (options[i].selected) values.push(options[i].value);
      }
      newState[name] = values;
      this.setState(newState);
    }
  }, {
    key: 'renderOption',
    value: function renderOption(objs, prop1, prop2) {
      if (!objs) return null;
      var len = arguments.length;
      var items = objs.map(function (obj) {
        return len === 2 ? obj[prop1][0] : obj[prop1][0][prop2][0];
      });
      var opts = __WEBPACK_IMPORTED_MODULE_4__utils_stdutils___default.a.dst(items);
      return opts.map(function (opt, idx) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'option',
          {
            key: "choice-" + idx, value: opt },
          opt
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var page = this.props.page;
      var optPaths = this.renderOption(this.props.items, 'primaryCategory', 'categoryName');
      var optSelrs = this.renderOption(this.props.items, 'sellerInfo', 'sellerUserName');
      var optImIDs = this.renderOption(this.props.items, 'itemId');
      var optShpgs = this.renderOption(this.props.items, 'shippingInfo', 'shipToLocations');
      var optSttss = this.renderOption(this.props.items, 'sellingStatus', 'sellingState');
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'pane pane-sm sidebar' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'nav',
          { className: 'nav-group' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h5',
            { className: 'nav-group-title' },
            'Title'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'nav-group-item' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'form-group' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'text',
                className: 'form-control',
                placeholder: 'Search of items',
                value: this.state.searchString,
                onChange: this.handleChangeText.bind(this, 'searchString') })
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h5',
            { className: 'nav-group-title' },
            'Sold listing'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'nav-group-item' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'checkbox' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'label',
                null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'checkbox',
                  value: 'soldItemOnly',
                  checked: this.state.soldItemOnly,
                  onChange: this.handleChangeCheckbox.bind(this, 'soldItemOnly')
                }),
                'Sold items only.'
              )
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h5',
            { className: 'nav-group-title' },
            'End time'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'nav-group-item' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'form-group' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'text',
                className: 'form-control',
                placeholder: 'From Date (yyyy/mm/dd)',
                value: this.state.startDate,
                onChange: this.handleChangeText.bind(this, 'startDate') })
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'form-group' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'text',
                className: 'form-control',
                placeholder: 'To Date (yyyy/mm/dd)',
                value: this.state.endDate,
                onChange: this.handleChangeText.bind(this, 'endDate') })
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'nav-group-item' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'form-actions' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'button',
                { className: 'btn btn-mini btn-default',
                  onClick: this.handleChangeReset.bind(this) },
                'Reset'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'button',
                { className: 'btn btn-mini btn-primary',
                  onClick: this.handleChangeSearch.bind(this) },
                'Search'
              )
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h5',
            { className: 'nav-group-title' },
            'Functions'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'nav-group-item',
              onClick: this.handleChangeHome.bind(this) },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span', { className: 'icon icon-home' }),
            'Home (',
            page,
            ' page)'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'nav-group-item',
              onClick: this.handleIncrement.bind(this) },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span', { className: 'icon icon-right-bold' }),
            'Next'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'nav-group-item',
              onClick: this.handleDecrement.bind(this) },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span', { className: 'icon icon-left-bold' }),
            'Previous'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h5',
            { className: 'nav-group-title' },
            'Output'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'nav-group-item' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'form-group' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'text',
                className: 'form-control',
                placeholder: 'Number of pages',
                value: this.state.pages,
                onChange: this.handleChangeText.bind(this, 'pages') })
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'nav-group-item' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'form-actions' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'button',
                { className: 'btn btn-mini btn-primary',
                  onClick: this.handleClickSave.bind(this) },
                'Save'
              )
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h5',
            { className: 'nav-group-title' },
            'Category'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'nav-group-item' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'select',
              { className: 'form-control',
                multiple: true,
                value: this.state.categoryPath,
                onChange: this.handleChangeSelect.bind(this, 'categoryPath')
              },
              optPaths
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h5',
            { className: 'nav-group-title' },
            'Seller'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'nav-group-item' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'select',
              { className: 'form-control',
                multiple: true,
                value: this.state.seller,
                onChange: this.handleChangeSelect.bind(this, 'seller')
              },
              optSelrs
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h5',
            { className: 'nav-group-title' },
            'ItemID'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'nav-group-item' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'select',
              { className: 'form-control',
                multiple: true,
                value: this.state.itemId,
                onChange: this.handleChangeSelect.bind(this, 'itemId')
              },
              optImIDs
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h5',
            { className: 'nav-group-title' },
            'Price'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'nav-group-item' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'form-group' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'text',
                className: 'form-control',
                placeholder: 'Highest price',
                value: this.state.highestPrice,
                onChange: this.handleChangeText.bind(this, 'highestPrice') })
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'form-group' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'text',
                className: 'form-control',
                placeholder: 'Lowest price',
                value: this.state.lowestPrice,
                onChange: this.handleChangeText.bind(this, 'lowestPrice') })
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h5',
            { className: 'nav-group-title' },
            'Shipping'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'nav-group-item' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'select',
              { className: 'form-control',
                multiple: true,
                value: this.state.shipping,
                onChange: this.handleChangeSelect.bind(this, 'shipping')
              },
              optShpgs
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h5',
            { className: 'nav-group-title' },
            'Condition'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'nav-group-item' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'select',
              { className: 'form-control',
                multiple: true,
                value: this.state.condition,
                onChange: this.handleChangeSelect.bind(this, 'condition') },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'option',
                { value: '1000' },
                'New'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'option',
                { value: '1500' },
                'New other (see details)'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'option',
                { value: '1750' },
                'New with defects'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'option',
                { value: '2000' },
                'Manufacturer refurbished'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'option',
                { value: '2500' },
                'Seller refurbished'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'option',
                { value: '3000' },
                'Used'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'option',
                { value: '4000' },
                'Very Good'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'option',
                { value: '5000' },
                'Good'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'option',
                { value: '6000' },
                'Acceptable'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'option',
                { value: '7000' },
                'For parts or not working'
              )
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h5',
            { className: 'nav-group-title' },
            'Status'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'nav-group-item' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'select',
              { className: 'form-control',
                multiple: true,
                value: this.state.status,
                onChange: this.handleChangeSelect.bind(this, 'status')
              },
              optSttss
            )
          )
        )
      );
    }
  }]);

  return CompleteSidebar;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (CompleteSidebar);
;

/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dispatcher__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_NoteApiClient__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_webutils__ = __webpack_require__(1);




var pspid = 'CompleteAction';

/* harmony default export */ __webpack_exports__["a"] = ({
  increment: function increment(options, page) {
    __WEBPACK_IMPORTED_MODULE_2__utils_webutils__["a" /* log */].trace(pspid + '>', options);
    page = ++page > 0 ? page : 1;
    return __WEBPACK_IMPORTED_MODULE_1__services_NoteApiClient__["a" /* default */].fetchCompleteItems(options, page).then(function (items) {
      Object(__WEBPACK_IMPORTED_MODULE_0__dispatcher__["b" /* dispatch */])({ type: 'item/fetch/complete', items: items, options: options, page: page });
      __WEBPACK_IMPORTED_MODULE_2__utils_webutils__["a" /* log */].info(pspid + '>', 'Response: item/fetch/complete');
      __WEBPACK_IMPORTED_MODULE_2__utils_webutils__["b" /* spn */].stop();
    });
  },
  decrement: function decrement(options, page) {
    page = --page > 0 ? page : 1;
    return __WEBPACK_IMPORTED_MODULE_1__services_NoteApiClient__["a" /* default */].fetchCompleteItems(options, page).then(function (items) {
      Object(__WEBPACK_IMPORTED_MODULE_0__dispatcher__["b" /* dispatch */])({ type: 'item/fetch/complete', items: items, options: options, page: page });
      __WEBPACK_IMPORTED_MODULE_2__utils_webutils__["a" /* log */].info(pspid + '> Response: item/fetch/complete');
      __WEBPACK_IMPORTED_MODULE_2__utils_webutils__["b" /* spn */].stop();
    });
  },
  writeCompleteItems: function writeCompleteItems(options) {
    return __WEBPACK_IMPORTED_MODULE_1__services_NoteApiClient__["a" /* default */].writeCompleteItems(options).then(function (items) {
      __WEBPACK_IMPORTED_MODULE_2__utils_webutils__["b" /* spn */].stop();
      return items;
    });
  }
});

/***/ }),
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_stdutils__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_stdutils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__utils_stdutils__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_webutils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_iso8601_duration__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_iso8601_duration___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_iso8601_duration__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var pspid = 'CompleteTableView';

var CompleteTable = function (_React$Component) {
  _inherits(CompleteTable, _React$Component);

  function CompleteTable() {
    _classCallCheck(this, CompleteTable);

    return _possibleConstructorReturn(this, (CompleteTable.__proto__ || Object.getPrototypeOf(CompleteTable)).apply(this, arguments));
  }

  _createClass(CompleteTable, [{
    key: 'renderStatus',
    value: function renderStatus(status) {
      var styles = void 0;
      switch (status) {
        case 0:
          styles = { fontWeight: 'bold', color: 'blue' };
          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { style: styles },
            'Now available.'
          );
        case 1:
          styles = { fontWeight: 'bold', color: 'orange' };
          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { style: styles },
            'New added.'
          );
        case 2:
          styles = { fontWeight: 'bold', color: 'red' };
          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { style: styles },
            'Removed.'
          );
      }
    }
  }, {
    key: 'renderExtension',
    value: function renderExtension(date) {
      var duration = __WEBPACK_IMPORTED_MODULE_1__utils_stdutils___default.a.getLocalTimeStamp(Object(__WEBPACK_IMPORTED_MODULE_3_iso8601_duration__["end"])(Object(__WEBPACK_IMPORTED_MODULE_3_iso8601_duration__["parse"])(date)));
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        null,
        '( ',
        duration,
        ' )'
      );
    }
  }, {
    key: 'renderItem',
    value: function renderItem(obj, idx) {
      var item = obj;
      var Img = item.hasOwnProperty('galleryURL') ? item.galleryURL[0] : '';
      var Aid = item.itemId[0];
      var Pid = item.hasOwnProperty('productId') ? item.productId.map(function (obj) {
        return obj.__value__ + ' ( ' + obj['@type'] + ' )';
      }) : ['---'];
      var Sid = item.sellerInfo[0].sellerUserName[0];
      var Stm = __WEBPACK_IMPORTED_MODULE_1__utils_stdutils___default.a.getLocalTimeStamp(item.listingInfo[0].startTime[0]);
      var Etm = __WEBPACK_IMPORTED_MODULE_1__utils_stdutils___default.a.getLocalTimeStamp(item.listingInfo[0].endTime[0]);
      var Url = item.viewItemURL[0];
      var Ttl = item.title[0];
      var Pc1 = item.sellingStatus[0].currentPrice[0].__value__;
      var Ci1 = item.sellingStatus[0].currentPrice[0]['@currencyId'];
      var Pc2 = item.sellingStatus[0].convertedCurrentPrice[0].__value__;
      var Ci2 = item.sellingStatus[0].convertedCurrentPrice[0]['@currencyId'];
      var Cdn = item.hasOwnProperty('condition') ? item.condition[0].conditionDisplayName[0] : '---';
      var Cgp = item.primaryCategory[0].categoryName[0];
      var Shp = item.shippingInfo[0].shipToLocations[0];
      var Stt = item.sellingStatus[0].sellingState[0];
      var Ext = item.sellingStatus[0].hasOwnProperty('timeLeft') ? this.renderExtension(item.sellingStatus[0].timeLeft[0]) : '';
      var stt = this.renderStatus(0);
      var Upd = __WEBPACK_IMPORTED_MODULE_1__utils_stdutils___default.a.getLocalTimeStamp(Date.now());

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'tbody',
        { key: idx },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'tr',
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'td',
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { src: Img, width: '128', height: '128' })
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'td',
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              null,
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'a',
                { href: Url, target: '_blank' },
                Ttl
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null)
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              null,
              'Sell period : ',
              Stm,
              ' ~ ',
              Etm,
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
              'Condition : ',
              Cdn,
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
              'Seller : ',
              Sid,
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
              'ItemID : ',
              Aid,
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
              'ProductID : ',
              Pid.join(' '),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
              'Category : ',
              Cgp
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'td',
            null,
            Shp
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'td',
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              null,
              Pc1,
              ' ',
              Ci1
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              null,
              '( ',
              Pc2,
              ' ',
              Ci2,
              ' )'
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'td',
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              null,
              Stt
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              null,
              Ext
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'td',
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              null,
              stt
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              null,
              Upd
            )
          )
        )
      );
    }
  }, {
    key: 'filterItems',
    value: function filterItems(objs, options) {
      __WEBPACK_IMPORTED_MODULE_2__utils_webutils__["a" /* log */].trace(pspid + '>', options);
      return objs.filter(function (obj) {
        var item = obj;
        if (options != null) {
          if (!options.shipping.some(function (shipping) {
            return shipping === item.shippingInfo[0].shipToLocations[0];
          }) && options.shipping.length) return false;
          if (!options.condition.some(function (condition) {
            return condition === item.condition[0].conditionId[0];
          }) && options.condition.length) return false;
          if (!options.status.some(function (status) {
            return status === item.sellingStatus[0].sellingState[0];
          }) && options.status.length) return false;
          if (!options.categoryPath.some(function (path) {
            return path === item.primaryCategory[0].categoryName[0];
          }) && options.categoryPath.length) return false;
          if (!options.seller.some(function (selr) {
            return selr === item.sellerInfo[0].sellerUserName[0];
          }) && options.seller.length) return false;
          if (!options.itemId.some(function (itemid) {
            return itemid === item.itemId[0];
          }) && options.itemId.length) return false;
          if (!isFinite(options.lowestPrice) || !isFinite(options.highestPrice)) return false;
          if (Number(options.lowestPrice) > item.sellingStatus[0].convertedCurrentPrice[0].__value__ && options.lowestPrice !== '') return false;
          if (Number(options.highestPrice) < item.sellingStatus[0].convertedCurrentPrice[0].__value__ && options.highestPrice !== '') return false;
        }
        return true;
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var options = this.props.options;
      var items = this.props.items ? this.filterItems(this.props.items, options).map(function (item, idx) {
        return _this2.renderItem(item, idx);
      }) : null;
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'pane' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'table',
          { className: 'table-striped' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'thead',
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'tr',
              null,
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'th',
                null,
                'Image'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'th',
                null,
                'Detail'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'th',
                null,
                'Shipping'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'th',
                null,
                'Price'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'th',
                null,
                'Status'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'th',
                null,
                'Update'
              )
            )
          ),
          items
        )
      );
    }
  }]);

  return CompleteTable;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (CompleteTable);
;

/***/ }),
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_flux_utils__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_flux_utils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_flux_utils__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__FluxContainerConverter__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__FluxContainerConverter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__FluxContainerConverter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__stores_productsStore__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_ProductsBody_ProductsBody__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_webutils__ = __webpack_require__(1);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








var pspid = 'ProductsControlerView';

var Products = function (_React$Component) {
  _inherits(Products, _React$Component);

  function Products() {
    _classCallCheck(this, Products);

    return _possibleConstructorReturn(this, (Products.__proto__ || Object.getPrototypeOf(Products)).apply(this, arguments));
  }

  _createClass(Products, [{
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__components_ProductsBody_ProductsBody__["a" /* default */], {
        page: this.state.page,
        items: this.state.items,
        options: this.state.options });
    }
  }], [{
    key: 'getStores',
    value: function getStores() {
      return [__WEBPACK_IMPORTED_MODULE_3__stores_productsStore__["a" /* default */]];
    }
  }, {
    key: 'calculateState',
    value: function calculateState() {
      return __WEBPACK_IMPORTED_MODULE_3__stores_productsStore__["a" /* default */].getState();
    }
  }]);

  return Products;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1_flux_utils__["Container"].create(__WEBPACK_IMPORTED_MODULE_2__FluxContainerConverter___default.a.convert(Products)));

/***/ }),
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_flux_utils__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_flux_utils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_flux_utils__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dispatcher__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_webutils__ = __webpack_require__(1);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var pspid = 'productsStore';

var ProductsStore = function (_ReduceStore) {
  _inherits(ProductsStore, _ReduceStore);

  function ProductsStore() {
    _classCallCheck(this, ProductsStore);

    return _possibleConstructorReturn(this, (ProductsStore.__proto__ || Object.getPrototypeOf(ProductsStore)).apply(this, arguments));
  }

  _createClass(ProductsStore, [{
    key: 'getInitialState',
    value: function getInitialState() {
      return {
        page: 0,
        items: null,
        options: {
          productId: '',
          productType: '',
          pages: '',
          highestPrice: '',
          lowestPrice: '',
          shipping: [],
          condition: [],
          status: [],
          itemId: [],
          categoryPath: [],
          seller: []
        }
      };
    }
  }, {
    key: 'reduce',
    value: function reduce(state, action) {
      __WEBPACK_IMPORTED_MODULE_2__utils_webutils__["a" /* log */].info(pspid + '> Request: ' + action.type);
      switch (action.type) {
        case 'item/fetch/products':
          return Object.assign({}, state, { items: action.items, options: action.options,
            page: action.page });
        default:
          return state;
      }
    }
  }]);

  return ProductsStore;
}(__WEBPACK_IMPORTED_MODULE_0_flux_utils__["ReduceStore"]);

/* harmony default export */ __webpack_exports__["a"] = (new ProductsStore(__WEBPACK_IMPORTED_MODULE_1__dispatcher__["a" /* default */]));

/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_ProductsSidebar_ProductsSidebar__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_ProductsTable_ProductsTable__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_webutils__ = __webpack_require__(1);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var pspid = 'ProductsBodyView';

var ProductsBody = function (_React$Component) {
  _inherits(ProductsBody, _React$Component);

  function ProductsBody() {
    _classCallCheck(this, ProductsBody);

    return _possibleConstructorReturn(this, (ProductsBody.__proto__ || Object.getPrototypeOf(ProductsBody)).apply(this, arguments));
  }

  _createClass(ProductsBody, [{
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'pane-group' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__components_ProductsSidebar_ProductsSidebar__["a" /* default */], {
          page: this.props.page,
          items: this.props.items,
          options: this.props.options }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__components_ProductsTable_ProductsTable__["a" /* default */], {
          items: this.props.items,
          options: this.props.options })
      );
    }
  }]);

  return ProductsBody;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (ProductsBody);
;

/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actions_ProductsAction__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Radio_Radio__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_webutils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_stdutils__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_stdutils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__utils_stdutils__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_fs__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_fs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_electron__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_electron__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









var remote = __WEBPACK_IMPORTED_MODULE_6_electron___default.a.remote;
var dialog = __WEBPACK_IMPORTED_MODULE_6_electron___default.a.remote.dialog;

var pspid = 'ProductsSidebarView';

var ProductsSidebar = function (_React$Component) {
  _inherits(ProductsSidebar, _React$Component);

  function ProductsSidebar(props) {
    _classCallCheck(this, ProductsSidebar);

    var _this = _possibleConstructorReturn(this, (ProductsSidebar.__proto__ || Object.getPrototypeOf(ProductsSidebar)).call(this, props));

    _this.state = Object.assign({}, props.options);
    return _this;
  }

  _createClass(ProductsSidebar, [{
    key: 'handleClickSave',
    value: function handleClickSave() {
      var _this2 = this;

      var options = this.props.options;
      this.showSaveDialog(function (filename) {
        __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].info(pspid + '>', 'Save file:', filename);
        __WEBPACK_IMPORTED_MODULE_1__actions_ProductsAction__["a" /* default */].writeProductsItems(options).then(function (items) {
          return _this2.saveItems(filename, items);
        })
        //.then(console.log)
        .catch(_this2.showErrorBox);
      });
    }
  }, {
    key: 'saveItems',
    value: function saveItems(filename, items) {
      __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].trace('' + pspid, filename, items);
      return new Promise(function (resolve) {
        __WEBPACK_IMPORTED_MODULE_5_fs___default.a.writeFile(filename, items.join('\n'), function (err) {
          if (err) reject(err.message);
          resolve('The file has been saved!');
        });
      });
    }
  }, {
    key: 'showSaveDialog',
    value: function showSaveDialog(callback) {
      var win = remote.getCurrentWindow();
      var options = {
        title: 'Save',
        filters: [{ name: 'CSV File', extensions: ['csv'] }, { name: 'All Files', extensions: ['*'] }] };
      dialog.showSaveDialog(win, options, callback);
    }
  }, {
    key: 'showErrorBox',
    value: function showErrorBox(err) {
      dialog.showErrorBox("Error", err.message);
    }
  }, {
    key: 'handleChangeHome',
    value: function handleChangeHome() {
      __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].info(pspid + '>', 'Request: handleChangeHome');
      __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].trace(pspid + '>', this.props.options);
      __WEBPACK_IMPORTED_MODULE_1__actions_ProductsAction__["a" /* default */].increment(this.props.options, 0);
    }
  }, {
    key: 'handleIncrement',
    value: function handleIncrement() {
      __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].info(pspid + '>', 'Request: handleIncrement');
      __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].trace(pspid + '>', this.props.options);
      __WEBPACK_IMPORTED_MODULE_1__actions_ProductsAction__["a" /* default */].increment(this.props.options, this.props.page);
    }
  }, {
    key: 'handleDecrement',
    value: function handleDecrement() {
      __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].info(pspid + '> Request: handleDecrement');
      __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].trace(pspid + '>', this.props.options);
      __WEBPACK_IMPORTED_MODULE_1__actions_ProductsAction__["a" /* default */].decrement(this.props.options, this.props.page);
    }
  }, {
    key: 'handleChangeSearch',
    value: function handleChangeSearch(e) {
      __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].info(pspid + '>', 'Request: handleChangeSearch');
      __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].trace(pspid + '>', this.state);
      e.preventDefault();
      __WEBPACK_IMPORTED_MODULE_1__actions_ProductsAction__["a" /* default */].increment(this.state, 0);
    }
  }, {
    key: 'handleChangeReset',
    value: function handleChangeReset() {
      __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].info(pspid + '>', 'Request: handleChangeReset');
      __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].trace(pspid + '>', this.state);
      this.setState({
        highestPrice: '',
        lowestPrice: '',
        shipping: [],
        condition: [],
        status: [],
        itemId: [],
        categoryPath: [],
        seller: []
      });
    }
  }, {
    key: 'handleChangeText',
    value: function handleChangeText(name, e) {
      var newState = {};
      newState[name] = e.target.value;
      this.setState(newState);
    }
  }, {
    key: 'handleChangeCheckbox',
    value: function handleChangeCheckbox(name, e) {
      var newState = {};
      newState[name] = e.target.checked;
      this.setState(newState);
    }
  }, {
    key: 'handleChangeRadio',
    value: function handleChangeRadio(name, e) {
      var newState = {};
      newState[name] = e.target.value;
      this.setState(newState);
    }
  }, {
    key: 'handleChangeSelect',
    value: function handleChangeSelect(name, e) {
      var newState = {};
      var options = e.target.options;
      var values = [];
      for (var i = 0; i < options.length; i++) {
        if (options[i].selected) values.push(options[i].value);
      }
      newState[name] = values;
      this.setState(newState);
    }
  }, {
    key: 'renderOption',
    value: function renderOption(objs, prop1, prop2) {
      if (!objs) return null;
      var len = arguments.length;
      var items = objs.map(function (obj) {
        return len === 2 ? obj[prop1][0] : obj[prop1][0][prop2][0];
      });
      var opts = __WEBPACK_IMPORTED_MODULE_4__utils_stdutils___default.a.dst(items);
      return opts.map(function (opt, idx) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'option',
          {
            key: "choice-" + idx, value: opt },
          opt
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var page = this.props.page;
      var optPaths = this.renderOption(this.props.items, 'primaryCategory', 'categoryName');
      var optSelrs = this.renderOption(this.props.items, 'sellerInfo', 'sellerUserName');
      var optImIDs = this.renderOption(this.props.items, 'itemId');
      var optShpgs = this.renderOption(this.props.items, 'shippingInfo', 'shipToLocations');
      var optSttss = this.renderOption(this.props.items, 'sellingStatus', 'sellingState');
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'pane pane-sm sidebar' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'nav',
          { className: 'nav-group' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h5',
            { className: 'nav-group-title' },
            'ProductID'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'nav-group-item' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'form-group' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'text',
                className: 'form-control',
                placeholder: 'Search of items',
                value: this.state.productId,
                onChange: this.handleChangeText.bind(this, 'productId') })
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h5',
            { className: 'nav-group-title' },
            'ProductType'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'nav-group-item' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2__components_Radio_Radio__["a" /* default */],
              { name: 'productType',
                value: this.state.productType,
                onChange: this.handleChangeRadio.bind(this, 'productType') },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'option',
                { value: 'ReferenceID' },
                'ReferenceID'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'option',
                { value: 'ISBN' },
                'ISBN'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'option',
                { value: 'UPC' },
                'UPC'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'option',
                { value: 'EAN' },
                'EAN'
              )
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'nav-group-item' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'form-actions' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'button',
                { className: 'btn btn-mini btn-default',
                  onClick: this.handleChangeReset.bind(this) },
                'Reset'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'button',
                { className: 'btn btn-mini btn-primary',
                  onClick: this.handleChangeSearch.bind(this) },
                'Search'
              )
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h5',
            { className: 'nav-group-title' },
            'Functions'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'nav-group-item',
              onClick: this.handleChangeHome.bind(this) },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span', { className: 'icon icon-home' }),
            'Home (',
            page,
            ' page)'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'nav-group-item',
              onClick: this.handleIncrement.bind(this) },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span', { className: 'icon icon-right-bold' }),
            'Next'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'nav-group-item',
              onClick: this.handleDecrement.bind(this) },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span', { className: 'icon icon-left-bold' }),
            'Previous'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h5',
            { className: 'nav-group-title' },
            'Output'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'nav-group-item' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'form-group' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'text',
                className: 'form-control',
                placeholder: 'Number of pages',
                value: this.state.pages,
                onChange: this.handleChangeText.bind(this, 'pages') })
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'nav-group-item' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'form-actions' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'button',
                { className: 'btn btn-mini btn-primary',
                  onClick: this.handleClickSave.bind(this) },
                'Save'
              )
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h5',
            { className: 'nav-group-title' },
            'Category'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'nav-group-item' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'select',
              { className: 'form-control',
                multiple: true,
                value: this.state.categoryPath,
                onChange: this.handleChangeSelect.bind(this, 'categoryPath')
              },
              optPaths
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h5',
            { className: 'nav-group-title' },
            'Seller'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'nav-group-item' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'select',
              { className: 'form-control',
                multiple: true,
                value: this.state.seller,
                onChange: this.handleChangeSelect.bind(this, 'seller')
              },
              optSelrs
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h5',
            { className: 'nav-group-title' },
            'ItemID'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'nav-group-item' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'select',
              { className: 'form-control',
                multiple: true,
                value: this.state.itemId,
                onChange: this.handleChangeSelect.bind(this, 'itemId')
              },
              optImIDs
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h5',
            { className: 'nav-group-title' },
            'Price'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'nav-group-item' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'form-group' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'text',
                className: 'form-control',
                placeholder: 'Highest price',
                value: this.state.highestPrice,
                onChange: this.handleChangeText.bind(this, 'highestPrice') })
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'form-group' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'text',
                className: 'form-control',
                placeholder: 'Lowest price',
                value: this.state.lowestPrice,
                onChange: this.handleChangeText.bind(this, 'lowestPrice') })
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h5',
            { className: 'nav-group-title' },
            'Shipping'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'nav-group-item' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'select',
              { className: 'form-control',
                multiple: true,
                value: this.state.shipping,
                onChange: this.handleChangeSelect.bind(this, 'shipping')
              },
              optShpgs
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h5',
            { className: 'nav-group-title' },
            'Condition'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'nav-group-item' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'select',
              { className: 'form-control',
                multiple: true,
                value: this.state.condition,
                onChange: this.handleChangeSelect.bind(this, 'condition') },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'option',
                { value: '1000' },
                'New'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'option',
                { value: '1500' },
                'New other (see details)'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'option',
                { value: '1750' },
                'New with defects'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'option',
                { value: '2000' },
                'Manufacturer refurbished'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'option',
                { value: '2500' },
                'Seller refurbished'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'option',
                { value: '3000' },
                'Used'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'option',
                { value: '4000' },
                'Very Good'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'option',
                { value: '5000' },
                'Good'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'option',
                { value: '6000' },
                'Acceptable'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'option',
                { value: '7000' },
                'For parts or not working'
              )
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h5',
            { className: 'nav-group-title' },
            'Status'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'nav-group-item' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'select',
              { className: 'form-control',
                multiple: true,
                value: this.state.status,
                onChange: this.handleChangeSelect.bind(this, 'status')
              },
              optSttss
            )
          )
        )
      );
    }
  }]);

  return ProductsSidebar;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (ProductsSidebar);
;

/***/ }),
/* 97 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dispatcher__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_NoteApiClient__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_webutils__ = __webpack_require__(1);




var pspid = 'ProductsAction';

/* harmony default export */ __webpack_exports__["a"] = ({
  increment: function increment(options, page) {
    __WEBPACK_IMPORTED_MODULE_2__utils_webutils__["a" /* log */].trace(pspid + '>', options);
    page = ++page > 0 ? page : 1;
    return __WEBPACK_IMPORTED_MODULE_1__services_NoteApiClient__["a" /* default */].fetchProductsItems(options, page).then(function (items) {
      Object(__WEBPACK_IMPORTED_MODULE_0__dispatcher__["b" /* dispatch */])({ type: 'item/fetch/products', items: items, options: options, page: page });
      __WEBPACK_IMPORTED_MODULE_2__utils_webutils__["a" /* log */].info(pspid + '>', 'Response: item/fetch/products');
      __WEBPACK_IMPORTED_MODULE_2__utils_webutils__["b" /* spn */].stop();
    });
  },
  decrement: function decrement(options, page) {
    page = --page > 0 ? page : 1;
    return __WEBPACK_IMPORTED_MODULE_1__services_NoteApiClient__["a" /* default */].fetchProductsItems(options, page).then(function (items) {
      Object(__WEBPACK_IMPORTED_MODULE_0__dispatcher__["b" /* dispatch */])({ type: 'item/fetch/products', items: items, options: options, page: page });
      __WEBPACK_IMPORTED_MODULE_2__utils_webutils__["a" /* log */].info(pspid + '> Response: item/fetch/products');
      __WEBPACK_IMPORTED_MODULE_2__utils_webutils__["b" /* spn */].stop();
    });
  },
  writeProductsItems: function writeProductsItems(options) {
    return __WEBPACK_IMPORTED_MODULE_1__services_NoteApiClient__["a" /* default */].writeProductsItems(options).then(function (items) {
      __WEBPACK_IMPORTED_MODULE_2__utils_webutils__["b" /* spn */].stop();
      return items;
    });
  }
});

/***/ }),
/* 98 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_stdutils__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_stdutils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__utils_stdutils__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_webutils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_iso8601_duration__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_iso8601_duration___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_iso8601_duration__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var pspid = 'ProductsTableView';

var ProductsTable = function (_React$Component) {
  _inherits(ProductsTable, _React$Component);

  function ProductsTable() {
    _classCallCheck(this, ProductsTable);

    return _possibleConstructorReturn(this, (ProductsTable.__proto__ || Object.getPrototypeOf(ProductsTable)).apply(this, arguments));
  }

  _createClass(ProductsTable, [{
    key: 'renderStatus',
    value: function renderStatus(status) {
      var styles = void 0;
      switch (status) {
        case 0:
          styles = { fontWeight: 'bold', color: 'blue' };
          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { style: styles },
            'Now available.'
          );
        case 1:
          styles = { fontWeight: 'bold', color: 'orange' };
          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { style: styles },
            'New added.'
          );
        case 2:
          styles = { fontWeight: 'bold', color: 'red' };
          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { style: styles },
            'Removed.'
          );
      }
    }
  }, {
    key: 'renderExtension',
    value: function renderExtension(date) {
      var duration = __WEBPACK_IMPORTED_MODULE_1__utils_stdutils___default.a.getLocalTimeStamp(Object(__WEBPACK_IMPORTED_MODULE_3_iso8601_duration__["end"])(Object(__WEBPACK_IMPORTED_MODULE_3_iso8601_duration__["parse"])(date)));
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        null,
        '( ',
        duration,
        ' )'
      );
    }
  }, {
    key: 'renderItem',
    value: function renderItem(obj, idx) {
      var item = obj;
      var Img = item.hasOwnProperty('galleryURL') ? item.galleryURL[0] : '';
      var Aid = item.itemId[0];
      var Pid = item.hasOwnProperty('productId') ? item.productId.map(function (obj) {
        return obj.__value__ + ' ( ' + obj['@type'] + ' )';
      }) : ['---'];
      var Sid = item.sellerInfo[0].sellerUserName[0];
      var Stm = __WEBPACK_IMPORTED_MODULE_1__utils_stdutils___default.a.getLocalTimeStamp(item.listingInfo[0].startTime[0]);
      var Etm = __WEBPACK_IMPORTED_MODULE_1__utils_stdutils___default.a.getLocalTimeStamp(item.listingInfo[0].endTime[0]);
      var Url = item.viewItemURL[0];
      var Ttl = item.title[0];
      var Pc1 = item.sellingStatus[0].currentPrice[0].__value__;
      var Ci1 = item.sellingStatus[0].currentPrice[0]['@currencyId'];
      var Pc2 = item.sellingStatus[0].convertedCurrentPrice[0].__value__;
      var Ci2 = item.sellingStatus[0].convertedCurrentPrice[0]['@currencyId'];
      var Cdn = item.hasOwnProperty('condition') ? item.condition[0].conditionDisplayName[0] : '---';
      var Cgp = item.primaryCategory[0].categoryName[0];
      var Shp = item.shippingInfo[0].shipToLocations[0];
      var Stt = item.sellingStatus[0].sellingState[0];
      var Ext = item.sellingStatus[0].hasOwnProperty('timeLeft') ? this.renderExtension(item.sellingStatus[0].timeLeft[0]) : '';
      var stt = this.renderStatus(0);
      var Upd = __WEBPACK_IMPORTED_MODULE_1__utils_stdutils___default.a.getLocalTimeStamp(Date.now());

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'tbody',
        { key: idx },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'tr',
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'td',
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { src: Img, width: '128', height: '128' })
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'td',
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              null,
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'a',
                { href: Url, target: '_blank' },
                Ttl
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null)
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              null,
              'Sell period : ',
              Stm,
              ' ~ ',
              Etm,
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
              'Condition : ',
              Cdn,
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
              'Seller : ',
              Sid,
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
              'ItemID : ',
              Aid,
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
              'ProductID : ',
              Pid.join(' '),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
              'Category : ',
              Cgp
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'td',
            null,
            Shp
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'td',
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              null,
              Pc1,
              ' ',
              Ci1
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              null,
              '( ',
              Pc2,
              ' ',
              Ci2,
              ' )'
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'td',
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              null,
              Stt
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              null,
              Ext
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'td',
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              null,
              stt
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              null,
              Upd
            )
          )
        )
      );
    }
  }, {
    key: 'filterItems',
    value: function filterItems(objs, options) {
      __WEBPACK_IMPORTED_MODULE_2__utils_webutils__["a" /* log */].trace(pspid + '>', options);
      return objs.filter(function (obj) {
        var item = obj;
        if (options != null) {
          if (!options.shipping.some(function (shipping) {
            return shipping === item.shippingInfo[0].shipToLocations[0];
          }) && options.shipping.length) return false;
          if (!options.condition.some(function (condition) {
            return condition === item.condition[0].conditionId[0];
          }) && options.condition.length) return false;
          if (!options.status.some(function (status) {
            return status === item.sellingStatus[0].sellingState[0];
          }) && options.status.length) return false;
          if (!options.categoryPath.some(function (path) {
            return path === item.primaryCategory[0].categoryName[0];
          }) && options.categoryPath.length) return false;
          if (!options.seller.some(function (selr) {
            return selr === item.sellerInfo[0].sellerUserName[0];
          }) && options.seller.length) return false;
          if (!options.itemId.some(function (itemid) {
            return itemid === item.itemId[0];
          }) && options.itemId.length) return false;
          if (!isFinite(options.lowestPrice) || !isFinite(options.highestPrice)) return false;
          if (Number(options.lowestPrice) > item.sellingStatus[0].convertedCurrentPrice[0].__value__ && options.lowestPrice !== '') return false;
          if (Number(options.highestPrice) < item.sellingStatus[0].convertedCurrentPrice[0].__value__ && options.highestPrice !== '') return false;
        }
        return true;
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var options = this.props.options;
      var items = this.props.items ? this.filterItems(this.props.items, options).map(function (item, idx) {
        return _this2.renderItem(item, idx);
      }) : null;
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'pane' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'table',
          { className: 'table-striped' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'thead',
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'tr',
              null,
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'th',
                null,
                'Image'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'th',
                null,
                'Detail'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'th',
                null,
                'Shipping'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'th',
                null,
                'Price'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'th',
                null,
                'Status'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'th',
                null,
                'Update'
              )
            )
          ),
          items
        )
      );
    }
  }]);

  return ProductsTable;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (ProductsTable);
;

/***/ }),
/* 99 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actions_AppAction__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_webutils__ = __webpack_require__(1);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var pspid = 'TabsView';

var Tabs = function (_React$Component) {
  _inherits(Tabs, _React$Component);

  function Tabs() {
    _classCallCheck(this, Tabs);

    return _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).apply(this, arguments));
  }

  _createClass(Tabs, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      __WEBPACK_IMPORTED_MODULE_1__actions_AppAction__["a" /* default */].selectedContent(0, this.props.children[0].props.label);
    }
  }, {
    key: 'handleClickTab',
    value: function handleClickTab(index, title, event) {
      event.preventDefault();
      __WEBPACK_IMPORTED_MODULE_1__actions_AppAction__["a" /* default */].selectedContent(index, title);
    }
  }, {
    key: 'renderTitles',
    value: function renderTitles(child, index) {
      var selected = this.props.selected == index ? 'active' : '';
      var classNames = ['tab-item'];
      classNames.push(selected);
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { key: index,
          className: classNames.join(' '),
          onClick: this.handleClickTab.bind(this, index, child.props.label)
        },
        child.props.label
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var titles = this.props.children.map(this.renderTitles.bind(this));
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'tab-group' },
        titles
      );
    }
  }]);

  return Tabs;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (Tabs);

/***/ }),
/* 100 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_webutils__ = __webpack_require__(1);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var pspid = 'ContensView';

var Contents = function (_React$Component) {
  _inherits(Contents, _React$Component);

  function Contents() {
    _classCallCheck(this, Contents);

    return _possibleConstructorReturn(this, (Contents.__proto__ || Object.getPrototypeOf(Contents)).apply(this, arguments));
  }

  _createClass(Contents, [{
    key: 'render',
    value: function render() {
      var contnt = this.props.children[this.props.selected];
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'window-content' },
        contnt
      );
    }
  }]);

  return Contents;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (Contents);

/***/ }),
/* 101 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_webutils__ = __webpack_require__(1);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var pspid = 'GlobalHeaderView';

var GlobalHeader = function (_React$Component) {
  _inherits(GlobalHeader, _React$Component);

  function GlobalHeader() {
    _classCallCheck(this, GlobalHeader);

    return _possibleConstructorReturn(this, (GlobalHeader.__proto__ || Object.getPrototypeOf(GlobalHeader)).apply(this, arguments));
  }

  _createClass(GlobalHeader, [{
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'header',
        { className: 'toolbar toolbar-header' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'h1',
          { className: 'title' },
          this.props.title
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'toolbar-actions' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'button',
            {
              className: 'btn btn-default btn-dropdown pull-right' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span', { className: 'icon icon-megaphone' })
          )
        )
      );
    }
  }]);

  return GlobalHeader;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (GlobalHeader);

/***/ }),
/* 102 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_webutils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_electron__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_electron__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var remote = __WEBPACK_IMPORTED_MODULE_2_electron___default.a.remote;
var dialog = __WEBPACK_IMPORTED_MODULE_2_electron___default.a.remote.dialog;

var pspid = 'GlobalFooterView';

var GlobalFooter = function (_React$Component) {
  _inherits(GlobalFooter, _React$Component);

  function GlobalFooter() {
    _classCallCheck(this, GlobalFooter);

    return _possibleConstructorReturn(this, (GlobalFooter.__proto__ || Object.getPrototypeOf(GlobalFooter)).apply(this, arguments));
  }

  _createClass(GlobalFooter, [{
    key: 'handleClickClose',
    value: function handleClickClose() {
      this.showMessageBox(function (response) {
        __WEBPACK_IMPORTED_MODULE_1__utils_webutils__["a" /* log */].trace(pspid + '>', 'Click button:', response);
        var win = remote.getCurrentWindow();
        if (!response) win.close();
      });
    }
  }, {
    key: 'showMessageBox',
    value: function showMessageBox(callback) {
      var win = remote.getCurrentWindow();
      var options = {
        type: 'info',
        buttons: ['OK', 'Cancel'],
        title: 'Quit',
        message: 'Would you like to close this window?',
        detail: 'Close this window.'
      };
      dialog.showMessageBox(win, options, callback);
    }
  }, {
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'footer',
        { className: 'toolbar toolbar-footer' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'toolbar-actions' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'button',
            {
              onClick: this.handleClickClose.bind(this),
              className: 'btn btn-default'
            },
            'Close'
          )
        )
      );
    }
  }]);

  return GlobalFooter;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (GlobalFooter);
;

/***/ })
],[48]);
//# sourceMappingURL=app.bundle.js.map