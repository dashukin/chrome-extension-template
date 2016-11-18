/**
 * @nape webpack
 * @type {Object}
 * @property NoErrorsPlugin
 */

var webpack = require('webpack');

module.exports = {
	entry: {
		eventPage: './src/app/js/eventPage',
		contentscript: './src/app/js/contentscript',
		popup: './src/app/js/popup'
	},
	output: {
		filename: '[name].bundle.js'
	},
	module: {
		loaders: [{
			test: '/\.js/',
			exclude: '/node_modules/',
			loaders: ['babel-loader']
		}]
	},
	plugins: [
		new webpack.NoErrorsPlugin()
	]
};