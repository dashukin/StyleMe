
'use strict';

import MD5 from 'MD5';

class StyleMe {

	constructor () {

		this.configuration = null;

		this.documentHead = document.getElementsByTagName('head')[0];
		this.appAttribute = 'data-style-me';

		this.originalStylesheets = Array.prototype.filter.call(document.styleSheets, stylesheet => {
			return !stylesheet['ownerNode'].hasAttribute(this.appAttribute);
		}).reduce((collection, stylesheet) => {

			if (typeof stylesheet.href === 'string') {

				let	stylesheetKey = MD5(stylesheet['ownerNode'].getAttribute('href'));

				collection[stylesheetKey] = stylesheet['ownerNode'];
			}

			return collection;

		}, {});

		this.injectedStyleSheets = {};

		this.autoUpdateIntervals = {};

	}

	applyConfiguration (configuration) {

		this.configuration = configuration;

		this.processConfiguration();

	}

	processConfiguration () {

		let configuration = this.configuration;

		if (!(Object.prototype.toString.call(configuration).slice(8, -1) === 'Object')) {
			return;
		}

		let {enable} = configuration;

		this.destroy();

		if (enable) {
			this.init();
		}

	}

	removeStylesheets () {

		let injectedStyleSheets = this.injectedStyleSheets;

		let originalStyleSheets = this.originalStylesheets;

		for (let stylesheet in injectedStyleSheets) {
			if (injectedStyleSheets.hasOwnProperty(stylesheet)) {

				let injectedStylesheet = injectedStyleSheets[stylesheet].node;

				if (injectedStylesheet && injectedStylesheet.parentNode !== null) {

					// remove injected stylesheets from document and delete all stored links to them
					injectedStylesheet.parentNode.removeChild(injectedStylesheet);
					delete injectedStyleSheets[stylesheet];

				}
			}
		}

		for (let styleSheetKey in originalStyleSheets) {
			if (originalStyleSheets.hasOwnProperty(styleSheetKey)) {
				this.toggleOriginalStylesheet(styleSheetKey, true);
			}
		}



	}

	createStylesheets () {

		let {styleSheets} = this.configuration;

		styleSheets.forEach(styleSheet => {

			// create new styleSheet
			let newStylesheet = document.createElement('link');

			newStylesheet.setAttribute('rel', 'stylesheet');
			newStylesheet.setAttribute('type', 'text/css');
			newStylesheet.setAttribute(this.appAttribute, 'true');
			newStylesheet.setAttribute('href', styleSheet.src);

			this.documentHead.appendChild(newStylesheet);
			this.injectedStyleSheets[styleSheet.key] = {
				node: newStylesheet,
				src: styleSheet.src
			};

			if (styleSheet.overrideOriginal === true) {
				this.toggleOriginalStylesheet(MD5(styleSheet.src), false);
			}

		});

	}

	toggleOriginalStylesheet (styleSheetKey, enable) {

		let originalStyleSheets = this.originalStylesheets;

		if (originalStyleSheets.hasOwnProperty(styleSheetKey)) {

			if (enable) {
				originalStyleSheets[styleSheetKey].removeAttribute('disabled');
			} else {
				originalStyleSheets[styleSheetKey].setAttribute('disabled', 'disabled');
			}

		}

	}

	init () {

		this.createStylesheets();

		this.processAutoUpdate();

	}

	processAutoUpdate () {

		let {enable, autoUpdate} = this.configuration;

		let enableAutoUpdate = enable && autoUpdate;

		let injectedStyleSheets = this.injectedStyleSheets;

		for (let styleSheetKey in injectedStyleSheets) {
			if (injectedStyleSheets.hasOwnProperty(styleSheetKey)) {

				this.handleAutoUpdateInterval(styleSheetKey, enableAutoUpdate);

			}
		}

	}

	handleAutoUpdateInterval (styleSheetKey, enable) {

		let autoUpdateIntervals = this.autoUpdateIntervals;
		let injectedStyleSheets = this.injectedStyleSheets;
		let {updateFrequency} = this.configuration;

		if (autoUpdateIntervals.hasOwnProperty(styleSheetKey)) {

			window.clearInterval(autoUpdateIntervals[styleSheetKey]);

		}

		if (enable === true) {

			let updateIntervalValue = parseInt(updateFrequency, 10) * 1000;

			autoUpdateIntervals[styleSheetKey] = window.setInterval(() => {

				let injectedStyleSheetData = injectedStyleSheets[styleSheetKey];

				let injectedStyleSheet = injectedStyleSheetData.node;

				let timestamp = (!!~injectedStyleSheetData.src.indexOf('?') ? '&' : '?') + 'timestamp=' + (new Date()).getTime();

				injectedStyleSheet.setAttribute('href', injectedStyleSheetData.src + timestamp);

			}, updateIntervalValue);
		}


	}

	removeAutoUpdateIntervals () {

		let autoUpdateIntervals = this.autoUpdateIntervals;

		for (let styleSheetKey in autoUpdateIntervals) {
			if (autoUpdateIntervals.hasOwnProperty(styleSheetKey)) {
				this.handleAutoUpdateInterval(styleSheetKey, false);
			}
		}

	}

	destroy () {

		this.removeAutoUpdateIntervals();

		this.removeStylesheets();

	}


}

export default new StyleMe();