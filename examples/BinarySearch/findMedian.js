const assert = require('assert')

function findMedianSortedArrays(nums1, nums2) {
  let m = nums1.length, n = nums2.length
  if (m > n) {
    [m, n, nums1, nums2] = [n, m, nums2, nums1]
  }

  const isOdd = (m + n) % 2 === 1

  if (m === 0) {
    if (n === 0) throw new Error('both are empty')

    const mp = Math.floor(n / 2)
    return isOdd ? nums2[mp] : (nums2[mp] + nums2[mp - 1]) / 2
  }

  function getMaxLeft(i, j) {
    if (i === 0) return nums2[j - 1]
    if (j === 0) return nums1[i - 1]
    return nums1[i - 1] > nums2[j - 1] ? nums1[i - 1] : nums2[j - 1]
  }

  function getMinRight(i, j) {
    if (i === m) return nums2[j]
    if (j === n) return  nums1[i]
    return nums1[i] < nums2[j] ? nums1[i] : nums2[j]
  }


  function getJ(i) {
    return isOdd
      ? Math.floor((m + n + 1) / 2) - i
      : Math.floor((m + n) / 2) - i
  }

  function check(i, j) {
    return getMaxLeft(i, j) <= getMinRight(i, j)
  }

  function findI(l, h) {
    // 1. 判断结束（因为一定有解，所以直接返回即可）
    if (l === h) return l

    // 2. 二分
    const i = Math.floor((l + h) / 2)

    // 3. 判断二分点
    const j = getJ(i)
    if (check(i, j)) return i

    // 4. 判断左侧
    if (i > 0 && nums1[i - 1] > nums2[j]) return findI(l, i - 1)

    // 5. 判断右侧
    return findI(i + 1, h)
  }

  const i = findI(0, m)
  const j = getJ(i)
  return isOdd ? getMaxLeft(i, j) : (getMaxLeft(i, j) + getMinRight(i, j)) / 2 
}

assert.equal(findMedianSortedArrays([1], [2]), 1.5)
assert.equal(findMedianSortedArrays([1, 2], [2]), 2)
assert.equal(findMedianSortedArrays([], [1]), 1)
assert.equal(findMedianSortedArrays([1, 2, 3, 4, 5], [2, 3, 4, 5, 6]), 3.5)
assert.equal(findMedianSortedArrays([1,3], [2]), 2)
assert.equal(findMedianSortedArrays([], [2,3]), 2.5)
assert.equal(findMedianSortedArrays([1,2,5], [3,4,6]), 3.5)
console.log('pass')
