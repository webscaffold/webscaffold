const test = require('ava');

const { fs } = require('../lib');

test('fs:fileExists TRUE', t => {
	const fileExists = fs.fileExists('./fixtures/foo.bar');

	t.is(fileExists, true);
});

test('fs:fileExists TRUE', t => {
	const fileExists = fs.fileExists('./fixtures/thisfiledoeantexist');

	t.is(fileExists, false);
});
