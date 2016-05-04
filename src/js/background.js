/*
* Background script
* */

'use strict';

chrome.runtime.onInstalled.addListener((details) => {
  console.info('previousVersion', details.previousVersion);
});

//chrome.browserAction.disable();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	chrome.browserAction.enable(sender.tab.id);
	sendResponse({
		response: true
	});
});
