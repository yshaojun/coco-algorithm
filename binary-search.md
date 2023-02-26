# 二分查找

以前学习二分查找，第一个例子就是在“有序数组中查找一个数字”，其实这个例子并不好，它限制了理解二分的思路，好像只能用于查找特定的数，于是遇到诸如查找第一个出现的元素位置、查找不小于/不大于某个数的位置等问题时，不知如何下手。

实际上，应该按如下流程理解和实现二分查找：

1. 判断结束
2. 二分
3. 判断二分点（可选）
4. 判断左侧（注意是否包含二分点），如果在，查找左侧
5. 判断右侧（注意是否包含二分点），如果在，查找右侧

举例：

> 题1：在一个升序数字数组 arr 中查找数字 target，返回 true 或 false。

```js
function findTarget(arr, target) {
  function _find(l, h) {
    // 1. 判断结束
    if (l === h) return arr[l] === target

    // 2. 二分
    const m = Math.floor((l + h) / 2)

    // 3. 判断二分点
    if (arr[m] === target) return true

    // 4. 判断左侧（不包含二分点）
    if (arr[m] > target) return _find(l, m - 1)

    // 5. 判断右侧（不包含二分点）
    return _find(m + 1, h)
  }
  return arr.length > 0 && _find(0, arr.length - 1)
}
```

> 题2：在一个升序数字数组 arr 中，实现 indexOf 函数。

```js
// 本题需要注意的是，在数组存在重复数字时，需返回第一个位置
//
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
```

> 题3：在一个升序数字数组 arr 中，查找不大于数字 num 的区间。

```js
function findLessThan(arr, num) {
  function _find(l, h) {
    // 1. 判断结束
    if (l === h) return arr[l] <= num ? l : l - 1

    // 2. 二分
    const m = Math.floor((l + h) / 2)

    // 3. 判断二分点（无需判断）

    // 4. 判断左侧（不包含二分点）
    if (arr[m] > num) return _find(l, m - 1)

    // 5. 判断右侧（包含二分点）
    return _find(m + 1, h)
  }

  if (arr.length === 0) return []
  const idx = _find(0, arr.length - 1)
  return idx === -1 ? [] : arr.slice(0, idx + 1)
}
```

> 题4：在一个升序数字数组 arr 中，查找不小于数字 num 的区间。

```js
// 题3的镜像题
//
function findGreaterThan(arr, num) {
  if (l === h) return arr[h] >= num ? h : h + 1

  const m = Math.floor((l + h) / 2)

  if (arr[m] >= num) return _find(l, m);

  return _find(m + 1, h)
}
```

> 题5：查找两个升序数字数组 nums1, nums2 的中位数（LeetCode [#4](https://leetcode.cn/problems/median-of-two-sorted-arrays/)）。

```js
// 思路：令 m = nums1.length, n = nums2.length
//
// 假设 i 将 nums1 划分成 0,1,...,i-1 和 i,i+1,i+2,...,m-1 两段
//（0 <= i <= m，i === 0 是左侧为空，i === m 时右侧为空)
//
// 假设 j 将 nums2 划分成 0,1,...,j-1 和 j,j+1,j+2,...,n-1 两段
//（0 <= j <= n，j === 0 是左侧为空，j === n 时右侧为空)
//
// 将左侧、右侧分别相加，使个数 
//   Count(left) === Count(right)（总数为偶数时）
// 或 Count(left) === Count(right) + 1（总数为奇数时）
//
// 这样，中位数是
//   (max(left) + max(right)) / 2（总数为偶数时）
// 或 min(right)（总数为奇数时）
//
// 由于左、右侧个数要么相等要么差1，当 i 确定时，j 可以反算得到
//   (i + j === m - i + n - j) -> j = (m + n) / 2 - i（偶数时）
// 或 (i + j === m - i + n - j + 1) -> j = (m + n + 1) / 2 - i（奇数时）
//
// 令 i = (0 + n - 1) / 2，
// 如果 nums1[i - 1] <= nums2[j] && nums1[j - 1] <= nums2[i]，说明 i 满足条件，停止查找
//
// 如果 nums1[i - 1] > nums2[j]，说明 i 取值大了，i 应缩小，即应在左侧查找
// 反之，i 应扩大，即应在右侧查找
//
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
```

综上，二分查找的题目基本都可以用上面的5步来实现。

代码：[yshaojun/coco-algorithm](https://github.com/yshaojun/coco-algorithm)
