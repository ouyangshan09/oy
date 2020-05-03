export function tableStatusToText(value) {
  switch(value) {
    case 0:
      return '启用'
    case 1:
      return '禁用'
    default:
      return 'unknown'
  }
}
