'use strict';

const path = require('path');
const chalk = require('chalk');
const indentString = require('indent-string');

/**
 * Formats a Sass error object and returns an new Error object
 *
 * @param {Object} error Sass object error
 * @returns {Error} New formated Error object
 */
function sassFormatError(error) {
	let relativePath = '';
	const filePath = error.file;

	let message = '';

	relativePath = path.relative(process.cwd(), filePath);

	message += [chalk.underline(relativePath), error.formatted].join('\n');

	error.messageFormatted = indentString(chalk.redBright(message), 0);
	error.messageOriginal = error.message;

	error.relativePath = relativePath;

	return error;
}

module.exports = sassFormatError;
