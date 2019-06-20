<div align="center">
  <img src="media/bulldozer.svg" alt="Web Scaffold task-clean" height="200" />
</div>

# @web-scaffold/task-clean

> [`WEB Scaffold`](https://github.com/webscaffold/webscaffold) task for cleaning up folders and files.

## Install

```sh
$ npm install --save-dev @webscaffold/task-clean
```

## Usage

```js
const clean = require('@webscaffold/task-clean');

await clean(['path_to_folder/*'], options);
```

This will clean all files from the folder.

The module uses [rimraf](https://www.npmjs.com/package/rimraf) internally so for more info on how you can define the paths check the modules options.

## API

### clean(paths, [options])

Returns a Promise for the paths to be removed. It will also log to the console the steps it took to do it.

#### paths

Type: `array`

Array of paths to be removed using `rimraf` options.

#### options

Type: `object`

Options object that can be passed.

##### taskName

Type: `string`<br>
Default: `clean`

Task name that will be used by the logger to namespace the logs.

##### taskColor

Type: `string`<br>
Default: `#F3FFBD`

The color used by the logger to log to the console the task output.

## Licensing

MIT © Radu Micu
