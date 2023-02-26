const assert = require('assert')

function indexOf(arr, target) {
  function _find(l, h) {
    // 1. 判断结束
    if (l === h) return arr[l] === target ? l : -1

    // 2. 二分
    const m = Math.floor((l + h) / 2)

    // 3. 判断二分点（无需判断）

    // 4. 判断左侧（包含二分点）
    if (arr[m] >= target) return _find(l, m)

    // 5. 判断右侧（不包含二分点）
    return _find(m + 1, h)
  }
  
  if (arr.length === 0) return -1
  return _find(0, arr.length -1)
}

assert.equal(indexOf([], 1), -1)
assert.equal(indexOf([1], 1), 0)
assert.equal(indexOf([1, 2], 1), 0)
assert.equal(indexOf([1, 2, 2, 2, 3], 2), 1)
assert.equal(indexOf([1, 2], 3), -1)
assert.equal(indexOf([1, 1, 2, 2, 3, 4, 5, 5, 6], 2), 2)
assert.equal(indexOf([1, 1, 2, 2, 3, 4, 5, 5, 6], 6), 8)
assert.equal(indexOf([1, 1, 2, 2, 3, 4, 5, 5, 6], 0), -1)
console.log('pass')
