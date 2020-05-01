/**
 * 业务工具函数，参考lodash实现
*/

/**
 * 深拷贝对象或数组，返回一个新的对象或数组
 * @param {object|array} source
 */
export function deepClone(source) {
  const targetObject = Array.isArray(source) ? [] : {}
  Object.keys(source).map(key => {
    if (source[key] && typeof source[key] === 'object') {
      targetObject[key] = deepClone(source[key])
    } else {
      targetObject[key] = source[key]
    }
  })
  return targetObject
}

/**
 * 调试数据，清除多余的代理属性
 */
export function cleanJson(source) {
  return JSON.parse(JSON.stringify(source))
}
