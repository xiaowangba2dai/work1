// 导入合约实例
let contractInstance = require('./instance')
const from = '0xbDbC2392F938d67Ea37075eC5A71821f18cF75E0'

// 调用合约方法
contractInstance.methods.getValue().call().then(data => {
    console.log("data : ", data)
 
    // 测试合约的setValue方法
    contractInstance.methods.setValue("hello handsomeboy").send({
        from : from,
        value : 0,
    }).then(res => {
        contractInstance.methods.getValue().call().then(data => {
            console.log("data : ", data)
        })
    })
})
