// let user = {
//   firstname: "Wei",
//   lastname: "Wang",

//   get fullname() {
//     return `${this.firstname} ${this.lastname}`
//   },

//   set fullname(value) {
//     [this.firstname, this.lastname] = value.split(' ')
//   }
// }

// console.log(user.fullname)
// user.fullname = 'Yanan Ying'
// console.log(user.firstname)
// console.log(user.lastname)

import { tracker, trigger } from './reactive'

const ref = (raw) => {
  const r = {
    get value() {
      tracker(r, 'value')
      return raw
    },

    set value(newVal) {
      raw = newVal
      trigger(r, 'value')
    }
  }

  return r
}

export {
  ref
}