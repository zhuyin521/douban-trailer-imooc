const {readFile} = require('fs')
const EventEmitter = require('events')

class EE extends EventEmitter {}

const yy = new EE()

yy.on('event', () => {
    console.log('出大事了')
})

setTimeout(() => {
    console.log('0毫秒后到期执行的定时器回调')
}, 0);

setTimeout(() => {
    console.log('100毫秒后到期执行的定时器回调')
}, 100);

setTimeout(() => {
    console.log('200毫秒后到期执行的定时器回调')
}, 200);

readFile('../package.json', 'utf-8', data => {
    console.log('完成文件 1 读操作的回调')
})

readFile('../README.md', 'utf-8', data => {
    console.log('完成文件 2 读操作的回调')
})

setImmediate(() => {
    console.log('immediate 立即回调')
})

// 最先执行
process.nextTick(() => {
    console.log('process.nextTick 的回调')
})

//第二执行
Promise.resolve()
    .then(() => {
        yy.emit('event')

        process.nextTick(() => {
            console.log('process.nextTick 的第 2 次回调' )
        })
        console.log('Promise 的第 1 次回调')
    })
    .then(() => {
        console.log('Promise 的第 2 次回调')
    })


    /** 执行结果：
process.nextTick 的回调
出大事了
Promise 的第 1 次回调
Promise 的第 2 次回调
process.nextTick 的第 2 次回调
0毫秒后到期执行的定时器回调
完成文件 1 读操作的回调
完成文件 2 读操作的回调
immediate 立即回调
100毫秒后到期执行的定时器回调
200毫秒后到期执行的定时器回调
     */