<div align="center">
  <img src="media/building.svg" alt="Web Scaffold task-js-compiler" height="200" />
</div>

# @web-scaffold/task-js-compiler

> [`WEB Scaffold`](https://github.com/webscaffold/webscaffold) task for bundling js, running Webpack with Babel.

## Install

```sh
$ npm install --save-dev @webscaffold/task-js-compiler
```

## Usage

```js
const jsCompiler = require('@webscaffold/task-js-compiler');

await jsCompiler(webpackConfigObj);
```

This will run Webpack based on the config passed.

## API

### jsCompiler(webpackConfig, options?)

Returns a Promise<object> with the webpack instance and stats object.

#### webpackConfig

Type: object

Webpack config object.

#### options

Type: `object`

Options object that can be passed.

##### taskName

Type: `string`<br>
Default: `js-compiler`

Task name that will be used by the logger to namespace the logs.

##### taskColor

Type: `string`<br>
Default: `#00a8e8`

The color used by the logger to log to the console the task output.

##### eventBus

Type: `object`<br>
Default: undefined

The EventEmitter event bus that will be used to emit `bs:reload` for Browsersync.

## Licensing

MIT © Radu Micu
