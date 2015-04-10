'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  console.info('previousVersion', details.previousVersion);
});

chrome.browserAction.disable();

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	chrome.browserAction.enable(sender.tab.id);
	sendResponse({
		response: true
	})
});

