const assert = require('assert')

function findLessThan(arr, num) {
  function _find(l, h) {
    // 1. 判断结束
    if (l === h) return arr[l] <= num ? l : l - 1
    if (l + 1 === h) {
      if (arr[h] <= num) return h;
      if (arr[l] <= num) return l;
      return l - 1
    }

    // 2. 二分
    const m = Math.floor((l + h) / 2)

    // 3. 判断二分点（无需判断）

    // 4. 判断左侧（不包含二分点）
    if (arr[m] > num) return _find(l, m - 1)

    // 5. 判断右侧（包含二分点）
    return _find(m, h)
  }

  if (arr.length === 0) return []
  const idx = _find(0, arr.length - 1)
  return idx === -1 ? [] : arr.slice(0, idx + 1)
}

assert.deepEqual(findLessThan([], 1), [])
assert.deepEqual(findLessThan([1], 1), [1])
assert.deepEqual(findLessThan([1, 2], 1), [1])
assert.deepEqual(findLessThan([1, 2], 2), [1, 2])
assert.deepEqual(findLessThan([1, 2], 3), [1, 2])
assert.deepEqual(findLessThan([1, 1, 2, 2, 3, 4, 5, 5, 6], 2), [1, 1, 2, 2])
assert.deepEqual(findLessThan([1, 1, 2, 2, 3, 4, 5, 5, 6], 6), [1, 1, 2, 2, 3, 4, 5, 5, 6])
assert.deepEqual(findLessThan([1, 1, 2, 2, 3, 4, 5, 5, 6], 0), [])
assert.deepEqual(findLessThan([3, 3], 5), [3, 3])
console.log('pass')
