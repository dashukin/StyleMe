'use strict';

import StyleMe from './app/StyleMe';

var styleMe = new StyleMe({
	onConfigurationLoaded: function () {
		this.updateCSS();
		chrome.runtime.sendMessage({msg: 'enableBrowserAction'}, (response) => {
			//console.log(response);
		});
	},
	onConfigurationSaved: function () {
		this.updateCSS();
	}
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

	let action = request.action;

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