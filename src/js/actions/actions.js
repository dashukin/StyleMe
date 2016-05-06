
import AppDispatcher from '../dispatchers/dispatcher';
import AppConstants from '../constants/constants';

export default {
	switchView: viewType => {
		AppDispatcher.dispatch({
			actionType: AppConstants.SWITCH_VIEW,
			payload: {viewType}
		});
	},
	addField: () => {
		AppDispatcher.dispatch({
			actionType: AppConstants.ADD_FIELD
		});
	},
	removeField: key => {
		AppDispatcher.dispatch({
			actionType: AppConstants.REMOVE_FIELD,
			payload: {key}
		});
	},
	addInputValue: ({key, value}) => {
		AppDispatcher.dispatch({
			actionType: AppConstants.ADD_INPUT_VALUE,
			payload: {key, value}
		});
	},
	setEnable: enable => {
		AppDispatcher.dispatch({
			actionType: AppConstants.SET_ENABLE,
			payload: {enable}
		});
	},
	setAutoUpdate: autoUpdate => {
		AppDispatcher.dispatch({
			actionType: AppConstants.SET_AUTO_UPDATE,
			payload: {autoUpdate}
		});
	},
	setUpdateFrequency: updateFrequency => {
		AppDispatcher.dispatch({
			actionType: AppConstants.SET_UPDATE_FREQUENCY,
			payload: {updateFrequency}
		});
	},
	saveConfiguration: () => {
		AppDispatcher.dispatch({
			actionType: AppConstants.SAVE_CONFIGURATION
		});
	}
}