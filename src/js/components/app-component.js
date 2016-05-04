'use strict';

import React from 'react';
import AppStore from '../stores/store';
import AppActions from '../actions/actions';
import StylesheetsComponent from './app-stylesheets-component';
import NavigationComponent from './app-navigation-component';
import OptionsComponent from './app-options-component';
import FooterActionsComponent from './app-footer-actions-component';

import ThemeManager from 'material-ui/lib/styles/theme-manager.js';
import AppTheme from '../theme/app-theme.js';

class AppComponent extends React.Component {

	constructor (props) {
		super(props);

		// expecting configuration value to be an immutable object

		this.state = {
			configuration: null,
			viewType: null
		};

	}

	getChildContext () {
		return {
			muiTheme: ThemeManager.getMuiTheme(AppTheme)
		}
	}

	componentWillMount () {
		AppStore.addChangeListener(this.updateState);
	}

	componentDidMount () {

		this.updateState();

	}

	render () {

		let state,
			configuration,
			viewType;

		state = this.state;

		configuration = state.configuration !== null
			? state.configuration
			: {};

		viewType = state.viewType;

		return (
			<div>

				<NavigationComponent/>

				{
					viewType === 'stylesheets'

						? <StylesheetsComponent configuration={configuration} />

						: viewType === 'options'

							? <OptionsComponent configuration={configuration} />

							: 'Invalid value of viewType...'
				}

				<FooterActionsComponent />

				<pre>
					{JSON.stringify(configuration, null, 4)}
				</pre>
			</div>
		);
	}

	updateState = () => {

		let storeData,
			viewType;

		storeData = AppStore.getStoreData();

		this.setState({
			configuration: storeData.get('configuration'),
			viewType: storeData.get('viewType')
		});

	}

	addStylesheet = () => {
		AppActions.addStylesheet();
	}

}

AppComponent.childContextTypes = {
	muiTheme: React.PropTypes.object
};

export default AppComponent;