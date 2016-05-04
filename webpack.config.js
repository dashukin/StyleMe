var webpack = require('webpack');

module.exports = {
	entry: {
		background: './src/js/background',
		contentscript: './src/js/contentscript',
		popup: './src/js/popup'
	},
	output: {
		filename: '[name].bundle.js',
		path: './app/build/js/'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loaders: ['babel-loader']
			}
		]
	},
	plugins: [
		new webpack.NoErrorsPlugin()
	]
}