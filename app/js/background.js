/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/asyncToGenerator.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/createClass.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/defineProperty.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime-module.js");


/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime-module.js":
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ "./node_modules/regenerator-runtime/runtime.js");

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ "./node_modules/rollbar/dist/rollbar.umd.min.js":
/*!******************************************************!*\
  !*** ./node_modules/rollbar/dist/rollbar.umd.min.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():undefined}(this,function(){return function(t){function e(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return t[n].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var r={};return e.m=t,e.c=r,e.p="",e(0)}([function(t,e,r){t.exports=r(1)},function(t,e,r){"use strict";var n=r(2),o="undefined"!=typeof window&&window._rollbarConfig,i=o&&o.globalAlias||"Rollbar",a="undefined"!=typeof window&&window[i]&&"function"==typeof window[i].shimId&&void 0!==window[i].shimId();if("undefined"==typeof window||window._rollbarStartTime||(window._rollbarStartTime=(new Date).getTime()),!a&&o){var s=new n(o);window[i]=s}else"undefined"!=typeof window?(window.rollbar=n,window._rollbarDidLoad=!0):"undefined"!=typeof self&&(self.rollbar=n,self._rollbarDidLoad=!0);t.exports=n},function(t,e,r){"use strict";function n(t,e){this.options=c.handleOptions(x,t);var r=new l(this.options,h,d);this.client=e||new u(this.options,r,p,"browser");var n="undefined"!=typeof window&&window||"undefined"!=typeof self&&self,o="undefined"!=typeof document&&document;i(this.client.notifier),a(this.client.queue),(this.options.captureUncaught||this.options.handleUncaughtExceptions)&&(f.captureUncaughtExceptions(n,this),f.wrapGlobals(n,this)),(this.options.captureUnhandledRejections||this.options.handleUnhandledRejections)&&f.captureUnhandledRejections(n,this),this.instrumenter=new w(this.options,this.client.telemeter,this,n,o),this.instrumenter.instrument()}function o(t){var e="Rollbar is not initialized";p.error(e),t&&t(new Error(e))}function i(t){t.addTransform(m.handleItemWithError).addTransform(m.ensureItemHasSomethingToSay).addTransform(m.addBaseInfo).addTransform(m.addRequestInfo(window)).addTransform(m.addClientInfo(window)).addTransform(m.addPluginInfo(window)).addTransform(m.addBody).addTransform(g.addMessageWithError).addTransform(g.addTelemetryData).addTransform(g.addConfigToPayload).addTransform(m.scrubPayload).addTransform(g.userTransform(p)).addTransform(g.itemToPayload)}function a(t){t.addPredicate(y.checkLevel).addPredicate(v.checkIgnore).addPredicate(y.userCheckIgnore(p)).addPredicate(y.urlIsNotBlacklisted(p)).addPredicate(y.urlIsWhitelisted(p)).addPredicate(y.messageIsIgnored(p))}function s(t){for(var e=0,r=t.length;e<r;++e)if(c.isFunction(t[e]))return t[e]}var u=r(3),c=r(5),l=r(11),p=r(13),f=r(16),h=r(17),d=r(19),m=r(20),g=r(24),v=r(25),y=r(26),b=r(21),w=r(27),_=null;n.init=function(t,e){return _?_.global(t).configure(t):_=new n(t,e)},n.prototype.global=function(t){return this.client.global(t),this},n.global=function(t){return _?_.global(t):void o()},n.prototype.configure=function(t,e){var r=this.options,n={};return e&&(n={payload:e}),this.options=c.handleOptions(r,t,n),this.client.configure(this.options,e),this.instrumenter.configure(this.options),this},n.configure=function(t,e){return _?_.configure(t,e):void o()},n.prototype.lastError=function(){return this.client.lastError},n.lastError=function(){return _?_.lastError():void o()},n.prototype.log=function(){var t=this._createItem(arguments),e=t.uuid;return this.client.log(t),{uuid:e}},n.log=function(){if(_)return _.log.apply(_,arguments);var t=s(arguments);o(t)},n.prototype.debug=function(){var t=this._createItem(arguments),e=t.uuid;return this.client.debug(t),{uuid:e}},n.debug=function(){if(_)return _.debug.apply(_,arguments);var t=s(arguments);o(t)},n.prototype.info=function(){var t=this._createItem(arguments),e=t.uuid;return this.client.info(t),{uuid:e}},n.info=function(){if(_)return _.info.apply(_,arguments);var t=s(arguments);o(t)},n.prototype.warn=function(){var t=this._createItem(arguments),e=t.uuid;return this.client.warn(t),{uuid:e}},n.warn=function(){if(_)return _.warn.apply(_,arguments);var t=s(arguments);o(t)},n.prototype.warning=function(){var t=this._createItem(arguments),e=t.uuid;return this.client.warning(t),{uuid:e}},n.warning=function(){if(_)return _.warning.apply(_,arguments);var t=s(arguments);o(t)},n.prototype.error=function(){var t=this._createItem(arguments),e=t.uuid;return this.client.error(t),{uuid:e}},n.error=function(){if(_)return _.error.apply(_,arguments);var t=s(arguments);o(t)},n.prototype.critical=function(){var t=this._createItem(arguments),e=t.uuid;return this.client.critical(t),{uuid:e}},n.critical=function(){if(_)return _.critical.apply(_,arguments);var t=s(arguments);o(t)},n.prototype.handleUncaughtException=function(t,e,r,n,o,i){var a,s=c.makeUnhandledStackInfo(t,e,r,n,o,"onerror","uncaught exception",b);c.isError(o)?(a=this._createItem([t,o,i]),a._unhandledStackInfo=s):c.isError(e)?(a=this._createItem([t,e,i]),a._unhandledStackInfo=s):(a=this._createItem([t,i]),a.stackInfo=s),a.level=this.options.uncaughtErrorLevel,a._isUncaught=!0,this.client.log(a)},n.prototype.handleUnhandledRejection=function(t,e){var r="unhandled rejection was null or undefined!";if(t)if(t.message)r=t.message;else{var n=c.stringify(t);n.value&&(r=n.value)}var o,i=t&&t._rollbarContext||e&&e._rollbarContext;c.isError(t)?o=this._createItem([r,t,i]):(o=this._createItem([r,t,i]),o.stackInfo=c.makeUnhandledStackInfo(r,"",0,0,null,"unhandledrejection","",b)),o.level=this.options.uncaughtErrorLevel,o._isUncaught=!0,o._originalArgs=o._originalArgs||[],o._originalArgs.push(e),this.client.log(o)},n.prototype.wrap=function(t,e,r){try{var n;if(n=c.isFunction(e)?e:function(){return e||{}},!c.isFunction(t))return t;if(t._isWrap)return t;if(!t._rollbar_wrapped&&(t._rollbar_wrapped=function(){r&&c.isFunction(r)&&r.apply(this,arguments);try{return t.apply(this,arguments)}catch(r){var e=r;throw e&&(c.isType(e,"string")&&(e=new String(e)),e._rollbarContext=n()||{},e._rollbarContext._wrappedSource=t.toString(),window._rollbarWrappedError=e),e}},t._rollbar_wrapped._isWrap=!0,t.hasOwnProperty))for(var o in t)t.hasOwnProperty(o)&&(t._rollbar_wrapped[o]=t[o]);return t._rollbar_wrapped}catch(e){return t}},n.wrap=function(t,e){return _?_.wrap(t,e):void o()},n.prototype.captureEvent=function(t,e){return this.client.captureEvent(t,e)},n.captureEvent=function(t,e){return _?_.captureEvent(t,e):void o()},n.prototype.captureDomContentLoaded=function(t,e){return e||(e=new Date),this.client.captureDomContentLoaded(e)},n.prototype.captureLoad=function(t,e){return e||(e=new Date),this.client.captureLoad(e)},n.prototype._createItem=function(t){return c.createItem(t,p,this)};var x={version:"2.5.2",scrubFields:["pw","pass","passwd","password","secret","confirm_password","confirmPassword","password_confirmation","passwordConfirmation","access_token","accessToken","secret_key","secretKey","secretToken","cc-number","card number","cardnumber","cardnum","ccnum","ccnumber","cc num","creditcardnumber","credit card number","newcreditcardnumber","new credit card","creditcardno","credit card no","card#","card #","cc-csc","cvc2","cvv2","ccv2","security code","card verification","name on credit card","name on card","nameoncard","cardholder","card holder","name des karteninhabers","card type","cardtype","cc type","cctype","payment type","expiration date","expirationdate","expdate","cc-exp"],logLevel:"debug",reportLevel:"debug",uncaughtErrorLevel:"error",endpoint:"api.rollbar.com/api/1/item/",verbose:!1,enabled:!0,sendConfig:!1,includeItemsInTelemetry:!0,captureIp:!0};t.exports=n},function(t,e,r){"use strict";function n(t,e,r,o){this.options=c.merge(t),this.logger=r,n.rateLimiter.configureGlobal(this.options),n.rateLimiter.setPlatformOptions(o,this.options),this.queue=new a(n.rateLimiter,e,r,this.options),this.notifier=new s(this.queue,this.options),this.telemeter=new u(this.options),this.lastError=null,this.lastErrorHash="none"}function o(t){var e=t.message||"",r=(t.err||{}).stack||String(t.err);return e+"::"+r}var i=r(4),a=r(8),s=r(9),u=r(10),c=r(5),l={maxItems:0,itemsPerMinute:60};n.rateLimiter=new i(l),n.prototype.global=function(t){return n.rateLimiter.configureGlobal(t),this},n.prototype.configure=function(t,e){var r=this.options,n={};return e&&(n={payload:e}),this.options=c.merge(r,t,n),this.notifier&&this.notifier.configure(this.options),this.telemeter&&this.telemeter.configure(this.options),this.global(this.options),this},n.prototype.log=function(t){var e=this._defaultLogLevel();return this._log(e,t)},n.prototype.debug=function(t){this._log("debug",t)},n.prototype.info=function(t){this._log("info",t)},n.prototype.warn=function(t){this._log("warning",t)},n.prototype.warning=function(t){this._log("warning",t)},n.prototype.error=function(t){this._log("error",t)},n.prototype.critical=function(t){this._log("critical",t)},n.prototype.wait=function(t){this.queue.wait(t)},n.prototype.captureEvent=function(t,e){return this.telemeter.captureEvent(t,e)},n.prototype.captureDomContentLoaded=function(t){return this.telemeter.captureDomContentLoaded(t)},n.prototype.captureLoad=function(t){return this.telemeter.captureLoad(t)},n.prototype._log=function(t,e){var r;if(e.callback&&(r=e.callback,delete e.callback),this._sameAsLastError(e)){if(r){var n=new Error("ignored identical item");n.item=e,r(n)}}else try{e.level=e.level||t,this.telemeter._captureRollbarItem(e),e.telemetryEvents=this.telemeter.copyEvents(),this.notifier.log(e,r)}catch(t){this.logger.error(t)}},n.prototype._defaultLogLevel=function(){return this.options.logLevel||"debug"},n.prototype._sameAsLastError=function(t){if(!t._isUncaught)return!1;var e=o(t);return this.lastErrorHash===e||(this.lastError=t.err,this.lastErrorHash=e,!1)},t.exports=n},function(t,e,r){"use strict";function n(t){this.startTime=s.now(),this.counter=0,this.perMinCounter=0,this.platform=null,this.platformOptions={},this.configureGlobal(t)}function o(t,e,r){return!t.ignoreRateLimit&&e>=1&&r>e}function i(t,e,r,n,o,i,s){var u=null;return r&&(r=new Error(r)),r||n||(u=a(t,e,o,i,s)),{error:r,shouldSend:n,payload:u}}function a(t,e,r,n,o){var i,a=e.environment||e.payload&&e.payload.environment;i=o?"item per minute limit reached, ignoring errors until timeout":"maxItems has been hit, ignoring errors until reset.";var s={body:{message:{body:i,extra:{maxItems:r,itemsPerMinute:n}}},language:"javascript",environment:a,notifier:{version:e.notifier&&e.notifier.version||e.version}};return"browser"===t?(s.platform="browser",s.framework="browser-js",s.notifier.name="rollbar-browser-js"):"server"===t?(s.framework=e.framework||"node-js",s.notifier.name=e.notifier.name):"react-native"===t&&(s.framework=e.framework||"react-native",s.notifier.name=e.notifier.name),s}var s=r(5);n.globalSettings={startTime:s.now(),maxItems:void 0,itemsPerMinute:void 0},n.prototype.configureGlobal=function(t){void 0!==t.startTime&&(n.globalSettings.startTime=t.startTime),void 0!==t.maxItems&&(n.globalSettings.maxItems=t.maxItems),void 0!==t.itemsPerMinute&&(n.globalSettings.itemsPerMinute=t.itemsPerMinute)},n.prototype.shouldSend=function(t,e){e=e||s.now();var r=e-this.startTime;(r<0||r>=6e4)&&(this.startTime=e,this.perMinCounter=0);var a=n.globalSettings.maxItems,u=n.globalSettings.itemsPerMinute;if(o(t,a,this.counter))return i(this.platform,this.platformOptions,a+" max items reached",!1);if(o(t,u,this.perMinCounter))return i(this.platform,this.platformOptions,u+" items per minute reached",!1);this.counter++,this.perMinCounter++;var c=!o(t,a,this.counter),l=c;return c=c&&!o(t,u,this.perMinCounter),i(this.platform,this.platformOptions,null,c,a,u,l)},n.prototype.setPlatformOptions=function(t,e){this.platform=t,this.platformOptions=e},t.exports=n},function(t,e,r){"use strict";function n(){if(!F&&(F=!0,c(JSON)&&(s(JSON.stringify)&&(A.stringify=JSON.stringify),s(JSON.parse)&&(A.parse=JSON.parse)),!a(A.stringify)||!a(A.parse))){var t=r(7);t(A)}}function o(t,e){return e===i(t)}function i(t){var e=typeof t;return"object"!==e?e:t?t instanceof Error?"error":{}.toString.call(t).match(/\s([a-zA-Z]+)/)[1].toLowerCase():"null"}function a(t){return o(t,"function")}function s(t){var e=/[\\^$.*+?()[\]{}|]/g,r=Function.prototype.toString.call(Object.prototype.hasOwnProperty).replace(e,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?"),n=RegExp("^"+r+"$");return u(t)&&n.test(t)}function u(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)}function c(t){return!o(t,"undefined")}function l(t){var e=i(t);return"object"===e||"array"===e}function p(t){return o(t,"error")}function f(t,e,r){var n,i,a,s=o(t,"object"),u=o(t,"array"),c=[];if(s&&r.indexOf(t)!==-1)return t;if(r.push(t),s)for(n in t)Object.prototype.hasOwnProperty.call(t,n)&&c.push(n);else if(u)for(a=0;a<t.length;++a)c.push(a);var l=s?{}:[],p=!0;for(a=0;a<c.length;++a)n=c[a],i=t[n],l[n]=e(n,i,r),p=p&&l[n]===t[n];return 0==c.length||p?t:l}function h(){return"********"}function d(){var t=N(),e="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var r=(t+16*Math.random())%16|0;return t=Math.floor(t/16),("x"===e?r:7&r|8).toString(16)});return e}function m(t){var e=g(t);return e?(""===e.anchor&&(e.source=e.source.replace("#","")),t=e.source.replace("?"+e.query,"")):"(unknown)"}function g(t){if(o(t,"string")){for(var e=P,r=e.parser[e.strictMode?"strict":"loose"].exec(t),n={},i=e.key.length;i--;)n[e.key[i]]=r[i]||"";return n[e.q.name]={},n[e.key[12]].replace(e.q.parser,function(t,r,o){r&&(n[e.q.name][r]=o)}),n}}function v(t,e,r){r=r||{},r.access_token=t;var n,o=[];for(n in r)Object.prototype.hasOwnProperty.call(r,n)&&o.push([n,r[n]].join("="));var i="?"+o.sort().join("&");e=e||{},e.path=e.path||"";var a,s=e.path.indexOf("?"),u=e.path.indexOf("#");s!==-1&&(u===-1||u>s)?(a=e.path,e.path=a.substring(0,s)+i+"&"+a.substring(s+1)):u!==-1?(a=e.path,e.path=a.substring(0,u)+i+a.substring(u)):e.path=e.path+i}function y(t,e){if(e=e||t.protocol,!e&&t.port&&(80===t.port?e="http:":443===t.port&&(e="https:")),e=e||"https:",!t.hostname)return null;var r=e+"//"+t.hostname;return t.port&&(r=r+":"+t.port),t.path&&(r+=t.path),r}function b(t,e){var r,n;try{r=A.stringify(t)}catch(o){if(e&&a(e))try{r=e(t)}catch(t){n=t}else n=o}return{error:n,value:r}}function w(t){var e,r;try{e=A.parse(t)}catch(t){r=t}return{error:r,value:e}}function _(t,e,r,n,o,i,a,s){var u={url:e||"",line:r,column:n};u.func=s.guessFunctionName(u.url,u.line),u.context=s.gatherContext(u.url,u.line);var c=document&&document.location&&document.location.href,l=window&&window.navigator&&window.navigator.userAgent;return{mode:i,message:o?String(o):t||a,url:c,stack:[u],useragent:l}}function x(t,e){return function(r,n){try{e(r,n)}catch(e){t.error(e)}}}function k(t,e,r,n,o){for(var a,s,u,c,l,p,f=[],h=0,m=t.length;h<m;++h){p=t[h];var g=i(p);switch(g){case"undefined":break;case"string":a?f.push(p):a=p;break;case"function":c=x(e,p);break;case"date":f.push(p);break;case"error":case"domexception":s?f.push(p):s=p;break;case"object":case"array":if(p instanceof Error||"undefined"!=typeof DOMException&&p instanceof DOMException){s?f.push(p):s=p;break}if(n&&"object"===g&&!l){for(var v=0,y=n.length;v<y;++v)if(void 0!==p[n[v]]){l=p;break}if(l)break}u?f.push(p):u=p;break;default:if(p instanceof Error||"undefined"!=typeof DOMException&&p instanceof DOMException){s?f.push(p):s=p;break}f.push(p)}}f.length>0&&(u=R(u),u.extraArgs=f);var b={message:a,err:s,custom:u,timestamp:N(),callback:c,uuid:d()};return u&&void 0!==u.level&&(b.level=u.level,delete u.level),n&&l&&(b.request=l),o&&(b.lambdaContext=o),b._originalArgs=t,b}function E(t,e){if(t){var r=e.split("."),n=t;try{for(var o=0,i=r.length;o<i;++o)n=n[r[o]]}catch(t){n=void 0}return n}}function I(t,e,r){if(t){var n=e.split("."),o=n.length;if(!(o<1)){if(1===o)return void(t[n[0]]=r);try{for(var i=t[n[0]]||{},a=i,s=1;s<o-1;s++)i[n[s]]=i[n[s]]||{},i=i[n[s]];i[n[o-1]]=r,t[n[0]]=a}catch(t){return}}}}function T(t,e){function r(t,e){return e+h()}function n(t){var e;if(o(t,"string"))for(e=0;e<u.length;++e)t=t.replace(u[e],r);return t}function i(t,e){var r;for(r=0;r<s.length;++r)if(s[r].test(t)){e=h();break}return e}function a(t,e,r){var s=i(t,e);return s===e?o(e,"object")||o(e,"array")?f(e,a,r):n(s):s}e=e||[];var s=S(e),u=O(e);return f(t,a,[])}function S(t){for(var e,r=[],n=0;n<t.length;++n)e="^\\[?(%5[bB])?"+t[n]+"\\[?(%5[bB])?\\]?(%5[dD])?$",r.push(new RegExp(e,"i"));return r}function O(t){for(var e,r=[],n=0;n<t.length;++n)e="\\[?(%5[bB])?"+t[n]+"\\[?(%5[bB])?\\]?(%5[dD])?",r.push(new RegExp("("+e+"=)([^&\\n]+)","igm"));return r}function L(t){var e,r,n,o=[];for(e=0,r=t.length;e<r;e++){switch(n=t[e],i(n)){case"object":n=b(n),n=n.error||n.value,n.length>500&&(n=n.substr(0,497)+"...");break;case"null":n="null";break;case"undefined":n="undefined";break;case"symbol":n=n.toString()}o.push(n)}return o.join(" ")}function N(){return Date.now?+Date.now():+new Date}function C(t,e){if(t&&t.user_ip&&e!==!0){var r=t.user_ip;if(e)try{var n;if(r.indexOf(".")!==-1)n=r.split("."),n.pop(),n.push("0"),r=n.join(".");else if(r.indexOf(":")!==-1){if(n=r.split(":"),n.length>2){var o=n.slice(0,3),i=o[2].indexOf("/");i!==-1&&(o[2]=o[2].substring(0,i));var a="0000:0000:0000:0000:0000";r=o.concat(a).join(":")}}else r=null}catch(t){r=null}else r=null;t.user_ip=r}}function j(t,e,r){var n=R(t,e,r);return!e||e.overwriteScrubFields?n:(e.scrubFields&&(n.scrubFields=(t.scrubFields||[]).concat(e.scrubFields)),n)}var R=r(6),A={},F=!1;n();var q={debug:0,info:1,warning:2,error:3,critical:4},P={strictMode:!1,key:["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],q:{name:"queryKey",parser:/(?:^|&)([^&=]*)=?([^&]*)/g},parser:{strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/}};t.exports={addParamsAndAccessTokenToPath:v,createItem:k,filterIp:C,formatArgsAsString:L,formatUrl:y,get:E,handleOptions:j,isError:p,isFunction:a,isIterable:l,isNativeFunction:s,isType:o,jsonParse:w,LEVELS:q,makeUnhandledStackInfo:_,merge:R,now:N,redact:h,sanitizeUrl:m,scrub:T,set:I,stringify:b,traverse:f,typeName:i,uuid4:d}},function(t,e){"use strict";function r(){var t,e,n,o,a,s={},u=null,c=arguments.length;for(t=0;t<c;t++)if(u=arguments[t],null!=u)for(a in u)e=s[a],n=u[a],s!==n&&(n&&i(n)?(o=e&&i(e)?e:{},s[a]=r(o,n)):"undefined"!=typeof n&&(s[a]=n));return s}var n=Object.prototype.hasOwnProperty,o=Object.prototype.toString,i=function(t){if(!t||"[object Object]"!==o.call(t))return!1;var e=n.call(t,"constructor"),r=t.constructor&&t.constructor.prototype&&n.call(t.constructor.prototype,"isPrototypeOf");if(t.constructor&&!e&&!r)return!1;var i;for(i in t);return"undefined"==typeof i||n.call(t,i)};t.exports=r},function(t,e){var r=function(t){function e(t){return t<10?"0"+t:t}function r(){return this.valueOf()}function n(t){return i.lastIndex=0,i.test(t)?'"'+t.replace(i,function(t){var e=u[t];return"string"==typeof e?e:"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+t+'"'}function o(t,e){var r,i,u,l,p,f=a,h=e[t];switch(h&&"object"==typeof h&&"function"==typeof h.toJSON&&(h=h.toJSON(t)),"function"==typeof c&&(h=c.call(e,t,h)),typeof h){case"string":return n(h);case"number":return isFinite(h)?String(h):"null";case"boolean":case"null":return String(h);case"object":if(!h)return"null";if(a+=s,p=[],"[object Array]"===Object.prototype.toString.apply(h)){for(l=h.length,r=0;r<l;r+=1)p[r]=o(r,h)||"null";return u=0===p.length?"[]":a?"[\n"+a+p.join(",\n"+a)+"\n"+f+"]":"["+p.join(",")+"]",a=f,u}if(c&&"object"==typeof c)for(l=c.length,r=0;r<l;r+=1)"string"==typeof c[r]&&(i=c[r],u=o(i,h),u&&p.push(n(i)+(a?": ":":")+u));else for(i in h)Object.prototype.hasOwnProperty.call(h,i)&&(u=o(i,h),u&&p.push(n(i)+(a?": ":":")+u));return u=0===p.length?"{}":a?"{\n"+a+p.join(",\n"+a)+"\n"+f+"}":"{"+p.join(",")+"}",a=f,u}}var i=/[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+e(this.getUTCMonth()+1)+"-"+e(this.getUTCDate())+"T"+e(this.getUTCHours())+":"+e(this.getUTCMinutes())+":"+e(this.getUTCSeconds())+"Z":null},Boolean.prototype.toJSON=r,Number.prototype.toJSON=r,String.prototype.toJSON=r);var a,s,u,c;"function"!=typeof t.stringify&&(u={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},t.stringify=function(t,e,r){var n;if(a="",s="","number"==typeof r)for(n=0;n<r;n+=1)s+=" ";else"string"==typeof r&&(s=r);if(c=e,e&&"function"!=typeof e&&("object"!=typeof e||"number"!=typeof e.length))throw new Error("JSON.stringify");return o("",{"":t})}),"function"!=typeof t.parse&&(t.parse=function(){function t(t){return t.replace(/\\(?:u(.{4})|([^u]))/g,function(t,e,r){return e?String.fromCharCode(parseInt(e,16)):a[r]})}var e,r,n,o,i,a={"\\":"\\",'"':'"',"/":"/",t:"\t",n:"\n",r:"\r",f:"\f",b:"\b"},s={go:function(){e="ok"},firstokey:function(){o=i,e="colon"},okey:function(){o=i,e="colon"},ovalue:function(){e="ocomma"},firstavalue:function(){e="acomma"},avalue:function(){e="acomma"}},u={go:function(){e="ok"},ovalue:function(){e="ocomma"},firstavalue:function(){e="acomma"},avalue:function(){e="acomma"}},c={"{":{go:function(){r.push({state:"ok"}),n={},e="firstokey"},ovalue:function(){r.push({container:n,state:"ocomma",key:o}),n={},e="firstokey"},firstavalue:function(){r.push({container:n,state:"acomma"}),n={},e="firstokey"},avalue:function(){r.push({container:n,state:"acomma"}),n={},e="firstokey"}},"}":{firstokey:function(){var t=r.pop();i=n,n=t.container,o=t.key,e=t.state},ocomma:function(){var t=r.pop();n[o]=i,i=n,n=t.container,o=t.key,e=t.state}},"[":{go:function(){r.push({state:"ok"}),n=[],e="firstavalue"},ovalue:function(){r.push({container:n,state:"ocomma",key:o}),n=[],e="firstavalue"},firstavalue:function(){r.push({container:n,state:"acomma"}),n=[],e="firstavalue"},avalue:function(){r.push({container:n,state:"acomma"}),n=[],e="firstavalue"}},"]":{firstavalue:function(){var t=r.pop();i=n,n=t.container,o=t.key,e=t.state},acomma:function(){var t=r.pop();n.push(i),i=n,n=t.container,o=t.key,e=t.state}},":":{colon:function(){if(Object.hasOwnProperty.call(n,o))throw new SyntaxError("Duplicate key '"+o+'"');e="ovalue"}},",":{ocomma:function(){n[o]=i,e="okey"},acomma:function(){n.push(i),e="avalue"}},true:{go:function(){i=!0,e="ok"},ovalue:function(){i=!0,e="ocomma"},firstavalue:function(){i=!0,e="acomma"},avalue:function(){i=!0,e="acomma"}},false:{go:function(){i=!1,e="ok"},ovalue:function(){i=!1,e="ocomma"},firstavalue:function(){i=!1,e="acomma"},avalue:function(){i=!1,e="acomma"}},null:{go:function(){i=null,e="ok"},ovalue:function(){i=null,e="ocomma"},firstavalue:function(){i=null,e="acomma"},avalue:function(){i=null,e="acomma"}}};return function(n,o){var a,l=/^[\u0020\t\n\r]*(?:([,:\[\]{}]|true|false|null)|(-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)|"((?:[^\r\n\t\\\"]|\\(?:["\\\/trnfb]|u[0-9a-fA-F]{4}))*)")/;e="go",r=[];try{for(;;){if(a=l.exec(n),!a)break;a[1]?c[a[1]][e]():a[2]?(i=+a[2],u[e]()):(i=t(a[3]),s[e]()),n=n.slice(a[0].length)}}catch(t){e=t}if("ok"!==e||/[^\u0020\t\n\r]/.test(n))throw e instanceof SyntaxError?e:new SyntaxError("JSON");return"function"==typeof o?function t(e,r){var n,a,s=e[r];if(s&&"object"==typeof s)for(n in i)Object.prototype.hasOwnProperty.call(s,n)&&(a=t(s,n),void 0!==a?s[n]=a:delete s[n]);return o.call(e,r,s)}({"":i},""):i}}())};t.exports=r},function(t,e,r){"use strict";function n(t,e,r,n){this.rateLimiter=t,this.api=e,this.logger=r,this.options=n,this.predicates=[],this.pendingItems=[],this.pendingRequests=[],this.retryQueue=[],this.retryHandle=null,this.waitCallback=null,this.waitIntervalID=null}var o=r(5);n.prototype.configure=function(t){this.api&&this.api.configure(t);var e=this.options;return this.options=o.merge(e,t),this},n.prototype.addPredicate=function(t){return o.isFunction(t)&&this.predicates.push(t),this},n.prototype.addPendingItem=function(t){this.pendingItems.push(t)},n.prototype.removePendingItem=function(t){var e=this.pendingItems.indexOf(t);e!==-1&&this.pendingItems.splice(e,1)},n.prototype.addItem=function(t,e,r,n){e&&o.isFunction(e)||(e=function(){});var i=this._applyPredicates(t);if(i.stop)return this.removePendingItem(n),void e(i.err);this._maybeLog(t,r),this.removePendingItem(n),this.pendingRequests.push(t);try{this._makeApiRequest(t,function(r,n){this._dequeuePendingRequest(t),e(r,n)}.bind(this))}catch(r){this._dequeuePendingRequest(t),e(r)}},n.prototype.wait=function(t){o.isFunction(t)&&(this.waitCallback=t,this._maybeCallWait()||(this.waitIntervalID&&(this.waitIntervalID=clearInterval(this.waitIntervalID)),this.waitIntervalID=setInterval(function(){this._maybeCallWait()}.bind(this),500)))},n.prototype._applyPredicates=function(t){for(var e=null,r=0,n=this.predicates.length;r<n;r++)if(e=this.predicates[r](t,this.options),!e||void 0!==e.err)return{stop:!0,err:e.err};return{stop:!1,err:null}},n.prototype._makeApiRequest=function(t,e){var r=this.rateLimiter.shouldSend(t);r.shouldSend?this.api.postItem(t,function(r,n){r?this._maybeRetry(r,t,e):e(r,n)}.bind(this)):r.error?e(r.error):this.api.postItem(r.payload,e)};var i=["ECONNRESET","ENOTFOUND","ESOCKETTIMEDOUT","ETIMEDOUT","ECONNREFUSED","EHOSTUNREACH","EPIPE","EAI_AGAIN"];n.prototype._maybeRetry=function(t,e,r){var n=!1;if(this.options.retryInterval)for(var o=0,a=i.length;o<a;o++)if(t.code===i[o]){n=!0;break}n?this._retryApiRequest(e,r):r(t)},n.prototype._retryApiRequest=function(t,e){this.retryQueue.push({item:t,callback:e}),this.retryHandle||(this.retryHandle=setInterval(function(){for(;this.retryQueue.length;){var t=this.retryQueue.shift();this._makeApiRequest(t.item,t.callback)}}.bind(this),this.options.retryInterval))},n.prototype._dequeuePendingRequest=function(t){var e=this.pendingRequests.indexOf(t);e!==-1&&(this.pendingRequests.splice(e,1),this._maybeCallWait())},n.prototype._maybeLog=function(t,e){if(this.logger&&this.options.verbose){var r=e;if(r=r||o.get(t,"body.trace.exception.message"),r=r||o.get(t,"body.trace_chain.0.exception.message"))return void this.logger.error(r);r=o.get(t,"body.message.body"),r&&this.logger.log(r)}},n.prototype._maybeCallWait=function(){return!(!o.isFunction(this.waitCallback)||0!==this.pendingItems.length||0!==this.pendingRequests.length)&&(this.waitIntervalID&&(this.waitIntervalID=clearInterval(this.waitIntervalID)),this.waitCallback(),!0)},t.exports=n},function(t,e,r){"use strict";function n(t,e){this.queue=t,this.options=e,this.transforms=[]}var o=r(5);n.prototype.configure=function(t){this.queue&&this.queue.configure(t);var e=this.options;return this.options=o.merge(e,t),this},n.prototype.addTransform=function(t){return o.isFunction(t)&&this.transforms.push(t),this},n.prototype.log=function(t,e){if(e&&o.isFunction(e)||(e=function(){}),!this.options.enabled)return e(new Error("Rollbar is not enabled"));this.queue.addPendingItem(t);var r=t.err;this._applyTransforms(t,function(n,o){return n?(this.queue.removePendingItem(t),e(n,null)):void this.queue.addItem(o,e,r,t)}.bind(this))},n.prototype._applyTransforms=function(t,e){var r=-1,n=this.transforms.length,o=this.transforms,i=this.options,a=function(t,s){return t?void e(t,null):(r++,r===n?void e(null,s):void o[r](s,i,a))};a(null,t)},t.exports=n},function(t,e,r){"use strict";function n(t){this.queue=[],this.options=i.merge(t);var e=this.options.maxTelemetryEvents||a;this.maxQueueSize=Math.max(0,Math.min(e,a))}function o(t,e){if(e)return e;var r={error:"error",manual:"info"};return r[t]||"info"}var i=r(5),a=100;n.prototype.configure=function(t){var e=this.options;this.options=i.merge(e,t);var r=this.options.maxTelemetryEvents||a,n=Math.max(0,Math.min(r,a)),o=0;this.maxQueueSize>n&&(o=this.maxQueueSize-n),this.maxQueueSize=n,this.queue.splice(0,o)},n.prototype.copyEvents=function(){var t=Array.prototype.slice.call(this.queue,0);if(i.isFunction(this.options.filterTelemetry))try{for(var e=t.length;e--;)this.options.filterTelemetry(t[e])&&t.splice(e,1)}catch(t){this.options.filterTelemetry=null}return t},n.prototype.capture=function(t,e,r,n,a){var s={level:o(t,r),type:t,timestamp_ms:a||i.now(),body:e,source:"client"};n&&(s.uuid=n);try{if(i.isFunction(this.options.filterTelemetry)&&this.options.filterTelemetry(s))return!1}catch(t){this.options.filterTelemetry=null}return this.push(s),s},n.prototype.captureEvent=function(t,e,r){return this.capture("manual",t,e,r)},n.prototype.captureError=function(t,e,r,n){var o={message:t.message||String(t)};return t.stack&&(o.stack=t.stack),this.capture("error",o,e,r,n)},n.prototype.captureLog=function(t,e,r,n){return this.capture("log",{message:t},e,r,n)},n.prototype.captureNetwork=function(t,e,r,n){e=e||"xhr",t.subtype=t.subtype||e,n&&(t.request=n);var o=this.levelFromStatus(t.status_code);return this.capture("network",t,o,r)},n.prototype.levelFromStatus=function(t){return t>=200&&t<400?"info":0===t||t>=400?"error":"info"},n.prototype.captureDom=function(t,e,r,n,o){var i={subtype:t,element:e};return void 0!==r&&(i.value=r),void 0!==n&&(i.checked=n),this.capture("dom",i,"info",o)},n.prototype.captureNavigation=function(t,e,r){return this.capture("navigation",{from:t,to:e},"info",r)},n.prototype.captureDomContentLoaded=function(t){return this.capture("navigation",{subtype:"DOMContentLoaded"},"info",void 0,t&&t.getTime())},n.prototype.captureLoad=function(t){return this.capture("navigation",{subtype:"load"},"info",void 0,t&&t.getTime())},n.prototype.captureConnectivityChange=function(t,e){return this.captureNetwork({change:t},"connectivity",e)},n.prototype._captureRollbarItem=function(t){if(this.options.includeItemsInTelemetry)return t.err?this.captureError(t.err,t.level,t.uuid,t.timestamp):t.message?this.captureLog(t.message,t.level,t.uuid,t.timestamp):t.custom?this.capture("log",t.custom,t.level,t.uuid,t.timestamp):void 0},n.prototype.push=function(t){this.queue.push(t),this.queue.length>this.maxQueueSize&&this.queue.shift()},t.exports=n},function(t,e,r){"use strict";function n(t,e,r,n){this.options=t,this.transport=e,this.url=r,this.jsonBackup=n,this.accessToken=t.accessToken,this.transportOptions=o(t,r)}function o(t,e){return a.getTransportFromOptions(t,s,e)}var i=r(5),a=r(12),s={hostname:"api.rollbar.com",path:"/api/1/item/",search:null,version:"1",protocol:"https:",port:443};n.prototype.postItem=function(t,e){var r=a.transportOptions(this.transportOptions,"POST"),n=a.buildPayload(this.accessToken,t,this.jsonBackup);this.transport.post(this.accessToken,r,n,e)},n.prototype.configure=function(t){var e=this.oldOptions;return this.options=i.merge(e,t),this.transportOptions=o(this.options,this.url),void 0!==this.options.accessToken&&(this.accessToken=this.options.accessToken),this},t.exports=n},function(t,e,r){"use strict";function n(t,e,r){if(!s.isType(e.context,"string")){var n=s.stringify(e.context,r);n.error?e.context="Error: could not serialize 'context'":e.context=n.value||"",e.context.length>255&&(e.context=e.context.substr(0,255))}return{access_token:t,data:e}}function o(t,e,r){var n=e.hostname,o=e.protocol,i=e.port,a=e.path,s=e.search,u=t.proxy;if(t.endpoint){var c=r.parse(t.endpoint);n=c.hostname,o=c.protocol,i=c.port,a=c.pathname,s=c.search}return{hostname:n,protocol:o,port:i,path:a,search:s,proxy:u}}function i(t,e){var r=t.protocol||"https:",n=t.port||("http:"===r?80:"https:"===r?443:void 0),o=t.hostname,i=t.path;return t.search&&(i+=t.search),t.proxy&&(i=r+"//"+o+i,o=t.proxy.host||t.proxy.hostname,n=t.proxy.port,r=t.proxy.protocol||r),{protocol:r,hostname:o,path:i,port:n,method:e}}function a(t,e){var r=/\/$/.test(t),n=/^\//.test(e);return r&&n?e=e.substring(1):r||n||(e="/"+e),t+e}var s=r(5);t.exports={buildPayload:n,getTransportFromOptions:o,transportOptions:i,appendPathToPath:a}},function(t,e,r){"use strict";function n(){var t=Array.prototype.slice.call(arguments,0);t.unshift("Rollbar:"),a.ieVersion()<=8?console.error(s.formatArgsAsString(t)):console.error.apply(console,t);
}function o(){var t=Array.prototype.slice.call(arguments,0);t.unshift("Rollbar:"),a.ieVersion()<=8?console.info(s.formatArgsAsString(t)):console.info.apply(console,t)}function i(){var t=Array.prototype.slice.call(arguments,0);t.unshift("Rollbar:"),a.ieVersion()<=8?console.log(s.formatArgsAsString(t)):console.log.apply(console,t)}r(14);var a=r(15),s=r(5);t.exports={error:n,info:o,log:i}},function(t,e){!function(t){"use strict";t.console||(t.console={});for(var e,r,n=t.console,o=function(){},i=["memory"],a="assert,clear,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn".split(",");e=i.pop();)n[e]||(n[e]={});for(;r=a.pop();)n[r]||(n[r]=o)}("undefined"==typeof window?this:window)},function(t,e){"use strict";function r(){var t;if(!document)return t;for(var e=3,r=document.createElement("div"),n=r.getElementsByTagName("i");r.innerHTML="<!--[if gt IE "+ ++e+"]><i></i><![endif]-->",n[0];);return e>4?e:t}var n={ieVersion:r};t.exports=n},function(t,e){"use strict";function r(t,e,r){if(t){var o;if("function"==typeof e._rollbarOldOnError)o=e._rollbarOldOnError;else if(t.onerror){for(o=t.onerror;o._rollbarOldOnError;)o=o._rollbarOldOnError;e._rollbarOldOnError=o}var i=function(){var r=Array.prototype.slice.call(arguments,0);n(t,e,o,r)};r&&(i._rollbarOldOnError=o),t.onerror=i}}function n(t,e,r,n){t._rollbarWrappedError&&(n[4]||(n[4]=t._rollbarWrappedError),n[5]||(n[5]=t._rollbarWrappedError._rollbarContext),t._rollbarWrappedError=null),e.handleUncaughtException.apply(e,n),r&&r.apply(t,n)}function o(t,e,r){if(t){"function"==typeof t._rollbarURH&&t._rollbarURH.belongsToShim&&t.removeEventListener("unhandledrejection",t._rollbarURH);var n=function(t){var r,n,o;try{r=t.reason}catch(t){r=void 0}try{n=t.promise}catch(t){n="[unhandledrejection] error getting `promise` from event"}try{o=t.detail,!r&&o&&(r=o.reason,n=o.promise)}catch(t){}r||(r="[unhandledrejection] error getting `reason` from event"),e&&e.handleUnhandledRejection&&e.handleUnhandledRejection(r,n)};n.belongsToShim=r,t._rollbarURH=n,t.addEventListener("unhandledrejection",n)}}function i(t,e,r){if(t){var n,o,i="EventTarget,Window,Node,ApplicationCache,AudioTrackList,ChannelMergerNode,CryptoOperation,EventSource,FileReader,HTMLUnknownElement,IDBDatabase,IDBRequest,IDBTransaction,KeyOperation,MediaController,MessagePort,ModalWindow,Notification,SVGElementInstance,Screen,TextTrack,TextTrackCue,TextTrackList,WebSocket,WebSocketWorker,Worker,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload".split(",");for(n=0;n<i.length;++n)o=i[n],t[o]&&t[o].prototype&&a(e,t[o].prototype,r)}}function a(t,e,r){if(e.hasOwnProperty&&e.hasOwnProperty("addEventListener")){for(var n=e.addEventListener;n._rollbarOldAdd&&n.belongsToShim;)n=n._rollbarOldAdd;var o=function(e,r,o){n.call(this,e,t.wrap(r),o)};o._rollbarOldAdd=n,o.belongsToShim=r,e.addEventListener=o;for(var i=e.removeEventListener;i._rollbarOldRemove&&i.belongsToShim;)i=i._rollbarOldRemove;var a=function(t,e,r){i.call(this,t,e&&e._rollbar_wrapped||e,r)};a._rollbarOldRemove=i,a.belongsToShim=r,e.removeEventListener=a}}t.exports={captureUncaughtExceptions:r,captureUnhandledRejections:o,wrapGlobals:i}},function(t,e,r){"use strict";function n(t,e,r,n,o){n&&l.isFunction(n)||(n=function(){}),l.addParamsAndAccessTokenToPath(t,e,r);var a="GET",s=l.formatUrl(e);i(t,s,a,null,n,o)}function o(t,e,r,n,o){if(n&&l.isFunction(n)||(n=function(){}),!r)return n(new Error("Cannot send empty request"));var a=p.truncate(r);if(a.error)return n(a.error);var s=a.value,u="POST",c=l.formatUrl(e);i(t,c,u,s,n,o)}function i(t,e,r,n,o,i){var p;if(p=i?i():a(),!p)return o(new Error("No way to send a request"));try{try{var h=function(){try{if(h&&4===p.readyState){h=void 0;var t=l.jsonParse(p.responseText);if(s(p))return void o(t.error,t.value);if(u(p)){if(403===p.status){var e=t.value&&t.value.message;f.error(e)}o(new Error(String(p.status)))}else{var r="XHR response had no status code (likely connection failure)";o(c(r))}}}catch(t){var n;n=t&&t.stack?t:new Error(t),o(n)}};p.open(r,e,!0),p.setRequestHeader&&(p.setRequestHeader("Content-Type","application/json"),p.setRequestHeader("X-Rollbar-Access-Token",t)),p.onreadystatechange=h,p.send(n)}catch(t){if("undefined"!=typeof XDomainRequest){if(!window||!window.location)return o(new Error("No window available during request, unknown environment"));"http:"===window.location.href.substring(0,5)&&"https"===e.substring(0,5)&&(e="http"+e.substring(5));var d=new XDomainRequest;d.onprogress=function(){},d.ontimeout=function(){var t="Request timed out",e="ETIMEDOUT";o(c(t,e))},d.onerror=function(){o(new Error("Error during request"))},d.onload=function(){var t=l.jsonParse(d.responseText);o(t.error,t.value)},d.open(r,e,!0),d.send(n)}else o(new Error("Cannot find a method to transport a request"))}}catch(t){o(t)}}function a(){var t,e,r=[function(){return new XMLHttpRequest},function(){return new ActiveXObject("Msxml2.XMLHTTP")},function(){return new ActiveXObject("Msxml3.XMLHTTP")},function(){return new ActiveXObject("Microsoft.XMLHTTP")}],n=r.length;for(e=0;e<n;e++)try{t=r[e]();break}catch(t){}return t}function s(t){return t&&t.status&&200===t.status}function u(t){return t&&l.isType(t.status,"number")&&t.status>=400&&t.status<600}function c(t,e){var r=new Error(t);return r.code=e||"ENOTFOUND",r}var l=r(5),p=r(18),f=r(13);t.exports={get:n,post:o}},function(t,e,r){"use strict";function n(t,e){return[t,f.stringify(t,e)]}function o(t,e){var r=t.length;return r>2*e?t.slice(0,e).concat(t.slice(r-e)):t}function i(t,e,r){r="undefined"==typeof r?30:r;var n,i=t.data.body;if(i.trace_chain)for(var a=i.trace_chain,s=0;s<a.length;s++)n=a[s].frames,n=o(n,r),a[s].frames=n;else i.trace&&(n=i.trace.frames,n=o(n,r),i.trace.frames=n);return[t,f.stringify(t,e)]}function a(t,e){return e&&e.length>t?e.slice(0,t-3).concat("..."):e}function s(t,e,r){function n(e,r,o){switch(f.typeName(r)){case"string":return a(t,r);case"object":case"array":return f.traverse(r,n,o);default:return r}}return e=f.traverse(e,n,[]),[e,f.stringify(e,r)]}function u(t){return t.exception&&(delete t.exception.description,t.exception.message=a(255,t.exception.message)),t.frames=o(t.frames,1),t}function c(t,e){var r=t.data.body;if(r.trace_chain)for(var n=r.trace_chain,o=0;o<n.length;o++)n[o]=u(n[o]);else r.trace&&(r.trace=u(r.trace));return[t,f.stringify(t,e)]}function l(t,e){return t.length>e}function p(t,e,r){r="undefined"==typeof r?524288:r;for(var o,a,u,p=[n,i,s.bind(null,1024),s.bind(null,512),s.bind(null,256),c];o=p.shift();)if(a=o(t,e),t=a[0],u=a[1],u.error||!l(u.value,r))return u;return u}var f=r(5);t.exports={truncate:p,raw:n,truncateFrames:i,truncateStrings:s,maybeTruncateValue:a}},function(t,e){"use strict";function r(t){var e,r,n={protocol:null,auth:null,host:null,path:null,hash:null,href:t,hostname:null,port:null,pathname:null,search:null,query:null};if(e=t.indexOf("//"),e!==-1?(n.protocol=t.substring(0,e),r=e+2):r=0,e=t.indexOf("@",r),e!==-1&&(n.auth=t.substring(r,e),r=e+1),e=t.indexOf("/",r),e===-1){if(e=t.indexOf("?",r),e===-1)return e=t.indexOf("#",r),e===-1?n.host=t.substring(r):(n.host=t.substring(r,e),n.hash=t.substring(e)),n.hostname=n.host.split(":")[0],n.port=n.host.split(":")[1],n.port&&(n.port=parseInt(n.port,10)),n;n.host=t.substring(r,e),n.hostname=n.host.split(":")[0],n.port=n.host.split(":")[1],n.port&&(n.port=parseInt(n.port,10)),r=e}else n.host=t.substring(r,e),n.hostname=n.host.split(":")[0],n.port=n.host.split(":")[1],n.port&&(n.port=parseInt(n.port,10)),r=e;if(e=t.indexOf("#",r),e===-1?n.path=t.substring(r):(n.path=t.substring(r,e),n.hash=t.substring(e)),n.path){var o=n.path.split("?");n.pathname=o[0],n.query=o[1],n.search=n.query?"?"+n.query:null}return n}t.exports={parse:r}},function(t,e,r){"use strict";function n(t,e,r){if(t.data=t.data||{},t.err)try{t.stackInfo=t.err._savedStackTrace||d.parse(t.err)}catch(e){m.error("Error while parsing the error object.",e);try{t.message=t.err.message||t.err.description||t.message||String(t.err)}catch(e){t.message=String(t.err)||String(e)}delete t.err}r(null,t)}function o(t,e,r){t.message||t.stackInfo||t.custom||r(new Error("No message, stack info, or custom data"),null),r(null,t)}function i(t,e,r){var n=e.payload&&e.payload.environment||e.environment;t.data=h.merge(t.data,{environment:n,level:t.level,endpoint:e.endpoint,platform:"browser",framework:"browser-js",language:"javascript",server:{},uuid:t.uuid,notifier:{name:"rollbar-browser-js",version:e.version}}),r(null,t)}function a(t){return function(e,r,n){if(!t||!t.location)return n(null,e);var o="$remote_ip";r.captureIp?r.captureIp!==!0&&(o+="_anonymize"):o=null,h.set(e,"data.request",{url:t.location.href,query_string:t.location.search,user_ip:o}),n(null,e)}}function s(t){return function(e,r,n){if(!t)return n(null,e);var o=t.navigator||{},i=t.screen||{};h.set(e,"data.client",{runtime_ms:e.timestamp-t._rollbarStartTime,timestamp:Math.round(e.timestamp/1e3),javascript:{browser:o.userAgent,language:o.language,cookie_enabled:o.cookieEnabled,screen:{width:i.width,height:i.height}}}),n(null,e)}}function u(t){return function(e,r,n){if(!t||!t.navigator)return n(null,e);for(var o,i=[],a=t.navigator.plugins||[],s=0,u=a.length;s<u;++s)o=a[s],i.push({name:o.name,description:o.description});h.set(e,"data.client.javascript.plugins",i),n(null,e)}}function c(t,e,r){t.stackInfo?p(t,e,r):l(t,e,r)}function l(t,e,r){var n=t.message,o=t.custom;if(!n)if(o){var i=e.scrubFields,a=h.stringify(h.scrub(o,i));n=a.error||a.value||""}else n="";var s={body:n};o&&(s.extra=h.merge(o)),h.set(t,"data.body",{message:s}),r(null,t)}function p(t,e,r){var n=t.data.description,o=t.stackInfo,i=t.custom,a=d.guessErrorClass(o.message),s=o.name||a[0],u=a[1],c={exception:{class:s,message:u}};n&&(c.exception.description=n);var p=o.stack;if(p&&0===p.length&&t._unhandledStackInfo&&t._unhandledStackInfo.stack&&(p=t._unhandledStackInfo.stack),p){0===p.length&&(c.exception.stack=o.rawStack,c.exception.raw=String(o.rawException));var f,m,g,v,y,b,w,_;for(c.frames=[],w=0;w<p.length;++w)f=p[w],m={filename:f.url?h.sanitizeUrl(f.url):"(unknown)",lineno:f.line||null,method:f.func&&"?"!==f.func?f.func:"[anonymous]",colno:f.column},e.sendFrameUrl&&(m.url=f.url),m.method&&m.method.endsWith&&m.method.endsWith("_rollbar_wrapped")||(g=v=y=null,b=f.context?f.context.length:0,b&&(_=Math.floor(b/2),v=f.context.slice(0,_),g=f.context[_],y=f.context.slice(_)),g&&(m.code=g),(v||y)&&(m.context={},v&&v.length&&(m.context.pre=v),y&&y.length&&(m.context.post=y)),f.args&&(m.args=f.args),c.frames.push(m));c.frames.reverse(),i&&(c.extra=h.merge(i)),h.set(t,"data.body",{trace:c}),r(null,t)}else t.message=s+": "+u,l(t,e,r)}function f(t,e,r){var n=e.scrubFields;t.data=h.scrub(t.data,n),r(null,t)}var h=r(5),d=r(21),m=r(13);t.exports={handleItemWithError:n,ensureItemHasSomethingToSay:o,addBaseInfo:i,addRequestInfo:a,addClientInfo:s,addPluginInfo:u,addBody:c,scrubPayload:f}},function(t,e,r){"use strict";function n(){return l}function o(){return null}function i(t){var e={};return e._stackFrame=t,e.url=t.fileName,e.line=t.lineNumber,e.func=t.functionName,e.column=t.columnNumber,e.args=t.args,e.context=o(),e}function a(t){function e(){var e,r=[];if(t.stack)e=t;else try{throw t}catch(t){e=t}try{r=c.parse(e)}catch(t){r=[]}for(var n=[],o=0;o<r.length;o++)n.push(new i(r[o]));return n}var r=t.constructor&&t.constructor.name;return(!r||!r.length||r.length<3)&&(r=t.name),{stack:e(),message:t.message,name:r,rawStack:t.stack,rawException:t}}function s(t){return new a(t)}function u(t){if(!t||!t.match)return["Unknown error. There was no error message to display.",""];var e=t.match(p),r="(unknown)";return e&&(r=e[e.length-1],t=t.replace((e[e.length-2]||"")+r+":",""),t=t.replace(/(^[\s]+|[\s]+$)/g,"")),[r,t]}var c=r(22),l="?",p=new RegExp("^(([a-zA-Z0-9-_$ ]*): *)?(Uncaught )?([a-zA-Z0-9-_$ ]*): ");t.exports={guessFunctionName:n,guessErrorClass:u,gatherContext:o,parse:s,Stack:a,Frame:i}},function(t,e,r){var n,o,i;!function(a,s){"use strict";o=[r(23)],n=s,i="function"==typeof n?n.apply(e,o):n,!(void 0!==i&&(t.exports=i))}(this,function(t){"use strict";function e(t,e,r){if("function"==typeof Array.prototype.map)return t.map(e,r);for(var n=new Array(t.length),o=0;o<t.length;o++)n[o]=e.call(r,t[o]);return n}function r(t,e,r){if("function"==typeof Array.prototype.filter)return t.filter(e,r);for(var n=[],o=0;o<t.length;o++)e.call(r,t[o])&&n.push(t[o]);return n}var n=/(^|@)\S+\:\d+/,o=/^\s*at .*(\S+\:\d+|\(native\))/m,i=/^(eval@)?(\[native code\])?$/;return{parse:function(t){if("undefined"!=typeof t.stacktrace||"undefined"!=typeof t["opera#sourceloc"])return this.parseOpera(t);if(t.stack&&t.stack.match(o))return this.parseV8OrIE(t);if(t.stack)return this.parseFFOrSafari(t);throw new Error("Cannot parse given Error object")},extractLocation:function(t){if(t.indexOf(":")===-1)return[t];var e=t.replace(/[\(\)\s]/g,"").split(":"),r=e.pop(),n=e[e.length-1];if(!isNaN(parseFloat(n))&&isFinite(n)){var o=e.pop();return[e.join(":"),o,r]}return[e.join(":"),r,void 0]},parseV8OrIE:function(n){var i=r(n.stack.split("\n"),function(t){return!!t.match(o)},this);return e(i,function(e){e.indexOf("(eval ")>-1&&(e=e.replace(/eval code/g,"eval").replace(/(\(eval at [^\()]*)|(\)\,.*$)/g,""));var r=e.replace(/^\s+/,"").replace(/\(eval code/g,"(").split(/\s+/).slice(1),n=this.extractLocation(r.pop()),o=r.join(" ")||void 0,i="eval"===n[0]?void 0:n[0];return new t(o,void 0,i,n[1],n[2],e)},this)},parseFFOrSafari:function(n){var o=r(n.stack.split("\n"),function(t){return!t.match(i)},this);return e(o,function(e){if(e.indexOf(" > eval")>-1&&(e=e.replace(/ line (\d+)(?: > eval line \d+)* > eval\:\d+\:\d+/g,":$1")),e.indexOf("@")===-1&&e.indexOf(":")===-1)return new t(e);var r=e.split("@"),n=this.extractLocation(r.pop()),o=r.shift()||void 0;return new t(o,void 0,n[0],n[1],n[2],e)},this)},parseOpera:function(t){return!t.stacktrace||t.message.indexOf("\n")>-1&&t.message.split("\n").length>t.stacktrace.split("\n").length?this.parseOpera9(t):t.stack?this.parseOpera11(t):this.parseOpera10(t)},parseOpera9:function(e){for(var r=/Line (\d+).*script (?:in )?(\S+)/i,n=e.message.split("\n"),o=[],i=2,a=n.length;i<a;i+=2){var s=r.exec(n[i]);s&&o.push(new t(void 0,void 0,s[2],s[1],void 0,n[i]))}return o},parseOpera10:function(e){for(var r=/Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i,n=e.stacktrace.split("\n"),o=[],i=0,a=n.length;i<a;i+=2){var s=r.exec(n[i]);s&&o.push(new t(s[3]||void 0,void 0,s[2],s[1],void 0,n[i]))}return o},parseOpera11:function(o){var i=r(o.stack.split("\n"),function(t){return!!t.match(n)&&!t.match(/^Error created at/)},this);return e(i,function(e){var r,n=e.split("@"),o=this.extractLocation(n.pop()),i=n.shift()||"",a=i.replace(/<anonymous function(: (\w+))?>/,"$2").replace(/\([^\)]*\)/g,"")||void 0;i.match(/\(([^\)]*)\)/)&&(r=i.replace(/^[^\(]+\(([^\)]*)\)$/,"$1"));var s=void 0===r||"[arguments not available]"===r?void 0:r.split(",");return new t(a,s,o[0],o[1],o[2],e)},this)}}})},function(t,e,r){var n,o,i;!function(r,a){"use strict";o=[],n=a,i="function"==typeof n?n.apply(e,o):n,!(void 0!==i&&(t.exports=i))}(this,function(){"use strict";function t(t){return!isNaN(parseFloat(t))&&isFinite(t)}function e(t,e,r,n,o,i){void 0!==t&&this.setFunctionName(t),void 0!==e&&this.setArgs(e),void 0!==r&&this.setFileName(r),void 0!==n&&this.setLineNumber(n),void 0!==o&&this.setColumnNumber(o),void 0!==i&&this.setSource(i)}return e.prototype={getFunctionName:function(){return this.functionName},setFunctionName:function(t){this.functionName=String(t)},getArgs:function(){return this.args},setArgs:function(t){if("[object Array]"!==Object.prototype.toString.call(t))throw new TypeError("Args must be an Array");this.args=t},getFileName:function(){return this.fileName},setFileName:function(t){this.fileName=String(t)},getLineNumber:function(){return this.lineNumber},setLineNumber:function(e){if(!t(e))throw new TypeError("Line Number must be a Number");this.lineNumber=Number(e)},getColumnNumber:function(){return this.columnNumber},setColumnNumber:function(e){if(!t(e))throw new TypeError("Column Number must be a Number");this.columnNumber=Number(e)},getSource:function(){return this.source},setSource:function(t){this.source=String(t)},toString:function(){var e=this.getFunctionName()||"{anonymous}",r="("+(this.getArgs()||[]).join(",")+")",n=this.getFileName()?"@"+this.getFileName():"",o=t(this.getLineNumber())?":"+this.getLineNumber():"",i=t(this.getColumnNumber())?":"+this.getColumnNumber():"";return e+r+n+o+i}},e})},function(t,e,r){"use strict";function n(t,e,r){var n=e.payload||{};n.body&&delete n.body;var o=u.merge(t.data,n);t._isUncaught&&(o._isUncaught=!0),t._originalArgs&&(o._originalArgs=t._originalArgs),r(null,o)}function o(t,e,r){t.telemetryEvents&&u.set(t,"data.body.telemetry",t.telemetryEvents),r(null,t)}function i(t,e,r){if(!t.message)return void r(null,t);var n="data.body.trace_chain.0",o=u.get(t,n);if(o||(n="data.body.trace",o=u.get(t,n)),o){if(!o.exception||!o.exception.description)return u.set(t,n+".exception.description",t.message),void r(null,t);var i=u.get(t,n+".extra")||{},a=u.merge(i,{message:t.message});u.set(t,n+".extra",a)}r(null,t)}function a(t){return function(e,r,n){var o=u.merge(e);try{u.isFunction(r.transform)&&r.transform(o.data,e)}catch(o){return r.transform=null,t.error("Error while calling custom transform() function. Removing custom transform().",o),void n(null,e)}n(null,o)}}function s(t,e,r){if(!e.sendConfig)return r(null,t);var n="_rollbarConfig",o=u.get(t,"data.custom")||{};o[n]=e,t.data.custom=o,r(null,t)}var u=r(5);t.exports={itemToPayload:n,addTelemetryData:o,addMessageWithError:i,userTransform:a,addConfigToPayload:s}},function(t,e,r){"use strict";function n(t,e){return!o.get(e,"plugins.jquery.ignoreAjaxErrors")||!o.get(t,"body.message.extra.isAjax")}var o=r(5);t.exports={checkIgnore:n}},function(t,e,r){"use strict";function n(t,e){var r=t.level,n=c.LEVELS[r]||0,o=e.reportLevel,i=c.LEVELS[o]||0;return!(n<i)}function o(t){return function(e,r){var n=!!e._isUncaught;delete e._isUncaught;var o=e._originalArgs;delete e._originalArgs;try{c.isFunction(r.onSendCallback)&&r.onSendCallback(n,o,e)}catch(e){r.onSendCallback=null,t.error("Error while calling onSendCallback, removing",e)}try{if(c.isFunction(r.checkIgnore)&&r.checkIgnore(n,o,e))return!1}catch(e){r.checkIgnore=null,t.error("Error while calling custom checkIgnore(), removing",e)}return!0}}function i(t){return function(e,r){return!s(e,r,"blacklist",t)}}function a(t){return function(e,r){return s(e,r,"whitelist",t)}}function s(t,e,r,n){var o=!1;"blacklist"===r&&(o=!0);var i,a,s,u,l,p,f,h,d,m;try{if(i=o?e.hostBlackList:e.hostWhiteList,f=i&&i.length,a=c.get(t,"body.trace"),!i||0===f)return!o;if(!a||!a.frames||0===a.frames.length)return!o;for(l=a.frames.length,d=0;d<l;d++){if(s=a.frames[d],u=s.filename,!c.isType(u,"string"))return!o;for(m=0;m<f;m++)if(p=i[m],h=new RegExp(p),h.test(u))return!0}}catch(t){o?e.hostBlackList=null:e.hostWhiteList=null;var g=o?"hostBlackList":"hostWhiteList";return n.error("Error while reading your configuration's "+g+" option. Removing custom "+g+".",t),!o}return!1}function u(t){return function(e,r){var n,o,i,a,s,u,l,p,f;try{if(s=!1,i=r.ignoredMessages,!i||0===i.length)return!0;if(l=e.body,p=c.get(l,"trace.exception.message"),f=c.get(l,"message.body"),n=p||f,!n)return!0;for(a=i.length,o=0;o<a&&(u=new RegExp(i[o],"gi"),!(s=u.test(n)));o++);}catch(e){r.ignoredMessages=null,t.error("Error while reading your configuration's ignoredMessages option. Removing custom ignoredMessages.")}return!s}}var c=r(5);t.exports={checkLevel:n,userCheckIgnore:o,urlIsNotBlacklisted:i,urlIsWhitelisted:a,messageIsIgnored:u}},function(t,e,r){"use strict";function n(t,e,r,n,o){var i=t[e];t[e]=r(i),n&&n[o].push([t,e,i])}function o(t,e){for(var r;t[e].length;)r=t[e].shift(),r[0][r[1]]=r[2]}function i(t){if(!t||!t.attributes)return null;for(var e=t.attributes,r=0;r<e.length;++r)if("name"===e[r].key)return e[r].value;return null}function a(t){for(var e=[],r=0;r<t.length;++r)e.push(new RegExp(t[r],"i"));return function(t){var r=i(t);if(!r)return!1;for(var n=0;n<e.length;++n)if(e[n].test(r))return!0;return!1}}function s(t,e,r,n,o){var i=t.autoInstrument;t.enabled===!1||i===!1?this.autoInstrument={}:(u.isType(i,"object")||(i=p),this.autoInstrument=u.merge(p,i)),this.scrubTelemetryInputs=!!t.scrubTelemetryInputs,this.telemetryScrubber=t.telemetryScrubber,this.defaultValueScrubber=a(t.scrubFields),this.telemeter=e,this.rollbar=r,this._window=n||{},this._document=o||{},this.replacements={network:[],log:[],navigation:[],connectivity:[]},this.eventRemovers={dom:[],connectivity:[]},this._location=this._window.location,this._lastHref=this._location&&this._location.href}var u=r(5),c=r(19),l=r(28),p={network:!0,networkResponseHeaders:!1,networkResponseBody:!1,networkRequestBody:!1,log:!0,dom:!0,navigation:!0,connectivity:!0};s.prototype.configure=function(t){var e=t.autoInstrument,r=u.merge(this.autoInstrument);t.enabled===!1||e===!1?this.autoInstrument={}:(u.isType(e,"object")||(e=p),this.autoInstrument=u.merge(p,e)),this.instrument(r),void 0!==t.scrubTelemetryInputs&&(this.scrubTelemetryInputs=!!t.scrubTelemetryInputs),void 0!==t.telemetryScrubber&&(this.telemetryScrubber=t.telemetryScrubber)},s.prototype.instrument=function(t){!this.autoInstrument.network||t&&t.network?!this.autoInstrument.network&&t&&t.network&&this.deinstrumentNetwork():this.instrumentNetwork(),!this.autoInstrument.log||t&&t.log?!this.autoInstrument.log&&t&&t.log&&this.deinstrumentConsole():this.instrumentConsole(),!this.autoInstrument.dom||t&&t.dom?!this.autoInstrument.dom&&t&&t.dom&&this.deinstrumentDom():this.instrumentDom(),!this.autoInstrument.navigation||t&&t.navigation?!this.autoInstrument.navigation&&t&&t.navigation&&this.deinstrumentNavigation():this.instrumentNavigation(),!this.autoInstrument.connectivity||t&&t.connectivity?!this.autoInstrument.connectivity&&t&&t.connectivity&&this.deinstrumentConnectivity():this.instrumentConnectivity()},s.prototype.deinstrumentNetwork=function(){o(this.replacements,"network")},s.prototype.instrumentNetwork=function(){function t(t,r){t in r&&u.isFunction(r[t])&&n(r,t,function(t){return e.rollbar.wrap(t)})}var e=this;if("XMLHttpRequest"in this._window){var r=this._window.XMLHttpRequest.prototype;n(r,"open",function(t){return function(e,r){return u.isType(r,"string")&&(this.__rollbar_xhr={method:e,url:r,status_code:null,start_time_ms:u.now(),end_time_ms:null}),t.apply(this,arguments)}},this.replacements,"network"),n(r,"send",function(r){return function(o){function i(){if(a.__rollbar_xhr){if(null===a.__rollbar_xhr.status_code){a.__rollbar_xhr.status_code=0;var t=null;e.autoInstrument.networkRequestBody&&(t=o),a.__rollbar_event=e.telemeter.captureNetwork(a.__rollbar_xhr,"xhr",void 0,t)}if(a.readyState<2&&(a.__rollbar_xhr.start_time_ms=u.now()),a.readyState>3){a.__rollbar_xhr.end_time_ms=u.now();var r=null;if(e.autoInstrument.networkResponseHeaders){var n=e.autoInstrument.networkResponseHeaders;r={};try{var i,s;if(n===!0){var c=a.getAllResponseHeaders();if(c){var l,p,f=c.trim().split(/[\r\n]+/);for(s=0;s<f.length;s++)l=f[s].split(": "),i=l.shift(),p=l.join(": "),r[i]=p}}else for(s=0;s<n.length;s++)i=n[s],r[i]=a.getResponseHeader(i)}catch(t){}}var h=null;if(e.autoInstrument.networkResponseBody)try{h=a.responseText}catch(t){}var d=null;(h||r)&&(d={},h&&(d.body=h),r&&(d.headers=r)),d&&(a.__rollbar_xhr.response=d);try{var m=a.status;m=1223===m?204:m,a.__rollbar_xhr.status_code=m,a.__rollbar_event.level=e.telemeter.levelFromStatus(m)}catch(t){}}}}var a=this;return t("onload",a),t("onerror",a),t("onprogress",a),"onreadystatechange"in a&&u.isFunction(a.onreadystatechange)?n(a,"onreadystatechange",function(t){return e.rollbar.wrap(t,void 0,i)}):a.onreadystatechange=i,r.apply(this,arguments)}},this.replacements,"network")}"fetch"in this._window&&n(this._window,"fetch",function(t){return function(r,n){for(var o=new Array(arguments.length),i=0,a=o.length;i<a;i++)o[i]=arguments[i];var s,c=o[0],l="GET";u.isType(c,"string")?s=c:c&&(s=c.url,c.method&&(l=c.method)),o[1]&&o[1].method&&(l=o[1].method);var p={method:l,url:s,status_code:null,start_time_ms:u.now(),end_time_ms:null},f=null;return e.autoInstrument.networkRequestBody&&(o[1]&&o[1].body?f=o[1].body:o[0]&&!u.isType(o[0],"string")&&o[0].body&&(f=o[0].body)),e.telemeter.captureNetwork(p,"fetch",void 0,f),t.apply(this,o).then(function(t){p.end_time_ms=u.now(),p.status_code=t.status;var r=null;if(e.autoInstrument.networkResponseHeaders){var n=e.autoInstrument.networkResponseHeaders;r={};try{if(n===!0);else for(var o=0;o<n.length;o++){var i=n[o];r[i]=t.headers.get(i)}}catch(t){}}var a=null;return r&&(a={headers:r}),a&&(p.response=a),t})}},this.replacements,"network")},s.prototype.deinstrumentConsole=function(){if("console"in this._window&&this._window.console.log)for(var t;this.replacements.log.length;)t=this.replacements.log.shift(),this._window.console[t[0]]=t[1]},s.prototype.instrumentConsole=function(){function t(t){var n=r[t],o=r,i="warn"===t?"warning":t;r[t]=function(){var t=Array.prototype.slice.call(arguments),r=u.formatArgsAsString(t);e.telemeter.captureLog(r,i),n&&Function.prototype.apply.call(n,o,t)},e.replacements.log.push([t,n])}if("console"in this._window&&this._window.console.log)for(var e=this,r=this._window.console,n=["debug","info","warn","error","log"],o=0,i=n.length;o<i;o++)t(n[o])},s.prototype.deinstrumentDom=function(){("addEventListener"in this._window||"attachEvent"in this._window)&&this.removeListeners("dom")},s.prototype.instrumentDom=function(){if("addEventListener"in this._window||"attachEvent"in this._window){var t=this.handleClick.bind(this),e=this.handleBlur.bind(this);this.addListener("dom",this._window,"click","onclick",t,!0),this.addListener("dom",this._window,"blur","onfocusout",e,!0)}},s.prototype.handleClick=function(t){try{var e=l.getElementFromEvent(t,this._document),r=e&&e.tagName,n=l.isDescribedElement(e,"a")||l.isDescribedElement(e,"button");r&&(n||l.isDescribedElement(e,"input",["button","submit"]))?this.captureDomEvent("click",e):l.isDescribedElement(e,"input",["checkbox","radio"])&&this.captureDomEvent("input",e,e.value,e.checked)}catch(t){}},s.prototype.handleBlur=function(t){try{var e=l.getElementFromEvent(t,this._document);e&&e.tagName&&(l.isDescribedElement(e,"textarea")?this.captureDomEvent("input",e,e.value):l.isDescribedElement(e,"select")&&e.options&&e.options.length?this.handleSelectInputChanged(e):l.isDescribedElement(e,"input")&&!l.isDescribedElement(e,"input",["button","submit","hidden","checkbox","radio"])&&this.captureDomEvent("input",e,e.value))}catch(t){}},s.prototype.handleSelectInputChanged=function(t){if(t.multiple)for(var e=0;e<t.options.length;e++)t.options[e].selected&&this.captureDomEvent("input",t,t.options[e].value);else t.selectedIndex>=0&&t.options[t.selectedIndex]&&this.captureDomEvent("input",t,t.options[t.selectedIndex].value)},s.prototype.captureDomEvent=function(t,e,r,n){if(void 0!==r)if(this.scrubTelemetryInputs||"password"===l.getElementType(e))r="[scrubbed]";else{var o=l.describeElement(e);this.telemetryScrubber?this.telemetryScrubber(o)&&(r="[scrubbed]"):this.defaultValueScrubber(o)&&(r="[scrubbed]")}var i=l.elementArrayToString(l.treeToArray(e));this.telemeter.captureDom(t,i,r,n)},s.prototype.deinstrumentNavigation=function(){var t=this._window.chrome,e=t&&t.app&&t.app.runtime,r=!e&&this._window.history&&this._window.history.pushState;r&&o(this.replacements,"navigation")},s.prototype.instrumentNavigation=function(){var t=this._window.chrome,e=t&&t.app&&t.app.runtime,r=!e&&this._window.history&&this._window.history.pushState;if(r){var o=this;n(this._window,"onpopstate",function(t){return function(){var e=o._location.href;o.handleUrlChange(o._lastHref,e),t&&t.apply(this,arguments)}},this.replacements,"navigation"),n(this._window.history,"pushState",function(t){return function(){var e=arguments.length>2?arguments[2]:void 0;return e&&o.handleUrlChange(o._lastHref,e+""),t.apply(this,arguments)}},this.replacements,"navigation")}},s.prototype.handleUrlChange=function(t,e){var r=c.parse(this._location.href),n=c.parse(e),o=c.parse(t);this._lastHref=e,r.protocol===n.protocol&&r.host===n.host&&(e=n.path+(n.hash||"")),r.protocol===o.protocol&&r.host===o.host&&(t=o.path+(o.hash||"")),this.telemeter.captureNavigation(t,e)},s.prototype.deinstrumentConnectivity=function(){("addEventListener"in this._window||"body"in this._document)&&(this._window.addEventListener?this.removeListeners("connectivity"):o(this.replacements,"connectivity"))},s.prototype.instrumentConnectivity=function(){if("addEventListener"in this._window||"body"in this._document)if(this._window.addEventListener)this.addListener("connectivity",this._window,"online",void 0,function(){this.telemeter.captureConnectivityChange("online")}.bind(this),!0),this.addListener("connectivity",this._window,"offline",void 0,function(){this.telemeter.captureConnectivityChange("offline")}.bind(this),!0);else{var t=this;n(this._document.body,"ononline",function(e){return function(){t.telemeter.captureConnectivityChange("online"),e&&e.apply(this,arguments)}},this.replacements,"connectivity"),n(this._document.body,"onoffline",function(e){return function(){t.telemeter.captureConnectivityChange("offline"),e&&e.apply(this,arguments)}},this.replacements,"connectivity")}},s.prototype.addListener=function(t,e,r,n,o,i){e.addEventListener?(e.addEventListener(r,o,i),this.eventRemovers[t].push(function(){e.removeEventListener(r,o,i)})):n&&(e.attachEvent(n,o),this.eventRemovers[t].push(function(){e.detachEvent(n,o)}))},s.prototype.removeListeners=function(t){for(var e;this.eventRemovers[t].length;)(e=this.eventRemovers[t].shift())()},t.exports=s},function(t,e){"use strict";function r(t){return(t.getAttribute("type")||"").toLowerCase()}function n(t,e,n){if(t.tagName.toLowerCase()!==e.toLowerCase())return!1;if(!n)return!0;t=r(t);for(var o=0;o<n.length;o++)if(n[o]===t)return!0;return!1}function o(t,e){return t.target?t.target:e&&e.elementFromPoint?e.elementFromPoint(t.clientX,t.clientY):void 0}function i(t){for(var e,r=5,n=[],o=0;t&&o<r&&(e=u(t),"html"!==e.tagName);o++)n.unshift(e),t=t.parentNode;return n}function a(t){for(var e,r,n=80,o=" > ",i=o.length,a=[],u=0,c=t.length-1;c>=0;c--){if(e=s(t[c]),r=u+a.length*i+e.length,c<t.length-1&&r>=n+3){a.unshift("...");break}a.unshift(e),u+=e.length}return a.join(o)}function s(t){if(!t||!t.tagName)return"";var e=[t.tagName];t.id&&e.push("#"+t.id),t.classes&&e.push("."+t.classes.join("."));for(var r=0;r<t.attributes.length;r++)e.push("["+t.attributes[r].key+'="'+t.attributes[r].value+'"]');return e.join("")}function u(t){if(!t||!t.tagName)return null;var e,r,n,o,i={};i.tagName=t.tagName.toLowerCase(),t.id&&(i.id=t.id),e=t.className,e&&"string"==typeof e&&(i.classes=e.split(/\s+/));var a=["type","name","title","alt"];for(i.attributes=[],o=0;o<a.length;o++)r=a[o],n=t.getAttribute(r),n&&i.attributes.push({key:r,value:n});return i}t.exports={describeElement:u,descriptionToString:s,elementArrayToString:a,treeToArray:i,getElementFromEvent:o,isDescribedElement:n,getElementType:r}}])});
//# sourceMappingURL=rollbar.umd.min.js.map

/***/ }),

/***/ "./src/class/Analytics.js":
/*!********************************!*\
  !*** ./src/class/Analytics.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);



var Analytics =
/*#__PURE__*/
function () {
  function Analytics() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Analytics);

    this.tracker = undefined;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Analytics, [{
    key: "setTracker",
    value: function setTracker(tracker) {
      this.tracker = tracker;
    }
  }, {
    key: "sendAppView",
    value: function sendAppView(view) {
      if (typeof this.tracker !== "undefined") {
        this.tracker.sendAppView(view);
      }
    }
  }, {
    key: "sendEvent",
    value: function sendEvent(name, value) {
      if (typeof this.tracker !== "undefined") {
        this.tracker.sendEvent(name, value);
      }
    }
  }]);

  return Analytics;
}();

var analytics = new Analytics();
/* harmony default export */ __webpack_exports__["default"] = (analytics);

/***/ }),

/***/ "./src/class/BrowserStorage.js":
/*!*************************************!*\
  !*** ./src/class/BrowserStorage.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__);






/**
 * @typedef {Object} BrowserStorageGet
 * @property {Object} data
 * @property {string} data.access_token
 * @property {Boolean} data.auto_sync
 * @property {Object} options
 * @property {Boolean} options.disableScrobbling
 * @property {Boolean} options.allowGoogleAnalytics
 * @property {Boolean} options.allowRollbar
 * @property {Boolean} options.showNotifications
 * @property {Boolean} options.sendReceiveCorrections
 */
var BrowserStorage =
/*#__PURE__*/
function () {
  function BrowserStorage() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default()(this, BrowserStorage);

    this.sync();
  } // Returns false if window is not content_script, which sometimes fails to call browser.storage.
  // In this case, send a message so that the background script can handle browser.storage calls.


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default()(BrowserStorage, [{
    key: "isAvailable",
    value: function isAvailable() {
      return !!browser.tabs;
    }
  }, {
    key: "isSyncAvailable",
    value: function isSyncAvailable() {
      return !!browser.storage.sync;
    }
  }, {
    key: "sync",
    value: function () {
      var _sync = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var storage, key;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.isAvailable()) {
                  _context.next = 15;
                  break;
                }

                if (!this.isSyncAvailable()) {
                  _context.next = 13;
                  break;
                }

                _context.next = 4;
                return browser.storage.sync.get(null);

              case 4:
                storage = _context.sent;
                _context.t0 = _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.keys(storage);

              case 6:
                if ((_context.t1 = _context.t0()).done) {
                  _context.next = 13;
                  break;
                }

                key = _context.t1.value;

                if (!(storage.hasOwnProperty(key) && storage[key])) {
                  _context.next = 11;
                  break;
                }

                _context.next = 11;
                return this.set(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()({}, key, storage[key]));

              case 11:
                _context.next = 6;
                break;

              case 13:
                _context.next = 17;
                break;

              case 15:
                _context.next = 17;
                return browser.runtime.sendMessage({
                  type: "syncStorage"
                });

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function sync() {
        return _sync.apply(this, arguments);
      }

      return sync;
    }()
  }, {
    key: "set",
    value: function set(value, sync) {
      var _this = this;

      return new Promise(function (resolve) {
        if (_this.isAvailable()) {
          if (sync && _this.isSyncAvailable()) {
            browser.storage.sync.set(value);
          }

          browser.storage.local.set(value).then(resolve);
        } else {
          browser.runtime.sendMessage({
            type: "setStorageValue",
            value: value,
            sync: sync
          }).then(resolve);
        }
      });
    }
    /**
     * @param key
     * @returns {Promise<BrowserStorageGet>}
     */

  }, {
    key: "get",
    value: function get(key) {
      var _this2 = this;

      return new Promise(function (resolve) {
        if (_this2.isAvailable()) {
          browser.storage.local.get(key).then(resolve);
        } else {
          browser.runtime.sendMessage({
            type: "getStorageValue",
            key: key
          }).then(resolve);
        }
      });
    }
  }, {
    key: "remove",
    value: function remove(key, sync) {
      var _this3 = this;

      return new Promise(function (resolve) {
        if (_this3.isAvailable()) {
          if (sync && _this3.isSyncAvailable()) {
            browser.storage.sync.remove(key);
          }

          browser.storage.local.remove(key).then(resolve);
        } else {
          browser.runtime.sendMessage({
            type: "removeStorageValue",
            key: key,
            sync: sync
          }).then(resolve);
        }
      });
    }
  }, {
    key: "clear",
    value: function clear(sync) {
      var _this4 = this;

      return new Promise(function (resolve) {
        if (_this4.isAvailable()) {
          if (sync && _this4.isSyncAvailable()) {
            browser.storage.sync.clear();
          }

          browser.storage.local.clear().then(resolve);
        } else {
          browser.runtime.sendMessage({
            type: "clearStorage",
            sync: sync
          }).then(resolve);
        }
      });
    }
  }]);

  return BrowserStorage;
}();

var browserStorage = new BrowserStorage();
/* harmony default export */ __webpack_exports__["default"] = (browserStorage);

/***/ }),

/***/ "./src/class/Oauth.js":
/*!****************************!*\
  !*** ./src/class/Oauth.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../settings */ "./src/settings.js");
/* harmony import */ var _BrowserStorage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./BrowserStorage */ "./src/class/BrowserStorage.js");
/* harmony import */ var _Request__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Request */ "./src/class/Request.js");








var Oauth =
/*#__PURE__*/
function () {
  function Oauth() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, Oauth);

    this.sendResponse = null;
    this.authorizationTabId = null;
    this.authorizationError = null;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(Oauth, [{
    key: "isIdentityAvailable",
    value: function isIdentityAvailable() {
      return browser.identity && !this.authorizationError;
    }
  }, {
    key: "getCode",
    value: function getCode(redirectUrl) {
      return redirectUrl.split("?")[1].split("=")[1];
    }
  }, {
    key: "getAuthorizeUrl",
    value: function getAuthorizeUrl() {
      return "".concat(_settings__WEBPACK_IMPORTED_MODULE_4__["default"].authorizeUri, "?client_id=").concat(_settings__WEBPACK_IMPORTED_MODULE_4__["default"].clientId, "&redirect_uri=").concat(this.isIdentityAvailable() ? browser.identity.getRedirectURL() : _settings__WEBPACK_IMPORTED_MODULE_4__["default"].redirectUri, "&response_type=code");
    }
  }, {
    key: "requestToken",
    value: function requestToken(params) {
      return new Promise(function (resolve) {
        _Request__WEBPACK_IMPORTED_MODULE_6__["default"].send({
          method: "POST",
          url: "".concat(_settings__WEBPACK_IMPORTED_MODULE_4__["default"].apiUri, "/oauth/token"),
          params: params,
          success: function () {
            var _success = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
            /*#__PURE__*/
            _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(response) {
              var options;
              return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      options = JSON.parse(response);
                      _context.next = 3;
                      return _BrowserStorage__WEBPACK_IMPORTED_MODULE_5__["default"].set({
                        data: options
                      }, true);

                    case 3:
                      resolve({
                        error: false,
                        response: response
                      });

                    case 4:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            }));

            function success(_x) {
              return _success.apply(this, arguments);
            }

            return success;
          }(),
          error: function () {
            var _error = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
            /*#__PURE__*/
            _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(status, response) {
              return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return _BrowserStorage__WEBPACK_IMPORTED_MODULE_5__["default"].remove("data", true);

                    case 2:
                      resolve({
                        error: true,
                        response: response,
                        status: status
                      });

                    case 3:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2, this);
            }));

            function error(_x2, _x3) {
              return _error.apply(this, arguments);
            }

            return error;
          }()
        });
      });
    }
  }, {
    key: "authorize",
    value: function () {
      var _authorize = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(sendResponse, redirectUrl) {
        var params, options, tabs, tab;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this.isIdentityAvailable()) {
                  _context3.next = 11;
                  break;
                }

                _context3.prev = 1;
                _context3.next = 4;
                return browser.identity.launchWebAuthFlow({
                  url: this.getAuthorizeUrl(),
                  interactive: true
                });

              case 4:
                redirectUrl = _context3.sent;
                _context3.next = 11;
                break;

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](1);
                this.authorizationError = _context3.t0;
                console.log(_context3.t0);

              case 11:
                if (!redirectUrl) {
                  _context3.next = 20;
                  break;
                }

                params = {
                  code: this.getCode(redirectUrl),
                  client_id: _settings__WEBPACK_IMPORTED_MODULE_4__["default"].clientId,
                  client_secret: _settings__WEBPACK_IMPORTED_MODULE_4__["default"].clientSecret,
                  redirect_uri: this.isIdentityAvailable() ? browser.identity.getRedirectURL() : _settings__WEBPACK_IMPORTED_MODULE_4__["default"].redirectUri,
                  grant_type: "authorization_code"
                };
                _context3.next = 15;
                return this.requestToken(params);

              case 15:
                options = _context3.sent;

                if (this.authorizationTabId) {
                  browser.tabs.remove(this.authorizationTabId);
                  this.authorizationTabId = null;
                }

                if (this.sendResponse) {
                  this.sendResponse(options);
                  this.sendResponse = null;
                } else {
                  sendResponse(options);
                }

                _context3.next = 28;
                break;

              case 20:
                this.sendResponse = sendResponse;
                _context3.next = 23;
                return browser.tabs.query({
                  active: true,
                  currentWindow: true
                });

              case 23:
                tabs = _context3.sent;
                _context3.next = 26;
                return browser.tabs.create({
                  index: tabs[0].index,
                  url: this.getAuthorizeUrl()
                });

              case 26:
                tab = _context3.sent;
                this.authorizationTabId = tab.id;

              case 28:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[1, 7]]);
      }));

      function authorize(_x4, _x5) {
        return _authorize.apply(this, arguments);
      }

      return authorize;
    }()
  }, {
    key: "requestRefreshToken",
    value: function requestRefreshToken(refreshToken) {
      var params = {
        refresh_token: refreshToken,
        client_id: _settings__WEBPACK_IMPORTED_MODULE_4__["default"].clientId,
        client_secret: _settings__WEBPACK_IMPORTED_MODULE_4__["default"].clientSecret,
        redirect_uri: this.isIdentityAvailable() ? browser.identity.getRedirectURL() : _settings__WEBPACK_IMPORTED_MODULE_4__["default"].redirectUri,
        grant_type: "refresh_token"
      };
      return this.requestToken(params);
    }
  }, {
    key: "getUserInfo",
    value: function getUserInfo(_success2, _error2) {
      var _this2 = this;

      var _this = this;

      _Request__WEBPACK_IMPORTED_MODULE_6__["default"].send({
        method: "GET",
        url: "".concat(_settings__WEBPACK_IMPORTED_MODULE_4__["default"].apiUri, "/users/me"),
        success: function success(response) {
          _success2.call(_this2, response);
        },
        error: function () {
          var _error3 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
          /*#__PURE__*/
          _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4(status, response) {
            var storage, options;
            return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    if (!(status === 401)) {
                      _context4.next = 14;
                      break;
                    }

                    _context4.next = 3;
                    return _BrowserStorage__WEBPACK_IMPORTED_MODULE_5__["default"].get("data");

                  case 3:
                    storage = _context4.sent;

                    if (!(storage.data && storage.data.refresh_token)) {
                      _context4.next = 11;
                      break;
                    }

                    _context4.next = 7;
                    return _this.requestRefreshToken(storage.data.refresh_token);

                  case 7:
                    options = _context4.sent;

                    if (options.error) {
                      _error2.call(this, options.status, options.response);
                    } else {
                      _success2.call(this, options.response);
                    }

                    _context4.next = 12;
                    break;

                  case 11:
                    _error2.call(this, status, response);

                  case 12:
                    _context4.next = 15;
                    break;

                  case 14:
                    _error2.call(this, status, response);

                  case 15:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4, this);
          }));

          function error(_x6, _x7) {
            return _error3.apply(this, arguments);
          }

          return error;
        }()
      });
    }
  }]);

  return Oauth;
}();

var oauth = new Oauth();
/* harmony default export */ __webpack_exports__["default"] = (oauth);

/***/ }),

/***/ "./src/class/Permissions.js":
/*!**********************************!*\
  !*** ./src/class/Permissions.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);





var Permissions =
/*#__PURE__*/
function () {
  function Permissions() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, Permissions);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(Permissions, [{
    key: "contains",
    value: function () {
      var _contains = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var permissions,
            origins,
            _args = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                permissions = _args.length > 0 && _args[0] !== undefined ? _args[0] : [];
                origins = _args.length > 1 && _args[1] !== undefined ? _args[1] : [];
                _context.next = 4;
                return browser.permissions.contains({
                  permissions: permissions,
                  origins: origins
                });

              case 4:
                return _context.abrupt("return", _context.sent);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function contains() {
        return _contains.apply(this, arguments);
      }

      return contains;
    }()
  }, {
    key: "request",
    value: function () {
      var _request = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        var permissions,
            origins,
            result,
            _args2 = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                permissions = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : [];
                origins = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : [];
                _context2.next = 4;
                return this.contains(permissions, origins);

              case 4:
                result = _context2.sent;

                if (!result) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt("return", result);

              case 7:
                _context2.next = 9;
                return browser.permissions.request({
                  permissions: permissions,
                  origins: origins
                });

              case 9:
                return _context2.abrupt("return", _context2.sent);

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function request() {
        return _request.apply(this, arguments);
      }

      return request;
    }()
  }, {
    key: "remove",
    value: function () {
      var _remove = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {
        var permissions,
            origins,
            _args3 = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                permissions = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : [];
                origins = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : [];
                _context3.next = 4;
                return browser.permissions.remove({
                  permissions: permissions,
                  origins: origins
                });

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function remove() {
        return _remove.apply(this, arguments);
      }

      return remove;
    }()
  }]);

  return Permissions;
}();

var permissions = new Permissions();
/* harmony default export */ __webpack_exports__["default"] = (permissions);

/***/ }),

/***/ "./src/class/Request.js":
/*!******************************!*\
  !*** ./src/class/Request.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../settings */ "./src/settings.js");
/* harmony import */ var _BrowserStorage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./BrowserStorage */ "./src/class/BrowserStorage.js");







var Request =
/*#__PURE__*/
function () {
  function Request() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, Request);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(Request, [{
    key: "_send",
    value: function () {
      var _send2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(options) {
        var storage, xhr;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _BrowserStorage__WEBPACK_IMPORTED_MODULE_5__["default"].get("data");

              case 2:
                storage = _context.sent;
                xhr = new XMLHttpRequest();
                xhr.open(options.method, options.url, true);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.setRequestHeader("trakt-api-key", _settings__WEBPACK_IMPORTED_MODULE_4__["default"].clientId);
                xhr.setRequestHeader("trakt-api-version", _settings__WEBPACK_IMPORTED_MODULE_4__["default"].apiVersion);

                if (storage.data && storage.data.access_token) {
                  xhr.setRequestHeader("Authorization", "Bearer ".concat(storage.data.access_token));
                }

                xhr.timeout = 10000; // increase the timeout for trakt.tv calls

                xhr.onload = function () {
                  if (this.status >= 200 && this.status < 400) {
                    options.success.call(this, this.response);
                  } else {
                    options.error.call(this, this.status, this.responseText, {
                      url: options.url,
                      method: options.method,
                      params: options.params
                    });
                  }
                };

                xhr.onerror = function () {
                  options.error.call(this, this.status, this.responseText, {
                    url: options.url,
                    method: options.method,
                    params: options.params
                  });
                };

                xhr.send(JSON.stringify(options.params));

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _send(_x) {
        return _send2.apply(this, arguments);
      }

      return _send;
    }()
  }, {
    key: "send",
    value: function send(options) {
      // noinspection JSIgnoredPromiseFromCall
      return this._send(options);
    }
    /**
     * Does the same thing as send(), but meant to be used with async / await and try...catch instead of success / error callbacks.
     * Using send():
     *   send({ url: ..., success: response => { ... }, error: (status, response) => { ... } });
     * Using sendAndWait():
     *   async function () {
     *     try {
     *       response = await sendAndWait({ url: ... });
     *     } catch (error) {
     *       console.log(error.status, error.response);
     *     }
     *     // The benefit of using this method is that any code that needs to run after the request can be put here and it will run sequentially.
     *   }
     * @param {*} options
     */

  }, {
    key: "sendAndWait",
    value: function sendAndWait(options) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        options.success = function (response) {
          return resolve(response);
        };

        options.error = function (status, response, options) {
          return reject({
            status: status,
            response: response,
            options: options
          });
        };

        _this._send(options);
      });
    }
  }]);

  return Request;
}();

var request = new Request();
/* harmony default export */ __webpack_exports__["default"] = (request);

/***/ }),

/***/ "./src/class/Rollbar.js":
/*!******************************!*\
  !*** ./src/class/Rollbar.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var rollbar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rollbar */ "./node_modules/rollbar/dist/rollbar.umd.min.js");
/* harmony import */ var rollbar__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(rollbar__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../settings */ "./src/settings.js");
/* harmony import */ var _BrowserStorage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./BrowserStorage */ "./src/class/BrowserStorage.js");
/* harmony import */ var _Permissions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Permissions */ "./src/class/Permissions.js");









var Rollbar =
/*#__PURE__*/
function () {
  function Rollbar() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, Rollbar);

    this._config = {
      accessToken: _settings__WEBPACK_IMPORTED_MODULE_5__["default"].rollbarToken,
      autoInstrument: {
        network: false // If set to true, causes error on Firefox (see https://github.com/rollbar/rollbar.js/issues/638)

      },
      captureIp: false,
      captureUncaught: true,
      captureUnhandledRejections: true,
      payload: {
        environment: "production"
      }
    };
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(Rollbar, [{
    key: "init",
    value: function () {
      var _init = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var storage;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(typeof this._rollbar !== "undefined")) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return", this);

              case 2:
                _context.next = 4;
                return _BrowserStorage__WEBPACK_IMPORTED_MODULE_6__["default"].get("options");

              case 4:
                storage = _context.sent;
                _context.t0 = storage.options && storage.options.allowRollbar;

                if (!_context.t0) {
                  _context.next = 10;
                  break;
                }

                _context.next = 9;
                return _Permissions__WEBPACK_IMPORTED_MODULE_7__["default"].contains(undefined, ["*://api.rollbar.com/*"]);

              case 9:
                _context.t0 = _context.sent;

              case 10:
                if (!_context.t0) {
                  _context.next = 15;
                  break;
                }

                this._rollbar = rollbar__WEBPACK_IMPORTED_MODULE_4___default.a.init(this._config);
                window.Rollbar = this._rollbar;
                this.error = this._rollbar.error.bind(this._rollbar);
                this.warning = this._rollbar.warning.bind(this._rollbar);

              case 15:
                return _context.abrupt("return", this);

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "error",
    value: function error() {}
  }, {
    key: "warning",
    value: function warning() {}
  }]);

  return Rollbar;
}();

var rollbar = new Rollbar();
/* harmony default export */ __webpack_exports__["default"] = (rollbar);

/***/ }),

/***/ "./src/modules/background/index.js":
/*!*****************************************!*\
  !*** ./src/modules/background/index.js ***!
  \*****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _vendor_google_analytics_bundle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../vendor/google-analytics-bundle */ "./src/modules/vendor/google-analytics-bundle.js");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../settings */ "./src/settings.js");
/* harmony import */ var _class_Analytics__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../class/Analytics */ "./src/class/Analytics.js");
/* harmony import */ var _class_BrowserStorage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../class/BrowserStorage */ "./src/class/BrowserStorage.js");
/* harmony import */ var _class_Oauth__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../class/Oauth */ "./src/class/Oauth.js");
/* harmony import */ var _class_Permissions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../class/Permissions */ "./src/class/Permissions.js");
/* harmony import */ var _class_Rollbar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../class/Rollbar */ "./src/class/Rollbar.js");









/* global analytics */

/**
 * Google Analytics Object
 * @type {Object} analytics
 * @property {Function} getService
 * @property {Function} service.getTracker
 */

var service = analytics.getService("traktflix");
/**
 * @property {Function} addCallback
 */

service.getConfig().addCallback(
/*#__PURE__*/

/**
 * @param {Object} config
 * @property {Function} setTrackingPermitted
 */
function () {
  var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(config) {
    var storage, permitted, tracker;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _class_BrowserStorage__WEBPACK_IMPORTED_MODULE_5__["default"].get("options");

          case 2:
            storage = _context.sent;
            _context.t0 = storage.options && storage.options.allowGoogleAnalytics;

            if (!_context.t0) {
              _context.next = 8;
              break;
            }

            _context.next = 7;
            return _class_Permissions__WEBPACK_IMPORTED_MODULE_7__["default"].contains(undefined, ["*://google-analytics.com/*"]);

          case 7:
            _context.t0 = _context.sent;

          case 8:
            permitted = !!_context.t0;
            config.setTrackingPermitted(permitted);

            if (permitted) {
              tracker = service.getTracker(_settings__WEBPACK_IMPORTED_MODULE_3__["default"].analyticsId);
              _class_Analytics__WEBPACK_IMPORTED_MODULE_4__["default"].setTracker(tracker);
            }

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}()); // noinspection JSIgnoredPromiseFromCall

_class_Rollbar__WEBPACK_IMPORTED_MODULE_8__["default"].init();
var defs = {};

if (chrome && chrome.declarativeContent) {
  chrome.runtime.onInstalled.addListener(function () {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {
            hostSuffix: "netflix.com"
          }
        })],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
  });
} else {
  browser.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (typeof changeInfo.status === "undefined") {
      return;
    }

    if (changeInfo.status === "complete" && tab.url.match(/^https?:\/\/(www\.)?netflix\.com/)) {
      browser.pageAction.show(tabId);
    } else {
      browser.pageAction.hide(tabId);
    }
  });
}

browser.runtime.onMessage.addListener(function (request, sender) {
  return new Promise(
  /*#__PURE__*/
  function () {
    var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(resolve) {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.t0 = request.type;
              _context2.next = _context2.t0 === "getApiDefs" ? 3 : _context2.t0 === "setApiDefs" ? 5 : _context2.t0 === "authorize" ? 8 : _context2.t0 === "setActiveIcon" ? 10 : _context2.t0 === "setInactiveIcon" ? 12 : _context2.t0 === "launchAuthorize" ? 14 : _context2.t0 === "sendAppView" ? 16 : _context2.t0 === "sendEvent" ? 18 : _context2.t0 === "syncStorage" ? 20 : _context2.t0 === "removeStorageValue" ? 22 : _context2.t0 === "getStorageValue" ? 24 : _context2.t0 === "setStorageValue" ? 26 : _context2.t0 === "clearStorage" ? 28 : _context2.t0 === "showNotification" ? 30 : _context2.t0 === "showErrorNotification" ? 35 : 40;
              break;

            case 3:
              // noinspection JSIgnoredPromiseFromCall
              resolve(defs);
              return _context2.abrupt("return");

            case 5:
              // noinspection JSIgnoredPromiseFromCall
              defs.authUrl = request.authUrl;
              defs.buildIdentifier = request.buildIdentifier;
              return _context2.abrupt("break", 40);

            case 8:
              // noinspection JSIgnoredPromiseFromCall
              _class_Oauth__WEBPACK_IMPORTED_MODULE_6__["default"].authorize(null, request.url);
              return _context2.abrupt("break", 40);

            case 10:
              if (browser.pageAction.setIcon) {
                browser.pageAction.setIcon({
                  tabId: sender.tab.id,
                  path: browser.runtime.getURL("img/traktflix-icon-selected-38.png")
                });
              }

              return _context2.abrupt("break", 40);

            case 12:
              if (browser.pageAction.setIcon) {
                browser.pageAction.setIcon({
                  tabId: sender.tab.id,
                  path: browser.runtime.getURL("img/traktflix-icon-38.png")
                });
              }

              return _context2.abrupt("break", 40);

            case 14:
              // noinspection JSIgnoredPromiseFromCall
              _class_Oauth__WEBPACK_IMPORTED_MODULE_6__["default"].authorize(resolve);
              return _context2.abrupt("return");

            case 16:
              _class_Analytics__WEBPACK_IMPORTED_MODULE_4__["default"].sendAppView(request.view);
              return _context2.abrupt("break", 40);

            case 18:
              _class_Analytics__WEBPACK_IMPORTED_MODULE_4__["default"].sendEvent(request.name, request.value);
              return _context2.abrupt("break", 40);

            case 20:
              _class_BrowserStorage__WEBPACK_IMPORTED_MODULE_5__["default"].sync().then(resolve);
              return _context2.abrupt("return");

            case 22:
              _class_BrowserStorage__WEBPACK_IMPORTED_MODULE_5__["default"].remove(request.key, request.sync).then(resolve);
              return _context2.abrupt("return");

            case 24:
              _class_BrowserStorage__WEBPACK_IMPORTED_MODULE_5__["default"].get(request.key).then(resolve);
              return _context2.abrupt("return");

            case 26:
              _class_BrowserStorage__WEBPACK_IMPORTED_MODULE_5__["default"].set(request.value, request.sync).then(resolve);
              return _context2.abrupt("return");

            case 28:
              _class_BrowserStorage__WEBPACK_IMPORTED_MODULE_5__["default"].clear(request.sync).then(resolve);
              return _context2.abrupt("return");

            case 30:
              _context2.next = 32;
              return _class_Permissions__WEBPACK_IMPORTED_MODULE_7__["default"].contains(['notifications']);

            case 32:
              if (!_context2.sent) {
                _context2.next = 34;
                break;
              }

              browser.notifications.create({
                type: "basic",
                iconUrl: "images/traktflix-icon-128.png",
                title: request.title,
                message: request.message
              });

            case 34:
              return _context2.abrupt("break", 40);

            case 35:
              _context2.next = 37;
              return _class_Permissions__WEBPACK_IMPORTED_MODULE_7__["default"].contains(['notifications']);

            case 37:
              if (!_context2.sent) {
                _context2.next = 39;
                break;
              }

              browser.notifications.create({
                type: "basic",
                iconUrl: "images/traktflix-icon-128.png",
                title: browser.i18n.getMessage("errorNotification"),
                message: request.message
              });

            case 39:
              return _context2.abrupt("break", 40);

            case 40:
              resolve();

            case 41:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }());
});

/***/ }),

/***/ "./src/modules/vendor/google-analytics-bundle.js":
/*!*******************************************************!*\
  !*** ./src/modules/vendor/google-analytics-bundle.js ***!
  \*******************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);

(function () {
  'use strict';

  var h,
      aa = aa || {},
      k = this,
      m = function m(a) {
    return void 0 !== a;
  },
      ba = function ba() {},
      ca = function ca(a) {
    var b = _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(a);

    if ("object" == b) {
      if (a) {
        if (a instanceof Array) return "array";
        if (a instanceof Object) return b;
        var c = Object.prototype.toString.call(a);
        if ("[object Window]" == c) return "object";
        if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) return "array";
        if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) return "function";
      } else return "null";
    } else if ("function" == b && "undefined" == typeof a.call) return "object";
    return b;
  },
      n = function n(a) {
    return "array" == ca(a);
  },
      da = function da(a) {
    var b = ca(a);
    return "array" == b || "object" == b && "number" == typeof a.length;
  },
      p = function p(a) {
    return "string" == typeof a;
  },
      ea = function ea(a) {
    return "number" == typeof a;
  },
      q = function q(a) {
    return "function" == ca(a);
  },
      r = function r(a) {
    var b = _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(a);

    return "object" == b && null != a || "function" == b;
  },
      fa = function fa(a, b, c) {
    return a.call.apply(a.bind, arguments);
  },
      ga = function ga(a, b, c) {
    if (!a) throw Error();

    if (2 < arguments.length) {
      var d = Array.prototype.slice.call(arguments, 2);
      return function () {
        var c = Array.prototype.slice.call(arguments);
        Array.prototype.unshift.apply(c, d);
        return a.apply(b, c);
      };
    }

    return function () {
      return a.apply(b, arguments);
    };
  },
      _t = function t(a, b, c) {
    _t = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? fa : ga;
    return _t.apply(null, arguments);
  },
      ha = function ha(a, b) {
    var c = Array.prototype.slice.call(arguments, 1);
    return function () {
      var b = c.slice();
      b.push.apply(b, arguments);
      return a.apply(this, b);
    };
  },
      u = Date.now || function () {
    return +new Date();
  },
      v = function v(a, b) {
    var c = a.split("."),
        d = k;
    c[0] in d || !d.execScript || d.execScript("var " + c[0]);

    for (var e; c.length && (e = c.shift());) {
      !c.length && m(b) ? d[e] = b : d = d[e] ? d[e] : d[e] = {};
    }
  },
      w = function w(a, b) {
    function c() {}

    c.prototype = b.prototype;
    a.P = b.prototype;
    a.prototype = new c();

    a.ie = function (a, c, f) {
      for (var g = Array(arguments.length - 2), l = 2; l < arguments.length; l++) {
        g[l - 2] = arguments[l];
      }

      return b.prototype[c].apply(a, g);
    };
  };

  Function.prototype.bind = Function.prototype.bind || function (a, b) {
    if (1 < arguments.length) {
      var c = Array.prototype.slice.call(arguments, 1);
      c.unshift(this, a);
      return _t.apply(null, c);
    }

    return _t(this, a);
  };

  var x = function x(a) {
    if (Error.captureStackTrace) Error.captureStackTrace(this, x);else {
      var b = Error().stack;
      b && (this.stack = b);
    }
    a && (this.message = String(a));
  };

  w(x, Error);
  x.prototype.name = "CustomError";

  var ia = String.prototype.trim ? function (a) {
    return a.trim();
  } : function (a) {
    return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "");
  },
      ja = function ja(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  };

  var y = Array.prototype,
      ka = y.indexOf ? function (a, b, c) {
    return y.indexOf.call(a, b, c);
  } : function (a, b, c) {
    c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
    if (p(a)) return p(b) && 1 == b.length ? a.indexOf(b, c) : -1;

    for (; c < a.length; c++) {
      if (c in a && a[c] === b) return c;
    }

    return -1;
  },
      la = y.forEach ? function (a, b, c) {
    y.forEach.call(a, b, c);
  } : function (a, b, c) {
    for (var d = a.length, e = p(a) ? a.split("") : a, f = 0; f < d; f++) {
      f in e && b.call(c, e[f], f, a);
    }
  },
      ma = y.some ? function (a, b, c) {
    return y.some.call(a, b, c);
  } : function (a, b, c) {
    for (var d = a.length, e = p(a) ? a.split("") : a, f = 0; f < d; f++) {
      if (f in e && b.call(c, e[f], f, a)) return !0;
    }

    return !1;
  },
      na = y.every ? function (a, b, c) {
    return y.every.call(a, b, c);
  } : function (a, b, c) {
    for (var d = a.length, e = p(a) ? a.split("") : a, f = 0; f < d; f++) {
      if (f in e && !b.call(c, e[f], f, a)) return !1;
    }

    return !0;
  },
      pa = function pa(a) {
    var b;

    a: {
      b = oa;

      for (var c = a.length, d = p(a) ? a.split("") : a, e = 0; e < c; e++) {
        if (e in d && b.call(void 0, d[e], e, a)) {
          b = e;
          break a;
        }
      }

      b = -1;
    }

    return 0 > b ? null : p(a) ? a.charAt(b) : a[b];
  },
      qa = function qa(a, b) {
    var c = ka(a, b),
        d;
    (d = 0 <= c) && y.splice.call(a, c, 1);
    return d;
  },
      ra = function ra(a) {
    return y.concat.apply(y, arguments);
  },
      sa = function sa(a, b, c) {
    return 2 >= arguments.length ? y.slice.call(a, b) : y.slice.call(a, b, c);
  };

  var ta = "StopIteration" in k ? k.StopIteration : Error("StopIteration"),
      ua = function ua() {};

  ua.prototype.next = function () {
    throw ta;
  };

  ua.prototype.Sb = function () {
    return this;
  };

  var va = function va(a, b, c) {
    for (var d in a) {
      b.call(c, a[d], d, a);
    }
  },
      wa = function wa(a) {
    var b = [],
        c = 0,
        d;

    for (d in a) {
      b[c++] = a[d];
    }

    return b;
  },
      xa = function xa(a) {
    var b = [],
        c = 0,
        d;

    for (d in a) {
      b[c++] = d;
    }

    return b;
  },
      ya = function ya(a, b) {
    var c;

    a: {
      for (c in a) {
        if (b.call(void 0, a[c], c, a)) break a;
      }

      c = void 0;
    }

    return c && a[c];
  },
      za = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),
      Aa = function Aa(a, b) {
    for (var c, d, e = 1; e < arguments.length; e++) {
      d = arguments[e];

      for (c in d) {
        a[c] = d[c];
      }

      for (var f = 0; f < za.length; f++) {
        c = za[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
      }
    }
  },
      Ba = function Ba(a) {
    var b = arguments.length;
    if (1 == b && n(arguments[0])) return Ba.apply(null, arguments[0]);

    for (var c = {}, d = 0; d < b; d++) {
      c[arguments[d]] = !0;
    }

    return c;
  };

  var z = function z(a, b) {
    this.p = {};
    this.b = [];
    this.Ja = this.j = 0;
    var c = arguments.length;

    if (1 < c) {
      if (c % 2) throw Error("Uneven number of arguments");

      for (var d = 0; d < c; d += 2) {
        this.set(arguments[d], arguments[d + 1]);
      }
    } else a && this.ha(a);
  };

  z.prototype.t = function () {
    Ca(this);

    for (var a = [], b = 0; b < this.b.length; b++) {
      a.push(this.p[this.b[b]]);
    }

    return a;
  };

  z.prototype.H = function () {
    Ca(this);
    return this.b.concat();
  };

  z.prototype.T = function (a) {
    return A(this.p, a);
  };

  z.prototype.remove = function (a) {
    return A(this.p, a) ? (delete this.p[a], this.j--, this.Ja++, this.b.length > 2 * this.j && Ca(this), !0) : !1;
  };

  var Ca = function Ca(a) {
    if (a.j != a.b.length) {
      for (var b = 0, c = 0; b < a.b.length;) {
        var d = a.b[b];
        A(a.p, d) && (a.b[c++] = d);
        b++;
      }

      a.b.length = c;
    }

    if (a.j != a.b.length) {
      for (var e = {}, c = b = 0; b < a.b.length;) {
        d = a.b[b], A(e, d) || (a.b[c++] = d, e[d] = 1), b++;
      }

      a.b.length = c;
    }
  };

  h = z.prototype;

  h.get = function (a, b) {
    return A(this.p, a) ? this.p[a] : b;
  };

  h.set = function (a, b) {
    A(this.p, a) || (this.j++, this.b.push(a), this.Ja++);
    this.p[a] = b;
  };

  h.ha = function (a) {
    var b;
    a instanceof z ? (b = a.H(), a = a.t()) : (b = xa(a), a = wa(a));

    for (var c = 0; c < b.length; c++) {
      this.set(b[c], a[c]);
    }
  };

  h.forEach = function (a, b) {
    for (var c = this.H(), d = 0; d < c.length; d++) {
      var e = c[d],
          f = this.get(e);
      a.call(b, f, e, this);
    }
  };

  h.clone = function () {
    return new z(this);
  };

  h.Nb = function () {
    Ca(this);

    for (var a = {}, b = 0; b < this.b.length; b++) {
      var c = this.b[b];
      a[c] = this.p[c];
    }

    return a;
  };

  h.Sb = function (a) {
    Ca(this);
    var b = 0,
        c = this.b,
        d = this.p,
        e = this.Ja,
        f = this,
        g = new ua();

    g.next = function () {
      for (;;) {
        if (e != f.Ja) throw Error("The map has changed since the iterator was created");
        if (b >= c.length) throw ta;
        var g = c[b++];
        return a ? g : d[g];
      }
    };

    return g;
  };

  var A = function A(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
  };

  var Da,
      Ea,
      Fa = {
    id: "hitType",
    name: "t",
    valueType: "text",
    maxLength: void 0,
    defaultValue: void 0
  },
      Ga = {
    id: "sessionControl",
    name: "sc",
    valueType: "text",
    maxLength: void 0,
    defaultValue: void 0
  },
      Ha = {
    id: "description",
    name: "cd",
    valueType: "text",
    maxLength: 2048,
    defaultValue: void 0
  },
      Ia = {
    id: "eventCategory",
    name: "ec",
    valueType: "text",
    maxLength: 150,
    defaultValue: void 0
  },
      Ja = {
    id: "eventAction",
    name: "ea",
    valueType: "text",
    maxLength: 500,
    defaultValue: void 0
  },
      Ka = {
    id: "eventLabel",
    name: "el",
    valueType: "text",
    maxLength: 500,
    defaultValue: void 0
  },
      La = {
    id: "eventValue",
    name: "ev",
    valueType: "integer",
    maxLength: void 0,
    defaultValue: void 0
  },
      Ma = {
    zd: Fa,
    $c: {
      id: "anonymizeIp",
      name: "aip",
      valueType: "boolean",
      maxLength: void 0,
      defaultValue: void 0
    },
    Kd: {
      id: "queueTime",
      name: "qt",
      valueType: "integer",
      maxLength: void 0,
      defaultValue: void 0
    },
    fd: {
      id: "cacheBuster",
      name: "z",
      valueType: "text",
      maxLength: void 0,
      defaultValue: void 0
    },
    Qd: Ga,
    Rd: {
      id: "sessionGroup",
      name: "sg",
      valueType: "text",
      maxLength: void 0,
      defaultValue: void 0
    },
    ge: {
      id: "userId",
      name: "uid",
      valueType: "text",
      maxLength: void 0,
      defaultValue: void 0
    },
    Hd: {
      id: "nonInteraction",
      name: "ni",
      valueType: "boolean",
      maxLength: void 0,
      defaultValue: void 0
    },
    qd: Ha,
    $d: {
      id: "title",
      name: "dt",
      valueType: "text",
      maxLength: 1500,
      defaultValue: void 0
    },
    bd: {
      id: "appId",
      name: "aid",
      valueType: "text",
      maxLength: 150,
      defaultValue: void 0
    },
    cd: {
      id: "appInstallerId",
      name: "aiid",
      valueType: "text",
      maxLength: 150,
      defaultValue: void 0
    },
    td: Ia,
    sd: Ja,
    ud: Ka,
    vd: La,
    Td: {
      id: "socialNetwork",
      name: "sn",
      valueType: "text",
      maxLength: 50,
      defaultValue: void 0
    },
    Sd: {
      id: "socialAction",
      name: "sa",
      valueType: "text",
      maxLength: 50,
      defaultValue: void 0
    },
    Ud: {
      id: "socialTarget",
      name: "st",
      valueType: "text",
      maxLength: 2048,
      defaultValue: void 0
    },
    ce: {
      id: "transactionId",
      name: "ti",
      valueType: "text",
      maxLength: 500,
      defaultValue: void 0
    },
    be: {
      id: "transactionAffiliation",
      name: "ta",
      valueType: "text",
      maxLength: 500,
      defaultValue: void 0
    },
    de: {
      id: "transactionRevenue",
      name: "tr",
      valueType: "currency",
      maxLength: void 0,
      defaultValue: void 0
    },
    ee: {
      id: "transactionShipping",
      name: "ts",
      valueType: "currency",
      maxLength: void 0,
      defaultValue: void 0
    },
    fe: {
      id: "transactionTax",
      name: "tt",
      valueType: "currency",
      maxLength: void 0,
      defaultValue: void 0
    },
    od: {
      id: "currencyCode",
      name: "cu",
      valueType: "text",
      maxLength: 10,
      defaultValue: void 0
    },
    Dd: {
      id: "itemPrice",
      name: "ip",
      valueType: "currency",
      maxLength: void 0,
      defaultValue: void 0
    },
    Ed: {
      id: "itemQuantity",
      name: "iq",
      valueType: "integer",
      maxLength: void 0,
      defaultValue: void 0
    },
    Bd: {
      id: "itemCode",
      name: "ic",
      valueType: "text",
      maxLength: 500,
      defaultValue: void 0
    },
    Cd: {
      id: "itemName",
      name: "in",
      valueType: "text",
      maxLength: 500,
      defaultValue: void 0
    },
    Ad: {
      id: "itemCategory",
      name: "iv",
      valueType: "text",
      maxLength: 500,
      defaultValue: void 0
    },
    md: {
      id: "campaignSource",
      name: "cs",
      valueType: "text",
      maxLength: 100,
      defaultValue: void 0
    },
    kd: {
      id: "campaignMedium",
      name: "cm",
      valueType: "text",
      maxLength: 50,
      defaultValue: void 0
    },
    ld: {
      id: "campaignName",
      name: "cn",
      valueType: "text",
      maxLength: 100,
      defaultValue: void 0
    },
    jd: {
      id: "campaignKeyword",
      name: "ck",
      valueType: "text",
      maxLength: 500,
      defaultValue: void 0
    },
    gd: {
      id: "campaignContent",
      name: "cc",
      valueType: "text",
      maxLength: 500,
      defaultValue: void 0
    },
    hd: {
      id: "campaignId",
      name: "ci",
      valueType: "text",
      maxLength: 100,
      defaultValue: void 0
    },
    yd: {
      id: "gclid",
      name: "gclid",
      valueType: "text",
      maxLength: void 0,
      defaultValue: void 0
    },
    pd: {
      id: "dclid",
      name: "dclid",
      valueType: "text",
      maxLength: void 0,
      defaultValue: void 0
    },
    Jd: {
      id: "pageLoadTime",
      name: "plt",
      valueType: "integer",
      maxLength: void 0,
      defaultValue: void 0
    },
    rd: {
      id: "dnsTime",
      name: "dns",
      valueType: "integer",
      maxLength: void 0,
      defaultValue: void 0
    },
    Vd: {
      id: "tcpConnectTime",
      name: "tcp",
      valueType: "integer",
      maxLength: void 0,
      defaultValue: void 0
    },
    Pd: {
      id: "serverResponseTime",
      name: "srt",
      valueType: "integer",
      maxLength: void 0,
      defaultValue: void 0
    },
    Id: {
      id: "pageDownloadTime",
      name: "pdt",
      valueType: "integer",
      maxLength: void 0,
      defaultValue: void 0
    },
    Ld: {
      id: "redirectResponseTime",
      name: "rrt",
      valueType: "integer",
      maxLength: void 0,
      defaultValue: void 0
    },
    Wd: {
      id: "timingCategory",
      name: "utc",
      valueType: "text",
      maxLength: 150,
      defaultValue: void 0
    },
    Zd: {
      id: "timingVar",
      name: "utv",
      valueType: "text",
      maxLength: 500,
      defaultValue: void 0
    },
    Yd: {
      id: "timingValue",
      name: "utt",
      valueType: "integer",
      maxLength: void 0,
      defaultValue: void 0
    },
    Xd: {
      id: "timingLabel",
      name: "utl",
      valueType: "text",
      maxLength: 500,
      defaultValue: void 0
    },
    wd: {
      id: "exDescription",
      name: "exd",
      valueType: "text",
      maxLength: 150,
      defaultValue: void 0
    },
    xd: {
      id: "exFatal",
      name: "exf",
      valueType: "boolean",
      maxLength: void 0,
      defaultValue: "1"
    }
  },
      Na = function Na(a) {
    if (1 > a || 200 < a) throw Error("Expected dimension index range 1-200, but was : " + a);
    return {
      id: "dimension" + a,
      name: "cd" + a,
      valueType: "text",
      maxLength: 150,
      defaultValue: void 0
    };
  },
      Oa = function Oa(a) {
    if (1 > a || 200 < a) throw Error("Expected metric index range 1-200, but was : " + a);
    return {
      id: "metric" + a,
      name: "cm" + a,
      valueType: "integer",
      maxLength: void 0,
      defaultValue: void 0
    };
  };

  var Pa = function Pa(a) {
    if (1 > a) return "0";
    if (3 > a) return "1-2";
    a = Math.floor(Math.log(a - 1) / Math.log(2));
    return Math.pow(2, a) + 1 + "-" + Math.pow(2, a + 1);
  },
      Qa = function Qa(a, b) {
    for (var c = 0, d = a.length - 1, e = 0; c <= d;) {
      var f = Math.floor((c + d) / 2),
          e = a[f];

      if (b <= e) {
        d = 0 == f ? 0 : a[f - 1];
        if (b > d) return (d + 1).toString() + "-" + e.toString();
        d = f - 1;
      } else if (b > e) {
        if (f >= a.length - 1) return (a[a.length - 1] + 1).toString() + "+";
        c = f + 1;
      }
    }

    return "<= 0";
  };

  var B = function B() {
    this.gb = [];
  },
      Ra = function Ra() {
    return new B();
  };

  h = B.prototype;

  h.when = function (a) {
    this.gb.push(a);
    return this;
  };

  h.Rb = function (a) {
    var b = arguments;
    this.when(function (a) {
      return 0 <= ka(b, a.ub());
    });
    return this;
  };

  h.Yc = function (a, b) {
    var c = sa(arguments, 1);
    this.when(function (b) {
      b = b.V().get(a);
      return 0 <= ka(c, b);
    });
    return this;
  };

  h.mb = function (a, b) {
    if (r(this.e)) throw Error("Filter has already been set.");
    this.e = r(b) ? _t(a, b) : a;
    return this;
  };

  h.ia = function () {
    if (0 == this.gb.length) throw Error("Must specify at least one predicate using #when or a helper method.");
    if (!r(this.e)) throw Error("Must specify a delegate filter using #applyFilter.");
    return _t(function (a) {
      na(this.gb, function (b) {
        return b(a);
      }) && this.e(a);
    }, this);
  };

  var C = function C() {
    this.lb = !1;
    this.zb = "";
    this.Kb = !1;
    this.ya = null;
  };

  C.prototype.Wb = function (a) {
    this.lb = !0;
    this.zb = a || " - ";
    return this;
  };

  C.prototype.Sc = function () {
    this.Kb = !0;
    return this;
  };

  C.prototype.Dc = function () {
    return Sa(this, Pa);
  };

  C.prototype.Ec = function (a) {
    return Sa(this, ha(Qa, a));
  };

  var Sa = function Sa(a, b) {
    if (null != a.ya) throw Error("LabelerBuilder: Only one labeling strategy may be used.");
    a.ya = _t(function (a) {
      var d = a.V().get(La),
          e = a.V().get(Ka);
      ea(d) && (d = b(d), null != e && this.lb && (d = e + this.zb + d), a.V().set(Ka, d));
    }, a);
    return a;
  };

  C.prototype.ia = function () {
    if (null == this.ya) throw Error("LabelerBuilder: a labeling strategy must be specified prior to calling build().");
    return Ra().Rb("event").mb(_t(function (a) {
      this.ya(a);
      this.Kb && a.V().remove(La);
    }, this)).ia();
  };

  var Ua = function Ua(a, b) {
    var c = Array.prototype.slice.call(arguments),
        d = c.shift();
    if ("undefined" == typeof d) throw Error("[goog.string.format] Template required");
    return d.replace(/%([0\-\ \+]*)(\d+)?(\.(\d+))?([%sfdiu])/g, function (a, b, d, l, D, N, Y, Z) {
      if ("%" == N) return "%";
      var Nb = c.shift();
      if ("undefined" == typeof Nb) throw Error("[goog.string.format] Not enough arguments");
      arguments[0] = Nb;
      return Ta[N].apply(null, arguments);
    });
  },
      Ta = {
    s: function s(a, b, c) {
      return isNaN(c) || "" == c || a.length >= c ? a : a = -1 < b.indexOf("-", 0) ? a + Array(c - a.length + 1).join(" ") : Array(c - a.length + 1).join(" ") + a;
    },
    f: function f(a, b, c, d, e) {
      d = a.toString();
      isNaN(e) || "" == e || (d = parseFloat(a).toFixed(e));
      var f;
      f = 0 > a ? "-" : 0 <= b.indexOf("+") ? "+" : 0 <= b.indexOf(" ") ? " " : "";
      0 <= a && (d = f + d);
      if (isNaN(c) || d.length >= c) return d;
      d = isNaN(e) ? Math.abs(a).toString() : Math.abs(a).toFixed(e);
      a = c - d.length - f.length;
      return d = 0 <= b.indexOf("-", 0) ? f + d + Array(a + 1).join(" ") : f + Array(a + 1).join(0 <= b.indexOf("0", 0) ? "0" : " ") + d;
    },
    d: function d(a, b, c, _d, e, f, g, l) {
      return Ta.f(parseInt(a, 10), b, c, _d, 0, f, g, l);
    }
  };

  Ta.i = Ta.d;
  Ta.u = Ta.d;

  var Va = function Va(a) {
    if ("function" == typeof a.t) return a.t();
    if (p(a)) return a.split("");

    if (da(a)) {
      for (var b = [], c = a.length, d = 0; d < c; d++) {
        b.push(a[d]);
      }

      return b;
    }

    return wa(a);
  },
      Wa = function Wa(a, b) {
    if ("function" == typeof a.forEach) a.forEach(b, void 0);else if (da(a) || p(a)) la(a, b, void 0);else {
      var c;
      if ("function" == typeof a.H) c = a.H();else if ("function" != typeof a.t) {
        if (da(a) || p(a)) {
          c = [];

          for (var d = a.length, e = 0; e < d; e++) {
            c.push(e);
          }
        } else c = xa(a);
      } else c = void 0;

      for (var d = Va(a), e = d.length, f = 0; f < e; f++) {
        b.call(void 0, d[f], c && c[f], a);
      }
    }
  };

  var E = function E(a) {
    this.w = new z();
    if (0 < arguments.length % 2) throw Error("Uneven number of arguments to ParameterMap constructor.");

    for (var b = arguments, c = 0; c < b.length; c += 2) {
      this.set(b[c], b[c + 1]);
    }
  };

  E.prototype.set = function (a, b) {
    if (null == b) throw Error("undefined-or-null value for key: " + a.name);
    this.w.set(a.name, {
      key: a,
      value: b
    });
  };

  E.prototype.remove = function (a) {
    this.w.remove(a.name);
  };

  E.prototype.get = function (a) {
    a = this.w.get(a.name, null);
    return null === a ? null : a.value;
  };

  E.prototype.ha = function (a) {
    this.w.ha(a.w);
  };

  var Xa = function Xa(a, b) {
    la(a.w.t(), function (a) {
      b(a.key, a.value);
    });
  };

  E.prototype.Nb = function () {
    var a = {};
    Xa(this, function (b, c) {
      a[b.id] = c;
    });
    return a;
  };

  E.prototype.clone = function () {
    var a = new E();
    a.w = this.w.clone();
    return a;
  };

  E.prototype.toString = function () {
    var a = {};
    Xa(this, function (b, c) {
      a[b.id] = c;
    });
    return JSON.stringify(a);
  };

  var F = function F(a) {
    this.e = a;
  };

  h = F.prototype;

  h.Yb = function (a) {
    var b = new F(_t(this.M, this));
    b.I = Ia;
    b.Q = a;
    return b;
  };

  h.action = function (a) {
    var b = new F(_t(this.M, this));
    b.I = Ja;
    b.Q = a;
    return b;
  };

  h.label = function (a) {
    var b = new F(_t(this.M, this));
    b.I = Ka;
    b.Q = a;
    return b;
  };

  h.value = function (a) {
    var b = new F(_t(this.M, this));
    b.I = La;
    b.Q = a;
    return b;
  };

  h.fc = function (a) {
    var b = new F(_t(this.M, this));
    b.I = Na(a.index);
    b.Q = a.value;
    return b;
  };

  h.vc = function (a) {
    var b = new F(_t(this.M, this));
    b.I = Oa(a.index);
    b.Q = a.value;
    return b;
  };

  h.send = function (a) {
    var b = new E();
    this.M(b);
    return a.send("event", b);
  };

  h.M = function (a) {
    null != this.I && null != this.Q && !a.w.T(this.I.name) && a.set(this.I, this.Q);
    r(this.e) && this.e(a);
  };

  var Ya = new F(ba);

  var G = function G() {
    this.aa = this.aa;
    this.Ca = this.Ca;
  };

  G.prototype.aa = !1;

  G.prototype.ma = function () {
    this.aa || (this.aa = !0, this.o());
  };

  G.prototype.o = function () {
    if (this.Ca) for (; this.Ca.length;) {
      this.Ca.shift()();
    }
  };

  var Za = function Za(a, b) {
    this.type = a;
    this.currentTarget = this.target = b;
    this.defaultPrevented = this.X = !1;
    this.Hb = !0;
  };

  Za.prototype.preventDefault = function () {
    this.defaultPrevented = !0;
    this.Hb = !1;
  };

  var $a = function $a(a) {
    $a[" "](a);
    return a;
  };

  $a[" "] = ba;
  var H;

  a: {
    var ab = k.navigator;

    if (ab) {
      var bb = ab.userAgent;

      if (bb) {
        H = bb;
        break a;
      }
    }

    H = "";
  }

  ;

  var cb = function cb() {
    return -1 != H.indexOf("Edge") || -1 != H.indexOf("Trident") || -1 != H.indexOf("MSIE");
  };

  var I = function I() {
    return -1 != H.indexOf("Edge");
  };

  var db = -1 != H.indexOf("Opera") || -1 != H.indexOf("OPR"),
      J = cb(),
      eb = -1 != H.indexOf("Gecko") && !(-1 != H.toLowerCase().indexOf("webkit") && !I()) && !(-1 != H.indexOf("Trident") || -1 != H.indexOf("MSIE")) && !I(),
      fb = -1 != H.toLowerCase().indexOf("webkit") && !I(),
      gb = function gb() {
    var a = H;
    if (eb) return /rv\:([^\);]+)(\)|;)/.exec(a);
    if (J && I()) return /Edge\/([\d\.]+)/.exec(a);
    if (J) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
    if (fb) return /WebKit\/(\S+)/.exec(a);
  },
      hb = function hb() {
    var a = k.document;
    return a ? a.documentMode : void 0;
  },
      ib = function () {
    if (db && k.opera) {
      var a = k.opera.version;
      return q(a) ? a() : a;
    }

    var a = "",
        b = gb();
    b && (a = b ? b[1] : "");
    return J && !I() && (b = hb(), b > parseFloat(a)) ? String(b) : a;
  }(),
      jb = {},
      K = function K(a) {
    var b;

    if (!(b = jb[a])) {
      b = 0;

      for (var c = ia(String(ib)).split("."), d = ia(String(a)).split("."), e = Math.max(c.length, d.length), f = 0; 0 == b && f < e; f++) {
        var g = c[f] || "",
            l = d[f] || "",
            D = /(\d*)(\D*)/g,
            N = /(\d*)(\D*)/g;

        do {
          var Y = D.exec(g) || ["", "", ""],
              Z = N.exec(l) || ["", "", ""];
          if (0 == Y[0].length && 0 == Z[0].length) break;
          b = ja(0 == Y[1].length ? 0 : parseInt(Y[1], 10), 0 == Z[1].length ? 0 : parseInt(Z[1], 10)) || ja(0 == Y[2].length, 0 == Z[2].length) || ja(Y[2], Z[2]);
        } while (0 == b);
      }

      b = jb[a] = 0 <= b;
    }

    return b;
  },
      kb = k.document,
      lb = hb(),
      mb = !kb || !J || !lb && I() ? void 0 : lb || ("CSS1Compat" == kb.compatMode ? parseInt(ib, 10) : 5);

  var nb = !J || J && (I() || 9 <= mb),
      ob = J && !K("9"),
      pb = !fb || K("528"),
      qb = eb && K("1.9b") || J && K("8") || db && K("9.5") || fb && K("528"),
      rb = eb && !K("8") || J && !K("9");

  var sb = function sb(a, b) {
    Za.call(this, a ? a.type : "");
    this.relatedTarget = this.currentTarget = this.target = null;
    this.charCode = this.keyCode = this.button = this.screenY = this.screenX = this.clientY = this.clientX = this.offsetY = this.offsetX = 0;
    this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
    this.sb = this.state = null;

    if (a) {
      var c = this.type = a.type;
      this.target = a.target || a.srcElement;
      this.currentTarget = b;
      var d = a.relatedTarget;

      if (d) {
        if (eb) {
          var e;

          a: {
            try {
              $a(d.nodeName);
              e = !0;
              break a;
            } catch (f) {}

            e = !1;
          }

          e || (d = null);
        }
      } else "mouseover" == c ? d = a.fromElement : "mouseout" == c && (d = a.toElement);

      this.relatedTarget = d;
      this.offsetX = fb || void 0 !== a.offsetX ? a.offsetX : a.layerX;
      this.offsetY = fb || void 0 !== a.offsetY ? a.offsetY : a.layerY;
      this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX;
      this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY;
      this.screenX = a.screenX || 0;
      this.screenY = a.screenY || 0;
      this.button = a.button;
      this.keyCode = a.keyCode || 0;
      this.charCode = a.charCode || ("keypress" == c ? a.keyCode : 0);
      this.ctrlKey = a.ctrlKey;
      this.altKey = a.altKey;
      this.shiftKey = a.shiftKey;
      this.metaKey = a.metaKey;
      this.state = a.state;
      this.sb = a;
      a.defaultPrevented && this.preventDefault();
    }
  };

  w(sb, Za);

  sb.prototype.preventDefault = function () {
    sb.P.preventDefault.call(this);
    var a = this.sb;
    if (a.preventDefault) a.preventDefault();else if (a.returnValue = !1, ob) try {
      if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode) a.keyCode = -1;
    } catch (b) {}
  };

  var tb = "closure_listenable_" + (1E6 * Math.random() | 0),
      ub = function ub(a) {
    return !(!a || !a[tb]);
  },
      vb = 0;

  var wb = function wb(a, b, c, d, e) {
    this.O = a;
    this.proxy = null;
    this.src = b;
    this.type = c;
    this.ka = !!d;
    this.sa = e;
    this.key = ++vb;
    this.removed = this.ja = !1;
  },
      xb = function xb(a) {
    a.removed = !0;
    a.O = null;
    a.proxy = null;
    a.src = null;
    a.sa = null;
  };

  var L = function L(a) {
    this.src = a;
    this.k = {};
    this.fa = 0;
  };

  L.prototype.add = function (a, b, c, d, e) {
    var f = a.toString();
    a = this.k[f];
    a || (a = this.k[f] = [], this.fa++);
    var g = yb(a, b, d, e);
    -1 < g ? (b = a[g], c || (b.ja = !1)) : (b = new wb(b, this.src, f, !!d, e), b.ja = c, a.push(b));
    return b;
  };

  L.prototype.remove = function (a, b, c, d) {
    a = a.toString();
    if (!(a in this.k)) return !1;
    var e = this.k[a];
    b = yb(e, b, c, d);
    return -1 < b ? (xb(e[b]), y.splice.call(e, b, 1), 0 == e.length && (delete this.k[a], this.fa--), !0) : !1;
  };

  var zb = function zb(a, b) {
    var c = b.type;
    if (!(c in a.k)) return !1;
    var d = qa(a.k[c], b);
    d && (xb(b), 0 == a.k[c].length && (delete a.k[c], a.fa--));
    return d;
  };

  L.prototype.removeAll = function (a) {
    a = a && a.toString();
    var b = 0,
        c;

    for (c in this.k) {
      if (!a || c == a) {
        for (var d = this.k[c], e = 0; e < d.length; e++) {
          ++b, xb(d[e]);
        }

        delete this.k[c];
        this.fa--;
      }
    }

    return b;
  };

  L.prototype.ba = function (a, b, c, d) {
    a = this.k[a.toString()];
    var e = -1;
    a && (e = yb(a, b, c, d));
    return -1 < e ? a[e] : null;
  };

  var yb = function yb(a, b, c, d) {
    for (var e = 0; e < a.length; ++e) {
      var f = a[e];
      if (!f.removed && f.O == b && f.ka == !!c && f.sa == d) return e;
    }

    return -1;
  };

  var Ab = "closure_lm_" + (1E6 * Math.random() | 0),
      Bb = {},
      Cb = 0,
      Db = function Db(a, b, c, d, e) {
    if (n(b)) {
      for (var f = 0; f < b.length; f++) {
        Db(a, b[f], c, d, e);
      }

      return null;
    }

    c = Eb(c);
    return ub(a) ? a.listen(b, c, d, e) : Fb(a, b, c, !1, d, e);
  },
      Fb = function Fb(a, b, c, d, e, f) {
    if (!b) throw Error("Invalid event type");
    var g = !!e,
        l = Gb(a);
    l || (a[Ab] = l = new L(a));
    c = l.add(b, c, d, e, f);
    if (c.proxy) return c;
    d = Hb();
    c.proxy = d;
    d.src = a;
    d.O = c;
    a.addEventListener ? a.addEventListener(b.toString(), d, g) : a.attachEvent(Ib(b.toString()), d);
    Cb++;
    return c;
  },
      Hb = function Hb() {
    var a = Jb,
        b = nb ? function (c) {
      return a.call(b.src, b.O, c);
    } : function (c) {
      c = a.call(b.src, b.O, c);
      if (!c) return c;
    };
    return b;
  },
      Kb = function Kb(a, b, c, d, e) {
    if (n(b)) {
      for (var f = 0; f < b.length; f++) {
        Kb(a, b[f], c, d, e);
      }

      return null;
    }

    c = Eb(c);
    return ub(a) ? a.cb(b, c, d, e) : Fb(a, b, c, !0, d, e);
  },
      Lb = function Lb(a, b, c, d, e) {
    if (n(b)) for (var f = 0; f < b.length; f++) {
      Lb(a, b[f], c, d, e);
    } else c = Eb(c), ub(a) ? a.jb(b, c, d, e) : a && (a = Gb(a)) && (b = a.ba(b, c, !!d, e)) && Mb(b);
  },
      Mb = function Mb(a) {
    if (ea(a) || !a || a.removed) return !1;
    var b = a.src;
    if (ub(b)) return zb(b.B, a);
    var c = a.type,
        d = a.proxy;
    b.removeEventListener ? b.removeEventListener(c, d, a.ka) : b.detachEvent && b.detachEvent(Ib(c), d);
    Cb--;
    (c = Gb(b)) ? (zb(c, a), 0 == c.fa && (c.src = null, b[Ab] = null)) : xb(a);
    return !0;
  },
      Ib = function Ib(a) {
    return a in Bb ? Bb[a] : Bb[a] = "on" + a;
  },
      Pb = function Pb(a, b, c, d) {
    var e = !0;
    if (a = Gb(a)) if (b = a.k[b.toString()]) for (b = b.concat(), a = 0; a < b.length; a++) {
      var f = b[a];
      f && f.ka == c && !f.removed && (f = Ob(f, d), e = e && !1 !== f);
    }
    return e;
  },
      Ob = function Ob(a, b) {
    var c = a.O,
        d = a.sa || a.src;
    a.ja && Mb(a);
    return c.call(d, b);
  },
      Jb = function Jb(a, b) {
    if (a.removed) return !0;

    if (!nb) {
      var c;
      if (!(c = b)) a: {
        c = ["window", "event"];

        for (var d = k, e; e = c.shift();) {
          if (null != d[e]) d = d[e];else {
            c = null;
            break a;
          }
        }

        c = d;
      }
      e = c;
      c = new sb(e, this);
      d = !0;

      if (!(0 > e.keyCode || void 0 != e.returnValue)) {
        a: {
          var f = !1;
          if (0 == e.keyCode) try {
            e.keyCode = -1;
            break a;
          } catch (g) {
            f = !0;
          }
          if (f || void 0 == e.returnValue) e.returnValue = !0;
        }

        e = [];

        for (f = c.currentTarget; f; f = f.parentNode) {
          e.push(f);
        }

        for (var f = a.type, l = e.length - 1; !c.X && 0 <= l; l--) {
          c.currentTarget = e[l];
          var D = Pb(e[l], f, !0, c),
              d = d && D;
        }

        for (l = 0; !c.X && l < e.length; l++) {
          c.currentTarget = e[l], D = Pb(e[l], f, !1, c), d = d && D;
        }
      }

      return d;
    }

    return Ob(a, new sb(b, this));
  },
      Gb = function Gb(a) {
    a = a[Ab];
    return a instanceof L ? a : null;
  },
      Qb = "__closure_events_fn_" + (1E9 * Math.random() >>> 0),
      Eb = function Eb(a) {
    if (q(a)) return a;
    a[Qb] || (a[Qb] = function (b) {
      return a.handleEvent(b);
    });
    return a[Qb];
  };

  var M = function M() {
    G.call(this);
    this.B = new L(this);
    this.Tb = this;
    this.fb = null;
  };

  w(M, G);
  M.prototype[tb] = !0;
  h = M.prototype;

  h.addEventListener = function (a, b, c, d) {
    Db(this, a, b, c, d);
  };

  h.removeEventListener = function (a, b, c, d) {
    Lb(this, a, b, c, d);
  };

  h.dispatchEvent = function (a) {
    var b,
        c = this.fb;

    if (c) {
      b = [];

      for (var d = 1; c; c = c.fb) {
        b.push(c), ++d;
      }
    }

    c = this.Tb;
    d = a.type || a;
    if (p(a)) a = new Za(a, c);else if (a instanceof Za) a.target = a.target || c;else {
      var e = a;
      a = new Za(d, c);
      Aa(a, e);
    }
    var e = !0,
        f;
    if (b) for (var g = b.length - 1; !a.X && 0 <= g; g--) {
      f = a.currentTarget = b[g], e = Rb(f, d, !0, a) && e;
    }
    a.X || (f = a.currentTarget = c, e = Rb(f, d, !0, a) && e, a.X || (e = Rb(f, d, !1, a) && e));
    if (b) for (g = 0; !a.X && g < b.length; g++) {
      f = a.currentTarget = b[g], e = Rb(f, d, !1, a) && e;
    }
    return e;
  };

  h.o = function () {
    M.P.o.call(this);
    this.B && this.B.removeAll(void 0);
    this.fb = null;
  };

  h.listen = function (a, b, c, d) {
    return this.B.add(String(a), b, !1, c, d);
  };

  h.cb = function (a, b, c, d) {
    return this.B.add(String(a), b, !0, c, d);
  };

  h.jb = function (a, b, c, d) {
    return this.B.remove(String(a), b, c, d);
  };

  var Rb = function Rb(a, b, c, d) {
    b = a.B.k[String(b)];
    if (!b) return !0;
    b = b.concat();

    for (var e = !0, f = 0; f < b.length; ++f) {
      var g = b[f];

      if (g && !g.removed && g.ka == c) {
        var l = g.O,
            D = g.sa || g.src;
        g.ja && zb(a.B, g);
        e = !1 !== l.call(D, d) && e;
      }
    }

    return e && 0 != d.Hb;
  };

  M.prototype.ba = function (a, b, c, d) {
    return this.B.ba(String(a), b, c, d);
  };

  var Sb = function Sb(a, b, c) {
    this.tc = c;
    this.dc = a;
    this.Gc = b;
    this.Ba = 0;
    this.ta = null;
  };

  Sb.prototype.get = function () {
    var a;
    0 < this.Ba ? (this.Ba--, a = this.ta, this.ta = a.next, a.next = null) : a = this.dc();
    return a;
  };

  Sb.prototype.put = function (a) {
    this.Gc(a);
    this.Ba < this.tc && (this.Ba++, a.next = this.ta, this.ta = a);
  };

  var Tb = function Tb(a) {
    k.setTimeout(function () {
      throw a;
    }, 0);
  },
      Ub,
      Vb = function Vb() {
    var a = k.MessageChannel;
    "undefined" === typeof a && "undefined" !== typeof window && window.postMessage && window.addEventListener && -1 == H.indexOf("Presto") && (a = function a() {
      var a = document.createElement("IFRAME");
      a.style.display = "none";
      a.src = "";
      document.documentElement.appendChild(a);
      var b = a.contentWindow,
          a = b.document;
      a.open();
      a.write("");
      a.close();

      var c = "callImmediate" + Math.random(),
          d = "file:" == b.location.protocol ? "*" : b.location.protocol + "//" + b.location.host,
          a = _t(function (a) {
        if (("*" == d || a.origin == d) && a.data == c) this.port1.onmessage();
      }, this);

      b.addEventListener("message", a, !1);
      this.port1 = {};
      this.port2 = {
        postMessage: function postMessage() {
          b.postMessage(c, d);
        }
      };
    });

    if ("undefined" !== typeof a && !cb()) {
      var b = new a(),
          c = {},
          d = c;

      b.port1.onmessage = function () {
        if (m(c.next)) {
          c = c.next;
          var a = c.ob;
          c.ob = null;
          a();
        }
      };

      return function (a) {
        d.next = {
          ob: a
        };
        d = d.next;
        b.port2.postMessage(0);
      };
    }

    return "undefined" !== typeof document && "onreadystatechange" in document.createElement("SCRIPT") ? function (a) {
      var b = document.createElement("SCRIPT");

      b.onreadystatechange = function () {
        b.onreadystatechange = null;
        b.parentNode.removeChild(b);
        b = null;
        a();
        a = null;
      };

      document.documentElement.appendChild(b);
    } : function (a) {
      k.setTimeout(a, 0);
    };
  };

  var Wb = function Wb() {
    this.Ka = this.Z = null;
  },
      Yb = new Sb(function () {
    return new Xb();
  }, function (a) {
    a.reset();
  }, 100);

  Wb.prototype.add = function (a, b) {
    var c = Yb.get();
    c.set(a, b);
    this.Ka ? this.Ka.next = c : this.Z = c;
    this.Ka = c;
  };

  Wb.prototype.remove = function () {
    var a = null;
    this.Z && (a = this.Z, this.Z = this.Z.next, this.Z || (this.Ka = null), a.next = null);
    return a;
  };

  var Xb = function Xb() {
    this.next = this.scope = this.Wa = null;
  };

  Xb.prototype.set = function (a, b) {
    this.Wa = a;
    this.scope = b;
    this.next = null;
  };

  Xb.prototype.reset = function () {
    this.next = this.scope = this.Wa = null;
  };

  var cc = function cc(a, b) {
    Zb || $b();
    ac || (Zb(), ac = !0);
    bc.add(a, b);
  },
      Zb,
      $b = function $b() {
    if (k.Promise && k.Promise.resolve) {
      var a = k.Promise.resolve();

      Zb = function Zb() {
        a.then(dc);
      };
    } else Zb = function Zb() {
      var a = dc;
      !q(k.setImmediate) || k.Window && k.Window.prototype && k.Window.prototype.setImmediate == k.setImmediate ? (Ub || (Ub = Vb()), Ub(a)) : k.setImmediate(a);
    };
  },
      ac = !1,
      bc = new Wb(),
      dc = function dc() {
    for (var a = null; a = bc.remove();) {
      try {
        a.Wa.call(a.scope);
      } catch (b) {
        Tb(b);
      }

      Yb.put(a);
    }

    ac = !1;
  };

  var ec = function ec(a) {
    a.prototype.then = a.prototype.then;
    a.prototype.$goog_Thenable = !0;
  },
      fc = function fc(a) {
    if (!a) return !1;

    try {
      return !!a.$goog_Thenable;
    } catch (b) {
      return !1;
    }
  };

  var P = function P(a, b) {
    this.m = 0;
    this.D = void 0;
    this.S = this.G = this.l = null;
    this.ra = this.Va = !1;
    if (a == gc) O(this, 2, b);else try {
      var c = this;
      a.call(b, function (a) {
        O(c, 2, a);
      }, function (a) {
        O(c, 3, a);
      });
    } catch (d) {
      O(this, 3, d);
    }
  },
      hc = function hc() {
    this.next = this.context = this.da = this.Da = this.L = null;
    this.Na = !1;
  };

  hc.prototype.reset = function () {
    this.context = this.da = this.Da = this.L = null;
    this.Na = !1;
  };

  var ic = new Sb(function () {
    return new hc();
  }, function (a) {
    a.reset();
  }, 100),
      jc = function jc(a, b, c) {
    var d = ic.get();
    d.Da = a;
    d.da = b;
    d.context = c;
    return d;
  },
      gc = function gc() {};

  P.prototype.then = function (a, b, c) {
    return kc(this, q(a) ? a : null, q(b) ? b : null, c);
  };

  ec(P);

  P.prototype.cancel = function (a) {
    0 == this.m && cc(function () {
      var b = new lc(a);
      mc(this, b);
    }, this);
  };

  var mc = function mc(a, b) {
    if (0 == a.m) if (a.l) {
      var c = a.l;

      if (c.G) {
        for (var d = 0, e = null, f = null, g = c.G; g && (g.Na || (d++, g.L == a && (e = g), !(e && 1 < d))); g = g.next) {
          e || (f = g);
        }

        e && (0 == c.m && 1 == d ? mc(c, b) : (f ? (d = f, d.next == c.S && (c.S = d), d.next = d.next.next) : nc(c), oc(c, e, 3, b)));
      }

      a.l = null;
    } else O(a, 3, b);
  },
      qc = function qc(a, b) {
    a.G || 2 != a.m && 3 != a.m || pc(a);
    a.S ? a.S.next = b : a.G = b;
    a.S = b;
  },
      kc = function kc(a, b, c, d) {
    var e = jc(null, null, null);
    e.L = new P(function (a, g) {
      e.Da = b ? function (c) {
        try {
          var e = b.call(d, c);
          a(e);
        } catch (N) {
          g(N);
        }
      } : a;
      e.da = c ? function (b) {
        try {
          var e = c.call(d, b);
          !m(e) && b instanceof lc ? g(b) : a(e);
        } catch (N) {
          g(N);
        }
      } : g;
    });
    e.L.l = a;
    qc(a, e);
    return e.L;
  };

  P.prototype.Pb = function (a) {
    this.m = 0;
    O(this, 2, a);
  };

  P.prototype.Qb = function (a) {
    this.m = 0;
    O(this, 3, a);
  };

  var O = function O(a, b, c) {
    if (0 == a.m) {
      if (a == c) b = 3, c = new TypeError("Promise cannot resolve to itself");else {
        if (fc(c)) {
          a.m = 1;
          b = c;
          c = a.Pb;
          var d = a.Qb;
          b instanceof P ? qc(b, jc(c || ba, d || null, a)) : b.then(c, d, a);
          return;
        }

        if (r(c)) try {
          if (d = c.then, q(d)) {
            rc(a, c, d);
            return;
          }
        } catch (e) {
          b = 3, c = e;
        }
      }
      a.D = c;
      a.m = b;
      a.l = null;
      pc(a);
      3 != b || c instanceof lc || sc(a, c);
    }
  },
      rc = function rc(a, b, c) {
    a.m = 1;

    var d = !1,
        e = function e(b) {
      d || (d = !0, a.Pb(b));
    },
        f = function f(b) {
      d || (d = !0, a.Qb(b));
    };

    try {
      c.call(b, e, f);
    } catch (g) {
      f(g);
    }
  },
      pc = function pc(a) {
    a.Va || (a.Va = !0, cc(a.gc, a));
  },
      nc = function nc(a) {
    var b = null;
    a.G && (b = a.G, a.G = b.next, b.next = null);
    a.G || (a.S = null);
    return b;
  };

  P.prototype.gc = function () {
    for (var a = null; a = nc(this);) {
      oc(this, a, this.m, this.D);
    }

    this.Va = !1;
  };

  var oc = function oc(a, b, c, d) {
    b.L && (b.L.l = null);
    if (2 == c) b.Da.call(b.context, d);else if (null != b.da) {
      if (!b.Na) for (; a && a.ra; a = a.l) {
        a.ra = !1;
      }
      b.da.call(b.context, d);
    }
    ic.put(b);
  },
      sc = function sc(a, b) {
    a.ra = !0;
    cc(function () {
      a.ra && tc.call(null, b);
    });
  },
      tc = Tb,
      lc = function lc(a) {
    x.call(this, a);
  };

  w(lc, x);
  lc.prototype.name = "cancel";
  /*
  Portions of this code are from MochiKit, received by
  The Closure Authors under the MIT license. All other code is Copyright
  2005-2009 The Closure Authors. All Rights Reserved.
  */

  var Q = function Q(a, b) {
    this.Fa = [];
    this.Cb = a;
    this.rb = b || null;
    this.ca = this.C = !1;
    this.D = void 0;
    this.hb = this.Xb = this.Oa = !1;
    this.Ia = 0;
    this.l = null;
    this.Qa = 0;
  };

  Q.prototype.cancel = function (a) {
    if (this.C) this.D instanceof Q && this.D.cancel();else {
      if (this.l) {
        var b = this.l;
        delete this.l;
        a ? b.cancel(a) : (b.Qa--, 0 >= b.Qa && b.cancel());
      }

      this.Cb ? this.Cb.call(this.rb, this) : this.hb = !0;
      this.C || this.A(new uc());
    }
  };

  Q.prototype.qb = function (a, b) {
    this.Oa = !1;
    vc(this, a, b);
  };

  var vc = function vc(a, b, c) {
    a.C = !0;
    a.D = c;
    a.ca = !b;
    wc(a);
  },
      yc = function yc(a) {
    if (a.C) {
      if (!a.hb) throw new xc();
      a.hb = !1;
    }
  };

  Q.prototype.v = function (a) {
    yc(this);
    vc(this, !0, a);
  };

  Q.prototype.A = function (a) {
    yc(this);
    vc(this, !1, a);
  };

  Q.prototype.n = function (a, b) {
    return zc(this, a, null, b);
  };

  var zc = function zc(a, b, c, d) {
    a.Fa.push([b, c, d]);
    a.C && wc(a);
    return a;
  };

  Q.prototype.then = function (a, b, c) {
    var d,
        e,
        f = new P(function (a, b) {
      d = a;
      e = b;
    });
    zc(this, d, function (a) {
      a instanceof uc ? f.cancel() : e(a);
    });
    return f.then(a, b, c);
  };

  ec(Q);

  var Ac = function Ac(a) {
    var b = new Q();
    zc(a, b.v, b.A, b);
    return b;
  },
      Bc = function Bc(a) {
    return ma(a.Fa, function (a) {
      return q(a[1]);
    });
  },
      wc = function wc(a) {
    if (a.Ia && a.C && Bc(a)) {
      var b = a.Ia,
          c = Cc[b];
      c && (k.clearTimeout(c.ua), delete Cc[b]);
      a.Ia = 0;
    }

    a.l && (a.l.Qa--, delete a.l);

    for (var b = a.D, d = c = !1; a.Fa.length && !a.Oa;) {
      var e = a.Fa.shift(),
          f = e[0],
          g = e[1],
          e = e[2];
      if (f = a.ca ? g : f) try {
        var l = f.call(e || a.rb, b);
        m(l) && (a.ca = a.ca && (l == b || l instanceof Error), a.D = b = l);
        fc(b) && (d = !0, a.Oa = !0);
      } catch (D) {
        b = D, a.ca = !0, Bc(a) || (c = !0);
      }
    }

    a.D = b;
    d && (l = _t(a.qb, a, !0), d = _t(a.qb, a, !1), b instanceof Q ? (zc(b, l, d), b.Xb = !0) : b.then(l, d));
    c && (b = new Dc(b), Cc[b.ua] = b, a.Ia = b.ua);
  },
      Ec = function Ec(a) {
    var b = new Q();
    b.v(a);
    return b;
  },
      Gc = function Gc() {
    var a = Fc,
        b = new Q();
    b.A(a);
    return b;
  },
      xc = function xc() {
    x.call(this);
  };

  w(xc, x);
  xc.prototype.message = "Deferred has already fired";
  xc.prototype.name = "AlreadyCalledError";

  var uc = function uc() {
    x.call(this);
  };

  w(uc, x);
  uc.prototype.message = "Deferred was canceled";
  uc.prototype.name = "CanceledError";

  var Dc = function Dc(a) {
    this.ua = k.setTimeout(_t(this.Tc, this), 0);
    this.na = a;
  };

  Dc.prototype.Tc = function () {
    delete Cc[this.ua];
    throw this.na;
  };

  var Cc = {};

  var Hc = function Hc(a) {
    this.qa = [];
    this.e = a;
  };

  Hc.prototype.R = function (a) {
    if (!q(a)) throw Error("Invalid filter. Must be a function.");
    this.qa.push(a);
  };

  Hc.prototype.send = function (a, b) {
    if (0 == this.qa.length) return this.e.send(a, b);
    var c = new R(a, b);
    return Ic(this, 0, c).n(function () {
      if (!c.Sa) return this.e.send(a, b);
    }, this);
  };

  var Ic = function Ic(a, b, c) {
    return Ec().n(function () {
      return this.qa[b](c);
    }, a).n(function () {
      if (++b < this.qa.length && !c.Sa) return Ic(this, b, c);
    }, a);
  },
      R = function R(a, b) {
    this.Wc = a;
    this.Cc = b;
    this.Sa = !1;
  };

  R.prototype.ub = function () {
    return this.Wc;
  };

  R.prototype.V = function () {
    return this.Cc;
  };

  R.prototype.cancel = function () {
    this.Sa = !0;
  };

  Ba("area base br col command embed hr img input keygen link meta param source track wbr".split(" "));

  var Jc = function Jc(a, b) {
    this.width = a;
    this.height = b;
  };

  Jc.prototype.clone = function () {
    return new Jc(this.width, this.height);
  };

  Jc.prototype.floor = function () {
    this.width = Math.floor(this.width);
    this.height = Math.floor(this.height);
    return this;
  };

  !eb && !J || J && J && (I() || 9 <= mb) || eb && K("1.9.1");
  J && K("9");

  var Kc = {
    id: "apiVersion",
    name: "v",
    valueType: "text",
    maxLength: void 0,
    defaultValue: void 0
  },
      Lc = {
    id: "appName",
    name: "an",
    valueType: "text",
    maxLength: 100,
    defaultValue: void 0
  },
      Mc = {
    id: "appVersion",
    name: "av",
    valueType: "text",
    maxLength: 100,
    defaultValue: void 0
  },
      Nc = {
    id: "clientId",
    name: "cid",
    valueType: "text",
    maxLength: void 0,
    defaultValue: void 0
  },
      Oc = {
    id: "language",
    name: "ul",
    valueType: "text",
    maxLength: 20,
    defaultValue: void 0
  },
      Pc = {
    id: "libVersion",
    name: "_v",
    valueType: "text",
    maxLength: void 0,
    defaultValue: void 0
  },
      Qc = {
    id: "sampleRateOverride",
    name: "usro",
    valueType: "integer",
    maxLength: void 0,
    defaultValue: void 0
  },
      Rc = {
    id: "screenColors",
    name: "sd",
    valueType: "text",
    maxLength: 20,
    defaultValue: void 0
  },
      Sc = {
    id: "screenResolution",
    name: "sr",
    valueType: "text",
    maxLength: 20,
    defaultValue: void 0
  },
      Tc = {
    id: "trackingId",
    name: "tid",
    valueType: "text",
    maxLength: void 0,
    defaultValue: void 0
  },
      Uc = {
    id: "viewportSize",
    name: "vp",
    valueType: "text",
    maxLength: 20,
    defaultValue: void 0
  },
      Vc = {
    ad: Kc,
    dd: Lc,
    ed: Mc,
    nd: Nc,
    Fd: Oc,
    Gd: Pc,
    Md: Qc,
    Nd: Rc,
    Od: Sc,
    ae: Tc,
    he: Uc
  },
      Xc = function Xc(a) {
    if (!p(a)) return a;
    var b = Wc(a, Ma);
    if (r(b)) return b;
    b = Wc(a, Vc);
    if (r(b)) return b;
    b = /^dimension(\d+)$/.exec(a);
    if (null !== b) return Na(parseInt(b[1], 10));
    b = /^metric(\d+)$/.exec(a);
    if (null !== b) return Oa(parseInt(b[1], 10));
    throw Error(a + " is not a valid parameter name.");
  },
      Wc = function Wc(a, b) {
    var c = ya(b, function (b) {
      return b.id == a && "metric" != a && "dimension" != a;
    });
    return r(c) ? c : null;
  };

  var S = function S(a, b) {
    this.ac = b;
    this.q = b.Xa();
    this.Fb = new E();
    this.ib = !1;
  };

  h = S.prototype;

  h.set = function (a, b) {
    if (null == b) throw Error("Value must be defined and not null. Parameter=" + a.id);
    var c = Xc(a);
    this.Fb.set(c, b);
  };

  h.R = function (a) {
    this.ac.R(a);
  };

  h.send = function (a, b) {
    if (a instanceof F) return a.send(this);
    var c = this.Fb.clone();
    b instanceof E ? c.ha(b) : r(b) && va(b, function (a, b) {
      null != a && c.set(Xc(b), a);
    }, this);
    this.ib && (this.ib = !1, c.set(Ga, "start"));
    return this.q.send(a, c);
  };

  h.Hc = function (a) {
    var b = {
      description: a
    };
    this.set(Ha, a);
    return this.send("appview", b);
  };

  h.Ic = function (a, b, c, d) {
    return this.send("event", {
      eventCategory: a,
      eventAction: b,
      eventLabel: c,
      eventValue: d
    });
  };

  h.Kc = function (a, b, c) {
    return this.send("social", {
      socialNetwork: a,
      socialAction: b,
      socialTarget: c
    });
  };

  h.Jc = function (a, b) {
    return this.send("exception", {
      exDescription: a,
      exFatal: b
    });
  };

  h.Ib = function (a, b, c, d, e) {
    return this.send("timing", {
      timingCategory: a,
      timingVar: b,
      timingLabel: d,
      timingValue: c,
      sampleRateOverride: e
    });
  };

  h.jc = function () {
    this.ib = !0;
  };

  h.Rc = function (a, b, c, d) {
    return new Yc(this, a, b, c, d);
  };

  var Yc = function Yc(a, b, c, d, e) {
    this.Ob = a;
    this.Zb = b;
    this.Xc = c;
    this.rc = d;
    this.Ea = e;
    this.Qc = u();
  };

  Yc.prototype.send = function () {
    var a = this.Ob.Ib(this.Zb, this.Xc, u() - this.Qc, this.rc, this.Ea);
    this.Ob = null;
    return a;
  };

  var Zc = function Zc(a, b, c, d, e) {
    this.sc = a;
    this.Ub = b;
    this.Vb = c;
    this.g = d;
    this.$b = e;
  };

  Zc.prototype.mc = function (a) {
    var b = new S(0, this.$b.create());
    b.set(Pc, this.sc);
    b.set(Kc, 1);
    b.set(Lc, this.Ub);
    b.set(Mc, this.Vb);
    b.set(Tc, a);
    (a = navigator.language || navigator.browserLanguage) && b.set(Oc, a);
    (a = screen.colorDepth + "-bit") && b.set(Rc, a);
    (a = [screen.width, screen.height].join("x")) && b.set(Sc, a);
    a = window.document;
    a = "CSS1Compat" == a.compatMode ? a.documentElement : a.body;
    a = new Jc(a.clientWidth, a.clientHeight);
    (a = [a.width, a.height].join("x")) && b.set(Uc, a);
    return b;
  };

  Zc.prototype.kc = function () {
    return Ac(this.g.ea);
  };

  var $c = function $c(a, b, c, d, e, f) {
    Q.call(this, e, f);
    this.bb = a;
    this.Ta = [];
    this.tb = !!b;
    this.ic = !!c;
    this.cc = !!d;

    for (b = this.Bb = 0; b < a.length; b++) {
      zc(a[b], _t(this.vb, this, b, !0), _t(this.vb, this, b, !1));
    }

    0 != a.length || this.tb || this.v(this.Ta);
  };

  w($c, Q);

  $c.prototype.vb = function (a, b, c) {
    this.Bb++;
    this.Ta[a] = [b, c];
    this.C || (this.tb && b ? this.v([a, c]) : this.ic && !b ? this.A(c) : this.Bb == this.bb.length && this.v(this.Ta));
    this.cc && !b && (c = null);
    return c;
  };

  $c.prototype.A = function (a) {
    $c.P.A.call(this, a);

    for (a = 0; a < this.bb.length; a++) {
      this.bb[a].cancel();
    }
  };

  var ad = function ad(a) {
    return new $c(a, !1, !0).n(function (a) {
      for (var c = [], d = 0; d < a.length; d++) {
        c[d] = a[d][1];
      }

      return c;
    });
  };

  var bd = function bd() {
    for (var a = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".split(""), b = 0, c = a.length; b < c; b++) {
      switch (a[b]) {
        case "x":
          a[b] = Math.floor(16 * Math.random()).toString(16);
          break;

        case "y":
          a[b] = (Math.floor(4 * Math.random()) + 8).toString(16);
      }
    }

    return a.join("");
  };

  var T = function T(a) {
    this.J = a;
    this.Ea = 100;
    this.pb = [];
    this.W = this.ga = null;
    this.ea = cd(this);
    this.ea.n(function () {
      this.Jb = Db(this.J, "a", _t(this.nc, this));
    }, this);
  },
      cd = function cd(a) {
    return dd(a).n(function () {
      return this;
    }, a);
  },
      dd = function dd(a) {
    return ad([ed(a), fd(a)]);
  };

  T.prototype.nc = function () {
    U(this);
    var a = gd(this),
        b = this.xa();
    dd(this).n(function () {
      a != gd(this) && hd(this, "analytics.user-id");
      b != this.xa() && hd(this, "analytics.tracking-permitted");
    }, this);
  };

  var id = function id(a, b) {
    U(a);
    a.pb.push(b);
  };

  T.prototype.Oc = function (a) {
    U(this);
    var b = this.W != a;
    this.W = a;
    this.J.set("analytics.tracking-permitted", a.toString());
    b && hd(this, "analytics.tracking-permitted");
  };

  T.prototype.xa = function () {
    U(this);
    var a;
    if (a = this.W) a = k._gaUserPrefs, a = !(a && a.ioo && a.ioo());
    return a;
  };

  var ed = function ed(a) {
    return a.J.get("analytics.tracking-permitted").n(function (a) {
      this.W = !0;
      if (m(a)) switch (a) {
        case "true":
          this.W = !0;
          break;

        case "false":
          this.W = !1;
      }
    }, a);
  },
      gd = function gd(a) {
    U(a);
    if (!p(a.ga)) throw Error("Invalid state. UserID is not a string.");
    return a.ga;
  },
      fd = function fd(a) {
    return a.J.get("analytics.user-id").n(function (a) {
      m(a) ? this.ga = a : jd(this);
    }, a);
  },
      jd = function jd(a) {
    a.ga = bd();
    return a.J.set("analytics.user-id", a.ga).n(function () {
      hd(this, "analytics.user-id");
    }, a);
  };

  T.prototype.Nc = function (a) {
    U(this);
    this.Ea = a;
  };

  var kd = function kd(a) {
    U(a);
    return a.Ea;
  };

  T.prototype.Fc = function () {
    return jd(this);
  };

  var hd = function hd(a, b) {
    la(a.pb, function (a) {
      a(b);
    });
  };

  T.prototype.ma = function () {
    null != this.Jb && Mb(this.Jb);
  };

  var U = function U(a) {
    if (!Ac(a.ea).C) throw Error("Settings object accessed prior to entering ready state.");
  };

  var ld = function ld() {
    M.call(this);
    this.eb = "google-analytics";
    this.J = chrome.storage.local;
    chrome.storage.onChanged.addListener(_t(this.Ac, this));
  };

  w(ld, M);

  ld.prototype.Ac = function (a) {
    md(this, a) && this.dispatchEvent("a");
  };

  var md = function md(a, b) {
    return ma(xa(b), function (a) {
      return 0 == a.lastIndexOf(this.eb, 0);
    }, a);
  };

  ld.prototype.get = function (a) {
    var b = new Q(),
        c = this.eb + "." + a;
    this.J.get(c, function (a) {
      chrome.runtime.lastError ? b.A(chrome.runtime.lastError) : (a = a[c], b.v(null != a ? a.toString() : void 0));
    });
    return b;
  };

  ld.prototype.set = function (a, b) {
    var c = new Q(),
        d = {};
    d[this.eb + "." + a] = b;
    this.J.set(d, function () {
      chrome.runtime.lastError ? c.A(chrome.runtime.lastError) : c.v();
    });
    return c;
  };

  var V = function V() {};

  V.lc = function () {
    return V.yb ? V.yb : V.yb = new V();
  };

  V.prototype.send = function () {
    return Ec();
  };

  var nd = function nd(a) {
    this.ec = a;
  };

  nd.prototype.send = function (a, b) {
    this.ec.push({
      pc: a,
      Bc: b
    });
    return Ec();
  };

  var od = function od(a, b, c) {
    this.g = a;
    this.U = [];
    this.K = {
      enabled: new nd(this.U),
      disabled: c
    };
    this.q = this.K.enabled;
    zc(Ac(this.g.ea), ha(this.zc, b), this.yc, this);
  };

  od.prototype.zc = function (a) {
    if (null === this.U) throw Error("Channel setup already completed.");
    this.K.enabled = a();
    pd(this);
    la(this.U, function (a) {
      this.send(a.pc, a.Bc);
    }, this);
    this.U = null;
    id(this.g, _t(this.xc, this));
  };

  od.prototype.yc = function () {
    if (null === this.U) throw Error("Channel setup already completed.");
    this.q = this.K.enabled = this.K.disabled;
    this.U = null;
  };

  od.prototype.send = function (a, b) {
    return this.q.send(a, b);
  };

  var pd = function pd(a) {
    a.q = a.g.xa() ? a.K.enabled : a.K.disabled;
  };

  od.prototype.xc = function (a) {
    switch (a) {
      case "analytics.tracking-permitted":
        pd(this);
    }
  };

  var qd = function qd(a, b) {
    this.Ra = [];

    var c = _t(function () {
      this.pa = new Hc(b.Xa());
      la(this.Ra, function (a) {
        this.pa.R(a);
      }, this);
      this.Ra = null;
      return this.pa;
    }, this);

    this.q = new od(a, c, V.lc());
  };

  qd.prototype.Xa = function () {
    return this.q;
  };

  qd.prototype.R = function (a) {
    this.pa ? this.pa.R(a) : this.Ra.push(a);
  };

  var rd = function rd(a, b) {
    this.g = a;
    this.Pc = b;
  };

  rd.prototype.create = function () {
    return new qd(this.g, this.Pc);
  };

  var sd = function sd(a, b) {
    M.call(this);
    this.wa = a || 1;
    this.Y = b || k;
    this.Pa = _t(this.Uc, this);
    this.ab = u();
  };

  w(sd, M);
  h = sd.prototype;
  h.enabled = !1;
  h.h = null;

  h.Uc = function () {
    if (this.enabled) {
      var a = u() - this.ab;
      0 < a && a < .8 * this.wa ? this.h = this.Y.setTimeout(this.Pa, this.wa - a) : (this.h && (this.Y.clearTimeout(this.h), this.h = null), this.dispatchEvent("tick"), this.enabled && (this.h = this.Y.setTimeout(this.Pa, this.wa), this.ab = u()));
    }
  };

  h.start = function () {
    this.enabled = !0;
    this.h || (this.h = this.Y.setTimeout(this.Pa, this.wa), this.ab = u());
  };

  h.stop = function () {
    this.enabled = !1;
    this.h && (this.Y.clearTimeout(this.h), this.h = null);
  };

  h.o = function () {
    sd.P.o.call(this);
    this.stop();
    delete this.Y;
  };

  var td = function td(a, b, c) {
    if (q(a)) c && (a = _t(a, c));else if (a && "function" == typeof a.handleEvent) a = _t(a.handleEvent, a);else throw Error("Invalid listener argument");
    return 2147483647 < b ? -1 : k.setTimeout(a, b || 0);
  };

  var W = function W(a) {
    G.call(this);
    this.Ya = a;
    this.b = {};
  };

  w(W, G);
  var ud = [];

  W.prototype.listen = function (a, b, c, d) {
    n(b) || (b && (ud[0] = b.toString()), b = ud);

    for (var e = 0; e < b.length; e++) {
      var f = Db(a, b[e], c || this.handleEvent, d || !1, this.Ya || this);
      if (!f) break;
      this.b[f.key] = f;
    }

    return this;
  };

  W.prototype.cb = function (a, b, c, d) {
    return vd(this, a, b, c, d);
  };

  var vd = function vd(a, b, c, d, e, f) {
    if (n(c)) for (var g = 0; g < c.length; g++) {
      vd(a, b, c[g], d, e, f);
    } else {
      b = Kb(b, c, d || a.handleEvent, e, f || a.Ya || a);
      if (!b) return a;
      a.b[b.key] = b;
    }
    return a;
  };

  W.prototype.jb = function (a, b, c, d, e) {
    if (n(b)) for (var f = 0; f < b.length; f++) {
      this.jb(a, b[f], c, d, e);
    } else c = c || this.handleEvent, e = e || this.Ya || this, c = Eb(c), d = !!d, b = ub(a) ? a.ba(b, c, d, e) : a ? (a = Gb(a)) ? a.ba(b, c, d, e) : null : null, b && (Mb(b), delete this.b[b.key]);
    return this;
  };

  W.prototype.removeAll = function () {
    va(this.b, Mb);
    this.b = {};
  };

  W.prototype.o = function () {
    W.P.o.call(this);
    this.removeAll();
  };

  W.prototype.handleEvent = function () {
    throw Error("EventHandler.handleEvent not implemented");
  };

  var wd = function wd() {
    M.call(this);
    this.oa = new W(this);
    pb && (qb ? this.oa.listen(rb ? document.body : window, ["online", "offline"], this.wb) : (this.Eb = pb ? navigator.onLine : !0, this.h = new sd(250), this.oa.listen(this.h, "tick", this.oc), this.h.start()));
  };

  w(wd, M);

  wd.prototype.oc = function () {
    var a = pb ? navigator.onLine : !0;
    a != this.Eb && (this.Eb = a, this.wb());
  };

  wd.prototype.wb = function () {
    this.dispatchEvent((pb ? navigator.onLine : 1) ? "online" : "offline");
  };

  wd.prototype.o = function () {
    wd.P.o.call(this);
    this.oa.ma();
    this.oa = null;
    this.h && (this.h.ma(), this.h = null);
  };

  var xd = function xd(a, b) {
    this.g = a;
    this.e = b;
  };

  xd.prototype.send = function (a, b) {
    b.set(Nc, gd(this.g));
    return this.e.send(a, b);
  };

  var yd = function yd(a) {
    this.e = a;
  };

  yd.prototype.send = function (a, b) {
    zd(b);
    Ad(b);
    return this.e.send(a, b);
  };

  var zd = function zd(a) {
    Xa(a, function (b, c) {
      m(b.maxLength) && "text" == b.valueType && 0 < b.maxLength && c.length > b.maxLength && a.set(b, c.substring(0, b.maxLength));
    });
  },
      Ad = function Ad(a) {
    Xa(a, function (b, c) {
      m(b.defaultValue) && c == b.defaultValue && a.remove(b);
    });
  };

  var Fc = {
    status: "device-offline",
    la: void 0
  },
      Bd = {
    status: "rate-limited",
    la: void 0
  },
      Cd = {
    status: "sampled-out",
    la: void 0
  },
      Dd = {
    status: "sent",
    la: void 0
  };

  var Ed = function Ed(a, b) {
    this.Vc = a;
    this.e = b;
  };

  Ed.prototype.send = function (a, b) {
    var c;
    c = this.Vc;
    var d = c.Lb(),
        e = Math.floor((d - c.Ab) * c.hc);
    0 < e && (c.$ = Math.min(c.$ + e, c.uc), c.Ab = d);
    1 > c.$ ? c = !1 : (--c.$, c = !0);
    return c || "item" == a || "transaction" == a ? this.e.send(a, b) : Ec(Bd);
  };

  var Fd = function Fd() {
    this.$ = 60;
    this.uc = 500;
    this.hc = 5E-4;

    this.Lb = function () {
      return new Date().getTime();
    };

    this.Ab = this.Lb();
  };

  var Gd = function Gd(a, b) {
    this.g = a;
    this.e = b;
  };

  Gd.prototype.send = function (a, b) {
    var c = b.get(Nc),
        c = parseInt(c.split("-")[1], 16),
        d;
    "timing" != a ? d = kd(this.g) : ((d = b.get(Qc)) && b.remove(Qc), d = d || kd(this.g));
    return c < 655.36 * d ? this.e.send(a, b) : Ec(Cd);
  };

  var Hd = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/,
      Jd = function Jd(a) {
    if (Id) {
      Id = !1;
      var b = k.location;

      if (b) {
        var c = b.href;
        if (c && (c = (c = Jd(c)[3] || null) ? decodeURI(c) : c) && c != b.hostname) throw Id = !0, Error();
      }
    }

    return a.match(Hd);
  },
      Id = fb,
      Kd = function Kd(a, b) {
    for (var c = a.split("&"), d = 0; d < c.length; d++) {
      var e = c[d].indexOf("="),
          f = null,
          g = null;
      0 <= e ? (f = c[d].substring(0, e), g = c[d].substring(e + 1)) : f = c[d];
      b(f, g ? decodeURIComponent(g.replace(/\+/g, " ")) : "");
    }
  };

  var Ld = function Ld() {};

  Ld.prototype.nb = null;

  var Nd = function Nd(a) {
    var b;
    (b = a.nb) || (b = {}, Md(a) && (b[0] = !0, b[1] = !0), b = a.nb = b);
    return b;
  };

  var Od,
      Pd = function Pd() {};

  w(Pd, Ld);

  var Qd = function Qd(a) {
    return (a = Md(a)) ? new ActiveXObject(a) : new XMLHttpRequest();
  },
      Md = function Md(a) {
    if (!a.xb && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
      for (var b = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], c = 0; c < b.length; c++) {
        var d = b[c];

        try {
          return new ActiveXObject(d), a.xb = d;
        } catch (e) {}
      }

      throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");
    }

    return a.xb;
  };

  Od = new Pd();

  var X = function X(a) {
    M.call(this);
    this.headers = new z();
    this.Ma = a || null;
    this.F = !1;
    this.La = this.a = null;
    this.za = this.$a = "";
    this.N = this.Za = this.va = this.Ua = !1;
    this.Ha = 0;
    this.Ga = null;
    this.Gb = "";
    this.kb = this.Zc = !1;
  };

  w(X, M);

  var Rd = /^https?$/i,
      Sd = ["POST", "PUT"],
      Td = [],
      Ud = function Ud(a, b, c) {
    var d = new X();
    Td.push(d);
    b && d.listen("complete", b);
    d.cb("ready", d.bc);
    d.send(a, "POST", c, void 0);
  };

  X.prototype.bc = function () {
    this.ma();
    qa(Td, this);
  };

  X.prototype.send = function (a, b, c, d) {
    if (this.a) throw Error("[goog.net.XhrIo] Object is active with another request=" + this.$a + "; newUri=" + a);
    b = b ? b.toUpperCase() : "GET";
    this.$a = a;
    this.za = "";
    this.Ua = !1;
    this.F = !0;
    this.a = this.Ma ? Qd(this.Ma) : Qd(Od);
    this.La = this.Ma ? Nd(this.Ma) : Nd(Od);
    this.a.onreadystatechange = _t(this.Db, this);

    try {
      this.Za = !0, this.a.open(b, String(a), !0), this.Za = !1;
    } catch (e) {
      this.na(5, e);
      return;
    }

    a = c || "";
    var f = this.headers.clone();
    d && Wa(d, function (a, b) {
      f.set(b, a);
    });
    d = pa(f.H());
    c = k.FormData && a instanceof k.FormData;
    !(0 <= ka(Sd, b)) || d || c || f.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
    f.forEach(function (a, b) {
      this.a.setRequestHeader(b, a);
    }, this);
    this.Gb && (this.a.responseType = this.Gb);
    "withCredentials" in this.a && (this.a.withCredentials = this.Zc);

    try {
      Vd(this), 0 < this.Ha && ((this.kb = Wd(this.a)) ? (this.a.timeout = this.Ha, this.a.ontimeout = _t(this.Mb, this)) : this.Ga = td(this.Mb, this.Ha, this)), this.va = !0, this.a.send(a), this.va = !1;
    } catch (g) {
      this.na(5, g);
    }
  };

  var Wd = function Wd(a) {
    return J && K(9) && ea(a.timeout) && m(a.ontimeout);
  },
      oa = function oa(a) {
    return "content-type" == a.toLowerCase();
  };

  X.prototype.Mb = function () {
    "undefined" != typeof aa && this.a && (this.za = "Timed out after " + this.Ha + "ms, aborting", this.dispatchEvent("timeout"), this.abort(8));
  };

  X.prototype.na = function (a, b) {
    this.F = !1;
    this.a && (this.N = !0, this.a.abort(), this.N = !1);
    this.za = b;
    Xd(this);
    Yd(this);
  };

  var Xd = function Xd(a) {
    a.Ua || (a.Ua = !0, a.dispatchEvent("complete"), a.dispatchEvent("error"));
  };

  X.prototype.abort = function () {
    this.a && this.F && (this.F = !1, this.N = !0, this.a.abort(), this.N = !1, this.dispatchEvent("complete"), this.dispatchEvent("abort"), Yd(this));
  };

  X.prototype.o = function () {
    this.a && (this.F && (this.F = !1, this.N = !0, this.a.abort(), this.N = !1), Yd(this, !0));
    X.P.o.call(this);
  };

  X.prototype.Db = function () {
    this.aa || (this.Za || this.va || this.N ? Zd(this) : this.wc());
  };

  X.prototype.wc = function () {
    Zd(this);
  };

  var Zd = function Zd(a) {
    if (a.F && "undefined" != typeof aa && (!a.La[1] || 4 != $d(a) || 2 != ae(a))) if (a.va && 4 == $d(a)) td(a.Db, 0, a);else if (a.dispatchEvent("readystatechange"), 4 == $d(a)) {
      a.F = !1;

      try {
        var b = ae(a),
            c;

        a: switch (b) {
          case 200:
          case 201:
          case 202:
          case 204:
          case 206:
          case 304:
          case 1223:
            c = !0;
            break a;

          default:
            c = !1;
        }

        var d;

        if (!(d = c)) {
          var e;

          if (e = 0 === b) {
            var f = Jd(String(a.$a))[1] || null;
            if (!f && self.location) var g = self.location.protocol,
                f = g.substr(0, g.length - 1);
            e = !Rd.test(f ? f.toLowerCase() : "");
          }

          d = e;
        }

        if (d) a.dispatchEvent("complete"), a.dispatchEvent("success");else {
          var l;

          try {
            l = 2 < $d(a) ? a.a.statusText : "";
          } catch (D) {
            l = "";
          }

          a.za = l + " [" + ae(a) + "]";
          Xd(a);
        }
      } finally {
        Yd(a);
      }
    }
  },
      Yd = function Yd(a, b) {
    if (a.a) {
      Vd(a);
      var c = a.a,
          d = a.La[0] ? ba : null;
      a.a = null;
      a.La = null;
      b || a.dispatchEvent("ready");

      try {
        c.onreadystatechange = d;
      } catch (e) {}
    }
  },
      Vd = function Vd(a) {
    a.a && a.kb && (a.a.ontimeout = null);
    ea(a.Ga) && (k.clearTimeout(a.Ga), a.Ga = null);
  },
      $d = function $d(a) {
    return a.a ? a.a.readyState : 0;
  },
      ae = function ae(a) {
    try {
      return 2 < $d(a) ? a.a.status : -1;
    } catch (b) {
      return -1;
    }
  };

  var be = function be(a, b, c) {
    this.r = a || null;
    this.qc = !!c;
  },
      ce = function ce(a) {
    a.c || (a.c = new z(), a.j = 0, a.r && Kd(a.r, function (b, c) {
      a.add(decodeURIComponent(b.replace(/\+/g, " ")), c);
    }));
  };

  h = be.prototype;
  h.c = null;
  h.j = null;

  h.add = function (a, b) {
    ce(this);
    this.r = null;
    a = de(this, a);
    var c = this.c.get(a);
    c || this.c.set(a, c = []);
    c.push(b);
    this.j++;
    return this;
  };

  h.remove = function (a) {
    ce(this);
    a = de(this, a);
    return this.c.T(a) ? (this.r = null, this.j -= this.c.get(a).length, this.c.remove(a)) : !1;
  };

  h.T = function (a) {
    ce(this);
    a = de(this, a);
    return this.c.T(a);
  };

  h.H = function () {
    ce(this);

    for (var a = this.c.t(), b = this.c.H(), c = [], d = 0; d < b.length; d++) {
      for (var e = a[d], f = 0; f < e.length; f++) {
        c.push(b[d]);
      }
    }

    return c;
  };

  h.t = function (a) {
    ce(this);
    var b = [];
    if (p(a)) this.T(a) && (b = ra(b, this.c.get(de(this, a))));else {
      a = this.c.t();

      for (var c = 0; c < a.length; c++) {
        b = ra(b, a[c]);
      }
    }
    return b;
  };

  h.set = function (a, b) {
    ce(this);
    this.r = null;
    a = de(this, a);
    this.T(a) && (this.j -= this.c.get(a).length);
    this.c.set(a, [b]);
    this.j++;
    return this;
  };

  h.get = function (a, b) {
    var c = a ? this.t(a) : [];
    return 0 < c.length ? String(c[0]) : b;
  };

  h.toString = function () {
    if (this.r) return this.r;
    if (!this.c) return "";

    for (var a = [], b = this.c.H(), c = 0; c < b.length; c++) {
      for (var d = b[c], e = encodeURIComponent(String(d)), d = this.t(d), f = 0; f < d.length; f++) {
        var g = e;
        "" !== d[f] && (g += "=" + encodeURIComponent(String(d[f])));
        a.push(g);
      }
    }

    return this.r = a.join("&");
  };

  h.clone = function () {
    var a = new be();
    a.r = this.r;
    this.c && (a.c = this.c.clone(), a.j = this.j);
    return a;
  };

  var de = function de(a, b) {
    var c = String(b);
    a.qc && (c = c.toLowerCase());
    return c;
  };

  var ee = function ee(a, b) {
    this.Mc = a;
    this.Aa = b;
  };

  ee.prototype.send = function (a, b) {
    if (pb && !navigator.onLine) return Gc();
    var c = new Q(),
        d = fe(a, b);
    d.length > this.Aa ? c.A({
      status: "payload-too-big",
      la: Ua("Encoded hit length == %s, but should be <= %s.", d.length, this.Aa)
    }) : Ud(this.Mc, function () {
      c.v(Dd);
    }, d);
    return c;
  };

  var fe = function fe(a, b) {
    var c = new be();
    c.add(Fa.name, a);
    Xa(b, function (a, b) {
      c.add(a.name, b.toString());
    });
    return c.toString();
  };

  var ge = function ge(a, b, c) {
    this.g = a;
    this.Lc = b;
    this.Aa = c;
  };

  ge.prototype.Xa = function () {
    if (!this.q) {
      if (!Ac(this.g.ea).C) throw Error("Cannot construct shared channel prior to settings being ready.");
      new wd();
      var a = new yd(new ee(this.Lc, this.Aa)),
          b = new Fd();
      this.q = new xd(this.g, new Gd(this.g, new Ed(b, a)));
    }

    return this.q;
  };

  var he = new z(),
      ie = function ie() {
    Da || (Da = new T(new ld()));
    return Da;
  };

  v("goog.async.Deferred", Q);
  v("goog.async.Deferred.prototype.addCallback", Q.prototype.n);
  v("goog.async.Deferred.prototype.callback", Q.prototype.v);
  v("goog.async.Deferred.prototype.then", Q.prototype.then);
  v("goog.events.EventTarget", M);
  v("goog.events.EventTarget.prototype.listen", M.prototype.listen);
  v("analytics.getService", function (a, b) {
    var c = he.get(a, null),
        d = b || chrome.runtime.getManifest().version;

    if (null === c) {
      c = ie();

      if (!Ea) {
        var e = ie();
        Ea = new rd(e, new ge(e, "https://www.google-analytics.com/collect", 8192));
      }

      c = new Zc("ca1.6.0", a, d, c, Ea);
      he.set(a, c);
    }

    return c;
  });
  v("analytics.internal.GoogleAnalyticsService", Zc);
  v("analytics.internal.GoogleAnalyticsService.prototype.getTracker", Zc.prototype.mc);
  v("analytics.internal.GoogleAnalyticsService.prototype.getConfig", Zc.prototype.kc);
  v("analytics.internal.ServiceSettings", T);
  v("analytics.internal.ServiceSettings.prototype.setTrackingPermitted", T.prototype.Oc);
  v("analytics.internal.ServiceSettings.prototype.isTrackingPermitted", T.prototype.xa);
  v("analytics.internal.ServiceSettings.prototype.setSampleRate", T.prototype.Nc);
  v("analytics.internal.ServiceSettings.prototype.resetUserId", T.prototype.Fc);
  v("analytics.internal.ServiceTracker", S);
  v("analytics.internal.ServiceTracker.prototype.send", S.prototype.send);
  v("analytics.internal.ServiceTracker.prototype.sendAppView", S.prototype.Hc);
  v("analytics.internal.ServiceTracker.prototype.sendEvent", S.prototype.Ic);
  v("analytics.internal.ServiceTracker.prototype.sendSocial", S.prototype.Kc);
  v("analytics.internal.ServiceTracker.prototype.sendException", S.prototype.Jc);
  v("analytics.internal.ServiceTracker.prototype.sendTiming", S.prototype.Ib);
  v("analytics.internal.ServiceTracker.prototype.startTiming", S.prototype.Rc);
  v("analytics.internal.ServiceTracker.Timing", Yc);
  v("analytics.internal.ServiceTracker.Timing.prototype.send", Yc.prototype.send);
  v("analytics.internal.ServiceTracker.prototype.forceSessionStart", S.prototype.jc);
  v("analytics.internal.ServiceTracker.prototype.addFilter", S.prototype.R);
  v("analytics.internal.FilterChannel.Hit", R);
  v("analytics.internal.FilterChannel.Hit.prototype.getHitType", R.prototype.ub);
  v("analytics.internal.FilterChannel.Hit.prototype.getParameters", R.prototype.V);
  v("analytics.internal.FilterChannel.Hit.prototype.cancel", R.prototype.cancel);
  v("analytics.ParameterMap", E);
  v("analytics.ParameterMap.Entry", E.Entry);
  v("analytics.ParameterMap.prototype.set", E.prototype.set);
  v("analytics.ParameterMap.prototype.get", E.prototype.get);
  v("analytics.ParameterMap.prototype.remove", E.prototype.remove);
  v("analytics.ParameterMap.prototype.toObject", E.prototype.Nb);
  v("analytics.HitTypes.APPVIEW", "appview");
  v("analytics.HitTypes.EVENT", "event");
  v("analytics.HitTypes.SOCIAL", "social");
  v("analytics.HitTypes.TRANSACTION", "transaction");
  v("analytics.HitTypes.ITEM", "item");
  v("analytics.HitTypes.TIMING", "timing");
  v("analytics.HitTypes.EXCEPTION", "exception");
  va(Ma, function (a) {
    var b = a.id.replace(/[A-Z]/, "_$&").toUpperCase();
    v("analytics.Parameters." + b, a);
  });
  v("analytics.filters.EventLabelerBuilder", C);
  v("analytics.filters.EventLabelerBuilder.prototype.appendToExistingLabel", C.prototype.Wb);
  v("analytics.filters.EventLabelerBuilder.prototype.stripValue", C.prototype.Sc);
  v("analytics.filters.EventLabelerBuilder.prototype.powersOfTwo", C.prototype.Dc);
  v("analytics.filters.EventLabelerBuilder.prototype.rangeBounds", C.prototype.Ec);
  v("analytics.filters.EventLabelerBuilder.prototype.build", C.prototype.ia);
  v("analytics.filters.FilterBuilder", B);
  v("analytics.filters.FilterBuilder.builder", Ra);
  v("analytics.filters.FilterBuilder.prototype.when", B.prototype.when);
  v("analytics.filters.FilterBuilder.prototype.whenHitType", B.prototype.Rb);
  v("analytics.filters.FilterBuilder.prototype.whenValue", B.prototype.Yc);
  v("analytics.filters.FilterBuilder.prototype.applyFilter", B.prototype.mb);
  v("analytics.filters.FilterBuilder.prototype.build", B.prototype.ia);
  v("analytics.EventBuilder", F);
  v("analytics.EventBuilder.builder", function () {
    return Ya;
  });
  v("analytics.EventBuilder.prototype.category", F.prototype.Yb);
  v("analytics.EventBuilder.prototype.action", F.prototype.action);
  v("analytics.EventBuilder.prototype.label", F.prototype.label);
  v("analytics.EventBuilder.prototype.value", F.prototype.value);
  v("analytics.EventBuilder.prototype.dimension", F.prototype.fc);
  v("analytics.EventBuilder.prototype.metric", F.prototype.vc);
  v("analytics.EventBuilder.prototype.send", F.prototype.send);
}).call(window);

/***/ }),

/***/ "./src/settings.js":
/*!*************************!*\
  !*** ./src/settings.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var settings = {
  authorizeUri: "http://trakt.tv/oauth/authorize",
  apiUri: "https://api.trakt.tv",
  redirectUri: "https://www.netflix.com/Activate",
  clientId: "7a3a721121890e3719cd681fdbb9b944317af72e1a0afca6a5a6f601fb1c2633",
  clientSecret: "575304dded8adfc7fd16e5c7c066ebdcfeccb2db9b44c09abd66d96b862c5853",
  apiVersion: "2",
  analyticsId: "UA-127792057-1",
  rollbarToken: "680b6a8d7c324b24bd4fb0630de581ef",
  tmdbApiKey: "05cb40882f93db6fa9c332fc036fa3ba"
};
/* harmony default export */ __webpack_exports__["default"] = (settings);

/***/ }),

/***/ 0:
/*!***********************************************!*\
  !*** multi ./src/modules/background/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/modules/background/index.js */"./src/modules/background/index.js");


/***/ })

/******/ });
//# sourceMappingURL=background.js.map