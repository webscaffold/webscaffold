<div align="center">
  <img src="media/copy.svg" alt="Web Scaffold task-core" height="200" />
</div>

# @web-scaffold/task-copy

> [`WEB Scaffold`](https://github.com/webscaffold/webscaffold) task for copying up folders and files.

## Install

```sh
$ npm install --save-dev @webscaffold/task-copy
```

## Usage

```js
const copy = require('@webscaffold/task-copy');

await copy(['path_to_folder/*'], options);
```

This will copy all files from the folder.

The modules uses [rimraf](https://www.npmjs.com/package/rimraf) internally so for more info on how you can define the paths check the modules options.

## API

### copy(paths, [options])

Returns a Promise for the paths to be removed. It will also log to the console the steps it took to do it.

#### paths

Type: `array`

Array of paths to be removed using `rimraf` options.

#### options

Type: `object`

Options object that can be passed.

##### taskName

Type: `string`<br>
Default: `copy`

Task name that will be used by the logger to namespace the logs.

##### taskColor

Type: `string`<br>
Default: `#F3FFBD`

The color used by the logger to log to the console the task output.

## Licensing

MIT © Radu Micu
