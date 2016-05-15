
'use strict';

import React from 'react';
import AppActions from '../actions/actions';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class FooterActionsComponent extends React.Component {

	constructor (props) {
		super(props);
	}

	render () {

		let {configuration} = this.props;

		return (
			<div className="footer-actions">
				<RaisedButton
					label="Apply"
					primary={true}
					onClick={this.applyConfiguration}
				/>
			</div>
		);
	}

	applyConfiguration = () => {
		AppActions.applyConfiguration();
	}

}

export default FooterActionsComponent;
