'use strict';

const postcss = require('postcss');
const postcssPresetEnv = require('postcss-preset-env');
const postcssReporter = require('postcss-reporter');
const { reporter } = require('@webscaffold/task-core');

/**
 * Run PostCSS transform on the CSS output
 *
 * @param {string} cssInput - CSS string input
 * @param {object} options - Options object
 * @returns {Promise} Promise object
 */
function postCSSTransform(cssInput, options) {
	const logger = reporter('css-compiler', { subTaskName: 'postcss', color: options.taskColor });
	const plugins = [
		postcssPresetEnv({
			autoprefixer: { flexbox: 'no-2009' },
			stage: 3
		}),
		postcssReporter
	];
	const settings = {
		// Without `from` option PostCSS could generate wrong source map and will not find Browserslist config.
		// Set it to CSS file path or to `undefined` to prevent this warning. So far works OK.
		from: undefined,
		map: {
			inline: false
		}
	};

	logger.emit('start', 'running postcss');

	return postcss(plugins).process(cssInput, { ...settings, ...options.postcss });
}

module.exports = postCSSTransform;
