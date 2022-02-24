const obj = {
  foo: {
    bar: 1
  }
}

const arr = ['foo', 'bar']

let result = obj
result = arr.reduce((prev, curr) => prev[curr], result)

console.log(result)