<div align="center">
  <img src="media/js-construction.svg" alt="Web Scaffold task-js-compiler" height="200" />
</div>

# @web-scaffold/task-js-compiler

> [`WEB Scaffold`](https://github.com/webscaffold/webscaffold) task for compiling Sass to js, running PostCSS and optimizing the output.

## Install

```sh
$ npm install --save-dev @webscaffold/task-js-compiler
```

## Usage

```js
const jsCompiler = require('@webscaffold/task-js-compiler');

await jsCompiler('path/to/input.sjs', 'path/to/output/folder', {
	taskName: 'js compiler',
	isDebug: true,
	buildPath: 'path/to/build/folder/for/asset-manifest-style.json',
	sass: {
		sourceMapEmbed: false 
	}
});
```

This will compile the entry Sjs file to CSS will run [PostCSS](https://postjs.org/) on top and based on settings will optimize the file with [clean-js](https://github.com/jakubpawlowicz/clean-js).

## API

### jsCompiler(input, destination, options?)

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
Default: `js-compiler`

Task name that will be used by the logger to namespace the logs.

##### taskColor

Type: `string`<br>
Default: `#FFD166`

The color used by the logger to log to the console the task output.

## Licensing

MIT © Radu Micu
