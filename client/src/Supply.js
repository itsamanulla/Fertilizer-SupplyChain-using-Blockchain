import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json"

function Supply() {
    const history = useHistory()
    useEffect(() => {
        loadWeb3();
        loadBlockchaindata();
    }, [])

    const [currentaccount, setCurrentaccount] = useState("");
    const [loader, setloader] = useState(true);
    const [SupplyChain, setSupplyChain] = useState();
    const [FER, setFER] = useState();
    const [FerStage, setFerStage] = useState();
    const [ID, setID] = useState();
    // const [FerManPri, setFerManPri] = useState();
    const [ManId, setManId] = useState();
    const [MAN, setMAN] = useState();
    const [value, setSelect] = useState('');
    const options = [
       
        {value: 1,label: "Give Certification"},
        {value: 0,label: "Reject"},
    ];      
          
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
            const fer = {};
            const ferStage = [];
            for (i = 0; i < ferCtr; i++) {
                fer[i] = await supplychain.methods.FertilizerStock(i + 1).call();
                ferStage[i] = await supplychain.methods.showStage(i + 1).call();
            }
            setFER(fer);
            /////////////////////////////manf///
            const manCtr = await supplychain.methods.manCtr().call();
            const man = {};
            for (i = 0; i < manCtr; i++) {
                man[i] = await supplychain.methods.MAN(i + 1).call();
            }
            setMAN(man);
            
            setFerStage(ferStage);
            setloader(false);
            console.log(FER);
            
        }
        else {
            window.alert('The smart contract is not deployed to current network')
        }
    }
    console.log(MAN);
    if (loader) {
        return (
            <div>
                <h1 className="wait">Loading...</h1>
            </div>
        )

    }
    console.log(MAN);
    const redirect_to_home = () => {
        history.push('/')
    }
    const handlerChangeID = (event) => {
        setID(event.target.value);
    }
    const handlerSelect = (event) => {
        setSelect(event.target.value);
        // console.log(value);
    }
    
    const handlerChangeIdMan = (event) => {
        setManId(event.target.value);
    }
    
    // const handlerSubmitRMSsupply = async (event) => {
    //     event.preventDefault();
    //     try {
    //         var reciept = await SupplyChain.methods.RMSsupply(ID).send({ from: currentaccount });
    //         if (reciept) {
    //             loadBlockchaindata();
    //         }
    //     }
    //     catch (err) {
    //         alert("An error occured!!!")
    //     }
    // }
    const handlerSubmitManufacturing = async (event) => {
        event.preventDefault();
        try {
            // const amountInWei = window.web3.utils.toWei(FerManPri, "ether");
            // console.log(FerManPri);
            var reciept = await SupplyChain.methods.Manufacturing(ID).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        }
        catch (err) {
            alert("An error occured!!!")
        }
    }
    const handlerSubmitCert = async (event) => {
        event.preventDefault();
        // console.log(value);
        try {
            
            var reciept = await SupplyChain.methods.Certification(ID,value).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        }
        catch (err) {
            alert("An error occured!!!")
        }
    }
    const handlerSubmitDistribute = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.Distribute(ID).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        }
        catch (err) {
            alert("An error occured!!!")
        }
    }
    const handlerSubmitRetail = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.Retail(ID).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        }
        catch (err) {
            alert("An error occured!!!")
        }
    }
    console.log(FER[0].manfprice);
    const handlerSubmitSold = async (event) => {
        console.log(amount);
            console.log(adddr);
        event.preventDefault();
        try {
           const amount = FER[ID].manfprice;
             const adddr = MAN[ManId].addr;
           console.log(amount);
            console.log(adddr);
            var reciept = await SupplyChain.methods.sold(ID, ManId).send({ from: currentaccount ,value:Web3.utils.toWei(amount, 'ether')});
            if (reciept) {
                loadBlockchaindata();
            }
        }
        catch (err) {
            alert("An error occured!!!")
        }
    }
   // loadBlockchaindata();
    
    return (
        
        <div class='container bg-dark text-white mt-4 mb-4  p-3'>
            <div class="alert alert-success" role="alert">
            <span><b>Current Account Address:</b> {currentaccount}</span></div>
            <span onClick={redirect_to_home} className="btn btn-outline-danger btn-sm mb-2"> HOME</span>
            <h6><b>Supply Chain Flow:</b></h6>
            <p>Fertilizer Order  -&gt; Manufacturer -&gt; Distributor -&gt; Retailer -&gt; Consumer</p>
            <table className="table table-sm table-light">
                <thead>
                    <tr>
                        <th scope="col">Fertilizer ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">quantity</th>
                        <th scope="col">fertilizer for city</th>
                        <th scope="col">subsidy set by owner</th>
                        <th scope="col">price set by market Manufacture</th>
                        <th scope="col">Current Processing Stage</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(FER).map(function (key) {
                        return (
                            <tr key={key}>
                                <td>{FER[key].id}</td>
                                <td>{FER[key].name}</td>
                                <td>{FER[key].description}</td>
                                <td>{FER[key].quantity}</td>
                                <td>{FER[key].city}</td>
                                <td>{FER[key].subsidyprice}</td>
                                <td>{FER[key].manfprice}</td>
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
            {/* <h5><b>Step 1: Supply Raw Materials</b>(Only a registered Raw Material Supplier can perform this step):-</h5>
            <form onSubmit={handlerSubmitRMSsupply}>
                <input className="form-control-sm" type="text" onChange={handlerChangeID} placeholder="Enter Fertilizer ID" required />
                <button className="btn btn-outline-success btn-sm" onSubmit={handlerSubmitRMSsupply}>Supply</button>
            </form> */}
            <hr />
            <br />
            <div class="alert alert-dark mt-2" role="alert">
            <h5><b>Step 2: Manufacture</b>(Only a registered Manufacturer can perform this step):-</h5></div>
            <form onSubmit={handlerSubmitManufacturing}>
                <input className="form-control-sm mr-2" type="text" onChange={handlerChangeID} placeholder="Enter Fertilizer ID" required />
                {/* <input className="form-control-sm mr-2" type="number" value={FerManPri} onChange={handlerChangeManPriFer}
                 placeholder="price set by market" required />                */}
                <button className="btn btn-outline-success btn-sm" type='submit' onSubmit={handlerSubmitManufacturing}>Manufacture</button>
            </form>
            <hr />
            <br />
            <div class="alert alert-dark mt-2" role="alert">
            <h5><b>Step 3: Certification</b>(Only a registered Certification Agency can perform this step):-</h5></div>
            <form onSubmit={handlerSubmitCert}>
                <input className="form-control-sm mr-2" type="text" onChange={handlerChangeID} placeholder="Enter Fertilizer ID" required />
                <select className="form-control-sm mr-2" value={value} onChange={handlerSelect}>
                <option value="">Select an option</option>
                 {options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                 ))}
                </select>
                <button className="btn btn-outline-success btn-sm" type='submit' >Submit</button>
            </form>
            <hr />
            <br />
            <div class="alert alert-dark mt-2" role="alert">
            <h5><b>Step 4: Distribute</b>(Only a registered Distributor can perform this step):-</h5></div>
            <form onSubmit={handlerSubmitDistribute}>
                <input className="form-control-sm mr-2" type="text" onChange={handlerChangeID} placeholder="Enter Fertilizer ID" required />
                <button className="btn btn-outline-success btn-sm" onSubmit={handlerSubmitDistribute}>Distribute</button>
            </form>
            <hr />
            <br />
            <div class="alert alert-dark mt-2" role="alert">
            <h5><b>Step 5: Retail</b>(Only a registered Retailer can perform this step):-</h5></div>
            <form onSubmit={handlerSubmitRetail}>
                <input className="form-control-sm mr-2" type="text" onChange={handlerChangeID} placeholder="Enter Fertilizer ID" required />
                <button className="btn btn-outline-success btn-sm" onSubmit={handlerSubmitRetail}>Retail</button>
            </form>
            <hr />
            <br />
            {/* <div class="alert alert-dark mt-2" role="alert">
            <h5><b>Step 6: Mark as sold</b>(Only a registered Retailer can perform this step):-</h5></div>
            <form onSubmit={handlerSubmitSold}>
                <input className="form-control-sm mr-2" type="text" onChange={handlerChangeID} placeholder="Enter Fertilizer ID" required />
                <input className="form-control-sm mr-2" type="text" onChange={handlerChangeIdMan} placeholder="Enter manufacture ID" required />
                <button className="btn btn-outline-success btn-sm" onSubmit={handlerSubmitSold}>Sold</button>
            </form>
            <hr /> */}
        </div>
    )
}

export default Supply
