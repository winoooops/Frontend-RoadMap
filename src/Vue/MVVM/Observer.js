
function Observe(data) {
  if (typeof data !== 'object') return
  let dep = new Dep()
  for (let key in data) {
    console.log(key)
    let val = data[key]
    // 递归设置属性, 实现深度响应
    Observe(val)
    // defineProperty
    Object.defineProperty(data, key, {
      configurable: true,
      get() {
        if (Dep.target) {
          dep.addSub(Dep.target)
        }
        return val
      },
      set(newVal) {
        if (newVal === val) return
        val = newVal
        // Todo: fix callstack issue
        Observe(val) // 当设置为新值后，也需要把新值再去定义成属性
        dep.notify()
      }
    })
  }
}