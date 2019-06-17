const test = require('ava');
const makeDir = require('make-dir');

const clean = require('../index');

test.beforeEach(async (t) => {
	const path = await makeDir(__dirname + 'fixture');

	fs.writeFileSync(path + '/f-1.test', '', 'utf8');

	t.context.targetDir = path;
});

test('fs:fileExists existing fixture file', (t) => {
	try {
		await clean([t.contexttargetDir]);

		t.pass();
	} catch (error) {
		t.fail();
	}
});
