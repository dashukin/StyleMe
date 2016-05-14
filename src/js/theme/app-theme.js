'use strict';

import {lightBlue700, white, darkBlack} from 'material-ui/styles/colors';
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
		primary1Color: 	lightBlue700,
		primary2Color: 	lightBlue700,
		primary3Color: 	lightBlue700,
		accent1Color: 	lightBlue700,
		accent2Color: 	lightBlue700,
		accent3Color: 	lightBlue700,
		textColor: 		darkBlack,
		alternateTextColor: white,
		canvasColor: lightBlue700,
		borderColor: lightBlue700
	}
};