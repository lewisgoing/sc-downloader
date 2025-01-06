/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/content/api/client.js":
/*!***********************************!*\
  !*** ./src/content/api/client.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getClientId: () => (/* binding */ getClientId)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var clientIdCache = null;
function getClientId() {
  return _getClientId.apply(this, arguments);
}
function _getClientId() {
  _getClientId = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var response, text, matches, _iterator, _step, match, scriptUrl, scriptResponse, scriptText, clientIdMatch;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!clientIdCache) {
            _context.next = 2;
            break;
          }
          return _context.abrupt("return", clientIdCache);
        case 2:
          _context.prev = 2;
          _context.next = 5;
          return fetch('https://soundcloud.com/');
        case 5:
          response = _context.sent;
          _context.next = 8;
          return response.text();
        case 8:
          text = _context.sent;
          matches = text.match(/src="(https:\/\/a-v2\.sndcdn\.com\/assets\/[^"]+)/g);
          if (matches) {
            _context.next = 12;
            break;
          }
          throw new Error('Could not find app script URL');
        case 12:
          _iterator = _createForOfIteratorHelper(matches);
          _context.prev = 13;
          _iterator.s();
        case 15:
          if ((_step = _iterator.n()).done) {
            _context.next = 30;
            break;
          }
          match = _step.value;
          scriptUrl = match.slice(5).replace('"', '');
          _context.next = 20;
          return fetch(scriptUrl);
        case 20:
          scriptResponse = _context.sent;
          _context.next = 23;
          return scriptResponse.text();
        case 23:
          scriptText = _context.sent;
          clientIdMatch = scriptText.match(/client_id\s*:\s*"([^"]+)"/);
          if (!clientIdMatch) {
            _context.next = 28;
            break;
          }
          clientIdCache = clientIdMatch[1];
          return _context.abrupt("return", clientIdCache);
        case 28:
          _context.next = 15;
          break;
        case 30:
          _context.next = 35;
          break;
        case 32:
          _context.prev = 32;
          _context.t0 = _context["catch"](13);
          _iterator.e(_context.t0);
        case 35:
          _context.prev = 35;
          _iterator.f();
          return _context.finish(35);
        case 38:
          throw new Error('Could not find client ID in any script');
        case 41:
          _context.prev = 41;
          _context.t1 = _context["catch"](2);
          console.error('Error getting client ID:', _context.t1);
          return _context.abrupt("return", null);
        case 45:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[2, 41], [13, 32, 35, 38]]);
  }));
  return _getClientId.apply(this, arguments);
}

/***/ }),

/***/ "./src/content/api/track.js":
/*!**********************************!*\
  !*** ./src/content/api/track.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getTrackData: () => (/* binding */ getTrackData)
/* harmony export */ });
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./client */ "./src/content/api/client.js");
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/helpers */ "./src/utils/helpers.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }


function getTrackData() {
  return _getTrackData.apply(this, arguments);
}
function _getTrackData() {
  _getTrackData = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var trackElement,
      urlMatch,
      clientId,
      linkElement,
      href,
      resolveUrl,
      resolveResponse,
      trackData,
      progressiveStream,
      streamResponse,
      streamData,
      artworkUrl,
      _args = arguments;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          trackElement = _args.length > 0 && _args[0] !== undefined ? _args[0] : null;
          _context.prev = 1;
          if (!trackElement) {
            _context.next = 12;
            break;
          }
          linkElement = trackElement.querySelector('a.soundTitle__title, a[href^="/"]');
          if (linkElement) {
            _context.next = 6;
            break;
          }
          return _context.abrupt("return", null);
        case 6:
          href = linkElement.getAttribute('href');
          urlMatch = href.match(/^\/([^\/]+\/[^\/\?]+)/);
          if (urlMatch) {
            _context.next = 10;
            break;
          }
          return _context.abrupt("return", null);
        case 10:
          _context.next = 15;
          break;
        case 12:
          urlMatch = window.location.href.match(/soundcloud\.com\/([^\/]+\/[^\/\?]+)/);
          if (urlMatch) {
            _context.next = 15;
            break;
          }
          throw new Error('Could not find track URL');
        case 15:
          _context.next = 17;
          return (0,_client__WEBPACK_IMPORTED_MODULE_0__.getClientId)();
        case 17:
          clientId = _context.sent;
          if (clientId) {
            _context.next = 20;
            break;
          }
          throw new Error('Could not get client ID');
        case 20:
          resolveUrl = "https://api-v2.soundcloud.com/resolve?url=https://soundcloud.com/".concat(urlMatch[1], "&client_id=").concat(clientId);
          _context.next = 23;
          return fetch(resolveUrl);
        case 23:
          resolveResponse = _context.sent;
          _context.next = 26;
          return resolveResponse.json();
        case 26:
          trackData = _context.sent;
          progressiveStream = trackData.media.transcodings.find(function (t) {
            return t.format.protocol === 'progressive' && t.format.mime_type === 'audio/mpeg';
          });
          if (progressiveStream) {
            _context.next = 30;
            break;
          }
          throw new Error('No progressive stream found');
        case 30:
          _context.next = 32;
          return fetch("".concat(progressiveStream.url, "?client_id=").concat(clientId));
        case 32:
          streamResponse = _context.sent;
          _context.next = 35;
          return streamResponse.json();
        case 35:
          streamData = _context.sent;
          if (streamData.url) {
            _context.next = 38;
            break;
          }
          throw new Error('No stream URL in response');
        case 38:
          artworkUrl = null;
          if (trackData.artwork_url) {
            artworkUrl = trackData.artwork_url.replace('-large.', '-t500x500.');
          } else if (trackData.user && trackData.user.avatar_url) {
            artworkUrl = trackData.user.avatar_url.replace('-large.', '-t500x500.');
          }
          return _context.abrupt("return", {
            url: streamData.url,
            filename: "".concat((0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.sanitizeFilename)(trackData.title), ".mp3"),
            artworkUrl: artworkUrl,
            metadata: {
              title: trackData.title,
              artist: trackData.user.username,
              album: trackData.title,
              year: new Date(trackData.created_at).getFullYear().toString()
            }
          });
        case 43:
          _context.prev = 43;
          _context.t0 = _context["catch"](1);
          console.error('Error getting track data:', _context.t0);
          return _context.abrupt("return", null);
        case 47:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 43]]);
  }));
  return _getTrackData.apply(this, arguments);
}

/***/ }),

/***/ "./src/content/buttons.js":
/*!********************************!*\
  !*** ./src/content/buttons.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addDownloadButtons: () => (/* binding */ addDownloadButtons),
/* harmony export */   createDownloadButton: () => (/* binding */ createDownloadButton),
/* harmony export */   createGridViewDownloadButton: () => (/* binding */ createGridViewDownloadButton),
/* harmony export */   setupObserver: () => (/* binding */ setupObserver)
/* harmony export */ });
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/helpers */ "./src/utils/helpers.js");
/* harmony import */ var _downloader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./downloader */ "./src/content/downloader.js");
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }


function createDownloadButtonElement() {
  var isSmallButton = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var downloadButton = document.createElement('button');
  downloadButton.className = 'sc-button-download sc-button sc-button-small sc-button-icon sc-button-secondary';
  downloadButton.setAttribute('title', 'Download');
  downloadButton.setAttribute('aria-label', 'Download');
  downloadButton.setAttribute('tabindex', '0');
  var size = isSmallButton ? '22px' : '26px';
  var padding = isSmallButton ? '4px' : '5px';
  downloadButton.style.cssText = "\n    width: ".concat(size, ";\n    height: ").concat(size, ";\n    padding: ").concat(padding, ";\n    min-width: ").concat(size, ";\n    display: flex;\n    align-items: center;\n    justify-content: center;\n  ");
  downloadButton.innerHTML = "\n    <svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\">\n      <path d=\"M3,11 L3,13 L13,13 L13,11 L3,11 Z M3,4 L13,4 L8,10 L3,4 Z M6,2 L6,4 L10,4 L10,2 L6,2 Z\" fill=\"rgb(34, 34, 34)\"/>\n    </svg>\n  ";
  return downloadButton;
}
function createDownloadButton() {
  var trackElement = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var trackInfo = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.getTrackInfo)(trackElement);
  if (trackElement) {
    var _trackElement$closest;
    // Check for existing buttons
    var existingButtons = [].concat(_toConsumableArray(trackElement.querySelectorAll('.sc-button-download')), _toConsumableArray(((_trackElement$closest = trackElement.closest('.sound, .track')) === null || _trackElement$closest === void 0 ? void 0 : _trackElement$closest.querySelectorAll('.sc-button-download')) || []));
    if (existingButtons.length > 0) {
      console.log("Skipping duplicate button for: ".concat(trackInfo));
      return;
    }
  }
  console.log("Creating download button for: ".concat(trackInfo));

  // Determine button size based on view type
  var isSmallButton = trackElement && (trackElement.closest('.soundList__item, .trackList__item, .compactTrackList__item') || trackElement.closest('.systemPlaylistTrackList__item, .listenEngagement__item') || trackElement.matches('.sound:not(.soundBadge)'));
  var downloadButton = createDownloadButtonElement(isSmallButton);
  var actionsContainer;
  if (trackElement) {
    actionsContainer = trackElement.querySelector('.sc-button-group');
  } else {
    actionsContainer = document.querySelector('.soundActions .sc-button-group, ' + '.trackView .soundActions .sc-button-group');
  }
  if (!actionsContainer || actionsContainer.querySelector('.sc-button-download')) return;
  actionsContainer.appendChild(downloadButton);
  (0,_downloader__WEBPACK_IMPORTED_MODULE_1__.addDownloadHandler)(downloadButton, trackElement);
}
function createGridViewDownloadButton(trackElement) {
  if (!trackElement) return;
  var trackInfo = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.getTrackInfo)(trackElement);
  var playableTile = trackElement.closest('.playableTile');
  if (!playableTile) return;
  var actionWrapper = playableTile.querySelector('.playableTile__actionWrapper');
  if (!actionWrapper) return;
  if (actionWrapper.querySelector('.sc-button-download') || playableTile.querySelector('.sc-button-download')) {
    console.log("Skipping duplicate grid button for: ".concat(trackInfo));
    return;
  }
  console.log("Creating grid view button for: ".concat(trackInfo));
  var downloadButton = document.createElement('button');
  downloadButton.className = 'sc-button-download playableTile__actionButton sc-button sc-button-small sc-button-icon sc-button-lightfg sc-button-nostyle';
  downloadButton.setAttribute('title', 'Download');
  downloadButton.setAttribute('aria-label', 'Download');
  downloadButton.setAttribute('tabindex', '0');
  downloadButton.innerHTML = "\n    <svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\">\n      <path d=\"M3,11 L3,13 L13,13 L13,11 L3,11 Z M3,4 L13,4 L8,10 L3,4 Z M6,2 L6,4 L10,4 L10,2 L6,2 Z\" fill=\"#ffffff\"/>\n    </svg>\n  ";
  actionWrapper.appendChild(downloadButton);
  (0,_downloader__WEBPACK_IMPORTED_MODULE_1__.addDownloadHandler)(downloadButton, trackElement);
}
function removeAllDuplicateButtons() {
  var buttons = document.querySelectorAll('.sc-button-download');
  console.log("Cleaning up: Found ".concat(buttons.length, " download buttons"));
  var buttonGroups = new Map();
  buttons.forEach(function (button) {
    var container = button.closest('.sc-button-group, .playableTile__actionWrapper');
    if (container) {
      if (!buttonGroups.has(container)) {
        buttonGroups.set(container, []);
      }
      buttonGroups.get(container).push(button);
    }
  });
  var removedCount = 0;
  buttonGroups.forEach(function (groupButtons) {
    if (groupButtons.length > 1) {
      groupButtons.slice(1).forEach(function (button) {
        button.remove();
        removedCount++;
      });
    }
  });
  if (removedCount > 0) {
    console.log("Removed ".concat(removedCount, " duplicate buttons"));
  }
}
function addDownloadButtons() {
  removeAllDuplicateButtons();
  var isTrackPage = window.location.href.match(/soundcloud\.com\/([^\/]+\/[^\/\?]+)/);
  if (isTrackPage) {
    console.log('Checking track page button');
    createDownloadButton();
  }
  var trackSelectors = ['.sound__body', '.soundList__item', '.userStreamItem', '.trackItem', '.compactTrackList__item', '.stream__header-top-track', '.heroPlaylist__track', '.soundTitle__containerTop', '.trackList__item', '[role="listitem"] .sound', '.stream__list .sound', '.sound', '.trackList__item', '.sound-item', '.listenEngagement__item', '.track__item', '.playableTile', '.soundBadge', '.trackItem__content', '.systemPlaylistTrackList__item', '.relatedTracks__item'];
  var processedElements = new Set();
  var trackElements = document.querySelectorAll(trackSelectors.join(', '));
  console.log("Found ".concat(trackElements.length, " total track elements"));
  trackElements.forEach(function (trackElement) {
    if (processedElements.has(trackElement)) return;
    var isGridView = trackElement.closest('.playableTile');
    if (isGridView) {
      createGridViewDownloadButton(trackElement);
    } else {
      createDownloadButton(trackElement);
    }
    processedElements.add(trackElement);
  });
}
function setupObserver() {
  var debouncedAddButtons = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.debounce)(function () {
    removeAllDuplicateButtons();
    addDownloadButtons();
  }, 300);
  var observer = new MutationObserver(function (mutations) {
    var hasRelevantMutation = mutations.some(function (mutation) {
      return mutation.type === 'childList' && Array.from(mutation.addedNodes).some(function (node) {
        var _node$matches, _node$querySelector;
        return node.nodeType === Node.ELEMENT_NODE && (((_node$matches = node.matches) === null || _node$matches === void 0 ? void 0 : _node$matches.call(node, '.sound, .track, .trackList__item, .userStreamItem, .soundActions, .playableTile')) || ((_node$querySelector = node.querySelector) === null || _node$querySelector === void 0 ? void 0 : _node$querySelector.call(node, '.sound, .track, .trackList__item, .userStreamItem, .soundActions, .playableTile')));
      });
    });
    if (hasRelevantMutation) {
      debouncedAddButtons();
    }
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  removeAllDuplicateButtons();
  setTimeout(addDownloadButtons, 500);
}

/***/ }),

/***/ "./src/content/downloader.js":
/*!***********************************!*\
  !*** ./src/content/downloader.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addDownloadHandler: () => (/* binding */ addDownloadHandler),
/* harmony export */   downloadTrack: () => (/* binding */ downloadTrack)
/* harmony export */ });
/* harmony import */ var _id3writer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./id3writer */ "./src/content/id3writer.js");
/* harmony import */ var _api_track__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api/track */ "./src/content/api/track.js");
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/helpers */ "./src/utils/helpers.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }



function downloadTrack(_x) {
  return _downloadTrack.apply(this, arguments);
}
function _downloadTrack() {
  _downloadTrack = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(trackData) {
    var trackResponse, reader, chunks, totalLength, _yield$reader$read, done, value, trackArrayBuffer, uint8View, position, _i, _chunks, chunk, artworkBuffer, artworkResponse, taggedArrayBuffer, blob, url;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          console.log('Starting download...');
          _context2.next = 4;
          return fetch(trackData.url);
        case 4:
          trackResponse = _context2.sent;
          if (trackResponse.ok) {
            _context2.next = 7;
            break;
          }
          throw new Error('Track download failed');
        case 7:
          reader = trackResponse.body.getReader();
          chunks = [];
          totalLength = 0;
        case 10:
          if (false) {}
          _context2.next = 13;
          return reader.read();
        case 13:
          _yield$reader$read = _context2.sent;
          done = _yield$reader$read.done;
          value = _yield$reader$read.value;
          if (!done) {
            _context2.next = 18;
            break;
          }
          return _context2.abrupt("break", 22);
        case 18:
          chunks.push(value);
          totalLength += value.length;
          _context2.next = 10;
          break;
        case 22:
          trackArrayBuffer = new ArrayBuffer(totalLength);
          uint8View = new Uint8Array(trackArrayBuffer);
          position = 0;
          for (_i = 0, _chunks = chunks; _i < _chunks.length; _i++) {
            chunk = _chunks[_i];
            uint8View.set(chunk, position);
            position += chunk.length;
          }
          artworkBuffer = null;
          if (!trackData.artworkUrl) {
            _context2.next = 35;
            break;
          }
          _context2.next = 30;
          return fetch(trackData.artworkUrl);
        case 30:
          artworkResponse = _context2.sent;
          if (!artworkResponse.ok) {
            _context2.next = 35;
            break;
          }
          _context2.next = 34;
          return artworkResponse.arrayBuffer();
        case 34:
          artworkBuffer = _context2.sent;
        case 35:
          taggedArrayBuffer = _id3writer__WEBPACK_IMPORTED_MODULE_0__.ID3Writer.write(trackArrayBuffer, trackData.metadata, artworkBuffer);
          blob = new Blob([taggedArrayBuffer], {
            type: 'audio/mpeg'
          });
          url = URL.createObjectURL(blob);
          (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.triggerDownload)(url, trackData.filename);
          return _context2.abrupt("return", true);
        case 42:
          _context2.prev = 42;
          _context2.t0 = _context2["catch"](0);
          console.error('Download failed:', _context2.t0);
          return _context2.abrupt("return", false);
        case 46:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 42]]);
  }));
  return _downloadTrack.apply(this, arguments);
}
function addDownloadHandler(button) {
  var trackElement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  button.addEventListener('click', /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(event) {
      var trackData, success;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            event.preventDefault();
            event.stopPropagation();
            button.style.opacity = '0.5';
            _context.prev = 3;
            _context.next = 6;
            return (0,_api_track__WEBPACK_IMPORTED_MODULE_1__.getTrackData)(trackElement);
          case 6:
            trackData = _context.sent;
            if (trackData) {
              _context.next = 9;
              break;
            }
            throw new Error('Could not find track data');
          case 9:
            _context.next = 11;
            return downloadTrack(trackData);
          case 11:
            success = _context.sent;
            if (success) {
              _context.next = 14;
              break;
            }
            throw new Error('Download failed');
          case 14:
            _context.next = 20;
            break;
          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](3);
            console.error('Error:', _context.t0);
            alert(_context.t0.message || 'Download failed. Please try again.');
          case 20:
            _context.prev = 20;
            button.style.opacity = '1';
            return _context.finish(20);
          case 23:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[3, 16, 20, 23]]);
    }));
    return function (_x2) {
      return _ref.apply(this, arguments);
    };
  }());
}

/***/ }),

/***/ "./src/content/id3writer.js":
/*!**********************************!*\
  !*** ./src/content/id3writer.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ID3Writer: () => (/* binding */ ID3Writer)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var ID3Writer = /*#__PURE__*/function () {
  function ID3Writer() {
    _classCallCheck(this, ID3Writer);
  }
  return _createClass(ID3Writer, null, [{
    key: "createTextFrame",
    value: function createTextFrame(id, text) {
      var encoded = this.encoders.string(text);
      var buffer = new Uint8Array(10 + 1 + encoded.length);
      buffer.set(this.encoders.string(id), 0);
      buffer.set(this.encoders.uint32(1 + encoded.length), 4);
      buffer.set([0, 0], 8);
      buffer[10] = 3;
      buffer.set(encoded, 11);
      return buffer;
    }
  }, {
    key: "createAPICFrame",
    value: function createAPICFrame(imageData) {
      var mimeType = this.encoders.string('image/jpeg\0');
      var description = this.encoders.string('\0');
      var frameSize = 1 + mimeType.length + 1 + description.length + imageData.byteLength;
      var buffer = new Uint8Array(10 + frameSize);
      buffer.set(this.encoders.string('APIC'), 0);
      buffer.set(this.encoders.uint32(frameSize), 4);
      buffer.set([0, 0], 8);
      var offset = 10;
      buffer[offset++] = 3;
      buffer.set(mimeType, offset);
      offset += mimeType.length;
      buffer[offset++] = 3;
      buffer.set(description, offset);
      offset += description.length;
      buffer.set(new Uint8Array(imageData), offset);
      return buffer;
    }
  }, {
    key: "write",
    value: function write(data, metadata) {
      var imageData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var frames = [];
      if (metadata.title) frames.push(this.createTextFrame('TIT2', metadata.title));
      if (metadata.artist) frames.push(this.createTextFrame('TPE1', metadata.artist));
      if (metadata.album) frames.push(this.createTextFrame('TALB', metadata.album));
      if (metadata.year) frames.push(this.createTextFrame('TYER', metadata.year));
      if (imageData) frames.push(this.createAPICFrame(imageData));
      var totalFrameSize = frames.reduce(function (sum, frame) {
        return sum + frame.length;
      }, 0);
      var tagSize = 10 + totalFrameSize;
      var finalBuffer = new Uint8Array(tagSize + data.byteLength);

      // ID3 header
      finalBuffer[0] = 0x49; // 'I'
      finalBuffer[1] = 0x44; // 'D'
      finalBuffer[2] = 0x33; // '3'
      finalBuffer[3] = 3; // version 2.3
      finalBuffer[4] = 0; // flags

      function encodeSynchsafe(size) {
        var bytes = new Uint8Array(4);
        bytes[0] = size >> 21 & 0x7F;
        bytes[1] = size >> 14 & 0x7F;
        bytes[2] = size >> 7 & 0x7F;
        bytes[3] = size & 0x7F;
        return bytes;
      }
      var synchsafeSize = encodeSynchsafe(totalFrameSize);
      finalBuffer[6] = synchsafeSize[0];
      finalBuffer[7] = synchsafeSize[1];
      finalBuffer[8] = synchsafeSize[2];
      finalBuffer[9] = synchsafeSize[3];
      var offset = 10;
      frames.forEach(function (frame) {
        finalBuffer.set(frame, offset);
        offset += frame.length;
      });
      finalBuffer.set(new Uint8Array(data), tagSize);
      return finalBuffer.buffer;
    }
  }]);
}();
_defineProperty(ID3Writer, "encoders", {
  string: function string(str) {
    return new TextEncoder().encode(str);
  },
  uint32: function uint32(num) {
    var arr = new Uint8Array(4);
    arr[0] = num >> 24 & 0xff;
    arr[1] = num >> 16 & 0xff;
    arr[2] = num >> 8 & 0xff;
    arr[3] = num & 0xff;
    return arr;
  }
});


/***/ }),

/***/ "./src/utils/helpers.js":
/*!******************************!*\
  !*** ./src/utils/helpers.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   debounce: () => (/* binding */ debounce),
/* harmony export */   getTrackInfo: () => (/* binding */ getTrackInfo),
/* harmony export */   sanitizeFilename: () => (/* binding */ sanitizeFilename),
/* harmony export */   triggerDownload: () => (/* binding */ triggerDownload)
/* harmony export */ });
/**
 * Debounces function execution
 */
function debounce(func, wait) {
  var timeout;
  return function executedFunction() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var later = function later() {
      clearTimeout(timeout);
      func.apply(void 0, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Gets track information from DOM element
 */
function getTrackInfo(trackElement) {
  var _trackElement$querySe, _trackElement$querySe2, _trackElement$querySe3;
  if (!trackElement) {
    var _document$querySelect;
    // For track pages
    var _title = (_document$querySelect = document.querySelector('.soundTitle__title')) === null || _document$querySelect === void 0 || (_document$querySelect = _document$querySelect.textContent) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.trim();
    return _title ? "Track page: ".concat(_title) : 'Unknown track page';
  }

  // For track elements
  var title = ((_trackElement$querySe = trackElement.querySelector('.soundTitle__title')) === null || _trackElement$querySe === void 0 || (_trackElement$querySe = _trackElement$querySe.textContent) === null || _trackElement$querySe === void 0 ? void 0 : _trackElement$querySe.trim()) || ((_trackElement$querySe2 = trackElement.querySelector('a[href^="/"]')) === null || _trackElement$querySe2 === void 0 || (_trackElement$querySe2 = _trackElement$querySe2.textContent) === null || _trackElement$querySe2 === void 0 ? void 0 : _trackElement$querySe2.trim());
  var artist = (_trackElement$querySe3 = trackElement.querySelector('.soundTitle__username')) === null || _trackElement$querySe3 === void 0 || (_trackElement$querySe3 = _trackElement$querySe3.textContent) === null || _trackElement$querySe3 === void 0 ? void 0 : _trackElement$querySe3.trim();
  return title ? "".concat(title).concat(artist ? " by ".concat(artist) : '') : 'Unknown track';
}

/**
 * Sanitizes filename by removing invalid characters
 */
function sanitizeFilename(str) {
  return str.replace(/[<>:"/\\|?*]/g, '').replace(/\s+/g, ' ').trim();
}

/**
 * Creates a download link and triggers download
 */
function triggerDownload(url, filename) {
  var a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!******************************!*\
  !*** ./src/content/index.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _buttons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./buttons */ "./src/content/buttons.js");


// Initialize the extension when the page is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', _buttons__WEBPACK_IMPORTED_MODULE_0__.setupObserver);
} else {
  (0,_buttons__WEBPACK_IMPORTED_MODULE_0__.setupObserver)();
}
})();

/******/ })()
;
//# sourceMappingURL=content.js.map