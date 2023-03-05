const assert = require('assert')

function findGreaterThan(arr, num) {
  function _find(l, h) {
    if (l === h) return arr[h] >= num ? h : h + 1
    if (l + 1 === h) {
      if (arr[l] >= num) return l;
      if (arr[h] >= num) return h;
      return h + 1
    }

    const m = Math.floor((l + h) / 2)

    if (arr[m] >= num) return _find(l, m);

    return _find(m + 1, h)
  }

  if (arr.length === 0) return []
  const idx = _find(0, arr.length - 1)
  return idx >= arr.length ? [] : arr.slice(idx)
}

assert.deepEqual(findGreaterThan([], 1), [])
assert.deepEqual(findGreaterThan([1], 1), [1])
assert.deepEqual(findGreaterThan([1, 2], 1), [1, 2])
assert.deepEqual(findGreaterThan([1, 2], 2), [2])
assert.deepEqual(findGreaterThan([1, 2], 3), [])
assert.deepEqual(findGreaterThan([1, 1, 2, 2, 3, 4, 5, 5, 6], 2), [2, 2, 3, 4, 5, 5, 6])
assert.deepEqual(findGreaterThan([1, 1, 2, 2, 3, 4, 5, 5, 6], 6), [6])
assert.deepEqual(findGreaterThan([1, 1, 2, 2, 3, 4, 5, 5, 6], 0), [1, 1, 2, 2, 3, 4, 5, 5, 6])
console.log('pass')
