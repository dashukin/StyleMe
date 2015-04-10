module.exports = (function () {
	var _toString = Object.prototype.toString;
	return {
		isFunction: function (f) {
			return typeof f === 'function';
		},
		isString: function (s) {
			return typeof s === 'string';
		},
		isObject: function (o) {
			return _toString.call(o).slice(8, -1) === 'Object';
		}
	}
}());