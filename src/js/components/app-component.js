'use strict';

import React from 'react';
import AppStore from '../stores/store';
import AppActions from '../actions/actions';
import StylesheetsComponent from './app-stylesheets-component';
import OptionsComponent from './app-options-component';
import FooterActionsComponent from './app-footer-actions-component';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppTheme from '../theme/app-theme.js';

import {Tabs, Tab} from 'material-ui/Tabs';
import SettingsIcon from 'material-ui/svg-icons/action/settings';

class AppComponent extends React.Component {

	constructor (props) {
		super(props);

		// expecting configuration value to be an immutable object

		this.state = {
			configuration: null,
			originalStyleSheets: [],
			viewType: 'stylesheets'
		};

	}

	getChildContext () {
		return {
			muiTheme: getMuiTheme(AppTheme)
		}
	}

	componentWillMount () {
		AppStore.addChangeListener(this.updateState);
	}

	componentDidMount () {

		this.updateState();

	}

	render () {

		let {state} = this;

		let {configuration, viewType, originalStyleSheets} = state;

		return (
			<div>

				<Tabs value={viewType}>
					<Tab
						label="CSS"
						value="stylesheets"
						onClick={this.handleTabClick.bind(this, 'stylesheets')}
					>
						<StylesheetsComponent configuration={configuration} originalStyleSheets={originalStyleSheets} />
					</Tab>
					<Tab label="Options" value="options" onClick={this.handleTabClick.bind(this, 'options')}>
						<OptionsComponent configuration={configuration} />
					</Tab>
				</Tabs>

				<FooterActionsComponent />

			</div>
		);
	}

	handleTabClick = (value, e) => {

		this.setState({
			viewType: value
		});

	}

	updateState = () => {

		let storeData = AppStore.getStoreData();

		this.setState({
			configuration: storeData.get('configuration'),
			originalStyleSheets: storeData.get('originalStyleSheets')
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