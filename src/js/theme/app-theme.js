'use strict';

import {lightBlue800, lightBlue700, lightBlue500, lightBlue300, lightBlue100, white, darkBlack} from 'material-ui/styles/colors';
import Spacing from 'material-ui/styles/spacing.js';

/*
 *  Light Theme is the default theme used in material-ui. It is guaranteed to
 *  have all theme variables needed for every component. Variables not defined
 *  in a custom theme will default to these values.
 */

export default {
	spacing: Spacing,
	fontFamily: 'Roboto, sans-serif',
	palette: {
		primary1Color: 	lightBlue800,
		primary2Color: 	lightBlue300,
		primary3Color: 	lightBlue100,
		accent1Color: 	lightBlue800,
		accent2Color: 	lightBlue300,
		accent3Color: 	lightBlue100,
		textColor: 		darkBlack,
		alternateTextColor: white,
		canvasColor: white,
		borderColor: lightBlue700
	}
};