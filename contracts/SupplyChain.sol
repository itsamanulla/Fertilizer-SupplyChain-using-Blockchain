// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;

contract  SupplyChain {
    //Smart Contract owner will be the person who deploys the contract only he can authorize various roles like retailer, Manufacturer,etc
    address public Owner;

    //note this constructor will be called when smart contract will be deployed on blockchain
    constructor() public {
        Owner = msg.sender;
    }

    //Roles (flow of  supply chain)
    // RawMaterialSupplier; //This is where Manufacturer will get raw materials to make fertilizers
    // Manufacturer;  //Various  guidelines should be followed by this person
    // Distributor; //This guy distributes the fertilizers to retailers
    // Retailer; //Normal customer buys from the retailer

    //modifier to make sure only the owner is using the function
    modifier onlyByOwner() {
        require(msg.sender == Owner);
        _;
    }

    //stages of a fertilizer in  supply chain
    enum STAGE {
        Init,
        Manufacture,
        Certified,
        Returned,
        Distribution,
        Retail,
        sold
    }
    //using this we are going to track every single fertilizer the owner orders

    //Fertilizer count
    uint256 public fertilizerCtr = 0;
    // //Raw material supplier count
    // uint256 public rmsCtr = 0;
    //Manufacturer count
    uint256 public manCtr = 0;
    //distributor count
    uint256 public CertCtr = 0;
    //Certification Agency count
    uint256 public disCtr = 0;
    //retailer count
    uint256 public retCtr = 0;
    //subsidy counter of sell product
   // uint256 public subCtr = 0;

    //To store information about the fertilizer
    struct fertilizer {
        uint256 id; //unique fertilizer id
        string name; //name of the fertilizer
       // string description; //about fertilizer
        uint256 quantity; // quantity in kg
        string city; //about city
        uint256 subsidyprice; //subsidy price per kg
       
        uint256 manfprice; //manf price per kg
        
       
        uint256 MANid; //id of the Manufacturer for this particular fertilizer
        uint256 CERid; //id of the Manufacturer for this particular certification agency
        uint256 DISid; //id of the distributor for this particular fertilizer
        uint256 RETid; //id of the retailer for this particular fertilizer
        uint256 sendsubsidy; //total money of subsidy to send
        STAGE stage; //current fertilizer stage
    }

    //To store all the fertilizers on the blockchain
    mapping(uint256 => fertilizer) public FertilizerStock;

    //To show status to client applications
    function showStage(uint256 _fertilizerID)
        public
        view
        returns (string memory)
    {
        require(fertilizerCtr > 0);
        if (FertilizerStock[_fertilizerID].stage == STAGE.Init)
            return "Fertilizer Ordered";
       // else if (FertilizerStock[_fertilizerID].stage == STAGE.RawMaterialSupply)
       //     return "Raw Material Supply Stage";
        else if (FertilizerStock[_fertilizerID].stage == STAGE.Manufacture)
            return "Manufacturing Stage";
        else if (FertilizerStock[_fertilizerID].stage == STAGE.Certified)
            return "Certified";
        else if (FertilizerStock[_fertilizerID].stage == STAGE.Returned)
            return "Returned";
        else if (FertilizerStock[_fertilizerID].stage == STAGE.Distribution)
            return "Distribution Stage";
        else if (FertilizerStock[_fertilizerID].stage == STAGE.Retail)
            return "Retail Stage";
        else if (FertilizerStock[_fertilizerID].stage == STAGE.sold)
            return "Fertilizer Sold";
    }

    // //To store information about raw material supplier
    // struct rawMaterialSupplier {
    //     address addr;
    //     uint256 id; //supplier id
    //     string name; //Name of the raw material supplier
    //     string place; //Place the raw material supplier is based in
    // }

    // //To store all the raw material suppliers on the blockchain
    // mapping(uint256 => rawMaterialSupplier) public RMS;

    //To store information about manufacturer
    struct manufacturer {
        address  addr;
        uint256 id; //manufacturer id
        string name; //Name of the manufacturer
        string place; //Place the manufacturer is based in
        
    }

    //To store all the manufacturers on the blockchain
    mapping(uint256 => certification) public  CERT;

    struct certification {
        address  addr;
        uint256 id; //agency id
        string name; //Name of the agency
        string place; //Place the agency is based in
    }

    //To store all the manufacturers on the blockchain
    mapping(uint256 => manufacturer) public  MAN;

    //To store information about distributor
    struct distributor {
        address addr;
        uint256 id; //distributor id
        string name; //Name of the distributor
        string place; //Place the distributor is based in
    }

    //To store all the distributors on the blockchain
    mapping(uint256 => distributor) public DIS;

    //To store information about retailer
    struct retailer {
        address addr;
        uint256 id; //retailer id
        string name; //Name of the retailer
        string place; //Place the retailer is based in
    }

    //To store all the retailers on the blockchain
    mapping(uint256 => retailer) public RET;

//////to store info about subsidy
    //  struct subsidy {
    
    //     uint256 manid ;
    //     uint256 retid ;
    //     uint256 ferid ;
    //     uint256 quantity ;
       
        
    // }
  // store all subsidy on blockchian
  //   mapping(uint256 => subsidy) public SUB;

    //To add manufacturer. Only contract owner can add a new manufacturer
    function addManufacturer(
        address _address,
        string memory _name,
        string memory _place

    ) public onlyByOwner() {
        manCtr++;
        MAN[manCtr] = manufacturer(_address, manCtr, _name, _place );
    }

    function addCertification(
        address _address,
        string memory _name,
        string memory _place

    ) public onlyByOwner() {
        CertCtr++;
        CERT[CertCtr] = certification(_address, CertCtr, _name, _place );
    }

    //To add distributor. Only contract owner can add a new distributor
    function addDistributor(
        address _address,
        string memory _name,
        string memory _place
    ) public onlyByOwner() {
        disCtr++;
        DIS[disCtr] = distributor(_address, disCtr, _name, _place);
    }

    //To add retailer. Only contract owner can add a new retailer
    function addRetailer(
        address _address,
        string memory _name,
        string memory _place
    ) public onlyByOwner() {
        retCtr++;
        RET[retCtr] = retailer(_address, retCtr, _name, _place);
    }
 ////add of subsidy detail at a time farmer buy 
    // function addsubsidy(
        
    //     uint256 _manid, 
    //     uint256 _retid, 
    //     uint256 _ferid,
    //     uint256 _quantity 
    // ) public  {
    //     subCtr++;
    //     SUB[subCtr] = subsidy( subctr,_manid, _retid, _ferid, _quantity );
    // }
    

    //To manufacture fertilizer
    function Manufacturing(uint256 _fertilizerID ) public {
        require(_fertilizerID > 0 && _fertilizerID <= fertilizerCtr);
        uint256 _id = findMAN(msg.sender);
        require(_id > 0);
        require(FertilizerStock[_fertilizerID].MANid == _id); ////to check valid man id
        require(FertilizerStock[_fertilizerID].stage == STAGE.Init);
        
        FertilizerStock[_fertilizerID].stage = STAGE.Manufacture;
    }

    //To check if Manufacturer is available in the blockchain
    function findMAN(address _address) private view returns (uint256) {
        require(manCtr > 0);
        for (uint256 i = 1; i <= manCtr; i++) {
            if (MAN[i].addr == _address) return MAN[i].id;
        }
        return 0;
    }

    function Certification(uint256 _fertilizerID ,uint256 status) public {
        require(_fertilizerID > 0 && _fertilizerID <= fertilizerCtr);
        uint256 _id = findCert(msg.sender);
        require(_id > 0);
        require(FertilizerStock[_fertilizerID].stage == STAGE.Manufacture);
        FertilizerStock[_fertilizerID].CERid == _id;
        if(status==1)
        FertilizerStock[_fertilizerID].stage = STAGE.Certified;
        else
        FertilizerStock[_fertilizerID].stage = STAGE.Returned;
    }

    //To check if Certification agency is available in the blockchain
    function findCert(address _address) private view returns (uint256) {
        require(CertCtr > 0);
        for (uint256 i = 1; i <= CertCtr; i++) {
            if (CERT[i].addr == _address) return CERT[i].id;
        }
        return 0;
    }


    //To supply fertilizers from Manufacturer to distributor
    function Distribute(uint256 _fertilizerID) public {
        require(_fertilizerID > 0 && _fertilizerID <= fertilizerCtr);
        uint256 _id = findDIS(msg.sender);
        require(_id > 0);
        require(FertilizerStock[_fertilizerID].stage == STAGE.Certified);
        FertilizerStock[_fertilizerID].DISid = _id;
        FertilizerStock[_fertilizerID].stage = STAGE.Distribution;
    }

    //To check if distributor is available in the blockchain
    function findDIS(address _address) private view returns (uint256) {
        require(disCtr > 0);
        for (uint256 i = 1; i <= disCtr; i++) {
            if (DIS[i].addr == _address) return DIS[i].id;
        }
        return 0;
    }

    //To supply fertilizers from distributor to retailer
    function Retail(uint256 _fertilizerID) public {
        require(_fertilizerID > 0 && _fertilizerID <= fertilizerCtr);
        uint256 _id = findRET(msg.sender);
        require(_id > 0);
        require(FertilizerStock[_fertilizerID].stage == STAGE.Distribution);
        FertilizerStock[_fertilizerID].RETid = _id;
        FertilizerStock[_fertilizerID].stage = STAGE.Retail;
    }

    //To check if retailer is available in the blockchain
    function findRET(address _address) private view returns (uint256) {
        require(retCtr > 0);
        for (uint256 i = 1; i <= retCtr; i++) {
            if (RET[i].addr == _address) return RET[i].id;
        }
        return 0;
    }

   //To sell fertilizers from retailer to consumer  // fer id man id 
    function sold(uint256 _fertilizerID,uint256 _quantity) public payable {
       uint256 manID = FertilizerStock[_fertilizerID].MANid ;
       address payable recipient;
        require(_fertilizerID > 0 && _fertilizerID <= fertilizerCtr);
        require(FertilizerStock[_fertilizerID].stage == STAGE.Retail);
        recipient=payable(MAN[manID].addr);
        (bool success, ) = recipient.call{value: msg.value}("");
        require(success, "Transfer failed.");
        FertilizerStock[_fertilizerID].quantity = (FertilizerStock[_fertilizerID].quantity)-( _quantity);
        FertilizerStock[_fertilizerID].sendsubsidy = (FertilizerStock[_fertilizerID].sendsubsidy)+(_quantity * FertilizerStock[_fertilizerID].subsidyprice); 
        if(FertilizerStock[_fertilizerID].quantity <=0 ){
        FertilizerStock[_fertilizerID].stage = STAGE.sold;}
        
        //FertilizerStock[_fertilizerID].manfprice
    }

     function subsidysold(uint256 _fertilizerID, uint256 _mval) public payable onlyByOwner() {
        uint256 manID = FertilizerStock[_fertilizerID].MANid ;
       address payable recipient;
       // require(_fertilizerID > 0 && _fertilizerID <= fertilizerCtr);
       
        recipient=payable(MAN[manID].addr);
        (bool success, ) = recipient.call{value: msg.value}("");
        require(success, "Transfer failed.");
        // FertilizerStock[_fertilizerID].quantity = (FertilizerStock[_fertilizerID].quantity)-( _quantity);
         FertilizerStock[_fertilizerID].sendsubsidy = (FertilizerStock[_fertilizerID].sendsubsidy)- _mval; 
        // if(FertilizerStock[_fertilizerID].quantity <=0 ){
        // FertilizerStock[_fertilizerID].stage = STAGE.sold;}
        
        //FertilizerStock[_fertilizerID].manfprice
    }
   

    // To add new fertilizers to the stock
    function addFertilizer(string memory _name,uint256 _quantity , 
    string memory _city , uint256 _subsidyprice, uint256 _manfprice ,uint256 _manid)
        public
        onlyByOwner()
    {
        require(/*(rmsCtr > 0) &&*/ (manCtr > 0) && (disCtr > 0) && (retCtr > 0));
        fertilizerCtr++;
        FertilizerStock[fertilizerCtr] = fertilizer(
            fertilizerCtr,
            _name,
           // _description,
            _quantity,
            _city,
            _subsidyprice,
            _manfprice,
            _manid,
            0,
            0,
            0,
            0,
            STAGE.Init
        );
    }

    function checkOwner() public view returns (bool) {
        if(Owner==msg.sender){
            return true;
        }
        else{
            return false;
        }
    }
}
