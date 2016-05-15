
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

		return (
			<div className="tab-view tab-view-options">

				<List>

					<Subheader>Base configuration:</Subheader>

					<ListItem primaryText="Inject styles" rightToggle={<Toggle defaultToggled={enable} onToggle={this.handleEnabling} />} />
					<ListItem primaryText="Auto update" rightToggle={<Toggle defaultToggled={autoUpdate} onToggle={this.handleAutoUpdate} />} />

					{autoUpdate
						? 	<ListItem
								innerDivStyle={{paddingTop: 0, paddingBottom: 0, background: '#fff'}}
							>
								<TextField
									floatingLabelText="Update frequency"
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

				</List>

			</div>
		);
	}

	handleEnabling = (e) => {

		AppActions.setEnable(e.target.checked);

	}

	handleAutoUpdate = (e) => {
		AppActions.setAutoUpdate(e.target.checked);
	}

	handleUpdateFrequency = (e) => {

		let updateFrequency = Math.abs(parseInt(e.target.value, 10)) || 2;

		AppActions.setUpdateFrequency(updateFrequency);

	}

}

export default OptionsComponent;