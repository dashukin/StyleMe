/**
 * App store
 */

import {EventEmitter} from 'events';
import AppDispatcher from '../dispatchers/dispatcher';
import AppConstants from '../constants/constants';
import {Map} from 'immutable';
import ConfigurationService from '../services/configuration-service';

const ConfigurationServiceInstance = new ConfigurationService();

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
			configurationKey: null,
			configurationChanged: false,
			originalStyleSheets: []
		});



		AppDispatcher.register(({actionType, payload}) => {

			switch (actionType) {

				case AppConstants.GET_CONFIGURATION:

					this.loadConfiguration();

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

				case AppConstants.ADD_IGNORED_STYLESHEET:

					this.addIgnoredStyleSheet({
						key: 	payload.key,
						value: 	payload.value
					});

					break;

				case AppConstants.TOGGLE_ENABLE:

					this.toggleEnable();

					break;

				case AppConstants.SET_AUTO_UPDATE:

					this.setAutoUpdate(payload.autoUpdate);

					break;

				case AppConstants.SET_UPDATE_FREQUENCY:

					this.setUpdateFrequency(payload.updateFrequency);

					break;
			}

		});

		this.loadConfiguration();

		this.getOriginalStyleSheets().then(originalStyleSheets => {
			this.processOriginalStyleSheets(originalStyleSheets);
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

	loadConfiguration () {

		return new Promise((resolve, reject) => {
			ConfigurationServiceInstance.getConfiguration()
				.then((configurationJSON) => {
					this.processConfiguration(configurationJSON);
					resolve(configurationJSON);
				});
		});

	}

	processConfiguration (configurationJSON) {

		let configuration = JSON.parse(configurationJSON);
		this.storeData = this.storeData.update('configuration', c => Map(configuration));
		this.emitChange();

	}

	saveConfiguration () {

		return new Promise((resolve, reject) => {

			let configurationJSON = JSON.stringify(this.storeData.get('configuration'));

			ConfigurationServiceInstance.saveConfiguration(configurationJSON)
				.then(() => {
					this.applyConfiguration();
					resolve();
				});
		});

	}

	applyConfiguration () {

		return new Promise((resolve, reject) => {

			this.__sendMessage({
				payload: {
					action: AppConstants.APPLY_CONFIGURATION,
					configuration: this.storeData.get('configuration').toObject()
				}
			}).then((r) => resolve(r));

		});

	}


	getOriginalStyleSheets () {

		return new Promise((resolve, reject) => {

			this.__sendMessage({
				payload: {
					action: AppConstants.GET_ORIGINAL_STYLESHEETS
				}
			}).then(originalStyleSheets => {
				resolve(originalStyleSheets);
			})

		});

	}

	processOriginalStyleSheets (originalStyleSheets) {

		this.storeData = this.storeData.update('originalStyleSheets', v => originalStyleSheets);

		this.emitChange();

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
			ignoredStyleSheet: '',
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

		this.saveConfiguration().then(() => {
			this.emitChange();
		});

	}

	addInputValue ({key, value}) {

		this.storeData = this.storeData.updateIn(['configuration', 'styleSheets'], styleSheets => {

			let stylesheetIndex = styleSheets.findIndex(styleSheet => {
				return styleSheet.key === key;
			});

			if (!!~stylesheetIndex) {
				styleSheets[stylesheetIndex].src = value;
			}

			return styleSheets;

		});

		this.emitChange();

	}

	addIgnoredStyleSheet ({key, value}) {

		this.storeData = this.storeData.updateIn(['configuration', 'styleSheets'], styleSheets => {

			let stylesheetIndex = styleSheets.findIndex(styleSheet => {
				return styleSheet.key === key;
			});

			if (!!~stylesheetIndex) {
				styleSheets[stylesheetIndex].ignoredStyleSheet = value;
			}

			return styleSheets;
		});

		this.emitChange();

	}

	toggleEnable (enable) {

		this.storeData = this.storeData.updateIn(['configuration', 'enable'], v => !this.storeData.getIn(['configuration', 'enable']));

		this.saveConfiguration();

		this.emitChange();

	}

	setAutoUpdate (autoUpdate) {

		this.storeData = this.storeData.updateIn(['configuration', 'autoUpdate'], v => !this.storeData.getIn(['configuration', 'autoUpdate']));

		this.saveConfiguration();

		this.emitChange();

	}

	setUpdateFrequency (updateFrequency) {

		this.storeData = this.storeData.updateIn(['configuration', 'updateFrequency'], v => updateFrequency);

		this.saveConfiguration();

		this.emitChange();

	}

	getStoreData () {

		return this.storeData;

	}

}

export default new AppStore();
