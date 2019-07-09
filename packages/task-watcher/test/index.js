'use strict';

const test = require('ava');
const compiler = require('../index');

test('compile js with webpack', async (t) => {
	const { stats } = await compiler(t.context.webpackConfig);

	t.is(stats.hasErrors(), false);
});
