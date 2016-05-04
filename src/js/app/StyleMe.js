'use strict';

var Helper, md5, StyleMe;

Helper = require('./Helper');
md5 = require('MD5');

StyleMe = function StyleMe (options) {
	if (!(this instanceof StyleMe)) {
		return new StyleMe(options)
	}
	var self = this;

	self.tab = null;
	self.tabKey = null;
	self.configurationKey = null;

	self.configurationData = {
		enable: false,
		updateFrequency: 2,
		autoupdate: false,
		stylesheets: []
	};

	self.addedStylesheets = {};

	self.autoupdateInterval = null;

	self.onConfigurationLoaded = Helper.isFunction(options.onConfigurationLoaded) ? options.onConfigurationLoaded : null;
	self.onConfigurationSaved = Helper.isFunction(options.onConfigurationSaved) ? options.onConfigurationSaved : null;

	self.getTabUrlKey(function () {
		self.loadConfiguration();
	});

};

StyleMe.prototype.getTabUrlKey = function (callback) {
	var self = this;
	self.tabKey = md5(document.location.host);
	self.configurationKey = 'styleMe-' + self.tabKey;
	Helper.isFunction(callback) && callback.call(self);
};

StyleMe.prototype.loadConfiguration = function () {
	var self = this;

	chrome.storage.local.get(self.configurationKey, function (data) {
		var _configurationData, p;
		if (data && data.hasOwnProperty(self.configurationKey)) {
			_configurationData = JSON.parse(data[self.configurationKey]);
			if (Object.prototype.toString.call(_configurationData).slice(8, -1) === 'Object') {
				for (p in _configurationData) {
					if (_configurationData.hasOwnProperty(p) && self.configurationData.hasOwnProperty(p)) {
						self.configurationData[p] = _configurationData[p];
					}
				}
			} else {
				console.warn('loadConfiguration: data is not an object. ' + typeof data + ' given.');
			}
		}
		self.onConfigurationLoaded && self.onConfigurationLoaded.call(self);

	});
};

StyleMe.prototype.updateConfiguration = function (data, callback) {
	if (!Helper.isObject(data)) {
		console.warn('StyleMe.updateConfiguration: invalid type of argument - ' + typeof data);
		return;
	}
	var self = this,
		configurationData = self.configurationData,
		p;
	for (p in data) {
		if (data.hasOwnProperty(p) && configurationData.hasOwnProperty(p)) {
			configurationData[p] = data[p];
		}
	}
	Helper.isFunction(callback) && callback.call(self);

};

StyleMe.prototype.saveConfiguration = function () {
	var self = this,
		configurationDataJSON = JSON.stringify(self.configurationData),
		dataToSave = {};

	dataToSave[self.configurationKey] = configurationDataJSON;

	chrome.storage.local.set(dataToSave, function () {
		self.onConfigurationSaved && self.onConfigurationSaved.call(self);
	});
};

StyleMe.prototype.updateCSS = function () {
	var self = this,
		stylesheets = self.configurationData.stylesheets,
		autoupdate = self.configurationData.autoupdate;


	self.configurationData.enable && stylesheets.forEach(function (stylesheetData) {
		self.processCSS(stylesheetData.href, stylesheetData.key);
	});

	self.clearUnusedStylesheets();
	self.processAutoupdate();

	if (self.configurationData.enable === false) {
		// turn off stylesheets
		self.disableStylesheets(true);
	} else {
		// turn on stylesheets
		self.disableStylesheets(false);
	}
};
StyleMe.prototype.disableStylesheets = function (status) {
	var self = this,
		addedStylesheets = self.addedStylesheets,
		s, stylesheet;

	status = !!status;

	for (s in addedStylesheets) {
		if (addedStylesheets.hasOwnProperty(s)) {
			stylesheet = document.getElementById(s);
			if (stylesheet) {
				status ? stylesheet.setAttribute('disabled', '') : stylesheet.removeAttribute('disabled');
			}
		}
	}
};

StyleMe.prototype.processAutoupdate = function () {
	var self = this,
		stylesheets = self.configurationData.stylesheets;

	if ((self.configurationData.enable === true) && (self.configurationData.autoupdate === true)) {
		self.autoupdateInterval = setInterval(function () {
			stylesheets.forEach(function (stylesheetData) {
				self.processCSS(stylesheetData.href, stylesheetData.key);
			});
		}, self.configurationData.updateFrequency * 1000);
	} else {
		self.autoupdateInterval && clearInterval(self.autoupdateInterval);
		self.autoupdateInterval = null;
	}
};

StyleMe.prototype.clearUnusedStylesheets = function () {
	var self = this,
		stylesheets = self.configurationData.stylesheets,
		addedStylesheets = self.addedStylesheets,
		stylesheetsKeys = {},
		s, stylesheet;

	stylesheets.forEach(function (stylesheetData) {
		stylesheetsKeys[stylesheetData.key] = true;
	});

	for (s in addedStylesheets) {
		if (addedStylesheets.hasOwnProperty(s) && !stylesheetsKeys.hasOwnProperty(s)) {
			stylesheet = document.getElementById(s);
			stylesheet && stylesheet.parentNode.removeChild(stylesheet);
		}
	}
};

StyleMe.prototype.processCSS = (function () {
	var head = document.getElementsByTagName('head')[0];

	return function (href, id) {
		var self = this,
			link, timeStamp;

		timeStamp = (new Date()).getTime();
		href += (!!~href.indexOf('?') ? '&' : '?') + 'timestamp=' + timeStamp;

		link = document.getElementById(id);
		if (!link) {
			(link = document.createElement('link'));
			link.rel = 'stylesheet';
			link.type = 'text/css';
			link.href = href;
			link.id = id;
			head.appendChild(link);

			self.addedStylesheets[id] = true;

		} else {
			link.href = href;
		}

		head.appendChild(link);
	}
}());

export default StyleMe;