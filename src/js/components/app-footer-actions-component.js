
'use strict';

import React from 'react';
import AppActions from '../actions/actions';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import Toggle from 'material-ui/Toggle';

class FooterActionsComponent extends React.Component {

	constructor (props) {
		super(props);
	}

	render () {

		let {configuration} = this.props;

		let enabled = configuration
			? configuration.get('enable')
			: false;

		let enabledText = enabled ? 'On' : 'Off';

		return (
			<div className="footer-actions">

				<List>
					<ListItem primaryText={enabledText} rightToggle={<Toggle defaultToggled={enabled} toggled={enabled} onToggle={this.toggleEnable} />} />
				</List>

			</div>
		);
	}

	toggleEnable = () => {
		AppActions.toggleEnable();
	}

}

export default FooterActionsComponent;
