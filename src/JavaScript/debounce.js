const debounce = (fn, wait) => {
  let timer

  return (...args) => {
    if (wait) clearTimeout(wait)
    console.log(...args)
    timer = setTimeout(() => fn(...args), wait)
  }
}

window.onresize = debounce(() => console.log('resize'),)
