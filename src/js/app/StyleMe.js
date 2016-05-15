
'use strict';

import MD5 from 'MD5';

class StyleMe {

	constructor () {

		this.configuration = null;

		this.documentHead = document.getElementsByTagName('head')[0];
		this.appAttribute = 'data-style-me';

		this.originalStyleSheets = Array.prototype.filter.call(document.styleSheets, styleSheet => {
			// exclude injected stylesheets and those that have been disabled by default
			return !styleSheet['ownerNode'].hasAttribute(this.appAttribute) && !styleSheet['ownerNode'].disabled;
		}).reduce((collection, styleSheet) => {

			if (typeof styleSheet.href === 'string') {

				let	styleSheetKey = MD5(styleSheet['ownerNode'].getAttribute('href'));

				collection[styleSheetKey] = {
					node: styleSheet['ownerNode'],
					src: styleSheet['ownerNode'].getAttribute('href')
				};
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

		let {configuration} = this;

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

		let {injectedStyleSheets, originalStyleSheets} = this;

		// remove all injected stylesheets
		for (let styleSheet in injectedStyleSheets) {
			if (injectedStyleSheets.hasOwnProperty(styleSheet)) {

				let injectedStylesheet = injectedStyleSheets[styleSheet].node;

				if (injectedStylesheet && injectedStylesheet.parentNode !== null) {

					// remove injected stylesheets from document and delete all stored links to them
					injectedStylesheet.parentNode.removeChild(injectedStylesheet);
					delete injectedStyleSheets[styleSheet];

				}
			}
		}

		// restore disabled attribute on original stylesheets
		for (let styleSheetKey in originalStyleSheets) {
			if (originalStyleSheets.hasOwnProperty(styleSheetKey)) {
				this.toggleOriginalStyleSheet(styleSheetKey, true);
			}
		}



	}

	createStylesheets () {

		let {styleSheets} = this.configuration;

		styleSheets.forEach(styleSheet => {

			if (!styleSheet.src) {
				return;
			}

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
				this.toggleOriginalStyleSheet(MD5(styleSheet.src), false);
			}

			if (styleSheet.ignoredStyleSheet.length) {
				this.toggleOriginalStyleSheet(MD5(styleSheet.ignoredStyleSheet), false);
			}

		});

	}

	toggleOriginalStyleSheet (styleSheetKey, enable) {

		let {originalStyleSheets} = this;

		if (originalStyleSheets.hasOwnProperty(styleSheetKey)) {

			if (enable) {
				originalStyleSheets[styleSheetKey].node.removeAttribute('disabled');
			} else {
				originalStyleSheets[styleSheetKey].node.setAttribute('disabled', 'disabled');
			}

		}

	}

	init () {

		this.createStylesheets();

		this.processAutoUpdate();

	}

	getOriginalStyleSheets () {

		let {originalStyleSheets} = this;

		return Object.keys(originalStyleSheets).reduce((collection, styleSheetKey) => {
				collection.push({
					key: styleSheetKey,
					src: originalStyleSheets[styleSheetKey].src
				});
				return collection;
			}, []);
	}

	processAutoUpdate () {

		let {enable, autoUpdate} = this.configuration;

		let enableAutoUpdate = enable && autoUpdate;

		let {injectedStyleSheets} = this;

		for (let styleSheetKey in injectedStyleSheets) {
			if (injectedStyleSheets.hasOwnProperty(styleSheetKey)) {

				this.handleAutoUpdateInterval(styleSheetKey, enableAutoUpdate);

			}
		}

	}

	handleAutoUpdateInterval (styleSheetKey, enable) {

		let {autoUpdateIntervals, injectedStyleSheets} = this;

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

		let {autoUpdateIntervals} = this;

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