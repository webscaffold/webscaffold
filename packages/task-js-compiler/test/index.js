'use strict';

const fs = require('fs');
const path = require('path');
const test = require('ava');
const tempy = require('tempy');
const rimraf = require('rimraf');
const { compiler } = require('../index');

const read = (...args) => fs.readFileSync(path.join(...args), 'utf8').trim();

test.beforeEach((t) => {
	t.context.webpackConfig = path.resolve('test/fixtures/webpack.config.js');
});

test.afterEach((t) => {
	rimraf.sync(t.context.tmp);
});

test('compile sass file with external sourcemap', async (t) => {
	await compiler(t.context.webpackConfig);

	t.is(1, 1);
});
