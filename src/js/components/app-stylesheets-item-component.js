
'use strict';

import React from 'react';
import AppActions from '../actions/actions';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
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

		let {stylesheetConfig, originalStyleSheets} = this.props;

		let fieldStyles = {
			width: '100%'
		};

		let autoCompleteListStyles = {
			background: '#fff'
		};

		let enableAutoComplete = (Object.prototype.toString.call(originalStyleSheets).slice(8, -1) === 'Array') && originalStyleSheets.length;

		let autoCompleteSourceData = enableAutoComplete
			? 	originalStyleSheets.reduce((data, {src, key}) => {
					data.push({
						text: src,
						value: src,
						styleSheetKey: key
					});
					return data;
				}, [])
			: [];

		let autoCompleteComponent = enableAutoComplete
			? <AutoComplete
				hintText="Disable any existing stylesheet?"
				searchText={stylesheetConfig.ignoredStyleSheet}
				filter={AutoComplete.caseInsensitiveFilter}
				fullWidth={true}
				openOnFocus={true}
				dataSource={autoCompleteSourceData}
				onUpdateInput={this.onUpdateInput}
				onNewRequest={this.onNewRequest}
				maxSearchResults={5}
				style={fieldStyles}
				listStyle={autoCompleteListStyles}
				menuStyle={{background: '#fff'}} />
			: '';

		return (
			<div className="stylesheet-item">

				<TextField
					ref="stylesheet-input"
					hintText="path/to/css/file"
					defaultValue={stylesheetConfig.src}
					style={fieldStyles}
					onChange={this.handleStyleInputChange}
				/>

				{autoCompleteComponent}

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

	handleStyleInputChange = (e) => {

		let fieldKey = this.props.stylesheetConfig.key;

		AppActions.addInputValue({
			key: fieldKey,
			value: e.target.value
		});
		
	}

	onUpdateInput = (enteredValue, dataSource) => {

	}

	onNewRequest = (selectedData, index) => {

		AppActions.addIgnoredStyleSheetKey({
			key: this.props.stylesheetConfig.key,
			ignoredKey: selectedData.styleSheetKey,
			value: selectedData.text
		});
	}

}

export default StylesheetItemComponent;