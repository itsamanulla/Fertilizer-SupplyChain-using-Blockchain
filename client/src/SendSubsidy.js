import React from 'react'
import { useState,useEffect } from 'react'
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json"



function SendSubsidy() {

  useEffect(() => {
    loadWeb3();
    loadBlockchaindata();
}, [])

  const [SubsidyAmount, setSubsidyAmount] = useState();
  const [FertilizerID, setFertilizerID] = useState();
  const [loader, setloader] = useState(true);
  const [FER, setFER] = useState();
  const [FerStage, setFerStage] = useState();
  const [currentaccount, setCurrentaccount] = useState("");
  const [SupplyChain, setSupplyChain] = useState();
  const [KEYS, setKEY] = useState();
  const [FerCtr, setFerCtr] = useState();
  const [ManCtr, setManCtr] = useState();
  const [MAN, setMAN] = useState();

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
// console.log("hffff");
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
        const manCtr = await supplychain.methods.manCtr().call();
        setManCtr(manCtr);
        setFerCtr(ferCtr);
        const fer = {};
        const ferStage = [];
        for (i = 0; i < ferCtr; i++) {
            fer[i+1] = await supplychain.methods.FertilizerStock(i+1 ).call();
            ferStage[i+1] = await supplychain.methods.showStage(i+1).call();
        }
        setFER(fer);
        setFerStage(ferStage);
        const man= {};
    
        for (i = 0; i < manCtr; i++) {
            man[i] = await supplychain.methods.MAN(i+1 ).call();
            
        }
        setMAN(man);
        setloader(false);
         console.log(MAN);
    }
    else {
        window.alert('The smart contract is not deployed to current network')
    }
}
//  console.log(FER);
// // console.log(FerStage);
// // console.log(FerCtr);
// console.log(MAN);
// console.log('n');
// console.log(ManCtr);

if (loader) {
  return (
      <div>
          <h1 className="wait">Loading...</h1>
      </div>
  )

}
  

  
  const handlerSubAmount = (event) => {
    setSubsidyAmount(event.target.value);
  }
  const handlerFertilizerID = (event) => {
    setFertilizerID(event.target.value);
  }
  
 
  

  const handlerSubmitOrderFER =async (event) => {
    event.preventDefault();
      console.log('sachin');
    try {
      const amount =SubsidyAmount;
        
      console.log(amount);
      // console.log(adddr);
       var reciept = await SupplyChain.methods.subsidysold(FertilizerID,SubsidyAmount).send({ from: currentaccount ,value:Web3.utils.toWei(amount.toString(), 'ether')});
       if (reciept) {
            
           loadBlockchaindata();
       }
   }
   catch (err) {
       alert("An error occured!!!")
   }

  }


// console.log(FER);

  return (
    
     <div className='container bg-light p-4 mt-5'>
      <table className="table table-bordered table-light">
                <thead>
                    <tr>
                        <th scope="col"> Fertilizer ID</th>
                        <th scope="col">Name</th>
                
                        <th scope="col">quantity</th>
                        <th scope="col">fertilizer for city</th>
                        <th scope="col">subsidy set by owner</th>
                        <th scope="col">Price for farmer</th>
                        <th scope="col">Manufacturer ID</th>
                        <th scope="col">total subsidy need to transfer</th>
                        <th scope="col">Current Stage</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(FER).map(function (key) {
                        return (
                            <tr key={key}>
                                <td>{FER[key].id}</td>
                                <td>{FER[key].name}</td>
                               
                                <td>{FER[key].quantity}</td>
                                <td>{FER[key].city}</td>
                                <td>{FER[key].subsidyprice}</td>
                                <td>{FER[key].manfprice}</td>
                                <td>{FER[key].MANid}</td>
                                <td>{FER[key].sendsubsidy}</td>
                                <td>
                                    {
                                        FerStage[key]
                                    }
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

         <div class="mb-3">
          <label for="formFileDisabled" class="form-label">Fertilizer ID</label>
          <input class="form-control" type="number" min='1' id="formFileDisabled" onChange={handlerFertilizerID} />
        </div>         
        <div class="mb-3">
          <label for="formFileDisabled" class="form-label">total subsidy need to spend</label>
          <input class="form-control" type="number" min="1" id="formFileDisabled" onChange={handlerSubAmount} />
         </div>
        
        <div class="mb-3">
          <button type="submit" class="btn btn-primary mb-3" onClick={handlerSubmitOrderFER}>SEND SUBSIDY TO MANUFACTURE</button>
        </div>
      
      


     
  
      

    </div>
  )
}

export default SendSubsidy