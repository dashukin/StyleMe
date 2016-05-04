
'use strict';

import React from 'react';
import AppActions from '../actions/actions';
import StylesheetsItemComponent from './app-stylesheets-item-component';
import FlatButton from 'material-ui/lib/flat-button';

const viewPrefix = 'stylesheets';

class StylesheetsComponent extends React.Component {

	constructor (props) {
		super(props);

	}

	componentWillMount () {

	}

	componentDidMount () {

	}

	componentWillUnmount () {

	}

	shouldComponentUpdate (nextProps) {
		return this.props !== nextProps;
	}

	render () {

		let configuration = this.props.configuration;
		let stylesheetsData = configuration ? configuration.get('stylesheets') : [];

		console.warn(stylesheetsData);

		let stylesheets = stylesheetsData.map((stylesheetConfig) => {
			return <StylesheetsItemComponent
				key={"stylesheet-item-" + stylesheetConfig.key}
				stylesheetConfig={stylesheetConfig}
			/>
		});

		return (
			<div className="view stylesheets-view">

				<div className="stylesheets-list">
					{stylesheets}
				</div>

				<div className="">
					<FlatButton
						label="Add stylesheet"
						disabled={false}
						primary={true}
						onClick={this.addField}
					/>
				</div>

			</div>

		);

	}

	addField = () => {

		AppActions.addField();

	}

}

export default StylesheetsComponent;
