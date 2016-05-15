/**
 * Configuration service for handling App configuration storage
 */

import MD5 from 'MD5';

class ConfigurationService {

	constructor (props = {}) {
		this.isContentScript = props.isContentScript || false;
		this.configurationKey = null;
	}

	createConfigurationKey () {

		return new Promise((resolve, reject) => {

			if (this.isContentScript) {

				this.configurationKey = MD5(document.location.host);

				resolve();

			} else {

				chrome.tabs.getSelected(null, (tab) => {

					let tabUrl = tab.url;
					let linkParser = document.createElement('a');
					linkParser.href = tabUrl;

					this.configurationKey = MD5(linkParser.host);

					resolve();

				});
			}

		});

	}

	getConfiguration () {

		return new Promise((resolve, reject) => {

			let {configurationKey} = this;

			if (configurationKey) {
				this.getFromStorage().then(configurationJSON => {
					resolve(configurationJSON);
				});
			} else {
				this.createConfigurationKey().then(() => {
					this.getFromStorage().then(configurationJSON => {
						resolve(configurationJSON);
					});
				});
			}
		});

	}

	saveConfiguration (configurationJSON) {

		return new Promise((resolve, reject) => {

			let {configurationKey} 	= this;

			if (configurationKey) {
				this.setToStorage(configurationJSON).then(() => {
					resolve();
				});
			} else {
				this.createConfigurationKey().then(() => {
					this.setToStorage(configurationJSON).then(() => {
						resolve();
					});
				});
			}
		});

	}

	getFromStorage () {

		return new Promise((resolve, reject) => {

			let {configurationKey} = this;

			chrome.storage.local.get(configurationKey, data => {

				if (data.hasOwnProperty(configurationKey)) {
					resolve(data[configurationKey]);
				}

			});

		});

	}

	setToStorage (cofigurationJSON) {

		return new Promise((resolve, reject) => {

			let {configurationKey} = this;

			let configurationObject = {};

			configurationObject[configurationKey] = cofigurationJSON;

			chrome.storage.local.set(configurationObject, () => {
				resolve();
			});

		});

	}

}

export default ConfigurationService;