function includes<T>(this: IterableIterator<T>, searchElement: T, skippedElements = undefined): boolean {
  let toSkip = 0;
  if (skippedElements !== undefined) {
    if (!(skippedElements === 2e308 || skippedElements === -2e308 || typeof skippedElements === 'number' && Math.trunc(skippedElements) === skippedElements)) {
      throw new TypeError;
    }
    toSkip = skippedElements as number;
  }
  if (toSkip < 0) {
    throw new RangeError;
  }
  let skipped = 0;
  for (let e of this) {
    if (skipped < toSkip) {
      ++skipped;
    } else if ([e].includes(searchElement)) {
      return true;
    }
  }
  return false;
}

Object.defineProperty(Iterator.prototype, 'includes', {
  configurable: true,
  writable: true,
  enumerable: false,
  value: includes,
});
