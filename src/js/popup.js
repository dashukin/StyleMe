/**
 * Popup script
 */

'use strict';

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app-component';

/**
 * Temporary solution.
 * At least required for autocomplete component
 * @see https://github.com/callemall/material-ui#react-tap-event-plugin
 */
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

ReactDOM.render(<App/>, document.getElementById('styleme-app'));
