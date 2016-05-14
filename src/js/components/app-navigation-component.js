
'use strict';

import React from 'react';
import AppActions from '../actions/actions';
import FlatButton from 'material-ui/FlatButton';


class NavigationComponent extends React.Component {

	constructor (props) {
		super(props);
	}

	render () {

		let buttonStyles = {width: '50%', textTransform: 'none'};

		return (
			<div className="navigation-holder">
				<FlatButton
					label="Stylesheets"
					disabled={false}
					style={buttonStyles}
					primary={true}
					onClick={this.switchView.bind(this, 'stylesheets')}
				/>
				<FlatButton
					label="Options"
					disabled={false}
					style={buttonStyles}
					primary={true}
					onClick={this.switchView.bind(this, 'options')}
				/>
			</div>
		);
	}

	switchView = (view, e) => {
		AppActions.switchView(view);
	}

}

export default NavigationComponent;