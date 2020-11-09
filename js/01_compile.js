// 导入solc和fs
let solc = require('solc')
let fs = require('fs')

// 读取合约代码
let contractCode = fs.readFileSync('../contracts/SimpleStorage.sol', 'utf-8')

// 编译合约代码
let output = solc.compile(contractCode, 1)
console.log(output)
// 执行导出
module.exports = output['contracts'][':SimpleStorage']
console.log('bytecode : ', output['contracts'][':SimpleStorage']['bytecode'])
console.log('abi : ', output['contracts'][':SimpleStorage']['interface'])
