var webpack = require('webpack');

var __DEV__ =  JSON.parse(process.env.BUILD_DEV || 'false');
var __PROD__ = JSON.parse(process.env.BUILD_PROD || 'false');

var baseConfig = {
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
};

if (__DEV__) {
	baseConfig['devtool'] = 'cheap-module-source-map';
}

module.exports = baseConfig;