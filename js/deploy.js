// 从“01_compile”中导入bytecode和interface
let {bytecode, interface} = require('./compile')

// 创建Web3实例
// 1.引入web3
let Web3 = require('web3')
// 2.创建web3实例
let web3 = new Web3()
// 3.设置网络
web3.setProvider('http://localhost:8501')

// 创建Contract对象
let contract = new web3.eth.Contract(JSON.parse(interface))

// 合约拥有者的帐号
const account = '0x6dceBA41b8F5333AaC2E254e3d9e760D3D4c3bC6'


//if(hashOfS.length == 0){
	// 部署合约
contract.deploy({
	data : '0x'+bytecode,
}).send({
	from : account,
	gas : '3000000',
}).then(instance => {
	console.log("contract address : ", instance.options.address)
})
//}

