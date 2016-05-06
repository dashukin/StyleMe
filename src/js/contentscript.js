'use strict';

import StyleMe from './app/StyleMe';

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

	var action = request.action;

	switch (action) {

		case 'applyConfiguration':

			StyleMe.applyConfiguration(request.configuration);

			sendResponse({
				success: true
			});

			break;

	}

	
});