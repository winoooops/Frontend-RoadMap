const throttle = (fn, wait) => {
  let timer
  return (...args) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
      timer = null
    }, wait)
  }
}

const input = document.createElement('input')
input.addEventListener('keydown', throttle((e) => console.log(e.target.value), 500))
document.body.appendChild(input)
