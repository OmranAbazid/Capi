export function memoize(func) {
  const cache = new Map();
  return function(...args) {
      const key = args[0];
      if (cache.has(key)) {
          return cache.get(key);
      }
      const val = func.apply(this, arguments);
      cache.set(key, val);
      return val;
  };
}