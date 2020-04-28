const req = require.context('../../icons/svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys()

const reg = /\.\/(.*).svg/

const svgIcons = requireAll(req).map(path => {
  return path.match(reg)[1]
})

export default svgIcons
