const assert = require('assert')

function findTarget(arr, target) {
  function _find(l, h) {
    // 1. 判断结束
    if (l === h) return arr[l] === target

    // 2. 二分
    const m = Math.floor((l + h) / 2)

    // 3. 判断二分点
    if (arr[m] === target) return true;

    // 4. 判断左侧（不包含二分点）
    if (arr[m] > target) {
      return _find(l, m - 1)
    }

    // 5. 判断右侧（不包含二分点）
    return _find(m + 1, h)
  }

  return arr.length > 0 && _find(0, arr.length - 1)
}

assert.equal(findTarget([], 1), false)
assert.equal(findTarget([1], 1), true)
assert.equal(findTarget([1, 2], 1), true)
assert.equal(findTarget([1, 2], 2), true)
assert.equal(findTarget([1, 2], 3), false)
assert.equal(findTarget([1, 1, 2, 2, 3, 4, 5, 5, 6], 2), true)
assert.equal(findTarget([1, 1, 2, 2, 3, 4, 5, 5, 6], 6), true)
assert.equal(findTarget([1, 1, 2, 2, 3, 4, 5, 5, 6], 0), false)
console.log('pass')
