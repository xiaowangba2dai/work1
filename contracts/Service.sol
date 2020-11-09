pragma solidity ^0.4.24;

contract ServiceInterface{
    // 正常服务流程
    
    // 1. 客户端请求服务S，指定SP地址，S名称，并把公钥上传到区块链 
    function requestService(string address_C, string address_SP, string name_S, string puk_C) public returns(uint no);
    
    // 2. 服务提供商向客户C发布加密S的Hash
    function publicHashSP(string hash_EncryptedS, uint no) public;
    
    // 3. 客户端链下收到加密服务S后, 发布加密S的Hash验证
    function publicHashClient(string value, uint no) public;
    
    // 4. 服务提供商发布客户公钥加密的 key
    function publicKey(string encryptd_key, uint no) public;
    
    // 5. 客户端验证服务,并发布服务正确的验证, 0正确，1客户得不到key，2客户得到的key解不开服务    
    function publicServiceConfirm(int type_S, uint no) public;

    //
    function byte32ToString(bytes32 b) public pure returns (string);
    
    // 
    function get_nameS(uint no) public view returns(string);
    
    function get_addressSP(uint no) public view returns(string);
    
    function get_addressC(uint no) public view returns(string);
    
    function get_serviceState(uint no) public view returns(int);
    
    function get_pukClient(uint no) public view returns(string);
    
    function get_hashOfEncryptedS(uint no) public view returns(string);
    
    function get_encryptedKey(uint no) public view returns(string);
    
}

contract Service is ServiceInterface{
    event RequestService(string ret, uint no);
    event SP_Public_HashOfEncryptedS(string ret);
    event Client_Public_HashOfEncryptedS(string ret);
    event SP_Public_EncryptedKey(string ret);
    event Client_Public_ServiceConfirm(string ret);
        
    struct Services{
        // 1. 服务名称
        string nameS;  
        // 2. SP address
        string addressSP;
        // 3. Client address
        string addressC;
        // 4. 服务的状态（1,2,3,4,5）
        int serviceState;
        // 5. 客户的公钥
        string pukClient;
        // 6. Hash(Encryptd(S))
        string hashOfEncryptedS;
        // 7. Encrypted(key)
        string encryptedKey;
    }
    
    mapping(uint => Services) services;
    uint public count = 1;
    
    // 部署合约 
    constructor() public {
    }
    
    // 1. 客户端请求服务S，指定SP地址，S名称，并把公钥上传到区块链 
    function requestService(string address_C, string address_SP, string name_S, string puk_C) public returns(uint no){
        services[count].nameS = name_S;
        services[count].addressC = address_C;
        services[count].addressSP = address_SP;
        services[count].pukClient = puk_C;
        services[count].serviceState = 1;
        
        no = count;
        count++;
        emit RequestService('Service Request', no);
    }
    
    // 2. 服务提供商发布加密S的Hash
    function publicHashSP(string hash_EncryptedS, uint no) public{
        require(services[no].serviceState == 1);
        
        services[no].hashOfEncryptedS = hash_EncryptedS;
        services[no].serviceState = 2;
        string memory ret = "SP public hashOfEncryptedS: Success";
    
        emit SP_Public_HashOfEncryptedS(ret);
    }
    
    
    // 3. 客户端链下收到加密服务S后, 发布加密S的Hash验证
    function publicHashClient(string value, uint no) public{
        require(services[no].serviceState == 2);
        string memory ret = '';
        if(sha256(abi.encode(services[no].hashOfEncryptedS)) == sha256(abi.encode(value))){
            services[no].serviceState = 3;
            ret = "Client public the same hashOfEncryptedS";
        }
        else{
            services[no].serviceState = 0;
            ret = "Transaction Terminated";
        }
        emit Client_Public_HashOfEncryptedS(ret);
    }
    
    // 4. 服务提供商发布客户公钥加密的 key, 还有hash_key 
    function publicKey(string encryptd_key, uint no) public{
        require(services[no].serviceState == 3);
       
        services[no].encryptedKey = encryptd_key;
        services[no].serviceState = 4;
        string memory ret = "SP public encryptd_key: Success";
        emit SP_Public_EncryptedKey(ret);
    }
    
    
    // 5. 客户端验证服务    
    function publicServiceConfirm(int type_S, uint no) public{
        require(services[no].serviceState == 4);
        string memory ret = '';
        if(type_S == 1){
            services[no].serviceState = 0;
            ret =  "Transaction Finish";
        }
        else{
            ret = "Macious Client";
        }
        emit Client_Public_ServiceConfirm(ret);
    }
    
    
    function byte32ToString(bytes32 b) public pure returns (string) {
       
       bytes memory names = new bytes(b.length);
       
       for(uint i = 0; i < b.length; i++) {
           
           names[i] = b[i];
       }
       
       return string(names);
    }

    function get_nameS(uint no) public view returns(string){
        return services[no].nameS;
    }
    
    function get_addressSP(uint no) public view returns(string){
        return services[no].addressSP;
    }
    
    function get_addressC(uint no) public view returns(string){
        return services[no].addressC;
    }
    
    function get_serviceState(uint no) public view returns(int){
        return services[no].serviceState;
    }
    
    function get_pukClient(uint no) public view returns(string){
        return services[no].pukClient;
    }
    
    function get_hashOfEncryptedS(uint no) public view returns(string){
        return services[no].hashOfEncryptedS;
    }
    
    function get_encryptedKey(uint no) public view returns(string){
        return services[no].encryptedKey;
    }
    
}
