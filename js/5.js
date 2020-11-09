contractInstance = require('./instance')
var fs = require('fs')
var sha256 = require('js-sha256');
const NodeRSA = require('node-rsa');

const from = '0x6dceBA41b8F5333AaC2E254e3d9e760D3D4c3bC6'

var Clients = [
	"e25d644eeBaA720E6458564C6a77E112398BAf21",
	"d7f7cFe37e20A810A161e1a2cB1A724c70CF0Fa1",
	"A7C7f9408c4956E51B1B6e587F82A75c4C398626",
	"a141CeE8B37c9Ca87448872C8ca74024Bc0aE35D",
	"26AC512A6C5c6402005C75241dCF24359b93C86f",
	"63b5005D2ef0924FcDEa320BB422d5f68C0c5C85",
	"BBafa0B7dd86CA675108ec1A2990D93390cF2Fc9",
	"9e6af2c07AD34EBBEBE716Da3AcdD95e74BFC24a",
	"7359c1f5BE269c4673E907511dF4d1728aa500d2",
	"77c3DccD6D4157420e098c9FfB9C4F61633D5F49",
	"0a1D36378246FB4EdD1Af9ce62fFdAc127DF0367",
	"b40576343C24cEe2992C99e1fB220d4F37681183",
	"5ce0f0a9Dcc364699Ef309d2e7602d459163b9D9",
	"CE81AEcd961574d346CAcb7Fea337832C4F6ca07",
	"91E6dcD5DCBDA3ca09f9Ef8e5A1D3E09E39A235e",
	"c1c8B23c6ACE20A3559f9Aa08B2D580E5936F448",
	"204D33124C34143810cb0e2C94D2f728c8bB85D3",
	"033bC4E787f1904c1e1Ff241462f14376BEcd1a4",
	"26b0F4066BCFbC4B88B37EB41b8F645e705916f3",
	"4810B7c7eF515604F2c164075B3b63640F6DB8b1",
	"c990745b455efA22f1f2F762a68972c3889fFC09",
	"07Aa110B2539025Ca8a7C9AABEb5F2280a475122",
	"3D87876B2C6716bEbd47bc44891E6B16bdc9aaC3",
	"24965fEF90200a8538F535EbaA5435d8511A3b07",
	"0630B9C93e863d27e6DDe4773eccB0BccB58E35d",
	"7Ec1745b189648EB928e368e2ecD54cF27025564",
	"C7c91e5dadA86232293a3e053d1C69BF61e64Dc5",
	"2284CAa5b51fd334AB24065Ab09880d212500fcB",
	"78Ad76Be388Ffe2297b6AE38aBB511233c8fCeDb",
	"A70CCbFb9bfd066c5Feac59b8938c80Da0B9DF53",
	"9F80b415FAc8f60D5c937A1a46a07eFcAe47E02d",
	"84906Ee3eb45b7DE8299E96d0F7E69994dC77CCC",
	"A00D604E8492bf6F9aF231502D959b66b7B27448",
	"BD771488B4f21a5f474E4590F35dd7e4f426c4B0",
	"4d549A67e9697A09d5A1D742cEAc9438Ef33Af67",
	"1796F7b7144131863c8475B858383ED0c98BF760",
	"2A0d5b59C1d059e0fd9Ee2F1EF77C212567b1699",
	"Ffa485f28A156E46027801d4Eb8AeeB909194496",
	"73c9c37CBa34cD6f05B1c4B91dd39b61469cBfe9",
	"7E84E3678885F0f5d023D53c88Ec57B949206500",
	"b3f2E131d8d12b36db3319A4fee44767b77b08E2",
	"6aF7E09b21d4acbd68Eb38dAbAfbCDbD3A09E5f6",
	"8b36ef7b8EF35A4070bC446fBc0bE52DBBCCA49D",
	"5De3BF1660F5939acb52D19454b1246bDA38CC6A",
	"d6f7C1144A410551560a997fF1Af88C4337E6Ba2",
	"110DA1618Ceb9DfB26584C11Ce6558eF7ab03Da8",
	"45C0375C03807783c0ac04ce1d16bc885864342b",
	"F92c510777540C1395cA3C8001e8B9ccF94eC5F7",
	"2B3398f05878c520Eb05Bf8D6e0c1F4D436b5581",
	"c8B2b40Ce8FA3A005f5078B7770ad5F1934963b2"
]

// publicServiceConfirm
function Client_5(type, no){
	contractInstance.methods.publicServiceConfirm(type, no).send(
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
	for (let i=0; i<Clients.length; i++){
		contractInstance.methods.Cget_no4('0x'+ Clients[i]).call().then(list=>{
			let no_array = list[0];
			let len = list[1];
			for(let j=0; j<len; j++){
				// 获取encrypedKey
				contractInstance.methods.get_encryptedKey(no_array[j]).call().then(data=>{
					let encryptKey = data;
					// 读取Client的私钥
					let index = i + 6;
					fs.readFile('../../node'+index+'/private.pem', function (error, data) {
						if (error) {
							console.log(index,':读取private_C失败了')
						} else {
							let client_private_key = data.toString();
							// 使用客户私钥对encryptKey进行解密
							var privateKey = new NodeRSA(client_private_key);
							var key = privateKey.decrypt(encryptKey, 'utf8');
                            //console.log(no_array[j],'key: ', key);
							// 读取加密文件
							fs.readFile('./file/encrypt/encrypt_code'+no_array[j], function(error, data){
								if(error){
									console.log('读取加密文件失败')
								}else{
									// 使用key解密加密文件
									var privateKey = new NodeRSA(key);
									var raw_file = privateKey.decrypt(data.toString(), 'utf8');
									//console.log(raw_file);
									Client_5(1, no_array[j])
								}
							})
						}
					})

				})
			}
		})
	}
}


main()
