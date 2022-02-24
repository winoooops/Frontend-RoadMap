import { activeEffect, effect } from './effect'
const { ref } = require('./ref')


let targetMap = new WeakMap()

// const effect = () => total = product.price * product.quantity

export const tracker = (target, key) => {
  if (!activeEffect) return // 获取值的时候不触发, 只在发生改变时触发
  console.log(`enable with ${key}`)
  let depsMap = targetMap.get(target)
  if (!depsMap) targetMap.set(target, depsMap = new Map())

  let dep = depsMap.get(key)
  if (!dep) depsMap.set(key, dep = new Set())

  dep.add(activeEffect)
}

export const trigger = (target, key) => {
  let depsMap = targetMap.get(target)
  if (!depsMap) return

  let dep = depsMap.get(key)
  if (!dep) return

  dep.forEach(eff => eff())
}

export const reactive = (target) => {
  const handler = {
    get(target, key, receiver) {
      let result = Reflect.get(target, key, receiver)
      tracker(target, key)
      return result
    },
    set(target, key, value, receiver) {
      let old = target[key]
      let result = Reflect.set(target, key, value, receiver)
      if (old && old !== result) trigger(target, key)
      return result
    }
  }

  return new Proxy(target, handler)
}

const total = ref(0)
const salePrice = ref(0)
const product = reactive({ price: 5, quantity: 2 })

effect(() => salePrice.value = product.price * 0.8)
effect(() => total.value = salePrice.value * product.quantity)

console.log(total.value)