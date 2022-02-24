function Dep() {
  this.subs = []
}

Dep.prototype.addSub = function (sub) {
  this.subs.push(sub)
}

Dep.prototype.notify = function () {
  this.subs.forEach(sub => sub.update())
}


function Watcher(vm, prop, fn) {
  this.fn = fn
  this.vm = vm
  this.prop = prop

  Dep.target = this
  let arr = prop.split('.')
  let val = vm
  val = arr.reduce((prev, curr) => prev[curr], val) // 触发Object.prototype.get方法
  Dep.target = null
}

Watcher.prototype.update = function () {
  let arr = this.prop.split('.')
  let val = this.vm
  val = arr.reduce((prev, curr) => prev[curr], val)
  this.fn(val)
}