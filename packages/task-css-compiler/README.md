<div align="center">
  <img src="media/css-construction.svg" alt="Web Scaffold task-css-compiler" height="200" />
</div>

# @web-scaffold/task-css-compiler

> [`WEB Scaffold`](https://github.com/webscaffold/webscaffold) task for compiling Sass to css, running PostCSS and optimizing the output.

## Install

```sh
$ npm install --save-dev @webscaffold/task-css-compiler
```

## Usage

```js
const cssCompiler = require('@webscaffold/task-css-compiler');

await cssCompiler('path/to/input.scss', 'path/to/output/folder', {
	taskName: 'css compiler',
	isDebug: true,
	buildPath: 'path/to/build/folder/for/asset-manifest-style.json',
	sass: {
		sourceMapEmbed: false 
	}
});
```

This will compile the entry Scss file to CSS will run [PostCSS](https://postcss.org/) on top and based on settings will optimize the file with [clean-css](https://github.com/jakubpawlowicz/clean-css).

## API

### cssCompiler(input, destination, options?)

Returns a Promise<string[]> with the destination file paths.

#### input

Type: string

Entry sass file path.

#### destination

Type: string

Destination directory.

#### options

Type: `object`

Options object that can be passed.

##### sass

Type: object

Options are passed to Sass compiler.

##### taskName

Type: `string`<br>
Default: `css-compiler`

Task name that will be used by the logger to namespace the logs.

##### taskColor

Type: `string`<br>
Default: `#FFD166`

The color used by the logger to log to the console the task output.

##### eventBus

Type: `object`<br>
Default: undefined

The EventEmitter event bus that will be used to emit `bs:reload` for Browsersync.

## Licensing

MIT © Radu Micu
