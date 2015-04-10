'use strict';

var StyleMe = require('./app/StyleMe');

var styleMe = new StyleMe({
	onConfigurationLoaded: function () {
		this.updateCSS();
		chrome.runtime.sendMessage({msg: 'enableBrowserAction'}, function(response) {
			//console.log(response);
		});
	},
	onConfigurationSaved: function () {
		this.updateCSS();
	}
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	var action = request.action;
	if (action === 'getConfiguration') {
		sendResponse({
			status: true,
			configurationData: styleMe.configurationData
		});
	} else if (action === 'saveConfiguration') {
		styleMe.updateConfiguration(request.data, function () {
			styleMe.saveConfiguration();
		});
		sendResponse({
			status: true
		});
	}
});