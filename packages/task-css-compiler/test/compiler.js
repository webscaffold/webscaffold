'use strict';

const fs = require('fs');
const path = require('path');
const test = require('ava');
const tempy = require('tempy');
const rimraf = require('rimraf');
const { compiler } = require('../index');

const read = (...args) => fs.readFileSync(path.join(...args), 'utf8').trim();

test.beforeEach((t) => {
	t.context.inputScssFile = path.resolve('test/fixtures/input-scss.scss');
	t.context.outputCSSFile = path.resolve('test/fixtures/output.css');
	t.context.outputCSSFileInlineMap = path.resolve('test/fixtures/output-sourcemap.css');
	t.context.outputOptimizedCSSFile = path.resolve('test/fixtures/output-optimized.css');

	t.context.inputScssPostCSSFile = path.resolve('test/fixtures/input-scss-postcss.scss');
	t.context.outputCSSPostCSSFile = path.resolve('test/fixtures/output-postcss.css');

	t.context.tmp = tempy.directory();
});

test.afterEach((t) => {
	rimraf.sync(t.context.tmp);
});

test('compile sass file with external sourcemap', async (t) => {
	const opts = {
		taskName: 'css compiler 1',
		isDebug: true,
		buildPath: t.context.tmp,
		sass: { sourceMapEmbed: false  }
	};
	await compiler(t.context.inputScssFile, t.context.tmp, opts);

	t.is(read(t.context.tmp, 'input-scss.build.dev.css'), read(t.context.outputCSSFile));
});

test('compile sass file with internal sourcemap', async (t) => {
	const opts = {
		taskName: 'css compiler 2',
		isDebug: true,
		buildPath: t.context.tmp,
		sass: { sourceMapEmbed: true  }
	};
	await compiler(t.context.inputScssFile, t.context.tmp, opts);

	t.is(read(t.context.tmp, 'input-scss.build.dev.css'), read(t.context.outputCSSFileInlineMap));
});

test('compile sass and postcss file with external sourcemap', async (t) => {
	const opts = {
		taskName: 'css compiler 3',
		isDebug: true,
		buildPath: t.context.tmp,
		sass: { sourceMapEmbed: false  }
	};
	await compiler(t.context.inputScssPostCSSFile, t.context.tmp, opts);

	t.is(read(t.context.tmp, 'input-scss-postcss.build.dev.css'), read(t.context.outputCSSPostCSSFile));
});

test('compile sass file with external sourcemap and optimize', async (t) => {
	const opts = {
		taskName: 'css compiler 4',
		isDebug: false,
		buildPath: t.context.tmp,
		sass: { sourceMapEmbed: false  }
	};
	await compiler(t.context.inputScssFile, t.context.tmp, opts);

	t.is(read(t.context.tmp, 'input-scss.build.50f0f5798f.css'), read(t.context.outputOptimizedCSSFile));
});
