'use strict';

const chalk = require('chalk');
const prettifyTime = require('./prettify-time');

/**
 * Compiler logger function that transforms the output into a readable stream of text
 *
 * @param {Error} error - Error object in case webpack fails (these are not compilation errors)
 * @param {object} stats - Webpack stats object that contains all information about your build
 * @param {EventEmitter} logger - Logger event emitter
 * @returns {object} Error object or nothing if there is no error
 */
function compilerLogger(error, stats, logger) {
	if (error) {
		logger.emit('fatal', chalk.red(`${error.name} ${error.message}`));
		logger.emit('log', error.details);

		return error;
	}

	const jsonStats = stats.toJson();

	if (stats.hasErrors()) {
		const compilerError = new Error(jsonStats.errors[0]);
		compilerError.errors = jsonStats.errors;
		compilerError.warnings = jsonStats.warnings;

		logger.emit('log', chalk.red(compilerError));
		logger.emit('log', chalk.red('Failed to build webpack'));
	} else {
		const compileTime = prettifyTime(stats.endTime - stats.startTime);

		logger.emit('note', `compilation finished\n${stats.toString({ colors: true })}`);
		logger.emit('note', `compiled with ${chalk.cyan('webpack')} in ${chalk.magenta(compileTime)}`);
	}

	return stats;
}

module.exports = compilerLogger;
