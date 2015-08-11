(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.HireFacetedSearch = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

module.exports.Dispatcher = _dereq_('./lib/Dispatcher')

},{"./lib/Dispatcher":2}],2:[function(_dereq_,module,exports){
/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Dispatcher
 * @typechecks
 */

"use strict";

var invariant = _dereq_('./invariant');

var _lastID = 1;
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
 *    CountryStore.dispatchToken = flightDispatcher.register(function(payload) {
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
 *           flightDispatcher.waitFor([CityStore.dispatchToken]);
 *           FlightPriceStore.price =
 *             getFlightPriceStore(CountryStore.country, CityStore.city);
 *           break;
 *
 *         case 'city-update':
 *           FlightPriceStore.price =
 *             FlightPriceStore(CountryStore.country, CityStore.city);
 *           break;
 *     }
 *   });
 *
 * The `country-update` payload will be guaranteed to invoke the stores'
 * registered callbacks in order: `CountryStore`, `CityStore`, then
 * `FlightPriceStore`.
 */

  function Dispatcher() {
    this.$Dispatcher_callbacks = {};
    this.$Dispatcher_isPending = {};
    this.$Dispatcher_isHandled = {};
    this.$Dispatcher_isDispatching = false;
    this.$Dispatcher_pendingPayload = null;
  }

  /**
   * Registers a callback to be invoked with every dispatched payload. Returns
   * a token that can be used with `waitFor()`.
   *
   * @param {function} callback
   * @return {string}
   */
  Dispatcher.prototype.register=function(callback) {
    var id = _prefix + _lastID++;
    this.$Dispatcher_callbacks[id] = callback;
    return id;
  };

  /**
   * Removes a callback based on its token.
   *
   * @param {string} id
   */
  Dispatcher.prototype.unregister=function(id) {
    invariant(
      this.$Dispatcher_callbacks[id],
      'Dispatcher.unregister(...): `%s` does not map to a registered callback.',
      id
    );
    delete this.$Dispatcher_callbacks[id];
  };

  /**
   * Waits for the callbacks specified to be invoked before continuing execution
   * of the current callback. This method should only be used by a callback in
   * response to a dispatched payload.
   *
   * @param {array<string>} ids
   */
  Dispatcher.prototype.waitFor=function(ids) {
    invariant(
      this.$Dispatcher_isDispatching,
      'Dispatcher.waitFor(...): Must be invoked while dispatching.'
    );
    for (var ii = 0; ii < ids.length; ii++) {
      var id = ids[ii];
      if (this.$Dispatcher_isPending[id]) {
        invariant(
          this.$Dispatcher_isHandled[id],
          'Dispatcher.waitFor(...): Circular dependency detected while ' +
          'waiting for `%s`.',
          id
        );
        continue;
      }
      invariant(
        this.$Dispatcher_callbacks[id],
        'Dispatcher.waitFor(...): `%s` does not map to a registered callback.',
        id
      );
      this.$Dispatcher_invokeCallback(id);
    }
  };

  /**
   * Dispatches a payload to all registered callbacks.
   *
   * @param {object} payload
   */
  Dispatcher.prototype.dispatch=function(payload) {
    invariant(
      !this.$Dispatcher_isDispatching,
      'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.'
    );
    this.$Dispatcher_startDispatching(payload);
    try {
      for (var id in this.$Dispatcher_callbacks) {
        if (this.$Dispatcher_isPending[id]) {
          continue;
        }
        this.$Dispatcher_invokeCallback(id);
      }
    } finally {
      this.$Dispatcher_stopDispatching();
    }
  };

  /**
   * Is this Dispatcher currently dispatching.
   *
   * @return {boolean}
   */
  Dispatcher.prototype.isDispatching=function() {
    return this.$Dispatcher_isDispatching;
  };

  /**
   * Call the callback stored with the given id. Also do some internal
   * bookkeeping.
   *
   * @param {string} id
   * @internal
   */
  Dispatcher.prototype.$Dispatcher_invokeCallback=function(id) {
    this.$Dispatcher_isPending[id] = true;
    this.$Dispatcher_callbacks[id](this.$Dispatcher_pendingPayload);
    this.$Dispatcher_isHandled[id] = true;
  };

  /**
   * Set up bookkeeping needed when dispatching.
   *
   * @param {object} payload
   * @internal
   */
  Dispatcher.prototype.$Dispatcher_startDispatching=function(payload) {
    for (var id in this.$Dispatcher_callbacks) {
      this.$Dispatcher_isPending[id] = false;
      this.$Dispatcher_isHandled[id] = false;
    }
    this.$Dispatcher_pendingPayload = payload;
    this.$Dispatcher_isDispatching = true;
  };

  /**
   * Clear bookkeeping used for dispatching.
   *
   * @internal
   */
  Dispatcher.prototype.$Dispatcher_stopDispatching=function() {
    this.$Dispatcher_pendingPayload = null;
    this.$Dispatcher_isDispatching = false;
  };


module.exports = Dispatcher;

},{"./invariant":3}],3:[function(_dereq_,module,exports){
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule invariant
 */

"use strict";

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (false) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        'Invariant Violation: ' +
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

},{}],4:[function(_dereq_,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],5:[function(_dereq_,module,exports){
"use strict";
var window = _dereq_("global/window")
var once = _dereq_("once")
var parseHeaders = _dereq_("parse-headers")



module.exports = createXHR
createXHR.XMLHttpRequest = window.XMLHttpRequest || noop
createXHR.XDomainRequest = "withCredentials" in (new createXHR.XMLHttpRequest()) ? createXHR.XMLHttpRequest : window.XDomainRequest


function isEmpty(obj){
    for(var i in obj){
        if(obj.hasOwnProperty(i)) return false
    }
    return true
}

function createXHR(options, callback) {
    function readystatechange() {
        if (xhr.readyState === 4) {
            loadFunc()
        }
    }

    function getBody() {
        // Chrome with requestType=blob throws errors arround when even testing access to responseText
        var body = undefined

        if (xhr.response) {
            body = xhr.response
        } else if (xhr.responseType === "text" || !xhr.responseType) {
            body = xhr.responseText || xhr.responseXML
        }

        if (isJson) {
            try {
                body = JSON.parse(body)
            } catch (e) {}
        }

        return body
    }
    
    var failureResponse = {
                body: undefined,
                headers: {},
                statusCode: 0,
                method: method,
                url: uri,
                rawRequest: xhr
            }
    
    function errorFunc(evt) {
        clearTimeout(timeoutTimer)
        if(!(evt instanceof Error)){
            evt = new Error("" + (evt || "unknown") )
        }
        evt.statusCode = 0
        callback(evt, failureResponse)
    }

    // will load the data & process the response in a special response object
    function loadFunc() {
        if (aborted) return
        var status
        clearTimeout(timeoutTimer)
        if(options.useXDR && xhr.status===undefined) {
            //IE8 CORS GET successful response doesn't have a status field, but body is fine
            status = 200
        } else {
            status = (xhr.status === 1223 ? 204 : xhr.status)
        }
        var response = failureResponse
        var err = null
        
        if (status !== 0){
            response = {
                body: getBody(),
                statusCode: status,
                method: method,
                headers: {},
                url: uri,
                rawRequest: xhr
            }
            if(xhr.getAllResponseHeaders){ //remember xhr can in fact be XDR for CORS in IE
                response.headers = parseHeaders(xhr.getAllResponseHeaders())
            }
        } else {
            err = new Error("Internal XMLHttpRequest Error")
        }
        callback(err, response, response.body)
        
    }
    
    if (typeof options === "string") {
        options = { uri: options }
    }

    options = options || {}
    if(typeof callback === "undefined"){
        throw new Error("callback argument missing")
    }
    callback = once(callback)

    var xhr = options.xhr || null

    if (!xhr) {
        if (options.cors || options.useXDR) {
            xhr = new createXHR.XDomainRequest()
        }else{
            xhr = new createXHR.XMLHttpRequest()
        }
    }

    var key
    var aborted
    var uri = xhr.url = options.uri || options.url
    var method = xhr.method = options.method || "GET"
    var body = options.body || options.data
    var headers = xhr.headers = options.headers || {}
    var sync = !!options.sync
    var isJson = false
    var timeoutTimer

    if ("json" in options) {
        isJson = true
        headers["accept"] || headers["Accept"] || (headers["Accept"] = "application/json") //Don't override existing accept header declared by user
        if (method !== "GET" && method !== "HEAD") {
            headers["Content-Type"] = "application/json"
            body = JSON.stringify(options.json)
        }
    }

    xhr.onreadystatechange = readystatechange
    xhr.onload = loadFunc
    xhr.onerror = errorFunc
    // IE9 must have onprogress be set to a unique function.
    xhr.onprogress = function () {
        // IE must die
    }
    xhr.ontimeout = errorFunc
    xhr.open(method, uri, !sync, options.username, options.password)
    //has to be after open
    if(!sync) {
        xhr.withCredentials = !!options.withCredentials
    }
    // Cannot set timeout with sync request
    // not setting timeout on the xhr object, because of old webkits etc. not handling that correctly
    // both npm's request and jquery 1.x use this kind of timeout, so this is being consistent
    if (!sync && options.timeout > 0 ) {
        timeoutTimer = setTimeout(function(){
            aborted=true//IE9 may still call readystatechange
            xhr.abort("timeout")
            errorFunc();
        }, options.timeout )
    }

    if (xhr.setRequestHeader) {
        for(key in headers){
            if(headers.hasOwnProperty(key)){
                xhr.setRequestHeader(key, headers[key])
            }
        }
    } else if (options.headers && !isEmpty(options.headers)) {
        throw new Error("Headers cannot be set on an XDomainRequest object")
    }

    if ("responseType" in options) {
        xhr.responseType = options.responseType
    }
    
    if ("beforeSend" in options && 
        typeof options.beforeSend === "function"
    ) {
        options.beforeSend(xhr)
    }

    xhr.send(body)

    return xhr


}

function noop() {}

},{"global/window":6,"once":7,"parse-headers":11}],6:[function(_dereq_,module,exports){
if (typeof window !== "undefined") {
    module.exports = window;
} else if (typeof global !== "undefined") {
    module.exports = global;
} else if (typeof self !== "undefined"){
    module.exports = self;
} else {
    module.exports = {};
}

},{}],7:[function(_dereq_,module,exports){
module.exports = once

once.proto = once(function () {
  Object.defineProperty(Function.prototype, 'once', {
    value: function () {
      return once(this)
    },
    configurable: true
  })
})

function once (fn) {
  var called = false
  return function () {
    if (called) return
    called = true
    return fn.apply(this, arguments)
  }
}

},{}],8:[function(_dereq_,module,exports){
var isFunction = _dereq_('is-function')

module.exports = forEach

var toString = Object.prototype.toString
var hasOwnProperty = Object.prototype.hasOwnProperty

function forEach(list, iterator, context) {
    if (!isFunction(iterator)) {
        throw new TypeError('iterator must be a function')
    }

    if (arguments.length < 3) {
        context = this
    }
    
    if (toString.call(list) === '[object Array]')
        forEachArray(list, iterator, context)
    else if (typeof list === 'string')
        forEachString(list, iterator, context)
    else
        forEachObject(list, iterator, context)
}

function forEachArray(array, iterator, context) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty.call(array, i)) {
            iterator.call(context, array[i], i, array)
        }
    }
}

function forEachString(string, iterator, context) {
    for (var i = 0, len = string.length; i < len; i++) {
        // no such thing as a sparse string.
        iterator.call(context, string.charAt(i), i, string)
    }
}

function forEachObject(object, iterator, context) {
    for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
            iterator.call(context, object[k], k, object)
        }
    }
}

},{"is-function":9}],9:[function(_dereq_,module,exports){
module.exports = isFunction

var toString = Object.prototype.toString

function isFunction (fn) {
  var string = toString.call(fn)
  return string === '[object Function]' ||
    (typeof fn === 'function' && string !== '[object RegExp]') ||
    (typeof window !== 'undefined' &&
     // IE8 and below
     (fn === window.setTimeout ||
      fn === window.alert ||
      fn === window.confirm ||
      fn === window.prompt))
};

},{}],10:[function(_dereq_,module,exports){

exports = module.exports = trim;

function trim(str){
  return str.replace(/^\s*|\s*$/g, '');
}

exports.left = function(str){
  return str.replace(/^\s*/, '');
};

exports.right = function(str){
  return str.replace(/\s*$/, '');
};

},{}],11:[function(_dereq_,module,exports){
var trim = _dereq_('trim')
  , forEach = _dereq_('for-each')
  , isArray = function(arg) {
      return Object.prototype.toString.call(arg) === '[object Array]';
    }

module.exports = function (headers) {
  if (!headers)
    return {}

  var result = {}

  forEach(
      trim(headers).split('\n')
    , function (row) {
        var index = row.indexOf(':')
          , key = trim(row.slice(0, index)).toLowerCase()
          , value = trim(row.slice(index + 1))

        if (typeof(result[key]) === 'undefined') {
          result[key] = value
        } else if (isArray(result[key])) {
          result[key].push(value)
        } else {
          result[key] = [ result[key], value ]
        }
      }
  )

  return result
}
},{"for-each":8,"trim":10}],12:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _dispatcher = _dereq_("../dispatcher");

var _dispatcher2 = _interopRequireDefault(_dispatcher);

var queriesActions = {
	add: function add(facetName, value) {
		_dispatcher2["default"].handleViewAction({
			actionType: "QUERIES_ADD",
			facetName: facetName,
			value: value
		});
	}
};

exports["default"] = queriesActions;
module.exports = exports["default"];

},{"../dispatcher":18}],13:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _storesApi = _dereq_("../stores/api");

var _storesApi2 = _interopRequireDefault(_storesApi);

var resultsActions = {
	getAll: function getAll() {
		_storesApi2["default"].getAllResults();
	},

	getResults: function getResults() {
		_storesApi2["default"].getResults();
	}
};

exports["default"] = resultsActions;
module.exports = exports["default"];

},{"../stores/api":20}],14:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _dispatcher = _dereq_("../dispatcher");

var _dispatcher2 = _interopRequireDefault(_dispatcher);

var serverActions = {
	receiveAllResults: function receiveAllResults(data) {
		_dispatcher2["default"].handleServerAction({
			actionType: "RESULTS_RECEIVE_ALL",
			data: data
		});
	},

	receiveResults: function receiveResults(data) {
		_dispatcher2["default"].handleServerAction({
			actionType: "RESULTS_RECEIVE",
			data: data
		});
	}
};

exports["default"] = serverActions;
module.exports = exports["default"];

},{"../dispatcher":18}],15:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = _dereq_("react");

var _react2 = _interopRequireDefault(_react);

var _listFacet = _dereq_("./list-facet");

var _listFacet2 = _interopRequireDefault(_listFacet);

var FacetedSearch = (function (_React$Component) {
	_inherits(FacetedSearch, _React$Component);

	function FacetedSearch() {
		_classCallCheck(this, FacetedSearch);

		_get(Object.getPrototypeOf(FacetedSearch.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(FacetedSearch, [{
		key: "render",
		value: function render() {
			var facets = this.props.facetData.get("facets").map(function (data) {
				return _react2["default"].createElement(_listFacet2["default"], {
					data: data,
					key: data.name });
			});

			return _react2["default"].createElement(
				"ul",
				null,
				facets
			);
		}
	}]);

	return FacetedSearch;
})(_react2["default"].Component);

FacetedSearch.defaultProps = {};

FacetedSearch.propTypes = {};

exports["default"] = FacetedSearch;
module.exports = exports["default"];

},{"./list-facet":16,"react":"react"}],16:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = _dereq_("react");

var _react2 = _interopRequireDefault(_react);

var _actionsQueries = _dereq_("../actions/queries");

var _actionsQueries2 = _interopRequireDefault(_actionsQueries);

var ListFacet = (function (_React$Component) {
	_inherits(ListFacet, _React$Component);

	function ListFacet() {
		_classCallCheck(this, ListFacet);

		_get(Object.getPrototypeOf(ListFacet.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(ListFacet, [{
		key: "handleClick",
		value: function handleClick(value) {
			_actionsQueries2["default"].add(this.props.data.get("name"), value);
		}
	}, {
		key: "render",
		value: function render() {
			var _this = this;

			var options = this.props.data.get("options");
			var sortedOptions = options.sortBy(function (opt) {
				return -1 * opt.get("count");
			});
			var listItems = sortedOptions.map(function (option, index) {
				return _react2["default"].createElement(
					"li",
					{
						key: index,
						onClick: _this.handleClick.bind(_this, option.get("name")) },
					_react2["default"].createElement(
						"label",
						null,
						option.get("name")
					),
					_react2["default"].createElement(
						"span",
						{ className: "count" },
						option.get("count")
					)
				);
			});

			return _react2["default"].createElement(
				"li",
				{ className: "hire-facet hire-list-facet" },
				_react2["default"].createElement(
					"h3",
					null,
					this.props.data.title
				),
				_react2["default"].createElement(
					"ul",
					null,
					listItems
				)
			);
		}
	}]);

	return ListFacet;
})(_react2["default"].Component);

ListFacet.defaultProps = {};

ListFacet.propTypes = {};

exports["default"] = ListFacet;
module.exports = exports["default"];

},{"../actions/queries":12,"react":"react"}],17:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = _dereq_("react");

var _react2 = _interopRequireDefault(_react);

var _listFacet = _dereq_("./list-facet");

var _listFacet2 = _interopRequireDefault(_listFacet);

var Results = (function (_React$Component) {
	_inherits(Results, _React$Component);

	function Results() {
		_classCallCheck(this, Results);

		_get(Object.getPrototypeOf(Results.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(Results, [{
		key: "render",
		value: function render() {
			var _this = this;

			console.log(this.props.facetData.toJS());
			var results = this.props.facetData.get("results").map(function (data, index) {
				return _react2["default"].createElement(
					"li",
					{ key: index, onClick: _this.props.onSelect.bind(_this, data) },
					_react2["default"].createElement(
						"label",
						null,
						data.get("name")
					),
					_react2["default"].createElement(
						"ul",
						{ className: "metadata" },
						_react2["default"].createElement(
							"li",
							null,
							_react2["default"].createElement(
								"label",
								null,
								"Date"
							),
							_react2["default"].createElement(
								"span",
								null,
								data.get("metadata").get("Date")
							)
						),
						_react2["default"].createElement(
							"li",
							null,
							_react2["default"].createElement(
								"label",
								null,
								"Recipient"
							),
							_react2["default"].createElement(
								"span",
								null,
								data.get("metadata").get("Recipient")
							)
						),
						_react2["default"].createElement(
							"li",
							null,
							_react2["default"].createElement(
								"label",
								null,
								"Sender"
							),
							_react2["default"].createElement(
								"span",
								null,
								data.get("metadata").get("Sender")
							)
						)
					)
				);
			});

			return _react2["default"].createElement(
				"div",
				{ className: "hire-faceted-search-results" },
				_react2["default"].createElement(
					"h3",
					null,
					"Found ",
					this.props.facetData.get("numFound"),
					" results"
				),
				_react2["default"].createElement(
					"ul",
					null,
					results
				)
			);
		}
	}]);

	return Results;
})(_react2["default"].Component);

Results.defaultProps = {};

Results.propTypes = {};

exports["default"] = Results;
module.exports = exports["default"];

},{"./list-facet":16,"react":"react"}],18:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _flux = _dereq_("flux");

var AppDispatcher = (function (_Dispatcher) {
	_inherits(AppDispatcher, _Dispatcher);

	function AppDispatcher() {
		_classCallCheck(this, AppDispatcher);

		_get(Object.getPrototypeOf(AppDispatcher.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(AppDispatcher, [{
		key: "handleViewAction",
		value: function handleViewAction(action) {
			console.log("VIEW_ACTION", action);

			return this.dispatch({
				source: "VIEW_ACTION",
				action: action
			});
		}
	}, {
		key: "handleServerAction",
		value: function handleServerAction(action) {
			console.log("SERVER_ACTION", action);

			return this.dispatch({
				source: "SERVER_ACTION",
				action: action
			});
		}
	}]);

	return AppDispatcher;
})(_flux.Dispatcher);

exports["default"] = new AppDispatcher();
module.exports = exports["default"];

},{"flux":1}],19:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = _dereq_("react");

var _react2 = _interopRequireDefault(_react);

var _componentsFacetedSearch = _dereq_("./components/faceted-search");

var _componentsFacetedSearch2 = _interopRequireDefault(_componentsFacetedSearch);

var _componentsResults = _dereq_("./components/results");

var _componentsResults2 = _interopRequireDefault(_componentsResults);

var _actionsResults = _dereq_("./actions/results");

var _actionsResults2 = _interopRequireDefault(_actionsResults);

var _storesResults = _dereq_("./stores/results");

var _storesResults2 = _interopRequireDefault(_storesResults);

var _storesQueries = _dereq_("./stores/queries");

var _storesQueries2 = _interopRequireDefault(_storesQueries);

var FacetedSearchController = (function (_React$Component) {
	_inherits(FacetedSearchController, _React$Component);

	function FacetedSearchController(props) {
		_classCallCheck(this, FacetedSearchController);

		_get(Object.getPrototypeOf(FacetedSearchController.prototype), "constructor", this).call(this, props);

		this.state = _storesResults2["default"].getState();
	}

	_createClass(FacetedSearchController, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			_storesResults2["default"].listen(this.onStoreChange.bind(this));
			_storesQueries2["default"].listen(this.onQueriesChange.bind(this));
			_actionsResults2["default"].getAll();
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			_storesResults2["default"].stopListening(this.onStoreChange.bind(this));
			_storesQueries2["default"].stopListening(this.onQueriesChange.bind(this));
		}
	}, {
		key: "onQueriesChange",
		value: function onQueriesChange() {
			_actionsResults2["default"].getResults();
		}
	}, {
		key: "onStoreChange",
		value: function onStoreChange() {
			this.setState(_storesResults2["default"].getState());
		}
	}, {
		key: "handleResultSelect",
		value: function handleResultSelect(result) {
			this.props.onChange(result.toJS());
		}
	}, {
		key: "render",
		value: function render() {
			var data = this.state.queryResults.size ? this.state.queryResults.last() : this.state.initResults;

			var facetedSearch = this.state.queryResults.size ? _react2["default"].createElement(_componentsFacetedSearch2["default"], { facetData: data }) : null;

			var results = this.state.queryResults.size > 1 ? _react2["default"].createElement(_componentsResults2["default"], {
				facetData: data,
				onSelect: this.handleResultSelect.bind(this) }) : null;

			return _react2["default"].createElement(
				"div",
				{ className: "hire-faceted-search" },
				facetedSearch,
				results
			);
		}
	}]);

	return FacetedSearchController;
})(_react2["default"].Component);

FacetedSearchController.defaultProps = {};

FacetedSearchController.propTypes = {
	onChange: _react2["default"].PropTypes.func.isRequired
};

exports["default"] = FacetedSearchController;
module.exports = exports["default"];

},{"./actions/results":13,"./components/faceted-search":15,"./components/results":17,"./stores/queries":22,"./stores/results":23,"react":"react"}],20:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _xhr = _dereq_("xhr");

var _xhr2 = _interopRequireDefault(_xhr);

var _actionsServer = _dereq_("../actions/server");

var _actionsServer2 = _interopRequireDefault(_actionsServer);

var _storesQueries = _dereq_("../stores/queries");

var _storesQueries2 = _interopRequireDefault(_storesQueries);

var baseUrl = "http://boschdoc.huygens.knaw.nl/draft";

exports["default"] = {
	getAllResults: function getAllResults() {
		var options = {
			url: baseUrl + "/api/search"
		};

		var done = function done(err, resp, body) {
			if (err) {
				handleError(err, resp, body);
			}

			_actionsServer2["default"].receiveAllResults(JSON.parse(body));
		};

		(0, _xhr2["default"])(options, done);
	},

	getResults: function getResults() {
		var postOptions = {
			data: JSON.stringify(_storesQueries2["default"].getState()),
			headers: {
				"Content-Type": "application/json"
			},
			method: "POST",
			url: baseUrl + "/api/search"
		};

		var postDone = function postDone(err, resp, body) {
			if (err) {
				handleError(err, resp, body);
			}

			var getOptions = {
				headers: {
					"Content-Type": "application/json"
				},
				url: resp.headers.location
			};

			var getDone = function getDone(err, resp, body) {
				if (err) {
					handleError(err, resp, body);
				}

				_actionsServer2["default"].receiveResults(JSON.parse(body));
			};

			(0, _xhr2["default"])(getOptions, getDone);
		};

		(0, _xhr2["default"])(postOptions, postDone);
	}
};
module.exports = exports["default"];

},{"../actions/server":14,"../stores/queries":22,"xhr":5}],21:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _events = _dereq_("events");

var CHANGE_EVENT = "change";

var BaseStore = (function (_EventEmitter) {
	_inherits(BaseStore, _EventEmitter);

	function BaseStore() {
		_classCallCheck(this, BaseStore);

		_get(Object.getPrototypeOf(BaseStore.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(BaseStore, [{
		key: "listen",
		value: function listen(callback) {
			this.addListener(CHANGE_EVENT, callback);
		}
	}, {
		key: "stopListening",
		value: function stopListening(callback) {
			this.removeListener(CHANGE_EVENT, callback);
		}
	}]);

	return BaseStore;
})(_events.EventEmitter);

exports["default"] = BaseStore;
module.exports = exports["default"];

},{"events":4}],22:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _dispatcher = _dereq_("../dispatcher");

var _dispatcher2 = _interopRequireDefault(_dispatcher);

var _base = _dereq_("./base");

var _base2 = _interopRequireDefault(_base);

var CHANGE_EVENT = "change";

var Queries = (function (_BaseStore) {
	_inherits(Queries, _BaseStore);

	function Queries() {
		_classCallCheck(this, Queries);

		_get(Object.getPrototypeOf(Queries.prototype), "constructor", this).call(this);

		this.data = {
			"sortParameters": [{
				"fieldname": "Sender",
				"direction": "asc"
			}, {
				"fieldname": "Recipient",
				"direction": "asc"
			}, {
				"fieldname": "Date",
				"direction": "asc"
			}],
			"resultFields": ["Sender", "Recipient", "Date"],
			"textLayers": ["Diplomatic", "Translation"],
			"searchInAnnotations": true,
			"searchInTranscriptions": true,
			"facetValues": []
		};
	}

	_createClass(Queries, [{
		key: "getState",
		value: function getState() {
			return this.data;
		}
	}, {
		key: "add",
		value: function add(facetName, value) {
			var found = this.data.facetValues.filter(function (facetValue) {
				return facetValue.name === facetName;
			});

			if (found.length) {
				found[0].values.push(value);
			} else {
				this.data.facetValues.push({
					name: facetName,
					values: [value]
				});
			}
		}
	}]);

	return Queries;
})(_base2["default"]);

var queries = new Queries();

var dispatcherCallback = function dispatcherCallback(payload) {
	switch (payload.action.actionType) {
		case "QUERIES_ADD":
			queries.add(payload.action.facetName, payload.action.value);
			break;
		default:
			return;
	}

	queries.emit(CHANGE_EVENT);
};

queries.dispatcherIndex = _dispatcher2["default"].register(dispatcherCallback);

exports["default"] = queries;
module.exports = exports["default"];

},{"../dispatcher":18,"./base":21}],23:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _immutable = _dereq_("immutable");

var _immutable2 = _interopRequireDefault(_immutable);

var _dispatcher = _dereq_("../dispatcher");

var _dispatcher2 = _interopRequireDefault(_dispatcher);

var _base = _dereq_("./base");

var _base2 = _interopRequireDefault(_base);

var _utilsRelationDisplayNames = _dereq_("./utils/relation-display-names");

var _utilsRelationDisplayNames2 = _interopRequireDefault(_utilsRelationDisplayNames);

var CHANGE_EVENT = "change";

var toObject = function toObject(prev, current) {
	prev[current.name] = current;

	return prev;
};

var ResultsStore = (function (_BaseStore) {
	_inherits(ResultsStore, _BaseStore);

	function ResultsStore() {
		_classCallCheck(this, ResultsStore);

		_get(Object.getPrototypeOf(ResultsStore.prototype), "constructor", this).call(this);

		this.data = {
			initResults: new _immutable2["default"].Map({
				results: []
			}),
			queryResults: new _immutable2["default"].List()
		};
	}

	_createClass(ResultsStore, [{
		key: "getState",
		value: function getState() {
			return this.data;
		}
	}, {
		key: "receiveAll",
		value: function receiveAll(data) {
			this.data.initResults = _immutable2["default"].fromJS(data);
			this.data.queryResults = this.data.queryResults.push(this.data.initResults);
		}
	}, {
		key: "receive",
		value: function receive(data) {
			var facetData = data.facets.reduce(toObject, {});

			var facets = this.data.initResults.get("facets").map(function (facet) {
				var options = facet.get("options").map(function (option) {
					var count = 0;

					if (facetData.hasOwnProperty(facet.get("name"))) {
						var found = facetData[facet.get("name")].options.filter(function (opt) {
							return option.get("name") === opt.name;
						});

						if (found.length) {
							count = found[0].count;
						}
					}

					return option.set("count", count);
				});

				return facet.set("options", options);
			});

			data.facets = facets;

			this.data.queryResults = this.data.queryResults.push(_immutable2["default"].fromJS(data));
		}
	}]);

	return ResultsStore;
})(_base2["default"]);

var resultsStore = new ResultsStore();

var dispatcherCallback = function dispatcherCallback(payload) {
	switch (payload.action.actionType) {
		case "RESULTS_RECEIVE_ALL":
			resultsStore.receiveAll(payload.action.data);
			break;
		case "RESULTS_RECEIVE":
			resultsStore.receive(payload.action.data);
			break;
		default:
			return;
	}

	resultsStore.emit(CHANGE_EVENT);
};

resultsStore.dispatcherIndex = _dispatcher2["default"].register(dispatcherCallback);

exports["default"] = resultsStore;
module.exports = exports["default"];

},{"../dispatcher":18,"./base":21,"./utils/relation-display-names":24,"immutable":"immutable"}],24:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = {
	is_creator_of: "",
	is_created_by: "",
	has_archive_keyword: "",
	is_archive_keyword_of: "",
	has_archiver_keyword: "",
	is_archiver_keyword_of: "",
	has_legislation_keyword: "",
	is_legislation_keyword_of: "",
	has_archive_person: "",
	is_archive_person_of: "",
	has_archiver_person: "",
	is_archiver_person_of: "",
	has_legislation_person: "",
	is_legislation_person_of: "",
	has_archive_place: "",
	is_archive_place_of: "",
	has_archiver_place: "",
	is_archiver_place_of: "",
	has_legislation_place: "",
	is_legislation_place_of: "",
	has_parent_archive: "",
	has_child_archive: "",
	has_sibling_archive: "",
	has_sibling_archiver: "",
	commentsOnPerson: "",
	commentsOnWork: "Comments on",
	containedInAnthology: "Anthology",
	hasAdaptation: "Adaptation",
	hasAnnotationsOn: "Annotations on",
	hasBibliography: "Bibliography",
	hasBiography: "Biography",
	hasBirthPlace: "Birth place",
	hasGenre: "Genre",
	hasDeathPlace: "Death place",
	hasResidenceLocation: "Residence location",
	hasPersonLanguage: "Language",
	hasWorkLanguage: "Language",
	hasLocation: "Location",
	hasPublishLocation: "Publish location",
	hasMember: "Member",
	hasPseudonym: "Pseudonym",
	hasEdition: "Edition",
	hasSequel: "Sequel",
	hasTranslation: "Translation",
	hasSourceCategory: "Source category",
	hasDocumentSource: "Document source",
	hasEducation: "Education",
	hasFinancialSituation: "Financial situation",
	hasMaritalStatus: "Marital status",
	hasObituary: "Obituary",
	hasPlagiarismBy: "Plagiarism by",
	hasPreface: "Preface",
	hasProfession: "Profession",
	hasReligion: "Religion",
	hasSocialClass: "Social class",
	isAdaptationOf: "Adaptation of",
	isAnnotatedIn: "Annotated in",
	isAnthologyContaining: "Anthology containing",
	isAwardForWork: "Award for",
	isBibliographyOf: "Bibliography of",
	isBiographyOf: "Biography of",
	isBirthPlaceOf: "Birth place of",
	isCensoredBy: "Censored by",
	isCensoringOf: "Censoring of",
	isCollaboratorOf: "Collaborator of",
	isCreatedBy: "Created by",
	isCreatorOf: "Creator of",
	isCopiedBy: "Copied by",
	isCopyOf: "Copy of",
	isChildOf: "Child of",
	isDedicatedPersonOf: "Dedicated of",
	isDedicatedTo: "Dedicated To",
	isDeathPlaceOf: "Death place of",
	isEditionOf: "Edition of",
	isGenreOf: "Genre of",
	isGrandparentOf: "Grandparent of",
	isGrandchildOf: "Grandchild of",
	isLocationOf: "Location of",
	isMemberOf: "Member of",
	isParentOf: "Parent of",
	isPublishLocationOf: "Publish location of",
	isPseudonymOf: "Pseudonym of",
	isPublishedBy: "Published by",
	isPublisherOf: "Publisher of",
	isPersonLanguageOf: "PersonLanguage of",
	isPersonCommentedOnIn: "Commented on in",
	isPersonAwarded: "Awarded for",
	isPersonListedOn: "Listed on",
	isPersonMentionedIn: "Mentioned in",
	isPersonQuotedIn: "Quoted in",
	isPersonReferencedIn: "Referenced in",
	isResidenceLocationOf: "ResidenceLocation of",
	isRelatedTo: "Related to",
	isPlagiarismOf: "Plagiarism of",
	isSpouseOf: "Spouse of",
	isStoredAt: "Stored at",
	isStorageOf: "Storage of",
	isSequelOf: "Sequel of",
	isTranslationOf: "Translation of",
	isAwardForPerson: "Award for",
	isPrefaceOf: "Preface of",
	isIntertextualOf: "Intertextual of",
	isIntertextualTo: "Intertextual to",
	isObituaryOf: "Obituary of",
	isParodiedBy: "Parodied by",
	isParodyOf: "Parody of",
	isSourceCategoryOf: "SourceCategory of",
	isDocumentSourceOf: "Document source of",
	isEducationOf: "Education of",
	isFinancialSituationOf: "Financial situation of",
	isMaritalStatusOf: "Marital status of",
	isProfessionOf: "Profession of",
	isReligionOf: "Religion of",
	isSocialClassOf: "Social class of",
	isSiblingOf: "Sibling of",
	isWorkLanguageOf: "Language of",
	isWorkCommentedOnIn: "Commented on in",
	isWorkAwarded: "Awarded for",
	isWorkListedOn: "Listed on",
	isWorkMentionedIn: "Mentioned in",
	isWorkQuotedIn: "Quoted in",
	isWorkReferencedIn: "Referenced in",
	listsPerson: "",
	listsWork: "",
	mentionsPerson: "",
	mentionsWork: "",
	referencesPerson: "",
	referencesWork: "",
	quotesPerson: "",
	quotesWork: ""
};
module.exports = exports["default"];

},{}]},{},[19])(19)
});
