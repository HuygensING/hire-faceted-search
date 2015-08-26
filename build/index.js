(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.HireFacetedSearch = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.HireFormsInput = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof _dereq_=="function"&&_dereq_;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof _dereq_=="function"&&_dereq_;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = _dereq_("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = _dereq_("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var Input = (function (_React$Component) {
	function Input(props) {
		_classCallCheck(this, Input);

		_get(Object.getPrototypeOf(Input.prototype), "constructor", this).call(this, props);

		this.state = {
			valid: true,
			invalidMessage: null
		};
	}

	_inherits(Input, _React$Component);

	_createClass(Input, [{
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(nextProps) {
			if (this.props.value === nextProps.value) {
				return;
			}

			if (nextProps.value === "") {
				if (!this.state.valid) {
					this.setState({
						valid: true,
						invalidMessage: null
					});
				}

				return;
			} else if (this.props.validate) {
				var validator = this.props.validate(nextProps.value);

				this.setState({
					valid: validator.isValid,
					invalidMessage: validator.message
				});

				if (!validator.isValid && this.props.onInvalid) {
					this.props.onInvalid(validator.message, nextProps.value);
				}
			}
		}
	}, {
		key: "shouldComponentUpdate",
		value: function shouldComponentUpdate(nextProps, nextState) {
			return this.props.value !== nextProps.value;
		}
	}, {
		key: "handleBlur",
		value: function handleBlur(ev) {
			this.props.onBlur(ev);
		}
	}, {
		key: "handleFocus",
		value: function handleFocus(ev) {
			this.props.onFocus(ev);
		}
	}, {
		key: "handleChange",
		value: function handleChange(ev) {
			this.props.onChange(ev.currentTarget.value, ev);
		}
	}, {
		key: "handleKeyDown",
		value: function handleKeyDown(ev) {
			if (this.props.onKeyDown) {
				this.props.onKeyDown(ev);
			}
		}
	}, {
		key: "handleKeyUp",
		value: function handleKeyUp(ev) {
			if (this.props.onKeyUp) {
				this.props.onKeyUp(ev);
			}
		}
	}, {
		key: "render",
		value: function render() {
			var invalidMessage = this.state.invalidMessage ? _react2["default"].createElement(
				"div",
				{ className: "hire-forms-invalid-message" },
				this.state.invalidMessage
			) : null;

			return _react2["default"].createElement(
				"div",
				{
					className: (0, _classnames2["default"])("hire-input", { invalid: !this.state.valid }) },
				_react2["default"].createElement("input", {
					onBlur: this.handleBlur.bind(this),
					onChange: this.handleChange.bind(this),
					onFocus: this.handleFocus.bind(this),
					onKeyDown: this.handleKeyDown.bind(this),
					onKeyUp: this.handleKeyUp.bind(this),
					placeholder: this.props.placeholder,
					style: this.props.style,
					value: this.props.value }),
				invalidMessage
			);
		}
	}]);

	return Input;
})(_react2["default"].Component);

Input.propTypes = {
	onBlur: _react2["default"].PropTypes.func,
	onChange: _react2["default"].PropTypes.func.isRequired,
	onFocus: _react2["default"].PropTypes.func,
	onInvalid: _react2["default"].PropTypes.func,
	onKeyDown: _react2["default"].PropTypes.func,
	onKeyUp: _react2["default"].PropTypes.func,
	placeholder: _react2["default"].PropTypes.string,
	style: _react2["default"].PropTypes.object,
	valid: _react2["default"].PropTypes.bool,
	validate: _react2["default"].PropTypes.func,
	value: _react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.string, _react2["default"].PropTypes.number])
};

Input.defaultProps = {
	value: ""
};

exports["default"] = Input;
module.exports = exports["default"];

},{"classnames":"classnames","react":"react"}]},{},[1])(1)
});

},{}],2:[function(_dereq_,module,exports){
var inserted = {};

module.exports = function (css, options) {
    if (inserted[css]) return;
    inserted[css] = true;
    
    var elem = document.createElement('style');
    elem.setAttribute('type', 'text/css');

    if ('textContent' in elem) {
      elem.textContent = css;
    } else {
      elem.styleSheet.cssText = css;
    }
    
    var head = document.getElementsByTagName('head')[0];
    if (options && options.prepend) {
        head.insertBefore(elem, head.childNodes[0]);
    } else {
        head.appendChild(elem);
    }
};

},{}],3:[function(_dereq_,module,exports){
/**
 * lodash 3.1.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var getNative = _dereq_('lodash._getnative');

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeNow = getNative(Date, 'now');

/**
 * Gets the number of milliseconds that have elapsed since the Unix epoch
 * (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @category Date
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => logs the number of milliseconds it took for the deferred function to be invoked
 */
var now = nativeNow || function() {
  return new Date().getTime();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed invocations. Provide an options object to indicate that `func`
 * should be invoked on the leading and/or trailing edge of the `wait` timeout.
 * Subsequent calls to the debounced function return the result of the last
 * `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
 * on the trailing edge of the timeout only if the the debounced function is
 * invoked more than once during the `wait` timeout.
 *
 * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options] The options object.
 * @param {boolean} [options.leading=false] Specify invoking on the leading
 *  edge of the timeout.
 * @param {number} [options.maxWait] The maximum time `func` is allowed to be
 *  delayed before it is invoked.
 * @param {boolean} [options.trailing=true] Specify invoking on the trailing
 *  edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // avoid costly calculations while the window size is in flux
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // invoke `sendMail` when the click event is fired, debouncing subsequent calls
 * jQuery('#postbox').on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // ensure `batchLog` is invoked once after 1 second of debounced calls
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', _.debounce(batchLog, 250, {
 *   'maxWait': 1000
 * }));
 *
 * // cancel a debounced call
 * var todoChanges = _.debounce(batchLog, 1000);
 * Object.observe(models.todo, todoChanges);
 *
 * Object.observe(models, function(changes) {
 *   if (_.find(changes, { 'user': 'todo', 'type': 'delete'})) {
 *     todoChanges.cancel();
 *   }
 * }, ['delete']);
 *
 * // ...at some point `models.todo` is changed
 * models.todo.completed = true;
 *
 * // ...before 1 second has passed `models.todo` is deleted
 * // which cancels the debounced `todoChanges` call
 * delete models.todo;
 */
function debounce(func, wait, options) {
  var args,
      maxTimeoutId,
      result,
      stamp,
      thisArg,
      timeoutId,
      trailingCall,
      lastCalled = 0,
      maxWait = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = wait < 0 ? 0 : (+wait || 0);
  if (options === true) {
    var leading = true;
    trailing = false;
  } else if (isObject(options)) {
    leading = !!options.leading;
    maxWait = 'maxWait' in options && nativeMax(+options.maxWait || 0, wait);
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function cancel() {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    if (maxTimeoutId) {
      clearTimeout(maxTimeoutId);
    }
    lastCalled = 0;
    maxTimeoutId = timeoutId = trailingCall = undefined;
  }

  function complete(isCalled, id) {
    if (id) {
      clearTimeout(id);
    }
    maxTimeoutId = timeoutId = trailingCall = undefined;
    if (isCalled) {
      lastCalled = now();
      result = func.apply(thisArg, args);
      if (!timeoutId && !maxTimeoutId) {
        args = thisArg = undefined;
      }
    }
  }

  function delayed() {
    var remaining = wait - (now() - stamp);
    if (remaining <= 0 || remaining > wait) {
      complete(trailingCall, maxTimeoutId);
    } else {
      timeoutId = setTimeout(delayed, remaining);
    }
  }

  function maxDelayed() {
    complete(trailing, timeoutId);
  }

  function debounced() {
    args = arguments;
    stamp = now();
    thisArg = this;
    trailingCall = trailing && (timeoutId || !leading);

    if (maxWait === false) {
      var leadingCall = leading && !timeoutId;
    } else {
      if (!maxTimeoutId && !leading) {
        lastCalled = stamp;
      }
      var remaining = maxWait - (stamp - lastCalled),
          isCalled = remaining <= 0 || remaining > maxWait;

      if (isCalled) {
        if (maxTimeoutId) {
          maxTimeoutId = clearTimeout(maxTimeoutId);
        }
        lastCalled = stamp;
        result = func.apply(thisArg, args);
      }
      else if (!maxTimeoutId) {
        maxTimeoutId = setTimeout(maxDelayed, remaining);
      }
    }
    if (isCalled && timeoutId) {
      timeoutId = clearTimeout(timeoutId);
    }
    else if (!timeoutId && wait !== maxWait) {
      timeoutId = setTimeout(delayed, wait);
    }
    if (leadingCall) {
      isCalled = true;
      result = func.apply(thisArg, args);
    }
    if (isCalled && !timeoutId && !maxTimeoutId) {
      args = thisArg = undefined;
    }
    return result;
  }
  debounced.cancel = cancel;
  return debounced;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

module.exports = debounce;

},{"lodash._getnative":4}],4:[function(_dereq_,module,exports){
/**
 * lodash 3.9.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object == null ? undefined : object[key];
  return isNative(value) ? value : undefined;
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 equivalents which return 'object' for typed array constructors.
  return isObject(value) && objToString.call(value) == funcTag;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (isFunction(value)) {
    return reIsNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reIsHostCtor.test(value);
}

module.exports = getNative;

},{}],5:[function(_dereq_,module,exports){
/**
 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseIsEqual = _dereq_('lodash._baseisequal'),
    bindCallback = _dereq_('lodash._bindcallback');

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent. If `customizer` is provided it is invoked to compare values.
 * If `customizer` returns `undefined` comparisons are handled by the method
 * instead. The `customizer` is bound to `thisArg` and invoked with three
 * arguments: (value, other [, index|key]).
 *
 * **Note:** This method supports comparing arrays, booleans, `Date` objects,
 * numbers, `Object` objects, regexes, and strings. Objects are compared by
 * their own, not inherited, enumerable properties. Functions and DOM nodes
 * are **not** supported. Provide a customizer function to extend support
 * for comparing other values.
 *
 * @static
 * @memberOf _
 * @alias eq
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize value comparisons.
 * @param {*} [thisArg] The `this` binding of `customizer`.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'user': 'fred' };
 * var other = { 'user': 'fred' };
 *
 * object == other;
 * // => false
 *
 * _.isEqual(object, other);
 * // => true
 *
 * // using a customizer callback
 * var array = ['hello', 'goodbye'];
 * var other = ['hi', 'goodbye'];
 *
 * _.isEqual(array, other, function(value, other) {
 *   if (_.every([value, other], RegExp.prototype.test, /^h(?:i|ello)$/)) {
 *     return true;
 *   }
 * });
 * // => true
 */
function isEqual(value, other, customizer, thisArg) {
  customizer = typeof customizer == 'function' ? bindCallback(customizer, thisArg, 3) : undefined;
  var result = customizer ? customizer(value, other) : undefined;
  return  result === undefined ? baseIsEqual(value, other, customizer) : !!result;
}

module.exports = isEqual;

},{"lodash._baseisequal":6,"lodash._bindcallback":12}],6:[function(_dereq_,module,exports){
/**
 * lodash 3.0.7 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var isArray = _dereq_('lodash.isarray'),
    isTypedArray = _dereq_('lodash.istypedarray'),
    keys = _dereq_('lodash.keys');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    stringTag = '[object String]';

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * A specialized version of `_.some` for arrays without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

/**
 * The base implementation of `_.isEqual` without support for `this` binding
 * `customizer` functions.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparing values.
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, customizer, isLoose, stackA, stackB) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, baseIsEqual, customizer, isLoose, stackA, stackB);
}

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing objects.
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA=[]] Tracks traversed `value` objects.
 * @param {Array} [stackB=[]] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = arrayTag,
      othTag = arrayTag;

  if (!objIsArr) {
    objTag = objToString.call(object);
    if (objTag == argsTag) {
      objTag = objectTag;
    } else if (objTag != objectTag) {
      objIsArr = isTypedArray(object);
    }
  }
  if (!othIsArr) {
    othTag = objToString.call(other);
    if (othTag == argsTag) {
      othTag = objectTag;
    } else if (othTag != objectTag) {
      othIsArr = isTypedArray(other);
    }
  }
  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && !(objIsArr || objIsObj)) {
    return equalByTag(object, other, objTag);
  }
  if (!isLoose) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, isLoose, stackA, stackB);
    }
  }
  if (!isSameTag) {
    return false;
  }
  // Assume cyclic values are equal.
  // For more information on detecting circular references see https://es5.github.io/#JO.
  stackA || (stackA = []);
  stackB || (stackB = []);

  var length = stackA.length;
  while (length--) {
    if (stackA[length] == object) {
      return stackB[length] == other;
    }
  }
  // Add `object` and `other` to the stack of traversed objects.
  stackA.push(object);
  stackB.push(other);

  var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isLoose, stackA, stackB);

  stackA.pop();
  stackB.pop();

  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing arrays.
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, equalFunc, customizer, isLoose, stackA, stackB) {
  var index = -1,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isLoose && othLength > arrLength)) {
    return false;
  }
  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index],
        result = customizer ? customizer(isLoose ? othValue : arrValue, isLoose ? arrValue : othValue, index) : undefined;

    if (result !== undefined) {
      if (result) {
        continue;
      }
      return false;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (isLoose) {
      if (!arraySome(other, function(othValue) {
            return arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
          })) {
        return false;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB))) {
      return false;
    }
  }
  return true;
}

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} value The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag) {
  switch (tag) {
    case boolTag:
    case dateTag:
      // Coerce dates and booleans to numbers, dates to milliseconds and booleans
      // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
      return +object == +other;

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case numberTag:
      // Treat `NaN` vs. `NaN` as equal.
      return (object != +object)
        ? other != +other
        : object == +other;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings primitives and string
      // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
      return object == (other + '');
  }
  return false;
}

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing values.
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
  var objProps = keys(object),
      objLength = objProps.length,
      othProps = keys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isLoose) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isLoose ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  var skipCtor = isLoose;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key],
        result = customizer ? customizer(isLoose ? othValue : objValue, isLoose? objValue : othValue, key) : undefined;

    // Recursively compare objects (susceptible to call stack limits).
    if (!(result === undefined ? equalFunc(objValue, othValue, customizer, isLoose, stackA, stackB) : result)) {
      return false;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (!skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      return false;
    }
  }
  return true;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

module.exports = baseIsEqual;

},{"lodash.isarray":7,"lodash.istypedarray":8,"lodash.keys":9}],7:[function(_dereq_,module,exports){
/**
 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var arrayTag = '[object Array]',
    funcTag = '[object Function]';

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/* Native method references for those with the same name as other `lodash` methods. */
var nativeIsArray = getNative(Array, 'isArray');

/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object == null ? undefined : object[key];
  return isNative(value) ? value : undefined;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(function() { return arguments; }());
 * // => false
 */
var isArray = nativeIsArray || function(value) {
  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
};

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 equivalents which return 'object' for typed array constructors.
  return isObject(value) && objToString.call(value) == funcTag;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (isFunction(value)) {
    return reIsNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reIsHostCtor.test(value);
}

module.exports = isArray;

},{}],8:[function(_dereq_,module,exports){
/**
 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dateTag] = typedArrayTags[errorTag] =
typedArrayTags[funcTag] = typedArrayTags[mapTag] =
typedArrayTags[numberTag] = typedArrayTags[objectTag] =
typedArrayTags[regexpTag] = typedArrayTags[setTag] =
typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
function isTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
}

module.exports = isTypedArray;

},{}],9:[function(_dereq_,module,exports){
/**
 * lodash 3.1.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var getNative = _dereq_('lodash._getnative'),
    isArguments = _dereq_('lodash.isarguments'),
    isArray = _dereq_('lodash.isarray');

/** Used to detect unsigned integer values. */
var reIsUint = /^\d+$/;

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeKeys = getNative(Object, 'keys');

/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

/**
 * Checks if `value` is array-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value));
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * A fallback implementation of `Object.keys` which creates an array of the
 * own enumerable property names of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function shimKeys(object) {
  var props = keysIn(object),
      propsLength = props.length,
      length = propsLength && object.length;

  var allowIndexes = !!length && isLength(length) &&
    (isArray(object) || isArguments(object));

  var index = -1,
      result = [];

  while (++index < propsLength) {
    var key = props[index];
    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
var keys = !nativeKeys ? shimKeys : function(object) {
  var Ctor = object == null ? undefined : object.constructor;
  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
      (typeof object != 'function' && isArrayLike(object))) {
    return shimKeys(object);
  }
  return isObject(object) ? nativeKeys(object) : [];
};

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  if (object == null) {
    return [];
  }
  if (!isObject(object)) {
    object = Object(object);
  }
  var length = object.length;
  length = (length && isLength(length) &&
    (isArray(object) || isArguments(object)) && length) || 0;

  var Ctor = object.constructor,
      index = -1,
      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
      result = Array(length),
      skipIndexes = length > 0;

  while (++index < length) {
    result[index] = (index + '');
  }
  for (var key in object) {
    if (!(skipIndexes && isIndex(key, length)) &&
        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keys;

},{"lodash._getnative":10,"lodash.isarguments":11,"lodash.isarray":7}],10:[function(_dereq_,module,exports){
arguments[4][4][0].apply(exports,arguments)
},{"dup":4}],11:[function(_dereq_,module,exports){
/**
 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Native method references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

/**
 * Checks if `value` is array-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value));
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is classified as an `arguments` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  return isObjectLike(value) && isArrayLike(value) &&
    hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
}

module.exports = isArguments;

},{}],12:[function(_dereq_,module,exports){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * A specialized version of `baseCallback` which only supports `this` binding
 * and specifying the number of arguments to provide to `func`.
 *
 * @private
 * @param {Function} func The function to bind.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {number} [argCount] The number of arguments to provide to `func`.
 * @returns {Function} Returns the callback.
 */
function bindCallback(func, thisArg, argCount) {
  if (typeof func != 'function') {
    return identity;
  }
  if (thisArg === undefined) {
    return func;
  }
  switch (argCount) {
    case 1: return function(value) {
      return func.call(thisArg, value);
    };
    case 3: return function(value, index, collection) {
      return func.call(thisArg, value, index, collection);
    };
    case 4: return function(accumulator, value, index, collection) {
      return func.call(thisArg, accumulator, value, index, collection);
    };
    case 5: return function(value, other, key, object, source) {
      return func.call(thisArg, value, other, key, object, source);
    };
  }
  return function() {
    return func.apply(thisArg, arguments);
  };
}

/**
 * This method returns the first argument provided to it.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'user': 'fred' };
 *
 * _.identity(object) === object;
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = bindCallback;

},{}],13:[function(_dereq_,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = thunkMiddleware;

function thunkMiddleware(_ref) {
  var dispatch = _ref.dispatch;
  var getState = _ref.getState;

  return function (next) {
    return function (action) {
      return typeof action === 'function' ? action(dispatch, getState) : next(action);
    };
  };
}

module.exports = exports['default'];
},{}],14:[function(_dereq_,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = createStore;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsIsPlainObject = _dereq_('./utils/isPlainObject');

var _utilsIsPlainObject2 = _interopRequireDefault(_utilsIsPlainObject);

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var ActionTypes = {
  INIT: '@@redux/INIT'
};

exports.ActionTypes = ActionTypes;
/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [initialState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */

function createStore(reducer, initialState) {
  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = initialState;
  var listeners = [];
  var isDispatching = false;

  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */
  function getState() {
    return currentState;
  }

  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */
  function subscribe(listener) {
    listeners.push(listener);

    return function unsubscribe() {
      var index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  }

  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */
  function dispatch(action) {
    if (!_utilsIsPlainObject2['default'](action)) {
      throw new Error('Actions must be plain objects. Use custom middleware for async actions.');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    listeners.slice().forEach(function (listener) {
      return listener();
    });
    return action;
  }

  /**
   * Returns the reducer currently used by the store to calculate the state.
   *
   * It is likely that you will only need this function if you implement a hot
   * reloading mechanism for Redux.
   *
   * @returns {Function} The reducer used by the current store.
   */
  function getReducer() {
    return currentReducer;
  }

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */
  function replaceReducer(nextReducer) {
    currentReducer = nextReducer;
    dispatch({ type: ActionTypes.INIT });
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT });

  return {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    getReducer: getReducer,
    replaceReducer: replaceReducer
  };
}
},{"./utils/isPlainObject":20}],15:[function(_dereq_,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _createStore = _dereq_('./createStore');

var _createStore2 = _interopRequireDefault(_createStore);

var _utilsCombineReducers = _dereq_('./utils/combineReducers');

var _utilsCombineReducers2 = _interopRequireDefault(_utilsCombineReducers);

var _utilsBindActionCreators = _dereq_('./utils/bindActionCreators');

var _utilsBindActionCreators2 = _interopRequireDefault(_utilsBindActionCreators);

var _utilsApplyMiddleware = _dereq_('./utils/applyMiddleware');

var _utilsApplyMiddleware2 = _interopRequireDefault(_utilsApplyMiddleware);

var _utilsCompose = _dereq_('./utils/compose');

var _utilsCompose2 = _interopRequireDefault(_utilsCompose);

exports.createStore = _createStore2['default'];
exports.combineReducers = _utilsCombineReducers2['default'];
exports.bindActionCreators = _utilsBindActionCreators2['default'];
exports.applyMiddleware = _utilsApplyMiddleware2['default'];
exports.compose = _utilsCompose2['default'];
},{"./createStore":14,"./utils/applyMiddleware":16,"./utils/bindActionCreators":17,"./utils/combineReducers":18,"./utils/compose":19}],16:[function(_dereq_,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = applyMiddleware;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _compose = _dereq_('./compose');

var _compose2 = _interopRequireDefault(_compose);

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */

function applyMiddleware() {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (next) {
    return function (reducer, initialState) {
      var store = next(reducer, initialState);
      var _dispatch = store.dispatch;
      var chain = [];

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch(action) {
          return _dispatch(action);
        }
      };
      chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = _compose2['default'].apply(undefined, chain.concat([store.dispatch]));

      return _extends({}, store, {
        dispatch: _dispatch
      });
    };
  };
}

module.exports = exports['default'];
},{"./compose":19}],17:[function(_dereq_,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = bindActionCreators;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsMapValues = _dereq_('../utils/mapValues');

var _utilsMapValues2 = _interopRequireDefault(_utilsMapValues);

function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(undefined, arguments));
  };
}

/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */

function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators == null) {
    throw new Error('bindActionCreators expected an object or a function, instead received ' + typeof actionCreators + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
  }

  return _utilsMapValues2['default'](actionCreators, function (actionCreator) {
    return bindActionCreator(actionCreator, dispatch);
  });
}

module.exports = exports['default'];
},{"../utils/mapValues":21}],18:[function(_dereq_,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = combineReducers;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _createStore = _dereq_('../createStore');

var _utilsIsPlainObject = _dereq_('../utils/isPlainObject');

var _utilsIsPlainObject2 = _interopRequireDefault(_utilsIsPlainObject);

var _utilsMapValues = _dereq_('../utils/mapValues');

var _utilsMapValues2 = _interopRequireDefault(_utilsMapValues);

var _utilsPick = _dereq_('../utils/pick');

var _utilsPick2 = _interopRequireDefault(_utilsPick);

function getErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

  return 'Reducer "' + key + '" returned undefined handling ' + actionName + '. ' + 'To ignore an action, you must explicitly return the previous state.';
}

function verifyStateShape(initialState, currentState) {
  var reducerKeys = Object.keys(currentState);

  if (reducerKeys.length === 0) {
    console.error('Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.');
    return;
  }

  if (!_utilsIsPlainObject2['default'](initialState)) {
    console.error('initialState has unexpected type of "' + ({}).toString.call(initialState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected initialState to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"'));
    return;
  }

  var unexpectedKeys = Object.keys(initialState).filter(function (key) {
    return reducerKeys.indexOf(key) < 0;
  });

  if (unexpectedKeys.length > 0) {
    console.error('Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" in initialState will be ignored. ') + ('Expected to find one of the known reducer keys instead: "' + reducerKeys.join('", "') + '"'));
  }
}

/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */

function combineReducers(reducers) {
  var finalReducers = _utilsPick2['default'](reducers, function (val) {
    return typeof val === 'function';
  });

  Object.keys(finalReducers).forEach(function (key) {
    var reducer = finalReducers[key];
    if (typeof reducer(undefined, { type: _createStore.ActionTypes.INIT }) === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined.');
    }

    var type = Math.random().toString(36).substring(7).split('').join('.');
    if (typeof reducer(undefined, { type: type }) === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined.');
    }
  });

  var defaultState = _utilsMapValues2['default'](finalReducers, function () {
    return undefined;
  });
  var stateShapeVerified;

  return function combination(state, action) {
    if (state === undefined) state = defaultState;

    var finalState = _utilsMapValues2['default'](finalReducers, function (reducer, key) {
      var newState = reducer(state[key], action);
      if (typeof newState === 'undefined') {
        throw new Error(getErrorMessage(key, action));
      }
      return newState;
    });

    if (
    // Node-like CommonJS environments (Browserify, Webpack)
    typeof process !== 'undefined' && typeof process.env !== 'undefined' && process.env.NODE_ENV !== 'production' ||
    // React Native
    typeof __DEV__ !== 'undefined' && __DEV__ //eslint-disable-line no-undef
    ) {
      if (!stateShapeVerified) {
        verifyStateShape(state, finalState);
        stateShapeVerified = true;
      }
    }

    return finalState;
  };
}

module.exports = exports['default'];
},{"../createStore":14,"../utils/isPlainObject":20,"../utils/mapValues":21,"../utils/pick":22}],19:[function(_dereq_,module,exports){
/**
 * Composes functions from left to right.
 *
 * @param {...Function} funcs - The functions to compose. Each is expected to
 * accept a function as an argument and to return a function.
 * @returns {Function} A function obtained by composing functions from left to
 * right.
 */
"use strict";

exports.__esModule = true;
exports["default"] = compose;

function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  return funcs.reduceRight(function (composed, f) {
    return f(composed);
  });
}

module.exports = exports["default"];
},{}],20:[function(_dereq_,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = isPlainObject;
var fnToString = function fnToString(fn) {
  return Function.prototype.toString.call(fn);
};

/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */

function isPlainObject(obj) {
  if (!obj || typeof obj !== 'object') {
    return false;
  }

  var proto = typeof obj.constructor === 'function' ? Object.getPrototypeOf(obj) : Object.prototype;

  if (proto === null) {
    return true;
  }

  var constructor = proto.constructor;

  return typeof constructor === 'function' && constructor instanceof constructor && fnToString(constructor) === fnToString(Object);
}

module.exports = exports['default'];
},{}],21:[function(_dereq_,module,exports){
/**
 * Applies a function to every key-value pair inside an object.
 *
 * @param {Object} obj The source object.
 * @param {Function} fn The mapper function taht receives the value and the key.
 * @returns {Object} A new object that contains the mapped values for the keys.
 */
"use strict";

exports.__esModule = true;
exports["default"] = mapValues;

function mapValues(obj, fn) {
  return Object.keys(obj).reduce(function (result, key) {
    result[key] = fn(obj[key], key);
    return result;
  }, {});
}

module.exports = exports["default"];
},{}],22:[function(_dereq_,module,exports){
/**
 * Picks key-value pairs from an object where values satisfy a predicate.
 *
 * @param {Object} obj The object to pick from.
 * @param {Function} fn The predicate the values must satisfy to be copied.
 * @returns {Object} The object with the values that satisfied the predicate.
 */
"use strict";

exports.__esModule = true;
exports["default"] = pick;

function pick(obj, fn) {
  return Object.keys(obj).reduce(function (result, key) {
    if (fn(obj[key])) {
      result[key] = obj[key];
    }
    return result;
  }, {});
}

module.exports = exports["default"];
},{}],23:[function(_dereq_,module,exports){
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
            headers["content-type"] || headers["Content-Type"] || (headers["Content-Type"] = "application/json") //Don't override existing accept header declared by user
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

},{"global/window":24,"once":25,"parse-headers":29}],24:[function(_dereq_,module,exports){
if (typeof window !== "undefined") {
    module.exports = window;
} else if (typeof global !== "undefined") {
    module.exports = global;
} else if (typeof self !== "undefined"){
    module.exports = self;
} else {
    module.exports = {};
}

},{}],25:[function(_dereq_,module,exports){
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

},{}],26:[function(_dereq_,module,exports){
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

},{"is-function":27}],27:[function(_dereq_,module,exports){
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

},{}],28:[function(_dereq_,module,exports){

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

},{}],29:[function(_dereq_,module,exports){
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
},{"for-each":26,"trim":28}],30:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.selectFacetValue = selectFacetValue;
exports.newSearch = newSearch;
exports.changeSearchTerm = changeSearchTerm;
exports.setSort = setSort;

var _results = _dereq_("./results");

function createNewQuery(dispatchData) {
	return function (dispatch) {
		dispatch(dispatchData);

		dispatch((0, _results.fetchResults)());
	};
}

function selectFacetValue(facetName, value, remove) {
	var part1 = {
		facetName: facetName,
		value: value
	};

	var part2 = remove ? { type: "REMOVE_FACET_VALUE" } : { type: "ADD_FACET_VALUE" };

	return createNewQuery(_extends(part1, part2));
}

function newSearch() {
	return createNewQuery({
		type: "NEW_SEARCH"
	});
}

function changeSearchTerm(value) {
	return createNewQuery({
		type: "CHANGE_SEARCH_TERM",
		value: value
	});
}

function setSort(field) {
	return createNewQuery({
		type: "SET_RESULTS_SORT",
		field: field
	});
}

},{"./results":31}],31:[function(_dereq_,module,exports){
// TODO Fix caching

"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.fetchResults = fetchResults;
exports.fetchNextResults = fetchNextResults;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _xhr = _dereq_("xhr");

var _xhr2 = _interopRequireDefault(_xhr);

var handleError = function handleError() {};

var getResults = function getResults(url, done) {
	var options = {
		headers: {
			"Content-Type": "application/json"
		},
		url: url
	};

	var cb = function cb(err, resp, body) {
		if (err) {
			handleError(err, resp, body);
		}

		done(JSON.parse(body));
	};

	(0, _xhr2["default"])(options, cb);
};

var postResults = function postResults(query, headers, url, rows, done) {
	var options = {
		data: query,
		headers: _extends(headers, {
			"Content-Type": "application/json"
		}),
		method: "POST",
		url: url
	};

	var cb = function cb(err, resp, body) {
		if (err) {
			handleError(err, resp, body);
		}

		var cbUrl = resp.headers.location + "?rows=" + rows;

		getResults(cbUrl, done);
	};

	(0, _xhr2["default"])(options, cb);
};

var dispatchResponse = function dispatchResponse(dispatch, type, response) {
	return dispatch({
		type: type,
		response: response
	});
};

var cache = {};

function fetchResults() {
	return function (dispatch, getState) {
		dispatch({ type: "REQUEST_RESULTS" });

		var state = getState();
		var query = state.queries.all.length ? state.queries.all[state.queries.all.length - 1] : state.queries["default"];

		var stringifiedQuery = JSON.stringify(query);

		// if (cache.hasOwnProperty(stringifiedQuery)) {
		// 	return dispatchResponse(dispatch, "RECEIVE_RESULTS", cache[stringifiedQuery]);
		// }

		return postResults(stringifiedQuery, state.config.headers || {}, state.config.baseURL + state.config.searchPath, state.config.rows, function (response) {
			cache[stringifiedQuery] = response;

			return dispatchResponse(dispatch, "RECEIVE_RESULTS", response);
		});
	};
}

function fetchNextResults(url) {
	return function (dispatch) {
		dispatch({ type: "REQUEST_RESULTS" });

		// if (cache.hasOwnProperty(url)) {
		// 	return dispatchResponse(dispatch, "RECEIVE_RESULTS_FROM_URL", cache[url]);
		// }

		return getResults(url, function (response) {
			cache[url] = response;

			return dispatchResponse(dispatch, "RECEIVE_NEXT_RESULTS", response);
		});
	};
}

},{"xhr":23}],32:[function(_dereq_,module,exports){
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

var _textSearch = _dereq_("./text-search");

var _textSearch2 = _interopRequireDefault(_textSearch);

var _listFacet = _dereq_("./list-facet");

var _listFacet2 = _interopRequireDefault(_listFacet);

var Facets = (function (_React$Component) {
	_inherits(Facets, _React$Component);

	function Facets() {
		_classCallCheck(this, Facets);

		_get(Object.getPrototypeOf(Facets.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(Facets, [{
		key: "render",
		value: function render() {
			var _this = this;

			var facetList = this.props.facetList.length ? this.props.facetList.map(function (facetName) {
				var found = _this.props.results.last.facets.filter(function (facet) {
					return facet.name === facetName;
				});
				if (found.length) {
					return found[0];
				} else {
					throw new Error("Unknown facet name: " + facetName);
				}
			}) : this.props.results.last.facets;

			var facets = facetList.map(function (data, index) {
				return _react2["default"].createElement(_listFacet2["default"], {
					data: data,
					key: index,
					labels: _this.props.labels,
					onSelectFacetValue: _this.props.onSelectFacetValue,
					queries: _this.props.queries });
			});

			return _react2["default"].createElement(
				"ul",
				{ className: "hire-faceted-search-facets" },
				_react2["default"].createElement(
					"button",
					{ onClick: this.props.onNewSearch },
					"New search"
				),
				_react2["default"].createElement(_textSearch2["default"], {
					onChangeSearchTerm: this.props.onChangeSearchTerm,
					value: this.props.queries.last.term }),
				facets
			);
		}
	}]);

	return Facets;
})(_react2["default"].Component);

Facets.defaultProps = {};

Facets.propTypes = {
	facetList: _react2["default"].PropTypes.array,
	labels: _react2["default"].PropTypes.object,
	onChangeSearchTerm: _react2["default"].PropTypes.func,
	onNewSearch: _react2["default"].PropTypes.func,
	onSelectFacetValue: _react2["default"].PropTypes.func,
	queries: _react2["default"].PropTypes.object,
	results: _react2["default"].PropTypes.object
};

exports["default"] = Facets;
module.exports = exports["default"];

},{"./list-facet":43,"./text-search":51,"react":"react"}],33:[function(_dereq_,module,exports){
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

var _classnames = _dereq_("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _hireFormsInput = _dereq_("hire-forms-input");

var _hireFormsInput2 = _interopRequireDefault(_hireFormsInput);

var _iconsFilter = _dereq_("../icons/filter");

var _iconsFilter2 = _interopRequireDefault(_iconsFilter);

var _insertCss = _dereq_("insert-css");

var _insertCss2 = _interopRequireDefault(_insertCss);



var css = Buffer("LmhpcmUtZmFjZXRlZC1zZWFyY2gtZmlsdGVyLW1lbnUgewoJcG9zaXRpb246IHJlbGF0aXZlOwp9CgouaGlyZS1mYWNldGVkLXNlYXJjaC1maWx0ZXItbWVudSBzdmcgewoJZmlsbDogI0VFRTsKCWhlaWdodDogMTJweDsKCXBvc2l0aW9uOiBhYnNvbHV0ZTsKCXRvcDogN3B4OwoJdHJhbnNpdGlvbjogZmlsbCAzNTBtczsKCXJpZ2h0OiA0cHg7Cgl3aWR0aDogMTJweDsKfQoKLmhpcmUtZmFjZXRlZC1zZWFyY2gtZmlsdGVyLW1lbnUuYWN0aXZlIHN2ZyB7CglmaWxsOiAjQUFBOwp9CgouaGlyZS1mYWNldGVkLXNlYXJjaC1maWx0ZXItbWVudSA+IC5oaXJlLWlucHV0IHsKCXdpZHRoOiA1MCU7CglmbG9hdDogcmlnaHQ7Cgl0cmFuc2l0aW9uOiB3aWR0aCAzNTBtczsKfQoKLmhpcmUtZmFjZXRlZC1zZWFyY2gtZmlsdGVyLW1lbnUuYWN0aXZlID4gLmhpcmUtaW5wdXQgewoJd2lkdGg6IDEwMCU7Cgp9CgouaGlyZS1mYWNldGVkLXNlYXJjaC1maWx0ZXItbWVudSA+IC5oaXJlLWlucHV0ID4gaW5wdXQgewoJYm9yZGVyOiAxcHggc29saWQgI0VFRTsKCWJveC1zaXppbmc6IGJvcmRlci1ib3g7CglvdXRsaW5lOiBub25lOwoJcGFkZGluZy1sZWZ0OiA0cHg7Cgl0cmFuc2l0aW9uOiBib3JkZXIgMzUwbXM7Cgl3aWR0aDogMTAwJTsKfQoKLmhpcmUtZmFjZXRlZC1zZWFyY2gtZmlsdGVyLW1lbnUuYWN0aXZlID4gLmhpcmUtaW5wdXQgPiBpbnB1dCB7Cglib3JkZXI6IDFweCBzb2xpZCAjQUFBOwp9","base64");
(0, _insertCss2["default"])(css, { prepend: true });

var FilterMenu = (function (_React$Component) {
	_inherits(FilterMenu, _React$Component);

	function FilterMenu(props) {
		_classCallCheck(this, FilterMenu);

		_get(Object.getPrototypeOf(FilterMenu.prototype), "constructor", this).call(this, props);

		this.state = {
			active: false,
			value: ""
		};
	}

	_createClass(FilterMenu, [{
		key: "handleInputChange",
		value: function handleInputChange(value, ev) {
			this.setState({
				value: value
			});

			this.props.onChange(value);
		}
	}, {
		key: "handleInputBlur",
		value: function handleInputBlur() {
			this.setState({
				active: false,
				value: ""
			});
		}
	}, {
		key: "handleInputFocus",
		value: function handleInputFocus() {
			this.setState({
				active: true
			});
		}
	}, {
		key: "render",
		value: function render() {
			return _react2["default"].createElement(
				"div",
				{ className: (0, _classnames2["default"])("hire-faceted-search-filter-menu", { active: this.state.active }) },
				_react2["default"].createElement(_hireFormsInput2["default"], {
					onBlur: this.handleInputBlur.bind(this),
					onChange: this.handleInputChange.bind(this),
					onFocus: this.handleInputFocus.bind(this),
					value: this.state.value }),
				_react2["default"].createElement(_iconsFilter2["default"], null)
			);
		}
	}]);

	return FilterMenu;
})(_react2["default"].Component);

FilterMenu.defaultProps = {};

FilterMenu.propTypes = {
	onChange: _react2["default"].PropTypes.func.isRequired
};

exports["default"] = FilterMenu;
module.exports = exports["default"];

},{"../icons/filter":35,"classnames":"classnames","hire-forms-input":1,"insert-css":2,"react":"react"}],34:[function(_dereq_,module,exports){
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

var CheckedIcon = (function (_React$Component) {
	_inherits(CheckedIcon, _React$Component);

	function CheckedIcon() {
		_classCallCheck(this, CheckedIcon);

		_get(Object.getPrototypeOf(CheckedIcon.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(CheckedIcon, [{
		key: "render",
		value: function render() {
			var title = this.props.title != null ? _react2["default"].createElement(
				"title",
				null,
				this.props.title
			) : null;

			return _react2["default"].createElement(
				"svg",
				{ className: "hire-icon checked", viewBox: "0 0 489 402" },
				title,
				_react2["default"].createElement("path", { d: "M 377.87,24.128 C 361.786,8.044 342.417,0.002 319.769,0.002 H 82.227 C 59.579,0.002 40.211,8.044 24.125,24.128 8.044,40.214 0.002,59.578 0.002,82.23 v 237.543 c 0,22.647 8.042,42.014 24.123,58.101 16.086,16.085 35.454,24.127 58.102,24.127 h 237.542 c 22.648,0 42.011,-8.042 58.102,-24.127 16.085,-16.087 24.126,-35.453 24.126,-58.101 V 82.23 C 401.993,59.582 393.951,40.214 377.87,24.128 z m -12.422,295.645 c 0,12.559 -4.47,23.314 -13.415,32.264 -8.945,8.945 -19.698,13.411 -32.265,13.411 H 82.227 c -12.563,0 -23.317,-4.466 -32.264,-13.411 -8.945,-8.949 -13.418,-19.705 -13.418,-32.264 V 82.23 c 0,-12.562 4.473,-23.316 13.418,-32.264 C 58.91,41.02 69.664,36.548 82.227,36.548 h 237.542 c 12.566,0 23.319,4.473 32.265,13.418 8.945,8.947 13.415,19.701 13.415,32.264 v 237.543 l -0.001,0 z" }),
				_react2["default"].createElement("path", { d: "M 480.59183,75.709029 442.06274,38.831006 c -5.28301,-5.060423 -11.70817,-7.591583 -19.26056,-7.591583 -7.55937,0 -13.98453,2.53116 -19.26753,7.591583 L 217.6825,216.98773 134.38968,136.99258 c -5.28896,-5.06231 -11.71015,-7.59062 -19.26256,-7.59062 -7.55736,0 -13.97854,2.52831 -19.267516,7.59062 l -38.529082,36.87898 c -5.28897,5.06136 -7.932461,11.20929 -7.932461,18.44186 0,7.22686 2.643491,13.38049 7.932461,18.4409 l 102.555358,98.15873 38.53207,36.87803 c 5.28598,5.06421 11.70916,7.59253 19.26455,7.59253 7.5524,0 13.97558,-2.53496 19.26454,-7.59253 l 38.53107,-36.87803 205.11372,-196.32314 c 5.284,-5.06232 7.93246,-11.20929 7.93246,-18.441873 0.005,-7.228765 -2.64846,-13.376685 -7.93246,-18.439008 z" })
			);
		}
	}]);

	return CheckedIcon;
})(_react2["default"].Component);

CheckedIcon.defaultProps = {};

CheckedIcon.propTypes = {
	title: _react2["default"].PropTypes.string
};

exports["default"] = CheckedIcon;
module.exports = exports["default"];

},{"react":"react"}],35:[function(_dereq_,module,exports){
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

var FilterIcon = (function (_React$Component) {
	_inherits(FilterIcon, _React$Component);

	function FilterIcon() {
		_classCallCheck(this, FilterIcon);

		_get(Object.getPrototypeOf(FilterIcon.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(FilterIcon, [{
		key: "render",
		value: function render() {
			var title = this.props.title != null ? _react2["default"].createElement(
				"title",
				null,
				this.props.title
			) : null;

			return _react2["default"].createElement(
				"svg",
				{ className: "hire-icon filter", viewBox: "0 0 971.986 971.986" },
				title,
				_react2["default"].createElement("path", { d: "M370.216,459.3c10.2,11.1,15.8,25.6,15.8,40.6v442c0,26.601,32.1,40.101,51.1,21.4l123.3-141.3 c16.5-19.8,25.6-29.601,25.6-49.2V500c0-15,5.7-29.5,15.8-40.601L955.615,75.5c26.5-28.8,6.101-75.5-33.1-75.5h-873 c-39.2,0-59.7,46.6-33.1,75.5L370.216,459.3z" })
			);
		}
	}]);

	return FilterIcon;
})(_react2["default"].Component);

FilterIcon.defaultProps = {};

FilterIcon.propTypes = {
	title: _react2["default"].PropTypes.string
};

exports["default"] = FilterIcon;
module.exports = exports["default"];

},{"react":"react"}],36:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = _dereq_("react");

var _react2 = _interopRequireDefault(_react);

var getNextState = function getNextState(prevState, progress) {
	var state = Object.keys(prevState).reduce(function (obj, currentProp) {
		var delta = prevState[currentProp].max - prevState[currentProp].min;
		var amplitude = delta / 2;

		var verticalTranslation = prevState[currentProp].min + amplitude;
		var horizontalTranslation = (prevState[currentProp].start - prevState[currentProp].min) / delta * Math.PI;

		var period = 2 * Math.PI / 1400 * progress;

		var current = amplitude * Math.sin(period - horizontalTranslation) + verticalTranslation;

		var nextState = {
			current: current
		};

		obj[currentProp] = _extends({}, prevState[currentProp], nextState);

		return obj;
	}, {});

	return state;
};

var LoaderThreeDots = (function (_React$Component) {
	_inherits(LoaderThreeDots, _React$Component);

	function LoaderThreeDots(props) {
		_classCallCheck(this, LoaderThreeDots);

		_get(Object.getPrototypeOf(LoaderThreeDots.prototype), "constructor", this).call(this, props);

		this.start = null;

		var radiusDefaults = {
			max: 15,
			min: 9,
			start: 9
		};

		var opacityDefaults = {
			max: 1,
			min: 0.4,
			start: 0.4
		};

		this.state = {
			circle1: {
				opacity: opacityDefaults,
				radius: radiusDefaults
			},
			circle2: {
				opacity: _extends({}, opacityDefaults, {
					start: 0.6
				}),
				radius: _extends({}, radiusDefaults, {
					start: 11
				})
			},
			circle3: {
				opacity: _extends({}, opacityDefaults, {
					start: 0.8
				}),
				radius: _extends({}, radiusDefaults, {
					start: 13
				})
			}
		};
	}

	_createClass(LoaderThreeDots, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			this.mounted = true;
			window.requestAnimationFrame(this.step.bind(this));
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			this.mounted = false;
		}
	}, {
		key: "step",
		value: function step(timestamp) {
			if (!this.mounted) {
				return;
			}

			if (this.start == null) {
				this.start = timestamp;
			}

			var progress = timestamp - this.start;

			this.setState({
				circle1: getNextState(this.state.circle1, progress),
				circle2: getNextState(this.state.circle2, progress),
				circle3: getNextState(this.state.circle3, progress)
			});

			window.requestAnimationFrame(this.step.bind(this));
		}
	}, {
		key: "render",
		value: function render() {
			return _react2["default"].createElement(
				"svg",
				{
					className: this.props.className,
					fill: "#fff",
					height: "30",
					viewBox: "0 0 120 30",
					width: "120" },
				_react2["default"].createElement("circle", {
					cx: "15",
					cy: "15",
					r: this.state.circle1.radius.current,
					fillOpacity: this.state.circle1.opacity.current }),
				_react2["default"].createElement("circle", {
					cx: "60",
					cy: "15",
					r: this.state.circle2.radius.current,
					fillOpacity: this.state.circle2.opacity.current }),
				_react2["default"].createElement("circle", {
					cx: "105",
					cy: "15",
					r: this.state.circle3.radius.current,
					fillOpacity: this.state.circle3.opacity.current })
			);
		}
	}]);

	return LoaderThreeDots;
})(_react2["default"].Component);

LoaderThreeDots.PropTypes = {
	className: _react2["default"].PropTypes.string
};

exports["default"] = LoaderThreeDots;
module.exports = exports["default"];

},{"react":"react"}],37:[function(_dereq_,module,exports){
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

var CheckedIcon = (function (_React$Component) {
	_inherits(CheckedIcon, _React$Component);

	function CheckedIcon() {
		_classCallCheck(this, CheckedIcon);

		_get(Object.getPrototypeOf(CheckedIcon.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(CheckedIcon, [{
		key: "render",
		value: function render() {
			var title = this.props.title != null ? _react2["default"].createElement(
				"title",
				null,
				this.props.title
			) : null;

			return _react2["default"].createElement(
				"svg",
				{ className: "hire-icon search", viewBox: "0 0 250.313 250.313" },
				title,
				_react2["default"].createElement("path", { d: "M244.186,214.604l-54.379-54.378c-0.289-0.289-0.628-0.491-0.93-0.76 c10.7-16.231,16.945-35.66,16.945-56.554C205.822,46.075,159.747,0,102.911,0S0,46.075,0,102.911 c0,56.835,46.074,102.911,102.91,102.911c20.895,0,40.323-6.245,56.554-16.945c0.269,0.301,0.47,0.64,0.759,0.929l54.38,54.38 c8.169,8.168,21.413,8.168,29.583,0C252.354,236.017,252.354,222.773,244.186,214.604z M102.911,170.146 c-37.134,0-67.236-30.102-67.236-67.235c0-37.134,30.103-67.236,67.236-67.236c37.132,0,67.235,30.103,67.235,67.236 C170.146,140.044,140.043,170.146,102.911,170.146z" })
			);
		}
	}]);

	return CheckedIcon;
})(_react2["default"].Component);

CheckedIcon.defaultProps = {};

CheckedIcon.propTypes = {
	title: _react2["default"].PropTypes.string
};

exports["default"] = CheckedIcon;
module.exports = exports["default"];

},{"react":"react"}],38:[function(_dereq_,module,exports){
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

var SortAlphabeticallyAscending = (function (_React$Component) {
	_inherits(SortAlphabeticallyAscending, _React$Component);

	function SortAlphabeticallyAscending() {
		_classCallCheck(this, SortAlphabeticallyAscending);

		_get(Object.getPrototypeOf(SortAlphabeticallyAscending.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(SortAlphabeticallyAscending, [{
		key: "render",
		value: function render() {
			var title = this.props.title != null ? _react2["default"].createElement(
				"title",
				null,
				this.props.title
			) : null;

			return _react2["default"].createElement(
				"svg",
				{ className: "hire-icon sort-alphabetically-ascending", viewBox: "0 0 511.626 511.627" },
				_react2["default"].createElement(
					"g",
					null,
					_react2["default"].createElement(
						"title",
						null,
						title
					),
					_react2["default"].createElement("rect", { x: "0", y: "0", width: "511.627", height: "511.627", fillOpacity: "0" }),
					_react2["default"].createElement("path", { d: "M215.232,401.991h-54.818V9.136c0-2.663-0.854-4.856-2.568-6.567C156.133,0.859,153.946,0,151.279,0H96.461 c-2.663,0-4.856,0.855-6.567,2.568c-1.709,1.715-2.568,3.905-2.568,6.567v392.855H32.507c-4.184,0-7.039,1.902-8.563,5.708 c-1.525,3.621-0.856,6.95,1.997,9.996l91.361,91.365c2.096,1.707,4.281,2.562,6.567,2.562c2.474,0,4.664-0.855,6.567-2.562 l91.076-91.078c1.906-2.279,2.856-4.571,2.856-6.844c0-2.676-0.854-4.859-2.568-6.584 C220.086,402.847,217.9,401.991,215.232,401.991z" }),
					_react2["default"].createElement("path", { d: "M428.511,479.082h-70.808c-3.997,0-6.852,0.191-8.559,0.568l-4.001,0.571v-0.571l3.142-3.142 c2.848-3.419,4.853-5.896,5.996-7.409l105.344-151.331v-25.406H297.744v65.377h34.263v-32.832h66.236 c3.422,0,6.283-0.288,8.555-0.855c0.572,0,1.287-0.048,2.143-0.145c0.853-0.085,1.475-0.144,1.852-0.144v0.855l-3.142,2.574 c-1.704,1.711-3.713,4.273-5.995,7.706L296.31,485.934v25.693h166.734v-66.521h-34.54v33.976H428.511z" }),
					_react2["default"].createElement("path", { d: "M468.475,189.008L402.807,0h-46.25l-65.664,189.008h-19.979v30.264h81.933v-30.264h-21.409l13.419-41.112h69.381 l13.415,41.112H406.25v30.264h82.228v-30.264H468.475z M354.278,116.487l20.841-62.241c0.76-2.285,1.479-5.046,2.143-8.28 c0.66-3.236,0.996-4.949,0.996-5.139l0.855-5.708h1.143c0,0.761,0.191,2.664,0.562,5.708l3.433,13.418l20.554,62.241H354.278z" })
				)
			);
		}
	}]);

	return SortAlphabeticallyAscending;
})(_react2["default"].Component);

SortAlphabeticallyAscending.defaultProps = {};

SortAlphabeticallyAscending.propTypes = {
	title: _react2["default"].PropTypes.string
};

exports["default"] = SortAlphabeticallyAscending;
module.exports = exports["default"];

},{"react":"react"}],39:[function(_dereq_,module,exports){
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

var SortAlphabeticallyDescending = (function (_React$Component) {
	_inherits(SortAlphabeticallyDescending, _React$Component);

	function SortAlphabeticallyDescending() {
		_classCallCheck(this, SortAlphabeticallyDescending);

		_get(Object.getPrototypeOf(SortAlphabeticallyDescending.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(SortAlphabeticallyDescending, [{
		key: "render",
		value: function render() {
			var title = this.props.title != null ? _react2["default"].createElement(
				"title",
				null,
				this.props.title
			) : null;

			return _react2["default"].createElement(
				"svg",
				{ className: "hire-icon sort-alphabetically-descending", viewBox: "0 0 511.626 511.627" },
				_react2["default"].createElement(
					"g",
					null,
					_react2["default"].createElement(
						"title",
						null,
						title
					),
					_react2["default"].createElement("rect", { x: "0", y: "0", width: "511.627", height: "511.627", fillOpacity: "0" }),
					_react2["default"].createElement("path", { d: "M215.232,401.991h-54.818V9.136c0-2.663-0.854-4.856-2.568-6.567C156.133,0.859,153.946,0,151.279,0H96.461 c-2.663,0-4.856,0.855-6.567,2.568c-1.709,1.715-2.568,3.905-2.568,6.567v392.855H32.507c-4.184,0-7.039,1.902-8.563,5.708 c-1.525,3.621-0.856,6.95,1.997,9.996l91.361,91.365c2.096,1.707,4.281,2.562,6.567,2.562c2.474,0,4.664-0.855,6.567-2.562 l91.076-91.078c1.906-2.279,2.856-4.571,2.856-6.844c0-2.676-0.854-4.859-2.568-6.584 C220.086,402.847,217.9,401.991,215.232,401.991z" }),
					_react2["default"].createElement("path", { d: "M468.475,481.361l-65.664-189.01h-46.25L290.9,481.364H270.92v30.263h81.934v-30.266h-21.412l13.418-41.11h69.381 l13.415,41.11H406.25v30.266h82.228v-30.266H468.475z M354.278,408.846l20.841-62.242c0.76-2.283,1.479-5.045,2.143-8.278 c0.66-3.234,0.996-4.948,0.996-5.137l0.855-5.715h1.143c0,0.767,0.191,2.669,0.562,5.715l3.433,13.415l20.554,62.242H354.278z" }),
					_react2["default"].createElement("path", { d: "M463.055,152.745h-34.537v33.975H357.71c-4.001,0-6.852,0.097-8.556,0.288l-4.004,0.854v-0.854l3.142-2.858 c2.851-3.422,4.853-5.896,5.996-7.421L459.632,25.41V0H297.754v65.387h34.259V32.552h66.232c3.426,0,6.283-0.288,8.56-0.859 c0.571,0,1.286-0.048,2.142-0.144c0.855-0.094,1.476-0.144,1.854-0.144v0.855l-3.141,2.568c-1.708,1.713-3.71,4.283-5.996,7.71 L296.32,193.569v25.697h166.735V152.745z" })
				)
			);
		}
	}]);

	return SortAlphabeticallyDescending;
})(_react2["default"].Component);

SortAlphabeticallyDescending.defaultProps = {};

SortAlphabeticallyDescending.propTypes = {
	title: _react2["default"].PropTypes.string
};

exports["default"] = SortAlphabeticallyDescending;
module.exports = exports["default"];

},{"react":"react"}],40:[function(_dereq_,module,exports){
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

var SortCountAscending = (function (_React$Component) {
	_inherits(SortCountAscending, _React$Component);

	function SortCountAscending() {
		_classCallCheck(this, SortCountAscending);

		_get(Object.getPrototypeOf(SortCountAscending.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(SortCountAscending, [{
		key: "render",
		value: function render() {
			var title = this.props.title != null ? _react2["default"].createElement(
				"title",
				null,
				this.props.title
			) : null;

			return _react2["default"].createElement(
				"svg",
				{ className: "hire-icon sort-count-ascending", viewBox: "0 0 511.627 511.627" },
				title,
				_react2["default"].createElement(
					"g",
					null,
					_react2["default"].createElement("rect", { x: "0", y: "0", width: "511.627", height: "511.627", fillOpacity: "0.01" }),
					_react2["default"].createElement("path", { d: "M260.494,219.271H388.4c2.666,0,4.855-0.855,6.563-2.57c1.715-1.713,2.573-3.9,2.573-6.567v-54.816 c0-2.667-0.858-4.854-2.573-6.567c-1.708-1.711-3.897-2.57-6.563-2.57H260.494c-2.666,0-4.853,0.855-6.567,2.57 c-1.71,1.713-2.568,3.9-2.568,6.567v54.816c0,2.667,0.855,4.854,2.568,6.567C255.641,218.413,257.828,219.271,260.494,219.271z" }),
					_react2["default"].createElement("path", { d: "M260.497,73.089h73.087c2.666,0,4.856-0.855,6.563-2.568c1.718-1.714,2.563-3.901,2.563-6.567V9.136 c0-2.663-0.846-4.853-2.563-6.567C338.44,0.859,336.25,0,333.584,0h-73.087c-2.666,0-4.853,0.855-6.567,2.568 c-1.709,1.715-2.568,3.905-2.568,6.567v54.818c0,2.666,0.855,4.853,2.568,6.567C255.645,72.23,257.831,73.089,260.497,73.089z" }),
					_react2["default"].createElement("path", { d: "M196.54,401.991h-54.817V9.136c0-2.663-0.854-4.856-2.568-6.567C137.441,0.859,135.254,0,132.587,0H77.769 c-2.663,0-4.856,0.855-6.567,2.568c-1.709,1.715-2.568,3.905-2.568,6.567v392.855H13.816c-4.184,0-7.04,1.902-8.564,5.708 c-1.525,3.621-0.855,6.95,1.997,9.996l91.361,91.365c2.094,1.707,4.281,2.562,6.567,2.562c2.474,0,4.665-0.855,6.567-2.562 l91.076-91.078c1.906-2.279,2.856-4.571,2.856-6.844c0-2.676-0.859-4.859-2.568-6.584 C201.395,402.847,199.208,401.991,196.54,401.991z" }),
					_react2["default"].createElement("path", { d: "M504.604,441.109c-1.715-1.718-3.901-2.573-6.567-2.573H260.497c-2.666,0-4.853,0.855-6.567,2.573 c-1.709,1.711-2.568,3.901-2.568,6.564v54.815c0,2.673,0.855,4.853,2.568,6.571c1.715,1.711,3.901,2.566,6.567,2.566h237.539 c2.666,0,4.853-0.855,6.567-2.566c1.711-1.719,2.566-3.898,2.566-6.571v-54.815C507.173,445.011,506.314,442.82,504.604,441.109z" }),
					_react2["default"].createElement("path", { d: "M260.494,365.445H443.22c2.663,0,4.853-0.855,6.57-2.566c1.708-1.711,2.563-3.901,2.563-6.563v-54.823 c0-2.662-0.855-4.853-2.563-6.563c-1.718-1.711-3.907-2.566-6.57-2.566H260.494c-2.666,0-4.853,0.855-6.567,2.566 c-1.71,1.711-2.568,3.901-2.568,6.563v54.823c0,2.662,0.855,4.853,2.568,6.563C255.641,364.59,257.828,365.445,260.494,365.445z" })
				)
			);
		}
	}]);

	return SortCountAscending;
})(_react2["default"].Component);

SortCountAscending.defaultProps = {};

SortCountAscending.propTypes = {
	title: _react2["default"].PropTypes.string
};

exports["default"] = SortCountAscending;
module.exports = exports["default"];

},{"react":"react"}],41:[function(_dereq_,module,exports){
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

var SortCountDescending = (function (_React$Component) {
	_inherits(SortCountDescending, _React$Component);

	function SortCountDescending() {
		_classCallCheck(this, SortCountDescending);

		_get(Object.getPrototypeOf(SortCountDescending.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(SortCountDescending, [{
		key: "render",
		value: function render() {
			var title = this.props.title != null ? _react2["default"].createElement(
				"title",
				null,
				this.props.title
			) : null;

			return _react2["default"].createElement(
				"svg",
				{ className: "hire-icon sort-count-descending", viewBox: "0 0 511.627 511.627" },
				title,
				_react2["default"].createElement(
					"g",
					null,
					_react2["default"].createElement("rect", { x: "0", y: "0", width: "511.627", height: "511.627", fillOpacity: "0" }),
					_react2["default"].createElement("path", { d: "M333.584,438.536h-73.087c-2.666,0-4.853,0.855-6.567,2.573c-1.709,1.711-2.568,3.901-2.568,6.564v54.815 c0,2.673,0.855,4.853,2.568,6.571c1.715,1.711,3.901,2.566,6.567,2.566h73.087c2.666,0,4.856-0.855,6.563-2.566 c1.718-1.719,2.563-3.898,2.563-6.571v-54.815c0-2.663-0.846-4.854-2.563-6.564C338.44,439.392,336.25,438.536,333.584,438.536z" }),
					_react2["default"].createElement("path", { d: "M196.54,401.991h-54.817V9.136c0-2.663-0.854-4.856-2.568-6.567C137.441,0.859,135.254,0,132.587,0H77.769 c-2.663,0-4.856,0.855-6.567,2.568c-1.709,1.715-2.568,3.905-2.568,6.567v392.855H13.816c-4.184,0-7.04,1.902-8.564,5.708 c-1.525,3.621-0.855,6.95,1.997,9.996l91.361,91.365c2.094,1.707,4.281,2.562,6.567,2.562c2.474,0,4.665-0.855,6.567-2.562 l91.076-91.078c1.906-2.279,2.856-4.571,2.856-6.844c0-2.676-0.859-4.859-2.568-6.584 C201.395,402.847,199.208,401.991,196.54,401.991z" }),
					_react2["default"].createElement("path", { d: "M388.4,292.362H260.494c-2.666,0-4.853,0.855-6.567,2.566c-1.71,1.711-2.568,3.901-2.568,6.563v54.823 c0,2.662,0.855,4.853,2.568,6.563c1.714,1.711,3.901,2.566,6.567,2.566H388.4c2.666,0,4.855-0.855,6.563-2.566 c1.715-1.711,2.573-3.901,2.573-6.563v-54.823c0-2.662-0.858-4.853-2.573-6.563C393.256,293.218,391.066,292.362,388.4,292.362z" }),
					_react2["default"].createElement("path", { d: "M504.604,2.568C502.889,0.859,500.702,0,498.036,0H260.497c-2.666,0-4.853,0.855-6.567,2.568 c-1.709,1.715-2.568,3.905-2.568,6.567v54.818c0,2.666,0.855,4.853,2.568,6.567c1.715,1.709,3.901,2.568,6.567,2.568h237.539 c2.666,0,4.853-0.855,6.567-2.568c1.711-1.714,2.566-3.901,2.566-6.567V9.136C507.173,6.473,506.314,4.279,504.604,2.568z" }),
					_react2["default"].createElement("path", { d: "M443.22,146.181H260.494c-2.666,0-4.853,0.855-6.567,2.57c-1.71,1.713-2.568,3.9-2.568,6.567v54.816 c0,2.667,0.855,4.854,2.568,6.567c1.714,1.711,3.901,2.57,6.567,2.57H443.22c2.663,0,4.853-0.855,6.57-2.57 c1.708-1.713,2.563-3.9,2.563-6.567v-54.816c0-2.667-0.855-4.858-2.563-6.567C448.069,147.04,445.879,146.181,443.22,146.181z" })
				)
			);
		}
	}]);

	return SortCountDescending;
})(_react2["default"].Component);

SortCountDescending.defaultProps = {};

SortCountDescending.propTypes = {
	title: _react2["default"].PropTypes.string
};

exports["default"] = SortCountDescending;
module.exports = exports["default"];

},{"react":"react"}],42:[function(_dereq_,module,exports){
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

var UncheckedIcon = (function (_React$Component) {
	_inherits(UncheckedIcon, _React$Component);

	function UncheckedIcon() {
		_classCallCheck(this, UncheckedIcon);

		_get(Object.getPrototypeOf(UncheckedIcon.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(UncheckedIcon, [{
		key: "render",
		value: function render() {
			var title = this.props.title != null ? _react2["default"].createElement(
				"title",
				null,
				this.props.title
			) : null;

			return _react2["default"].createElement(
				"svg",
				{ className: "hire-icon unchecked", viewBox: "0 0 401.998 401.998" },
				_react2["default"].createElement("path", { d: "M377.87,24.126C361.786,8.042,342.417,0,319.769,0H82.227C59.579,0,40.211,8.042,24.125,24.126 C8.044,40.212,0.002,59.576,0.002,82.228v237.543c0,22.647,8.042,42.014,24.123,58.101c16.086,16.085,35.454,24.127,58.102,24.127 h237.542c22.648,0,42.011-8.042,58.102-24.127c16.085-16.087,24.126-35.453,24.126-58.101V82.228 C401.993,59.58,393.951,40.212,377.87,24.126z M365.448,319.771c0,12.559-4.47,23.314-13.415,32.264 c-8.945,8.945-19.698,13.411-32.265,13.411H82.227c-12.563,0-23.317-4.466-32.264-13.411c-8.945-8.949-13.418-19.705-13.418-32.264 V82.228c0-12.562,4.473-23.316,13.418-32.264c8.947-8.946,19.701-13.418,32.264-13.418h237.542 c12.566,0,23.319,4.473,32.265,13.418c8.945,8.947,13.415,19.701,13.415,32.264V319.771L365.448,319.771z" })
			);
		}
	}]);

	return UncheckedIcon;
})(_react2["default"].Component);

UncheckedIcon.defaultProps = {};

UncheckedIcon.propTypes = {
	title: _react2["default"].PropTypes.string
};

exports["default"] = UncheckedIcon;
module.exports = exports["default"];

},{"react":"react"}],43:[function(_dereq_,module,exports){
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

var _classnames = _dereq_("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _sortMenu = _dereq_("../sort-menu");

var _sortMenu2 = _interopRequireDefault(_sortMenu);

var _filterMenu = _dereq_("../filter-menu");

var _filterMenu2 = _interopRequireDefault(_filterMenu);

var _listItem = _dereq_("./list-item");

var _listItem2 = _interopRequireDefault(_listItem);

var _insertCss = _dereq_("insert-css");

var _insertCss2 = _interopRequireDefault(_insertCss);



var css = Buffer("bGkuaGlyZS1saXN0LWZhY2V0IHsKCWJhY2tncm91bmQtY29sb3I6IHdoaXRlOwoJbWFyZ2luLXRvcDogMjBweDsKCXBhZGRpbmc6IDIwcHggMjBweCAyMHB4IDIwcHg7Cn0KCmxpLmhpcmUtbGlzdC1mYWNldC5zaG93LWFsbCB7CglwYWRkaW5nOiAyMHB4IDAgMCAyMHB4Owp9CgpsaS5oaXJlLWxpc3QtZmFjZXQuc2hvdy1hbGwgPiBoZWFkZXIgewoJcGFkZGluZy1yaWdodDogMjBweDsKfQoKbGkuaGlyZS1saXN0LWZhY2V0ID4gaGVhZGVyID4gaDMsCmxpLmhpcmUtbGlzdC1mYWNldCA+IGhlYWRlciA+IC5oaXJlLWZhY2V0ZWQtc2VhcmNoLWZpbHRlci1tZW51IHsKCWRpc3BsYXk6IGlubGluZS1ibG9jazsKCXZlcnRpY2FsLWFsaWduOiB0b3A7Cglib3gtc2l6aW5nOiBib3JkZXItYm94Owp9CgpsaS5oaXJlLWxpc3QtZmFjZXQgPiBoZWFkZXIgPiBoMyB7CgltYXJnaW46IDAgMCAxMnB4IDA7CglwYWRkaW5nOiAwOwoJd2lkdGg6IDYwJTsKfQpsaS5oaXJlLWxpc3QtZmFjZXQgPiBoZWFkZXIgPiAuaGlyZS1mYWNldGVkLXNlYXJjaC1maWx0ZXItbWVudSB7Cgl3aWR0aDogNDAlOwp9CgpsaS5oaXJlLWxpc3QtZmFjZXQgPiB1bCB7CgltYXgtaGVpZ2h0OiAyNjRweDsKfQoKbGkuaGlyZS1saXN0LWZhY2V0LnNob3ctYWxsID4gdWwgewoJLypoZWlnaHQ6IGF1dG87Ki8KCW1heC1oZWlnaHQ6IDMxNnB4OyAvKiAyNjRweCAodWwuaGVpZ2h0KSArIDE2cHggKGJ1dHRvbi5saW5lSGVpZ2h0KSArIDE2cHggKGJ1dHRvbi5wYWRkaW5nVG9wICsgMjBweCAoLmhpcmUtbGlzdC1mYWNldC5wYWRkaW5nQm90dG9tKSAqLwoJb3ZlcmZsb3cteTogc2Nyb2xsOwp9CgpsaS5oaXJlLWxpc3QtZmFjZXQgPiBidXR0b24gewoJYmFja2dyb3VuZDogbm9uZTsKCWJvcmRlcjogbm9uZTsKCWNvbG9yOiAjQUFBOwoJY3Vyc29yOiBwb2ludGVyOwoJZm9udC1zaXplOiAwLjhlbTsKCWZvbnQtc3R5bGU6IGl0YWxpYzsKCWxpbmUtaGVpZ2h0OiAxNnB4OwoJbWFyZ2luOiAwOwoJb3V0bGluZTogbm9uZTsKCXBhZGRpbmc6IDE2cHggMCAwIDA7Cn0KCmxpLmhpcmUtbGlzdC1mYWNldCA+IHVsID4gbGkuaGlyZS1saXN0LWZhY2V0LWxpc3QtaXRlbSB7CgljdXJzb3I6IHBvaW50ZXI7Cglwb3NpdGlvbjogcmVsYXRpdmU7Cn0KCmxpLmhpcmUtbGlzdC1mYWNldCA+IHVsID4gbGkubm8tb3B0aW9ucy1mb3VuZCB7Cgljb2xvcjogI0FBQTsKCWZvbnQtc2l6ZTogMC44ZW07Cglmb250LXN0eWxlOiBpdGFsaWM7CgltYXJnaW46IDIwcHggMDsKfQoKbGkuaGlyZS1saXN0LWZhY2V0ID4gdWwgPiBsaS5oaXJlLWxpc3QtZmFjZXQtbGlzdC1pdGVtID4gc3ZnLApsaS5oaXJlLWxpc3QtZmFjZXQgPiB1bCA+IGxpLmhpcmUtbGlzdC1mYWNldC1saXN0LWl0ZW0gPiBsYWJlbCwKbGkuaGlyZS1saXN0LWZhY2V0ID4gdWwgPiBsaS5oaXJlLWxpc3QtZmFjZXQtbGlzdC1pdGVtID4gc3Bhbi5jb3VudCB7Cglib3gtc2l6aW5nOiBib3JkZXItYm94OwoJZGlzcGxheTogaW5saW5lLWJsb2NrOwoJdmVydGljYWwtYWxpZ246IHRvcDsKfQoKbGkuaGlyZS1saXN0LWZhY2V0ID4gdWwgPiBsaS5oaXJlLWxpc3QtZmFjZXQtbGlzdC1pdGVtIHN2Zy51bmNoZWNrZWQsCmxpLmhpcmUtbGlzdC1mYWNldCA+IHVsID4gbGkuaGlyZS1saXN0LWZhY2V0LWxpc3QtaXRlbSBzdmcuY2hlY2tlZCB7CgloZWlnaHQ6IDEycHg7CglmaWxsOiAjQUFBOwoJbWFyZ2luLXRvcDogNXB4OwoJd2lkdGg6IDEycHg7Cn0KCmxpLmhpcmUtbGlzdC1mYWNldCA+IHVsID4gbGkuaGlyZS1saXN0LWZhY2V0LWxpc3QtaXRlbSBsYWJlbCB7CgljdXJzb3I6IHBvaW50ZXI7CglvdmVyZmxvdy14OiBoaWRkZW47CglwYWRkaW5nOiAwIDRweDsKCXRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzOwoJd2hpdGUtc3BhY2U6IG5vd3JhcDsKCXdpZHRoOiBjYWxjKDEwMCUgLSA0NHB4KTsKfQoKbGkuaGlyZS1saXN0LWZhY2V0ID4gdWwgPiBsaS5oaXJlLWxpc3QtZmFjZXQtbGlzdC1pdGVtID4gc3Bhbi5jb3VudCB7Cgl0ZXh0LWFsaWduOiByaWdodDsKCXdpZHRoOiAzMnB4Owp9CgoKLyoJCQlsaQoJCQkJcG9zaXRpb24gcmVsYXRpdmUKCQkJCWN1cnNvciBwb2ludGVyCgoJCQkJJjpob3ZlcgoJCQkJCWJhY2tncm91bmQtY29sb3Igd3dZZWxsb3cKCgkJCQlsYWJlbAoJCQkJCWN1cnNvciBwb2ludGVyCgkJCQkJbWF4LXdpZHRoIGNhbGMoMTAwJSAtIDZweCkKCgkJCQlzcGFuLmNvdW50CgkJCQkJcG9zaXRpb24gYWJzb2x1dGUKCQkJCQlyaWdodCA2cHgqLw==","base64");
(0, _insertCss2["default"])(css, { prepend: true });

var INIT_SIZE = 12;

var ListFacet = (function (_React$Component) {
	_inherits(ListFacet, _React$Component);

	function ListFacet(props) {
		_classCallCheck(this, ListFacet);

		_get(Object.getPrototypeOf(ListFacet.prototype), "constructor", this).call(this, props);

		this.state = {
			currentSort: _sortMenu2["default"].defaultSort,
			filterQuery: "",
			showAll: false
		};
	}

	_createClass(ListFacet, [{
		key: "handleButtonClick",
		value: function handleButtonClick() {
			this.setState({
				showAll: true
			});
		}
	}, {
		key: "handleSortMenuChange",
		value: function handleSortMenuChange(funcName) {
			this.setState({
				currentSort: funcName
			});
		}
	}, {
		key: "handleFilterMenuChange",
		value: function handleFilterMenuChange(filterQuery) {
			this.setState({
				filterQuery: filterQuery
			});
		}
	}, {
		key: "selectedValues",
		value: function selectedValues() {
			var _this = this;

			var selectedValues = this.props.queries.last.facetValues.filter(function (values) {
				return values.name === _this.props.data.name;
			});

			return selectedValues.length ? selectedValues[0].values : selectedValues;
		}
	}, {
		key: "render",
		value: function render() {
			var _this2 = this;

			var filterMenu = undefined,
			    sortMenu = undefined;
			var options = this.props.data.options;

			options = options.sort(_sortMenu2["default"].sortFunctions[this.state.currentSort]);

			if (this.props.showSortMenu) {
				sortMenu = _react2["default"].createElement(_sortMenu2["default"], { onChange: this.handleSortMenuChange.bind(this) });
			}

			if (this.props.showFilterMenu) {
				filterMenu = _react2["default"].createElement(_filterMenu2["default"], { onChange: this.handleFilterMenuChange.bind(this) });

				if (this.state.filterQuery.length) {
					(function () {
						var query = _this2.state.filterQuery.toLowerCase();

						options = options.filter(function (option) {
							return option.name.toLowerCase().indexOf(query) > -1;
						});
					})();
				}
			}

			var optionsToRender = this.state.showAll ? options : options.slice(0, INIT_SIZE - 1);

			var selectedValues = this.selectedValues();
			var listItems = optionsToRender.map(function (option, index) {
				return _react2["default"].createElement(_listItem2["default"], {
					checked: selectedValues.indexOf(option.name) > -1,
					count: option.count,
					facetName: _this2.props.data.name,
					key: index,
					name: option.name,
					onSelectFacetValue: _this2.props.onSelectFacetValue });
			});

			if (!listItems.length) {
				listItems = _react2["default"].createElement(
					"li",
					{ className: "no-options-found" },
					"No options found."
				);
			}

			var title = this.props.data.name;
			var facetTitle = this.props.labels.facetTitles.hasOwnProperty(title) ? this.props.labels.facetTitles[title] : title;

			var moreButton = !this.state.showAll && options.length > INIT_SIZE ? _react2["default"].createElement(
				"button",
				{ onClick: this.handleButtonClick.bind(this) },
				this.props.labels.showAll,
				" (",
				options.length,
				")"
			) : null;

			return _react2["default"].createElement(
				"li",
				{
					className: (0, _classnames2["default"])("hire-facet", "hire-list-facet", { "show-all": this.state.showAll }) },
				_react2["default"].createElement(
					"header",
					null,
					_react2["default"].createElement(
						"h3",
						null,
						facetTitle
					),
					filterMenu,
					sortMenu
				),
				_react2["default"].createElement(
					"ul",
					null,
					listItems
				),
				moreButton
			);
		}
	}]);

	return ListFacet;
})(_react2["default"].Component);

ListFacet.defaultProps = {
	showFilterMenu: true,
	showSortMenu: false
};

ListFacet.propTypes = {
	data: _react2["default"].PropTypes.object,
	labels: _react2["default"].PropTypes.object,
	onSelectFacetValue: _react2["default"].PropTypes.func,
	queries: _react2["default"].PropTypes.object,
	showFilterMenu: _react2["default"].PropTypes.bool,
	showSortMenu: _react2["default"].PropTypes.bool
};

exports["default"] = ListFacet;
module.exports = exports["default"];

},{"../filter-menu":33,"../sort-menu":50,"./list-item":44,"classnames":"classnames","insert-css":2,"react":"react"}],44:[function(_dereq_,module,exports){
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

var _iconsChecked = _dereq_("../icons/checked");

var _iconsChecked2 = _interopRequireDefault(_iconsChecked);

var _iconsUnchecked = _dereq_("../icons/unchecked");

var _iconsUnchecked2 = _interopRequireDefault(_iconsUnchecked);

var ListFacetListItem = (function (_React$Component) {
	_inherits(ListFacetListItem, _React$Component);

	function ListFacetListItem(props) {
		_classCallCheck(this, ListFacetListItem);

		_get(Object.getPrototypeOf(ListFacetListItem.prototype), "constructor", this).call(this, props);

		this.state = {
			checked: false
		};
	}

	_createClass(ListFacetListItem, [{
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(nextProps) {
			this.setState({
				checked: nextProps.checked
			});
		}
	}, {
		key: "handleClick",
		value: function handleClick() {
			this.props.onSelectFacetValue(this.props.facetName, this.props.name, this.props.checked);

			this.setState({
				checked: !this.state.checked
			});
		}
	}, {
		key: "render",
		value: function render() {
			var icon = this.state.checked ? _react2["default"].createElement(_iconsChecked2["default"], null) : _react2["default"].createElement(_iconsUnchecked2["default"], null);

			return _react2["default"].createElement(
				"li",
				{
					className: "hire-list-facet-list-item",
					onClick: this.handleClick.bind(this) },
				icon,
				_react2["default"].createElement(
					"label",
					{ title: this.props.name },
					this.props.name
				),
				_react2["default"].createElement(
					"span",
					{ className: "count" },
					this.props.count
				)
			);
		}
	}]);

	return ListFacetListItem;
})(_react2["default"].Component);

ListFacetListItem.defaultProps = {
	count: 0,
	checked: false,
	facetName: "",
	name: ""
};

ListFacetListItem.propTypes = {
	checked: _react2["default"].PropTypes.bool,
	count: _react2["default"].PropTypes.number,
	facetName: _react2["default"].PropTypes.string,
	name: _react2["default"].PropTypes.string,
	onSelectFacetValue: _react2["default"].PropTypes.func
};

exports["default"] = ListFacetListItem;
module.exports = exports["default"];

},{"../icons/checked":34,"../icons/unchecked":42,"react":"react"}],45:[function(_dereq_,module,exports){
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

var FacetValue = (function (_React$Component) {
	_inherits(FacetValue, _React$Component);

	function FacetValue() {
		_classCallCheck(this, FacetValue);

		_get(Object.getPrototypeOf(FacetValue.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(FacetValue, [{
		key: "render",
		value: function render() {
			return _react2["default"].createElement(
				"li",
				{
					className: "hire-faceted-search-selected-facet-value",
					onClick: this.props.onSelectFacetValue.bind(this, this.props.facetName, this.props.value, true) },
				this.props.value
			);
		}
	}]);

	return FacetValue;
})(_react2["default"].Component);

FacetValue.propTypes = {
	facetName: _react2["default"].PropTypes.string,
	onSelectFacetValue: _react2["default"].PropTypes.func,
	value: _react2["default"].PropTypes.string
};

exports["default"] = FacetValue;
module.exports = exports["default"];

},{"react":"react"}],46:[function(_dereq_,module,exports){
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

var _facetValue = _dereq_("./facet-value");

var _facetValue2 = _interopRequireDefault(_facetValue);

var _insertCss = _dereq_("insert-css");

var _insertCss2 = _interopRequireDefault(_insertCss);



var css = Buffer("dWwuaGlyZS1mYWNldGVkLXNlYXJjaC1jdXJyZW50LXF1ZXJ5IHsKCWNvbG9yOiAjODg4OwoJZm9udC1zaXplOiAwLjdlbTsKfQoKdWwuaGlyZS1mYWNldGVkLXNlYXJjaC1jdXJyZW50LXF1ZXJ5ID4gbGkgPiBsYWJlbCwKdWwuaGlyZS1mYWNldGVkLXNlYXJjaC1jdXJyZW50LXF1ZXJ5ID4gbGkgPiBzcGFuLAp1bC5oaXJlLWZhY2V0ZWQtc2VhcmNoLWN1cnJlbnQtcXVlcnkgPiBsaSA+IHVsIHsKCWJveC1zaXppbmc6IGJvcmRlci1ib3g7CglkaXNwbGF5OiBpbmxpbmUtYmxvY2s7Cgl2ZXJ0aWNhbC1hbGlnbjogdG9wOwp9Cgp1bC5oaXJlLWZhY2V0ZWQtc2VhcmNoLWN1cnJlbnQtcXVlcnkgPiBsaSA+IGxhYmVsIHsKCXdpZHRoOiAxNTBweDsKfQoKdWwuaGlyZS1mYWNldGVkLXNlYXJjaC1jdXJyZW50LXF1ZXJ5ID4gbGkgPiB1bCB7Cgl3aWR0aDogY2FsYygxMDAlIC0gMTUwcHgpOwp9Cgp1bC5oaXJlLWZhY2V0ZWQtc2VhcmNoLWN1cnJlbnQtcXVlcnkgbGkuaGlyZS1mYWNldGVkLXNlYXJjaC1zZWxlY3RlZC1mYWNldC12YWx1ZSwKdWwuaGlyZS1mYWNldGVkLXNlYXJjaC1jdXJyZW50LXF1ZXJ5IGxpLnNlYXJjaC10ZXJtIHNwYW4gewoJYmFja2dyb3VuZC1jb2xvcjogI0RERDsKCWJvcmRlci1yYWRpdXM6IDRweDsKCWN1cnNvcjogcG9pbnRlcjsKCWRpc3BsYXk6IGlubGluZS1ibG9jazsKCW1hcmdpbjogMCA0cHggNHB4IDA7CglwYWRkaW5nOiAwIDZweDsKfQoKdWwuaGlyZS1mYWNldGVkLXNlYXJjaC1jdXJyZW50LXF1ZXJ5IGxpLmhpcmUtZmFjZXRlZC1zZWFyY2gtc2VsZWN0ZWQtZmFjZXQtdmFsdWU6YWZ0ZXIsCnVsLmhpcmUtZmFjZXRlZC1zZWFyY2gtY3VycmVudC1xdWVyeSBsaS5zZWFyY2gtdGVybSBzcGFuOmFmdGVyIHsKCWNvbnRlbnQ6ICLinJYiOwoJcGFkZGluZy1sZWZ0OiA4cHg7Cn0=","base64");
(0, _insertCss2["default"])(css, { prepend: true });

var CurrentQuery = (function (_React$Component) {
	_inherits(CurrentQuery, _React$Component);

	function CurrentQuery() {
		_classCallCheck(this, CurrentQuery);

		_get(Object.getPrototypeOf(CurrentQuery.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(CurrentQuery, [{
		key: "toLabel",
		value: function toLabel(name) {
			return this.props.labels.facetTitles.hasOwnProperty(name) ? this.props.labels.facetTitles[name] : name;
		}
	}, {
		key: "render",
		value: function render() {
			var _this = this;

			var query = this.props.queries.last;

			var searchTerm = query.term !== "" ? _react2["default"].createElement(
				"li",
				{ className: "search-term" },
				_react2["default"].createElement(
					"label",
					null,
					"Search term"
				),
				_react2["default"].createElement(
					"span",
					{ onClick: this.props.onChangeSearchTerm.bind(this, "") },
					query.term
				)
			) : null;

			var facets = query.facetValues.map(function (selectedFacet, index) {
				var facetTitle = undefined;
				var filteredFacets = _this.props.results.last.facets.filter(function (facet) {
					return facet.name === selectedFacet.name;
				});

				if (filteredFacets.length) {
					facetTitle = filteredFacets[0].title;
				} else {
					return new Error("CurrentQuery: facet not found!");
				}

				var facetValues = selectedFacet.values.map(function (value, index2) {
					return _react2["default"].createElement(_facetValue2["default"], {
						facetName: selectedFacet.name,
						key: index2,
						onSelectFacetValue: _this.props.onSelectFacetValue,
						value: value });
				});

				return _react2["default"].createElement(
					"li",
					{
						className: "hire-faceted-search-selected-facet",
						key: index },
					_react2["default"].createElement(
						"label",
						null,
						_this.toLabel(facetTitle)
					),
					_react2["default"].createElement(
						"ul",
						null,
						facetValues
					)
				);
			});

			return _react2["default"].createElement(
				"ul",
				{ className: "hire-faceted-search-current-query" },
				searchTerm,
				facets
			);
		}
	}]);

	return CurrentQuery;
})(_react2["default"].Component);

CurrentQuery.propTypes = {
	labels: _react2["default"].PropTypes.object,
	onChangeSearchTerm: _react2["default"].PropTypes.func,
	onSelectFacetValue: _react2["default"].PropTypes.func,
	queries: _react2["default"].PropTypes.object,
	results: _react2["default"].PropTypes.object
};

exports["default"] = CurrentQuery;
module.exports = exports["default"];

},{"./facet-value":45,"insert-css":2,"react":"react"}],47:[function(_dereq_,module,exports){
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

var _lodashDebounce = _dereq_("lodash.debounce");

var _lodashDebounce2 = _interopRequireDefault(_lodashDebounce);

var _lodashIsequal = _dereq_("lodash.isequal");

var _lodashIsequal2 = _interopRequireDefault(_lodashIsequal);

var _result = _dereq_("./result");

var _result2 = _interopRequireDefault(_result);

var _sortMenu = _dereq_("./sort-menu");

var _sortMenu2 = _interopRequireDefault(_sortMenu);

var _currentQuery = _dereq_("./current-query");

var _currentQuery2 = _interopRequireDefault(_currentQuery);

var _iconsLoaderThreeDots = _dereq_("../icons/loader-three-dots");

var _iconsLoaderThreeDots2 = _interopRequireDefault(_iconsLoaderThreeDots);

var _insertCss = _dereq_("insert-css");

var _insertCss2 = _interopRequireDefault(_insertCss);



var css = Buffer("LmhpcmUtZmFjZXRlZC1zZWFyY2gtcmVzdWx0cyA+IGhlYWRlciB7Cglib3JkZXItYm90dG9tOiAxcHggc29saWQgI0FBQTsKfQoKLmhpcmUtZmFjZXRlZC1zZWFyY2gtcmVzdWx0cyA+IGhlYWRlciA+IGgzLAouaGlyZS1mYWNldGVkLXNlYXJjaC1yZXN1bHRzID4gaGVhZGVyID4gLmhpcmUtZmFjZXRlZC1zZWFyY2gtcmVzdWx0cy1zb3J0LW1lbnUgewoJYm94LXNpemluZzogYm9yZGVyLWJveDsKCWRpc3BsYXk6IGlubGluZS1ibG9jazsKCXZlcnRpY2FsLWFsaWduOiB0b3A7Cn0KCi5oaXJlLWZhY2V0ZWQtc2VhcmNoLXJlc3VsdHMgPiBoZWFkZXIgPiBoMyB7CgltYXJnaW4tdG9wOiAwOwp9CgouaGlyZS1mYWNldGVkLXNlYXJjaC1yZXN1bHRzID4gaGVhZGVyID4gaDMgewoJd2lkdGg6IDYwJTsKfQoKLmhpcmUtZmFjZXRlZC1zZWFyY2gtcmVzdWx0cyA+IGhlYWRlciA+IC5oaXJlLWZhY2V0ZWQtc2VhcmNoLXJlc3VsdHMtc29ydC1tZW51IHsKCXRleHQtYWxpZ246IHJpZ2h0OwoJd2lkdGg6IDQwJTsKfQoKCi5oaXJlLWZhY2V0ZWQtc2VhcmNoLXJlc3VsdHMgPiB1bC5oaXJlLWZhY2V0ZWQtc2VhcmNoLXJlc3VsdC1saXN0IHsKCXBhZGRpbmctdG9wOiAyMHB4Owp9CgouaGlyZS1mYWNldGVkLXNlYXJjaC1yZXN1bHRzID4gdWwgPiBsaSB7CgljdXJzb3I6IHBvaW50ZXI7CgltYXJnaW4tYm90dG9tOiAyMHB4Owp9CgouaGlyZS1mYWNldGVkLXNlYXJjaC1yZXN1bHRzID4gdWwgPiBsaSA+IGxhYmVsIHsKCWN1cnNvcjogcG9pbnRlcjsKCWZvbnQtc2l6ZTogMS4xZW07Cn0KCi5oaXJlLWZhY2V0ZWQtc2VhcmNoLXJlc3VsdHMgPiB1bCA+IGxpID4gdWwubWV0YWRhdGEgewoJY29sb3I6ICM4ODg7Cglmb250LXNpemU6IDAuN2VtOwp9CgouaGlyZS1mYWNldGVkLXNlYXJjaC1yZXN1bHRzID4gdWwgPiBsaSA+IHVsLm1ldGFkYXRhID4gbGkgPiBsYWJlbCB7Cglib3gtc2l6aW5nOiBib3JkZXItYm94OwoJZGlzcGxheTogaW5saW5lLWJsb2NrOwoJdmVydGljYWwtYWxpZ246IHRvcDsKCXdpZHRoOiAxNTBweDsKfQoKLmhpcmUtZmFjZXRlZC1zZWFyY2gtcmVzdWx0cyBzdmcubG9hZGVyIHsKCXBhZGRpbmc6IDYwcHggMCA0MHB4IDA7Cgl3aWR0aDogMTAwJQp9","base64");
(0, _insertCss2["default"])(css, { prepend: true });

var inViewport = function inViewport(el) {
	var rect = el.getBoundingClientRect();

	return rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
};

var Results = (function (_React$Component) {
	_inherits(Results, _React$Component);

	function Results(props) {
		_classCallCheck(this, Results);

		_get(Object.getPrototypeOf(Results.prototype), "constructor", this).call(this, props);

		this.onScroll = (0, _lodashDebounce2["default"])(this.onScroll, 300).bind(this);
	}

	_createClass(Results, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			window.addEventListener("scroll", this.onScroll);
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			window.removeEventListener("scroll", this.onScroll);
		}
	}, {
		key: "onScroll",
		value: function onScroll() {
			var nth = this.props.results.last.results.length - parseInt(Math.floor(this.props.config.rows / 2)) + 1;
			var listItem = _react2["default"].findDOMNode(this).querySelector(".hire-faceted-search-result-list > li:nth-child(" + nth + ")");
			if (this.props.results.last.hasOwnProperty("_next") && inViewport(listItem)) {
				var url = this.props.results.last._next;
				this.props.onFetchNextResults(url);
			}
		}
	}, {
		key: "dataToComponents",
		value: function dataToComponents(results) {
			var _this = this;

			return results.map(function (data, index) {
				return _react2["default"].createElement(_result2["default"], {
					data: data,
					key: index + Math.random(),
					labels: _this.props.labels,
					metadataList: _this.props.metadataList,
					onSelect: _this.props.onSelect });
			});
		}
	}, {
		key: "render",
		value: function render() {
			var loader = this.props.results.requesting ? _react2["default"].createElement(_iconsLoaderThreeDots2["default"], { className: "loader" }) : null;

			return _react2["default"].createElement(
				"div",
				{ className: "hire-faceted-search-results" },
				_react2["default"].createElement(
					"header",
					null,
					_react2["default"].createElement(
						"h3",
						null,
						this.props.results.last.numFound,
						" ",
						this.props.labels.resultsFound
					),
					_react2["default"].createElement(_sortMenu2["default"], {
						labels: this.props.labels,
						onSetSort: this.props.onSetSort,
						values: this.props.queries.last.sortParameters }),
					_react2["default"].createElement(_currentQuery2["default"], {
						labels: this.props.labels,
						onChangeSearchTerm: this.props.onChangeSearchTerm,
						onSelectFacetValue: this.props.onSelectFacetValue,
						queries: this.props.queries,
						results: this.props.results })
				),
				_react2["default"].createElement(
					"ul",
					{ className: "hire-faceted-search-result-list" },
					this.dataToComponents(this.props.results.last.refs) /** API V2.x uses refs as result key, back to results in API 3 */
				),
				loader
			);
		}
	}]);

	return Results;
})(_react2["default"].Component);

Results.propTypes = {
	config: _react2["default"].PropTypes.object,
	labels: _react2["default"].PropTypes.object,
	metadataList: _react2["default"].PropTypes.array,
	onChangeSearchTerm: _react2["default"].PropTypes.func,
	onFetchNextResults: _react2["default"].PropTypes.func,
	onSelect: _react2["default"].PropTypes.func,
	onSelectFacetValue: _react2["default"].PropTypes.func,
	onSetSort: _react2["default"].PropTypes.func,
	queries: _react2["default"].PropTypes.object,
	results: _react2["default"].PropTypes.object
};

exports["default"] = Results;
module.exports = exports["default"];

},{"../icons/loader-three-dots":36,"./current-query":46,"./result":48,"./sort-menu":49,"insert-css":2,"lodash.debounce":3,"lodash.isequal":5,"react":"react"}],48:[function(_dereq_,module,exports){
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

var Result = (function (_React$Component) {
	_inherits(Result, _React$Component);

	function Result() {
		_classCallCheck(this, Result);

		_get(Object.getPrototypeOf(Result.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(Result, [{
		key: "toLabel",
		value: function toLabel(name) {
			return this.props.labels.facetTitles.hasOwnProperty(name) ? this.props.labels.facetTitles[name] : name;
		}
	}, {
		key: "render",
		value: function render() {
			var _this = this;

			var model = this.props.data;
			var metadataList = this.props.metadataList;
			if (metadataList.length === 0) {
				metadataList = Object.keys(this.props.data.data);
			}
			var metadata = Object.keys(this.props.data.data).filter(function (key) {
				return _this.props.data.data[key] !== "" && metadataList.indexOf(key) > -1;
			}).sort(function (a, b) {
				return metadataList.indexOf(a) > metadataList.indexOf(b);
			}).map(function (key, index) {
				return _react2["default"].createElement(
					"li",
					{ key: index },
					_react2["default"].createElement(
						"label",
						null,
						_this.toLabel(key)
					),
					_react2["default"].createElement(
						"span",
						null,
						_this.props.data.data[key]
					)
				);
			});

			metadata = metadata.length ? _react2["default"].createElement(
				"ul",
				{ className: "metadata" },
				metadata
			) : null;

			return _react2["default"].createElement(
				"li",
				{ onClick: this.props.onSelect.bind(this, model) },
				_react2["default"].createElement(
					"label",
					null,
					this.props.data.displayName
				),
				metadata
			);
		}
	}]);

	return Result;
})(_react2["default"].Component);

Result.defaultProps = {};

Result.propTypes = {
	data: _react2["default"].PropTypes.object,
	labels: _react2["default"].PropTypes.object,
	metadataList: _react2["default"].PropTypes.array,
	onSelect: _react2["default"].PropTypes.func
};

exports["default"] = Result;
module.exports = exports["default"];

},{"react":"react"}],49:[function(_dereq_,module,exports){
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

var _classnames = _dereq_("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _insertCss = _dereq_("insert-css");

var _insertCss2 = _interopRequireDefault(_insertCss);



var css = Buffer("LmhpcmUtZmFjZXRlZC1zZWFyY2gtcmVzdWx0cy1zb3J0LW1lbnUgewoJZm9udC1zaXplOiAwLjhlbTsKCXBvc2l0aW9uOiByZWxhdGl2ZTsKfQoKLmhpcmUtZmFjZXRlZC1zZWFyY2gtcmVzdWx0cy1zb3J0LW1lbnUgPiBidXR0b24gewoJYmFja2dyb3VuZC1jb2xvcjogI0RERDsKCWJvcmRlcjogMXB4IHNvbGlkICM4ODg7Cglib3gtc2l6aW5nOiBib3JkZXItYm94OwoJY3Vyc29yOiBwb2ludGVyOwoJaGVpZ2h0OiAyMnB4OwoJb3V0bGluZTogbm9uZTsKCXBhZGRpbmc6IDAgNnB4OwoJdmVydGljYWwtYWxpZ246IHRvcDsKfQoKLmhpcmUtZmFjZXRlZC1zZWFyY2gtcmVzdWx0cy1zb3J0LW1lbnUgPiB1bCB7CgliYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTsKCWN1cnNvcjogcG9pbnRlcjsKCWRpc3BsYXk6IG5vbmU7CgltYXgtd2lkdGg6IDE4MHB4OwoJcGFkZGluZzogMCA2cHg7Cglwb3NpdGlvbjogYWJzb2x1dGU7Cgl0ZXh0LWFsaWduOiBsZWZ0OwoJcmlnaHQ6IDA7Cgl3aWR0aDogMTUwJTsKfQoKLmhpcmUtZmFjZXRlZC1zZWFyY2gtcmVzdWx0cy1zb3J0LW1lbnUgPiB1bC52aXNpYmxlIHsKCWRpc3BsYXk6IGJsb2NrOwp9","base64");
(0, _insertCss2["default"])(css, { prepend: true });

var ResultsSortMenu = (function (_React$Component) {
	_inherits(ResultsSortMenu, _React$Component);

	function ResultsSortMenu(props) {
		_classCallCheck(this, ResultsSortMenu);

		_get(Object.getPrototypeOf(ResultsSortMenu.prototype), "constructor", this).call(this, props);

		this.state = {
			optionsVisible: false,
			level: props.values.length ? props.values[0] : null
		};
	}

	_createClass(ResultsSortMenu, [{
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(nextProps) {
			this.setState({
				optionsVisible: false,
				level: nextProps.values.length ? nextProps.values[0] : null
			});
		}
	}, {
		key: "handleButtonClick",
		value: function handleButtonClick() {
			this.setState({
				optionsVisible: !this.state.optionsVisible
			});
		}
	}, {
		key: "handleOptionClick",
		value: function handleOptionClick(level) {
			// queriesActions.setSortParameter(level.fieldname);
			this.props.onSetSort(level.fieldname);

			this.setState({
				optionsVisible: false,
				level: level
			});
		}
	}, {
		key: "toLabel",
		value: function toLabel(name) {
			return this.props.labels.facetTitles.hasOwnProperty(name) ? this.props.labels.facetTitles[name] : name;
		}
	}, {
		key: "render",
		value: function render() {
			var _this = this;

			if (!this.props.values.length) {
				return null;
			}

			var values = this.props.values.map(function (level, index) {
				return _react2["default"].createElement(
					"li",
					{
						key: index,
						onClick: _this.handleOptionClick.bind(_this, level) },
					_this.toLabel(level.fieldname)
				);
			});

			return _react2["default"].createElement(
				"div",
				{ className: "hire-faceted-search-results-sort-menu" },
				_react2["default"].createElement(
					"button",
					{
						onClick: this.handleButtonClick.bind(this) },
					this.props.labels.sortBy,
					": ",
					this.toLabel(this.state.level.fieldname)
				),
				_react2["default"].createElement(
					"ul",
					{
						className: (0, _classnames2["default"])({ visible: this.state.optionsVisible }) },
					values
				)
			);
		}
	}]);

	return ResultsSortMenu;
})(_react2["default"].Component);

ResultsSortMenu.defaultProps = {};

ResultsSortMenu.propTypes = {
	labels: _react2["default"].PropTypes.object,
	onSetSort: _react2["default"].PropTypes.func,
	values: _react2["default"].PropTypes.array
};

exports["default"] = ResultsSortMenu;
module.exports = exports["default"];

},{"classnames":"classnames","insert-css":2,"react":"react"}],50:[function(_dereq_,module,exports){
/* TODO Remove sort menu and move sort options (count/alpha) to facet schema.
	A schema is needed, because different facets, should be able to have different
	options set. */

"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = _dereq_("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = _dereq_("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _iconsSortCountAscending = _dereq_("../icons/sort-count-ascending");

var _iconsSortCountAscending2 = _interopRequireDefault(_iconsSortCountAscending);

var _iconsSortCountDescending = _dereq_("../icons/sort-count-descending");

var _iconsSortCountDescending2 = _interopRequireDefault(_iconsSortCountDescending);

var _iconsSortAlphabeticallyAscending = _dereq_("../icons/sort-alphabetically-ascending");

var _iconsSortAlphabeticallyAscending2 = _interopRequireDefault(_iconsSortAlphabeticallyAscending);

var _iconsSortAlphabeticallyDescending = _dereq_("../icons/sort-alphabetically-descending");

var _iconsSortAlphabeticallyDescending2 = _interopRequireDefault(_iconsSortAlphabeticallyDescending);

var _insertCss = _dereq_("insert-css");

var _insertCss2 = _interopRequireDefault(_insertCss);



var css = Buffer("dWwuaGlyZS1mYWNldGVkLXNlYXJjaC1zb3J0LW1lbnUgewoJbGlzdC1zdHlsZTogbm9uZTsKfQoKdWwuaGlyZS1mYWNldGVkLXNlYXJjaC1zb3J0LW1lbnUgbGkgewoJZGlzcGxheTogaW5saW5lLWJsb2NrOwoJY3Vyc29yOiBwb2ludGVyOwp9Cgp1bC5oaXJlLWZhY2V0ZWQtc2VhcmNoLXNvcnQtbWVudSBsaSBzdmcgewoJZmlsbDogI0FBQTsKfQoKdWwuaGlyZS1mYWNldGVkLXNlYXJjaC1zb3J0LW1lbnUgbGkuYWN0aXZlIHN2ZyB7CglmaWxsOiBibGFjazsKfQoKdWwuaGlyZS1mYWNldGVkLXNlYXJjaC1zb3J0LW1lbnUgbGkgc3ZnLmhpcmUtaWNvbiB7Cgl2ZXJ0aWNhbC1hbGlnbjogdG9wOwoJd2lkdGg6IDE0cHg7CgloZWlnaHQ6IDE0cHg7CgltYXJnaW4tbGVmdDogMnB4Owp9Cgp1bC5oaXJlLWZhY2V0ZWQtc2VhcmNoLXNvcnQtbWVudSBsaSBzdmcuaGlyZS1pY29uLmZpbHRlciB7Cgl3aWR0aDogMTJweDsKCWhlaWdodDogMTJweDsKCW1hcmdpbi10b3A6IDFweDsKfQ==","base64");
(0, _insertCss2["default"])(css, { prepend: true });

var SortMenu = (function (_React$Component) {
	_inherits(SortMenu, _React$Component);

	function SortMenu(props) {
		_classCallCheck(this, SortMenu);

		_get(Object.getPrototypeOf(SortMenu.prototype), "constructor", this).call(this, props);

		this.state = {
			alpha: "asc",
			count: "desc",
			current: "count"
		};
	}

	/*
  * Change the sort based on type (alpha|count) clicked and current state.
  *
  * If the active sort type is clicked, the direction (asc|desc) is changed.
  * If the inactive sort type is clicked, the type (alpha|count) is set to current, the dir (asc|desc) does not change.
  *
  * @param {String} type Type of sorting: "alpha" or "count"
  */

	_createClass(SortMenu, [{
		key: "changeSort",
		value: function changeSort(type) {
			var dir = this.state.current != type ? this.state[type].charAt(0).toUpperCase() + this.state[type].substr(1) : this.state[type] === "asc" ? "Desc" : "Asc";

			this.setState(_defineProperty({
				current: type
			}, type, dir.toLowerCase()));

			this.props.onChange(type + dir);
		}
	}, {
		key: "render",
		value: function render() {
			var alpha = this.state.alpha === "asc" ? _react2["default"].createElement(_iconsSortAlphabeticallyAscending2["default"], null) : _react2["default"].createElement(_iconsSortAlphabeticallyDescending2["default"], null);

			var count = this.state.count === "asc" ? _react2["default"].createElement(_iconsSortCountAscending2["default"], null) : _react2["default"].createElement(_iconsSortCountDescending2["default"], null);

			return _react2["default"].createElement(
				"ul",
				{ className: "hire-faceted-search-sort-menu" },
				_react2["default"].createElement(
					"li",
					{
						className: (0, _classnames2["default"])({
							active: this.state.current === "alpha"
						}),
						onClick: this.changeSort.bind(this, "alpha") },
					alpha
				),
				_react2["default"].createElement(
					"li",
					{
						className: (0, _classnames2["default"])({
							active: this.state.current === "count"
						}),
						onClick: this.changeSort.bind(this, "count") },
					count
				)
			);
		}
	}]);

	return SortMenu;
})(_react2["default"].Component);

SortMenu.sortFunctions = {
	alphaAsc: function alphaAsc(valA, valB) {
		if (valA.name > valB.name) return 1;
		if (valB.name > valA.name) return -1;
		return 0;
	},
	alphaDesc: function alphaDesc(valA, valB) {
		if (valA.name > valB.name) return -1;
		if (valB.name > valA.name) return 1;
		return 0;
	},
	countAsc: function countAsc(valA, valB) {
		if (valA.count > valB.count) return 1;
		if (valB.count > valA.count) return -1;
		return 0;
	},
	countDesc: function countDesc(valA, valB) {
		if (valA.count > valB.count) return -1;
		if (valB.count > valA.count) return 1;
		return 0;
	}
};

SortMenu.defaultSort = "alphaAsc";

SortMenu.defaultProps = {};

SortMenu.propTypes = {
	onChange: _react2["default"].PropTypes.func.isRequired
};

exports["default"] = SortMenu;
module.exports = exports["default"];

},{"../icons/sort-alphabetically-ascending":38,"../icons/sort-alphabetically-descending":39,"../icons/sort-count-ascending":40,"../icons/sort-count-descending":41,"classnames":"classnames","insert-css":2,"react":"react"}],51:[function(_dereq_,module,exports){
// TODO add searching class to .search-icon when async query is busy

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

var _classnames = _dereq_("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _iconsSearch = _dereq_("../icons/search");

var _iconsSearch2 = _interopRequireDefault(_iconsSearch);

var _insertCss = _dereq_("insert-css");

var _insertCss2 = _interopRequireDefault(_insertCss);



var css = Buffer("QC1tb3ota2V5ZnJhbWVzIHNwaW4gewoJMCUgewoJCS1tb3otdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7Cgl9CgkxMDAlIHsKCQktbW96LXRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7Cgl9Cn0KQC13ZWJraXQta2V5ZnJhbWVzIHNwaW4gewoJMCUgewoJCS13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7Cgl9CgkxMDAlIHsKCQktd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7Cgl9Cn0KQGtleWZyYW1lcyBzcGluIHsKCTAlIHsKCQl0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTsKCX0KCTEwMCUgewoJCXRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7Cgl9Cn0KCmxpLmhpcmUtZmFjZXRlZC1zZWFyY2gtdGV4dC1zZWFyY2ggewoJaGVpZ2h0OiA0MHB4OwoJYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7Cn0KCmxpLmhpcmUtZmFjZXRlZC1zZWFyY2gtdGV4dC1zZWFyY2ggaW5wdXQsCmxpLmhpcmUtZmFjZXRlZC1zZWFyY2gtdGV4dC1zZWFyY2ggLnNlYXJjaC1pY29uIHsKCWRpc3BsYXk6IGlubGluZS1ibG9jazsKCWJveC1zaXppbmc6IGJvcmRlci1ib3g7Cgl2ZXJ0aWNhbC1hbGlnbjogdG9wOwp9CgpsaS5oaXJlLWZhY2V0ZWQtc2VhcmNoLXRleHQtc2VhcmNoIGlucHV0IHsKCWJvcmRlcjogbm9uZTsKCWZvbnQtc2l6ZTogMWVtOwoJb3V0bGluZTogbm9uZTsKCXBhZGRpbmctbGVmdDogMjBweDsKCXdpZHRoOiA5MCU7CgloZWlnaHQ6IDEwMCU7Cn0KCmxpLmhpcmUtZmFjZXRlZC1zZWFyY2gtdGV4dC1zZWFyY2ggLnNlYXJjaC1pY29uIHsKCWZpbGw6ICNEREQ7CgloZWlnaHQ6IDEwMCU7Cgl3aWR0aDogMTAlOwoJdHJhbnNpdGlvbjogZmlsbCA0MDBtczsKfQoKbGkuaGlyZS1mYWNldGVkLXNlYXJjaC10ZXh0LXNlYXJjaCAuc2VhcmNoLWljb24uYWN0aXZlIHsKCWN1cnNvcjogcG9pbnRlcjsKCWZpbGw6ICM4ODg7Cn0KCmxpLmhpcmUtZmFjZXRlZC1zZWFyY2gtdGV4dC1zZWFyY2ggLnNlYXJjaC1pY29uLnNlYXJjaGluZyBzdmcgewoJLW1vei1hbmltYXRpb246IHNwaW4gMS4ycyBlYXNlIGluZmluaXRlOwoJLXdlYmtpdC1hbmltYXRpb246IHNwaW4gMS4ycyBlYXNlIGluZmluaXRlOwoJYW5pbWF0aW9uOiBzcGluIDEuMnMgZWFzZSBpbmZpbml0ZTsKfQoKLyogVXNlcnMgd2l0aCBJRSA8IDExIHdpbGwgc2VlIHRoZSBzZWFyY2ggaWNvbiBhbGlnbmVkIG9uIHRvcC4gKi8KbGkuaGlyZS1mYWNldGVkLXNlYXJjaC10ZXh0LXNlYXJjaCAuc2VhcmNoLWljb24gLmNlbnRlci12ZXJ0aWNhbCB7CgloZWlnaHQ6IDEwMCU7CglkaXNwbGF5OiBmbGV4OwoJZGlzcGxheTogLXdlYmtpdC1mbGV4OwoJYWxpZ24taXRlbXM6IGNlbnRlcjsKCS13ZWJraXQtYWxpZ24taXRlbXM6IGNlbnRlcjsKfQoKbGkuaGlyZS1mYWNldGVkLXNlYXJjaC10ZXh0LXNlYXJjaCAuc2VhcmNoLWljb24gLmNlbnRlci12ZXJ0aWNhbCBzdmcgewoJd2lkdGg6IDcwJTsKCWhlaWdodDogNzAlOwp9","base64");
(0, _insertCss2["default"])(css, { prepend: true });

var TextSearch = (function (_React$Component) {
	_inherits(TextSearch, _React$Component);

	function TextSearch(props) {
		_classCallCheck(this, TextSearch);

		_get(Object.getPrototypeOf(TextSearch.prototype), "constructor", this).call(this, props);

		this.state = {
			value: "",
			searching: false
		};
	}

	_createClass(TextSearch, [{
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(nextProps) {
			this.setState({
				searching: false,
				value: nextProps.value
			});
		}
	}, {
		key: "handleInputChange",
		value: function handleInputChange(ev) {
			this.setState({
				value: ev.target.value
			});
		}
	}, {
		key: "handleInputKeyDown",
		value: function handleInputKeyDown(ev) {
			if (ev.keyCode === 13) {
				this.handleSubmit();
			}
		}
	}, {
		key: "handleSubmit",
		value: function handleSubmit() {
			this.setState({
				searching: true
			});

			this.props.onChangeSearchTerm(this.state.value);
		}
	}, {
		key: "render",
		value: function render() {
			return _react2["default"].createElement(
				"li",
				{ className: "hire-faceted-search-text-search" },
				_react2["default"].createElement("input", {
					onKeyDown: this.handleInputKeyDown.bind(this),
					onChange: this.handleInputChange.bind(this),
					value: this.state.value }),
				_react2["default"].createElement(
					"div",
					{ className: (0, _classnames2["default"])("search-icon", {
							active: this.state.value !== "",
							searching: this.state.searching
						}),
						onClick: this.handleSubmit.bind(this) },
					_react2["default"].createElement(
						"div",
						{ className: "center-vertical" },
						_react2["default"].createElement(_iconsSearch2["default"], null)
					)
				)
			);
		}
	}]);

	return TextSearch;
})(_react2["default"].Component);

TextSearch.defaultProps = {};

TextSearch.propTypes = {
	onChangeSearchTerm: _react2["default"].PropTypes.func
};

exports["default"] = TextSearch;
module.exports = exports["default"];

},{"../icons/search":37,"classnames":"classnames","insert-css":2,"react":"react"}],52:[function(_dereq_,module,exports){
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

var _lodashIsequal = _dereq_("lodash.isequal");

var _lodashIsequal2 = _interopRequireDefault(_lodashIsequal);

var _componentsFacets = _dereq_("./components/facets");

var _componentsFacets2 = _interopRequireDefault(_componentsFacets);

var _componentsResults = _dereq_("./components/results");

var _componentsResults2 = _interopRequireDefault(_componentsResults);

var _componentsIconsLoaderThreeDots = _dereq_("./components/icons/loader-three-dots");

var _componentsIconsLoaderThreeDots2 = _interopRequireDefault(_componentsIconsLoaderThreeDots);

var _actionsResults = _dereq_("./actions/results");

var _actionsQueries = _dereq_("./actions/queries");

var _redux = _dereq_("redux");

var _reducers = _dereq_("./reducers");

var _reducers2 = _interopRequireDefault(_reducers);

var _reduxThunk = _dereq_("redux-thunk");

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _insertCss = _dereq_("insert-css");

var _insertCss2 = _interopRequireDefault(_insertCss);

var logger = function logger(store) {
	return function (next) {
		return function (action) {
			if (action.hasOwnProperty("type")) {
				console.log(action.type, action);
			}

			return next(action);
		};
	};
};

var createStoreWithMiddleware = (0, _redux.applyMiddleware)(logger, _reduxThunk2["default"])(_redux.createStore);
var store = createStoreWithMiddleware(_reducers2["default"]);



var css = Buffer("LmhpcmUtZmFjZXRlZC1zZWFyY2ggewoJYm94LXNpemluZzogYm9yZGVyLWJveDsKCXBhZGRpbmc6IDUlOwoJd2lkdGg6IDEwMCU7Cn0KCi5oaXJlLWZhY2V0ZWQtc2VhcmNoIGlucHV0IHsKCS1tb3otYXBwZWFyYW5jZTogbm9uZTsKCS13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTsKfQoKLmhpcmUtZmFjZXRlZC1zZWFyY2ggPiAuaGlyZS1mYWNldGVkLXNlYXJjaC1mYWNldHMsCi5oaXJlLWZhY2V0ZWQtc2VhcmNoID4gLmhpcmUtZmFjZXRlZC1zZWFyY2gtcmVzdWx0cyB7Cglib3gtc2l6aW5nOiBib3JkZXItYm94OwoJZGlzcGxheTogaW5saW5lLWJsb2NrOwoJdmVydGljYWwtYWxpZ246IHRvcDsKfQoKLmhpcmUtZmFjZXRlZC1zZWFyY2ggPiAuaGlyZS1mYWNldGVkLXNlYXJjaC1mYWNldHMgewoJd2lkdGg6IDM1JTsKfQoKLmhpcmUtZmFjZXRlZC1zZWFyY2ggPiAuaGlyZS1mYWNldGVkLXNlYXJjaC1mYWNldHMgPiBidXR0b24gewoJYmFja2dyb3VuZDogd2hpdGU7Cglib3JkZXI6IG5vbmU7CgljdXJzb3I6IHBvaW50ZXI7CgloZWlnaHQ6IDQwcHg7CgltYXJnaW4tYm90dG9tOiAyMHB4OwoJb3V0bGluZTogbm9uZTsKCXBhZGRpbmc6IDAgMjBweDsKfQoKLmhpcmUtZmFjZXRlZC1zZWFyY2ggPiAuaGlyZS1mYWNldGVkLXNlYXJjaC1yZXN1bHRzIHsKCXBhZGRpbmc6IDAgMCAxMCUgNSU7Cgl3aWR0aDogNjAlOwp9","base64");
(0, _insertCss2["default"])(css, { prepend: true });

var FacetedSearch = (function (_React$Component) {
	_inherits(FacetedSearch, _React$Component);

	function FacetedSearch(props) {
		_classCallCheck(this, FacetedSearch);

		_get(Object.getPrototypeOf(FacetedSearch.prototype), "constructor", this).call(this, props);

		store.dispatch({
			type: "SET_QUERY_DEFAULTS",
			config: this.props.config
		});

		store.dispatch({
			type: "SET_CONFIG_DEFAULTS",
			config: this.props.config
		});

		store.dispatch({
			type: "SET_LABELS",
			labels: this.props.labels
		});

		this.state = store.getState();
	}

	_createClass(FacetedSearch, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this = this;

			this.unsubscribe = store.subscribe(function () {
				return _this.setState(store.getState());
			});

			store.dispatch((0, _actionsResults.fetchResults)());
		}
	}, {
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(nextProps) {
			if (!(0, _lodashIsequal2["default"])(this.state.labels, nextProps.labels)) {
				store.dispatch({
					type: "SET_LABELS",
					labels: nextProps.labels
				});
			}
		}
	}, {
		key: "componentWillUpdate",
		value: function componentWillUpdate(nextProps, nextState) {
			var resultsChanged = this.state.results.last !== nextState.results.last;

			if (resultsChanged) {
				this.props.onChange(nextState.results.last, nextState.queries.last);
			}
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			this.unsubscribe();
		}
	}, {
		key: "handleFetchNextResults",
		value: function handleFetchNextResults(url) {
			store.dispatch((0, _actionsResults.fetchNextResults)(url));
		}
	}, {
		key: "handleSelectFacetValue",
		value: function handleSelectFacetValue(facetName, value, remove) {
			store.dispatch((0, _actionsQueries.selectFacetValue)(facetName, value, remove));
		}
	}, {
		key: "render",
		value: function render() {
			var _this2 = this;

			if (this.state.results.all.length === 0) {
				return _react2["default"].createElement(
					"div",
					{ className: "hire-faceted-search" },
					_react2["default"].createElement(_componentsIconsLoaderThreeDots2["default"], { className: "loader" })
				);
			}

			return _react2["default"].createElement(
				"div",
				{ className: "hire-faceted-search" },
				_react2["default"].createElement(_componentsFacets2["default"], {
					facetList: this.props.facetList,
					labels: this.state.labels,
					onChangeSearchTerm: function (value) {
						return store.dispatch((0, _actionsQueries.changeSearchTerm)(value));
					},
					onNewSearch: function () {
						return store.dispatch((0, _actionsQueries.newSearch)());
					},
					onSelectFacetValue: function () {
						for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
							args[_key] = arguments[_key];
						}

						return store.dispatch(_actionsQueries.selectFacetValue.apply(undefined, args));
					},
					queries: this.state.queries,
					results: this.state.results }),
				_react2["default"].createElement(_componentsResults2["default"], {
					config: this.state.config,
					labels: this.state.labels,
					metadataList: this.props.metadataList,
					onChangeSearchTerm: function (value) {
						return store.dispatch((0, _actionsQueries.changeSearchTerm)(value));
					},
					onFetchNextResults: function (url) {
						return store.dispatch((0, _actionsResults.fetchNextResults)(url));
					},
					onSelect: function (item) {
						return _this2.props.onSelect(item);
					},
					onSelectFacetValue: function () {
						for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
							args[_key2] = arguments[_key2];
						}

						return store.dispatch(_actionsQueries.selectFacetValue.apply(undefined, args));
					},
					onSetSort: function (field) {
						return store.dispatch((0, _actionsQueries.setSort)(field));
					},
					queries: this.state.queries,
					results: this.state.results })
			);
		}
	}]);

	return FacetedSearch;
})(_react2["default"].Component);

FacetedSearch.defaultProps = {
	facetList: [],
	metadataList: [],
	labels: {}
};

FacetedSearch.propTypes = {
	config: _react2["default"].PropTypes.object.isRequired,
	facetList: _react2["default"].PropTypes.array,
	labels: _react2["default"].PropTypes.object,
	metadataList: _react2["default"].PropTypes.array,
	onChange: _react2["default"].PropTypes.func,
	onSelect: _react2["default"].PropTypes.func
};

exports["default"] = FacetedSearch;
module.exports = exports["default"];

},{"./actions/queries":30,"./actions/results":31,"./components/facets":32,"./components/icons/loader-three-dots":36,"./components/results":47,"./reducers":54,"insert-css":2,"lodash.isequal":5,"react":"react","redux":15,"redux-thunk":13}],53:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var initialState = {
	rows: 50
};

exports["default"] = function (state, action) {
	if (state === undefined) state = {};

	switch (action.type) {
		case "SET_CONFIG_DEFAULTS":
			var initConfig = _extends({}, initialState, action.config);

			return _extends({}, state, initConfig);
		default:
			return state;
	}
};

module.exports = exports["default"];

},{}],54:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _redux = _dereq_("redux");

var _config = _dereq_("./config");

var _config2 = _interopRequireDefault(_config);

var _labels = _dereq_("./labels");

var _labels2 = _interopRequireDefault(_labels);

var _queries = _dereq_("./queries");

var _queries2 = _interopRequireDefault(_queries);

var _results = _dereq_("./results");

var _results2 = _interopRequireDefault(_results);

exports["default"] = (0, _redux.combineReducers)({
	config: _config2["default"],
	labels: _labels2["default"],
	queries: _queries2["default"],
	results: _results2["default"]
});
module.exports = exports["default"];

},{"./config":53,"./labels":55,"./queries":56,"./results":57,"redux":15}],55:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var initialState = {
	facetTitles: {},
	newSearch: "New search",
	resultsFound: "results",
	showAll: "Show all",
	sortBy: "Sort by"
};

exports["default"] = function (state, action) {
	if (state === undefined) state = initialState;

	switch (action.type) {
		case "SET_LABELS":
			return _extends({}, state, action.labels);

		default:
			return state;
	}
};

module.exports = exports["default"];

},{}],56:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var removeFacetValue = function removeFacetValue(facetValues, name, value) {
	var foundFacetValue = facetValues.filter(function (facetValue) {
		return facetValue.name === name;
	});

	var otherFacetValues = facetValues.filter(function (facetValue) {
		return facetValue.name !== name;
	});

	return foundFacetValue[0].values.length > 1 ? otherFacetValues.concat({
		name: name,
		values: foundFacetValue[0].values.filter(function (v) {
			return v !== value;
		})
	}) : otherFacetValues;
};

var addFacetValue = function addFacetValue(facetValues, name, value) {
	var foundFacetValue = facetValues.filter(function (facetValue) {
		return facetValue.name === name;
	});

	var otherFacetValues = facetValues.filter(function (facetValue) {
		return facetValue.name !== name;
	});

	var selectedValues = foundFacetValue.length ? foundFacetValue[0].values.concat([value]) : [value];

	var newFacetValue = {
		name: name,
		values: selectedValues
	};

	return otherFacetValues.concat(newFacetValue);
};

var addQueryToState = function addQueryToState(state, query) {
	return _extends({}, state, {
		all: [].concat(_toConsumableArray(state.all), [query]),
		last: query
	});
};

var initialState = {
	all: [],
	"default": {
		"facetValues": [],
		"term": ""
	},
	last: null
};

exports["default"] = function (state, action) {
	if (state === undefined) state = initialState;

	var query = undefined;

	switch (action.type) {
		case "SET_QUERY_DEFAULTS":
			var defaultModel = _extends({}, initialState["default"], {
				sortParameters: action.config.levels.map(function (level) {
					return {
						fieldname: level,
						direction: "asc"
					};
				})
			});

			return _extends({}, state, {
				all: [defaultModel],
				"default": defaultModel,
				last: defaultModel
			});

		case "SET_RESULTS_SORT":
			var sortParameters = state.last.sortParameters.sort(function (valA, valB) {
				if (valA.fieldname === action.field) {
					return -1;
				}
				if (valB.fieldname === action.field) {
					return 1;
				}
				if (valA.fieldname < valB.fieldname) {
					return -1;
				}
				if (valA.fieldname > valB.fieldname) {
					return 1;
				}

				return 0;
			});

			query = _extends({}, state.last, { sortParameters: sortParameters });

			return addQueryToState(state, query);

		case "REMOVE_FACET_VALUE":
			query = _extends({}, state.last, {
				facetValues: removeFacetValue(state.last.facetValues, action.facetName, action.value)
			});

			return addQueryToState(state, query);

		case "ADD_FACET_VALUE":
			query = _extends({}, state.last, {
				facetValues: addFacetValue(state.last.facetValues, action.facetName, action.value)
			});

			return addQueryToState(state, query);

		case "CHANGE_SEARCH_TERM":
			query = _extends({}, state.last, { term: action.value });

			return addQueryToState(state, query);

		case "NEW_SEARCH":
			return addQueryToState(state, state["default"]);

		default:
			return state;
	}
};

module.exports = exports["default"];

},{}],57:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var updateFacetsWithReceivedCounts = function updateFacetsWithReceivedCounts(initFacets, receivedFacets) {
	receivedFacets = receivedFacets.reduce(function (prev, current) {
		prev[current.name] = current;

		return prev;
	}, {});

	return initFacets.map(function (facet) {
		var options = facet.options.map(function (option) {
			var count = 0;

			if (receivedFacets.hasOwnProperty(facet.name)) {
				var found = receivedFacets[facet.name].options.filter(function (receivedOption) {
					return option.name === receivedOption.name;
				});

				if (found.length) {
					count = found[0].count;
				}
			}

			option.count = count;

			return option;
		});

		return _extends({}, facet, { options: options });
	});
};

var addResponseToState = function addResponseToState(state, response) {
	var s = _extends({}, state, {
		all: [].concat(_toConsumableArray(state.all), [response]),
		last: response,
		requesting: false
	});

	return s;
};

var initialState = {
	all: [],
	facets: {},
	first: null,
	last: null,
	requesting: false
};

exports["default"] = function (state, action) {
	if (state === undefined) state = initialState;

	switch (action.type) {
		case "REQUEST_RESULTS":
			return _extends({}, state, { requesting: true });

		case "RECEIVE_RESULTS":
			if (state.first == null) {
				return _extends({}, addResponseToState(state, action.response), { first: action.response });
			}

			var response = _extends({}, action.response, {
				facets: updateFacetsWithReceivedCounts(state.first.facets, action.response.facets)
			});

			return addResponseToState(state, response);

		case "RECEIVE_NEXT_RESULTS":
			var withConcatResults = _extends({}, action.response, {
				results: [].concat(_toConsumableArray(state.last.results), _toConsumableArray(action.response.results)),
				refs: [].concat(_toConsumableArray(state.last.refs), _toConsumableArray(action.response.refs))
			});
			return addResponseToState(state, withConcatResults);

		default:
			return state;
	}
};

module.exports = exports["default"];

},{}]},{},[52])(52)
});