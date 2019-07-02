'use strict';

const path = require('path');
const revHash = require('rev-hash');
const { fs, reporter, TaskError } = require('@webscaffold/task-core');
const sassCompiler = require('./lib/sass-compiler');
const postCSSTransform = require('./lib/postcss-transform');
const cssOptimizer = require('./optimizer');

/**
 * Write file to disk with the CSS output and revision the filename
 *
 * @param {string} cssOutput - CSS output
 * @param {string} dest - CSS output folder path
 * @param {object} options - Options object
 * @returns {Promise} Promise object
 */
function writeFileToDisk(cssOutput, dest, options) {
	const outputHash = options.isDebug ? 'dev' : revHash(cssOutput);
	const entryPointFileName = path.basename(options.entryPoint, '.scss');
	const manifestContent = `{
	"${options.entryPoint}": "/styles/${entryPointFileName}.build.${outputHash}.css"
}`;

	if (options.buildPath === undefined) {
		throw new TaskError('options.buildPath path is missing!');
	}

	options.logger.emit('info', `writing ${options.isDebug ? 'dev' : 'production'} files to disk`)

	return Promise.all([
		fs.writeFile(path.resolve(options.buildPath + `/asset-manifest-style.json`), manifestContent),
		fs.writeFile(path.resolve(dest + `/${entryPointFileName}.build.${outputHash}.css`), cssOutput)
	]);
}

/**
 * Run all CSS transformation tasks. SASS, PostCSS, etc, and the write and revsion the output to disk
 *
 * @param {string} entryPoint CSS entry point file path
 * @param {string} dest CSS output folder path
 * @param {object} options Options object
 * @param {string} options.taskName Task name used for reporting purposes
 * @param {string} options.taskColor Task color used for reporting purposes
 * @param {string} options.isDebug Debug flag used to generate source maps and/or to minify the response
 * @param {string} options.eventBus Event emitter used to pass messages to other lib like Browsersync
 * @param {string} options.sass Sass lib options
 * @returns {Promise} Promise object
 */
async function compiler(entryPoint, dest, options = {}) {
	const taskName = options.taskName || 'css-compiler';
	const taskColor = options.taskColor || '#FFD166;'
	const logger = reporter(taskName, { color: taskColor });

	logger.emit('start', `running ${taskName} steps`);

	// Parameters, options checks.
	if (entryPoint === undefined || entryPoint.length === 0 || dest === undefined) {
		const entryPointErr = 'Entry point file path is missing!';

		throw new TaskError(entryPointErr);
	}

	// Compile CSS steps
	let cssOutput = await sassCompiler({
		entryPoint,
		taskName,
		subTaskName: 'sass',
		taskColor,
		isDebug: options.isDebug,
		eventBus: options.eventBus,
		sass: {
			sourceMapEmbed: options.sass.sourceMapEmbed
		}
	});

	// PostCSS transform SASS output
	const postCSSOutput = await postCSSTransform(cssOutput, {
		reporter: logger,
		taskColor,
		postcss: {
			map: {
				inline: options.sass.sourceMapEmbed
			}
		}
	});
	cssOutput = postCSSOutput.css;

	// Minify content if build is run with release flag
	if (!options.isDebug) {
		cssOutput = await cssOptimizer(cssOutput);
	}

	// Create output folder and write results to output files
	await fs.makeDir(path.resolve(dest));
	await writeFileToDisk(cssOutput, dest, {
		entryPoint,
		isDebug: options.isDebug,
		buildPath: options.buildPath,
		logger
	});

	logger.emit('done', `${taskName} build done`);
}

module.exports = compiler;
