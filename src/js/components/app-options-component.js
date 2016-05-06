
'use strict';

import React from 'react';
import AppActions from '../actions/actions';
import Checkbox from 'material-ui/lib/checkbox';
import TextField from 'material-ui/lib/text-field';

class OptionsComponent extends React.Component {

	constructor (props) {
		super(props);
	}

	render () {

		let configuration = this.props.configuration;
		let enable = configuration.get('enable');
		let checked = configuration.get('autoUpdate');
		let updateFrequency = parseInt(configuration.get('updateFrequency'), 10) || 2;

		return (
			<div className="view options-view">

				<div>
					<Checkbox
						label="Enable"
						defaultChecked={enable}
						labelPosition="right"
						onCheck={this.handleEnabling}
					/>
				</div>

				<div>
					<Checkbox
						label="Auto update"
						defaultChecked={checked}
						labelPosition="right"
						onCheck={this.handleAutoUpdate}
					/>
				</div>

				<div>
					<TextField
						hintText="Amount of seconds"
						floatingLabelText="Update frequency"
						defaultValue={updateFrequency}
						type="number"
						min="1"
						onChange={this.handleUpdateFrequency}
					/>
				</div>


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