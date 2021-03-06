'use strict';

const Emittery = require('emittery');
const chalk = require('chalk')
const { Signale } = require('./signale');
const pe = require('./youch');

/**
 * Reporter function used to console log the task details
 *
 * @param {string} taskName - Task name
 * @param {object} options - Options object
 * @param {string} options.color - Task color code
 * @param {string} options.subTaskName - Subtask name
 * @returns {object} Emitter function
 */
module.exports = function (taskName, options = {}) {
	const emitter = new Emittery();

	const signale = new Signale({
		logLevel: process.env.WEBSCAFFOLD_LOG_LEVEL ? process.env.WEBSCAFFOLD_LOG_LEVEL : 'default'
	});
	signale.config({
		displayLabel: false,
		displayTimestamp: true
	});

	const logger = options.subTaskName ? signale.scope(taskName, options.subTaskName) : signale.scope(taskName);

	logger.setScopeColor(options.color);

	const errorMsgPrepend = '¯\\_(ツ)_/¯ there was an error';

	emitter.on('start', (message = '') => {
		logger.start(message);
	});

	emitter.on('done', (message = '') => {
		logger.done(message);
	});

	emitter.on('watch', (message = '') => {
		logger.watch(message);
	});

	emitter.on('warn', (message = '') => {
		logger.warn(message);
	});

	emitter.on('error', (error) => {
		if (error instanceof Error) {
			logger.error(`${errorMsgPrepend}\n${pe.render(error)}`);
		} else {
			logger.error(`${errorMsgPrepend} ${error}`);
		}
	});

	emitter.on('fatal', (error) => {
		if (error instanceof Error) {
			logger.error(`${errorMsgPrepend}\n${pe.render(error)}`);
		} else {
			logger.error(`${errorMsgPrepend} ${error}`);
		}
	});

	emitter.on('info', (message) => {
		logger.info(chalk.blue(message));
	});

	emitter.on('note', (message) => {
		logger.note(message);
	});

	emitter.on('fav', (message) => {
		logger.fav(message);
	});

	emitter.on('debug', (message) => {
		logger.debug(message);
	});

	emitter.on('log', (message = '') => {
		signale.log(message);
	});

	return emitter;
}
