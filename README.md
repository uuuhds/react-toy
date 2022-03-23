# React 简单实现版本

```bash
npm install
npm run dev
```

## V1
实现简单版本的渲染，比如`<div id="hello">Hello</div>`，首先规范虚拟`dom`的对象
http://localhost:9000/v1.html
```js
{
    type: 'div',
    props: {
        id: 'hello',
        children: [
            {
                type: 'TEXT_ELEMENT',
                props: {
                    children: [],
                    nodeValue: 'Hello'
                }
            }
        ]
    }
}
```

这样做得目的是为了规范的给文本节点添加属性

可以通过递归的方式向`dom`节点上添加元素

## V2
上面的版本会有一个问题，当树的层级过深时会长时间占用主线程，可能无法及时响应用户输入或者造成动画卡顿。
所以我们将递归任务拆成更小的单元，在主线程空闲的时候去执行对应的任务。

首先更改一下数据结构，将树形的数据结构更改为双链表形式的，构建fiber节点。
http://localhost:9000/v2.html

## V3
V2因为每次将节点挂在到父节点上，但是因为每次都是在主线程空闲时去执行的，所以上个版本的问题是在每次插入的过程中会遇到不完整UI的情况，这一版本我们对V2版本进行优化，将`performUnitOfWork`阶段的添加`dom操作`放到缓存中进行操作，先执行构建fiber节点的动作，当所有fiber节点构建完成后，统一执行`commitRoot`动作，这个地方注意，构建fiber节点在时间上是非线性的，但是`commitRoot`函数是同步执行的。

## V4
V3版本已经支持了Fiber的构建，同时也将dom的操作变成了同步，在V4版本我们将支持更新和删除。此时我们使用双缓存技术对替代节点进行暂存。此版本我们为fiber节点添加了三种`effectTag`，分别为新增(PLACEMENT)，修改(UPDATE)和删除(DELETION)。

