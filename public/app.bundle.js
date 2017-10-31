webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export M */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return log; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return spn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return str; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_spin__ = __webpack_require__(97);
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.6
(function () {
  var XMLCData,
      XMLComment,
      XMLDeclaration,
      XMLDocType,
      XMLElement,
      XMLNode,
      XMLProcessingInstruction,
      XMLRaw,
      XMLText,
      isEmpty,
      isFunction,
      isObject,
      ref,
      hasProp = {}.hasOwnProperty;

  ref = __webpack_require__(10), isObject = ref.isObject, isFunction = ref.isFunction, isEmpty = ref.isEmpty;

  XMLElement = null;

  XMLCData = null;

  XMLComment = null;

  XMLDeclaration = null;

  XMLDocType = null;

  XMLRaw = null;

  XMLText = null;

  XMLProcessingInstruction = null;

  module.exports = XMLNode = function () {
    function XMLNode(parent) {
      this.parent = parent;
      if (this.parent) {
        this.options = this.parent.options;
        this.stringify = this.parent.stringify;
      }
      this.children = [];
      if (!XMLElement) {
        XMLElement = __webpack_require__(20);
        XMLCData = __webpack_require__(21);
        XMLComment = __webpack_require__(22);
        XMLDeclaration = __webpack_require__(23);
        XMLDocType = __webpack_require__(24);
        XMLRaw = __webpack_require__(29);
        XMLText = __webpack_require__(30);
        XMLProcessingInstruction = __webpack_require__(31);
      }
    }

    XMLNode.prototype.element = function (name, attributes, text) {
      var childNode, item, j, k, key, lastChild, len, len1, ref1, val;
      lastChild = null;
      if (attributes == null) {
        attributes = {};
      }
      attributes = attributes.valueOf();
      if (!isObject(attributes)) {
        ref1 = [attributes, text], text = ref1[0], attributes = ref1[1];
      }
      if (name != null) {
        name = name.valueOf();
      }
      if (Array.isArray(name)) {
        for (j = 0, len = name.length; j < len; j++) {
          item = name[j];
          lastChild = this.element(item);
        }
      } else if (isFunction(name)) {
        lastChild = this.element(name.apply());
      } else if (isObject(name)) {
        for (key in name) {
          if (!hasProp.call(name, key)) continue;
          val = name[key];
          if (isFunction(val)) {
            val = val.apply();
          }
          if (isObject(val) && isEmpty(val)) {
            val = null;
          }
          if (!this.options.ignoreDecorators && this.stringify.convertAttKey && key.indexOf(this.stringify.convertAttKey) === 0) {
            lastChild = this.attribute(key.substr(this.stringify.convertAttKey.length), val);
          } else if (!this.options.separateArrayItems && Array.isArray(val)) {
            for (k = 0, len1 = val.length; k < len1; k++) {
              item = val[k];
              childNode = {};
              childNode[key] = item;
              lastChild = this.element(childNode);
            }
          } else if (isObject(val)) {
            lastChild = this.element(key);
            lastChild.element(val);
          } else {
            lastChild = this.element(key, val);
          }
        }
      } else {
        if (!this.options.ignoreDecorators && this.stringify.convertTextKey && name.indexOf(this.stringify.convertTextKey) === 0) {
          lastChild = this.text(text);
        } else if (!this.options.ignoreDecorators && this.stringify.convertCDataKey && name.indexOf(this.stringify.convertCDataKey) === 0) {
          lastChild = this.cdata(text);
        } else if (!this.options.ignoreDecorators && this.stringify.convertCommentKey && name.indexOf(this.stringify.convertCommentKey) === 0) {
          lastChild = this.comment(text);
        } else if (!this.options.ignoreDecorators && this.stringify.convertRawKey && name.indexOf(this.stringify.convertRawKey) === 0) {
          lastChild = this.raw(text);
        } else if (!this.options.ignoreDecorators && this.stringify.convertPIKey && name.indexOf(this.stringify.convertPIKey) === 0) {
          lastChild = this.instruction(name.substr(this.stringify.convertPIKey.length), text);
        } else {
          lastChild = this.node(name, attributes, text);
        }
      }
      if (lastChild == null) {
        throw new Error("Could not create any elements with: " + name);
      }
      return lastChild;
    };

    XMLNode.prototype.insertBefore = function (name, attributes, text) {
      var child, i, removed;
      if (this.isRoot) {
        throw new Error("Cannot insert elements at root level");
      }
      i = this.parent.children.indexOf(this);
      removed = this.parent.children.splice(i);
      child = this.parent.element(name, attributes, text);
      Array.prototype.push.apply(this.parent.children, removed);
      return child;
    };

    XMLNode.prototype.insertAfter = function (name, attributes, text) {
      var child, i, removed;
      if (this.isRoot) {
        throw new Error("Cannot insert elements at root level");
      }
      i = this.parent.children.indexOf(this);
      removed = this.parent.children.splice(i + 1);
      child = this.parent.element(name, attributes, text);
      Array.prototype.push.apply(this.parent.children, removed);
      return child;
    };

    XMLNode.prototype.remove = function () {
      var i, ref1;
      if (this.isRoot) {
        throw new Error("Cannot remove the root element");
      }
      i = this.parent.children.indexOf(this);
      [].splice.apply(this.parent.children, [i, i - i + 1].concat(ref1 = [])), ref1;
      return this.parent;
    };

    XMLNode.prototype.node = function (name, attributes, text) {
      var child, ref1;
      if (name != null) {
        name = name.valueOf();
      }
      attributes || (attributes = {});
      attributes = attributes.valueOf();
      if (!isObject(attributes)) {
        ref1 = [attributes, text], text = ref1[0], attributes = ref1[1];
      }
      child = new XMLElement(this, name, attributes);
      if (text != null) {
        child.text(text);
      }
      this.children.push(child);
      return child;
    };

    XMLNode.prototype.text = function (value) {
      var child;
      child = new XMLText(this, value);
      this.children.push(child);
      return this;
    };

    XMLNode.prototype.cdata = function (value) {
      var child;
      child = new XMLCData(this, value);
      this.children.push(child);
      return this;
    };

    XMLNode.prototype.comment = function (value) {
      var child;
      child = new XMLComment(this, value);
      this.children.push(child);
      return this;
    };

    XMLNode.prototype.commentBefore = function (value) {
      var child, i, removed;
      i = this.parent.children.indexOf(this);
      removed = this.parent.children.splice(i);
      child = this.parent.comment(value);
      Array.prototype.push.apply(this.parent.children, removed);
      return this;
    };

    XMLNode.prototype.commentAfter = function (value) {
      var child, i, removed;
      i = this.parent.children.indexOf(this);
      removed = this.parent.children.splice(i + 1);
      child = this.parent.comment(value);
      Array.prototype.push.apply(this.parent.children, removed);
      return this;
    };

    XMLNode.prototype.raw = function (value) {
      var child;
      child = new XMLRaw(this, value);
      this.children.push(child);
      return this;
    };

    XMLNode.prototype.instruction = function (target, value) {
      var insTarget, insValue, instruction, j, len;
      if (target != null) {
        target = target.valueOf();
      }
      if (value != null) {
        value = value.valueOf();
      }
      if (Array.isArray(target)) {
        for (j = 0, len = target.length; j < len; j++) {
          insTarget = target[j];
          this.instruction(insTarget);
        }
      } else if (isObject(target)) {
        for (insTarget in target) {
          if (!hasProp.call(target, insTarget)) continue;
          insValue = target[insTarget];
          this.instruction(insTarget, insValue);
        }
      } else {
        if (isFunction(value)) {
          value = value.apply();
        }
        instruction = new XMLProcessingInstruction(this, target, value);
        this.children.push(instruction);
      }
      return this;
    };

    XMLNode.prototype.instructionBefore = function (target, value) {
      var child, i, removed;
      i = this.parent.children.indexOf(this);
      removed = this.parent.children.splice(i);
      child = this.parent.instruction(target, value);
      Array.prototype.push.apply(this.parent.children, removed);
      return this;
    };

    XMLNode.prototype.instructionAfter = function (target, value) {
      var child, i, removed;
      i = this.parent.children.indexOf(this);
      removed = this.parent.children.splice(i + 1);
      child = this.parent.instruction(target, value);
      Array.prototype.push.apply(this.parent.children, removed);
      return this;
    };

    XMLNode.prototype.declaration = function (version, encoding, standalone) {
      var doc, xmldec;
      doc = this.document();
      xmldec = new XMLDeclaration(doc, version, encoding, standalone);
      if (doc.children[0] instanceof XMLDeclaration) {
        doc.children[0] = xmldec;
      } else {
        doc.children.unshift(xmldec);
      }
      return doc.root() || doc;
    };

    XMLNode.prototype.doctype = function (pubID, sysID) {
      var child, doc, doctype, i, j, k, len, len1, ref1, ref2;
      doc = this.document();
      doctype = new XMLDocType(doc, pubID, sysID);
      ref1 = doc.children;
      for (i = j = 0, len = ref1.length; j < len; i = ++j) {
        child = ref1[i];
        if (child instanceof XMLDocType) {
          doc.children[i] = doctype;
          return doctype;
        }
      }
      ref2 = doc.children;
      for (i = k = 0, len1 = ref2.length; k < len1; i = ++k) {
        child = ref2[i];
        if (child.isRoot) {
          doc.children.splice(i, 0, doctype);
          return doctype;
        }
      }
      doc.children.push(doctype);
      return doctype;
    };

    XMLNode.prototype.up = function () {
      if (this.isRoot) {
        throw new Error("The root node has no parent. Use doc() if you need to get the document object.");
      }
      return this.parent;
    };

    XMLNode.prototype.root = function () {
      var node;
      node = this;
      while (node) {
        if (node.isDocument) {
          return node.rootObject;
        } else if (node.isRoot) {
          return node;
        } else {
          node = node.parent;
        }
      }
    };

    XMLNode.prototype.document = function () {
      var node;
      node = this;
      while (node) {
        if (node.isDocument) {
          return node;
        } else {
          node = node.parent;
        }
      }
    };

    XMLNode.prototype.end = function (options) {
      return this.document().end(options);
    };

    XMLNode.prototype.prev = function () {
      var i;
      i = this.parent.children.indexOf(this);
      if (i < 1) {
        throw new Error("Already at the first node");
      }
      return this.parent.children[i - 1];
    };

    XMLNode.prototype.next = function () {
      var i;
      i = this.parent.children.indexOf(this);
      if (i === -1 || i === this.parent.children.length - 1) {
        throw new Error("Already at the last node");
      }
      return this.parent.children[i + 1];
    };

    XMLNode.prototype.importDocument = function (doc) {
      var clonedRoot;
      clonedRoot = doc.root().clone();
      clonedRoot.parent = this;
      clonedRoot.isRoot = false;
      this.children.push(clonedRoot);
      return this;
    };

    XMLNode.prototype.ele = function (name, attributes, text) {
      return this.element(name, attributes, text);
    };

    XMLNode.prototype.nod = function (name, attributes, text) {
      return this.node(name, attributes, text);
    };

    XMLNode.prototype.txt = function (value) {
      return this.text(value);
    };

    XMLNode.prototype.dat = function (value) {
      return this.cdata(value);
    };

    XMLNode.prototype.com = function (value) {
      return this.comment(value);
    };

    XMLNode.prototype.ins = function (target, value) {
      return this.instruction(target, value);
    };

    XMLNode.prototype.doc = function () {
      return this.document();
    };

    XMLNode.prototype.dec = function (version, encoding, standalone) {
      return this.declaration(version, encoding, standalone);
    };

    XMLNode.prototype.dtd = function (pubID, sysID) {
      return this.doctype(pubID, sysID);
    };

    XMLNode.prototype.e = function (name, attributes, text) {
      return this.element(name, attributes, text);
    };

    XMLNode.prototype.n = function (name, attributes, text) {
      return this.node(name, attributes, text);
    };

    XMLNode.prototype.t = function (value) {
      return this.text(value);
    };

    XMLNode.prototype.d = function (value) {
      return this.cdata(value);
    };

    XMLNode.prototype.c = function (value) {
      return this.comment(value);
    };

    XMLNode.prototype.r = function (value) {
      return this.raw(value);
    };

    XMLNode.prototype.i = function (target, value) {
      return this.instruction(target, value);
    };

    XMLNode.prototype.u = function () {
      return this.up();
    };

    XMLNode.prototype.importXMLBuilder = function (doc) {
      return this.importDocument(doc);
    };

    return XMLNode;
  }();
}).call(this);

/***/ }),
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

module.exports.Container = __webpack_require__(85);
module.exports.Mixin = __webpack_require__(87);
module.exports.ReduceStore = __webpack_require__(88);
module.exports.Store = __webpack_require__(55);

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return dispatch; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_flux__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_flux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_flux__);


var dispatcher = new __WEBPACK_IMPORTED_MODULE_0_flux__["Dispatcher"]();

/* harmony default export */ __webpack_exports__["a"] = (dispatcher);
var dispatch = dispatcher.dispatch.bind(dispatcher);

/***/ }),
/* 10 */
/***/ (function(module, exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// Generated by CoffeeScript 1.12.6
(function () {
  var assign,
      isArray,
      isEmpty,
      isFunction,
      isObject,
      isPlainObject,
      slice = [].slice,
      hasProp = {}.hasOwnProperty;

  assign = function assign() {
    var i, key, len, source, sources, target;
    target = arguments[0], sources = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    if (isFunction(Object.assign)) {
      Object.assign.apply(null, arguments);
    } else {
      for (i = 0, len = sources.length; i < len; i++) {
        source = sources[i];
        if (source != null) {
          for (key in source) {
            if (!hasProp.call(source, key)) continue;
            target[key] = source[key];
          }
        }
      }
    }
    return target;
  };

  isFunction = function isFunction(val) {
    return !!val && Object.prototype.toString.call(val) === '[object Function]';
  };

  isObject = function isObject(val) {
    var ref;
    return !!val && ((ref = typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'function' || ref === 'object');
  };

  isArray = function isArray(val) {
    if (isFunction(Array.isArray)) {
      return Array.isArray(val);
    } else {
      return Object.prototype.toString.call(val) === '[object Array]';
    }
  };

  isEmpty = function isEmpty(val) {
    var key;
    if (isArray(val)) {
      return !val.length;
    } else {
      for (key in val) {
        if (!hasProp.call(val, key)) continue;
        return false;
      }
      return true;
    }
  };

  isPlainObject = function isPlainObject(val) {
    var ctor, proto;
    return isObject(val) && (proto = Object.getPrototypeOf(val)) && (ctor = proto.constructor) && typeof ctor === 'function' && ctor instanceof ctor && Function.prototype.toString.call(ctor) === Function.prototype.toString.call(Object);
  };

  module.exports.assign = assign;

  module.exports.isFunction = isFunction;

  module.exports.isObject = isObject;

  module.exports.isArray = isArray;

  module.exports.isEmpty = isEmpty;

  module.exports.isPlainObject = isPlainObject;
}).call(this);

/***/ }),
/* 11 */
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
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
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
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dispatcher__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_NoteApiClient__ = __webpack_require__(19);
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
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_xmlbuilder__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_xmlbuilder___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_xmlbuilder__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_xml2js__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_xml2js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_xml2js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_iso8601_duration__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_iso8601_duration___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_iso8601_duration__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_webutils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_xhrutils__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_xhrutils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__utils_xhrutils__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_stdutils__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_stdutils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__utils_stdutils__);







__WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].config('console', 'basic', 'ALL', 'note-renderer');
__WEBPACK_IMPORTED_MODULE_3__utils_webutils__["b" /* spn */].config('app');

var pspid = 'eBAPIClient';

//const v1 = 'http://svcs.ebay.com/services/search/FindingService/v1'
//const v2 = 'https://api.ebay.com/ws/api.dll';
//const s1 = 'http://svcs.sandbox.ebay.com/services/search/FindingService/v1';
//const s2 = 'https://api.sandbox.ebay.com/ws/api.dll';
//const appid = 'Develope-WatchNot-PRD-05d7a0307-e288d29c';
//const appid = 'Develope-WatchNot-SBX-5f0ecce30-f5331d00';
//const token = 'AgAAAA**AQAAAA**aAAAAA**jqT1WQ**nY+sHZ2PrBmdj6wVnY+sEZ2PrA2dj6AAkouiDpGFoA6dj6x9nY+seQ**m/ADAA**AAMAAA**2b2SR6yRJyXpL8F99OVUZi/5Quje4X7fgVu8nn2J9GMww28GbOagFFBxcZEIJQAQZsZlsvuYtyqbow0IwnDcXOHYhqroKYtLxb0xl+DBD5nK7PGys8VYKW3+HhIOy4lzGGhpMpaik8fOSTaa6zKJVHJIaD4pJYbI86ws6WfEYTEUQwR7txElKfTEyW1ni53oezHEK4WTdT19vUPSagpkt+Yrge2xNrwiKDgCxYk5n34vSyHpQWIjMc0bT1R2hY4HVLY5HPhv3SSS3zz0hlpR0hNUFyD5YP0uIZ3rwOk+8Pght1uZh2xpS/r3mwecv9UkJy8Xi8QAbUc8JFXCuHdOnjmELkBLyMbaT8zP5o/rw8vjf4UvAQlFLCBxo+aWiBhtoUxI8TKf+fzr99hGwubnqz9Qb4Q74WAwv2XMH05prc1c4c5pct/gTpFD0V8LxDIJ7Jwtny0wijznlqTRUO/3su31r4fgsi37x1/w4JsC9y5yLfc80UKsihCyZOni5/jqXpat3soema7eufk9IZNmalzObyukrVIU1Pc4AeQur0z1jNaaDngxd8+u7DV76DlKarmyN1BTBzANMVXlOeoLH6pFxJ2vVNBnfAtSNgIBbEPczAbQ1ULTIGwf9FIj6iUNl+AH197F8x9TuVOZlePbAprYya0OLMgMyWFnDz/8i9nAY5zVPTqFQO60Ozmeqql044quPBUFLSop7j6AvgwtZoRsEg7SlJtUq+EB3fMR0JJI938eJD3knyhvwCFW1ZCn';

var eBay = new Object();

/* harmony default export */ __webpack_exports__["a"] = ({
  request: function request(action, response) {
    __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].info(pspid + '>', 'Request:', action);
    switch (action) {
      case 'config/fetch':
        return new Promise(function (resolve) {
          var memory = window.localStorage || window.UserDataStorage && new __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["c" /* str */].UserDataStorage() || new __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["c" /* str */].CookieStorage();
          eBay = JSON.parse(memory.getItem("eBay_config"));
          resolve(eBay);
        });
      case 'config/write':
        return new Promise(function (resolve) {
          var memory = window.localStorage || window.UserDataStorage && new __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["c" /* str */].UserDataStorage() || new __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["c" /* str */].CookieStorage();
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
      case 'findItemDetails':
        return new Promise(function (resolve) {
          __WEBPACK_IMPORTED_MODULE_4__utils_xhrutils___default.a.postXML(eBay.tradingApi, response, function (obj) {
            resolve(obj);
          });
        });
      default:
        return new Promise(function (resolve) {
          __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].warn(pspid + '> Unknown request !!');
          resolve(response);
        });
    }
  },
  putItems: function putItems(items) {
    return this.request('writeItemsByKeywords', items);
  },
  putCompleteItems: function putCompleteItems(items) {
    return this.request('writeCompletedItems', items);
  },
  putProductsItems: function putProductsItems(items) {
    return this.request('writeItemsByProduct', items);
  },
  fetchConfig: function fetchConfig() {
    return this.request('config/fetch');
  },
  fetchItems: function fetchItems(options, page) {
    var _this = this;

    __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].trace(pspid + '>', 'options:', options);
    __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].trace(pspid + '>', 'page:', page);
    __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["b" /* spn */].spin();
    return this.getItems(options, page).then(this.resItems).then(this.setItems).then(R.map(function (obj) {
      return { itemId: obj.itemId[0] };
    })).then(function (obj) {
      return Promise.all(R.map(_this.getDetail.bind(_this), obj));
    }).then(function (obj) {
      return Promise.all(R.map(_this.toJSON.bind(_this), obj));
    }).then(R.map(this.resDetail.bind(this))).then(R.map(this.setDetail.bind(this))).then(R.tap(this.traceLog.bind(this))).catch(this.errorLog.bind(this));
  },
  fetchItems2: function fetchItems2(options, page) {
    __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].trace(pspid + '>', 'options:', options);
    __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].trace(pspid + '>', 'page:', page);
    __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["b" /* spn */].spin();
    return this.getItems(options, page).then(this.resItems).then(this.setItems).then(R.tap(this.traceLog.bind(this))).catch(this.errorLog.bind(this));
  },
  fetchCompleteItems: function fetchCompleteItems(options, page) {
    __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].trace(pspid + '>', 'options:', options);
    __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].trace(pspid + '>', 'page:', page);
    __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["b" /* spn */].spin();
    return this.getCompleteItems(options, page).then(this.resCompleteItems).then(this.setItems)
    //.then(R.tap(this.traceLog.bind(this)))
    .catch(this.errorLog.bind(this));
  },
  fetchProductsItems: function fetchProductsItems(options, page) {
    __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].trace(pspid + '>', 'options:', options);
    __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].trace(pspid + '>', 'page:', page);
    __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["b" /* spn */].spin();
    return this.getProductsItems(options, page).then(this.resProductsItems).then(this.setItems)
    //.then(R.tap(this.traceLog.bind(this)))
    .catch(this.errorLog.bind(this));
  },
  setDetail: function setDetail(obj) {
    return obj && obj.Ack === 'Success' ? obj.Item : null;
  },
  resDetail: function resDetail(obj) {
    return obj.hasOwnProperty('GetItemResponse') ? obj.GetItemResponse : null;
  },
  getDetail: function getDetail(options) {
    return this.request('findItemDetails', this.optDetail({
      token: eBay.token, operation: 'GetItem'
    }, options));
  },
  writeConfig: function writeConfig(config) {
    return this.request('config/write', config);
  },
  writeItems: function writeItems(options) {
    var _this2 = this;

    var pages = options.pages;
    __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].trace(pspid + '>', 'options:', options);
    __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].trace(pspid + '>', 'pages:', pages);
    __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["b" /* spn */].spin();
    var mapIndexed = R.addIndex(R.map);
    return this.getItems(options, 1).then(this.resItems).then(R.curry(this.forItems.bind(this))(options)).then(R.map(this.resItems.bind(this))).then(R.map(this.setItems.bind(this))).then(R.flatten).then(R.filter(R.curry(this.filterItem.bind(this))(options))).then(mapIndexed(function (obj, idx) {
      return _this2.renderItem(obj, idx + 1);
    })).then(this.setCSVHeader.bind(this)).then(R.map(this.toCSV.bind(this)))
    //.then(R.tap(this.traceLog.bind(this)))
    .catch(this.errorLog.bind(this));
  },
  writeCompleteItems: function writeCompleteItems(options) {
    var _this3 = this;

    var pages = options.pages;
    __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].trace(pspid + '>', 'options:', options);
    __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].trace(pspid + '>', 'pages:', pages);
    __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["b" /* spn */].spin();
    var mapIndexed = R.addIndex(R.map);
    return this.getCompleteItems(options, 1).then(this.resCompleteItems).then(R.curry(this.forCompleteItems.bind(this))(options)).then(R.map(this.resCompleteItems.bind(this))).then(R.map(this.setItems.bind(this))).then(R.flatten).then(R.filter(R.curry(this.filterItem.bind(this))(options))).then(mapIndexed(function (obj, idx) {
      return _this3.renderItem(obj, idx + 1);
    })).then(this.setCSVHeader.bind(this)).then(R.map(this.toCSV.bind(this)))
    //.then(R.tap(this.traceLog.bind(this)))
    .catch(this.errorLog.bind(this));
  },
  writeProductsItems: function writeProductsItems(options) {
    var _this4 = this;

    var pages = options.pages;
    __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].trace(pspid + '>', 'options:', options);
    __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].trace(pspid + '>', 'pages:', pages);
    __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["b" /* spn */].spin();
    var mapIndexed = R.addIndex(R.map);
    return this.getProductsItems(options, 1).then(this.resProductsItems).then(R.curry(this.forProductsItems.bind(this))(options)).then(R.map(this.resProductsItems.bind(this))).then(R.map(this.setItems.bind(this))).then(R.flatten).then(R.filter(R.curry(this.filterItem.bind(this))(options))).then(mapIndexed(function (obj, idx) {
      return _this4.renderItem(obj, idx + 1);
    })).then(this.setCSVHeader.bind(this)).then(R.map(this.toCSV.bind(this)))
    //.then(R.tap(this.traceLog.bind(this)))
    .catch(this.errorLog.bind(this));
  },
  getItems: function getItems(options, page) {
    return this.request('findItemsByKeywords', this.optItems({
      appid: eBay.appid, page: page, operation: 'findItemsByKeywords'
    }, options));
  },
  getCompleteItems: function getCompleteItems(options, page) {
    return this.request('findCompletedItems', this.optItems({
      appid: eBay.appid, page: page, operation: 'findCompletedItems'
    }, options));
  },
  getProductsItems: function getProductsItems(options, page) {
    return this.request('findItemsByProduct', this.optProducts({
      appid: eBay.appid, page: page, operation: 'findItemsByProduct'
    }, options));
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
  forCompleteItems: function forCompleteItems(options, res) {
    var pages = options.pages;
    var page = Number(res.paginationOutput[0].totalPages[0]) < pages ? Number(res.paginationOutput[0].totalPages[0]) : pages;
    var newItems = [];
    for (var idx = 1; idx <= page; idx++) {
      newItems.push(this.getCompleteItems(options, idx));
    }
    return Promise.all(newItems);
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
  resItems: function resItems(obj) {
    return obj.hasOwnProperty('findItemsByKeywordsResponse') ? obj.findItemsByKeywordsResponse[0] : null;
  },
  resCompleteItems: function resCompleteItems(obj) {
    return obj.hasOwnProperty('findCompletedItemsResponse') ? obj.findCompletedItemsResponse[0] : null;
  },
  resProductsItems: function resProductsItems(obj) {
    return obj.hasOwnProperty('findItemsByProductResponse') ? obj.findItemsByProductResponse[0] : null;
  },
  setItems: function setItems(obj) {
    return obj && obj.ack[0] === 'Success' ? obj.searchResult[0].item : null;
  },
  setCSVHeader: function setCSVHeader(obj) {
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
  toXML: function toXML(req, obj) {
    obj['@xmlns'] = 'urn:ebay:apis:eBLBaseComponents';
    var xml = new Object();
    xml[req] = obj;
    return __WEBPACK_IMPORTED_MODULE_0_xmlbuilder___default.a.create(xml, { encoding: 'utf-8' }).end();
  },
  toJSON: function toJSON(str) {
    return new Promise(function (resolve) {
      __WEBPACK_IMPORTED_MODULE_1_xml2js___default.a.parseString(str, {
        attrkey: 'root', charkey: 'sub', trim: true, explicitArray: false }, function (err, res) {
        if (err) __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].error(err);
        resolve(res);
      });
    });
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

    __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].trace(pspid + '>', 'Request:', options);
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

    if (__WEBPACK_IMPORTED_MODULE_5__utils_stdutils___default.a.isValidDate(_p.startDate)) {
      options['itemFilter(' + n + ').name'] = 'EndTimeFrom';
      options['itemFilter(' + n + ').value(0)'] = __WEBPACK_IMPORTED_MODULE_5__utils_stdutils___default.a.setTimeStamp(_p.startDate);
      n++;
    }

    if (__WEBPACK_IMPORTED_MODULE_5__utils_stdutils___default.a.isValidDate(_p.endDate)) {
      options['itemFilter(' + n + ').name'] = 'EndTimeTo';
      options['itemFilter(' + n + ').value(0)'] = __WEBPACK_IMPORTED_MODULE_5__utils_stdutils___default.a.setTimeStamp(_p.endDate);
      n++;
    }

    __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].trace(pspid + '>', 'Request:', options);
    return options;
  },
  optDetail: function optDetail(o, p) {
    var _o = o;
    var _p = p ? p : {};
    var head = new Object();
    var body = new Object();
    head['X-EBAY-API-COMPATIBILITY-LEVEL'] = '967';
    head['X-EBAY-API-CALL-NAME'] = o.operation;
    head['X-EBAY-API-SITEID'] = 0;
    body['RequesterCredentials'] = { 'eBayAuthToken': _o.token };
    body['ErrorLanguage'] = 'en_US';
    body['WarningLevel'] = 'High';
    body['ItemID'] = _p.itemId;
    body['DetailLevel'] = 'ReturnAll';
    __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].trace(pspid + '>', 'Request:', head, body);
    return { head: head, body: this.toXML(_o.operation, body) };
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
    return __WEBPACK_IMPORTED_MODULE_5__utils_stdutils___default.a.getLocalTimeStamp(Object(__WEBPACK_IMPORTED_MODULE_2_iso8601_duration__["end"])(Object(__WEBPACK_IMPORTED_MODULE_2_iso8601_duration__["parse"])(date)));
  },
  renderItem: function renderItem(item, idx) {
    var Img = item.hasOwnProperty('galleryURL') ? item.galleryURL[0] : '';
    var Aid = item.itemId[0];
    var Pid = item.hasOwnProperty('productId') ? item.productId.map(function (obj) {
      return obj.__value__ + ' ( ' + obj['@type'] + ' )';
    }) : ['---'];
    var Sid = item.sellerInfo[0].sellerUserName[0];
    var Stm = __WEBPACK_IMPORTED_MODULE_5__utils_stdutils___default.a.getLocalTimeStamp(item.listingInfo[0].startTime[0]);
    var Etm = __WEBPACK_IMPORTED_MODULE_5__utils_stdutils___default.a.getLocalTimeStamp(item.listingInfo[0].endTime[0]);
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
    var Upd = __WEBPACK_IMPORTED_MODULE_5__utils_stdutils___default.a.getLocalTimeStamp(Date.now());

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
  },
  traceLog: function traceLog(obj) {
    return __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].trace(pspid + '>', 'Trace log:', obj);
  },
  errorLog: function errorLog(err) {
    return __WEBPACK_IMPORTED_MODULE_3__utils_webutils__["a" /* log */].error(pspid + '>', 'Error occurred:', err);
  }
});

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.6
(function () {
  var XMLAttribute,
      XMLElement,
      XMLNode,
      isFunction,
      isObject,
      ref,
      extend = function extend(child, parent) {
    for (var key in parent) {
      if (hasProp.call(parent, key)) child[key] = parent[key];
    }function ctor() {
      this.constructor = child;
    }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
  },
      hasProp = {}.hasOwnProperty;

  ref = __webpack_require__(10), isObject = ref.isObject, isFunction = ref.isFunction;

  XMLNode = __webpack_require__(5);

  XMLAttribute = __webpack_require__(58);

  module.exports = XMLElement = function (superClass) {
    extend(XMLElement, superClass);

    function XMLElement(parent, name, attributes) {
      XMLElement.__super__.constructor.call(this, parent);
      if (name == null) {
        throw new Error("Missing element name");
      }
      this.name = this.stringify.eleName(name);
      this.attributes = {};
      if (attributes != null) {
        this.attribute(attributes);
      }
      if (parent.isDocument) {
        this.isRoot = true;
        this.documentObject = parent;
        parent.rootObject = this;
      }
    }

    XMLElement.prototype.clone = function () {
      var att, attName, clonedSelf, ref1;
      clonedSelf = Object.create(this);
      if (clonedSelf.isRoot) {
        clonedSelf.documentObject = null;
      }
      clonedSelf.attributes = {};
      ref1 = this.attributes;
      for (attName in ref1) {
        if (!hasProp.call(ref1, attName)) continue;
        att = ref1[attName];
        clonedSelf.attributes[attName] = att.clone();
      }
      clonedSelf.children = [];
      this.children.forEach(function (child) {
        var clonedChild;
        clonedChild = child.clone();
        clonedChild.parent = clonedSelf;
        return clonedSelf.children.push(clonedChild);
      });
      return clonedSelf;
    };

    XMLElement.prototype.attribute = function (name, value) {
      var attName, attValue;
      if (name != null) {
        name = name.valueOf();
      }
      if (isObject(name)) {
        for (attName in name) {
          if (!hasProp.call(name, attName)) continue;
          attValue = name[attName];
          this.attribute(attName, attValue);
        }
      } else {
        if (isFunction(value)) {
          value = value.apply();
        }
        if (!this.options.skipNullAttributes || value != null) {
          this.attributes[name] = new XMLAttribute(this, name, value);
        }
      }
      return this;
    };

    XMLElement.prototype.removeAttribute = function (name) {
      var attName, i, len;
      if (name == null) {
        throw new Error("Missing attribute name");
      }
      name = name.valueOf();
      if (Array.isArray(name)) {
        for (i = 0, len = name.length; i < len; i++) {
          attName = name[i];
          delete this.attributes[attName];
        }
      } else {
        delete this.attributes[name];
      }
      return this;
    };

    XMLElement.prototype.toString = function (options) {
      return this.options.writer.set(options).element(this);
    };

    XMLElement.prototype.att = function (name, value) {
      return this.attribute(name, value);
    };

    XMLElement.prototype.a = function (name, value) {
      return this.attribute(name, value);
    };

    return XMLElement;
  }(XMLNode);
}).call(this);

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.6
(function () {
  var XMLCData,
      XMLNode,
      extend = function extend(child, parent) {
    for (var key in parent) {
      if (hasProp.call(parent, key)) child[key] = parent[key];
    }function ctor() {
      this.constructor = child;
    }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
  },
      hasProp = {}.hasOwnProperty;

  XMLNode = __webpack_require__(5);

  module.exports = XMLCData = function (superClass) {
    extend(XMLCData, superClass);

    function XMLCData(parent, text) {
      XMLCData.__super__.constructor.call(this, parent);
      if (text == null) {
        throw new Error("Missing CDATA text");
      }
      this.text = this.stringify.cdata(text);
    }

    XMLCData.prototype.clone = function () {
      return Object.create(this);
    };

    XMLCData.prototype.toString = function (options) {
      return this.options.writer.set(options).cdata(this);
    };

    return XMLCData;
  }(XMLNode);
}).call(this);

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.6
(function () {
  var XMLComment,
      XMLNode,
      extend = function extend(child, parent) {
    for (var key in parent) {
      if (hasProp.call(parent, key)) child[key] = parent[key];
    }function ctor() {
      this.constructor = child;
    }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
  },
      hasProp = {}.hasOwnProperty;

  XMLNode = __webpack_require__(5);

  module.exports = XMLComment = function (superClass) {
    extend(XMLComment, superClass);

    function XMLComment(parent, text) {
      XMLComment.__super__.constructor.call(this, parent);
      if (text == null) {
        throw new Error("Missing comment text");
      }
      this.text = this.stringify.comment(text);
    }

    XMLComment.prototype.clone = function () {
      return Object.create(this);
    };

    XMLComment.prototype.toString = function (options) {
      return this.options.writer.set(options).comment(this);
    };

    return XMLComment;
  }(XMLNode);
}).call(this);

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.6
(function () {
  var XMLDeclaration,
      XMLNode,
      isObject,
      extend = function extend(child, parent) {
    for (var key in parent) {
      if (hasProp.call(parent, key)) child[key] = parent[key];
    }function ctor() {
      this.constructor = child;
    }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
  },
      hasProp = {}.hasOwnProperty;

  isObject = __webpack_require__(10).isObject;

  XMLNode = __webpack_require__(5);

  module.exports = XMLDeclaration = function (superClass) {
    extend(XMLDeclaration, superClass);

    function XMLDeclaration(parent, version, encoding, standalone) {
      var ref;
      XMLDeclaration.__super__.constructor.call(this, parent);
      if (isObject(version)) {
        ref = version, version = ref.version, encoding = ref.encoding, standalone = ref.standalone;
      }
      if (!version) {
        version = '1.0';
      }
      this.version = this.stringify.xmlVersion(version);
      if (encoding != null) {
        this.encoding = this.stringify.xmlEncoding(encoding);
      }
      if (standalone != null) {
        this.standalone = this.stringify.xmlStandalone(standalone);
      }
    }

    XMLDeclaration.prototype.toString = function (options) {
      return this.options.writer.set(options).declaration(this);
    };

    return XMLDeclaration;
  }(XMLNode);
}).call(this);

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.6
(function () {
  var XMLDTDAttList,
      XMLDTDElement,
      XMLDTDEntity,
      XMLDTDNotation,
      XMLDocType,
      XMLNode,
      isObject,
      extend = function extend(child, parent) {
    for (var key in parent) {
      if (hasProp.call(parent, key)) child[key] = parent[key];
    }function ctor() {
      this.constructor = child;
    }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
  },
      hasProp = {}.hasOwnProperty;

  isObject = __webpack_require__(10).isObject;

  XMLNode = __webpack_require__(5);

  XMLDTDAttList = __webpack_require__(25);

  XMLDTDEntity = __webpack_require__(26);

  XMLDTDElement = __webpack_require__(27);

  XMLDTDNotation = __webpack_require__(28);

  module.exports = XMLDocType = function (superClass) {
    extend(XMLDocType, superClass);

    function XMLDocType(parent, pubID, sysID) {
      var ref, ref1;
      XMLDocType.__super__.constructor.call(this, parent);
      this.documentObject = parent;
      if (isObject(pubID)) {
        ref = pubID, pubID = ref.pubID, sysID = ref.sysID;
      }
      if (sysID == null) {
        ref1 = [pubID, sysID], sysID = ref1[0], pubID = ref1[1];
      }
      if (pubID != null) {
        this.pubID = this.stringify.dtdPubID(pubID);
      }
      if (sysID != null) {
        this.sysID = this.stringify.dtdSysID(sysID);
      }
    }

    XMLDocType.prototype.element = function (name, value) {
      var child;
      child = new XMLDTDElement(this, name, value);
      this.children.push(child);
      return this;
    };

    XMLDocType.prototype.attList = function (elementName, attributeName, attributeType, defaultValueType, defaultValue) {
      var child;
      child = new XMLDTDAttList(this, elementName, attributeName, attributeType, defaultValueType, defaultValue);
      this.children.push(child);
      return this;
    };

    XMLDocType.prototype.entity = function (name, value) {
      var child;
      child = new XMLDTDEntity(this, false, name, value);
      this.children.push(child);
      return this;
    };

    XMLDocType.prototype.pEntity = function (name, value) {
      var child;
      child = new XMLDTDEntity(this, true, name, value);
      this.children.push(child);
      return this;
    };

    XMLDocType.prototype.notation = function (name, value) {
      var child;
      child = new XMLDTDNotation(this, name, value);
      this.children.push(child);
      return this;
    };

    XMLDocType.prototype.toString = function (options) {
      return this.options.writer.set(options).docType(this);
    };

    XMLDocType.prototype.ele = function (name, value) {
      return this.element(name, value);
    };

    XMLDocType.prototype.att = function (elementName, attributeName, attributeType, defaultValueType, defaultValue) {
      return this.attList(elementName, attributeName, attributeType, defaultValueType, defaultValue);
    };

    XMLDocType.prototype.ent = function (name, value) {
      return this.entity(name, value);
    };

    XMLDocType.prototype.pent = function (name, value) {
      return this.pEntity(name, value);
    };

    XMLDocType.prototype.not = function (name, value) {
      return this.notation(name, value);
    };

    XMLDocType.prototype.up = function () {
      return this.root() || this.documentObject;
    };

    return XMLDocType;
  }(XMLNode);
}).call(this);

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.6
(function () {
  var XMLDTDAttList,
      XMLNode,
      extend = function extend(child, parent) {
    for (var key in parent) {
      if (hasProp.call(parent, key)) child[key] = parent[key];
    }function ctor() {
      this.constructor = child;
    }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
  },
      hasProp = {}.hasOwnProperty;

  XMLNode = __webpack_require__(5);

  module.exports = XMLDTDAttList = function (superClass) {
    extend(XMLDTDAttList, superClass);

    function XMLDTDAttList(parent, elementName, attributeName, attributeType, defaultValueType, defaultValue) {
      XMLDTDAttList.__super__.constructor.call(this, parent);
      if (elementName == null) {
        throw new Error("Missing DTD element name");
      }
      if (attributeName == null) {
        throw new Error("Missing DTD attribute name");
      }
      if (!attributeType) {
        throw new Error("Missing DTD attribute type");
      }
      if (!defaultValueType) {
        throw new Error("Missing DTD attribute default");
      }
      if (defaultValueType.indexOf('#') !== 0) {
        defaultValueType = '#' + defaultValueType;
      }
      if (!defaultValueType.match(/^(#REQUIRED|#IMPLIED|#FIXED|#DEFAULT)$/)) {
        throw new Error("Invalid default value type; expected: #REQUIRED, #IMPLIED, #FIXED or #DEFAULT");
      }
      if (defaultValue && !defaultValueType.match(/^(#FIXED|#DEFAULT)$/)) {
        throw new Error("Default value only applies to #FIXED or #DEFAULT");
      }
      this.elementName = this.stringify.eleName(elementName);
      this.attributeName = this.stringify.attName(attributeName);
      this.attributeType = this.stringify.dtdAttType(attributeType);
      this.defaultValue = this.stringify.dtdAttDefault(defaultValue);
      this.defaultValueType = defaultValueType;
    }

    XMLDTDAttList.prototype.toString = function (options) {
      return this.options.writer.set(options).dtdAttList(this);
    };

    return XMLDTDAttList;
  }(XMLNode);
}).call(this);

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.6
(function () {
  var XMLDTDEntity,
      XMLNode,
      isObject,
      extend = function extend(child, parent) {
    for (var key in parent) {
      if (hasProp.call(parent, key)) child[key] = parent[key];
    }function ctor() {
      this.constructor = child;
    }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
  },
      hasProp = {}.hasOwnProperty;

  isObject = __webpack_require__(10).isObject;

  XMLNode = __webpack_require__(5);

  module.exports = XMLDTDEntity = function (superClass) {
    extend(XMLDTDEntity, superClass);

    function XMLDTDEntity(parent, pe, name, value) {
      XMLDTDEntity.__super__.constructor.call(this, parent);
      if (name == null) {
        throw new Error("Missing entity name");
      }
      if (value == null) {
        throw new Error("Missing entity value");
      }
      this.pe = !!pe;
      this.name = this.stringify.eleName(name);
      if (!isObject(value)) {
        this.value = this.stringify.dtdEntityValue(value);
      } else {
        if (!value.pubID && !value.sysID) {
          throw new Error("Public and/or system identifiers are required for an external entity");
        }
        if (value.pubID && !value.sysID) {
          throw new Error("System identifier is required for a public external entity");
        }
        if (value.pubID != null) {
          this.pubID = this.stringify.dtdPubID(value.pubID);
        }
        if (value.sysID != null) {
          this.sysID = this.stringify.dtdSysID(value.sysID);
        }
        if (value.nData != null) {
          this.nData = this.stringify.dtdNData(value.nData);
        }
        if (this.pe && this.nData) {
          throw new Error("Notation declaration is not allowed in a parameter entity");
        }
      }
    }

    XMLDTDEntity.prototype.toString = function (options) {
      return this.options.writer.set(options).dtdEntity(this);
    };

    return XMLDTDEntity;
  }(XMLNode);
}).call(this);

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.6
(function () {
  var XMLDTDElement,
      XMLNode,
      extend = function extend(child, parent) {
    for (var key in parent) {
      if (hasProp.call(parent, key)) child[key] = parent[key];
    }function ctor() {
      this.constructor = child;
    }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
  },
      hasProp = {}.hasOwnProperty;

  XMLNode = __webpack_require__(5);

  module.exports = XMLDTDElement = function (superClass) {
    extend(XMLDTDElement, superClass);

    function XMLDTDElement(parent, name, value) {
      XMLDTDElement.__super__.constructor.call(this, parent);
      if (name == null) {
        throw new Error("Missing DTD element name");
      }
      if (!value) {
        value = '(#PCDATA)';
      }
      if (Array.isArray(value)) {
        value = '(' + value.join(',') + ')';
      }
      this.name = this.stringify.eleName(name);
      this.value = this.stringify.dtdElementValue(value);
    }

    XMLDTDElement.prototype.toString = function (options) {
      return this.options.writer.set(options).dtdElement(this);
    };

    return XMLDTDElement;
  }(XMLNode);
}).call(this);

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.6
(function () {
  var XMLDTDNotation,
      XMLNode,
      extend = function extend(child, parent) {
    for (var key in parent) {
      if (hasProp.call(parent, key)) child[key] = parent[key];
    }function ctor() {
      this.constructor = child;
    }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
  },
      hasProp = {}.hasOwnProperty;

  XMLNode = __webpack_require__(5);

  module.exports = XMLDTDNotation = function (superClass) {
    extend(XMLDTDNotation, superClass);

    function XMLDTDNotation(parent, name, value) {
      XMLDTDNotation.__super__.constructor.call(this, parent);
      if (name == null) {
        throw new Error("Missing notation name");
      }
      if (!value.pubID && !value.sysID) {
        throw new Error("Public or system identifiers are required for an external entity");
      }
      this.name = this.stringify.eleName(name);
      if (value.pubID != null) {
        this.pubID = this.stringify.dtdPubID(value.pubID);
      }
      if (value.sysID != null) {
        this.sysID = this.stringify.dtdSysID(value.sysID);
      }
    }

    XMLDTDNotation.prototype.toString = function (options) {
      return this.options.writer.set(options).dtdNotation(this);
    };

    return XMLDTDNotation;
  }(XMLNode);
}).call(this);

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.6
(function () {
  var XMLNode,
      XMLRaw,
      extend = function extend(child, parent) {
    for (var key in parent) {
      if (hasProp.call(parent, key)) child[key] = parent[key];
    }function ctor() {
      this.constructor = child;
    }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
  },
      hasProp = {}.hasOwnProperty;

  XMLNode = __webpack_require__(5);

  module.exports = XMLRaw = function (superClass) {
    extend(XMLRaw, superClass);

    function XMLRaw(parent, text) {
      XMLRaw.__super__.constructor.call(this, parent);
      if (text == null) {
        throw new Error("Missing raw text");
      }
      this.value = this.stringify.raw(text);
    }

    XMLRaw.prototype.clone = function () {
      return Object.create(this);
    };

    XMLRaw.prototype.toString = function (options) {
      return this.options.writer.set(options).raw(this);
    };

    return XMLRaw;
  }(XMLNode);
}).call(this);

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.6
(function () {
  var XMLNode,
      XMLText,
      extend = function extend(child, parent) {
    for (var key in parent) {
      if (hasProp.call(parent, key)) child[key] = parent[key];
    }function ctor() {
      this.constructor = child;
    }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
  },
      hasProp = {}.hasOwnProperty;

  XMLNode = __webpack_require__(5);

  module.exports = XMLText = function (superClass) {
    extend(XMLText, superClass);

    function XMLText(parent, text) {
      XMLText.__super__.constructor.call(this, parent);
      if (text == null) {
        throw new Error("Missing element text");
      }
      this.value = this.stringify.eleText(text);
    }

    XMLText.prototype.clone = function () {
      return Object.create(this);
    };

    XMLText.prototype.toString = function (options) {
      return this.options.writer.set(options).text(this);
    };

    return XMLText;
  }(XMLNode);
}).call(this);

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.6
(function () {
  var XMLNode,
      XMLProcessingInstruction,
      extend = function extend(child, parent) {
    for (var key in parent) {
      if (hasProp.call(parent, key)) child[key] = parent[key];
    }function ctor() {
      this.constructor = child;
    }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
  },
      hasProp = {}.hasOwnProperty;

  XMLNode = __webpack_require__(5);

  module.exports = XMLProcessingInstruction = function (superClass) {
    extend(XMLProcessingInstruction, superClass);

    function XMLProcessingInstruction(parent, target, value) {
      XMLProcessingInstruction.__super__.constructor.call(this, parent);
      if (target == null) {
        throw new Error("Missing instruction target");
      }
      this.target = this.stringify.insTarget(target);
      if (value) {
        this.value = this.stringify.insValue(value);
      }
    }

    XMLProcessingInstruction.prototype.clone = function () {
      return Object.create(this);
    };

    XMLProcessingInstruction.prototype.toString = function (options) {
      return this.options.writer.set(options).processingInstruction(this);
    };

    return XMLProcessingInstruction;
  }(XMLNode);
}).call(this);

/***/ }),
/* 32 */
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
/* 33 */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.6
(function () {
  var XMLCData,
      XMLComment,
      XMLDTDAttList,
      XMLDTDElement,
      XMLDTDEntity,
      XMLDTDNotation,
      XMLDeclaration,
      XMLDocType,
      XMLElement,
      XMLProcessingInstruction,
      XMLRaw,
      XMLStringWriter,
      XMLText,
      XMLWriterBase,
      extend = function extend(child, parent) {
    for (var key in parent) {
      if (hasProp.call(parent, key)) child[key] = parent[key];
    }function ctor() {
      this.constructor = child;
    }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
  },
      hasProp = {}.hasOwnProperty;

  XMLDeclaration = __webpack_require__(23);

  XMLDocType = __webpack_require__(24);

  XMLCData = __webpack_require__(21);

  XMLComment = __webpack_require__(22);

  XMLElement = __webpack_require__(20);

  XMLRaw = __webpack_require__(29);

  XMLText = __webpack_require__(30);

  XMLProcessingInstruction = __webpack_require__(31);

  XMLDTDAttList = __webpack_require__(25);

  XMLDTDElement = __webpack_require__(27);

  XMLDTDEntity = __webpack_require__(26);

  XMLDTDNotation = __webpack_require__(28);

  XMLWriterBase = __webpack_require__(60);

  module.exports = XMLStringWriter = function (superClass) {
    extend(XMLStringWriter, superClass);

    function XMLStringWriter(options) {
      XMLStringWriter.__super__.constructor.call(this, options);
    }

    XMLStringWriter.prototype.document = function (doc) {
      var child, i, len, r, ref;
      this.textispresent = false;
      r = '';
      ref = doc.children;
      for (i = 0, len = ref.length; i < len; i++) {
        child = ref[i];
        r += function () {
          switch (false) {
            case !(child instanceof XMLDeclaration):
              return this.declaration(child);
            case !(child instanceof XMLDocType):
              return this.docType(child);
            case !(child instanceof XMLComment):
              return this.comment(child);
            case !(child instanceof XMLProcessingInstruction):
              return this.processingInstruction(child);
            default:
              return this.element(child, 0);
          }
        }.call(this);
      }
      if (this.pretty && r.slice(-this.newline.length) === this.newline) {
        r = r.slice(0, -this.newline.length);
      }
      return r;
    };

    XMLStringWriter.prototype.attribute = function (att) {
      return ' ' + att.name + '="' + att.value + '"';
    };

    XMLStringWriter.prototype.cdata = function (node, level) {
      return this.space(level) + '<![CDATA[' + node.text + ']]>' + this.newline;
    };

    XMLStringWriter.prototype.comment = function (node, level) {
      return this.space(level) + '<!-- ' + node.text + ' -->' + this.newline;
    };

    XMLStringWriter.prototype.declaration = function (node, level) {
      var r;
      r = this.space(level);
      r += '<?xml version="' + node.version + '"';
      if (node.encoding != null) {
        r += ' encoding="' + node.encoding + '"';
      }
      if (node.standalone != null) {
        r += ' standalone="' + node.standalone + '"';
      }
      r += this.spacebeforeslash + '?>';
      r += this.newline;
      return r;
    };

    XMLStringWriter.prototype.docType = function (node, level) {
      var child, i, len, r, ref;
      level || (level = 0);
      r = this.space(level);
      r += '<!DOCTYPE ' + node.root().name;
      if (node.pubID && node.sysID) {
        r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
      } else if (node.sysID) {
        r += ' SYSTEM "' + node.sysID + '"';
      }
      if (node.children.length > 0) {
        r += ' [';
        r += this.newline;
        ref = node.children;
        for (i = 0, len = ref.length; i < len; i++) {
          child = ref[i];
          r += function () {
            switch (false) {
              case !(child instanceof XMLDTDAttList):
                return this.dtdAttList(child, level + 1);
              case !(child instanceof XMLDTDElement):
                return this.dtdElement(child, level + 1);
              case !(child instanceof XMLDTDEntity):
                return this.dtdEntity(child, level + 1);
              case !(child instanceof XMLDTDNotation):
                return this.dtdNotation(child, level + 1);
              case !(child instanceof XMLCData):
                return this.cdata(child, level + 1);
              case !(child instanceof XMLComment):
                return this.comment(child, level + 1);
              case !(child instanceof XMLProcessingInstruction):
                return this.processingInstruction(child, level + 1);
              default:
                throw new Error("Unknown DTD node type: " + child.constructor.name);
            }
          }.call(this);
        }
        r += ']';
      }
      r += this.spacebeforeslash + '>';
      r += this.newline;
      return r;
    };

    XMLStringWriter.prototype.element = function (node, level) {
      var att, child, i, j, len, len1, name, r, ref, ref1, ref2, space, textispresentwasset;
      level || (level = 0);
      textispresentwasset = false;
      if (this.textispresent) {
        this.newline = '';
        this.pretty = false;
      } else {
        this.newline = this.newlinedefault;
        this.pretty = this.prettydefault;
      }
      space = this.space(level);
      r = '';
      r += space + '<' + node.name;
      ref = node.attributes;
      for (name in ref) {
        if (!hasProp.call(ref, name)) continue;
        att = ref[name];
        r += this.attribute(att);
      }
      if (node.children.length === 0 || node.children.every(function (e) {
        return e.value === '';
      })) {
        if (this.allowEmpty) {
          r += '></' + node.name + '>' + this.newline;
        } else {
          r += this.spacebeforeslash + '/>' + this.newline;
        }
      } else if (this.pretty && node.children.length === 1 && node.children[0].value != null) {
        r += '>';
        r += node.children[0].value;
        r += '</' + node.name + '>' + this.newline;
      } else {
        if (this.dontprettytextnodes) {
          ref1 = node.children;
          for (i = 0, len = ref1.length; i < len; i++) {
            child = ref1[i];
            if (child.value != null) {
              this.textispresent++;
              textispresentwasset = true;
              break;
            }
          }
        }
        if (this.textispresent) {
          this.newline = '';
          this.pretty = false;
          space = this.space(level);
        }
        r += '>' + this.newline;
        ref2 = node.children;
        for (j = 0, len1 = ref2.length; j < len1; j++) {
          child = ref2[j];
          r += function () {
            switch (false) {
              case !(child instanceof XMLCData):
                return this.cdata(child, level + 1);
              case !(child instanceof XMLComment):
                return this.comment(child, level + 1);
              case !(child instanceof XMLElement):
                return this.element(child, level + 1);
              case !(child instanceof XMLRaw):
                return this.raw(child, level + 1);
              case !(child instanceof XMLText):
                return this.text(child, level + 1);
              case !(child instanceof XMLProcessingInstruction):
                return this.processingInstruction(child, level + 1);
              default:
                throw new Error("Unknown XML node type: " + child.constructor.name);
            }
          }.call(this);
        }
        if (textispresentwasset) {
          this.textispresent--;
        }
        if (!this.textispresent) {
          this.newline = this.newlinedefault;
          this.pretty = this.prettydefault;
        }
        r += space + '</' + node.name + '>' + this.newline;
      }
      return r;
    };

    XMLStringWriter.prototype.processingInstruction = function (node, level) {
      var r;
      r = this.space(level) + '<?' + node.target;
      if (node.value) {
        r += ' ' + node.value;
      }
      r += this.spacebeforeslash + '?>' + this.newline;
      return r;
    };

    XMLStringWriter.prototype.raw = function (node, level) {
      return this.space(level) + node.value + this.newline;
    };

    XMLStringWriter.prototype.text = function (node, level) {
      return this.space(level) + node.value + this.newline;
    };

    XMLStringWriter.prototype.dtdAttList = function (node, level) {
      var r;
      r = this.space(level) + '<!ATTLIST ' + node.elementName + ' ' + node.attributeName + ' ' + node.attributeType;
      if (node.defaultValueType !== '#DEFAULT') {
        r += ' ' + node.defaultValueType;
      }
      if (node.defaultValue) {
        r += ' "' + node.defaultValue + '"';
      }
      r += this.spacebeforeslash + '>' + this.newline;
      return r;
    };

    XMLStringWriter.prototype.dtdElement = function (node, level) {
      return this.space(level) + '<!ELEMENT ' + node.name + ' ' + node.value + this.spacebeforeslash + '>' + this.newline;
    };

    XMLStringWriter.prototype.dtdEntity = function (node, level) {
      var r;
      r = this.space(level) + '<!ENTITY';
      if (node.pe) {
        r += ' %';
      }
      r += ' ' + node.name;
      if (node.value) {
        r += ' "' + node.value + '"';
      } else {
        if (node.pubID && node.sysID) {
          r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
        } else if (node.sysID) {
          r += ' SYSTEM "' + node.sysID + '"';
        }
        if (node.nData) {
          r += ' NDATA ' + node.nData;
        }
      }
      r += this.spacebeforeslash + '>' + this.newline;
      return r;
    };

    XMLStringWriter.prototype.dtdNotation = function (node, level) {
      var r;
      r = this.space(level) + '<!NOTATION ' + node.name;
      if (node.pubID && node.sysID) {
        r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
      } else if (node.pubID) {
        r += ' PUBLIC "' + node.pubID + '"';
      } else if (node.sysID) {
        r += ' SYSTEM "' + node.sysID + '"';
      }
      r += this.spacebeforeslash + '>' + this.newline;
      return r;
    };

    XMLStringWriter.prototype.openNode = function (node, level) {
      var att, name, r, ref;
      level || (level = 0);
      if (node instanceof XMLElement) {
        r = this.space(level) + '<' + node.name;
        ref = node.attributes;
        for (name in ref) {
          if (!hasProp.call(ref, name)) continue;
          att = ref[name];
          r += this.attribute(att);
        }
        r += (node.children ? '>' : '/>') + this.newline;
        return r;
      } else {
        r = this.space(level) + '<!DOCTYPE ' + node.rootNodeName;
        if (node.pubID && node.sysID) {
          r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
        } else if (node.sysID) {
          r += ' SYSTEM "' + node.sysID + '"';
        }
        r += (node.children ? ' [' : '>') + this.newline;
        return r;
      }
    };

    XMLStringWriter.prototype.closeNode = function (node, level) {
      level || (level = 0);
      switch (false) {
        case !(node instanceof XMLElement):
          return this.space(level) + '</' + node.name + '>' + this.newline;
        case !(node instanceof XMLDocType):
          return this.space(level) + ']>' + this.newline;
      }
    };

    return XMLStringWriter;
  }(XMLWriterBase);
}).call(this);

/***/ }),
/* 40 */
/***/ (function(module, exports) {

// Generated by CoffeeScript 1.12.7
(function () {
  exports.defaults = {
    "0.1": {
      explicitCharkey: false,
      trim: true,
      normalize: true,
      normalizeTags: false,
      attrkey: "@",
      charkey: "#",
      explicitArray: false,
      ignoreAttrs: false,
      mergeAttrs: false,
      explicitRoot: false,
      validator: null,
      xmlns: false,
      explicitChildren: false,
      childkey: '@@',
      charsAsChildren: false,
      includeWhiteChars: false,
      async: false,
      strict: true,
      attrNameProcessors: null,
      attrValueProcessors: null,
      tagNameProcessors: null,
      valueProcessors: null,
      emptyTag: ''
    },
    "0.2": {
      explicitCharkey: false,
      trim: false,
      normalize: false,
      normalizeTags: false,
      attrkey: "$",
      charkey: "_",
      explicitArray: true,
      ignoreAttrs: false,
      mergeAttrs: false,
      explicitRoot: true,
      validator: null,
      xmlns: false,
      explicitChildren: false,
      preserveChildrenOrder: false,
      childkey: '$$',
      charsAsChildren: false,
      includeWhiteChars: false,
      async: false,
      strict: true,
      attrNameProcessors: null,
      attrValueProcessors: null,
      tagNameProcessors: null,
      valueProcessors: null,
      rootName: 'root',
      xmldec: {
        'version': '1.0',
        'encoding': 'UTF-8',
        'standalone': true
      },
      doctype: null,
      renderOpts: {
        'pretty': true,
        'indent': '  ',
        'newline': '\n'
      },
      headless: false,
      chunkSize: 10000,
      emptyTag: '',
      cdata: false
    }
  };
}).call(this);

/***/ }),
/* 41 */
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
/* 42 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */
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
/* 55 */
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

var _require = __webpack_require__(89);

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
/* 56 */
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

var EventSubscription = __webpack_require__(91);

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
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.6
(function () {
  var XMLDocument, XMLDocumentCB, XMLStreamWriter, XMLStringWriter, assign, isFunction, ref;

  ref = __webpack_require__(10), assign = ref.assign, isFunction = ref.isFunction;

  XMLDocument = __webpack_require__(99);

  XMLDocumentCB = __webpack_require__(100);

  XMLStringWriter = __webpack_require__(39);

  XMLStreamWriter = __webpack_require__(101);

  module.exports.create = function (name, xmldec, doctype, options) {
    var doc, root;
    if (name == null) {
      throw new Error("Root element needs a name");
    }
    options = assign({}, xmldec, doctype, options);
    doc = new XMLDocument(options);
    root = doc.element(name);
    if (!options.headless) {
      doc.declaration(options);
      if (options.pubID != null || options.sysID != null) {
        doc.doctype(options);
      }
    }
    return root;
  };

  module.exports.begin = function (options, onData, onEnd) {
    var ref1;
    if (isFunction(options)) {
      ref1 = [options, onData], onData = ref1[0], onEnd = ref1[1];
      options = {};
    }
    if (onData) {
      return new XMLDocumentCB(options, onData, onEnd);
    } else {
      return new XMLDocument(options);
    }
  };

  module.exports.stringWriter = function (options) {
    return new XMLStringWriter(options);
  };

  module.exports.streamWriter = function (stream, options) {
    return new XMLStreamWriter(stream, options);
  };
}).call(this);

/***/ }),
/* 58 */
/***/ (function(module, exports) {

// Generated by CoffeeScript 1.12.6
(function () {
  var XMLAttribute;

  module.exports = XMLAttribute = function () {
    function XMLAttribute(parent, name, value) {
      this.options = parent.options;
      this.stringify = parent.stringify;
      if (name == null) {
        throw new Error("Missing attribute name of element " + parent.name);
      }
      if (value == null) {
        throw new Error("Missing attribute value for attribute " + name + " of element " + parent.name);
      }
      this.name = this.stringify.attName(name);
      this.value = this.stringify.attValue(value);
    }

    XMLAttribute.prototype.clone = function () {
      return Object.create(this);
    };

    XMLAttribute.prototype.toString = function (options) {
      return this.options.writer.set(options).attribute(this);
    };

    return XMLAttribute;
  }();
}).call(this);

/***/ }),
/* 59 */
/***/ (function(module, exports) {

// Generated by CoffeeScript 1.12.6
(function () {
  var XMLStringifier,
      bind = function bind(fn, me) {
    return function () {
      return fn.apply(me, arguments);
    };
  },
      hasProp = {}.hasOwnProperty;

  module.exports = XMLStringifier = function () {
    function XMLStringifier(options) {
      this.assertLegalChar = bind(this.assertLegalChar, this);
      var key, ref, value;
      options || (options = {});
      this.noDoubleEncoding = options.noDoubleEncoding;
      ref = options.stringify || {};
      for (key in ref) {
        if (!hasProp.call(ref, key)) continue;
        value = ref[key];
        this[key] = value;
      }
    }

    XMLStringifier.prototype.eleName = function (val) {
      val = '' + val || '';
      return this.assertLegalChar(val);
    };

    XMLStringifier.prototype.eleText = function (val) {
      val = '' + val || '';
      return this.assertLegalChar(this.elEscape(val));
    };

    XMLStringifier.prototype.cdata = function (val) {
      val = '' + val || '';
      val = val.replace(']]>', ']]]]><![CDATA[>');
      return this.assertLegalChar(val);
    };

    XMLStringifier.prototype.comment = function (val) {
      val = '' + val || '';
      if (val.match(/--/)) {
        throw new Error("Comment text cannot contain double-hypen: " + val);
      }
      return this.assertLegalChar(val);
    };

    XMLStringifier.prototype.raw = function (val) {
      return '' + val || '';
    };

    XMLStringifier.prototype.attName = function (val) {
      return val = '' + val || '';
    };

    XMLStringifier.prototype.attValue = function (val) {
      val = '' + val || '';
      return this.attEscape(val);
    };

    XMLStringifier.prototype.insTarget = function (val) {
      return '' + val || '';
    };

    XMLStringifier.prototype.insValue = function (val) {
      val = '' + val || '';
      if (val.match(/\?>/)) {
        throw new Error("Invalid processing instruction value: " + val);
      }
      return val;
    };

    XMLStringifier.prototype.xmlVersion = function (val) {
      val = '' + val || '';
      if (!val.match(/1\.[0-9]+/)) {
        throw new Error("Invalid version number: " + val);
      }
      return val;
    };

    XMLStringifier.prototype.xmlEncoding = function (val) {
      val = '' + val || '';
      if (!val.match(/^[A-Za-z](?:[A-Za-z0-9._-]|-)*$/)) {
        throw new Error("Invalid encoding: " + val);
      }
      return val;
    };

    XMLStringifier.prototype.xmlStandalone = function (val) {
      if (val) {
        return "yes";
      } else {
        return "no";
      }
    };

    XMLStringifier.prototype.dtdPubID = function (val) {
      return '' + val || '';
    };

    XMLStringifier.prototype.dtdSysID = function (val) {
      return '' + val || '';
    };

    XMLStringifier.prototype.dtdElementValue = function (val) {
      return '' + val || '';
    };

    XMLStringifier.prototype.dtdAttType = function (val) {
      return '' + val || '';
    };

    XMLStringifier.prototype.dtdAttDefault = function (val) {
      if (val != null) {
        return '' + val || '';
      } else {
        return val;
      }
    };

    XMLStringifier.prototype.dtdEntityValue = function (val) {
      return '' + val || '';
    };

    XMLStringifier.prototype.dtdNData = function (val) {
      return '' + val || '';
    };

    XMLStringifier.prototype.convertAttKey = '@';

    XMLStringifier.prototype.convertPIKey = '?';

    XMLStringifier.prototype.convertTextKey = '#text';

    XMLStringifier.prototype.convertCDataKey = '#cdata';

    XMLStringifier.prototype.convertCommentKey = '#comment';

    XMLStringifier.prototype.convertRawKey = '#raw';

    XMLStringifier.prototype.assertLegalChar = function (str) {
      var res;
      res = str.match(/[\0\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/);
      if (res) {
        throw new Error("Invalid character in string: " + str + " at index " + res.index);
      }
      return str;
    };

    XMLStringifier.prototype.elEscape = function (str) {
      var ampregex;
      ampregex = this.noDoubleEncoding ? /(?!&\S+;)&/g : /&/g;
      return str.replace(ampregex, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\r/g, '&#xD;');
    };

    XMLStringifier.prototype.attEscape = function (str) {
      var ampregex;
      ampregex = this.noDoubleEncoding ? /(?!&\S+;)&/g : /&/g;
      return str.replace(ampregex, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/\t/g, '&#x9;').replace(/\n/g, '&#xA;').replace(/\r/g, '&#xD;');
    };

    return XMLStringifier;
  }();
}).call(this);

/***/ }),
/* 60 */
/***/ (function(module, exports) {

// Generated by CoffeeScript 1.12.6
(function () {
  var XMLWriterBase,
      hasProp = {}.hasOwnProperty;

  module.exports = XMLWriterBase = function () {
    function XMLWriterBase(options) {
      var key, ref, ref1, ref2, ref3, ref4, ref5, ref6, value;
      options || (options = {});
      this.pretty = options.pretty || false;
      this.allowEmpty = (ref = options.allowEmpty) != null ? ref : false;
      if (this.pretty) {
        this.indent = (ref1 = options.indent) != null ? ref1 : '  ';
        this.newline = (ref2 = options.newline) != null ? ref2 : '\n';
        this.offset = (ref3 = options.offset) != null ? ref3 : 0;
        this.dontprettytextnodes = (ref4 = options.dontprettytextnodes) != null ? ref4 : 0;
      } else {
        this.indent = '';
        this.newline = '';
        this.offset = 0;
        this.dontprettytextnodes = 0;
      }
      this.spacebeforeslash = (ref5 = options.spacebeforeslash) != null ? ref5 : '';
      if (this.spacebeforeslash === true) {
        this.spacebeforeslash = ' ';
      }
      this.newlinedefault = this.newline;
      this.prettydefault = this.pretty;
      ref6 = options.writer || {};
      for (key in ref6) {
        if (!hasProp.call(ref6, key)) continue;
        value = ref6[key];
        this[key] = value;
      }
    }

    XMLWriterBase.prototype.set = function (options) {
      var key, ref, value;
      options || (options = {});
      if ("pretty" in options) {
        this.pretty = options.pretty;
      }
      if ("allowEmpty" in options) {
        this.allowEmpty = options.allowEmpty;
      }
      if (this.pretty) {
        this.indent = "indent" in options ? options.indent : '  ';
        this.newline = "newline" in options ? options.newline : '\n';
        this.offset = "offset" in options ? options.offset : 0;
        this.dontprettytextnodes = "dontprettytextnodes" in options ? options.dontprettytextnodes : 0;
      } else {
        this.indent = '';
        this.newline = '';
        this.offset = 0;
        this.dontprettytextnodes = 0;
      }
      this.spacebeforeslash = "spacebeforeslash" in options ? options.spacebeforeslash : '';
      if (this.spacebeforeslash === true) {
        this.spacebeforeslash = ' ';
      }
      this.newlinedefault = this.newline;
      this.prettydefault = this.pretty;
      ref = options.writer || {};
      for (key in ref) {
        if (!hasProp.call(ref, key)) continue;
        value = ref[key];
        this[key] = value;
      }
      return this;
    };

    XMLWriterBase.prototype.space = function (level) {
      var indent;
      if (this.pretty) {
        indent = (level || 0) + this.offset + 1;
        if (indent > 0) {
          return new Array(indent).join(this.indent);
        } else {
          return '';
        }
      } else {
        return '';
      }
    };

    return XMLWriterBase;
  }();
}).call(this);

/***/ }),
/* 61 */
/***/ (function(module, exports) {

// Generated by CoffeeScript 1.12.7
(function () {
  "use strict";

  var prefixMatch;

  prefixMatch = new RegExp(/(?!xmlns)^.*:/);

  exports.normalize = function (str) {
    return str.toLowerCase();
  };

  exports.firstCharLowerCase = function (str) {
    return str.charAt(0).toLowerCase() + str.slice(1);
  };

  exports.stripPrefix = function (str) {
    return str.replace(prefixMatch, '');
  };

  exports.parseNumbers = function (str) {
    if (!isNaN(str)) {
      str = str % 1 === 0 ? parseInt(str, 10) : parseFloat(str);
    }
    return str;
  };

  exports.parseBooleans = function (str) {
    if (/^(?:true|false)$/i.test(str)) {
      str = str.toLowerCase() === 'true';
    }
    return str;
  };
}).call(this);

/***/ }),
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_App_App__ = __webpack_require__(84);




__WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__pages_App_App__["a" /* default */], null), document.getElementById('app'));

/***/ }),
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_flux_utils__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_flux_utils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_flux_utils__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__FluxContainerConverter__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__FluxContainerConverter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__FluxContainerConverter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__stores_appStore__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__actions_AppAction__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_AppBody_AppBody__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_Note_Note__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_Complete_Complete__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_Products_Products__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_Tabs_Tabs__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_Contents_Contents__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_GlobalHeader_GlobalHeader__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_GlobalFooter_GlobalFooter__ = __webpack_require__(136);
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
/* 85 */
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

var FluxContainerSubscriptions = __webpack_require__(86);
var React = __webpack_require__(0);

var invariant = __webpack_require__(2);
var shallowEqual = __webpack_require__(38);

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
/* 86 */
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

var FluxStoreGroup = __webpack_require__(54);

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
/* 87 */
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



var FluxStoreGroup = __webpack_require__(54);

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
/* 88 */
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

var FluxStore = __webpack_require__(55);

var abstractMethod = __webpack_require__(93);
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
/* 89 */
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
  EventEmitter: __webpack_require__(90),
  EmitterSubscription: __webpack_require__(56)
};

module.exports = fbemitter;

/***/ }),
/* 90 */
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

var EmitterSubscription = __webpack_require__(56);
var EventSubscriptionVendor = __webpack_require__(92);

var emptyFunction = __webpack_require__(7);
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
/* 91 */
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
/* 92 */
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
/* 93 */
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
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_flux_utils__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_flux_utils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_flux_utils__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dispatcher__ = __webpack_require__(9);
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
          token: '',
          findingApi: '',
          tradingApi: ''
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
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

module.exports.Dispatcher = __webpack_require__(96);

/***/ }),
/* 96 */
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
/* 97 */
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(98)(module)))

/***/ }),
/* 98 */
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
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.6
(function () {
  var XMLDocument,
      XMLNode,
      XMLStringWriter,
      XMLStringifier,
      isPlainObject,
      extend = function extend(child, parent) {
    for (var key in parent) {
      if (hasProp.call(parent, key)) child[key] = parent[key];
    }function ctor() {
      this.constructor = child;
    }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
  },
      hasProp = {}.hasOwnProperty;

  isPlainObject = __webpack_require__(10).isPlainObject;

  XMLNode = __webpack_require__(5);

  XMLStringifier = __webpack_require__(59);

  XMLStringWriter = __webpack_require__(39);

  module.exports = XMLDocument = function (superClass) {
    extend(XMLDocument, superClass);

    function XMLDocument(options) {
      XMLDocument.__super__.constructor.call(this, null);
      options || (options = {});
      if (!options.writer) {
        options.writer = new XMLStringWriter();
      }
      this.options = options;
      this.stringify = new XMLStringifier(options);
      this.isDocument = true;
    }

    XMLDocument.prototype.end = function (writer) {
      var writerOptions;
      if (!writer) {
        writer = this.options.writer;
      } else if (isPlainObject(writer)) {
        writerOptions = writer;
        writer = this.options.writer.set(writerOptions);
      }
      return writer.document(this);
    };

    XMLDocument.prototype.toString = function (options) {
      return this.options.writer.set(options).document(this);
    };

    return XMLDocument;
  }(XMLNode);
}).call(this);

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.6
(function () {
  var XMLAttribute,
      XMLCData,
      XMLComment,
      XMLDTDAttList,
      XMLDTDElement,
      XMLDTDEntity,
      XMLDTDNotation,
      XMLDeclaration,
      XMLDocType,
      XMLDocumentCB,
      XMLElement,
      XMLProcessingInstruction,
      XMLRaw,
      XMLStringWriter,
      XMLStringifier,
      XMLText,
      isFunction,
      isObject,
      isPlainObject,
      ref,
      hasProp = {}.hasOwnProperty;

  ref = __webpack_require__(10), isObject = ref.isObject, isFunction = ref.isFunction, isPlainObject = ref.isPlainObject;

  XMLElement = __webpack_require__(20);

  XMLCData = __webpack_require__(21);

  XMLComment = __webpack_require__(22);

  XMLRaw = __webpack_require__(29);

  XMLText = __webpack_require__(30);

  XMLProcessingInstruction = __webpack_require__(31);

  XMLDeclaration = __webpack_require__(23);

  XMLDocType = __webpack_require__(24);

  XMLDTDAttList = __webpack_require__(25);

  XMLDTDEntity = __webpack_require__(26);

  XMLDTDElement = __webpack_require__(27);

  XMLDTDNotation = __webpack_require__(28);

  XMLAttribute = __webpack_require__(58);

  XMLStringifier = __webpack_require__(59);

  XMLStringWriter = __webpack_require__(39);

  module.exports = XMLDocumentCB = function () {
    function XMLDocumentCB(options, onData, onEnd) {
      var writerOptions;
      options || (options = {});
      if (!options.writer) {
        options.writer = new XMLStringWriter(options);
      } else if (isPlainObject(options.writer)) {
        writerOptions = options.writer;
        options.writer = new XMLStringWriter(writerOptions);
      }
      this.options = options;
      this.writer = options.writer;
      this.stringify = new XMLStringifier(options);
      this.onDataCallback = onData || function () {};
      this.onEndCallback = onEnd || function () {};
      this.currentNode = null;
      this.currentLevel = -1;
      this.openTags = {};
      this.documentStarted = false;
      this.documentCompleted = false;
      this.root = null;
    }

    XMLDocumentCB.prototype.node = function (name, attributes, text) {
      var ref1;
      if (name == null) {
        throw new Error("Missing node name");
      }
      if (this.root && this.currentLevel === -1) {
        throw new Error("Document can only have one root node");
      }
      this.openCurrent();
      name = name.valueOf();
      if (attributes == null) {
        attributes = {};
      }
      attributes = attributes.valueOf();
      if (!isObject(attributes)) {
        ref1 = [attributes, text], text = ref1[0], attributes = ref1[1];
      }
      this.currentNode = new XMLElement(this, name, attributes);
      this.currentNode.children = false;
      this.currentLevel++;
      this.openTags[this.currentLevel] = this.currentNode;
      if (text != null) {
        this.text(text);
      }
      return this;
    };

    XMLDocumentCB.prototype.element = function (name, attributes, text) {
      if (this.currentNode && this.currentNode instanceof XMLDocType) {
        return this.dtdElement.apply(this, arguments);
      } else {
        return this.node(name, attributes, text);
      }
    };

    XMLDocumentCB.prototype.attribute = function (name, value) {
      var attName, attValue;
      if (!this.currentNode || this.currentNode.children) {
        throw new Error("att() can only be used immediately after an ele() call in callback mode");
      }
      if (name != null) {
        name = name.valueOf();
      }
      if (isObject(name)) {
        for (attName in name) {
          if (!hasProp.call(name, attName)) continue;
          attValue = name[attName];
          this.attribute(attName, attValue);
        }
      } else {
        if (isFunction(value)) {
          value = value.apply();
        }
        if (!this.options.skipNullAttributes || value != null) {
          this.currentNode.attributes[name] = new XMLAttribute(this, name, value);
        }
      }
      return this;
    };

    XMLDocumentCB.prototype.text = function (value) {
      var node;
      this.openCurrent();
      node = new XMLText(this, value);
      this.onData(this.writer.text(node, this.currentLevel + 1));
      return this;
    };

    XMLDocumentCB.prototype.cdata = function (value) {
      var node;
      this.openCurrent();
      node = new XMLCData(this, value);
      this.onData(this.writer.cdata(node, this.currentLevel + 1));
      return this;
    };

    XMLDocumentCB.prototype.comment = function (value) {
      var node;
      this.openCurrent();
      node = new XMLComment(this, value);
      this.onData(this.writer.comment(node, this.currentLevel + 1));
      return this;
    };

    XMLDocumentCB.prototype.raw = function (value) {
      var node;
      this.openCurrent();
      node = new XMLRaw(this, value);
      this.onData(this.writer.raw(node, this.currentLevel + 1));
      return this;
    };

    XMLDocumentCB.prototype.instruction = function (target, value) {
      var i, insTarget, insValue, len, node;
      this.openCurrent();
      if (target != null) {
        target = target.valueOf();
      }
      if (value != null) {
        value = value.valueOf();
      }
      if (Array.isArray(target)) {
        for (i = 0, len = target.length; i < len; i++) {
          insTarget = target[i];
          this.instruction(insTarget);
        }
      } else if (isObject(target)) {
        for (insTarget in target) {
          if (!hasProp.call(target, insTarget)) continue;
          insValue = target[insTarget];
          this.instruction(insTarget, insValue);
        }
      } else {
        if (isFunction(value)) {
          value = value.apply();
        }
        node = new XMLProcessingInstruction(this, target, value);
        this.onData(this.writer.processingInstruction(node, this.currentLevel + 1));
      }
      return this;
    };

    XMLDocumentCB.prototype.declaration = function (version, encoding, standalone) {
      var node;
      this.openCurrent();
      if (this.documentStarted) {
        throw new Error("declaration() must be the first node");
      }
      node = new XMLDeclaration(this, version, encoding, standalone);
      this.onData(this.writer.declaration(node, this.currentLevel + 1));
      return this;
    };

    XMLDocumentCB.prototype.doctype = function (root, pubID, sysID) {
      this.openCurrent();
      if (root == null) {
        throw new Error("Missing root node name");
      }
      if (this.root) {
        throw new Error("dtd() must come before the root node");
      }
      this.currentNode = new XMLDocType(this, pubID, sysID);
      this.currentNode.rootNodeName = root;
      this.currentNode.children = false;
      this.currentLevel++;
      this.openTags[this.currentLevel] = this.currentNode;
      return this;
    };

    XMLDocumentCB.prototype.dtdElement = function (name, value) {
      var node;
      this.openCurrent();
      node = new XMLDTDElement(this, name, value);
      this.onData(this.writer.dtdElement(node, this.currentLevel + 1));
      return this;
    };

    XMLDocumentCB.prototype.attList = function (elementName, attributeName, attributeType, defaultValueType, defaultValue) {
      var node;
      this.openCurrent();
      node = new XMLDTDAttList(this, elementName, attributeName, attributeType, defaultValueType, defaultValue);
      this.onData(this.writer.dtdAttList(node, this.currentLevel + 1));
      return this;
    };

    XMLDocumentCB.prototype.entity = function (name, value) {
      var node;
      this.openCurrent();
      node = new XMLDTDEntity(this, false, name, value);
      this.onData(this.writer.dtdEntity(node, this.currentLevel + 1));
      return this;
    };

    XMLDocumentCB.prototype.pEntity = function (name, value) {
      var node;
      this.openCurrent();
      node = new XMLDTDEntity(this, true, name, value);
      this.onData(this.writer.dtdEntity(node, this.currentLevel + 1));
      return this;
    };

    XMLDocumentCB.prototype.notation = function (name, value) {
      var node;
      this.openCurrent();
      node = new XMLDTDNotation(this, name, value);
      this.onData(this.writer.dtdNotation(node, this.currentLevel + 1));
      return this;
    };

    XMLDocumentCB.prototype.up = function () {
      if (this.currentLevel < 0) {
        throw new Error("The document node has no parent");
      }
      if (this.currentNode) {
        if (this.currentNode.children) {
          this.closeNode(this.currentNode);
        } else {
          this.openNode(this.currentNode);
        }
        this.currentNode = null;
      } else {
        this.closeNode(this.openTags[this.currentLevel]);
      }
      delete this.openTags[this.currentLevel];
      this.currentLevel--;
      return this;
    };

    XMLDocumentCB.prototype.end = function () {
      while (this.currentLevel >= 0) {
        this.up();
      }
      return this.onEnd();
    };

    XMLDocumentCB.prototype.openCurrent = function () {
      if (this.currentNode) {
        this.currentNode.children = true;
        return this.openNode(this.currentNode);
      }
    };

    XMLDocumentCB.prototype.openNode = function (node) {
      if (!node.isOpen) {
        if (!this.root && this.currentLevel === 0 && node instanceof XMLElement) {
          this.root = node;
        }
        this.onData(this.writer.openNode(node, this.currentLevel));
        return node.isOpen = true;
      }
    };

    XMLDocumentCB.prototype.closeNode = function (node) {
      if (!node.isClosed) {
        this.onData(this.writer.closeNode(node, this.currentLevel));
        return node.isClosed = true;
      }
    };

    XMLDocumentCB.prototype.onData = function (chunk) {
      this.documentStarted = true;
      return this.onDataCallback(chunk);
    };

    XMLDocumentCB.prototype.onEnd = function () {
      this.documentCompleted = true;
      return this.onEndCallback();
    };

    XMLDocumentCB.prototype.ele = function () {
      return this.element.apply(this, arguments);
    };

    XMLDocumentCB.prototype.nod = function (name, attributes, text) {
      return this.node(name, attributes, text);
    };

    XMLDocumentCB.prototype.txt = function (value) {
      return this.text(value);
    };

    XMLDocumentCB.prototype.dat = function (value) {
      return this.cdata(value);
    };

    XMLDocumentCB.prototype.com = function (value) {
      return this.comment(value);
    };

    XMLDocumentCB.prototype.ins = function (target, value) {
      return this.instruction(target, value);
    };

    XMLDocumentCB.prototype.dec = function (version, encoding, standalone) {
      return this.declaration(version, encoding, standalone);
    };

    XMLDocumentCB.prototype.dtd = function (root, pubID, sysID) {
      return this.doctype(root, pubID, sysID);
    };

    XMLDocumentCB.prototype.e = function (name, attributes, text) {
      return this.element(name, attributes, text);
    };

    XMLDocumentCB.prototype.n = function (name, attributes, text) {
      return this.node(name, attributes, text);
    };

    XMLDocumentCB.prototype.t = function (value) {
      return this.text(value);
    };

    XMLDocumentCB.prototype.d = function (value) {
      return this.cdata(value);
    };

    XMLDocumentCB.prototype.c = function (value) {
      return this.comment(value);
    };

    XMLDocumentCB.prototype.r = function (value) {
      return this.raw(value);
    };

    XMLDocumentCB.prototype.i = function (target, value) {
      return this.instruction(target, value);
    };

    XMLDocumentCB.prototype.att = function () {
      if (this.currentNode && this.currentNode instanceof XMLDocType) {
        return this.attList.apply(this, arguments);
      } else {
        return this.attribute.apply(this, arguments);
      }
    };

    XMLDocumentCB.prototype.a = function () {
      if (this.currentNode && this.currentNode instanceof XMLDocType) {
        return this.attList.apply(this, arguments);
      } else {
        return this.attribute.apply(this, arguments);
      }
    };

    XMLDocumentCB.prototype.ent = function (name, value) {
      return this.entity(name, value);
    };

    XMLDocumentCB.prototype.pent = function (name, value) {
      return this.pEntity(name, value);
    };

    XMLDocumentCB.prototype.not = function (name, value) {
      return this.notation(name, value);
    };

    return XMLDocumentCB;
  }();
}).call(this);

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.6
(function () {
  var XMLCData,
      XMLComment,
      XMLDTDAttList,
      XMLDTDElement,
      XMLDTDEntity,
      XMLDTDNotation,
      XMLDeclaration,
      XMLDocType,
      XMLElement,
      XMLProcessingInstruction,
      XMLRaw,
      XMLStreamWriter,
      XMLText,
      XMLWriterBase,
      extend = function extend(child, parent) {
    for (var key in parent) {
      if (hasProp.call(parent, key)) child[key] = parent[key];
    }function ctor() {
      this.constructor = child;
    }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
  },
      hasProp = {}.hasOwnProperty;

  XMLDeclaration = __webpack_require__(23);

  XMLDocType = __webpack_require__(24);

  XMLCData = __webpack_require__(21);

  XMLComment = __webpack_require__(22);

  XMLElement = __webpack_require__(20);

  XMLRaw = __webpack_require__(29);

  XMLText = __webpack_require__(30);

  XMLProcessingInstruction = __webpack_require__(31);

  XMLDTDAttList = __webpack_require__(25);

  XMLDTDElement = __webpack_require__(27);

  XMLDTDEntity = __webpack_require__(26);

  XMLDTDNotation = __webpack_require__(28);

  XMLWriterBase = __webpack_require__(60);

  module.exports = XMLStreamWriter = function (superClass) {
    extend(XMLStreamWriter, superClass);

    function XMLStreamWriter(stream, options) {
      this.stream = stream;
      XMLStreamWriter.__super__.constructor.call(this, options);
    }

    XMLStreamWriter.prototype.document = function (doc) {
      var child, i, j, len, len1, ref, ref1, results;
      ref = doc.children;
      for (i = 0, len = ref.length; i < len; i++) {
        child = ref[i];
        child.isLastRootNode = false;
      }
      doc.children[doc.children.length - 1].isLastRootNode = true;
      ref1 = doc.children;
      results = [];
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        child = ref1[j];
        switch (false) {
          case !(child instanceof XMLDeclaration):
            results.push(this.declaration(child));
            break;
          case !(child instanceof XMLDocType):
            results.push(this.docType(child));
            break;
          case !(child instanceof XMLComment):
            results.push(this.comment(child));
            break;
          case !(child instanceof XMLProcessingInstruction):
            results.push(this.processingInstruction(child));
            break;
          default:
            results.push(this.element(child));
        }
      }
      return results;
    };

    XMLStreamWriter.prototype.attribute = function (att) {
      return this.stream.write(' ' + att.name + '="' + att.value + '"');
    };

    XMLStreamWriter.prototype.cdata = function (node, level) {
      return this.stream.write(this.space(level) + '<![CDATA[' + node.text + ']]>' + this.endline(node));
    };

    XMLStreamWriter.prototype.comment = function (node, level) {
      return this.stream.write(this.space(level) + '<!-- ' + node.text + ' -->' + this.endline(node));
    };

    XMLStreamWriter.prototype.declaration = function (node, level) {
      this.stream.write(this.space(level));
      this.stream.write('<?xml version="' + node.version + '"');
      if (node.encoding != null) {
        this.stream.write(' encoding="' + node.encoding + '"');
      }
      if (node.standalone != null) {
        this.stream.write(' standalone="' + node.standalone + '"');
      }
      this.stream.write(this.spacebeforeslash + '?>');
      return this.stream.write(this.endline(node));
    };

    XMLStreamWriter.prototype.docType = function (node, level) {
      var child, i, len, ref;
      level || (level = 0);
      this.stream.write(this.space(level));
      this.stream.write('<!DOCTYPE ' + node.root().name);
      if (node.pubID && node.sysID) {
        this.stream.write(' PUBLIC "' + node.pubID + '" "' + node.sysID + '"');
      } else if (node.sysID) {
        this.stream.write(' SYSTEM "' + node.sysID + '"');
      }
      if (node.children.length > 0) {
        this.stream.write(' [');
        this.stream.write(this.endline(node));
        ref = node.children;
        for (i = 0, len = ref.length; i < len; i++) {
          child = ref[i];
          switch (false) {
            case !(child instanceof XMLDTDAttList):
              this.dtdAttList(child, level + 1);
              break;
            case !(child instanceof XMLDTDElement):
              this.dtdElement(child, level + 1);
              break;
            case !(child instanceof XMLDTDEntity):
              this.dtdEntity(child, level + 1);
              break;
            case !(child instanceof XMLDTDNotation):
              this.dtdNotation(child, level + 1);
              break;
            case !(child instanceof XMLCData):
              this.cdata(child, level + 1);
              break;
            case !(child instanceof XMLComment):
              this.comment(child, level + 1);
              break;
            case !(child instanceof XMLProcessingInstruction):
              this.processingInstruction(child, level + 1);
              break;
            default:
              throw new Error("Unknown DTD node type: " + child.constructor.name);
          }
        }
        this.stream.write(']');
      }
      this.stream.write(this.spacebeforeslash + '>');
      return this.stream.write(this.endline(node));
    };

    XMLStreamWriter.prototype.element = function (node, level) {
      var att, child, i, len, name, ref, ref1, space;
      level || (level = 0);
      space = this.space(level);
      this.stream.write(space + '<' + node.name);
      ref = node.attributes;
      for (name in ref) {
        if (!hasProp.call(ref, name)) continue;
        att = ref[name];
        this.attribute(att);
      }
      if (node.children.length === 0 || node.children.every(function (e) {
        return e.value === '';
      })) {
        if (this.allowEmpty) {
          this.stream.write('></' + node.name + '>');
        } else {
          this.stream.write(this.spacebeforeslash + '/>');
        }
      } else if (this.pretty && node.children.length === 1 && node.children[0].value != null) {
        this.stream.write('>');
        this.stream.write(node.children[0].value);
        this.stream.write('</' + node.name + '>');
      } else {
        this.stream.write('>' + this.newline);
        ref1 = node.children;
        for (i = 0, len = ref1.length; i < len; i++) {
          child = ref1[i];
          switch (false) {
            case !(child instanceof XMLCData):
              this.cdata(child, level + 1);
              break;
            case !(child instanceof XMLComment):
              this.comment(child, level + 1);
              break;
            case !(child instanceof XMLElement):
              this.element(child, level + 1);
              break;
            case !(child instanceof XMLRaw):
              this.raw(child, level + 1);
              break;
            case !(child instanceof XMLText):
              this.text(child, level + 1);
              break;
            case !(child instanceof XMLProcessingInstruction):
              this.processingInstruction(child, level + 1);
              break;
            default:
              throw new Error("Unknown XML node type: " + child.constructor.name);
          }
        }
        this.stream.write(space + '</' + node.name + '>');
      }
      return this.stream.write(this.endline(node));
    };

    XMLStreamWriter.prototype.processingInstruction = function (node, level) {
      this.stream.write(this.space(level) + '<?' + node.target);
      if (node.value) {
        this.stream.write(' ' + node.value);
      }
      return this.stream.write(this.spacebeforeslash + '?>' + this.endline(node));
    };

    XMLStreamWriter.prototype.raw = function (node, level) {
      return this.stream.write(this.space(level) + node.value + this.endline(node));
    };

    XMLStreamWriter.prototype.text = function (node, level) {
      return this.stream.write(this.space(level) + node.value + this.endline(node));
    };

    XMLStreamWriter.prototype.dtdAttList = function (node, level) {
      this.stream.write(this.space(level) + '<!ATTLIST ' + node.elementName + ' ' + node.attributeName + ' ' + node.attributeType);
      if (node.defaultValueType !== '#DEFAULT') {
        this.stream.write(' ' + node.defaultValueType);
      }
      if (node.defaultValue) {
        this.stream.write(' "' + node.defaultValue + '"');
      }
      return this.stream.write(this.spacebeforeslash + '>' + this.endline(node));
    };

    XMLStreamWriter.prototype.dtdElement = function (node, level) {
      this.stream.write(this.space(level) + '<!ELEMENT ' + node.name + ' ' + node.value);
      return this.stream.write(this.spacebeforeslash + '>' + this.endline(node));
    };

    XMLStreamWriter.prototype.dtdEntity = function (node, level) {
      this.stream.write(this.space(level) + '<!ENTITY');
      if (node.pe) {
        this.stream.write(' %');
      }
      this.stream.write(' ' + node.name);
      if (node.value) {
        this.stream.write(' "' + node.value + '"');
      } else {
        if (node.pubID && node.sysID) {
          this.stream.write(' PUBLIC "' + node.pubID + '" "' + node.sysID + '"');
        } else if (node.sysID) {
          this.stream.write(' SYSTEM "' + node.sysID + '"');
        }
        if (node.nData) {
          this.stream.write(' NDATA ' + node.nData);
        }
      }
      return this.stream.write(this.spacebeforeslash + '>' + this.endline(node));
    };

    XMLStreamWriter.prototype.dtdNotation = function (node, level) {
      this.stream.write(this.space(level) + '<!NOTATION ' + node.name);
      if (node.pubID && node.sysID) {
        this.stream.write(' PUBLIC "' + node.pubID + '" "' + node.sysID + '"');
      } else if (node.pubID) {
        this.stream.write(' PUBLIC "' + node.pubID + '"');
      } else if (node.sysID) {
        this.stream.write(' SYSTEM "' + node.sysID + '"');
      }
      return this.stream.write(this.spacebeforeslash + '>' + this.endline(node));
    };

    XMLStreamWriter.prototype.endline = function (node) {
      if (!node.isLastRootNode) {
        return this.newline;
      } else {
        return '';
      }
    };

    return XMLStreamWriter;
  }(XMLWriterBase);
}).call(this);

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function () {
  "use strict";

  var builder,
      defaults,
      parser,
      processors,
      extend = function extend(child, parent) {
    for (var key in parent) {
      if (hasProp.call(parent, key)) child[key] = parent[key];
    }function ctor() {
      this.constructor = child;
    }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
  },
      hasProp = {}.hasOwnProperty;

  defaults = __webpack_require__(40);

  builder = __webpack_require__(103);

  parser = __webpack_require__(104);

  processors = __webpack_require__(61);

  exports.defaults = defaults.defaults;

  exports.processors = processors;

  exports.ValidationError = function (superClass) {
    extend(ValidationError, superClass);

    function ValidationError(message) {
      this.message = message;
    }

    return ValidationError;
  }(Error);

  exports.Builder = builder.Builder;

  exports.Parser = parser.Parser;

  exports.parseString = parser.parseString;
}).call(this);

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// Generated by CoffeeScript 1.12.7
(function () {
  "use strict";

  var builder,
      defaults,
      escapeCDATA,
      requiresCDATA,
      wrapCDATA,
      hasProp = {}.hasOwnProperty;

  builder = __webpack_require__(57);

  defaults = __webpack_require__(40).defaults;

  requiresCDATA = function requiresCDATA(entry) {
    return typeof entry === "string" && (entry.indexOf('&') >= 0 || entry.indexOf('>') >= 0 || entry.indexOf('<') >= 0);
  };

  wrapCDATA = function wrapCDATA(entry) {
    return "<![CDATA[" + escapeCDATA(entry) + "]]>";
  };

  escapeCDATA = function escapeCDATA(entry) {
    return entry.replace(']]>', ']]]]><![CDATA[>');
  };

  exports.Builder = function () {
    function Builder(opts) {
      var key, ref, value;
      this.options = {};
      ref = defaults["0.2"];
      for (key in ref) {
        if (!hasProp.call(ref, key)) continue;
        value = ref[key];
        this.options[key] = value;
      }
      for (key in opts) {
        if (!hasProp.call(opts, key)) continue;
        value = opts[key];
        this.options[key] = value;
      }
    }

    Builder.prototype.buildObject = function (rootObj) {
      var attrkey, charkey, render, rootElement, rootName;
      attrkey = this.options.attrkey;
      charkey = this.options.charkey;
      if (Object.keys(rootObj).length === 1 && this.options.rootName === defaults['0.2'].rootName) {
        rootName = Object.keys(rootObj)[0];
        rootObj = rootObj[rootName];
      } else {
        rootName = this.options.rootName;
      }
      render = function (_this) {
        return function (element, obj) {
          var attr, child, entry, index, key, value;
          if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') {
            if (_this.options.cdata && requiresCDATA(obj)) {
              element.raw(wrapCDATA(obj));
            } else {
              element.txt(obj);
            }
          } else if (Array.isArray(obj)) {
            for (index in obj) {
              if (!hasProp.call(obj, index)) continue;
              child = obj[index];
              for (key in child) {
                entry = child[key];
                element = render(element.ele(key), entry).up();
              }
            }
          } else {
            for (key in obj) {
              if (!hasProp.call(obj, key)) continue;
              child = obj[key];
              if (key === attrkey) {
                if ((typeof child === 'undefined' ? 'undefined' : _typeof(child)) === "object") {
                  for (attr in child) {
                    value = child[attr];
                    element = element.att(attr, value);
                  }
                }
              } else if (key === charkey) {
                if (_this.options.cdata && requiresCDATA(child)) {
                  element = element.raw(wrapCDATA(child));
                } else {
                  element = element.txt(child);
                }
              } else if (Array.isArray(child)) {
                for (index in child) {
                  if (!hasProp.call(child, index)) continue;
                  entry = child[index];
                  if (typeof entry === 'string') {
                    if (_this.options.cdata && requiresCDATA(entry)) {
                      element = element.ele(key).raw(wrapCDATA(entry)).up();
                    } else {
                      element = element.ele(key, entry).up();
                    }
                  } else {
                    element = render(element.ele(key), entry).up();
                  }
                }
              } else if ((typeof child === 'undefined' ? 'undefined' : _typeof(child)) === "object") {
                element = render(element.ele(key), child).up();
              } else {
                if (typeof child === 'string' && _this.options.cdata && requiresCDATA(child)) {
                  element = element.ele(key).raw(wrapCDATA(child)).up();
                } else {
                  if (child == null) {
                    child = '';
                  }
                  element = element.ele(key, child.toString()).up();
                }
              }
            }
          }
          return element;
        };
      }(this);
      rootElement = builder.create(rootName, this.options.xmldec, this.options.doctype, {
        headless: this.options.headless,
        allowSurrogateChars: this.options.allowSurrogateChars
      });
      return render(rootElement, rootObj).end(this.options.renderOpts);
    };

    return Builder;
  }();
}).call(this);

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// Generated by CoffeeScript 1.12.7
(function () {
  "use strict";

  var bom,
      defaults,
      events,
      isEmpty,
      processItem,
      processors,
      sax,
      setImmediate,
      bind = function bind(fn, me) {
    return function () {
      return fn.apply(me, arguments);
    };
  },
      extend = function extend(child, parent) {
    for (var key in parent) {
      if (hasProp.call(parent, key)) child[key] = parent[key];
    }function ctor() {
      this.constructor = child;
    }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
  },
      hasProp = {}.hasOwnProperty;

  sax = __webpack_require__(105);

  events = __webpack_require__(108);

  bom = __webpack_require__(109);

  processors = __webpack_require__(61);

  setImmediate = __webpack_require__(110).setImmediate;

  defaults = __webpack_require__(40).defaults;

  isEmpty = function isEmpty(thing) {
    return (typeof thing === 'undefined' ? 'undefined' : _typeof(thing)) === "object" && thing != null && Object.keys(thing).length === 0;
  };

  processItem = function processItem(processors, item, key) {
    var i, len, process;
    for (i = 0, len = processors.length; i < len; i++) {
      process = processors[i];
      item = process(item, key);
    }
    return item;
  };

  exports.Parser = function (superClass) {
    extend(Parser, superClass);

    function Parser(opts) {
      this.parseString = bind(this.parseString, this);
      this.reset = bind(this.reset, this);
      this.assignOrPush = bind(this.assignOrPush, this);
      this.processAsync = bind(this.processAsync, this);
      var key, ref, value;
      if (!(this instanceof exports.Parser)) {
        return new exports.Parser(opts);
      }
      this.options = {};
      ref = defaults["0.2"];
      for (key in ref) {
        if (!hasProp.call(ref, key)) continue;
        value = ref[key];
        this.options[key] = value;
      }
      for (key in opts) {
        if (!hasProp.call(opts, key)) continue;
        value = opts[key];
        this.options[key] = value;
      }
      if (this.options.xmlns) {
        this.options.xmlnskey = this.options.attrkey + "ns";
      }
      if (this.options.normalizeTags) {
        if (!this.options.tagNameProcessors) {
          this.options.tagNameProcessors = [];
        }
        this.options.tagNameProcessors.unshift(processors.normalize);
      }
      this.reset();
    }

    Parser.prototype.processAsync = function () {
      var chunk, err;
      try {
        if (this.remaining.length <= this.options.chunkSize) {
          chunk = this.remaining;
          this.remaining = '';
          this.saxParser = this.saxParser.write(chunk);
          return this.saxParser.close();
        } else {
          chunk = this.remaining.substr(0, this.options.chunkSize);
          this.remaining = this.remaining.substr(this.options.chunkSize, this.remaining.length);
          this.saxParser = this.saxParser.write(chunk);
          return setImmediate(this.processAsync);
        }
      } catch (error1) {
        err = error1;
        if (!this.saxParser.errThrown) {
          this.saxParser.errThrown = true;
          return this.emit(err);
        }
      }
    };

    Parser.prototype.assignOrPush = function (obj, key, newValue) {
      if (!(key in obj)) {
        if (!this.options.explicitArray) {
          return obj[key] = newValue;
        } else {
          return obj[key] = [newValue];
        }
      } else {
        if (!(obj[key] instanceof Array)) {
          obj[key] = [obj[key]];
        }
        return obj[key].push(newValue);
      }
    };

    Parser.prototype.reset = function () {
      var attrkey, charkey, ontext, stack;
      this.removeAllListeners();
      this.saxParser = sax.parser(this.options.strict, {
        trim: false,
        normalize: false,
        xmlns: this.options.xmlns
      });
      this.saxParser.errThrown = false;
      this.saxParser.onerror = function (_this) {
        return function (error) {
          _this.saxParser.resume();
          if (!_this.saxParser.errThrown) {
            _this.saxParser.errThrown = true;
            return _this.emit("error", error);
          }
        };
      }(this);
      this.saxParser.onend = function (_this) {
        return function () {
          if (!_this.saxParser.ended) {
            _this.saxParser.ended = true;
            return _this.emit("end", _this.resultObject);
          }
        };
      }(this);
      this.saxParser.ended = false;
      this.EXPLICIT_CHARKEY = this.options.explicitCharkey;
      this.resultObject = null;
      stack = [];
      attrkey = this.options.attrkey;
      charkey = this.options.charkey;
      this.saxParser.onopentag = function (_this) {
        return function (node) {
          var key, newValue, obj, processedKey, ref;
          obj = {};
          obj[charkey] = "";
          if (!_this.options.ignoreAttrs) {
            ref = node.attributes;
            for (key in ref) {
              if (!hasProp.call(ref, key)) continue;
              if (!(attrkey in obj) && !_this.options.mergeAttrs) {
                obj[attrkey] = {};
              }
              newValue = _this.options.attrValueProcessors ? processItem(_this.options.attrValueProcessors, node.attributes[key], key) : node.attributes[key];
              processedKey = _this.options.attrNameProcessors ? processItem(_this.options.attrNameProcessors, key) : key;
              if (_this.options.mergeAttrs) {
                _this.assignOrPush(obj, processedKey, newValue);
              } else {
                obj[attrkey][processedKey] = newValue;
              }
            }
          }
          obj["#name"] = _this.options.tagNameProcessors ? processItem(_this.options.tagNameProcessors, node.name) : node.name;
          if (_this.options.xmlns) {
            obj[_this.options.xmlnskey] = {
              uri: node.uri,
              local: node.local
            };
          }
          return stack.push(obj);
        };
      }(this);
      this.saxParser.onclosetag = function (_this) {
        return function () {
          var cdata, emptyStr, key, node, nodeName, obj, objClone, old, s, xpath;
          obj = stack.pop();
          nodeName = obj["#name"];
          if (!_this.options.explicitChildren || !_this.options.preserveChildrenOrder) {
            delete obj["#name"];
          }
          if (obj.cdata === true) {
            cdata = obj.cdata;
            delete obj.cdata;
          }
          s = stack[stack.length - 1];
          if (obj[charkey].match(/^\s*$/) && !cdata) {
            emptyStr = obj[charkey];
            delete obj[charkey];
          } else {
            if (_this.options.trim) {
              obj[charkey] = obj[charkey].trim();
            }
            if (_this.options.normalize) {
              obj[charkey] = obj[charkey].replace(/\s{2,}/g, " ").trim();
            }
            obj[charkey] = _this.options.valueProcessors ? processItem(_this.options.valueProcessors, obj[charkey], nodeName) : obj[charkey];
            if (Object.keys(obj).length === 1 && charkey in obj && !_this.EXPLICIT_CHARKEY) {
              obj = obj[charkey];
            }
          }
          if (isEmpty(obj)) {
            obj = _this.options.emptyTag !== '' ? _this.options.emptyTag : emptyStr;
          }
          if (_this.options.validator != null) {
            xpath = "/" + function () {
              var i, len, results;
              results = [];
              for (i = 0, len = stack.length; i < len; i++) {
                node = stack[i];
                results.push(node["#name"]);
              }
              return results;
            }().concat(nodeName).join("/");
            (function () {
              var err;
              try {
                return obj = _this.options.validator(xpath, s && s[nodeName], obj);
              } catch (error1) {
                err = error1;
                return _this.emit("error", err);
              }
            })();
          }
          if (_this.options.explicitChildren && !_this.options.mergeAttrs && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
            if (!_this.options.preserveChildrenOrder) {
              node = {};
              if (_this.options.attrkey in obj) {
                node[_this.options.attrkey] = obj[_this.options.attrkey];
                delete obj[_this.options.attrkey];
              }
              if (!_this.options.charsAsChildren && _this.options.charkey in obj) {
                node[_this.options.charkey] = obj[_this.options.charkey];
                delete obj[_this.options.charkey];
              }
              if (Object.getOwnPropertyNames(obj).length > 0) {
                node[_this.options.childkey] = obj;
              }
              obj = node;
            } else if (s) {
              s[_this.options.childkey] = s[_this.options.childkey] || [];
              objClone = {};
              for (key in obj) {
                if (!hasProp.call(obj, key)) continue;
                objClone[key] = obj[key];
              }
              s[_this.options.childkey].push(objClone);
              delete obj["#name"];
              if (Object.keys(obj).length === 1 && charkey in obj && !_this.EXPLICIT_CHARKEY) {
                obj = obj[charkey];
              }
            }
          }
          if (stack.length > 0) {
            return _this.assignOrPush(s, nodeName, obj);
          } else {
            if (_this.options.explicitRoot) {
              old = obj;
              obj = {};
              obj[nodeName] = old;
            }
            _this.resultObject = obj;
            _this.saxParser.ended = true;
            return _this.emit("end", _this.resultObject);
          }
        };
      }(this);
      ontext = function (_this) {
        return function (text) {
          var charChild, s;
          s = stack[stack.length - 1];
          if (s) {
            s[charkey] += text;
            if (_this.options.explicitChildren && _this.options.preserveChildrenOrder && _this.options.charsAsChildren && (_this.options.includeWhiteChars || text.replace(/\\n/g, '').trim() !== '')) {
              s[_this.options.childkey] = s[_this.options.childkey] || [];
              charChild = {
                '#name': '__text__'
              };
              charChild[charkey] = text;
              if (_this.options.normalize) {
                charChild[charkey] = charChild[charkey].replace(/\s{2,}/g, " ").trim();
              }
              s[_this.options.childkey].push(charChild);
            }
            return s;
          }
        };
      }(this);
      this.saxParser.ontext = ontext;
      return this.saxParser.oncdata = function (_this) {
        return function (text) {
          var s;
          s = ontext(text);
          if (s) {
            return s.cdata = true;
          }
        };
      }(this);
    };

    Parser.prototype.parseString = function (str, cb) {
      var err;
      if (cb != null && typeof cb === "function") {
        this.on("end", function (result) {
          this.reset();
          return cb(null, result);
        });
        this.on("error", function (err) {
          this.reset();
          return cb(err);
        });
      }
      try {
        str = str.toString();
        if (str.trim() === '') {
          this.emit("end", null);
          return true;
        }
        str = bom.stripBOM(str);
        if (this.options.async) {
          this.remaining = str;
          setImmediate(this.processAsync);
          return this.saxParser;
        }
        return this.saxParser.write(str).close();
      } catch (error1) {
        err = error1;
        if (!(this.saxParser.errThrown || this.saxParser.ended)) {
          this.emit('error', err);
          return this.saxParser.errThrown = true;
        } else if (this.saxParser.ended) {
          throw err;
        }
      }
    };

    return Parser;
  }(events.EventEmitter);

  exports.parseString = function (str, a, b) {
    var cb, options, parser;
    if (b != null) {
      if (typeof b === 'function') {
        cb = b;
      }
      if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object') {
        options = a;
      }
    } else {
      if (typeof a === 'function') {
        cb = a;
      }
      options = {};
    }
    parser = new exports.Parser(options);
    return parser.parseString(str, cb);
  };
}).call(this);

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function (sax) {
  // wrapper for non-node envs
  sax.parser = function (strict, opt) {
    return new SAXParser(strict, opt);
  };
  sax.SAXParser = SAXParser;
  sax.SAXStream = SAXStream;
  sax.createStream = createStream;

  // When we pass the MAX_BUFFER_LENGTH position, start checking for buffer overruns.
  // When we check, schedule the next check for MAX_BUFFER_LENGTH - (max(buffer lengths)),
  // since that's the earliest that a buffer overrun could occur.  This way, checks are
  // as rare as required, but as often as necessary to ensure never crossing this bound.
  // Furthermore, buffers are only tested at most once per write(), so passing a very
  // large string into write() might have undesirable effects, but this is manageable by
  // the caller, so it is assumed to be safe.  Thus, a call to write() may, in the extreme
  // edge case, result in creating at most one complete copy of the string passed in.
  // Set to Infinity to have unlimited buffers.
  sax.MAX_BUFFER_LENGTH = 64 * 1024;

  var buffers = ['comment', 'sgmlDecl', 'textNode', 'tagName', 'doctype', 'procInstName', 'procInstBody', 'entity', 'attribName', 'attribValue', 'cdata', 'script'];

  sax.EVENTS = ['text', 'processinginstruction', 'sgmldeclaration', 'doctype', 'comment', 'opentagstart', 'attribute', 'opentag', 'closetag', 'opencdata', 'cdata', 'closecdata', 'error', 'end', 'ready', 'script', 'opennamespace', 'closenamespace'];

  function SAXParser(strict, opt) {
    if (!(this instanceof SAXParser)) {
      return new SAXParser(strict, opt);
    }

    var parser = this;
    clearBuffers(parser);
    parser.q = parser.c = '';
    parser.bufferCheckPosition = sax.MAX_BUFFER_LENGTH;
    parser.opt = opt || {};
    parser.opt.lowercase = parser.opt.lowercase || parser.opt.lowercasetags;
    parser.looseCase = parser.opt.lowercase ? 'toLowerCase' : 'toUpperCase';
    parser.tags = [];
    parser.closed = parser.closedRoot = parser.sawRoot = false;
    parser.tag = parser.error = null;
    parser.strict = !!strict;
    parser.noscript = !!(strict || parser.opt.noscript);
    parser.state = S.BEGIN;
    parser.strictEntities = parser.opt.strictEntities;
    parser.ENTITIES = parser.strictEntities ? Object.create(sax.XML_ENTITIES) : Object.create(sax.ENTITIES);
    parser.attribList = [];

    // namespaces form a prototype chain.
    // it always points at the current tag,
    // which protos to its parent tag.
    if (parser.opt.xmlns) {
      parser.ns = Object.create(rootNS);
    }

    // mostly just for error reporting
    parser.trackPosition = parser.opt.position !== false;
    if (parser.trackPosition) {
      parser.position = parser.line = parser.column = 0;
    }
    emit(parser, 'onready');
  }

  if (!Object.create) {
    Object.create = function (o) {
      function F() {}
      F.prototype = o;
      var newf = new F();
      return newf;
    };
  }

  if (!Object.keys) {
    Object.keys = function (o) {
      var a = [];
      for (var i in o) {
        if (o.hasOwnProperty(i)) a.push(i);
      }return a;
    };
  }

  function checkBufferLength(parser) {
    var maxAllowed = Math.max(sax.MAX_BUFFER_LENGTH, 10);
    var maxActual = 0;
    for (var i = 0, l = buffers.length; i < l; i++) {
      var len = parser[buffers[i]].length;
      if (len > maxAllowed) {
        // Text/cdata nodes can get big, and since they're buffered,
        // we can get here under normal conditions.
        // Avoid issues by emitting the text node now,
        // so at least it won't get any bigger.
        switch (buffers[i]) {
          case 'textNode':
            closeText(parser);
            break;

          case 'cdata':
            emitNode(parser, 'oncdata', parser.cdata);
            parser.cdata = '';
            break;

          case 'script':
            emitNode(parser, 'onscript', parser.script);
            parser.script = '';
            break;

          default:
            error(parser, 'Max buffer length exceeded: ' + buffers[i]);
        }
      }
      maxActual = Math.max(maxActual, len);
    }
    // schedule the next check for the earliest possible buffer overrun.
    var m = sax.MAX_BUFFER_LENGTH - maxActual;
    parser.bufferCheckPosition = m + parser.position;
  }

  function clearBuffers(parser) {
    for (var i = 0, l = buffers.length; i < l; i++) {
      parser[buffers[i]] = '';
    }
  }

  function flushBuffers(parser) {
    closeText(parser);
    if (parser.cdata !== '') {
      emitNode(parser, 'oncdata', parser.cdata);
      parser.cdata = '';
    }
    if (parser.script !== '') {
      emitNode(parser, 'onscript', parser.script);
      parser.script = '';
    }
  }

  SAXParser.prototype = {
    end: function end() {
      _end(this);
    },
    write: write,
    resume: function resume() {
      this.error = null;return this;
    },
    close: function close() {
      return this.write(null);
    },
    flush: function flush() {
      flushBuffers(this);
    }
  };

  var Stream;
  try {
    Stream = __webpack_require__(106).Stream;
  } catch (ex) {
    Stream = function Stream() {};
  }

  var streamWraps = sax.EVENTS.filter(function (ev) {
    return ev !== 'error' && ev !== 'end';
  });

  function createStream(strict, opt) {
    return new SAXStream(strict, opt);
  }

  function SAXStream(strict, opt) {
    if (!(this instanceof SAXStream)) {
      return new SAXStream(strict, opt);
    }

    Stream.apply(this);

    this._parser = new SAXParser(strict, opt);
    this.writable = true;
    this.readable = true;

    var me = this;

    this._parser.onend = function () {
      me.emit('end');
    };

    this._parser.onerror = function (er) {
      me.emit('error', er);

      // if didn't throw, then means error was handled.
      // go ahead and clear error, so we can write again.
      me._parser.error = null;
    };

    this._decoder = null;

    streamWraps.forEach(function (ev) {
      Object.defineProperty(me, 'on' + ev, {
        get: function get() {
          return me._parser['on' + ev];
        },
        set: function set(h) {
          if (!h) {
            me.removeAllListeners(ev);
            me._parser['on' + ev] = h;
            return h;
          }
          me.on(ev, h);
        },
        enumerable: true,
        configurable: false
      });
    });
  }

  SAXStream.prototype = Object.create(Stream.prototype, {
    constructor: {
      value: SAXStream
    }
  });

  SAXStream.prototype.write = function (data) {
    if (typeof Buffer === 'function' && typeof Buffer.isBuffer === 'function' && Buffer.isBuffer(data)) {
      if (!this._decoder) {
        var SD = __webpack_require__(107).StringDecoder;
        this._decoder = new SD('utf8');
      }
      data = this._decoder.write(data);
    }

    this._parser.write(data.toString());
    this.emit('data', data);
    return true;
  };

  SAXStream.prototype.end = function (chunk) {
    if (chunk && chunk.length) {
      this.write(chunk);
    }
    this._parser.end();
    return true;
  };

  SAXStream.prototype.on = function (ev, handler) {
    var me = this;
    if (!me._parser['on' + ev] && streamWraps.indexOf(ev) !== -1) {
      me._parser['on' + ev] = function () {
        var args = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
        args.splice(0, 0, ev);
        me.emit.apply(me, args);
      };
    }

    return Stream.prototype.on.call(me, ev, handler);
  };

  // this really needs to be replaced with character classes.
  // XML allows all manner of ridiculous numbers and digits.
  var CDATA = '[CDATA[';
  var DOCTYPE = 'DOCTYPE';
  var XML_NAMESPACE = 'http://www.w3.org/XML/1998/namespace';
  var XMLNS_NAMESPACE = 'http://www.w3.org/2000/xmlns/';
  var rootNS = { xml: XML_NAMESPACE, xmlns: XMLNS_NAMESPACE

    // http://www.w3.org/TR/REC-xml/#NT-NameStartChar
    // This implementation works on strings, a single character at a time
    // as such, it cannot ever support astral-plane characters (10000-EFFFF)
    // without a significant breaking change to either this  parser, or the
    // JavaScript language.  Implementation of an emoji-capable xml parser
    // is left as an exercise for the reader.
  };var nameStart = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;

  var nameBody = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;

  var entityStart = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
  var entityBody = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;

  function isWhitespace(c) {
    return c === ' ' || c === '\n' || c === '\r' || c === '\t';
  }

  function isQuote(c) {
    return c === '"' || c === '\'';
  }

  function isAttribEnd(c) {
    return c === '>' || isWhitespace(c);
  }

  function isMatch(regex, c) {
    return regex.test(c);
  }

  function notMatch(regex, c) {
    return !isMatch(regex, c);
  }

  var S = 0;
  sax.STATE = {
    BEGIN: S++, // leading byte order mark or whitespace
    BEGIN_WHITESPACE: S++, // leading whitespace
    TEXT: S++, // general stuff
    TEXT_ENTITY: S++, // &amp and such.
    OPEN_WAKA: S++, // <
    SGML_DECL: S++, // <!BLARG
    SGML_DECL_QUOTED: S++, // <!BLARG foo "bar
    DOCTYPE: S++, // <!DOCTYPE
    DOCTYPE_QUOTED: S++, // <!DOCTYPE "//blah
    DOCTYPE_DTD: S++, // <!DOCTYPE "//blah" [ ...
    DOCTYPE_DTD_QUOTED: S++, // <!DOCTYPE "//blah" [ "foo
    COMMENT_STARTING: S++, // <!-
    COMMENT: S++, // <!--
    COMMENT_ENDING: S++, // <!-- blah -
    COMMENT_ENDED: S++, // <!-- blah --
    CDATA: S++, // <![CDATA[ something
    CDATA_ENDING: S++, // ]
    CDATA_ENDING_2: S++, // ]]
    PROC_INST: S++, // <?hi
    PROC_INST_BODY: S++, // <?hi there
    PROC_INST_ENDING: S++, // <?hi "there" ?
    OPEN_TAG: S++, // <strong
    OPEN_TAG_SLASH: S++, // <strong /
    ATTRIB: S++, // <a
    ATTRIB_NAME: S++, // <a foo
    ATTRIB_NAME_SAW_WHITE: S++, // <a foo _
    ATTRIB_VALUE: S++, // <a foo=
    ATTRIB_VALUE_QUOTED: S++, // <a foo="bar
    ATTRIB_VALUE_CLOSED: S++, // <a foo="bar"
    ATTRIB_VALUE_UNQUOTED: S++, // <a foo=bar
    ATTRIB_VALUE_ENTITY_Q: S++, // <foo bar="&quot;"
    ATTRIB_VALUE_ENTITY_U: S++, // <foo bar=&quot
    CLOSE_TAG: S++, // </a
    CLOSE_TAG_SAW_WHITE: S++, // </a   >
    SCRIPT: S++, // <script> ...
    SCRIPT_ENDING: S++ // <script> ... <
  };

  sax.XML_ENTITIES = {
    'amp': '&',
    'gt': '>',
    'lt': '<',
    'quot': '"',
    'apos': "'"
  };

  sax.ENTITIES = {
    'amp': '&',
    'gt': '>',
    'lt': '<',
    'quot': '"',
    'apos': "'",
    'AElig': 198,
    'Aacute': 193,
    'Acirc': 194,
    'Agrave': 192,
    'Aring': 197,
    'Atilde': 195,
    'Auml': 196,
    'Ccedil': 199,
    'ETH': 208,
    'Eacute': 201,
    'Ecirc': 202,
    'Egrave': 200,
    'Euml': 203,
    'Iacute': 205,
    'Icirc': 206,
    'Igrave': 204,
    'Iuml': 207,
    'Ntilde': 209,
    'Oacute': 211,
    'Ocirc': 212,
    'Ograve': 210,
    'Oslash': 216,
    'Otilde': 213,
    'Ouml': 214,
    'THORN': 222,
    'Uacute': 218,
    'Ucirc': 219,
    'Ugrave': 217,
    'Uuml': 220,
    'Yacute': 221,
    'aacute': 225,
    'acirc': 226,
    'aelig': 230,
    'agrave': 224,
    'aring': 229,
    'atilde': 227,
    'auml': 228,
    'ccedil': 231,
    'eacute': 233,
    'ecirc': 234,
    'egrave': 232,
    'eth': 240,
    'euml': 235,
    'iacute': 237,
    'icirc': 238,
    'igrave': 236,
    'iuml': 239,
    'ntilde': 241,
    'oacute': 243,
    'ocirc': 244,
    'ograve': 242,
    'oslash': 248,
    'otilde': 245,
    'ouml': 246,
    'szlig': 223,
    'thorn': 254,
    'uacute': 250,
    'ucirc': 251,
    'ugrave': 249,
    'uuml': 252,
    'yacute': 253,
    'yuml': 255,
    'copy': 169,
    'reg': 174,
    'nbsp': 160,
    'iexcl': 161,
    'cent': 162,
    'pound': 163,
    'curren': 164,
    'yen': 165,
    'brvbar': 166,
    'sect': 167,
    'uml': 168,
    'ordf': 170,
    'laquo': 171,
    'not': 172,
    'shy': 173,
    'macr': 175,
    'deg': 176,
    'plusmn': 177,
    'sup1': 185,
    'sup2': 178,
    'sup3': 179,
    'acute': 180,
    'micro': 181,
    'para': 182,
    'middot': 183,
    'cedil': 184,
    'ordm': 186,
    'raquo': 187,
    'frac14': 188,
    'frac12': 189,
    'frac34': 190,
    'iquest': 191,
    'times': 215,
    'divide': 247,
    'OElig': 338,
    'oelig': 339,
    'Scaron': 352,
    'scaron': 353,
    'Yuml': 376,
    'fnof': 402,
    'circ': 710,
    'tilde': 732,
    'Alpha': 913,
    'Beta': 914,
    'Gamma': 915,
    'Delta': 916,
    'Epsilon': 917,
    'Zeta': 918,
    'Eta': 919,
    'Theta': 920,
    'Iota': 921,
    'Kappa': 922,
    'Lambda': 923,
    'Mu': 924,
    'Nu': 925,
    'Xi': 926,
    'Omicron': 927,
    'Pi': 928,
    'Rho': 929,
    'Sigma': 931,
    'Tau': 932,
    'Upsilon': 933,
    'Phi': 934,
    'Chi': 935,
    'Psi': 936,
    'Omega': 937,
    'alpha': 945,
    'beta': 946,
    'gamma': 947,
    'delta': 948,
    'epsilon': 949,
    'zeta': 950,
    'eta': 951,
    'theta': 952,
    'iota': 953,
    'kappa': 954,
    'lambda': 955,
    'mu': 956,
    'nu': 957,
    'xi': 958,
    'omicron': 959,
    'pi': 960,
    'rho': 961,
    'sigmaf': 962,
    'sigma': 963,
    'tau': 964,
    'upsilon': 965,
    'phi': 966,
    'chi': 967,
    'psi': 968,
    'omega': 969,
    'thetasym': 977,
    'upsih': 978,
    'piv': 982,
    'ensp': 8194,
    'emsp': 8195,
    'thinsp': 8201,
    'zwnj': 8204,
    'zwj': 8205,
    'lrm': 8206,
    'rlm': 8207,
    'ndash': 8211,
    'mdash': 8212,
    'lsquo': 8216,
    'rsquo': 8217,
    'sbquo': 8218,
    'ldquo': 8220,
    'rdquo': 8221,
    'bdquo': 8222,
    'dagger': 8224,
    'Dagger': 8225,
    'bull': 8226,
    'hellip': 8230,
    'permil': 8240,
    'prime': 8242,
    'Prime': 8243,
    'lsaquo': 8249,
    'rsaquo': 8250,
    'oline': 8254,
    'frasl': 8260,
    'euro': 8364,
    'image': 8465,
    'weierp': 8472,
    'real': 8476,
    'trade': 8482,
    'alefsym': 8501,
    'larr': 8592,
    'uarr': 8593,
    'rarr': 8594,
    'darr': 8595,
    'harr': 8596,
    'crarr': 8629,
    'lArr': 8656,
    'uArr': 8657,
    'rArr': 8658,
    'dArr': 8659,
    'hArr': 8660,
    'forall': 8704,
    'part': 8706,
    'exist': 8707,
    'empty': 8709,
    'nabla': 8711,
    'isin': 8712,
    'notin': 8713,
    'ni': 8715,
    'prod': 8719,
    'sum': 8721,
    'minus': 8722,
    'lowast': 8727,
    'radic': 8730,
    'prop': 8733,
    'infin': 8734,
    'ang': 8736,
    'and': 8743,
    'or': 8744,
    'cap': 8745,
    'cup': 8746,
    'int': 8747,
    'there4': 8756,
    'sim': 8764,
    'cong': 8773,
    'asymp': 8776,
    'ne': 8800,
    'equiv': 8801,
    'le': 8804,
    'ge': 8805,
    'sub': 8834,
    'sup': 8835,
    'nsub': 8836,
    'sube': 8838,
    'supe': 8839,
    'oplus': 8853,
    'otimes': 8855,
    'perp': 8869,
    'sdot': 8901,
    'lceil': 8968,
    'rceil': 8969,
    'lfloor': 8970,
    'rfloor': 8971,
    'lang': 9001,
    'rang': 9002,
    'loz': 9674,
    'spades': 9824,
    'clubs': 9827,
    'hearts': 9829,
    'diams': 9830
  };

  Object.keys(sax.ENTITIES).forEach(function (key) {
    var e = sax.ENTITIES[key];
    var s = typeof e === 'number' ? String.fromCharCode(e) : e;
    sax.ENTITIES[key] = s;
  });

  for (var s in sax.STATE) {
    sax.STATE[sax.STATE[s]] = s;
  }

  // shorthand
  S = sax.STATE;

  function emit(parser, event, data) {
    parser[event] && parser[event](data);
  }

  function emitNode(parser, nodeType, data) {
    if (parser.textNode) closeText(parser);
    emit(parser, nodeType, data);
  }

  function closeText(parser) {
    parser.textNode = textopts(parser.opt, parser.textNode);
    if (parser.textNode) emit(parser, 'ontext', parser.textNode);
    parser.textNode = '';
  }

  function textopts(opt, text) {
    if (opt.trim) text = text.trim();
    if (opt.normalize) text = text.replace(/\s+/g, ' ');
    return text;
  }

  function error(parser, er) {
    closeText(parser);
    if (parser.trackPosition) {
      er += '\nLine: ' + parser.line + '\nColumn: ' + parser.column + '\nChar: ' + parser.c;
    }
    er = new Error(er);
    parser.error = er;
    emit(parser, 'onerror', er);
    return parser;
  }

  function _end(parser) {
    if (parser.sawRoot && !parser.closedRoot) strictFail(parser, 'Unclosed root tag');
    if (parser.state !== S.BEGIN && parser.state !== S.BEGIN_WHITESPACE && parser.state !== S.TEXT) {
      error(parser, 'Unexpected end');
    }
    closeText(parser);
    parser.c = '';
    parser.closed = true;
    emit(parser, 'onend');
    SAXParser.call(parser, parser.strict, parser.opt);
    return parser;
  }

  function strictFail(parser, message) {
    if ((typeof parser === 'undefined' ? 'undefined' : _typeof(parser)) !== 'object' || !(parser instanceof SAXParser)) {
      throw new Error('bad call to strictFail');
    }
    if (parser.strict) {
      error(parser, message);
    }
  }

  function newTag(parser) {
    if (!parser.strict) parser.tagName = parser.tagName[parser.looseCase]();
    var parent = parser.tags[parser.tags.length - 1] || parser;
    var tag = parser.tag = { name: parser.tagName, attributes: {}

      // will be overridden if tag contails an xmlns="foo" or xmlns:foo="bar"
    };if (parser.opt.xmlns) {
      tag.ns = parent.ns;
    }
    parser.attribList.length = 0;
    emitNode(parser, 'onopentagstart', tag);
  }

  function qname(name, attribute) {
    var i = name.indexOf(':');
    var qualName = i < 0 ? ['', name] : name.split(':');
    var prefix = qualName[0];
    var local = qualName[1];

    // <x "xmlns"="http://foo">
    if (attribute && name === 'xmlns') {
      prefix = 'xmlns';
      local = '';
    }

    return { prefix: prefix, local: local };
  }

  function attrib(parser) {
    if (!parser.strict) {
      parser.attribName = parser.attribName[parser.looseCase]();
    }

    if (parser.attribList.indexOf(parser.attribName) !== -1 || parser.tag.attributes.hasOwnProperty(parser.attribName)) {
      parser.attribName = parser.attribValue = '';
      return;
    }

    if (parser.opt.xmlns) {
      var qn = qname(parser.attribName, true);
      var prefix = qn.prefix;
      var local = qn.local;

      if (prefix === 'xmlns') {
        // namespace binding attribute. push the binding into scope
        if (local === 'xml' && parser.attribValue !== XML_NAMESPACE) {
          strictFail(parser, 'xml: prefix must be bound to ' + XML_NAMESPACE + '\n' + 'Actual: ' + parser.attribValue);
        } else if (local === 'xmlns' && parser.attribValue !== XMLNS_NAMESPACE) {
          strictFail(parser, 'xmlns: prefix must be bound to ' + XMLNS_NAMESPACE + '\n' + 'Actual: ' + parser.attribValue);
        } else {
          var tag = parser.tag;
          var parent = parser.tags[parser.tags.length - 1] || parser;
          if (tag.ns === parent.ns) {
            tag.ns = Object.create(parent.ns);
          }
          tag.ns[local] = parser.attribValue;
        }
      }

      // defer onattribute events until all attributes have been seen
      // so any new bindings can take effect. preserve attribute order
      // so deferred events can be emitted in document order
      parser.attribList.push([parser.attribName, parser.attribValue]);
    } else {
      // in non-xmlns mode, we can emit the event right away
      parser.tag.attributes[parser.attribName] = parser.attribValue;
      emitNode(parser, 'onattribute', {
        name: parser.attribName,
        value: parser.attribValue
      });
    }

    parser.attribName = parser.attribValue = '';
  }

  function openTag(parser, selfClosing) {
    if (parser.opt.xmlns) {
      // emit namespace binding events
      var tag = parser.tag;

      // add namespace info to tag
      var qn = qname(parser.tagName);
      tag.prefix = qn.prefix;
      tag.local = qn.local;
      tag.uri = tag.ns[qn.prefix] || '';

      if (tag.prefix && !tag.uri) {
        strictFail(parser, 'Unbound namespace prefix: ' + JSON.stringify(parser.tagName));
        tag.uri = qn.prefix;
      }

      var parent = parser.tags[parser.tags.length - 1] || parser;
      if (tag.ns && parent.ns !== tag.ns) {
        Object.keys(tag.ns).forEach(function (p) {
          emitNode(parser, 'onopennamespace', {
            prefix: p,
            uri: tag.ns[p]
          });
        });
      }

      // handle deferred onattribute events
      // Note: do not apply default ns to attributes:
      //   http://www.w3.org/TR/REC-xml-names/#defaulting
      for (var i = 0, l = parser.attribList.length; i < l; i++) {
        var nv = parser.attribList[i];
        var name = nv[0];
        var value = nv[1];
        var qualName = qname(name, true);
        var prefix = qualName.prefix;
        var local = qualName.local;
        var uri = prefix === '' ? '' : tag.ns[prefix] || '';
        var a = {
          name: name,
          value: value,
          prefix: prefix,
          local: local,
          uri: uri

          // if there's any attributes with an undefined namespace,
          // then fail on them now.
        };if (prefix && prefix !== 'xmlns' && !uri) {
          strictFail(parser, 'Unbound namespace prefix: ' + JSON.stringify(prefix));
          a.uri = prefix;
        }
        parser.tag.attributes[name] = a;
        emitNode(parser, 'onattribute', a);
      }
      parser.attribList.length = 0;
    }

    parser.tag.isSelfClosing = !!selfClosing;

    // process the tag
    parser.sawRoot = true;
    parser.tags.push(parser.tag);
    emitNode(parser, 'onopentag', parser.tag);
    if (!selfClosing) {
      // special case for <script> in non-strict mode.
      if (!parser.noscript && parser.tagName.toLowerCase() === 'script') {
        parser.state = S.SCRIPT;
      } else {
        parser.state = S.TEXT;
      }
      parser.tag = null;
      parser.tagName = '';
    }
    parser.attribName = parser.attribValue = '';
    parser.attribList.length = 0;
  }

  function closeTag(parser) {
    if (!parser.tagName) {
      strictFail(parser, 'Weird empty close tag.');
      parser.textNode += '</>';
      parser.state = S.TEXT;
      return;
    }

    if (parser.script) {
      if (parser.tagName !== 'script') {
        parser.script += '</' + parser.tagName + '>';
        parser.tagName = '';
        parser.state = S.SCRIPT;
        return;
      }
      emitNode(parser, 'onscript', parser.script);
      parser.script = '';
    }

    // first make sure that the closing tag actually exists.
    // <a><b></c></b></a> will close everything, otherwise.
    var t = parser.tags.length;
    var tagName = parser.tagName;
    if (!parser.strict) {
      tagName = tagName[parser.looseCase]();
    }
    var closeTo = tagName;
    while (t--) {
      var close = parser.tags[t];
      if (close.name !== closeTo) {
        // fail the first time in strict mode
        strictFail(parser, 'Unexpected close tag');
      } else {
        break;
      }
    }

    // didn't find it.  we already failed for strict, so just abort.
    if (t < 0) {
      strictFail(parser, 'Unmatched closing tag: ' + parser.tagName);
      parser.textNode += '</' + parser.tagName + '>';
      parser.state = S.TEXT;
      return;
    }
    parser.tagName = tagName;
    var s = parser.tags.length;
    while (s-- > t) {
      var tag = parser.tag = parser.tags.pop();
      parser.tagName = parser.tag.name;
      emitNode(parser, 'onclosetag', parser.tagName);

      var x = {};
      for (var i in tag.ns) {
        x[i] = tag.ns[i];
      }

      var parent = parser.tags[parser.tags.length - 1] || parser;
      if (parser.opt.xmlns && tag.ns !== parent.ns) {
        // remove namespace bindings introduced by tag
        Object.keys(tag.ns).forEach(function (p) {
          var n = tag.ns[p];
          emitNode(parser, 'onclosenamespace', { prefix: p, uri: n });
        });
      }
    }
    if (t === 0) parser.closedRoot = true;
    parser.tagName = parser.attribValue = parser.attribName = '';
    parser.attribList.length = 0;
    parser.state = S.TEXT;
  }

  function parseEntity(parser) {
    var entity = parser.entity;
    var entityLC = entity.toLowerCase();
    var num;
    var numStr = '';

    if (parser.ENTITIES[entity]) {
      return parser.ENTITIES[entity];
    }
    if (parser.ENTITIES[entityLC]) {
      return parser.ENTITIES[entityLC];
    }
    entity = entityLC;
    if (entity.charAt(0) === '#') {
      if (entity.charAt(1) === 'x') {
        entity = entity.slice(2);
        num = parseInt(entity, 16);
        numStr = num.toString(16);
      } else {
        entity = entity.slice(1);
        num = parseInt(entity, 10);
        numStr = num.toString(10);
      }
    }
    entity = entity.replace(/^0+/, '');
    if (isNaN(num) || numStr.toLowerCase() !== entity) {
      strictFail(parser, 'Invalid character entity');
      return '&' + parser.entity + ';';
    }

    return String.fromCodePoint(num);
  }

  function beginWhiteSpace(parser, c) {
    if (c === '<') {
      parser.state = S.OPEN_WAKA;
      parser.startTagPosition = parser.position;
    } else if (!isWhitespace(c)) {
      // have to process this as a text node.
      // weird, but happens.
      strictFail(parser, 'Non-whitespace before first tag.');
      parser.textNode = c;
      parser.state = S.TEXT;
    }
  }

  function charAt(chunk, i) {
    var result = '';
    if (i < chunk.length) {
      result = chunk.charAt(i);
    }
    return result;
  }

  function write(chunk) {
    var parser = this;
    if (this.error) {
      throw this.error;
    }
    if (parser.closed) {
      return error(parser, 'Cannot write after close. Assign an onready handler.');
    }
    if (chunk === null) {
      return _end(parser);
    }
    if ((typeof chunk === 'undefined' ? 'undefined' : _typeof(chunk)) === 'object') {
      chunk = chunk.toString();
    }
    var i = 0;
    var c = '';
    while (true) {
      c = charAt(chunk, i++);
      parser.c = c;

      if (!c) {
        break;
      }

      if (parser.trackPosition) {
        parser.position++;
        if (c === '\n') {
          parser.line++;
          parser.column = 0;
        } else {
          parser.column++;
        }
      }

      switch (parser.state) {
        case S.BEGIN:
          parser.state = S.BEGIN_WHITESPACE;
          if (c === '\uFEFF') {
            continue;
          }
          beginWhiteSpace(parser, c);
          continue;

        case S.BEGIN_WHITESPACE:
          beginWhiteSpace(parser, c);
          continue;

        case S.TEXT:
          if (parser.sawRoot && !parser.closedRoot) {
            var starti = i - 1;
            while (c && c !== '<' && c !== '&') {
              c = charAt(chunk, i++);
              if (c && parser.trackPosition) {
                parser.position++;
                if (c === '\n') {
                  parser.line++;
                  parser.column = 0;
                } else {
                  parser.column++;
                }
              }
            }
            parser.textNode += chunk.substring(starti, i - 1);
          }
          if (c === '<' && !(parser.sawRoot && parser.closedRoot && !parser.strict)) {
            parser.state = S.OPEN_WAKA;
            parser.startTagPosition = parser.position;
          } else {
            if (!isWhitespace(c) && (!parser.sawRoot || parser.closedRoot)) {
              strictFail(parser, 'Text data outside of root node.');
            }
            if (c === '&') {
              parser.state = S.TEXT_ENTITY;
            } else {
              parser.textNode += c;
            }
          }
          continue;

        case S.SCRIPT:
          // only non-strict
          if (c === '<') {
            parser.state = S.SCRIPT_ENDING;
          } else {
            parser.script += c;
          }
          continue;

        case S.SCRIPT_ENDING:
          if (c === '/') {
            parser.state = S.CLOSE_TAG;
          } else {
            parser.script += '<' + c;
            parser.state = S.SCRIPT;
          }
          continue;

        case S.OPEN_WAKA:
          // either a /, ?, !, or text is coming next.
          if (c === '!') {
            parser.state = S.SGML_DECL;
            parser.sgmlDecl = '';
          } else if (isWhitespace(c)) {
            // wait for it...
          } else if (isMatch(nameStart, c)) {
            parser.state = S.OPEN_TAG;
            parser.tagName = c;
          } else if (c === '/') {
            parser.state = S.CLOSE_TAG;
            parser.tagName = '';
          } else if (c === '?') {
            parser.state = S.PROC_INST;
            parser.procInstName = parser.procInstBody = '';
          } else {
            strictFail(parser, 'Unencoded <');
            // if there was some whitespace, then add that in.
            if (parser.startTagPosition + 1 < parser.position) {
              var pad = parser.position - parser.startTagPosition;
              c = new Array(pad).join(' ') + c;
            }
            parser.textNode += '<' + c;
            parser.state = S.TEXT;
          }
          continue;

        case S.SGML_DECL:
          if ((parser.sgmlDecl + c).toUpperCase() === CDATA) {
            emitNode(parser, 'onopencdata');
            parser.state = S.CDATA;
            parser.sgmlDecl = '';
            parser.cdata = '';
          } else if (parser.sgmlDecl + c === '--') {
            parser.state = S.COMMENT;
            parser.comment = '';
            parser.sgmlDecl = '';
          } else if ((parser.sgmlDecl + c).toUpperCase() === DOCTYPE) {
            parser.state = S.DOCTYPE;
            if (parser.doctype || parser.sawRoot) {
              strictFail(parser, 'Inappropriately located doctype declaration');
            }
            parser.doctype = '';
            parser.sgmlDecl = '';
          } else if (c === '>') {
            emitNode(parser, 'onsgmldeclaration', parser.sgmlDecl);
            parser.sgmlDecl = '';
            parser.state = S.TEXT;
          } else if (isQuote(c)) {
            parser.state = S.SGML_DECL_QUOTED;
            parser.sgmlDecl += c;
          } else {
            parser.sgmlDecl += c;
          }
          continue;

        case S.SGML_DECL_QUOTED:
          if (c === parser.q) {
            parser.state = S.SGML_DECL;
            parser.q = '';
          }
          parser.sgmlDecl += c;
          continue;

        case S.DOCTYPE:
          if (c === '>') {
            parser.state = S.TEXT;
            emitNode(parser, 'ondoctype', parser.doctype);
            parser.doctype = true; // just remember that we saw it.
          } else {
            parser.doctype += c;
            if (c === '[') {
              parser.state = S.DOCTYPE_DTD;
            } else if (isQuote(c)) {
              parser.state = S.DOCTYPE_QUOTED;
              parser.q = c;
            }
          }
          continue;

        case S.DOCTYPE_QUOTED:
          parser.doctype += c;
          if (c === parser.q) {
            parser.q = '';
            parser.state = S.DOCTYPE;
          }
          continue;

        case S.DOCTYPE_DTD:
          parser.doctype += c;
          if (c === ']') {
            parser.state = S.DOCTYPE;
          } else if (isQuote(c)) {
            parser.state = S.DOCTYPE_DTD_QUOTED;
            parser.q = c;
          }
          continue;

        case S.DOCTYPE_DTD_QUOTED:
          parser.doctype += c;
          if (c === parser.q) {
            parser.state = S.DOCTYPE_DTD;
            parser.q = '';
          }
          continue;

        case S.COMMENT:
          if (c === '-') {
            parser.state = S.COMMENT_ENDING;
          } else {
            parser.comment += c;
          }
          continue;

        case S.COMMENT_ENDING:
          if (c === '-') {
            parser.state = S.COMMENT_ENDED;
            parser.comment = textopts(parser.opt, parser.comment);
            if (parser.comment) {
              emitNode(parser, 'oncomment', parser.comment);
            }
            parser.comment = '';
          } else {
            parser.comment += '-' + c;
            parser.state = S.COMMENT;
          }
          continue;

        case S.COMMENT_ENDED:
          if (c !== '>') {
            strictFail(parser, 'Malformed comment');
            // allow <!-- blah -- bloo --> in non-strict mode,
            // which is a comment of " blah -- bloo "
            parser.comment += '--' + c;
            parser.state = S.COMMENT;
          } else {
            parser.state = S.TEXT;
          }
          continue;

        case S.CDATA:
          if (c === ']') {
            parser.state = S.CDATA_ENDING;
          } else {
            parser.cdata += c;
          }
          continue;

        case S.CDATA_ENDING:
          if (c === ']') {
            parser.state = S.CDATA_ENDING_2;
          } else {
            parser.cdata += ']' + c;
            parser.state = S.CDATA;
          }
          continue;

        case S.CDATA_ENDING_2:
          if (c === '>') {
            if (parser.cdata) {
              emitNode(parser, 'oncdata', parser.cdata);
            }
            emitNode(parser, 'onclosecdata');
            parser.cdata = '';
            parser.state = S.TEXT;
          } else if (c === ']') {
            parser.cdata += ']';
          } else {
            parser.cdata += ']]' + c;
            parser.state = S.CDATA;
          }
          continue;

        case S.PROC_INST:
          if (c === '?') {
            parser.state = S.PROC_INST_ENDING;
          } else if (isWhitespace(c)) {
            parser.state = S.PROC_INST_BODY;
          } else {
            parser.procInstName += c;
          }
          continue;

        case S.PROC_INST_BODY:
          if (!parser.procInstBody && isWhitespace(c)) {
            continue;
          } else if (c === '?') {
            parser.state = S.PROC_INST_ENDING;
          } else {
            parser.procInstBody += c;
          }
          continue;

        case S.PROC_INST_ENDING:
          if (c === '>') {
            emitNode(parser, 'onprocessinginstruction', {
              name: parser.procInstName,
              body: parser.procInstBody
            });
            parser.procInstName = parser.procInstBody = '';
            parser.state = S.TEXT;
          } else {
            parser.procInstBody += '?' + c;
            parser.state = S.PROC_INST_BODY;
          }
          continue;

        case S.OPEN_TAG:
          if (isMatch(nameBody, c)) {
            parser.tagName += c;
          } else {
            newTag(parser);
            if (c === '>') {
              openTag(parser);
            } else if (c === '/') {
              parser.state = S.OPEN_TAG_SLASH;
            } else {
              if (!isWhitespace(c)) {
                strictFail(parser, 'Invalid character in tag name');
              }
              parser.state = S.ATTRIB;
            }
          }
          continue;

        case S.OPEN_TAG_SLASH:
          if (c === '>') {
            openTag(parser, true);
            closeTag(parser);
          } else {
            strictFail(parser, 'Forward-slash in opening tag not followed by >');
            parser.state = S.ATTRIB;
          }
          continue;

        case S.ATTRIB:
          // haven't read the attribute name yet.
          if (isWhitespace(c)) {
            continue;
          } else if (c === '>') {
            openTag(parser);
          } else if (c === '/') {
            parser.state = S.OPEN_TAG_SLASH;
          } else if (isMatch(nameStart, c)) {
            parser.attribName = c;
            parser.attribValue = '';
            parser.state = S.ATTRIB_NAME;
          } else {
            strictFail(parser, 'Invalid attribute name');
          }
          continue;

        case S.ATTRIB_NAME:
          if (c === '=') {
            parser.state = S.ATTRIB_VALUE;
          } else if (c === '>') {
            strictFail(parser, 'Attribute without value');
            parser.attribValue = parser.attribName;
            attrib(parser);
            openTag(parser);
          } else if (isWhitespace(c)) {
            parser.state = S.ATTRIB_NAME_SAW_WHITE;
          } else if (isMatch(nameBody, c)) {
            parser.attribName += c;
          } else {
            strictFail(parser, 'Invalid attribute name');
          }
          continue;

        case S.ATTRIB_NAME_SAW_WHITE:
          if (c === '=') {
            parser.state = S.ATTRIB_VALUE;
          } else if (isWhitespace(c)) {
            continue;
          } else {
            strictFail(parser, 'Attribute without value');
            parser.tag.attributes[parser.attribName] = '';
            parser.attribValue = '';
            emitNode(parser, 'onattribute', {
              name: parser.attribName,
              value: ''
            });
            parser.attribName = '';
            if (c === '>') {
              openTag(parser);
            } else if (isMatch(nameStart, c)) {
              parser.attribName = c;
              parser.state = S.ATTRIB_NAME;
            } else {
              strictFail(parser, 'Invalid attribute name');
              parser.state = S.ATTRIB;
            }
          }
          continue;

        case S.ATTRIB_VALUE:
          if (isWhitespace(c)) {
            continue;
          } else if (isQuote(c)) {
            parser.q = c;
            parser.state = S.ATTRIB_VALUE_QUOTED;
          } else {
            strictFail(parser, 'Unquoted attribute value');
            parser.state = S.ATTRIB_VALUE_UNQUOTED;
            parser.attribValue = c;
          }
          continue;

        case S.ATTRIB_VALUE_QUOTED:
          if (c !== parser.q) {
            if (c === '&') {
              parser.state = S.ATTRIB_VALUE_ENTITY_Q;
            } else {
              parser.attribValue += c;
            }
            continue;
          }
          attrib(parser);
          parser.q = '';
          parser.state = S.ATTRIB_VALUE_CLOSED;
          continue;

        case S.ATTRIB_VALUE_CLOSED:
          if (isWhitespace(c)) {
            parser.state = S.ATTRIB;
          } else if (c === '>') {
            openTag(parser);
          } else if (c === '/') {
            parser.state = S.OPEN_TAG_SLASH;
          } else if (isMatch(nameStart, c)) {
            strictFail(parser, 'No whitespace between attributes');
            parser.attribName = c;
            parser.attribValue = '';
            parser.state = S.ATTRIB_NAME;
          } else {
            strictFail(parser, 'Invalid attribute name');
          }
          continue;

        case S.ATTRIB_VALUE_UNQUOTED:
          if (!isAttribEnd(c)) {
            if (c === '&') {
              parser.state = S.ATTRIB_VALUE_ENTITY_U;
            } else {
              parser.attribValue += c;
            }
            continue;
          }
          attrib(parser);
          if (c === '>') {
            openTag(parser);
          } else {
            parser.state = S.ATTRIB;
          }
          continue;

        case S.CLOSE_TAG:
          if (!parser.tagName) {
            if (isWhitespace(c)) {
              continue;
            } else if (notMatch(nameStart, c)) {
              if (parser.script) {
                parser.script += '</' + c;
                parser.state = S.SCRIPT;
              } else {
                strictFail(parser, 'Invalid tagname in closing tag.');
              }
            } else {
              parser.tagName = c;
            }
          } else if (c === '>') {
            closeTag(parser);
          } else if (isMatch(nameBody, c)) {
            parser.tagName += c;
          } else if (parser.script) {
            parser.script += '</' + parser.tagName;
            parser.tagName = '';
            parser.state = S.SCRIPT;
          } else {
            if (!isWhitespace(c)) {
              strictFail(parser, 'Invalid tagname in closing tag');
            }
            parser.state = S.CLOSE_TAG_SAW_WHITE;
          }
          continue;

        case S.CLOSE_TAG_SAW_WHITE:
          if (isWhitespace(c)) {
            continue;
          }
          if (c === '>') {
            closeTag(parser);
          } else {
            strictFail(parser, 'Invalid characters in closing tag');
          }
          continue;

        case S.TEXT_ENTITY:
        case S.ATTRIB_VALUE_ENTITY_Q:
        case S.ATTRIB_VALUE_ENTITY_U:
          var returnState;
          var buffer;
          switch (parser.state) {
            case S.TEXT_ENTITY:
              returnState = S.TEXT;
              buffer = 'textNode';
              break;

            case S.ATTRIB_VALUE_ENTITY_Q:
              returnState = S.ATTRIB_VALUE_QUOTED;
              buffer = 'attribValue';
              break;

            case S.ATTRIB_VALUE_ENTITY_U:
              returnState = S.ATTRIB_VALUE_UNQUOTED;
              buffer = 'attribValue';
              break;
          }

          if (c === ';') {
            parser[buffer] += parseEntity(parser);
            parser.entity = '';
            parser.state = returnState;
          } else if (isMatch(parser.entity.length ? entityBody : entityStart, c)) {
            parser.entity += c;
          } else {
            strictFail(parser, 'Invalid character in entity name');
            parser[buffer] += '&' + parser.entity + c;
            parser.entity = '';
            parser.state = returnState;
          }

          continue;

        default:
          throw new Error(parser, 'Unknown state: ' + parser.state);
      }
    } // while

    if (parser.position >= parser.bufferCheckPosition) {
      checkBufferLength(parser);
    }
    return parser;
  }

  /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
  /* istanbul ignore next */
  if (!String.fromCodePoint) {
    (function () {
      var stringFromCharCode = String.fromCharCode;
      var floor = Math.floor;
      var fromCodePoint = function fromCodePoint() {
        var MAX_SIZE = 0x4000;
        var codeUnits = [];
        var highSurrogate;
        var lowSurrogate;
        var index = -1;
        var length = arguments.length;
        if (!length) {
          return '';
        }
        var result = '';
        while (++index < length) {
          var codePoint = Number(arguments[index]);
          if (!isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
          codePoint < 0 || // not a valid Unicode code point
          codePoint > 0x10FFFF || // not a valid Unicode code point
          floor(codePoint) !== codePoint // not an integer
          ) {
              throw RangeError('Invalid code point: ' + codePoint);
            }
          if (codePoint <= 0xFFFF) {
            // BMP code point
            codeUnits.push(codePoint);
          } else {
            // Astral code point; split in surrogate halves
            // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
            codePoint -= 0x10000;
            highSurrogate = (codePoint >> 10) + 0xD800;
            lowSurrogate = codePoint % 0x400 + 0xDC00;
            codeUnits.push(highSurrogate, lowSurrogate);
          }
          if (index + 1 === length || codeUnits.length > MAX_SIZE) {
            result += stringFromCharCode.apply(null, codeUnits);
            codeUnits.length = 0;
          }
        }
        return result;
      };
      /* istanbul ignore next */
      if (Object.defineProperty) {
        Object.defineProperty(String, 'fromCodePoint', {
          value: fromCodePoint,
          configurable: true,
          writable: true
        });
      } else {
        String.fromCodePoint = fromCodePoint;
      }
    })();
  }
})( false ? this.sax = {} : exports);

/***/ }),
/* 106 */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),
/* 107 */
/***/ (function(module, exports) {

module.exports = require("string_decoder");

/***/ }),
/* 108 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),
/* 109 */
/***/ (function(module, exports) {

// Generated by CoffeeScript 1.12.7
(function () {
  "use strict";

  exports.stripBOM = function (str) {
    if (str[0] === "\uFEFF") {
      return str.substring(1);
    } else {
      return str;
    }
  };
}).call(this);

/***/ }),
/* 110 */
/***/ (function(module, exports) {

module.exports = require("timers");

/***/ }),
/* 111 */
/***/ (function(module, exports) {

/**
 * encodeFormData
 *
 * @param data {object}
 * @returns {string}
 */
var encodeFormData = function encodeFormData(data) {
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
 * get
 *
 * @param url {string}
 * @param data {object}
 * @param callback {function}
 */
var get = function get(url, data, callback) {
  var request = new XMLHttpRequest();
  request.open("GET", url + "?" + encodeFormData(data));
  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      var type = request.getResponseHeader("Content-Type");
      if (type.indexOf("xml") !== -1 && request.responseXML) {
        callback(request.responseXML);
      } else if (type === "application/json; charset=utf-8") {
        callback(JSON.parse(request.responseText));
      } else {
        callback(request.responseText);
      }
    }
  };
  request.send(null);
};
module.exports.get = get;

/**
 * getData
 *
 * @param url {string}
 * @param data {object}
 * @param callback {function}
 */
var getData = function getData(url, data, callback) {
  var request = new XMLHttpRequest();
  request.open("GET", url + "?" + encodeFormData(data));
  request.onreadystatechange = function () {
    if (request.readyState === 4 && callback) callback(request);
  };
  request.send(null);
};
module.exports.getData = getData;

/**
 * postData
 *
 * @param url {string}
 * @param data {object}
 * @param callback {function}
 */
var postData = function postData(url, data, callback) {
  var request = new XMLHttpRequest();
  request.open("POST", url);
  request.onreadystatechange = function () {
    if (request.readyState === 4 && callback) callback(request);
  };
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  request.send(encodeFormData(data));
};
module.exports.postData = postData;

/**
 * postXML
 *
 * @param url {string}
 * @param head {object}
 * @param data {object}
 * @param callback {function}
 */
var postXML = function postXML(url, data, callback) {
  var request = new XMLHttpRequest();
  request.open("POST", url);
  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      var type = request.getResponseHeader("Content-Type");
      if (type === "text/xml; charset=utf-8") {
        callback(request.responseXML);
      } else if (type === "application/json; charset=utf-8") {
        callback(JSON.parse(request.responseText));
      } else {
        callback(request.responseText);
      }
    }
  };
  request.setRequestHeader("Content-Type", "text/xml; charset=UTF-8");
  for (var key in data.head) {
    request.setRequestHeader(key, data.head[key]);
  }
  request.send(data.body);
};
module.exports.postXML = postXML;

/**
 * postJSON
 *
 * @param url {string}
 * @param data {object}
 * @param callback {function}
 */
var postJSON = function postJSON(url, data, callback) {
  var request = new XMLHttpRequest();
  request.open("POST", url);
  request.onreadystatechange = function () {
    if (request.readyState === 4 && callback) callback(request);
  };
  request.setRequestHeader("Content-Type", "application/json");
  request.send(JSON.stringify(data));
};
module.exports.postJSON = postJSON;

/***/ }),
/* 112 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_AppSidebar_AppSidebar__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_AppForm_AppForm__ = __webpack_require__(114);
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
/* 113 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actions_AppAction__ = __webpack_require__(18);
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
            'Application keyset'
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
/* 114 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actions_AppAction__ = __webpack_require__(18);
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
              'User Token'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('textarea', {
              className: 'form-control',
              placeholder: 'Token',
              value: this.state.token,
              onChange: this.handleChangeText.bind(this, 'token') })
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
              'Trading API URL'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'text',
              className: 'form-control',
              placeholder: 'URL',
              value: this.state.tradingApi,
              onChange: this.handleChangeText.bind(this, 'tradingApi') })
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'form-actions' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'button',
              { type: 'submit',
                className: 'btn btn-large btn-form btn-primary',
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
/* 115 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_flux_utils__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_flux_utils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_flux_utils__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__FluxContainerConverter__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__FluxContainerConverter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__FluxContainerConverter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__stores_noteStore__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_NoteBody_NoteBody__ = __webpack_require__(117);
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
/* 116 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_flux_utils__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_flux_utils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_flux_utils__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dispatcher__ = __webpack_require__(9);
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
/* 117 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_NoteSidebar_NoteSidebar__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_NoteTable_NoteTable__ = __webpack_require__(120);
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
/* 118 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actions_NoteAction__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Radio_Radio__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_webutils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_stdutils__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_stdutils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__utils_stdutils__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_fs__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_fs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_electron__ = __webpack_require__(33);
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
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dispatcher__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_NoteApiClient__ = __webpack_require__(19);
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
/* 120 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_stdutils__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_stdutils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__utils_stdutils__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_webutils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_iso8601_duration__ = __webpack_require__(32);
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
/* 121 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_flux_utils__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_flux_utils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_flux_utils__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__FluxContainerConverter__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__FluxContainerConverter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__FluxContainerConverter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__stores_completeStore__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_CompleteBody_CompleteBody__ = __webpack_require__(123);
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
/* 122 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_flux_utils__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_flux_utils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_flux_utils__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dispatcher__ = __webpack_require__(9);
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
/* 123 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_CompleteSidebar_CompleteSidebar__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_CompleteTable_CompleteTable__ = __webpack_require__(126);
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
/* 124 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actions_CompleteAction__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Radio_Radio__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_webutils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_stdutils__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_stdutils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__utils_stdutils__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_fs__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_fs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_electron__ = __webpack_require__(33);
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
/* 125 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dispatcher__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_NoteApiClient__ = __webpack_require__(19);
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
/* 126 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_stdutils__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_stdutils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__utils_stdutils__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_webutils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_iso8601_duration__ = __webpack_require__(32);
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
/* 127 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_flux_utils__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_flux_utils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_flux_utils__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__FluxContainerConverter__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__FluxContainerConverter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__FluxContainerConverter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__stores_productsStore__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_ProductsBody_ProductsBody__ = __webpack_require__(129);
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
/* 128 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_flux_utils__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_flux_utils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_flux_utils__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dispatcher__ = __webpack_require__(9);
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
/* 129 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_ProductsSidebar_ProductsSidebar__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_ProductsTable_ProductsTable__ = __webpack_require__(132);
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
/* 130 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actions_ProductsAction__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Radio_Radio__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_webutils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_stdutils__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_stdutils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__utils_stdutils__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_fs__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_fs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_electron__ = __webpack_require__(33);
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
/* 131 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dispatcher__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_NoteApiClient__ = __webpack_require__(19);
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
/* 132 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_stdutils__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_stdutils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__utils_stdutils__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_webutils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_iso8601_duration__ = __webpack_require__(32);
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
/* 133 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actions_AppAction__ = __webpack_require__(18);
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
/* 134 */
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
/* 135 */
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
/* 136 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_webutils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_electron__ = __webpack_require__(33);
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
],[69]);
//# sourceMappingURL=app.bundle.js.map