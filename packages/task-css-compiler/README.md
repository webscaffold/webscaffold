<div align="center">
  <img src="media/css-construction.svg" alt="Web Scaffold task-css-compiler" height="200" />
</div>

# @web-scaffold/task-css-compiler

> [`WEB Scaffold`](https://github.com/webscaffold/webscaffold) task for copying up folders and files.

## Install

```sh
$ npm install --save-dev @webscaffold/task-css-compiler
```

## Usage

```js
const copy = require('@webscaffold/task-copy');

await copy(['source/*.png', '!source/goat.png'], 'destination');
```

This will copy all files from the folder.

The module uses [cpy](https://github.com/sindresorhus/cpy) under the hood to copy the files.

## API

### copy(source, destination, options?)

Returns a Promise<string[]> with the destination file paths.

#### source

Type: string | string[]

Files to copy.

#### destination

Type: string

Destination directory.

#### options

Type: `object`

Options object that can be passed.

##### cpy

Type: object

Options are passed to globby.

In addition, you can specify the [cpy options](https://github.com/sindresorhus/cpy#options).

##### taskName

Type: `string`<br>
Default: `copy`

Task name that will be used by the logger to namespace the logs.

##### taskColor

Type: `string`<br>
Default: `#B2DBBF`

The color used by the logger to log to the console the task output.

## Licensing

MIT © Radu Micu
