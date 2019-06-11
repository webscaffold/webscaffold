const test = require('ava');
const path = require('path');

const { fs } = require('../lib');

test.beforeEach(t => {
	t.context.existingFile = path.resolve('test/fixtures/foo.bar');
});

test('fs:fileExists existing fixture file', (t) => {
	const fileExists = fs.fileExists(t.context.existingFile);

	t.is(fileExists, true);
});

test('fs:fileExists non existing file', (t) => {
	const fileExists = fs.fileExists(path.resolve(`${t.context.existingFile}.none`));

	t.is(fileExists, false);
});

test('fs:readFile existing fixture file', async (t) => {
	const contents = await fs.readFile(t.context.existingFile);

	t.is(contents.length > 0, true);
});

test('fs:readFile non existing fixture file', async (t) => {
	try {
		const contents = await fs.readFile(`${t.context.existingFile}.none`);
	} catch (error) {
		t.is(error instanceof Error, true);
	}
});
