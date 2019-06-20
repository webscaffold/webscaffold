const fs = require('fs');
const path = require('path');
const test = require('ava');
const tempy = require('tempy');
const rimraf = require('rimraf');
const copy = require('../index');

const read = (...args) => fs.readFileSync(path.join(...args), 'utf8');

test.beforeEach(t => {
	t.context.tmp = tempy.file();
});

test.afterEach(t => {
	rimraf.sync(t.context.tmp);
});

test('copy single file', async (t) => {
	await copy('LICENSE.txt', t.context.tmp, { taskName: 'copy:test1' });

	t.is(read('LICENSE.txt'), read(t.context.tmp, 'LICENSE.txt'));
});

test('copy array of files', async t => {
	await copy(['LICENSE.txt', 'package.json'], t.context.tmp, { taskName: 'copy:test2' });

	t.is(read('LICENSE.txt'), read(t.context.tmp, 'LICENSE.txt'));
	t.is(read('package.json'), read(t.context.tmp, 'package.json'));
});

test('path structure', async t => {
	fs.mkdirSync(t.context.tmp);
	fs.mkdirSync(path.join(t.context.tmp, 'cwd'));
	fs.writeFileSync(path.join(t.context.tmp, 'cwd/hello.js'), 'console.log("hello");');

	await copy([path.join(t.context.tmp, 'cwd/hello.js')], t.context.tmp, {
		taskName: 'copy:test3',
		cpy: {
			parents: true
		}
	});

	t.is(read(t.context.tmp, 'cwd/hello.js'), read(t.context.tmp, t.context.tmp, 'cwd/hello.js'));
});
