<div align="center">
  <img src="media/screw.svg" alt="Web Scaffold task-browser-sync" height="200" />
</div>

# @web-scaffold/task-browser-sync

> [`WEB Scaffold`](https://github.com/webscaffold/webscaffold) task for browser-sync.

## Install

```sh
$ npm install --save-dev @webscaffold/task-browser-sync
```

## Usage

```js
const browserSync = require('@webscaffold/task-browser-sync');

await browser-sync(options);
```

This will run a browser-sync instance.

The module uses [browser-sync](https://www.npmjs.com/package/browser-sync) internally so for more info on how you can define the paths check the modules options.

## API

TODO: Fix the docs

### browser-sync(paths, [options])

Returns a Promise for the paths to be removed. It will also log to the console the steps it took to do it.

#### paths

Type: `array`

Array of paths to be removed using `rimraf` options.

#### options

Type: `object`

Options object that can be passed.

##### taskName

Type: `string`<br>
Default: `browser-sync`

Task name that will be used by the logger to namespace the logs.

##### taskColor

Type: `string`<br>
Default: `#F3FFBD`

The color used by the logger to log to the console the task output.

## Licensing

MIT © Radu Micu
