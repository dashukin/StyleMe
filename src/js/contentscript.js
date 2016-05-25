'use strict';

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import AppActions from './actions/actions';
import StyleMe from './app/StyleMe';
import AppConstants from './constants/constants';
import ConfigurationService from './services/configuration-service';

const ConfigurationServiceInstance = new ConfigurationService({
	isContentScript: true
});

// create app holder to render StyleMe in
let styleMeHolder = document.createElement('div');
styleMeHolder.className = 'styleme-extension';
document.body.appendChild(styleMeHolder);
ReactDOM.render(<StyleMe/>, styleMeHolder);

// run initial configuration
ConfigurationServiceInstance.getConfiguration()
	.then(configurationJSON => {
		AppActions.applyConfiguration(JSON.parse(configurationJSON));
	});

// create listener to handle popup messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

	let {action} = request;

	switch (action) {

		case AppConstants.APPLY_CONFIGURATION:

			AppActions.applyConfiguration(request.configuration);

			sendResponse({
				success: true
			});

			break;

		case AppConstants.GET_ORIGINAL_STYLESHEETS:


			AppActions.getOriginalStyleSheets(originalStyleSheets => {
				sendResponse(originalStyleSheets);
			});

			break;

	}

	
});