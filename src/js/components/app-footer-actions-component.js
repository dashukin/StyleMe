
'use strict';

import React from 'react';
import AppActions from '../actions/actions';
import FlatButton from 'material-ui/FlatButton';

class FooterActionsComponent extends React.Component {

	constructor (props) {
		super(props);
	}

	render () {
		return (
			<div className="footer-actions">
				<FlatButton
					label="Save"
					primary={true}
					onClick={this.saveConfiguration}
				/>
			</div>
		);
	}

	saveConfiguration = () => {
		AppActions.saveConfiguration();
	}

}

export default FooterActionsComponent;
