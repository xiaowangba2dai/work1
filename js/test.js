var Web3 = require("web3")

// 创建web3实例
let web3 = new Web3()
// 设置网络
web3.setProvider('http://localhost:8545')
        
var contractAbi = [ { "constant": false, "inputs": [ { "name": "s", "type": "string" } ], "name": "setvalue", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x1ee41bab" }, { "constant": true, "inputs": [], "name": "getvalue", "outputs": [ { "name": "", "type": "string", "value": "" } ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x69bd01c4" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "s", "type": "string" } ], "name": "orderlog", "type": "event", "signature": "0x6e19d00d6acd7e246222deba0dfdbd247b0f839b350d0c1cf4171866236eec18" } ]

var contractaAddress = "0x77eFFb809804d15Ba72019D2F3677E2a15dDf415";
        
MyContract = new web3.eth.Contract(contractAbi, contractaAddress);
             
/*    
var myEvent = MyContract.events.Do({
        filter:{},
        fromBlock: 0
}, function(error, event){})
        .on('data', function(event){
        console.log(event); // same results as the optional callback above
})
        .on('changed', function(event){
                    // remove event from local database
        })        
    .on('error', console.error);
    
*/

    MyContract.getPastEvents('allEvents', {
        filter: {},
        fromBlock: 0,
        toBlock: 'latest'
    }, function(error, events){ console.log(events); })
    .then(function(events){
        console.log(events) // same results as the optional callback above
    });

