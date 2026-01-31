Iterator Includes
===

A TC39 proposal to allow the developer to ask whether an iterator yields a given value. Analogue to `Array.prototype.includes`.

**Stage: 0**

**Specification:** [https://michaelficarra.github.io/proposal-iterator-includes](https://michaelficarra.github.io/proposal-iterator-includes)

## presentations to committee

- [March 2026](https://docs.google.com/presentation/d/1a-1RQayP-tcJd2VAhFGoiL_dRT8gD8_qrp__qSgC1A4)

## motivation

This proposal has the same motivation as the original
[`Array.prototype.includes`
proposal](https://github.com/tc39/proposal-Array.prototype.includes). Just as
you do with Arrays, at times you need to ask whether an iterator would yield a
given value. And as with Arrays, you can use `some` with a custom comparator,
but that's not ideal because it doesn't as directly express your intent, and
each time you need to do that, you have the option of one of many comparison
operations, when that choice often doesn't matter. There should be a simple,
terse, standard way to look for something in the values yielded by an iterator.

## design questions

### comparison operation

There are at least 4 built-in comparison operations that somebody could want to
use for `includes`: strict equality (`===`), loose equality (`==`), SameValue
(`Object.is`), and SameValueZero (`Array.prototype.includes`). In a vacuum, we
could debate the merits of SameValue vs SameValueZero and which is best for
known popular use cases, but I don't think there's any argument that would be
stronger than choosing SameValueZero to match `Array.prototype.includes`.

### second parameter (fromIndex)

`Array.prototype.includes` has a second parameter that starts the search from
the given index instead of the beginning of the Array. This makes sense for the
Array API because the alternative (slicing first) would first allocate another
Array and then perform a copy from that index. But Iterators have `drop` which
is a constant time/space operation, so there's no need to include this
parameter. That being said, it *could* be included to mirror the Array API, but
I don't think it's worth it. Additionally, if it was included, it would have to
reject negative values, which would be an unnecessarily surprising difference.

## chosen solution

A new `Iterator.prototype` method named `includes`.

```js
function* gen() { yield 1; yield 3; };
gen().includes(1); // true
gen().includes(2); // false
gen().includes(3); // true

gen().drop(1).includes(1); // false
gen().drop(1).includes(3); // true
gen().drop(2).includes(3); // false
```
