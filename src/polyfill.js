const delay = function(delay = 3000) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, delay)
  })
}

Promise.delay = delay
