import Vue from 'vue'
import Clipboard from 'clipboard'

function clipboardSuccess() {
  Vue.prototype.$message({
    type: 'success',
    message: '复制成功',
    duration: 1000,
  })
}

function clipboardFailure() {
  Vue.prototype.$message({
    type: 'error',
    message: '复制失败',
    duration: 1000,
  })
}

export default function handleCopyToClipboard(text, event) {
  const clipboard = new Clipboard(event.target, {
    text: () => text,
  })
  clipboard.on('success', () => {
    clipboardSuccess()
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    clipboardFailure()
    clipboard.destroy()
  })
  clipboard.onClick(event)
}
