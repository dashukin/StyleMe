'use strict';

var md5 = require('MD5');

createTabs();

// DOM elements
var configurationForm = ge('configuration-form'),
	autoUpdateCheckbox = ge('autoupdate'),
	enableCheckbox = ge('enable'),
	frequencyInput = ge('update-frequency'),
	saveStatusSuccess = ge('save-status-success'),
	stylesheetsList = ge('stylesheets-list'),
	addStylesheet = ge('add-stylesheet');

var configurationData = {
	enable: false,
	updateFrequency: 2,
	autoupdate: false,
	stylesheets: []
};


// load configuration
sendMessage({action: 'getConfiguration'}, function (data) {
	if (data && data.status === true) {
		var cData = data.configurationData,
			stylesheets = cData.stylesheets,
			firstStylesheetHref,
			firstListInput = stylesheetsList.querySelector('li>input');

		cData.enable && enableCheckbox.setAttribute('checked', 'checked');
		cData.autoupdate && autoUpdateCheckbox.setAttribute('checked', 'checked');

		configurationData.enable = cData.enable;
		configurationData.autoupdate = cData.autoupdate;

		frequencyInput.value = cData.updateFrequency;

		firstStylesheetHref = stylesheets.splice(0, 1);
		firstStylesheetHref.length && (firstListInput.value = firstStylesheetHref[0].href);

		stylesheets.forEach(function (stylesheetData) {
			createStylesheetInput(stylesheetData.href);
		});
	}
});


// add event listeners for user actions
enableCheckbox.addEventListener('change', function () {
	this.checked ? this.setAttribute('checked', '') : this.removeAttribute('checked');
	configurationData.enable = this.checked;
}, false);
autoUpdateCheckbox.addEventListener('change', function () {
	this.checked ? this.setAttribute('checked', '') : this.removeAttribute('checked');
	configurationData.autoupdate = this.checked;
}, false);
frequencyInput.addEventListener('change', function () {
	var frequency = /^\d+$/.test(this.value) ? this.value : 1;
	configurationData.updateFrequency = frequency;
}, false);

configurationForm.addEventListener('submit', function (e) {
	collectStylesheets();
	saveConfiguration();
	e.preventDefault();
	return false;
}, false);

addStylesheet.addEventListener('click', function (e) {
	e.preventDefault();
	createStylesheetInput();
}, false);

document.addEventListener('click', function (e) {
	var self = e.target.nodeName === 'A' ? e.target : e.target.parentNode;
	if (self.nodeName === 'A' && self.classList.contains('remove-stylesheet-link')) {
		e.preventDefault();
		removeStylesheetInput.call(self);
	}
}, false);

function createStylesheetInput (href) {
	var listItem, input, removeLink, removeIcon;;

	listItem = document.createElement('li');
	input = document.createElement('input');
	input.type = 'text';
	input.className = 'form-control';
	input.placeholder = 'path/to/css';
	href && (input.value = href);

	removeIcon = document.createElement('span');
	removeIcon.className = 'mdi-content-clear';

	removeLink = document.createElement('a');
	removeLink.className = 'remove-stylesheet-link';
	removeLink.href = '#';
	removeLink.appendChild(removeIcon);

	listItem.appendChild(input);
	listItem.appendChild(removeLink);
	stylesheetsList.appendChild(listItem);
};

function removeStylesheetInput (listItem) {
	var self = this,
		listItem = listItem || self.parentNode;
	listItem.parentNode.removeChild(listItem);
}

function collectStylesheets () {
	var styleSheetsData = [],
		styleSheetInputs = Array.prototype.slice.call(stylesheetsList.querySelectorAll('input[type=text]'));

	styleSheetInputs.forEach(function (input, i) {
		var stylesheetHref = input.value;
		if (stylesheetHref.length) {
			styleSheetsData.push({
				href: stylesheetHref,
				key: md5(stylesheetHref)
			});
		} else {
			// remove empty inputs except the first one
			(i !== 0) && removeStylesheetInput(input.parentNode);
		}

		configurationData.stylesheets = styleSheetsData;
	});
};

function saveConfiguration () {
	sendMessage({
		action: 'saveConfiguration',
		data: configurationData
	}, function (response) {
		if (response.status === true) {
			saveStatusSuccess.classList.add('visible');
			setTimeout(function () {
				saveStatusSuccess && saveStatusSuccess.classList.remove('visible');
			}, 2000);
		}
	});
}


function createTabs () {
	document.addEventListener('click', (function () {
		var tabLinks = Array.prototype.slice.call(document.querySelectorAll('.tab-link')),
			tabs = Array.prototype.slice.call(document.querySelectorAll('.tab'));
		return function (e) {
			var self = e.target,
				targetTab;
			if (self.nodeName !== 'A' || !self.classList.contains('tab-link')) return;
			targetTab = document.querySelector(self.getAttribute('href'));
			if (!targetTab) return;
			tabs.forEach(function (tab) {
				tab.classList.remove('active');
			});
			tabLinks.forEach(function (tabLink) {
				tabLink.classList.remove('active');
			});
			targetTab.classList.add('active');
			self.classList.add('active');

		}
	}()), false);
};

function sendMessage (data, callback) {
	data = Object.prototype.toString.call(data).slice(8, -1) === 'Object' ? data : {};

	chrome.tabs.getSelected(null, function(tab) {
		chrome.tabs.sendMessage(tab.id, data, function(response) {
			(typeof callback === 'function') && callback.call(null, response);
		});

	});
};

function ge (id) {
	return document.getElementById(id);
}


