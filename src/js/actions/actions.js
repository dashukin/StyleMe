
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
	addIgnoredStyleSheetKey: ({key, value}) => {
		AppDispatcher.dispatch({
			actionType: AppConstants.ADD_IGNORED_STYLESHEET,
			payload: {key, value}
		});
	},
	toggleEnable: () => {
		AppDispatcher.dispatch({
			actionType: AppConstants.TOGGLE_ENABLE
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
	},
	applyConfiguration: configuration => {
		AppDispatcher.dispatch({
			actionType: AppConstants.APPLY_CONFIGURATION,
			payload: {configuration}
		});
	},
	getOriginalStyleSheets: callback => {
		AppDispatcher.dispatch({
			actionType: AppConstants.GET_ORIGINAL_STYLESHEETS,
			payload: {callback}
		});
	}
}