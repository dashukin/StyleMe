
'use strict';

import React from 'react';
import AppDispatcher from '../dispatchers/dispatcher';
import AppConstants from '../constants/constants';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppTheme from '../theme/app-theme.js';
import Snackbar from 'material-ui/Snackbar';
import MD5 from 'MD5';


class StyleMe extends React.Component {

	constructor (props) {

		super(props);

		this.state = {
			showNotification: true,
			notificationMessage: '',
			notificationAction: ''
		};

		this.notifications = [];

		this.configuration = {};

		this.previousConfiguration = null;

		this.documentHead = document.getElementsByTagName('head')[0];
		this.appAttribute = 'data-style-me';

		this.originalStyleSheets = Array.prototype.filter.call(document.styleSheets, styleSheet => {
			// exclude injected stylesheets and those that have been disabled by default
			return !styleSheet['ownerNode'].hasAttribute(this.appAttribute) && !styleSheet['ownerNode'].disabled;
		}).reduce((collection, styleSheet) => {

			if (typeof styleSheet.href === 'string') {

				let	styleSheetKey = MD5(styleSheet['ownerNode'].getAttribute('href'));

				collection[styleSheetKey] = {
					node: styleSheet['ownerNode'],
					src: styleSheet['ownerNode'].getAttribute('href')
				};
			}

			return collection;

		}, {});

		this.injectedStyleSheets = {};

		this.autoUpdateIntervals = {};

		AppDispatcher.register(({actionType, payload}) => {

			switch (actionType) {

				case AppConstants.APPLY_CONFIGURATION:

					this.applyConfiguration(payload.configuration);

					break;

				case AppConstants.GET_ORIGINAL_STYLESHEETS:

					payload.callback(this.getOriginalStyleSheets());

					break;
			}

		});

	}

	getChildContext () {
		return {
			muiTheme: getMuiTheme(AppTheme)
		}
	}

	applyConfiguration (configuration) {

		this.configuration = configuration;

		this.processConfiguration();

		this.previousConfiguration = Object.assign({}, configuration);

	}

	processConfiguration () {

		let {configuration, previousConfiguration} = this;

		let {enable, keyboardUpdate} = configuration;

		this.destroy();

		let appWasToggled = (!previousConfiguration && enable) || (previousConfiguration && (enable !== previousConfiguration.enable));

		if (enable) {
			this.init();
		}

		this.toggleKeyboardUpdate(enable && keyboardUpdate.enable || false);

		if (appWasToggled) {
			this.createNotification({
				message: 'StyleMe is ' + (enable ? 'On' : 'Off'),
				action: null
			});
		} else if (previousConfiguration) {
			this.createNotification({
				message: 'StyleMe configuration has been updated.',
				action: null
			});
		}

	}

	removeStylesheets () {

		let {injectedStyleSheets, originalStyleSheets} = this;

		// remove all injected stylesheets
		for (let styleSheet in injectedStyleSheets) {
			if (injectedStyleSheets.hasOwnProperty(styleSheet)) {

				let injectedStylesheet = injectedStyleSheets[styleSheet].node;

				if (injectedStylesheet && injectedStylesheet.parentNode !== null) {

					// remove injected stylesheets from document and delete all stored links to them
					injectedStylesheet.parentNode.removeChild(injectedStylesheet);
					delete injectedStyleSheets[styleSheet];

				}
			}
		}

		// restore disabled attribute on original stylesheets
		for (let styleSheetKey in originalStyleSheets) {
			if (originalStyleSheets.hasOwnProperty(styleSheetKey)) {
				this.toggleOriginalStyleSheet(styleSheetKey, true);
			}
		}



	}

	createStylesheets () {

		let {styleSheets} = this.configuration;

		styleSheets.forEach(styleSheet => {

			if (styleSheet.src) {

				// create new styleSheet
				let newStylesheet = document.createElement('link');

				newStylesheet.setAttribute('rel', 'stylesheet');
				newStylesheet.setAttribute('type', 'text/css');
				newStylesheet.setAttribute(this.appAttribute, 'true');
				newStylesheet.setAttribute('href', styleSheet.src);

				this.documentHead.appendChild(newStylesheet);
				this.injectedStyleSheets[styleSheet.key] = {
					node: newStylesheet,
					src: styleSheet.src
				};

				if (styleSheet.overrideOriginal === true) {
					this.toggleOriginalStyleSheet(MD5(styleSheet.src), false);
				}

			}

			if (styleSheet.ignoredStyleSheet.length) {
				this.toggleOriginalStyleSheet(MD5(styleSheet.ignoredStyleSheet), false);
			}

		});

	}

	toggleOriginalStyleSheet (styleSheetKey, enable) {

		let {originalStyleSheets} = this;

		if (originalStyleSheets.hasOwnProperty(styleSheetKey)) {

			if (enable) {
				originalStyleSheets[styleSheetKey].node.removeAttribute('disabled');
			} else {
				originalStyleSheets[styleSheetKey].node.setAttribute('disabled', 'disabled');
			}

		}

	}

	init () {

		this.createStylesheets();

		this.processAutoUpdate();

	}

	toggleKeyboardUpdate (enable = false, options) {

		let action = enable ? 'add' : 'remove';

		document[action + 'EventListener']('keypress', this.keyPressHandler, false);
	}

	keyPressHandler = e => {

		if (e.which === 82 && e.shiftKey === true) {
			this.updateInjectedStyleSheets();
		}
	}

	getOriginalStyleSheets () {

		let {originalStyleSheets} = this;

		return Object.keys(originalStyleSheets).reduce((collection, styleSheetKey) => {
				collection.push({
					key: styleSheetKey,
					src: originalStyleSheets[styleSheetKey].src
				});
				return collection;
			}, []);
	}

	processAutoUpdate () {

		let {enable, autoUpdate} = this.configuration;

		let enableAutoUpdate = enable && autoUpdate;

		let {injectedStyleSheets} = this;

		for (let styleSheetKey in injectedStyleSheets) {
			if (injectedStyleSheets.hasOwnProperty(styleSheetKey)) {

				this.handleAutoUpdateInterval(styleSheetKey, enableAutoUpdate);

			}
		}

	}

	handleAutoUpdateInterval (styleSheetKey, enable) {

		let {autoUpdateIntervals} = this;

		let {updateFrequency} = this.configuration;

		if (autoUpdateIntervals.hasOwnProperty(styleSheetKey)) {

			window.clearInterval(autoUpdateIntervals[styleSheetKey]);

		}

		if (enable === true) {

			let updateIntervalValue = parseInt(updateFrequency, 10) * 1000;

			autoUpdateIntervals[styleSheetKey] = window.setInterval(() => {

			this.updateStyleSheetSrc(styleSheetKey);

			}, updateIntervalValue);
		}

	}

	updateInjectedStyleSheets () {

		let {injectedStyleSheets} = this;

		for (let styleSheetKey in injectedStyleSheets) {
			if (injectedStyleSheets.hasOwnProperty(styleSheetKey)) {

				this.updateStyleSheetSrc(styleSheetKey);

			}
		}

		this.createNotification({
			message: 'Injected Stylesheets have been updated',
			action: null
		});

	}

	updateStyleSheetSrc (styleSheetKey) {

		let {injectedStyleSheets} = this;

		let injectedStyleSheetData = injectedStyleSheets[styleSheetKey];

		let injectedStyleSheet = injectedStyleSheetData.node;

		let timestamp = (!!~injectedStyleSheetData.src.indexOf('?') ? '&' : '?') + 'timestamp=' + (new Date()).getTime();

		injectedStyleSheet.setAttribute('href', injectedStyleSheetData.src + timestamp);

	}

	removeAutoUpdateIntervals () {

		let {autoUpdateIntervals} = this;

		for (let styleSheetKey in autoUpdateIntervals) {
			if (autoUpdateIntervals.hasOwnProperty(styleSheetKey)) {
				this.handleAutoUpdateInterval(styleSheetKey, false);
			}
		}

	}

	destroy () {

		this.removeAutoUpdateIntervals();

		this.removeStylesheets();

	}

	createNotification ({message, action}) {

		this.notifications.push({message, action});

		this.showNotifications();

	}

	showNotifications () {

		let notificationData = this.notifications.shift();

		if (notificationData) {
			this.setState({
				notificationMessage: notificationData.message,
				notificationAction: notificationData.action
			});
		}

	}

	// Component specific methods

	render () {

		let styles = {
			pointerEvents: 'none'
		};

		let {showNotification, notificationMessage, notificationAction} = this.state;

		let open = showNotification === true && notificationMessage.length > 0;

		return (
			<div className="extension-styleme" style={styles}>

				<Snackbar
					open={open}
					message={notificationMessage}
					action={notificationAction}
					autoHideDuration={3000}
					style={{textAlign: 'center'}}
				/>
			</div>
		);
	}

}

StyleMe.childContextTypes = {
	muiTheme: React.PropTypes.object
};

export default StyleMe;