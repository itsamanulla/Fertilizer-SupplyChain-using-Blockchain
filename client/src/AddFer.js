import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json"

function AddFer() {
    const history = useHistory()
    useEffect(() => {
        loadWeb3();
        loadBlockchaindata();
    }, [])

    const [currentaccount, setCurrentaccount] = useState("");
    const [loader, setloader] = useState(true);
    const [SupplyChain, setSupplyChain] = useState();
    const [FER, setFER] = useState();
    const [FerName, setFerName] = useState();
    const [FerDes, setFerDes] = useState();
    const [FerQua, setFerQua] = useState();
    const [FerCity, setFerCity] = useState();
    const [FerSubPri, setFerSubPri] = useState();
    const [FerStage, setFerStage] = useState();
    const [FerFarmPrice, setFerFarmPrice] = useState();
    const [FerManId, setFerManId] = useState();
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
            setFerStage(ferStage);
            setloader(false);
        }
        else {
            window.alert('The smart contract is not deployed to current network')
        }
    }
    if (loader) {
        return (
            <div>
                <h1 className="wait">Loading...</h1>
            </div>
        )

    }
    const redirect_to_home = () => {
        history.push('/')
    }
    const handlerChangeNameFER = (event) => {
        setFerName(event.target.value);
    }
    const handlerChangeDesFER = (event) => {
        setFerDes(event.target.value);
    }
    const handlerchangeQuaFer = (event) =>{
        setFerQua(event.target.value);
    }
    const handlerChangeCityFer = (event) => {
        setFerCity(event.target.value);
    }
    const handlerChangeSubPriFer = (event) => {
        setFerSubPri(event.target.value);
    }
    const handlerChangeFarmerPriFer = (event) => {
        setFerFarmPrice(event.target.value);
    }
    const handlerChangeManIdFer = (event) => {
        setFerManId(event.target.value);
    }
    
    const handlerSubmitFER = async (event) => {
        event.preventDefault();
        // try {
        //     var reciept = await SupplyChain.methods.addFertilizer(FerName, FerDes,FerQua ,FerCity,FerSubPri,FerFarmPrice,FerManId).send({ from: currentaccount });
        //     if (reciept) {
        //         loadBlockchaindata();
        //     }
        // }
        // catch (err) {
        //     alert("An error occureds!!!")
        // }
        console.log(FerName, FerDes,FerQua ,FerCity,FerSubPri,FerFarmPrice,FerManId); 
        var reciept = await SupplyChain.methods.addFertilizer(FerName,FerQua ,FerCity,FerSubPri,FerFarmPrice,FerManId).send({ from: currentaccount });
        console.log(FerName, FerDes,FerQua ,FerCity,FerSubPri,FerFarmPrice,FerManId);    
        if (reciept) {
                loadBlockchaindata();
                
            }
    }
    return (
        <div class='container p-4 bg-dark'>
            <div class="alert alert-success" role="alert">
            <span><b>Current Account Address:</b> {currentaccount}</span></div>
            <span onClick={redirect_to_home} className="btn btn-outline-danger btn-sm"> HOME</span>
            <br />
            <div class="alert alert-dark mt-2" role="alert">
            <h5>Add Fertilizer Order:</h5></div>
            <form onSubmit={handlerSubmitFER}>
                <input className="form-control-sm mr-2" type="text" onChange={handlerChangeNameFER} placeholder="Fertilizer Name" required />
                {/* <input className="form-control-sm mr-2" type="text" onChange={handlerChangeDesFER} placeholder="Fertilizer Description" required /> */}
                <input className="form-control-sm mr-2" type="number" onChange={handlerchangeQuaFer} placeholder="Fertilizer quantity" required />
                <input className="form-control-sm mr-2" type="text" onChange={handlerChangeCityFer} placeholder="fertilizer transport location" required />
                <input className="form-control-sm mr-2" type="number" onChange={handlerChangeSubPriFer} placeholder="subsidy set by owner in kg" required />
                <input className="form-control-sm mr-2" type="number" onChange={handlerChangeFarmerPriFer} placeholder="Price for farmer in kg" required />
               <input className="form-control-sm mr-2" type="number" onChange={handlerChangeManIdFer} placeholder="Manufacturer ID" required />

                <button className="btn btn-outline-success btn-sm" onSubmit={handlerSubmitFER}>Order</button>
            </form>
            <br />
            <div class="alert alert-dark" role="alert">
            <h5>Ordered Fertilizers:</h5></div>
            <table className="table table-bordered table-light">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        {/* <th scope="col">Description</th> */}
                        <th scope="col">quantity</th>
                        <th scope="col">fertilizer for city</th>
                        <th scope="col">subsidy set by owner</th>
                        <th scope="col">Price for farmer</th>
                        <th scope="col">Manufacturer ID</th>
                        <th scope="col">Current Stage</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(FER).map(function (key) {
                        return (
                            <tr key={key}>
                                <td>{FER[key].id}</td>
                                <td>{FER[key].name}</td>
                                {/* <td>{FER[key].description}</td> */}
                                <td>{FER[key].quantity}</td>
                                <td>{FER[key].city}</td>
                                <td>{FER[key].subsidyprice}</td>
                                <td>{FER[key].manfprice}</td>
                                <td>{FER[key].MANid}</td>
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
        </div>
    )
}

export default AddFer
