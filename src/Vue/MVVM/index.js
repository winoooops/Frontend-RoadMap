// import { Vue } from './Vue'
// import { Compiler } from './compilier'
// import { Dep, Watcher } from './Watcher'
const { Vue } = require('./Vue')
const { Dep, Watcher } = require('./compiler')


const container = document.createElement('div')
container.setAttribute('id', 'app')


// const text = document.createTextNode('Hi, I am playing ...')
document.body.appendChild(container)

const vm = new Vue({
  el: `#app`,
  data: {
    platform: 'Steam',
    game: 'Dying Light',
    account: {
      userId: 'winoooops',
      email: 'xxx@abc.com'
    }
  }
})

console.log(vm.game)
console.log(vm.account)
console.log(vm.platform)
console.log(vm)


// container.appendChild(text)

// Compiler('#app', vm)
// Compiler('#app', vm)
// console.log(container)

let watcher = new Watcher(() => console.log('watcher mode on'))
let dep = new Dep()

dep.addSub(watcher)
dep.addSub(watcher)
dep.notify()


