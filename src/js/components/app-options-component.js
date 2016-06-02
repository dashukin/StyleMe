
'use strict';

import React from 'react';
import AppActions from '../actions/actions';
import TextField from 'material-ui/TextField';

import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import Toggle from 'material-ui/Toggle';

class OptionsComponent extends React.Component {

	constructor (props) {
		super(props);
	}

	render () {

		let {configuration} = this.props;
		let enable = configuration ? configuration.get('enable') : false;
		let autoUpdate = configuration ? configuration.get('autoUpdate') : false;
		let updateFrequency = configuration ? parseInt(configuration.get('updateFrequency'), 10) : 2;
		let keyboardUpdate = configuration ? !!configuration.get('keyboardUpdate').enable : false;

		return (
			<div className="tab-view tab-view-options">

				<List>

					<Subheader>Base configuration:</Subheader>

					<ListItem primaryText="Auto update" rightToggle={<Toggle defaultToggled={autoUpdate} toggled={autoUpdate} onToggle={this.handleAutoUpdate} />} />

					{autoUpdate
						? 	<ListItem
								innerDivStyle={{paddingTop: 0, paddingBottom: 0, background: '#fff'}}
							>
								<TextField
									floatingLabelText="Update frequency (seconds)"
									hintText="Amount of seconds"
									defaultValue={updateFrequency}
									type="number"
									min="1"
									onChange={this.handleUpdateFrequency}
									style={{width: '100%'}}
								/>
							</ListItem>
						: ''
					}

					<ListItem primaryText="Update by keys (Shift + R)" rightToggle={<Toggle defaultToggled={keyboardUpdate} toggled={keyboardUpdate} onToggle={this.handleKeyboardUpdate} />} />

				</List>

			</div>
		);
	}

	handleEnabling = () => {

		AppActions.toggleEnable();

	}

	handleAutoUpdate = (e) => {
		AppActions.setAutoUpdate(e.target.checked);
	}

	handleUpdateFrequency = (e) => {

		let updateFrequency = Math.abs(parseInt(e.target.value, 10)) || 2;

		AppActions.setUpdateFrequency(updateFrequency);

	}

	handleKeyboardUpdate = (e) => {

		AppActions.setKeyboardUpdate(e.target.checked);

	}

}

export default OptionsComponent;