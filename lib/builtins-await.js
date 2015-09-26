"use strict";

var regeneratorRuntime = require("regenerator/runtime");

var _streamline = require("streamline-runtime/lib/runtime-await");

var _filename = "/Users/bruno/dev/dummy/node_modules/streamline/node_modules/streamline-runtime/lib/builtins._js";
/**
 * Copyright (c) 2012 Bruno Jouhier <bruno.jouhier@sage.com>
 * MIT License
 */
/// !doc
///
/// # Streamline built-ins

(function (exports) {
	var _parallel = function _parallel(options) {
		if (typeof options === "number") return options;
		if (typeof options.parallel === "number") return options.parallel;
		return options.parallel ? -1 : 1;
	};

	"use strict";
	var VERSION = 3;

	var future = function future(fn, args, i) {
		var err,
		    result,
		    done,
		    q = [],
		    self = this;
		args = Array.prototype.slice.call(args);
		args[i] = function (e, r) {
			err = e;
			result = r;
			done = true;
			q && q.forEach(function (f) {
				f.call(self, e, r);
			});
			q = null;
		};
		fn.apply(this, args);
		return function F(cb) {
			if (!cb) return F;
			if (done) cb.call(self, err, result);else q.push(cb);
		};
	};

	// Do not use this one directly, require it through the flows module.
	exports.funnel = function (max) {
		max = max == null ? -1 : max;
		if (max === 0) max = funnel.defaultSize;
		if (typeof max !== "number") throw new Error("bad max number: " + max);
		var queue = [],
		    active = 0,
		    closed = false;

		var fun = function fun(callback, fn) {
			var _doOne = function _doOne() {
				var current = queue.splice(0, 1)[0];
				if (!current.cb) return current.fn();
				active++;
				current.fn(function (err, result) {
					active--;
					if (!closed) {
							current.cb(err, result);
							while (active < max && queue.length > 0) _doOne();
						}
				});
			};

			if (callback == null) return future(fun, arguments, 0);
			//console.log("FUNNEL: active=" + active + ", queued=" + queue.length);
			if (max < 0 || max === Infinity) return fn(callback);

			queue.push({
				fn: fn,
				cb: callback
			});

			while (active < max && queue.length > 0) _doOne();
		};

		fun.close = function () {
			queue = [];
			closed = true;
		};
		return fun;
	};
	var funnel = exports.funnel;
	funnel.defaultSize = 4;

	if (Array.prototype.forEach_ && Array.prototype.forEach_.version_ >= VERSION) return;

	// bail out (silently) if JS does not support defineProperty (IE 8).
	try {
		Object.defineProperty({}, 'x', {});
	} catch (e) {
		return;
	}

	var has = Object.prototype.hasOwnProperty;

	/* eslint-disable no-extend-native */

	/// ## Array functions 
	///
	/// These functions are asynchronous variants of the EcmaScript 5 Array functions.
	///
	/// Common Rules:
	///
	/// These variants are postfixed by an underscore. 
	/// They take the `_` callback as first parameter. 
	/// They pass the `_` callback as first argument to their `fn` callback. 
	/// Most of them have an optional `options` second parameter which controls the level of
	/// parallelism. This `options` parameter may be specified either as `{ parallel: par }`
	/// where `par` is an integer, or directly as a `par` integer value. 
	/// The `par` values are interpreted as follows:
	///
	/// * If absent or equal to 1, execution is sequential.
	/// * If > 1, at most `par` operations are parallelized.
	/// * if 0, a default number of operations are parallelized.
	///   This default is defined by `flows.funnel.defaultSize` (4 by default - see `flows` module).
	/// * If < 0 or Infinity, operations are fully parallelized (no limit).
	///
	/// Functions:
	///
	/// * `array.forEach_(_[, options], fn[, thisObj])` 
	///   `fn` is called as `fn(_, elt, i, array)`.
	delete Array.prototype.forEach_;
	Object.defineProperty(Array.prototype, 'forEach_', {
		configurable: true,
		writable: true,
		enumerable: false,
		value: _streamline.async(function _$$value$$(_, options, fn, thisObj) {
			var par, len, i;
			return regeneratorRuntime.async(function _$$value$$$(context$2$0) {
				while (1) switch (context$2$0.prev = context$2$0.next) {
					case 0:
						if (typeof options === "function") {
								thisObj = fn;
								fn = options;
								options = 1;
							}
						par = _parallel(options);

						thisObj = thisObj !== undefined ? thisObj : this;
						len = this.length;

						if (!(par === 1 || len <= 1)) {
							context$2$0.next = 15;
							break;
						}

						i = 0;

					case 6:
						if (!(i < len)) {
							context$2$0.next = 13;
							break;
						}

						if (!has.call(this, i)) {
							context$2$0.next = 10;
							break;
						}

						context$2$0.next = 10;
						return regeneratorRuntime.awrap(_streamline.await(_filename, 137, fn, "call", 1, null, false)(thisObj, true, this[i], i, this));

					case 10:
						i++;
						context$2$0.next = 6;
						break;

					case 13:
						context$2$0.next = 17;
						break;

					case 15:
						context$2$0.next = 17;
						return regeneratorRuntime.awrap(_streamline.await(_filename, 140, this, "map_", 0, null, false)(true, par, fn, thisObj));

					case 17:
						return context$2$0.abrupt("return", this);

					case 18:
					case "end":
						return context$2$0.stop();
				}
			}, null, this);
		}, 0, 4)
	});
	Array.prototype.forEach_.version_ = VERSION;
	/// * `result = array.map_(_[, options], fn[, thisObj])` 
	///   `fn` is called as `fn(_, elt, i, array)`.
	delete Array.prototype.map_;
	Object.defineProperty(Array.prototype, 'map_', {
		configurable: true,
		writable: true,
		enumerable: false,
		value: _streamline.async(function _$$value$$2(_, options, fn, thisObj) {
			var par, len, result, i, fun;
			return regeneratorRuntime.async(function _$$value$$2$(context$2$0) {
				while (1) switch (context$2$0.prev = context$2$0.next) {
					case 0:
						if (typeof options === "function") {
								thisObj = fn;
								fn = options;
								options = 1;
							}
						par = _parallel(options);

						thisObj = thisObj !== undefined ? thisObj : this;
						len = this.length;

						if (!(par === 1 || len <= 1)) {
							context$2$0.next = 17;
							break;
						}

						result = new Array(len);
						i = 0;

					case 7:
						if (!(i < len)) {
							context$2$0.next = 15;
							break;
						}

						if (!has.call(this, i)) {
							context$2$0.next = 12;
							break;
						}

						context$2$0.next = 11;
						return regeneratorRuntime.awrap(_streamline.await(_filename, 166, fn, "call", 1, null, false)(thisObj, true, this[i], i, this));

					case 11:
						result[i] = context$2$0.sent;

					case 12:
						i++;
						context$2$0.next = 7;
						break;

					case 15:
						context$2$0.next = 28;
						break;

					case 17:
						fun = funnel(par);

						result = this.map(function (elt, i, arr) {
							return _streamline.future(_filename, 171, null, fun, 0, null, false)(false, _streamline.async(function _$$$$(_) {
								return regeneratorRuntime.async(function _$$$$$(context$4$0) {
									while (1) switch (context$4$0.prev = context$4$0.next) {
										case 0:
											context$4$0.next = 2;
											return regeneratorRuntime.awrap(_streamline.await(_filename, null, fn, "call", 1, null, false)(thisObj, true, elt, i, arr));

										case 2:
											return context$4$0.abrupt("return", context$4$0.sent);

										case 3:
										case "end":
											return context$4$0.stop();
									}
								}, null, this);
							}, 0, 1));
						});
						i = 0;

					case 20:
						if (!(i < len)) {
							context$2$0.next = 28;
							break;
						}

						if (!has.call(this, i)) {
							context$2$0.next = 25;
							break;
						}

						context$2$0.next = 24;
						return regeneratorRuntime.awrap(_streamline.await(_filename, 176, result, i, 0, null, false)(true));

					case 24:
						result[i] = context$2$0.sent;

					case 25:
						i++;
						context$2$0.next = 20;
						break;

					case 28:
						return context$2$0.abrupt("return", result);

					case 29:
					case "end":
						return context$2$0.stop();
				}
			}, null, this);
		}, 0, 4)
	});
	/// * `result = array.filter_(_[, options], fn[, thisObj])` 
	///   `fn` is called as `fn(_, elt, i, array)`.
	delete Array.prototype.filter_;
	Object.defineProperty(Array.prototype, 'filter_', {
		configurable: true,
		writable: true,
		enumerable: false,
		value: _streamline.async(function _$$value$$3(_, options, fn, thisObj) {
			var par, result, len, i, elt;
			return regeneratorRuntime.async(function _$$value$$3$(context$2$0) {
				while (1) switch (context$2$0.prev = context$2$0.next) {
					case 0:
						if (typeof options === "function") {
								thisObj = fn;
								fn = options;
								options = 1;
							}
						par = _parallel(options);

						thisObj = thisObj !== undefined ? thisObj : this;
						result = [];
						len = this.length;

						if (!(par === 1 || len <= 1)) {
							context$2$0.next = 19;
							break;
						}

						i = 0;

					case 7:
						if (!(i < len)) {
							context$2$0.next = 17;
							break;
						}

						if (!has.call(this, i)) {
							context$2$0.next = 14;
							break;
						}

						elt = this[i];
						context$2$0.next = 12;
						return regeneratorRuntime.awrap(_streamline.await(_filename, 203, fn, "call", 1, null, false)(thisObj, true, elt, i, this));

					case 12:
						if (!context$2$0.sent) {
							context$2$0.next = 14;
							break;
						}

						result.push(elt);

					case 14:
						i++;
						context$2$0.next = 7;
						break;

					case 17:
						context$2$0.next = 21;
						break;

					case 19:
						context$2$0.next = 21;
						return regeneratorRuntime.awrap(_streamline.await(_filename, 207, this, "map_", 0, null, false)(true, par, _streamline.async(function _$$$$2(_, elt, i, arr) {
							return regeneratorRuntime.async(function _$$$$2$(context$3$0) {
								while (1) switch (context$3$0.prev = context$3$0.next) {
									case 0:
										context$3$0.next = 2;
										return regeneratorRuntime.awrap(_streamline.await(_filename, null, fn, "call", 1, null, false)(thisObj, true, elt, i, arr));

									case 2:
										if (!context$3$0.sent) {
											context$3$0.next = 4;
											break;
										}

										result.push(elt);

									case 4:
									case "end":
										return context$3$0.stop();
								}
							}, null, this);
						}, 0, 4), thisObj));

					case 21:
						return context$2$0.abrupt("return", result);

					case 22:
					case "end":
						return context$2$0.stop();
				}
			}, null, this);
		}, 0, 4)
	});
	/// * `bool = array.every_(_[, options], fn[, thisObj])` 
	///   `fn` is called as `fn(_, elt, i, array)`.
	delete Array.prototype.every_;
	Object.defineProperty(Array.prototype, 'every_', {
		configurable: true,
		writable: true,
		enumerable: false,
		value: _streamline.async(function _$$value$$4(_, options, fn, thisObj) {
			var par, len, i, fun, futures;
			return regeneratorRuntime.async(function _$$value$$4$(context$2$0) {
				while (1) switch (context$2$0.prev = context$2$0.next) {
					case 0:
						if (typeof options === "function") {
								thisObj = fn;
								fn = options;
								options = 1;
							}
						par = _parallel(options);

						thisObj = thisObj !== undefined ? thisObj : this;
						len = this.length;

						if (!(par === 1 || len <= 1)) {
							context$2$0.next = 19;
							break;
						}

						i = 0;

					case 6:
						if (!(i < len)) {
							context$2$0.next = 17;
							break;
						}

						context$2$0.t0 = has.call(this, i);

						if (!context$2$0.t0) {
							context$2$0.next = 12;
							break;
						}

						context$2$0.next = 11;
						return regeneratorRuntime.awrap(_streamline.await(_filename, 233, fn, "call", 1, null, false)(thisObj, true, this[i], i, this));

					case 11:
						context$2$0.t0 = !context$2$0.sent;

					case 12:
						if (!context$2$0.t0) {
							context$2$0.next = 14;
							break;
						}

						return context$2$0.abrupt("return", false);

					case 14:
						i++;
						context$2$0.next = 6;
						break;

					case 17:
						context$2$0.next = 34;
						break;

					case 19:
						fun = funnel(par);
						futures = this.map(function (elt, i, arr) {
							return _streamline.future(_filename, 238, null, fun, 0, null, false)(false, _streamline.async(function _$$$$3(_) {
								return regeneratorRuntime.async(function _$$$$3$(context$4$0) {
									while (1) switch (context$4$0.prev = context$4$0.next) {
										case 0:
											context$4$0.next = 2;
											return regeneratorRuntime.awrap(_streamline.await(_filename, null, fn, "call", 1, null, false)(thisObj, true, elt, i, arr));

										case 2:
											return context$4$0.abrupt("return", context$4$0.sent);

										case 3:
										case "end":
											return context$4$0.stop();
									}
								}, null, this);
							}, 0, 1));
						});
						i = 0;

					case 22:
						if (!(i < len)) {
							context$2$0.next = 34;
							break;
						}

						context$2$0.t1 = has.call(this, i);

						if (!context$2$0.t1) {
							context$2$0.next = 28;
							break;
						}

						context$2$0.next = 27;
						return regeneratorRuntime.awrap(_streamline.await(_filename, 243, futures, i, 0, null, false)(true));

					case 27:
						context$2$0.t1 = !context$2$0.sent;

					case 28:
						if (!context$2$0.t1) {
							context$2$0.next = 31;
							break;
						}

						fun.close();
						return context$2$0.abrupt("return", false);

					case 31:
						i++;
						context$2$0.next = 22;
						break;

					case 34:
						return context$2$0.abrupt("return", true);

					case 35:
					case "end":
						return context$2$0.stop();
				}
			}, null, this);
		}, 0, 4)
	});
	/// * `bool = array.some_(_[, options], fn[, thisObj])` 
	///   `fn` is called as `fn(_, elt, i, array)`.
	delete Array.prototype.some_;
	Object.defineProperty(Array.prototype, 'some_', {
		configurable: true,
		writable: true,
		enumerable: false,
		value: _streamline.async(function _$$value$$5(_, options, fn, thisObj) {
			var par, len, i, fun, futures;
			return regeneratorRuntime.async(function _$$value$$5$(context$2$0) {
				while (1) switch (context$2$0.prev = context$2$0.next) {
					case 0:
						if (typeof options === "function") {
								thisObj = fn;
								fn = options;
								options = 1;
							}
						par = _parallel(options);

						thisObj = thisObj !== undefined ? thisObj : this;
						len = this.length;

						if (!(par === 1 || len <= 1)) {
							context$2$0.next = 19;
							break;
						}

						i = 0;

					case 6:
						if (!(i < len)) {
							context$2$0.next = 17;
							break;
						}

						context$2$0.t0 = has.call(this, i);

						if (!context$2$0.t0) {
							context$2$0.next = 12;
							break;
						}

						context$2$0.next = 11;
						return regeneratorRuntime.awrap(_streamline.await(_filename, 270, fn, "call", 1, null, false)(thisObj, true, this[i], i, this));

					case 11:
						context$2$0.t0 = context$2$0.sent;

					case 12:
						if (!context$2$0.t0) {
							context$2$0.next = 14;
							break;
						}

						return context$2$0.abrupt("return", true);

					case 14:
						i++;
						context$2$0.next = 6;
						break;

					case 17:
						context$2$0.next = 34;
						break;

					case 19:
						fun = funnel(par);
						futures = this.map(function (elt, i, arr) {
							return _streamline.future(_filename, 275, null, fun, 0, null, false)(false, _streamline.async(function _$$$$4(_) {
								return regeneratorRuntime.async(function _$$$$4$(context$4$0) {
									while (1) switch (context$4$0.prev = context$4$0.next) {
										case 0:
											context$4$0.next = 2;
											return regeneratorRuntime.awrap(_streamline.await(_filename, null, fn, "call", 1, null, false)(thisObj, true, elt, i, arr));

										case 2:
											return context$4$0.abrupt("return", context$4$0.sent);

										case 3:
										case "end":
											return context$4$0.stop();
									}
								}, null, this);
							}, 0, 1));
						});
						i = 0;

					case 22:
						if (!(i < len)) {
							context$2$0.next = 34;
							break;
						}

						context$2$0.t1 = has.call(this, i);

						if (!context$2$0.t1) {
							context$2$0.next = 28;
							break;
						}

						context$2$0.next = 27;
						return regeneratorRuntime.awrap(_streamline.await(_filename, 280, futures, i, 0, null, false)(true));

					case 27:
						context$2$0.t1 = context$2$0.sent;

					case 28:
						if (!context$2$0.t1) {
							context$2$0.next = 31;
							break;
						}

						fun.close();
						return context$2$0.abrupt("return", true);

					case 31:
						i++;
						context$2$0.next = 22;
						break;

					case 34:
						return context$2$0.abrupt("return", false);

					case 35:
					case "end":
						return context$2$0.stop();
				}
			}, null, this);
		}, 0, 4)
	});
	/// * `result = array.reduce_(_, fn, val[, thisObj])` 
	///   `fn` is called as `val = fn(_, val, elt, i, array)`.
	delete Array.prototype.reduce_;
	Object.defineProperty(Array.prototype, 'reduce_', {
		configurable: true,
		writable: true,
		enumerable: false,
		value: _streamline.async(function _$$value$$6(_, fn, v, thisObj) {
			var len, i;
			return regeneratorRuntime.async(function _$$value$$6$(context$2$0) {
				while (1) switch (context$2$0.prev = context$2$0.next) {
					case 0:
						thisObj = thisObj !== undefined ? thisObj : this;
						len = this.length;
						i = 0;

					case 3:
						if (!(i < len)) {
							context$2$0.next = 11;
							break;
						}

						if (!has.call(this, i)) {
							context$2$0.next = 8;
							break;
						}

						context$2$0.next = 7;
						return regeneratorRuntime.awrap(_streamline.await(_filename, 300, fn, "call", 1, null, false)(thisObj, true, v, this[i], i, this));

					case 7:
						v = context$2$0.sent;

					case 8:
						i++;
						context$2$0.next = 3;
						break;

					case 11:
						return context$2$0.abrupt("return", v);

					case 12:
					case "end":
						return context$2$0.stop();
				}
			}, null, this);
		}, 0, 4)
	});
	/// * `result = array.reduceRight_(_, fn, val[, thisObj])` 
	///   `fn` is called as `val = fn(_, val, elt, i, array)`.
	delete Array.prototype.reduceRight_;
	Object.defineProperty(Array.prototype, 'reduceRight_', {
		configurable: true,
		writable: true,
		enumerable: false,
		value: _streamline.async(function _$$value$$7(_, fn, v, thisObj) {
			var len, i;
			return regeneratorRuntime.async(function _$$value$$7$(context$2$0) {
				while (1) switch (context$2$0.prev = context$2$0.next) {
					case 0:
						thisObj = thisObj !== undefined ? thisObj : this;
						len = this.length;
						i = len - 1;

					case 3:
						if (!(i >= 0)) {
							context$2$0.next = 11;
							break;
						}

						if (!has.call(this, i)) {
							context$2$0.next = 8;
							break;
						}

						context$2$0.next = 7;
						return regeneratorRuntime.awrap(_streamline.await(_filename, 316, fn, "call", 1, null, false)(thisObj, true, v, this[i], i, this));

					case 7:
						v = context$2$0.sent;

					case 8:
						i--;
						context$2$0.next = 3;
						break;

					case 11:
						return context$2$0.abrupt("return", v);

					case 12:
					case "end":
						return context$2$0.stop();
				}
			}, null, this);
		}, 0, 4)
	});

	/// * `array = array.sort_(_, compare [, beg [, end]])` 
	///   `compare` is called as `cmp = compare(_, elt1, elt2)`. 
	///   Note: this function _changes_ the original array (and returns it).
	delete Array.prototype.sort_;
	Object.defineProperty(Array.prototype, 'sort_', {
		configurable: true,
		writable: true,
		enumerable: false,
		value: _streamline.async(function _$$value$$8(_, compare, beg, end) {
			var _qsort, array;

			return regeneratorRuntime.async(function _$$value$$8$(context$2$0) {
				while (1) switch (context$2$0.prev = context$2$0.next) {
					case 0:
						_qsort = _streamline.async(function _$$_qsort$$(_, beg, end) {
							var tmp, mid, o, nbeg, nend;
							return regeneratorRuntime.async(function _$$_qsort$$$(context$3$0) {
								while (1) switch (context$3$0.prev = context$3$0.next) {
									case 0:
										if (!(beg >= end)) {
											context$3$0.next = 2;
											break;
										}

										return context$3$0.abrupt("return");

									case 2:
										if (!(end === beg + 1)) {
											context$3$0.next = 11;
											break;
										}

										context$3$0.next = 5;
										return regeneratorRuntime.awrap(_streamline.await(_filename, 340, null, compare, 0, null, false)(true, array[beg], array[end]));

									case 5:
										context$3$0.t0 = context$3$0.sent;

										if (!(context$3$0.t0 > 0)) {
											context$3$0.next = 10;
											break;
										}

										tmp = array[beg];
										array[beg] = array[end];
										array[end] = tmp;

									case 10:
										return context$3$0.abrupt("return");

									case 11:
										mid = Math.floor((beg + end) / 2);
										o = array[mid];
										nbeg = beg;
										nend = end;

									case 15:
										if (!(nbeg <= nend)) {
											context$3$0.next = 39;
											break;
										}

									case 16:
										context$3$0.t1 = nbeg < end;

										if (!context$3$0.t1) {
											context$3$0.next = 22;
											break;
										}

										context$3$0.next = 20;
										return regeneratorRuntime.awrap(_streamline.await(_filename, 354, null, compare, 0, null, false)(true, array[nbeg], o));

									case 20:
										context$3$0.t2 = context$3$0.sent;
										context$3$0.t1 = context$3$0.t2 < 0;

									case 22:
										if (!context$3$0.t1) {
											context$3$0.next = 26;
											break;
										}

										nbeg++;
										context$3$0.next = 16;
										break;

									case 26:
										context$3$0.t3 = beg < nend;

										if (!context$3$0.t3) {
											context$3$0.next = 32;
											break;
										}

										context$3$0.next = 30;
										return regeneratorRuntime.awrap(_streamline.await(_filename, 355, null, compare, 0, null, false)(true, o, array[nend]));

									case 30:
										context$3$0.t4 = context$3$0.sent;
										context$3$0.t3 = context$3$0.t4 < 0;

									case 32:
										if (!context$3$0.t3) {
											context$3$0.next = 36;
											break;
										}

										nend--;

										context$3$0.next = 26;
										break;

									case 36:
										if (nbeg <= nend) {
												tmp = array[nbeg];
												array[nbeg] = array[nend];
												array[nend] = tmp;
												nbeg++;
												nend--;
											}
										context$3$0.next = 15;
										break;

									case 39:
										if (!(nbeg < end)) {
											context$3$0.next = 42;
											break;
										}

										context$3$0.next = 42;
										return regeneratorRuntime.awrap(_streamline.await(_filename, 366, null, _qsort, 0, null, false)(true, nbeg, end));

									case 42:
										if (!(beg < nend)) {
											context$3$0.next = 45;
											break;
										}

										context$3$0.next = 45;
										return regeneratorRuntime.awrap(_streamline.await(_filename, 367, null, _qsort, 0, null, false)(true, beg, nend));

									case 45:
									case "end":
										return context$3$0.stop();
								}
							}, null, this);
						}, 0, 3);
						array = this;

						beg = beg || 0;
						end = end == null ? array.length - 1 : end;

						context$2$0.next = 6;
						return regeneratorRuntime.awrap(_streamline.await(_filename, 369, null, _qsort, 0, null, false)(true, beg, end));

					case 6:
						return context$2$0.abrupt("return", array);

					case 7:
					case "end":
						return context$2$0.stop();
				}
			}, null, this);
		}, 0, 4)
	});

	///
	/// ## Function functions 
	///
	/// * `result = fn.apply_(_, thisObj, args[, index])` 
	///   Helper to use `Function.prototype.apply` inside streamlined functions. 
	///   Equivalent to `result = fn.apply(thisObj, argsWith_)` where `argsWith_` is
	///   a modified `args` in which the callback has been inserted at `index`
	///   (at the end of the argument list if `index` is omitted or negative).
	delete Function.prototype.apply_;
	Object.defineProperty(Function.prototype, 'apply_', {
		configurable: true,
		writable: true,
		enumerable: false,
		value: function value(callback, thisObj, args, index) {
			args = Array.prototype.slice.call(args, 0);
			args.splice(index != null && index >= 0 ? index : args.length, 0, callback);
			return this.apply(thisObj, args);
		}
	});
})(typeof exports !== 'undefined' ? exports : Streamline.builtins = Streamline.builtins || {});
///