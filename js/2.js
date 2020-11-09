//contractInstance = require('./instance')
var fs = require('fs')
var sha256 = require('js-sha256');
const NodeRSA = require('node-rsa');

const from = '0x6dceBA41b8F5333AaC2E254e3d9e760D3D4c3bC6'
var SPs = [
	"AC80ED5De5Cdbb63eC60BE37e59411982013352c",
	"A2c8bB6b19dd6EceBd579eEeBA531EEE9ADF01F7",
	"7C15697441e7057626B4f22A419aA9d5f6088254",
	"3413B94bD33eA916526096D54b27C2e785FAFC1E",
	"3a805faAf2EcA085e3227B8A0F7E64585523B853",
	"3829B8E3828629Ed75BC5a64b68B0aA141b4D7db"
]


// function publicHashSP(bytes32 hash_EncryptedS, uint id)
function SP_2(hash1, no){
	contractInstance.methods.publicHashSP(hash1, no).send(
		{from: from, gas: 5759998})
	.on('transactionHash', function(hash){
	})
	.on('confirmation', function(confirmationNumber, receipt){
	})
	.on('receipt', function(receipt){
	    resolve(receipt);
	})
	.on('error', console.error); // If a out of gas error, the second parameter is the receipt.

}


function main(){
	// 得到所有未处理的no
	for (let i=0; i<SPs.length; i++){
		contractInstance.methods.SPget_no1('0x'+ SPs[i]).call().then(list=>{
			let no_array = list[0];
			let len = list[1];
			for(let j=0; j<len; j++){
				contractInstance.methods.get_S(no_array[j]).call().then(data => {
					S = data
					// 异步读取文件 
					fs.readFile('./file/code'+S, function (error, file) {
						if (error) {
							console.log('读取file失败了')
						} else {
							// 读取公钥
							let index = i + 56;
							fs.readFile('../../node'+index+'/public.pem', function (error, data) {
								if (error) {
									console.log(index,':读取pub_C失败了')
								} else {
									var begin = new Date();
									// 用公钥加密文件
									var publicKey = new NodeRSA(data.toString());
									var encrypted_file = publicKey.encrypt(file.toString(), 'base64');
									// 将加密后的文件输出
									// fs.writeFile('./file/encrypt/encrypt_code'+no_array[j], encrypted_file, function (error) {
									// 	if (error) {
									// 		console.log('写入encrypt_code'+no_array[j]+':失败')
									// 	} 
									// })
									let hash = sha256(encrypted_file);
									var end=new Date();
									var time=end-begin;
									console.log("time is="+time);
									// 将加密后的哈希写进区块链
									// SP_2(hash, data.toString(), no_array[j])
								}
							})
						}
					})
				})
		
			}
		})
	}
}

function test() {
	var hash = 0x8a1bba1a69ab74ec981d47beae29e5260ab9e07558fbf791f26e951e2623c748;
	var no = 1;
	SP_2(hash, no)
}
test()
