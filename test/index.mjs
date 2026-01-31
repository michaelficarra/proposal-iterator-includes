import { test } from 'node:test';
import * as assert from 'node:assert/strict';
import '../lib/index.js';

test('basic', async t => {
  let arr = [3, 6, 9];
  assert.equal(arr.values().includes(0), false);
  assert.equal(arr.values().includes(1), false);
  assert.equal(arr.values().includes(2), false);
  assert.equal(arr.values().includes(3), true);
  assert.equal(arr.values().includes(4), false);
  assert.equal(arr.values().includes(5), false);
  assert.equal(arr.values().includes(6), true);
  assert.equal(arr.values().includes(7), false);
  assert.equal(arr.values().includes(8), false);
  assert.equal(arr.values().includes(9), true);
  assert.equal(arr.values().includes(10), false);
});

test('infinite', async t => {
  let gen = function* () {
    for(let i = 0; ; ++i) yield i;
  };
  assert.equal(gen().includes(1000), true);
});

test('objects', async t => {
  let o = {};
  let arr = [o];
  assert.equal(arr.values().includes({}), false);
  assert.equal(arr.values().includes(o), true);
  assert.equal([].values().includes(o), false);
});

test('symbols', async t => {
  let s = Symbol('test');
  let arr = [s];
  assert.equal(arr.values().includes(Symbol('test')), false);
  assert.equal(arr.values().includes(s), true);
  assert.equal([].values().includes(s), false);
});

test('NaNs', async t => {
  let arr = [Number.NaN];
  assert.equal(arr.values().includes(0), false);
  assert.equal(arr.values().includes(Number.NaN), true);
  assert.equal([].values().includes(Number.NaN), false);
});

test('zeroes', async t => {
  let positive = [+0];
  let negative = [-0];
  assert.equal(positive.values().includes(+0), true);
  assert.equal(positive.values().includes(-0), true);
  assert.equal(negative.values().includes(+0), true);
  assert.equal(negative.values().includes(-0), true);
});

test('closes iterator', async t => {
  let closed = false;
  let i = 0;
  let iter = {
    __proto__: Iterator.prototype,
    next() {
      ++i;
      return { value: i, done: false };
    },
    return() {
      closed = true;
      return { value: undefined, done: true };
    },
  };

  assert.equal(iter.includes(5), true);
  assert.equal(closed, true);
});

test('name', async t => {
  assert.equal(Iterator.prototype.includes.name, 'includes');
});

test('length', async t => {
  assert.equal(Iterator.prototype.includes.length, 1);
});

test('non-constructible', async t => {
  assert.throws(() => {
    new Iterator.prototype.includes(0);
  }, TypeError);
});

