!function(t){function e(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return t[n].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var r={};return e.m=t,e.c=r,e.p="",e(0)}([function(t,e,r){"use strict";function n(t){var e,r,n,o;e=document.createElement("li"),r=document.createElement("input"),r.type="text",r.className="form-control",r.placeholder="path/to/css",t&&(r.value=t),o=document.createElement("span"),o.className="mdi-content-clear",n=document.createElement("a"),n.className="remove-stylesheet-link",n.href="#",n.appendChild(o),e.appendChild(r),e.appendChild(n),y.appendChild(e)}function o(t){var e=this,t=t||e.parentNode;t.parentNode.removeChild(t)}function i(){var t=[],e=Array.prototype.slice.call(y.querySelectorAll("input[type=text]"));e.forEach(function(e,r){var n=e.value;n.length?t.push({href:n,key:h(n)}):0!==r&&o(e.parentNode),E.stylesheets=t})}function a(){s({action:"saveConfiguration",data:E},function(t){t.status===!0&&(d.classList.add("visible"),setTimeout(function(){d&&d.classList.remove("visible")},2e3))})}function u(){document.addEventListener("click",function(){var t=Array.prototype.slice.call(document.querySelectorAll(".tab-link")),e=Array.prototype.slice.call(document.querySelectorAll(".tab"));return function(r){var n,o=r.target;"A"===o.nodeName&&o.classList.contains("tab-link")&&(n=document.querySelector(o.getAttribute("href")),n&&(e.forEach(function(t){t.classList.remove("active")}),t.forEach(function(t){t.classList.remove("active")}),n.classList.add("active"),o.classList.add("active")))}}(),!1)}function s(t,e){t="Object"===Object.prototype.toString.call(t).slice(8,-1)?t:{},chrome.tabs.getSelected(null,function(r){chrome.tabs.sendMessage(r.id,t,function(t){"function"==typeof e&&e.call(null,t)})})}function f(t){return document.getElementById(t)}var h=r(3);u();var c=f("configuration-form"),l=f("autoupdate"),p=f("enable"),g=f("update-frequency"),d=f("save-status-success"),y=f("stylesheets-list"),w=f("add-stylesheet"),E={enable:!1,updateFrequency:2,autoupdate:!1,stylesheets:[]};s({action:"getConfiguration"},function(t){if(t&&t.status===!0){var e,r=t.configurationData,o=r.stylesheets,i=y.querySelector("li>input");r.enable&&p.setAttribute("checked","checked"),r.autoupdate&&l.setAttribute("checked","checked"),E.enable=r.enable,E.autoupdate=r.autoupdate,g.value=r.updateFrequency,e=o.splice(0,1),e.length&&(i.value=e[0].href),o.forEach(function(t){n(t.href)})}}),p.addEventListener("change",function(){this.checked?this.setAttribute("checked",""):this.removeAttribute("checked"),E.enable=this.checked},!1),l.addEventListener("change",function(){this.checked?this.setAttribute("checked",""):this.removeAttribute("checked"),E.autoupdate=this.checked},!1),g.addEventListener("change",function(){var t=/^\d+$/.test(this.value)?this.value:1;E.updateFrequency=t},!1),c.addEventListener("submit",function(t){return i(),a(),t.preventDefault(),!1},!1),w.addEventListener("click",function(t){t.preventDefault(),n()},!1),document.addEventListener("click",function(t){var e="A"===t.target.nodeName?t.target:t.target.parentNode;"A"===e.nodeName&&e.classList.contains("remove-stylesheet-link")&&(t.preventDefault(),o.call(e))},!1)},function(t,e,r){var n={utf8:{stringToBytes:function(t){return n.bin.stringToBytes(unescape(encodeURIComponent(t)))},bytesToString:function(t){return decodeURIComponent(escape(n.bin.bytesToString(t)))}},bin:{stringToBytes:function(t){for(var e=[],r=0;r<t.length;r++)e.push(255&t.charCodeAt(r));return e},bytesToString:function(t){for(var e=[],r=0;r<t.length;r++)e.push(String.fromCharCode(t[r]));return e.join("")}}};t.exports=n},function(t,e,r){(function(t){function t(e,r){var n=this;if(!(n instanceof t))return new t(e,r);var o,i=typeof e;if("number"===i)o=+e;else if("string"===i)o=t.byteLength(e,r);else{if("object"!==i||null===e)throw new TypeError("must start with number, buffer, array or string");"Buffer"===e.type&&x(e.data)&&(e=e.data),o=+e.length}if(o>Y)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+Y.toString(16)+" bytes");0>o?o=0:o>>>=0,t.TYPED_ARRAY_SUPPORT?n=t._augment(new Uint8Array(o)):(n.length=o,n._isBuffer=!0);var a;if(t.TYPED_ARRAY_SUPPORT&&"number"==typeof e.byteLength)n._set(e);else if(S(e))if(t.isBuffer(e))for(a=0;o>a;a++)n[a]=e.readUInt8(a);else for(a=0;o>a;a++)n[a]=(e[a]%256+256)%256;else if("string"===i)n.write(e,0,r);else if("number"===i&&!t.TYPED_ARRAY_SUPPORT)for(a=0;o>a;a++)n[a]=0;return o>0&&o<=t.poolSize&&(n.parent=M),n}function n(e,r){if(!(this instanceof n))return new n(e,r);var o=new t(e,r);return delete o.parent,o}function o(t,e,r,n){r=Number(r)||0;var o=t.length-r;n?(n=Number(n),n>o&&(n=o)):n=o;var i=e.length;if(i%2!==0)throw new Error("Invalid hex string");n>i/2&&(n=i/2);for(var a=0;n>a;a++){var u=parseInt(e.substr(2*a,2),16);if(isNaN(u))throw new Error("Invalid hex string");t[r+a]=u}return a}function i(t,e,r,n){var o=_(R(e,t.length-r),t,r,n);return o}function a(t,e,r,n){var o=_(T(e),t,r,n);return o}function u(t,e,r,n){return a(t,e,r,n)}function s(t,e,r,n){var o=_(P(e),t,r,n);return o}function f(t,e,r,n){var o=_(L(e,t.length-r),t,r,n);return o}function h(t,e,r){return D.fromByteArray(0===e&&r===t.length?t:t.slice(e,r))}function c(t,e,r){var n="",o="";r=Math.min(t.length,r);for(var i=e;r>i;i++)t[i]<=127?(n+=C(o)+String.fromCharCode(t[i]),o=""):o+="%"+t[i].toString(16);return n+C(o)}function l(t,e,r){var n="";r=Math.min(t.length,r);for(var o=e;r>o;o++)n+=String.fromCharCode(127&t[o]);return n}function p(t,e,r){var n="";r=Math.min(t.length,r);for(var o=e;r>o;o++)n+=String.fromCharCode(t[o]);return n}function g(t,e,r){var n=t.length;(!e||0>e)&&(e=0),(!r||0>r||r>n)&&(r=n);for(var o="",i=e;r>i;i++)o+=U(t[i]);return o}function d(t,e,r){for(var n=t.slice(e,r),o="",i=0;i<n.length;i+=2)o+=String.fromCharCode(n[i]+256*n[i+1]);return o}function y(t,e,r){if(t%1!==0||0>t)throw new RangeError("offset is not uint");if(t+e>r)throw new RangeError("Trying to access beyond buffer length")}function w(e,r,n,o,i,a){if(!t.isBuffer(e))throw new TypeError("buffer must be a Buffer instance");if(r>i||a>r)throw new RangeError("value is out of bounds");if(n+o>e.length)throw new RangeError("index out of range")}function E(t,e,r,n){0>e&&(e=65535+e+1);for(var o=0,i=Math.min(t.length-r,2);i>o;o++)t[r+o]=(e&255<<8*(n?o:1-o))>>>8*(n?o:1-o)}function v(t,e,r,n){0>e&&(e=4294967295+e+1);for(var o=0,i=Math.min(t.length-r,4);i>o;o++)t[r+o]=e>>>8*(n?o:3-o)&255}function b(t,e,r,n,o,i){if(e>o||i>e)throw new RangeError("value is out of bounds");if(r+n>t.length)throw new RangeError("index out of range");if(0>r)throw new RangeError("index out of range")}function A(t,e,r,n,o){return o||b(t,e,r,4,3.4028234663852886e38,-3.4028234663852886e38),O.write(t,e,r,n,23,4),r+4}function I(t,e,r,n,o){return o||b(t,e,r,8,1.7976931348623157e308,-1.7976931348623157e308),O.write(t,e,r,n,52,8),r+8}function B(t){if(t=m(t).replace(N,""),t.length<2)return"";for(;t.length%4!==0;)t+="=";return t}function m(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"")}function S(e){return x(e)||t.isBuffer(e)||e&&"object"==typeof e&&"number"==typeof e.length}function U(t){return 16>t?"0"+t.toString(16):t.toString(16)}function R(t,e){e=e||1/0;for(var r,n=t.length,o=null,i=[],a=0;n>a;a++){if(r=t.charCodeAt(a),r>55295&&57344>r){if(!o){if(r>56319){(e-=3)>-1&&i.push(239,191,189);continue}if(a+1===n){(e-=3)>-1&&i.push(239,191,189);continue}o=r;continue}if(56320>r){(e-=3)>-1&&i.push(239,191,189),o=r;continue}r=o-55296<<10|r-56320|65536,o=null}else o&&((e-=3)>-1&&i.push(239,191,189),o=null);if(128>r){if((e-=1)<0)break;i.push(r)}else if(2048>r){if((e-=2)<0)break;i.push(r>>6|192,63&r|128)}else if(65536>r){if((e-=3)<0)break;i.push(r>>12|224,r>>6&63|128,63&r|128)}else{if(!(2097152>r))throw new Error("Invalid code point");if((e-=4)<0)break;i.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128)}}return i}function T(t){for(var e=[],r=0;r<t.length;r++)e.push(255&t.charCodeAt(r));return e}function L(t,e){for(var r,n,o,i=[],a=0;a<t.length&&!((e-=2)<0);a++)r=t.charCodeAt(a),n=r>>8,o=r%256,i.push(o),i.push(n);return i}function P(t){return D.toByteArray(B(t))}function _(t,e,r,n){for(var o=0;n>o&&!(o+r>=e.length||o>=t.length);o++)e[o+r]=t[o];return o}function C(t){try{return decodeURIComponent(t)}catch(e){return String.fromCharCode(65533)}}/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
var D=r(5),O=r(6),x=r(7);e.Buffer=t,e.SlowBuffer=n,e.INSPECT_MAX_BYTES=50,t.poolSize=8192;var Y=1073741823,M={};t.TYPED_ARRAY_SUPPORT=function(){try{var t=new ArrayBuffer(0),e=new Uint8Array(t);return e.foo=function(){return 42},42===e.foo()&&"function"==typeof e.subarray&&0===new Uint8Array(1).subarray(1,1).byteLength}catch(r){return!1}}(),t.isBuffer=function(t){return!(null==t||!t._isBuffer)},t.compare=function(e,r){if(!t.isBuffer(e)||!t.isBuffer(r))throw new TypeError("Arguments must be Buffers");if(e===r)return 0;for(var n=e.length,o=r.length,i=0,a=Math.min(n,o);a>i&&e[i]===r[i];i++);return i!==a&&(n=e[i],o=r[i]),o>n?-1:n>o?1:0},t.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"raw":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},t.concat=function(e,r){if(!x(e))throw new TypeError("list argument must be an Array of Buffers.");if(0===e.length)return new t(0);if(1===e.length)return e[0];var n;if(void 0===r)for(r=0,n=0;n<e.length;n++)r+=e[n].length;var o=new t(r),i=0;for(n=0;n<e.length;n++){var a=e[n];a.copy(o,i),i+=a.length}return o},t.byteLength=function(t,e){var r;switch(t+="",e||"utf8"){case"ascii":case"binary":case"raw":r=t.length;break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":r=2*t.length;break;case"hex":r=t.length>>>1;break;case"utf8":case"utf-8":r=R(t).length;break;case"base64":r=P(t).length;break;default:r=t.length}return r},t.prototype.length=void 0,t.prototype.parent=void 0,t.prototype.toString=function(t,e,r){var n=!1;if(e>>>=0,r=void 0===r||r===1/0?this.length:r>>>0,t||(t="utf8"),0>e&&(e=0),r>this.length&&(r=this.length),e>=r)return"";for(;;)switch(t){case"hex":return g(this,e,r);case"utf8":case"utf-8":return c(this,e,r);case"ascii":return l(this,e,r);case"binary":return p(this,e,r);case"base64":return h(this,e,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return d(this,e,r);default:if(n)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),n=!0}},t.prototype.equals=function(e){if(!t.isBuffer(e))throw new TypeError("Argument must be a Buffer");return this===e?!0:0===t.compare(this,e)},t.prototype.inspect=function(){var t="",r=e.INSPECT_MAX_BYTES;return this.length>0&&(t=this.toString("hex",0,r).match(/.{2}/g).join(" "),this.length>r&&(t+=" ... ")),"<Buffer "+t+">"},t.prototype.compare=function(e){if(!t.isBuffer(e))throw new TypeError("Argument must be a Buffer");return this===e?0:t.compare(this,e)},t.prototype.indexOf=function(e,r){function n(t,e,r){for(var n=-1,o=0;r+o<t.length;o++)if(t[r+o]===e[-1===n?0:o-n]){if(-1===n&&(n=o),o-n+1===e.length)return r+n}else n=-1;return-1}if(r>2147483647?r=2147483647:-2147483648>r&&(r=-2147483648),r>>=0,0===this.length)return-1;if(r>=this.length)return-1;if(0>r&&(r=Math.max(this.length+r,0)),"string"==typeof e)return 0===e.length?-1:String.prototype.indexOf.call(this,e,r);if(t.isBuffer(e))return n(this,e,r);if("number"==typeof e)return t.TYPED_ARRAY_SUPPORT&&"function"===Uint8Array.prototype.indexOf?Uint8Array.prototype.indexOf.call(this,e,r):n(this,[e],r);throw new TypeError("val must be string, number or Buffer")},t.prototype.get=function(t){return console.log(".get() is deprecated. Access using array indexes instead."),this.readUInt8(t)},t.prototype.set=function(t,e){return console.log(".set() is deprecated. Access using array indexes instead."),this.writeUInt8(t,e)},t.prototype.write=function(t,e,r,n){if(isFinite(e))isFinite(r)||(n=r,r=void 0);else{var h=n;n=e,e=r,r=h}if(e=Number(e)||0,0>r||0>e||e>this.length)throw new RangeError("attempt to write outside buffer bounds");var c=this.length-e;r?(r=Number(r),r>c&&(r=c)):r=c,n=String(n||"utf8").toLowerCase();var l;switch(n){case"hex":l=o(this,t,e,r);break;case"utf8":case"utf-8":l=i(this,t,e,r);break;case"ascii":l=a(this,t,e,r);break;case"binary":l=u(this,t,e,r);break;case"base64":l=s(this,t,e,r);break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":l=f(this,t,e,r);break;default:throw new TypeError("Unknown encoding: "+n)}return l},t.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}},t.prototype.slice=function(e,r){var n=this.length;e=~~e,r=void 0===r?n:~~r,0>e?(e+=n,0>e&&(e=0)):e>n&&(e=n),0>r?(r+=n,0>r&&(r=0)):r>n&&(r=n),e>r&&(r=e);var o;if(t.TYPED_ARRAY_SUPPORT)o=t._augment(this.subarray(e,r));else{var i=r-e;o=new t(i,void 0);for(var a=0;i>a;a++)o[a]=this[a+e]}return o.length&&(o.parent=this.parent||this),o},t.prototype.readUIntLE=function(t,e,r){t>>>=0,e>>>=0,r||y(t,e,this.length);for(var n=this[t],o=1,i=0;++i<e&&(o*=256);)n+=this[t+i]*o;return n},t.prototype.readUIntBE=function(t,e,r){t>>>=0,e>>>=0,r||y(t,e,this.length);for(var n=this[t+--e],o=1;e>0&&(o*=256);)n+=this[t+--e]*o;return n},t.prototype.readUInt8=function(t,e){return e||y(t,1,this.length),this[t]},t.prototype.readUInt16LE=function(t,e){return e||y(t,2,this.length),this[t]|this[t+1]<<8},t.prototype.readUInt16BE=function(t,e){return e||y(t,2,this.length),this[t]<<8|this[t+1]},t.prototype.readUInt32LE=function(t,e){return e||y(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+16777216*this[t+3]},t.prototype.readUInt32BE=function(t,e){return e||y(t,4,this.length),16777216*this[t]+(this[t+1]<<16|this[t+2]<<8|this[t+3])},t.prototype.readIntLE=function(t,e,r){t>>>=0,e>>>=0,r||y(t,e,this.length);for(var n=this[t],o=1,i=0;++i<e&&(o*=256);)n+=this[t+i]*o;return o*=128,n>=o&&(n-=Math.pow(2,8*e)),n},t.prototype.readIntBE=function(t,e,r){t>>>=0,e>>>=0,r||y(t,e,this.length);for(var n=e,o=1,i=this[t+--n];n>0&&(o*=256);)i+=this[t+--n]*o;return o*=128,i>=o&&(i-=Math.pow(2,8*e)),i},t.prototype.readInt8=function(t,e){return e||y(t,1,this.length),128&this[t]?-1*(255-this[t]+1):this[t]},t.prototype.readInt16LE=function(t,e){e||y(t,2,this.length);var r=this[t]|this[t+1]<<8;return 32768&r?4294901760|r:r},t.prototype.readInt16BE=function(t,e){e||y(t,2,this.length);var r=this[t+1]|this[t]<<8;return 32768&r?4294901760|r:r},t.prototype.readInt32LE=function(t,e){return e||y(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24},t.prototype.readInt32BE=function(t,e){return e||y(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]},t.prototype.readFloatLE=function(t,e){return e||y(t,4,this.length),O.read(this,t,!0,23,4)},t.prototype.readFloatBE=function(t,e){return e||y(t,4,this.length),O.read(this,t,!1,23,4)},t.prototype.readDoubleLE=function(t,e){return e||y(t,8,this.length),O.read(this,t,!0,52,8)},t.prototype.readDoubleBE=function(t,e){return e||y(t,8,this.length),O.read(this,t,!1,52,8)},t.prototype.writeUIntLE=function(t,e,r,n){t=+t,e>>>=0,r>>>=0,n||w(this,t,e,r,Math.pow(2,8*r),0);var o=1,i=0;for(this[e]=255&t;++i<r&&(o*=256);)this[e+i]=t/o>>>0&255;return e+r},t.prototype.writeUIntBE=function(t,e,r,n){t=+t,e>>>=0,r>>>=0,n||w(this,t,e,r,Math.pow(2,8*r),0);var o=r-1,i=1;for(this[e+o]=255&t;--o>=0&&(i*=256);)this[e+o]=t/i>>>0&255;return e+r},t.prototype.writeUInt8=function(e,r,n){return e=+e,r>>>=0,n||w(this,e,r,1,255,0),t.TYPED_ARRAY_SUPPORT||(e=Math.floor(e)),this[r]=e,r+1},t.prototype.writeUInt16LE=function(e,r,n){return e=+e,r>>>=0,n||w(this,e,r,2,65535,0),t.TYPED_ARRAY_SUPPORT?(this[r]=e,this[r+1]=e>>>8):E(this,e,r,!0),r+2},t.prototype.writeUInt16BE=function(e,r,n){return e=+e,r>>>=0,n||w(this,e,r,2,65535,0),t.TYPED_ARRAY_SUPPORT?(this[r]=e>>>8,this[r+1]=e):E(this,e,r,!1),r+2},t.prototype.writeUInt32LE=function(e,r,n){return e=+e,r>>>=0,n||w(this,e,r,4,4294967295,0),t.TYPED_ARRAY_SUPPORT?(this[r+3]=e>>>24,this[r+2]=e>>>16,this[r+1]=e>>>8,this[r]=e):v(this,e,r,!0),r+4},t.prototype.writeUInt32BE=function(e,r,n){return e=+e,r>>>=0,n||w(this,e,r,4,4294967295,0),t.TYPED_ARRAY_SUPPORT?(this[r]=e>>>24,this[r+1]=e>>>16,this[r+2]=e>>>8,this[r+3]=e):v(this,e,r,!1),r+4},t.prototype.writeIntLE=function(t,e,r,n){t=+t,e>>>=0,n||w(this,t,e,r,Math.pow(2,8*r-1)-1,-Math.pow(2,8*r-1));var o=0,i=1,a=0>t?1:0;for(this[e]=255&t;++o<r&&(i*=256);)this[e+o]=(t/i>>0)-a&255;return e+r},t.prototype.writeIntBE=function(t,e,r,n){t=+t,e>>>=0,n||w(this,t,e,r,Math.pow(2,8*r-1)-1,-Math.pow(2,8*r-1));var o=r-1,i=1,a=0>t?1:0;for(this[e+o]=255&t;--o>=0&&(i*=256);)this[e+o]=(t/i>>0)-a&255;return e+r},t.prototype.writeInt8=function(e,r,n){return e=+e,r>>>=0,n||w(this,e,r,1,127,-128),t.TYPED_ARRAY_SUPPORT||(e=Math.floor(e)),0>e&&(e=255+e+1),this[r]=e,r+1},t.prototype.writeInt16LE=function(e,r,n){return e=+e,r>>>=0,n||w(this,e,r,2,32767,-32768),t.TYPED_ARRAY_SUPPORT?(this[r]=e,this[r+1]=e>>>8):E(this,e,r,!0),r+2},t.prototype.writeInt16BE=function(e,r,n){return e=+e,r>>>=0,n||w(this,e,r,2,32767,-32768),t.TYPED_ARRAY_SUPPORT?(this[r]=e>>>8,this[r+1]=e):E(this,e,r,!1),r+2},t.prototype.writeInt32LE=function(e,r,n){return e=+e,r>>>=0,n||w(this,e,r,4,2147483647,-2147483648),t.TYPED_ARRAY_SUPPORT?(this[r]=e,this[r+1]=e>>>8,this[r+2]=e>>>16,this[r+3]=e>>>24):v(this,e,r,!0),r+4},t.prototype.writeInt32BE=function(e,r,n){return e=+e,r>>>=0,n||w(this,e,r,4,2147483647,-2147483648),0>e&&(e=4294967295+e+1),t.TYPED_ARRAY_SUPPORT?(this[r]=e>>>24,this[r+1]=e>>>16,this[r+2]=e>>>8,this[r+3]=e):v(this,e,r,!1),r+4},t.prototype.writeFloatLE=function(t,e,r){return A(this,t,e,!0,r)},t.prototype.writeFloatBE=function(t,e,r){return A(this,t,e,!1,r)},t.prototype.writeDoubleLE=function(t,e,r){return I(this,t,e,!0,r)},t.prototype.writeDoubleBE=function(t,e,r){return I(this,t,e,!1,r)},t.prototype.copy=function(e,r,n,o){if(n||(n=0),o||0===o||(o=this.length),r>=e.length&&(r=e.length),r||(r=0),o>0&&n>o&&(o=n),o===n)return 0;if(0===e.length||0===this.length)return 0;if(0>r)throw new RangeError("targetStart out of bounds");if(0>n||n>=this.length)throw new RangeError("sourceStart out of bounds");if(0>o)throw new RangeError("sourceEnd out of bounds");o>this.length&&(o=this.length),e.length-r<o-n&&(o=e.length-r+n);var i=o-n;if(1e3>i||!t.TYPED_ARRAY_SUPPORT)for(var a=0;i>a;a++)e[a+r]=this[a+n];else e._set(this.subarray(n,n+i),r);return i},t.prototype.fill=function(t,e,r){if(t||(t=0),e||(e=0),r||(r=this.length),e>r)throw new RangeError("end < start");if(r!==e&&0!==this.length){if(0>e||e>=this.length)throw new RangeError("start out of bounds");if(0>r||r>this.length)throw new RangeError("end out of bounds");var n;if("number"==typeof t)for(n=e;r>n;n++)this[n]=t;else{var o=R(t.toString()),i=o.length;for(n=e;r>n;n++)this[n]=o[n%i]}return this}},t.prototype.toArrayBuffer=function(){if("undefined"!=typeof Uint8Array){if(t.TYPED_ARRAY_SUPPORT)return new t(this).buffer;for(var e=new Uint8Array(this.length),r=0,n=e.length;n>r;r+=1)e[r]=this[r];return e.buffer}throw new TypeError("Buffer.toArrayBuffer not supported in this browser")};var k=t.prototype;t._augment=function(e){return e.constructor=t,e._isBuffer=!0,e._set=e.set,e.get=k.get,e.set=k.set,e.write=k.write,e.toString=k.toString,e.toLocaleString=k.toString,e.toJSON=k.toJSON,e.equals=k.equals,e.compare=k.compare,e.indexOf=k.indexOf,e.copy=k.copy,e.slice=k.slice,e.readUIntLE=k.readUIntLE,e.readUIntBE=k.readUIntBE,e.readUInt8=k.readUInt8,e.readUInt16LE=k.readUInt16LE,e.readUInt16BE=k.readUInt16BE,e.readUInt32LE=k.readUInt32LE,e.readUInt32BE=k.readUInt32BE,e.readIntLE=k.readIntLE,e.readIntBE=k.readIntBE,e.readInt8=k.readInt8,e.readInt16LE=k.readInt16LE,e.readInt16BE=k.readInt16BE,e.readInt32LE=k.readInt32LE,e.readInt32BE=k.readInt32BE,e.readFloatLE=k.readFloatLE,e.readFloatBE=k.readFloatBE,e.readDoubleLE=k.readDoubleLE,e.readDoubleBE=k.readDoubleBE,e.writeUInt8=k.writeUInt8,e.writeUIntLE=k.writeUIntLE,e.writeUIntBE=k.writeUIntBE,e.writeUInt16LE=k.writeUInt16LE,e.writeUInt16BE=k.writeUInt16BE,e.writeUInt32LE=k.writeUInt32LE,e.writeUInt32BE=k.writeUInt32BE,e.writeIntLE=k.writeIntLE,e.writeIntBE=k.writeIntBE,e.writeInt8=k.writeInt8,e.writeInt16LE=k.writeInt16LE,e.writeInt16BE=k.writeInt16BE,e.writeInt32LE=k.writeInt32LE,e.writeInt32BE=k.writeInt32BE,e.writeFloatLE=k.writeFloatLE,e.writeFloatBE=k.writeFloatBE,e.writeDoubleLE=k.writeDoubleLE,e.writeDoubleBE=k.writeDoubleBE,e.fill=k.fill,e.inspect=k.inspect,e.toArrayBuffer=k.toArrayBuffer,e};var N=/[^+\/0-9A-z\-]/g}).call(e,r(2).Buffer)},function(t,e,r){(function(e){!function(){var n=r(4),o=r(1).utf8,i=r(1).bin,a=function(t,r){t.constructor==String?t=r&&"binary"===r.encoding?i.stringToBytes(t):o.stringToBytes(t):"undefined"!=typeof e&&"function"==typeof e.isBuffer&&e.isBuffer(t)?t=Array.prototype.slice.call(t,0):Array.isArray(t)||(t=t.toString());for(var u=n.bytesToWords(t),s=8*t.length,f=1732584193,h=-271733879,c=-1732584194,l=271733878,p=0;p<u.length;p++)u[p]=16711935&(u[p]<<8|u[p]>>>24)|4278255360&(u[p]<<24|u[p]>>>8);u[s>>>5]|=128<<s%32,u[(s+64>>>9<<4)+14]=s;for(var g=a._ff,d=a._gg,y=a._hh,w=a._ii,p=0;p<u.length;p+=16){var E=f,v=h,b=c,A=l;f=g(f,h,c,l,u[p+0],7,-680876936),l=g(l,f,h,c,u[p+1],12,-389564586),c=g(c,l,f,h,u[p+2],17,606105819),h=g(h,c,l,f,u[p+3],22,-1044525330),f=g(f,h,c,l,u[p+4],7,-176418897),l=g(l,f,h,c,u[p+5],12,1200080426),c=g(c,l,f,h,u[p+6],17,-1473231341),h=g(h,c,l,f,u[p+7],22,-45705983),f=g(f,h,c,l,u[p+8],7,1770035416),l=g(l,f,h,c,u[p+9],12,-1958414417),c=g(c,l,f,h,u[p+10],17,-42063),h=g(h,c,l,f,u[p+11],22,-1990404162),f=g(f,h,c,l,u[p+12],7,1804603682),l=g(l,f,h,c,u[p+13],12,-40341101),c=g(c,l,f,h,u[p+14],17,-1502002290),h=g(h,c,l,f,u[p+15],22,1236535329),f=d(f,h,c,l,u[p+1],5,-165796510),l=d(l,f,h,c,u[p+6],9,-1069501632),c=d(c,l,f,h,u[p+11],14,643717713),h=d(h,c,l,f,u[p+0],20,-373897302),f=d(f,h,c,l,u[p+5],5,-701558691),l=d(l,f,h,c,u[p+10],9,38016083),c=d(c,l,f,h,u[p+15],14,-660478335),h=d(h,c,l,f,u[p+4],20,-405537848),f=d(f,h,c,l,u[p+9],5,568446438),l=d(l,f,h,c,u[p+14],9,-1019803690),c=d(c,l,f,h,u[p+3],14,-187363961),h=d(h,c,l,f,u[p+8],20,1163531501),f=d(f,h,c,l,u[p+13],5,-1444681467),l=d(l,f,h,c,u[p+2],9,-51403784),c=d(c,l,f,h,u[p+7],14,1735328473),h=d(h,c,l,f,u[p+12],20,-1926607734),f=y(f,h,c,l,u[p+5],4,-378558),l=y(l,f,h,c,u[p+8],11,-2022574463),c=y(c,l,f,h,u[p+11],16,1839030562),h=y(h,c,l,f,u[p+14],23,-35309556),f=y(f,h,c,l,u[p+1],4,-1530992060),l=y(l,f,h,c,u[p+4],11,1272893353),c=y(c,l,f,h,u[p+7],16,-155497632),h=y(h,c,l,f,u[p+10],23,-1094730640),f=y(f,h,c,l,u[p+13],4,681279174),l=y(l,f,h,c,u[p+0],11,-358537222),c=y(c,l,f,h,u[p+3],16,-722521979),h=y(h,c,l,f,u[p+6],23,76029189),f=y(f,h,c,l,u[p+9],4,-640364487),l=y(l,f,h,c,u[p+12],11,-421815835),c=y(c,l,f,h,u[p+15],16,530742520),h=y(h,c,l,f,u[p+2],23,-995338651),f=w(f,h,c,l,u[p+0],6,-198630844),l=w(l,f,h,c,u[p+7],10,1126891415),c=w(c,l,f,h,u[p+14],15,-1416354905),h=w(h,c,l,f,u[p+5],21,-57434055),f=w(f,h,c,l,u[p+12],6,1700485571),l=w(l,f,h,c,u[p+3],10,-1894986606),c=w(c,l,f,h,u[p+10],15,-1051523),h=w(h,c,l,f,u[p+1],21,-2054922799),f=w(f,h,c,l,u[p+8],6,1873313359),l=w(l,f,h,c,u[p+15],10,-30611744),c=w(c,l,f,h,u[p+6],15,-1560198380),h=w(h,c,l,f,u[p+13],21,1309151649),f=w(f,h,c,l,u[p+4],6,-145523070),l=w(l,f,h,c,u[p+11],10,-1120210379),c=w(c,l,f,h,u[p+2],15,718787259),h=w(h,c,l,f,u[p+9],21,-343485551),f=f+E>>>0,h=h+v>>>0,c=c+b>>>0,l=l+A>>>0}return n.endian([f,h,c,l])};a._ff=function(t,e,r,n,o,i,a){var u=t+(e&r|~e&n)+(o>>>0)+a;return(u<<i|u>>>32-i)+e},a._gg=function(t,e,r,n,o,i,a){var u=t+(e&n|r&~n)+(o>>>0)+a;return(u<<i|u>>>32-i)+e},a._hh=function(t,e,r,n,o,i,a){var u=t+(e^r^n)+(o>>>0)+a;return(u<<i|u>>>32-i)+e},a._ii=function(t,e,r,n,o,i,a){var u=t+(r^(e|~n))+(o>>>0)+a;return(u<<i|u>>>32-i)+e},a._blocksize=16,a._digestsize=16,t.exports=function(t,e){if("undefined"!=typeof t){var r=n.wordsToBytes(a(t,e));return e&&e.asBytes?r:e&&e.asString?i.bytesToString(r):n.bytesToHex(r)}}}()}).call(e,r(2).Buffer)},function(t,e,r){!function(){var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",r={rotl:function(t,e){return t<<e|t>>>32-e},rotr:function(t,e){return t<<32-e|t>>>e},endian:function(t){if(t.constructor==Number)return 16711935&r.rotl(t,8)|4278255360&r.rotl(t,24);for(var e=0;e<t.length;e++)t[e]=r.endian(t[e]);return t},randomBytes:function(t){for(var e=[];t>0;t--)e.push(Math.floor(256*Math.random()));return e},bytesToWords:function(t){for(var e=[],r=0,n=0;r<t.length;r++,n+=8)e[n>>>5]|=t[r]<<24-n%32;return e},wordsToBytes:function(t){for(var e=[],r=0;r<32*t.length;r+=8)e.push(t[r>>>5]>>>24-r%32&255);return e},bytesToHex:function(t){for(var e=[],r=0;r<t.length;r++)e.push((t[r]>>>4).toString(16)),e.push((15&t[r]).toString(16));return e.join("")},hexToBytes:function(t){for(var e=[],r=0;r<t.length;r+=2)e.push(parseInt(t.substr(r,2),16));return e},bytesToBase64:function(t){for(var r=[],n=0;n<t.length;n+=3)for(var o=t[n]<<16|t[n+1]<<8|t[n+2],i=0;4>i;i++)r.push(8*n+6*i<=8*t.length?e.charAt(o>>>6*(3-i)&63):"=");return r.join("")},base64ToBytes:function(t){t=t.replace(/[^A-Z0-9+\/]/gi,"");for(var r=[],n=0,o=0;n<t.length;o=++n%4)0!=o&&r.push((e.indexOf(t.charAt(n-1))&Math.pow(2,-2*o+8)-1)<<2*o|e.indexOf(t.charAt(n))>>>6-2*o);return r}};t.exports=r}()},function(t,e,r){var n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";!function(t){"use strict";function e(t){var e=t.charCodeAt(0);return e===a||e===c?62:e===u||e===l?63:s>e?-1:s+10>e?e-s+26+26:h+26>e?e-h:f+26>e?e-f+26:void 0}function r(t){function r(t){f[c++]=t}var n,o,a,u,s,f;if(t.length%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var h=t.length;s="="===t.charAt(h-2)?2:"="===t.charAt(h-1)?1:0,f=new i(3*t.length/4-s),a=s>0?t.length-4:t.length;var c=0;for(n=0,o=0;a>n;n+=4,o+=3)u=e(t.charAt(n))<<18|e(t.charAt(n+1))<<12|e(t.charAt(n+2))<<6|e(t.charAt(n+3)),r((16711680&u)>>16),r((65280&u)>>8),r(255&u);return 2===s?(u=e(t.charAt(n))<<2|e(t.charAt(n+1))>>4,r(255&u)):1===s&&(u=e(t.charAt(n))<<10|e(t.charAt(n+1))<<4|e(t.charAt(n+2))>>2,r(u>>8&255),r(255&u)),f}function o(t){function e(t){return n.charAt(t)}function r(t){return e(t>>18&63)+e(t>>12&63)+e(t>>6&63)+e(63&t)}var o,i,a,u=t.length%3,s="";for(o=0,a=t.length-u;a>o;o+=3)i=(t[o]<<16)+(t[o+1]<<8)+t[o+2],s+=r(i);switch(u){case 1:i=t[t.length-1],s+=e(i>>2),s+=e(i<<4&63),s+="==";break;case 2:i=(t[t.length-2]<<8)+t[t.length-1],s+=e(i>>10),s+=e(i>>4&63),s+=e(i<<2&63),s+="="}return s}var i="undefined"!=typeof Uint8Array?Uint8Array:Array,a="+".charCodeAt(0),u="/".charCodeAt(0),s="0".charCodeAt(0),f="a".charCodeAt(0),h="A".charCodeAt(0),c="-".charCodeAt(0),l="_".charCodeAt(0);t.toByteArray=r,t.fromByteArray=o}(e)},function(t,e,r){e.read=function(t,e,r,n,o){var i,a,u=8*o-n-1,s=(1<<u)-1,f=s>>1,h=-7,c=r?o-1:0,l=r?-1:1,p=t[e+c];for(c+=l,i=p&(1<<-h)-1,p>>=-h,h+=u;h>0;i=256*i+t[e+c],c+=l,h-=8);for(a=i&(1<<-h)-1,i>>=-h,h+=n;h>0;a=256*a+t[e+c],c+=l,h-=8);if(0===i)i=1-f;else{if(i===s)return a?0/0:(p?-1:1)*(1/0);a+=Math.pow(2,n),i-=f}return(p?-1:1)*a*Math.pow(2,i-n)},e.write=function(t,e,r,n,o,i){var a,u,s,f=8*i-o-1,h=(1<<f)-1,c=h>>1,l=23===o?Math.pow(2,-24)-Math.pow(2,-77):0,p=n?0:i-1,g=n?1:-1,d=0>e||0===e&&0>1/e?1:0;for(e=Math.abs(e),isNaN(e)||e===1/0?(u=isNaN(e)?1:0,a=h):(a=Math.floor(Math.log(e)/Math.LN2),e*(s=Math.pow(2,-a))<1&&(a--,s*=2),e+=a+c>=1?l/s:l*Math.pow(2,1-c),e*s>=2&&(a++,s/=2),a+c>=h?(u=0,a=h):a+c>=1?(u=(e*s-1)*Math.pow(2,o),a+=c):(u=e*Math.pow(2,c-1)*Math.pow(2,o),a=0));o>=8;t[r+p]=255&u,p+=g,u/=256,o-=8);for(a=a<<o|u,f+=o;f>0;t[r+p]=255&a,p+=g,a/=256,f-=8);t[r+p-g]|=128*d}},function(t,e,r){var n=Array.isArray,o=Object.prototype.toString;t.exports=n||function(t){return!!t&&"[object Array]"==o.call(t)}}]);