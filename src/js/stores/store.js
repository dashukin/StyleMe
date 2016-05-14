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
				autoUpdate: false,
				updateFrequency: 2,
				styleSheets: []
			}),
			viewType: 'stylesheets', // stylesheets || options
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

				case AppConstants.SET_ENABLE:

					this.setEnable(payload.enable);

					break;

				case AppConstants.SET_AUTO_UPDATE:

					this.setAutoUpdate(payload.autoUpdate);

					break;

				case AppConstants.SET_UPDATE_FREQUENCY:

					this.setUpdateFrequency(payload.updateFrequency);

					break;
			}

		});

		this.getConfiguration().then(() => {
			this.applyConfiguration();
		});

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

		return new Promise((resolve, reject) => {

			let configurationKey = this.storeData.get('configurationKey');

			if (configurationKey) {
				this.getFromStorage().then(configurationData => {
					this.processConfiguration(configurationData);
					resolve();
				});
			} else {
				this.createConfigurationKey().then(() => {
					this.getFromStorage().then(configurationData => {
						this.processConfiguration(configurationData);
						resolve();
					});
				});
			}
		});

	}

	processConfiguration (configurationData) {

		let configurationKey = this.storeData.get('configurationKey');

		if (configurationData.hasOwnProperty(configurationKey)) {
			let configuration = JSON.parse(configurationData[configurationKey]);
			this.storeData = this.storeData.update('configuration', c => Map(configuration));
			this.emitChange();
		}

	}

	/**
	 * Save configuration to localStorage
	 */
	saveConfiguration () {

		let configurationKey 	= 	this.storeData.get('configurationKey');
		let configuration 		= 	this.storeData.get('configuration');
		let configurationJSON 	= 	JSON.stringify(configuration);

		if (configurationKey) {
			this.setToStorage(configurationJSON).then(() => {
				this.applyConfiguration()
			});
		} else {
			this.createConfigurationKey().then(() => {
				this.setToStorage(configurationJSON).then(() => {
					this.applyConfiguration();
				});
			});
		}

	}

	applyConfiguration () {

		let self = this;

		this.__sendMessage({
			payload: {
				action: 'applyConfiguration',
				configuration: self.storeData.get('configuration').toObject()
			}
		}).then((r) => console.log(r));

	}

	createConfigurationKey () {

		return new Promise((resolve, reject) => {

			chrome.tabs.getSelected(null, (tab) => {

				let tabUrl = tab.url;
				let linkParser = document.createElement('a');
				linkParser.href = tabUrl;

				this.storeData = this.storeData.update('configurationKey', c => MD5(linkParser.host));

				resolve();

			});

		});

	}

	getFromStorage () {

		return new Promise((resolve, reject) => {

			let configurationKey = this.storeData.get('configurationKey');

			chrome.storage.local.get(configurationKey, (data) => {
				resolve(data);
			});

		});

	}

	setToStorage (cofigurationJSON) {

		return new Promise((resolve, reject) => {

			let configurationKey = this.storeData.get('configurationKey');

			let configurationObject = {};
			
			configurationObject[configurationKey] = cofigurationJSON;

			chrome.storage.local.set(configurationObject, () => {
				resolve();
			});

		});

	}

	__sendMessage ({payload}) {

		return new Promise((resolve, reject) => {

			chrome.tabs.getSelected(null, (tab) => {

				chrome.tabs.sendMessage(tab.id, payload, response => {

					resolve(response);

				});

			});
		});

	}

	addField () {

		let stylesheetModel = {
			src: '',
			overrideOriginal: true,
			key: '' + Math.floor(Math.random() * 10e7) + (new Date()).getTime()
		};

		this.storeData = this.storeData.updateIn(['configuration', 'styleSheets'], stylesheets => {
			return stylesheets.push(stylesheetModel), stylesheets
		});

		this.emitChange();
	}

	removeField (key) {

		this.storeData = this.storeData.updateIn(['configuration', 'styleSheets'], stylesheets => {

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

		this.storeData = this.storeData.updateIn(['configuration', 'styleSheets'], styleSheets => {

			let stylesheetIndex = styleSheets.findIndex(stylesheet => {
				return stylesheet.key === key;
			});

			if (!!~stylesheetIndex) {
				styleSheets[stylesheetIndex].src = value;
			}

			return styleSheets;

		});

		this.emitChange();

	}

	setEnable (enable) {

		this.storeData = this.storeData.updateIn(['configuration', 'enable'], v => enable);

		this.emitChange();

	}

	setAutoUpdate (autoUpdate) {

		this.storeData = this.storeData.updateIn(['configuration', 'autoUpdate'], v => autoUpdate);

		this.emitChange();

	}

	setUpdateFrequency (updateFrequency) {

		this.storeData = this.storeData.updateIn(['configuration', 'updateFrequency'], v => updateFrequency);

		this.emitChange();

	}

	getStoreData () {

		return this.storeData;

	}

}

export default new AppStore();
