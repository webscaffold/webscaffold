const fs = require('fs');
const test = require('ava');
const makeDir = require('make-dir');
const clean = require('../index');

test.beforeEach(async (t) => {
	const path = await makeDir(__dirname + '/_fixture');

	fs.writeFileSync(path + '/f-1.test', '', 'utf8');

	t.context.targetDir = path;
});

test('clean a folder of its files', async (t) => {
	try {
		await clean([t.context.targetDir+'/*']);

		const fixtureExists = fs.existsSync(t.context.targetDir + '/f-1.test');

		if (fixtureExists) {
			t.fail('File still exists');
		} else {
			t.pass();
		}
	} catch (error) {
		t.fail('Clean failed');
	}
});
