'use strict';

const path = require('path');

module.exports = {
	entry: path.resolve(__dirname, 'index.js'),
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist')
	},
	mode: 'development'
};
