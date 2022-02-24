class Promise {
  constructor(executor) {
    this.state = "PENDING" // pending为初始态，并可以转化为fulfilled和rejected
    this.value = undefined // 成功时，不可转为其他状态，且必须有一个不可改变的值
    this.reason = undefined // 失败时，不可转为其他状态，且必须有一个不可改变的原因

    // resolve/pending 队列机制
    this.resolveFns = []
    this.rejectFns = []

    const resolve = (value) => {
      // Todo: 为什么需要setTimeout
      setTimeout(() => {
        this.state = 'RESOLVED'
        this.value = value
        this.resolveFns.forEach(({ executor, resolve: res, reject: rej }) => res(executor(value)))
      })
    }

    const reject = (reason) => {
      setTimeout(() => {
        this.state = "REJECTED"
        this.reason = reason
        this.rejectFns.forEach(({ executor, resolve: res, reject: rej }) => rej(executor(reason)))
      })
    }

    executor(resolve, reject)
  }

  then(cb) {
    if (this.state === 'RESOLVED') {
      const result = cb(this.value)
      // 如果为resolved, 直接执行
      return Promise.resolve(result)
    }

    if (this.state === 'PENDING') {
      return new Promise((resolve, reject) => {
        // 推进队列中, resolved后统一执行
        this.rejectFns.push({ cb, resolve, reject })
      })
    }
  }

  catch(cb) {
    if (this.state === 'REJECTED') {
      const result = cb(this.reason)
      return Promise.reject(result)
    }

    if (this.state === 'PENDING') {
      return new Promise((resolve, reject) => {
        this.rejectFns.push({ cb, resolve, reject })
      })
    }
  }
}

const myPromise = new Promise((resolve, reject) => {
  console.log(resolve)
  console.log(reject)
  if (Math.random() * 10 > 5) {
    resolve('successful')
  } else {
    console.log(reject)
    reject('fail')
  }
})

myPromise
  .then(res => console.log(res))
  .catch(err => console.error(err))