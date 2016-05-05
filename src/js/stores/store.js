/**
 * App store
 */

import {EventEmitter} from 'events';
import AppDispatcher from '../dispatchers/dispatcher';
import AppConstants from '../constants/constants';
import {Map} from 'immutable';
import MD5 from 'MD5';

class AppStore extends EventEmitter {

	constructor (props) {

		super(props);
		
		this.storeData = Map({
			configuration: Map({
				enable: false,
				updateFrequency: 2,
				autoupdate: false,
				stylesheets: []
			}),
			// TODO: move to react-router
			viewType: 'stylesheets', // stylesheets, options
			configurationKey: null
		});



		AppDispatcher.register(({actionType, payload}) => {

			switch (actionType) {

				case AppConstants.SWITCH_VIEW:

					this.switchView(payload.viewType);

					break;

				case AppConstants.GET_CONFIGURATION:

					this.getConfiguration();

					break;

				case AppConstants.SAVE_CONFIGURATION:

					this.saveConfiguration();

					break;

				case AppConstants.ADD_FIELD:

					this.addField();

					break;

				case AppConstants.REMOVE_FIELD:

					this.removeField(payload.key);

					break;

				case AppConstants.ADD_INPUT_VALUE:

					this.addInputValue({
						key: 	payload.key,
						value: 	payload.value
					});

					break;
			}

		});

		this.getConfiguration();

	}
	
	addChangeListener = handler => {

		this.on(AppConstants.CHANGE_EVENT, handler);

	}

	removeChangeListener = handler => {

		this.removeListener(AppConstants.CHANGE_EVENT, handler);

	}

	emitChange () {

		this.emit(AppConstants.CHANGE_EVENT);

	}

	switchView (viewType) {

		this.storeData = this.storeData.update('viewType', () => viewType);

		this.emitChange();

	}

	/**
	 * Retrieve configuration from localStorage
	 */
	getConfiguration () {

		let configurationKey = this.storeData.get('configurationKey');

		if (configurationKey) {
			this.getFromStorage(configurationData => {
				this.processConfiguration(configurationData);
			});
		} else {
			this.createConfigurationKey(() => {
				this.getFromStorage(configurationData => {
					this.processConfiguration(configurationData);
				});
			});
		}

	}

	processConfiguration (configurationData) {

		let configurationKey = this.storeData.get('configurationKey');

		if (configurationData.hasOwnProperty(configurationKey)) {
			let configuration = JSON.parse(configurationData[configurationKey]);
			this.storeData = this.storeData.update('configuration', c => Map(configuration));
			console.log(this.storeData.get('configuration'));
			this.emitChange();
		} else {
			console.error('1');
		}

	}

	/**
	 * Save configuration to localStorage
	 */
	saveConfiguration () {

		console.log('save configuration');

		let self = this;

		// let configurationKey = this.configurationKey;
		//
		// let configurationObject = {};
		// configurationObject[configurationKey] = configuration;
		//
		// chrome.storage.local.set(configurationObject, () => {
		// 	();
		// });

		let configurationKey 	= 	this.storeData.get('configurationKey');
		let configuration 		= 	this.storeData.get('configuration');
		let configurationJSON 	= 	JSON.stringify(configuration);

		if (configurationKey) {
			this.setToStorage(configurationJSON, () => {

			});
		} else {
			this.createConfigurationKey(() => {
				this.setToStorage(configurationJSON, () => {

				});
			});
		}

	}

	createConfigurationKey (callback) {

		chrome.tabs.getSelected(null, (tab) => {

			console.log('selected tab', tab);

			let tabUrl = tab.url;
			let linkParser = document.createElement('a');
			linkParser.href = tabUrl;

			this.storeData = this.storeData.update('configurationKey', c => MD5(linkParser.host));

			callback();

		});
	}

	getFromStorage (callback) {

		let configurationKey = this.storeData.get('configurationKey');

		chrome.storage.local.get(configurationKey, (data) => {
			callback.call(null, data);
		});

	}

	setToStorage (cofigurationJSON, callback) {

		let configurationKey = this.storeData.get('configurationKey');

		let configurationObject = {};
		configurationObject[configurationKey] = cofigurationJSON;

		chrome.storage.local.set(configurationObject, () => {
			callback();
		});

	}

	__sendMessage ({payload, callback}) {

		console.log('sendMessage');

		chrome.tabs.getSelected(null, (tab) => {

			chrome.tabs.sendMessage(tab.id, payload, response => {

				console.log('__sendMessage response', response);

				if (typeof callback === 'function') {
					callback.call(null, response);
				}

			});

		});

	}

	addField () {

		let stylesheetModel = {
			src: '',
			overrideOriginal: false,
			key: '' + Math.floor(Math.random() * 10e7) + (new Date()).getTime()
		};

		this.storeData = this.storeData.updateIn(['configuration', 'stylesheets'], stylesheets => {
			return stylesheets.push(stylesheetModel), stylesheets
		});

		this.emitChange();
	}

	removeField (key) {

		this.storeData = this.storeData.updateIn(['configuration', 'stylesheets'], stylesheets => {

			let stylesheetIndex = stylesheets.findIndex(stylesheet => {
				return stylesheet.key === key;
			});

			if (!!~stylesheetIndex) {
				stylesheets.splice(stylesheetIndex, 1);
			}

			return stylesheets;

		});

		this.emitChange();

	}

	addInputValue ({key, value}) {

		this.storeData = this.storeData.updateIn(['configuration', 'stylesheets'], stylesheets => {

			let stylesheetIndex = stylesheets.findIndex(stylesheet => {
				return stylesheet.key === key;
			});

			if (!!~stylesheetIndex) {
				stylesheets[stylesheetIndex].src = value;
			}

			return stylesheets;

		});

		this.emitChange();

	}

	getStoreData () {

		return this.storeData;

	}

}

export default new AppStore();
