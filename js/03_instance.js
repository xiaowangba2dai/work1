// 引入web3
let Web3 = require('web3')
// 创建web3实例
let web3 = new Web3()
// 设置网络
web3.setProvider('http://localhost:8501')

// 从01_compile.js中复制过来
let abi = [{"constant":true,"inputs":[],"name":"getValue","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_str","type":"string"}],"name":"setValue","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_str","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]
// 在02_deploy.js中生成的合约地址
let address = '0x50025B4D3869148590D9D9fE53b897AC1DC6B4F8'

// 获取合约实例
let contractInstance = new web3.eth.Contract(abi, address)

// 导出合约实例
module.exports = contractInstance
