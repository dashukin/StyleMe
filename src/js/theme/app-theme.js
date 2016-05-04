'use strict';

import Colors from 'material-ui/lib/styles/colors.js';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator.js';
import Spacing from 'material-ui/lib/styles//spacing.js';

/*
 *  Light Theme is the default theme used in material-ui. It is guaranteed to
 *  have all theme variables needed for every component. Variables not defined
 *  in a custom theme will default to these values.
 */

export default {
	spacing: Spacing,
	fontFamily: 'Roboto, sans-serif',
	palette: {
		primary1Color: Colors.green700,
		primary2Color: Colors.green500,
		primary3Color: Colors.green300,
		accent1Color: Colors.green700,
		accent2Color: Colors.green500,
		accent3Color: Colors.green300,
		textColor: Colors.darkBlack,
		alternateTextColor: Colors.white,
		canvasColor: Colors.green700,
		borderColor: Colors.grey300,
		disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3)
	}
};