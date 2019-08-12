'use strict';

const cpy = require('cpy');
const { reporter, TaskError } = require('@webscaffold/task-core');

/**
 * Copy static assets from on location to another
 *
 * @param {string | array} src Task src string Array of files needed to be copied
 * @param {string} dest Task destination directory
 * @param {object} options Options object
 * @param {string} options.taskName Task name used for reporting purposes
 * @param {string} options.taskColor Task color used for reporting purposes
 * @param {object} options.cpy Cpy options. Options are passed to cp-file and globby also
 * @returns {Promise} Task `cpy` promise
 */
function copyStatic(src, dest, options = {}) {
	const taskName = options.taskName || 'copy:static';
	const taskColor = options.taskColor || '#B2DBBF;'
	const logger = reporter(taskName, { color: taskColor });

	let completedFiles = 1;

	logger.emit('start', `copy assets`);

	// Parameters, options checks.
	if (src === undefined || dest === undefined) {
		const paramError = '`src` and `dest` are mandatory!';

		logger.emit('error', paramError);

		throw new TaskError(paramError);
	}

	// TODO: Explore using https://www.npmjs.com/package/cpx instead.
	return cpy(src, dest, options.cpy || {}).on('progress', (report) => {
		if (report.completedFiles !== 0) {
			logger.emit('debug', `${report.completedFiles} / ${report.totalFiles} copied`);

			completedFiles = report.completedFiles;
		}
	})
		.then(() => {
			logger.emit('info', `${completedFiles} static assets copied`);
			logger.emit('done', `files copied`);

			return null;
		});
}

module.exports = copyStatic;
