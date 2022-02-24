let target = {}
let game = 'Dying Light 2'
target.platform = 'Steam'


Object.defineProperty(target, 'game', {
  // value: 'Dying Light', 
  configurable: true, // 是否可以删除 默认为 false
  // writable: true, // 是否可以修改, 默认为 false
  enumerable: true, // 是否可以枚举, 默认为 false

  /* get, set 设置不能设置 writable 和 value */
  get() {
    return game
  },

  set(newGame) {
    game = newGame
  }
})