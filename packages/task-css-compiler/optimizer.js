'use strict';

const CleanCSS = require('clean-css');
const prettyBytes = require('pretty-bytes');
const { reporter } = require('@webscaffold/task-core');

/**
 * CSS minifier va CleanCSS
 *
 * @param {string} source CSS Source
 * @param {object} options Options object
 * @param {string} options.taskName Task name used for reporting purposes
 * @param {string} options.taskColor Task color used for reporting purposes
 * @returns {Promise} The return promise with the minified code and the log msg
 */
async function optimizer(source, options = {}) {
	const taskName = options.taskName || 'css-compiler';
	const taskColor = options.taskColor || '#FFD166;'
	const logger = reporter(taskName, { subTaskName: 'minify-css', color: taskColor });

	logger.emit('start', 'running CleanCSS minifier');

	const cleanTask = new CleanCSS({
		level: 2,
		returnPromise: true,
		sourceMap: false
	});
	let output;

	try	{
		output = await cleanTask.minify(source);

		const originalSize = prettyBytes(output.stats.originalSize);
		const minifiedSize = prettyBytes(output.stats.minifiedSize);
		const efficiency = output.stats.efficiency.toFixed(1).replace(/\.0$/, '');
		const timeSpent = output.stats.timeSpent;

		logger.emit('info', `Minify CSS from ${originalSize} to ${minifiedSize} (${efficiency}% in ${timeSpent}ms)`);
		logger.emit('done', 'css code minified');

		return output.styles;
	} catch (error) {
		logger.emit('error', error);

		throw error;
	}
}

module.exports = optimizer;
