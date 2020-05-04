export function tableStatusToText(value) {
  switch(value) {
    case 1:
      return '启用'
    case 2:
      return '禁用'
    default:
      return 'unknown'
  }
}
