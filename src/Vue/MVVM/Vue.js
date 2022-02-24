class Vue {
  constructor(options) {
    this.$options = options
    // 模仿vue劫持数据
    let data = this._data = this.$options.data
    let el = this.$el = this.$options.el
    Observe(data)

    // 数据代理
    this.exposeProperty(data)

    // 数据编译
    new Compiler(this.$el, this)
  }

  exposeProperty(data) {
    for (let key in data) {
      Object.defineProperty(this, key, {
        configurable: true,
        get() {
          return this._data[key]
        },
        set(newVal) {
          this._data[key] = newVal
        }
      })
    }
  }
}



