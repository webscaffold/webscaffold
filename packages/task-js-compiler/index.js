'use strict';

const webpack = require('webpack');
const { reporter, TaskError } = require('@webscaffold/task-core');
const compilerLogger = require('./lib/compiler-logger');

/**
 * Bundle JS files using webpack.
 *
 * @param {object} options object
 * @returns {Promise} Compiler promise
 */
function compiler(webpackConfig, options = {}) {
	const taskName = options.label || 'js-compiler';
	const taskColor = options.taskColor || '#00a8e8;'
	const logger = reporter(taskName, { color: taskColor });

	let instance;

	logger.emit('start', 'bundle js with webpack');

	// Parameters, options checks.
	if (webpackConfig === undefined) {
		throw new TaskError('Webpackconfig is missing!');
	}


	return new Promise((resolve, reject) => {
		logger.emit('info', 'running webpack');

		instance = webpack(webpackConfig, (error, stats) => {
			compilerLogger(error, stats, logger);

			if (options.eventBus && error === null && !stats.hasErrors()) {
				options.eventBus.emit('bs:reload');
			}

			if (error === null && !stats.hasErrors()) {
				logger.emit('done', 'webpack compilation completed');
			} else if (error !== null || stats.hasErrors()) {
				logger.emit('error', 'error while running webpack');

				reject(new Error('webpack error'));
			}

			resolve({
				instance,
				stats
			});
		});
	});
}

module.exports = compiler;
