// 导入合约实例
let contractInstance = require('./instance')
const from = '0x6dceBA41b8F5333AaC2E254e3d9e760D3D4c3bC6'

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
