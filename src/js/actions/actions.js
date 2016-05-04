
import AppDispatcher from '../dispatchers/dispatcher';
import AppConstants from '../constants/constants';

export default {
	switchView: (viewType) => {
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
	removeField: (key) => {
		AppDispatcher.dispatch({
			actionType: AppConstants.REMOVE_FIELD,
			payload: {key}
		});
	},
	addStylesheet: () => {

	}
}