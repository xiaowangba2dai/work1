// 使用 require 方法加载 fs 核心模块
var fs = require('fs')
// 导入生成非对称密钥模块
const NodeRSA = require('node-rsa');

function generateKeyPair(pkcsType,pkcsSize) {
	  pkcsType = pkcsType ? pkcsType : 'pkcs8';//不为空则 设置为传入参数，为空则 设置为 pkcs8
	  console.log('pkcsType=' + pkcsType);
	  pkcsSize = pkcsSize || 512;
	  //1.创建RSA对象，并指定 秘钥长度
	  var key = new NodeRSA({ b: pkcsSize });
	  key.setOptions({ encryptionScheme: 'pkcs1' });//指定加密格式
	 
	  //2.生成 公钥私钥，使用 pkcs8标准，pem格式
	  var _pubKey = key.exportKey(pkcsType+'-public-pem');//制定输出格式
	  var _priKey = key.exportKey(pkcsType + '-private-pem');
	  //console.log(key.$options);
	  console.log(pkcsType+'公钥:\n', _pubKey);
	  console.log(pkcsType+'私钥:\n', _priKey);
	fs.writeFile('../key/pubKey.txt', _pubKey, function (error) {
		if (error) {
			console.log('写入pubKey失败')
		} else {
			console.log('写入pubKey成功')
		}
	})
	
	fs.writeFile('../key/priKey.txt', _priKey, function (error) {
		if (error) {
			console.log('写入priKey失败')
		} else {
			console.log('写入priKey成功')
		}
	})
   
//	var publicKey = new NodeRSA(_pubKey);
//	var encrypted = publicKey.encrypt('abc hello rsa', 'base64');
//	console.log(encrypted);

//	var privateKey = new NodeRSA(_priKey);
//	decrypted = privateKey.decrypt(encrypted, 'utf8');
//	console.log(decrypted);
}
 
generateKeyPair();
