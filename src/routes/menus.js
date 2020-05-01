import path from 'path'
import { deepClone } from '../utils'
import { publicRoutes, authorizeRoutes } from './index'

const menus = Array.from(deepClone([...publicRoutes, ...authorizeRoutes]))

const generatorCleanMenu = (menus = [], basePath = '/') => {
  const result = []
  for (let item of menus) {
    if (item.hidden === true) {
      continue
    }
    const onlyOneShowingChild = onlyOneShowChild(item.children, item)

    if (item.children && onlyOneShowingChild) {
      item = onlyOneShowingChild
    }

    const data = {
      path: path.resolve(basePath, item.path),
      title: item.meta && item.meta.title,
    }

    if (item.children) {
      data.children = generatorCleanMenu(item.children, data.path)
    }

    result.push(data)
  }
  return result
}

const onlyOneShowChild = (children = [], parent) => {
  let onlyOneChildren = null
  const showChildren = children.filter(item => !item.hidden)

  if (showChildren.length === 1) {
    onlyOneChildren = children[0]
    onlyOneChildren.path = path.resolve(parent.path, onlyOneChildren.path)
    return onlyOneChildren
  }

  if (showChildren.length === 0) {
    onlyOneChildren = { ...parent, path: '', noShowingChildren: true }
    return onlyOneChildren
  }

  return false
}

const cleanMenus = generatorCleanMenu(menus)

export default cleanMenus

export function generatorRoute(checkedKey = [], routes = menus, basePath = '/') {
  const result = []

  for (const route of routes) {
    const routePath = path.resolve(basePath, route.path)

    if (route.children) {
      route.children = generatorRoute(checkedKey, route.children, routePath)
    }

    /**
     * (route.children && route.children.length >= 1) 逻辑是为了处理特殊情况
     * 例如路由中的首页 path = '/'，但实际渲染出来的path = '/home' 为了可以时它们匹配上 特殊处理了
     */
    if (checkedKey.includes(routePath) || (route.children && route.children.length >= 1)) {
      result.push(route)
    }
  }

  return result
}
