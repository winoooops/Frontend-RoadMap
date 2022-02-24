/**
 * @param {HTMLDivElement} el 
 * @param {Vue} vm 
 */
class Compiler {
  constructor(el, vm) {
    // 将el挂载到实例上方便调用
    vm.$el = document.querySelector(el)

    // 借助文档碎片移到内存中
    let fragment = document.createDocumentFragment()
    const child = vm.$el.firstElementChild
    if (child) { // Vue中要求模版放在一个标签中包裹起来
      fragment.appendChild(child) // 将el中的内容放在内存中
    }

    // 替换el里面的内容
    this.replaceElement(fragment, vm)

    vm.$el.appendChild(fragment)
  }

  replaceElement(frag, vm) {
    const childNodes = Array.from(frag.childNodes)
    childNodes.forEach(node => {
      let text = node.textContent
      let reg = /\{\{(.*?)\}\}/g; // 正则匹配{{}}

      const { nodeType, childNodes } = node
      if (nodeType === 1) {
        console.log('编译元素', node)
        const children = Array.from(childNodes).map(childNode => childNode.nodeValue)
        // 如果节点是input输入框
        const nodeAttrs = Array.from(node.attributes)

        nodeAttrs.forEach(attr => {
          const propName = attr.name
          const propVal = attr.value
          // Data binding
          if (propName.includes('v-')) {
            node.value = vm[propVal]
          }

          new Watcher(vm, propVal, newVal => node.value = newVal)

          // Event Listener
          node.addEventListener('input', e => {
            let newVal = e.target.value

          })
        })


        console.log('元素拥有子元素', children)
        if (children.length) {
          console.log('编译子元素')
          console.log(children)
          this.replaceElement(node, vm)
        }
      }
      else if (nodeType === 3 && reg.test(text)) {
        console.log('编译文本')
        node.textContent = text.replace(reg, (matched, placeholder) => {
          console.log(vm)
          console.log(placeholder)
          const prop = placeholder.trim()
          new Watcher(vm, prop, () => replaceText(vm, node, text, reg))
          const arr = prop.split('.')
          return arr.reduce((prev, curr) => prev[curr], vm)
        })
      }
    })
  }
}

function replaceText(vm, node, text, reg) {
  node.textContent = text.replace(reg, (matched, placeholder) => {
    console.log(placeholder)
    placeholder = placeholder.trim()
    new Watcher(vm, placeholder, () => replaceText(vm, node, text, reg))
    return placeholder.split('.').reduce((prev, curr) => prev[curr], vm)
  })
}

function elementNodes(node) {
  const nodeList = []
  node.childNodes.forEach(childNode => {
    // if (childNode.nodeType === 3 && childNode.nodeValue.indexOf('\n')) return
    nodeList.push(childNode)
  })
  return nodeList
}