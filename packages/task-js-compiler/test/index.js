'use strict';

const test = require('ava');
const rimraf = require('rimraf');
const compiler = require('../index');
const webpackConfig = require('./fixtures/webpack.config.js');

test.beforeEach((t) => {
	t.context.webpackConfig = webpackConfig;
});

test.afterEach(() => {
	// TODO: Perhaps use memory-fs
	// const MemoryFS = require('memory-fs');
	// const webpack = require('webpack');
	// const fs = new MemoryFS();
	// const compiler = webpack({ / options / });
	// compiler.outputFileSystem = fs;
	// compiler.run((err, stats) => {
	//   const content = fs.readFileSync('...');
	// });
	rimraf.sync('./test/fixtures/dist');
});

test('compile js with webpack', async (t) => {
	const { stats } = await compiler(t.context.webpackConfig);

	t.is(stats.hasErrors(), false);
});
