// TODO: Fix these tests
// 'use strict';
// const EventEmitter = require('events');
// const {PassThrough} = require('stream');
// const proxyquire = require('proxyquire');
// const sinon = require('sinon');

// // Helper to make using beforeEach less arduous
// function makeGroup(test) {
// 	return (desc, fn) => {
// 		test(desc, (t) => {
// 			const beforeEach = (fn) => {
// 				t.beforeEach((done) => {
// 					fn();
// 					done();
// 				});
// 			};

// 			const pending = [];
// 			const test = (name, fn) => {
// 				pending.push(t.test(name, fn));
// 			};

// 			fn(beforeEach, test, makeGroup(test));

// 			return Promise.all(pending);
// 		});
// 	};
// }

// const group = makeGroup(test);

// group('chokidar', (beforeEach, test) => {
// 	let chokidar;
// 	let debug;
// 	let api;
// 	let Subject;
// 	let runStatus;
// 	let resetRunStatus;
// 	let clock;
// 	let chokidarEmitter;
// 	let stdin;
// 	let files;

// 	function proxyWatcher(opts) {
// 		return proxyquire.noCallThru().load('../index', opts ||
// 			{
// 				chokidar,
// 				debug(name) {
// 					return (...args) => {
// 						debug(...[name, ...args]);
// 					};
// 				}
// 			});
// 	}

// 	beforeEach(() => {
// 		chokidar = {
// 			watch: sinon.stub()
// 		};

// 		debug = sinon.spy();

// 		reporter = {
// 			endRun: sinon.spy(),
// 			lineWriter: {
// 				writeLine: sinon.spy()
// 			}
// 		};

// 		api = {
// 			on() {},
// 			run: sinon.stub()
// 		};

// 		resetRunStatus = () => {
// 			runStatus = {
// 				stats: {
// 					byFile: new Map(),
// 					declaredTests: 0,
// 					failedHooks: 0,
// 					failedTests: 0,
// 					failedWorkers: 0,
// 					files,
// 					finishedWorkers: 0,
// 					internalErrors: 0,
// 					remainingTests: 0,
// 					passedKnownFailingTests: 0,
// 					passedTests: 0,
// 					selectedTests: 0,
// 					skippedTests: 0,
// 					timeouts: 0,
// 					todoTests: 0,
// 					uncaughtExceptions: 0,
// 					unhandledRejections: 0
// 				}
// 			};

// 			return runStatus;
// 		};

// 		if (clock) {
// 			clock.uninstall();
// 		}

// 		clock = lolex.install({
// 			toFake: [
// 				'setImmediate',
// 				'setTimeout',
// 				'clearTimeout'
// 			]
// 		});

// 		chokidarEmitter = new EventEmitter();
// 		chokidar.watch.returns(chokidarEmitter);

// 		api.run.returns(new Promise(() => {}));
// 		files = [
// 			'test.js',
// 			'test-*.js',
// 			'test/**/*.js'
// 		];

// 		resetRunStatus();

// 		stdin = new PassThrough();
// 		stdin.pause();

// 		Subject = proxyWatcher();
// 	});

// 	const start = () => new Subject(files, {}, () => {});

// 	const emitChokidar = (event, path) => {
// 		chokidarEmitter.emit('all', event, path);
// 	};

// 	const change = (path) => {
// 		emitChokidar('change', path || 'source.js');
// 	};


// 	const delay = () => new Promise((resolve) => {
// 		setImmediate(resolve);
// 	});

// 	// Advance the clock to get past the debounce timeout, then wait for a promise
// 	// to be resolved to get past the `busy.then()` delay
// 	const debounce = (times) => {
// 		times = times >= 0 ? times : 1;
// 		clock.next();
// 		return delay().then(() => {
// 			if (times > 1) {
// 				return debounce(times - 1);
// 			}
// 		});
// 	};

// 	test('watches for default source file changes, as well as test files', (t) => {
// 		t.plan(2);
// 		start();

// 		t.ok(chokidar.watch.calledOnce);
// 		t.strictDeepEqual(chokidar.watch.firstCall.args, [
// 			['**/*.snap', 'ava.config.js', 'package.json', '**/*.js', ...files]
// 		]);
// 	});

// 	// test('watched source files are configurable', (t) => {
// 	// 	t.plan(2);
// 	// 	start(null, ['foo.js', '!bar.js', 'baz.js', '!qux.js']);

// 	// 	t.ok(chokidar.watch.calledOnce);
// 	// 	t.strictDeepEqual(chokidar.watch.firstCall.args, [
// 	// 		['foo.js', 'baz.js'].concat(files)
// 	// 	]);
// 	// });

// 	// test('debounces by 100ms', (t) => {
// 	// 	t.plan(1);
// 	// 	api.run.returns(Promise.resolve(runStatus));
// 	// 	start();

// 	// 	change();
// 	// 	const before = clock.now;
// 	// 	return debounce().then(() => t.is(clock.now - before, 100));
// 	// });

// 	// test('debounces again if changes occur in the interval', (t) => {
// 	// 	t.plan(4);
// 	// 	api.run.returns(Promise.resolve(runStatus));
// 	// 	start();

// 	// 	change();
// 	// 	change();

// 	// 	const before = clock.now;
// 	// 	return debounce().then(() => {
// 	// 		change();
// 	// 		return debounce();
// 	// 	}).then(() => {
// 	// 		t.is(clock.now - before, 150);
// 	// 		change();
// 	// 		return debounce();
// 	// 	}).then(() => {
// 	// 		t.is(clock.now - before, 175);
// 	// 		change();
// 	// 		return debounce();
// 	// 	}).then(() => {
// 	// 		t.is(clock.now - before, 187);
// 	// 		change();
// 	// 		return debounce();
// 	// 	}).then(() =>  t.is(clock.now - before, 197));
// 	// });
// });
