
'use strict';

import React from 'react';
import AppActions from '../actions/actions';
import StylesheetsItemComponent from './app-stylesheets-item-component';
import FlatButton from 'material-ui/FlatButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';

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

		let {configuration, originalStyleSheets} = this.props;

		let stylesheetsData = !!configuration ? configuration.get('styleSheets') : [];

		let styleSheetsListItemStyles = {
			padding: '0 0 10px',
			background: '#fff'
		};

		let styleSheetsListItems = stylesheetsData.map((stylesheetConfig) => {
			return (
				<ListItem innerDivStyle={styleSheetsListItemStyles} key={"ListItem-" + stylesheetConfig.key}>
					<StylesheetsItemComponent
						stylesheetConfig={stylesheetConfig}
						originalStyleSheets={originalStyleSheets}
					/>
				</ListItem>
			);
		});

		return (
			<div className="tab-view tab-view-stylesheets">

				<List>

					{styleSheetsListItems}

					<ListItem innerDivStyle={styleSheetsListItemStyles} >
						<RaisedButton
							label="Add stylesheet"
							labelPosition="after"
							icon={<AddIcon/>}
							disabled={false}
							primary={true}
							onClick={this.addField}
						/>
					</ListItem>

				</List>



			</div>

		);

	}

	addField = () => {

		AppActions.addField();

	}

}

export default StylesheetsComponent;
