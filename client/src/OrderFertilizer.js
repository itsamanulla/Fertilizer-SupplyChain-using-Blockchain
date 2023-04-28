import React from 'react'
import { useState,useEffect } from 'react'
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json"
import axios from 'axios';


function OrderFertilizer() {

  useEffect(() => {
    loadWeb3();
    loadBlockchaindata();
}, [])

  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleAdhr, setIsVisibleAdhr] = useState(true);
  const [Adhaar, setAdhaar] = useState();
  const [FERTypes, setFERTypes] = useState();
  const [Quantity, setQuantity] = useState();
  const [FertilizerID, setFertilizerID] = useState();
  const [loader, setloader] = useState(true);
  const [FER, setFER] = useState();
  const [FerStage, setFerStage] = useState();
  const [currentaccount, setCurrentaccount] = useState("");
  const [SupplyChain, setSupplyChain] = useState();
  const [KEYS, setKEY] = useState();
  const [FerCtr, setFerCtr] = useState();

  const loadWeb3 = async () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
    } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
    } else {
        window.alert(
            "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
    }
};

const loadBlockchaindata = async () => {
    setloader(true);
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    setCurrentaccount(account);
    const networkId = await web3.eth.net.getId();
    const networkData = SupplyChainABI.networks[networkId];
    if (networkData) {
        const supplychain = new web3.eth.Contract(SupplyChainABI.abi, networkData.address);
         setSupplyChain(supplychain);
        var i;
        const ferCtr = await supplychain.methods.fertilizerCtr().call();
        setFerCtr(ferCtr);
        const fer = {};
        const ferStage = [];
        for (i = 0; i <= ferCtr; i++) {
            fer[i+1] = await supplychain.methods.FertilizerStock(i +1).call();
            ferStage[i] = await supplychain.methods.showStage(i+1 ).call();
        }
        setFER(fer);
        setFerStage(ferStage);
        setloader(false);
    }
    else {
        window.alert('The smart contract is not deployed to current network')
    }
}
console.log(FER);
console.log(FerStage);
console.log(FerCtr);
if (loader) {
  return (
      <div>
          <h1 className="wait">Loading...</h1>
      </div>
  )

}
  const handlerAdhaar = (event) => {
    setAdhaar(event.target.value);
  }

  const handlerFertTypes = (event) => {
    setFERTypes(event.target.value);
  }
  const handlerFertQuantity = (event) => {
    setQuantity(event.target.value);
  }
  const handlerFertilizerID = (event) => {
    setFertilizerID(event.target.value);
  }
  
  const handlerRetailerIDSearch = (event) => {
    setKEY(event.target.value);
  }

  const handlerSubmitAdhaar = async (event) =>  {
    event.preventDefault();
    const adhaar =Adhaar;
    console.log(adhaar);
    try {
      const response = await axios.post("http://localhost:3001/api/data",{
        adhaar
      });
      const wallet = response.data[0].wallet;
      const _address= currentaccount;
      if(wallet==_address) {
        alert("Farmer Authenticate sucessfully");
        setIsVisible(true);
        setIsVisibleAdhr(false);
      }
      else{
        alert("Error");
      }
    } catch (error) {
      alert("Error");
    } 

  }
//   const amount12 = FER[1].manfprice*5 ;
// console.log(Number.parseInt(amount12));
// const value = Web3.utils.toWei(amount12.toString(), "ether");
// console.log(value);
// const val = console.log(typeof(FER[1].manfprice*Quantity));
// console.log(Quantity);
  const handlerSubmitOrderFER = async (event) => {
  //  const amount = FER[FertilizerID].manfprice*Quantity ;
        
      // console.log(typeof(amount));
    try {
      const amount = FER[FertilizerID].manfprice*Quantity ;
        
      // console.log(amount);
      // console.log(adddr);
      const value = Web3.utils.toWei(amount.toString(), "ether");

       var reciept = await SupplyChain.methods.sold(FertilizerID,Quantity).send({ from: currentaccount ,value});
       if (reciept) {
            
           loadBlockchaindata();
       }
   }
   catch (err) {
       alert("An error occured!!!")
   }

  }

// const fertPrice = FER[FertilizerID].manfprice*Quantity;

// console.log(FER);

  return (
     <div className='container bg-light p-4 mt-5'>
     {isVisibleAdhr && <div className='adhar'> 
      <form class="row g-3 mb-4" onSubmit={handlerSubmitAdhaar}>
        <div class="col-auto mt-2">
          <label for="staticEmail2" class="visually-hidden">Adhaar Number</label>
        </div>
        <div class="col-auto">
          <input type="number" onChange={handlerAdhaar} class="form-control" min="1" id="inputPassword2" placeholder="Enter Adhaar No" />
        </div>
        <div class="col-auto">
          <button type="submit" class="btn btn-primary mb-3" onSubmit={handlerSubmitAdhaar}>Confirm identity</button>
        </div>
      </form></div>}


      {isVisible && <div className='FERorder'>
      <form class="mb-3" style={{ width: '50%' }} onSubmit={handlerSubmitOrderFER}>
        {/* <div class="mb-3" >
          <label for="formFile" class="form-label">Types Of Fertilizers</label> */}
          {/* <input class="form-control" onChange={handlerFertTypes} type="" /> */}
          {/* <select class="form-select ml-4" aria-label="Default select example" onChange={handlerFertTypes}>
            <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div> */}
        <div class="mb-3">
          <label for="formFileMultiple" class="form-label">Quantity Of Fertilizers</label>
          <input class="form-control" type="number" min="1" id="formFileMultiple" onChange={handlerFertQuantity} />
          {FertilizerID && <label for="staticEmail2" class="visually-hidden alert alert-primary">Price is { (FER[FertilizerID].manfprice)*Quantity}</label>}        </div>
        <div class="mb-3">
          <label for="formFileDisabled" class="form-label">Fertilizer ID</label>
          <input class="form-control" type="number" min='1' id="formFileDisabled" onChange={handlerFertilizerID} />
        </div>
        <div class="mb-3">
          <button type="submit" class="btn btn-primary mb-3" onSubmit={handlerSubmitOrderFER}>BUY</button>
        </div>
      </form>
      </div>}


      <div class="mb-3">
          <label for="formFileDisabled" class="form-label">Retailer ID</label>
          <input class="form-control" type="number" min='1' id="formFileDisabled" onChange={handlerRetailerIDSearch} />
        </div>
    {/*  FerStage[KEYS]=== 
"Retail Stage"    */}
     {   <table className="table table-bordered table-light">
                <thead>
                    <tr>
                        <th scope="col">Fertilizer ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">RET id</th>
                        <th scope="col">Manufacturer price</th>
                        <th scope="col">Available Quantity</th>
                        <th scope="col">Return Stage</th>
                        
                    </tr>
                </thead>
                <tbody> 
                  
                   {/* <tr key={KEY-1}>
                                <td>{FER[KEY-1].id}</td>
                                <td>{FER[KEY-1].name}</td>
                                <td>{FER[KEY-1].description}</td>
                             
                                <td>
                                    {
                                        FerStage[KEY-1]
                                    }
                                </td>
                            </tr> */}
                             {Object.keys(FER).map(function (KEY) {
                              
                              if(FER[KEY].RETid==KEYS && FER[KEY].stage=='5')
                              {
                                return (
                            <tr KEY={KEY}>
                                <td>{FER[KEY].id}</td>
                                <td>{FER[KEY].name}</td>
                                <td>{FER[KEY].description}</td>
                                <td>{FER[KEY].RETid}</td>
                                <td>{FER[KEY].manfprice}</td>
                                <td>{FER[KEY].quantity}</td>
                             
                                <td>
                                    {
                                        FerStage[KEY-1]
                                    }
                                </td>
                            </tr>
                        )
                              }
                        
                    })}
                        
                  
                </tbody>
            </table>}

    </div>
  )
}

export default OrderFertilizer