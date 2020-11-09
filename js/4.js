contractInstance = require('./instance')
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

// publicHashSP(string hash_EncryptedS, string puk_SP, uint no)
function SP_4(encryptKey, no){
	contractInstance.methods. publicKey(encryptKey, no).send(
		{from: from, gas: 8759998})
	.on('transactionHash', function(hash){
	})
	.on('confirmation', function(confirmationNumber, receipt){
	})
	.on('receipt', function(receipt){
	    //resolve(receipt);
	})
	.on('error', console.error); // If a out of gas error, the second parameter is the receipt.

}

function main(){
	// 得到所有未处理的no
	for (let i=0; i<SPs.length; i++){
		contractInstance.methods.SPget_no3('0x'+ SPs[i]).call().then(list=>{
			let no_array = list[0];
			let len = list[1];
			for(let j=0; j<len; j++){
				// 获取客户公钥
				contractInstance.methods.get_pukClient(no_array[j]).call().then(data=>{
					let puk_client = data;
					// 首先读取SP的私钥
					let index = i + 56;
					fs.readFile('../../node'+index+'/private.pem', function (error, data) {
						if (error) {
							console.log(index,':读取private_	SP失败了')
						} else {
							let key = data.toString();
							// 使用客户公钥对 key 进行加密
							var publicKey = new NodeRSA(puk_client);
							var encryptKey = publicKey.encrypt(data.toString(), 'base64');
							SP_4(encryptKey, no_array[j]);
						}
					})

				})
			}
		})
	}
}

main()
