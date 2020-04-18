import defaultSetting from '../setting'

const title = defaultSetting.title || '云平台管理系统'

export function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
