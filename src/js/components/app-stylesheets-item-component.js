
'use strict';

import React from 'react';
import AppActions from '../actions/actions';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/navigation/close';


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
					onChange={this.changeHandler}
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

		let fieldKey = this.props.stylesheetConfig.key;

		AppActions.removeField(fieldKey);
	}

	changeHandler = (e) => {

		let fieldKey = this.props.stylesheetConfig.key;

		AppActions.addInputValue({
			key: fieldKey,
			value: e.target.value
		});
		
	}

}

export default StylesheetItemComponent;