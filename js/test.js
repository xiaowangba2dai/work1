// var sha256 = require('js-sha256');
// const NodeRSA = require('node-rsa');
// var fs = require('fs')
//
// const crypto = require('crypto');
//
// function aesEncrypt(data, key) {
//     const cipher = crypto.createCipher('aes192', key);
//     var crypted = cipher.update(data, 'utf8', 'hex');
//     crypted += cipher.final('hex');
//     return crypted;
// }
//
// function aesDecrypt(encrypted, key) {
//     const decipher = crypto.createDecipher('aes192', key);
//     var decrypted = decipher.update(encrypted, 'hex', 'utf8');
//     decrypted += decipher.final('utf8');
//     return decrypted;
// }
//
// fs.readFile('./code', function (error, file) {
//     if (error) {
//         console.log('读取file失败了')
//     } else {
//         var data = file.toString();
//         var key = '123456';
//         var encrypted = aesEncrypt(data, key);
//         var decrypted = aesDecrypt(encrypted, key);
//
//         // 读取公钥加密
//         fs.readFile('./node1/public.pem', function (error, puk) {
//             if (error) {
//                 console.log(index, ':读取pub_C失败了')
//             } else {
//                 var publicKey = new NodeRSA(puk.toString());
//                 var encrypted_file = publicKey.encrypt(file.toString(), 'base64');
//                 // 将加密后的文件输出
//                 fs.writeFile('./encrypted_code', encrypted_file, function (error) {
//                 	if (error) {
//                 		console.log('写入encrypt_code:失败')
//                 	}
//                 })
//             }
//         }
//     }
// })

