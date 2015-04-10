var webpack = require('webpack');

module.exports = {
	entry: {
		background: './src/js/background.js',
		chromereload: './src/js/chromereload.js',
		contentscript: './src/js/contentscript.js',
		popup: './src/js/popup.js'
	},
	output: {
		filename: '[name].bundle.js',
		path: './StyleMe/build/js/'
	},
	plugins: [

	]
}