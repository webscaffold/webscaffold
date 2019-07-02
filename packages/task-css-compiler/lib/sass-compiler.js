'use strict';

const util = require('util');
const sass = require('sass');
const Fiber = require('fibers');
const humanizeMs = require('ms');
const chalk = require('chalk');
const { reporter } = require('@webscaffold/task-core');
const sassFormatError = require('./sass-format-error');

/**
 * Compile SASS to CSS using `node-sass`
 *
 * @param {object} options - Options object
 * @returns {Promise} Promise object
 */
async function sassCompiler(options) {
	const logger = reporter(options.taskName, { subTaskName: options.subTaskName, color: options.taskColor });
	const sassOptions = {
		file: options.entryPoint,
		outputStyle: 'expanded',
		includePaths: ['.'],
		sourceMapContents: true,
		sourceMapEmbed: options.sass.sourceMapEmbed || false,
		fiber: Fiber, // This increases perf for render https://github.com/sass/dart-sass#javascript-api
		...options.sass
	}
	const render = util.promisify(sass.render);

	logger.emit('start', 'compiling sass files');

	try {
		const result = await render(sassOptions);

		if (options.eventBus) {
			options.eventBus.emit('bs:reload');
		}

		logger.emit('info', 'styles entry point ' + result.stats.entry.split(process.cwd())[1]);
		logger.emit('debug', {
			message: 'included files',
			data: result.stats.includedFiles
		});
		logger.emit('done', `styles compiled ${chalk.gray(humanizeMs(result.stats.duration))}`);

		return result.css;
	} catch (error) {
		const errorObj = sassFormatError(error);

		throw new Error(errorObj.messageFormatted);
	}
}

module.exports = sassCompiler;
