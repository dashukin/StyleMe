
'use strict';

import React from 'react';
import AppActions from '../actions/actions';
import TextField from 'material-ui/lib/text-field';
import IconButton from 'material-ui/lib/icon-button';
import DeleteIcon from 'material-ui/lib/svg-icons/navigation/close';


class StylesheetItemComponent extends React.Component {

	constructor (props) {

		super(props);

	}

	shouldComponentUpdate (nextProps) {
		return this.props !== nextProps;
	}

	render () {

		let {stylesheetConfig} = this.props;

		return (
			<div className="stylesheet-item">

				<TextField
					ref="stylesheet-input"
					hintText="path/to/css/file"
					defaultValue={stylesheetConfig.src}
					style={{width: '80%'}}
				/>

				<IconButton
					style={{width: '20%'}}
					onClick={this.removeField}
				>
					<DeleteIcon />
				</IconButton>

			</div>
		);
	}

	removeField = () => {

		let {stylesheetConfig} = this.props;

		let fieldKey = stylesheetConfig.key;

		AppActions.removeField(fieldKey);
	}

}

export default StylesheetItemComponent;