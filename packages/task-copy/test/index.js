const fs = require('fs');
const test = require('ava');
const tempy = require('tempy');
const rimraf = require('rimraf');
const copy = require('../index');

const read = (...args) => fs.readFileSync(path.join(...args), 'utf8');

test.beforeEach(async (t) => {
	t.context.tmp = tempy.file();
});

test.afterEach(t => {
	rimraf.sync(t.context.tmp);
});

test('copy single file', async (t) => {
	await copy('../LICENSE.txt', t.context.tmp);
	await copy({
		taskName: 'copy:test',
		src: '../LICENSE.txt',
		dest: t.context.tmp,
		cpy: {
			cwd: path.join(process.cwd(), config.paths.srcPath),
			parents: true
		}
	});

	t.is(read('../LICENSE.txt'), read(t.context.tmp, '../LICENSE.txt'));
});
