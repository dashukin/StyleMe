var _toString = Object.prototype.toString;
export default  {
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