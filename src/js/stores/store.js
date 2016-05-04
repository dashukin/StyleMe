/**
 * App store
 */

import {EventEmitter} from 'events';
import AppDispatcher from '../dispatchers/dispatcher';
import AppConstants from '../constants/constants';
import {Map} from 'immutable';

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
			viewType: 'stylesheets' // stylesheets, options
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
			}

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

		console.log('getConfiguration');
		
		this.__sendMessage({
			payload: {
				action: 'getConfiguration'
			},
			callback: ({status, configuration}) => {

				// TODO: confirm status usage
				if (!status) {
					return;
				}

				this.storeData.update('configuration', () => configuration);
				this.emitChange();
			}
		});

	}

	/**
	 * Save configuration to localStorage
	 */
	saveConfiguration () {

		console.log('saveConfiguration');

		let self = this;

		this.__sendMessage({
			payload: {
				action: 'saveConfiguration',
				data: self.storeData.configuration.toObject()
			},
			callback: ({status}) => {

				// TODO: confirm status usage

				if (!status) {
					return;
				}


			}
		})

		this.emitChange();

	}

	__sendMessage ({payload, callback}) {

		chrome.tabs.getSelected(null, (tab) => {

			chrome.tabs.sendMessage(tab.id, payload, response => {

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

			console.log(stylesheetIndex);

			if (!!~stylesheetIndex) {
				stylesheets.splice(stylesheetIndex, 1);
			}

			console.log(stylesheets);

			return stylesheets;

		});

		this.emitChange();

	}

	getStoreData () {

		return this.storeData;

	}

}

export default new AppStore();
