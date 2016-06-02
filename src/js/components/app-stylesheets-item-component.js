
'use strict';

import React from 'react';
import AppActions from '../actions/actions';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import DoneIcon from 'material-ui/svg-icons/action/done';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class StylesheetItemComponent extends React.Component {

	constructor (props) {

		super(props);

		this.state = {
			expanded: true
		};

	}

	shouldComponentUpdate (nextProps) {
		return true;
	}

	render () {

		let {state} = this;

		let {stylesheetConfig, originalStyleSheets} = this.props;

		let fieldStyles = {
			width: '100%'
		};

		let autoCompleteListStyles = {
			background: '#fff',
			maxHeight: '120px',
			overflowY: 'scroll'
		};

		let cardHeaderSubtitleStyle = {
			display: '-webkit-box',
			maxWidth: '470px',
			maxHeight: '3em',
			WebkitLineClamp: '3',
			WebkitBoxOrient: 'vertical',
			textOverflow: 'ellipsis',
			overflow: 'hidden',
			lineHeight: '1em'
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

		let cardHeaderTitle = stylesheetConfig.src ? 'Inject: ' + stylesheetConfig.src : 'CSS path has not been provided yet...';
		let cardHeaderSubtitle = stylesheetConfig.ignoredStyleSheet ? 'Disable: ' + stylesheetConfig.ignoredStyleSheet : null;

		return (
			<Card initiallyExpanded={!stylesheetConfig.src.length} >
				<CardHeader
					title={cardHeaderTitle}
					subtitle={cardHeaderSubtitle}
					subtitleStyle={cardHeaderSubtitleStyle}
					actAsExpander={true}
					showExpandableButton={true}
				/>
				<CardText expandable={true} style={{paddingTop: 0, paddingBottom: 0}} >
					<TextField
						ref="stylesheet-input"
						hintText="path/to/css/file"
						defaultValue={stylesheetConfig.src}
						style={fieldStyles}
						onChange={this.handleStyleInputChange}
					/>

					{enableAutoComplete
						? 	<AutoComplete
								hintText="Disable any existing stylesheet?"
								searchText={stylesheetConfig.ignoredStyleSheet}
								filter={AutoComplete.caseInsensitiveFilter}
								fullWidth={true}
								openOnFocus={true}
								dataSource={autoCompleteSourceData}
								onUpdateInput={this.onUpdateInput}
								onNewRequest={this.onNewRequest}
								maxSearchResults={0}
								style={fieldStyles}
								listStyle={autoCompleteListStyles}
								menuStyle={{background: '#fff'}}
							/>
						: 	''
					}

				</CardText>
				<CardActions expandable={true} >
					<FlatButton
						label="Save"
						labelPosition="after"
						primary={true}
						icon={<DoneIcon />}
						onClick={this.saveConfiguration}
					/>
					<FlatButton
						label="Remove"
						labelPosition="after"
						secondary={true}
						icon={<DeleteIcon />}
						onClick={this.removeField}
					/>
				</CardActions>
			</Card>
		);
	}

	saveConfiguration = () => {

		AppActions.saveConfiguration();

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

		AppActions.addIgnoredStyleSheetKey({
			key: this.props.stylesheetConfig.key,
			value: ''
		});

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