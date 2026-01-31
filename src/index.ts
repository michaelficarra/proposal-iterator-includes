function includes<T>(this: IterableIterator<T>, searchElement: T): boolean {
  for (let e of this) {
    if ([e].includes(searchElement)) return true;
  }
  return false;
}

Object.defineProperty(Iterator.prototype, 'includes', {
  configurable: true,
  writable: true,
  enumerable: false,
  value: includes,
});
