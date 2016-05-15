'use strict';

import 'babel-polyfill';
import StyleMe from './app/StyleMe';
import AppConstants from './constants/constants';
import ConfigurationService from './services/configuration-service';

const ConfigurationServiceInstance = new ConfigurationService({
	isContentScript: true
});

// run initial configuration
ConfigurationServiceInstance.getConfiguration()
	.then(configurationJSON => {
		StyleMe.applyConfiguration(JSON.parse(configurationJSON));
	});


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

	let {action} = request;

	switch (action) {

		case AppConstants.APPLY_CONFIGURATION:

			StyleMe.applyConfiguration(request.configuration);

			sendResponse({
				success: true
			});

			break;

		case AppConstants.GET_ORIGINAL_STYLESHEETS:

			sendResponse(StyleMe.getOriginalStyleSheets());

			break;

	}

	
});