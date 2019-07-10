<div align="center">
  <img src="media/worker.svg" alt="Web Scaffold task-watcher" height="200" />
</div>

# @web-scaffold/task-watcher

> [`WEB Scaffold`](https://github.com/webscaffold/webscaffold) task for file changes watching.

## Install

```sh
$ npm install --save-dev @webscaffold/task-watcher
```

## Usage

```js
const watcher = require('@webscaffold/task-watcher');

await watcher(filesGlob, options, taskFn);
```

This will run Webpack based on the config passed.

## API

### watcher(filesGlob, options, taskFn)

Returns a Promise<object> with an istance of the watcher class.

#### filesGlob

Type: Array|string

Glob string or aray of globs of all files to watch.

#### options

Type: `object`

Options object that can be passed.

##### taskName

Type: `string`<br>
Default: `watcher`

Task name that will be used by the logger to namespace the logs.

##### taskColor

Type: `string`<br>
Default: `#88d498`

The color used by the logger to log to the console the task output.

##### label

Type: `string`<br>
Default: `''`

The watcher label namespace used for logging purposes.

#### taskFn

Type: `Function`<br>
Default: undefined

Task function to call on changes.

## Licensing

MIT © Radu Micu
