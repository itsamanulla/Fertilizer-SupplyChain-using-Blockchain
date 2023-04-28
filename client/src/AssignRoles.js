import React, { useState, useEffect } from 'react';
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json"
import { useHistory } from "react-router-dom"
import Axios from 'axios'
import { bool } from 'prop-types';

function AssignRoles() {
    const history = useHistory()
    useEffect(() => {
        loadWeb3();
        loadBlockchaindata();
    }, [])
    const [currentaccount, setCurrentaccount] = useState("");
    const [loader, setloader] = useState(true);
    const [SupplyChain, setSupplyChain] = useState();
   // const [RMSname, setRMSname] = useState();
    const [MANname, setMANname] = useState();
    const [DISname, setDISname] = useState();
    const [RETname, setRETname] = useState();
    const [CERTname, setCERTname] = useState();
  //  const [RMSplace, setRMSplace] = useState();
    const [MANplace, setMANplace] = useState();
    const [DISplace, setDISplace] = useState();
    const [RETplace, setRETplace] = useState();
    const [CERTplace, setCERTplace] = useState();
  //  const [RMSaddress, setRMSaddress] = useState();
    const [MANaddress, setMANaddress] = useState();
    const [DISaddress, setDISaddress] = useState();
    const [RETaddress, setRETaddress] = useState();
    const [CERTaddress, setCERTaddress] = useState();
 //   const [RMS, setRMS] = useState();
    const [MAN, setMAN] = useState();
    const [DIS, setDIS] = useState();
    const [RET, setRET] = useState();
    const [CERT, setCERT] = useState();

    const [Aadhar,setAadhar] = useState();
    const [Faraddress,setFaraddress] = useState();
    const [quantity,setquantity] = useState();

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
            // const rmsCtr = await supplychain.methods.rmsCtr().call();
            // const rms = {};
            // for (i = 0; i < rmsCtr; i++) {
            //     rms[i] = await supplychain.methods.RMS(i + 1).call();
            // }
            // setRMS(rms);
            const manCtr = await supplychain.methods.manCtr().call();
            const man = {};
            for (i = 0; i < manCtr; i++) {
                man[i] = await supplychain.methods.MAN(i + 1).call();
            }
            setMAN(man);
           
            const disCtr = await supplychain.methods.disCtr().call();
            const dis = {};
            for (i = 0; i < disCtr; i++) {
                dis[i] = await supplychain.methods.DIS(i + 1).call();
            }
            setDIS(dis);
            const retCtr = await supplychain.methods.retCtr().call();
            const ret = {};
            for (i = 0; i < retCtr; i++) {
                ret[i] = await supplychain.methods.RET(i + 1).call();
            }
            setRET(ret);
            const certCtr =  await supplychain.methods.CertCtr().call();
            const cert = {};
            for (i = 0; i < certCtr; i++) {
                cert[i] = await supplychain.methods.CERT(i + 1).call();
            }
            setCERT(cert);
            setloader(false);
        }
        else {
            window.alert('The smart contract is not deployed to current network')
            history.push('/');
        }
    }
    // console.log(MAN[0].addr);
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
    // const handlerChangeAddressRMS = (event) => {
    //     setRMSaddress(event.target.value);
    // }
    // const handlerChangePlaceRMS = (event) => {
    //     setRMSplace(event.target.value);
    // }
    // const handlerChangeNameRMS = (event) => {
    //     setRMSname(event.target.value);
    // }
    const handlerChangeAddressMAN = (event) => {
        setMANaddress(event.target.value);
    }
    const handlerChangePlaceMAN = (event) => {
        setMANplace(event.target.value);
    }
    const handlerChangeNameMAN = (event) => {
        setMANname(event.target.value);
    }
    const handlerChangeAddressDIS = (event) => {
        setDISaddress(event.target.value);
    }
    const handlerChangePlaceDIS = (event) => {
        setDISplace(event.target.value);
    }
    const handlerChangeNameDIS = (event) => {
        setDISname(event.target.value);
    }
    const handlerChangeAddressRET = (event) => {
        setRETaddress(event.target.value);
    }
    const handlerChangePlaceRET = (event) => {
        setRETplace(event.target.value);
    }
    const handlerChangeNameRET = (event) => {
        setRETname(event.target.value);
    }
    const handlerChangeAddressCERT = (event) => {
        setCERTaddress(event.target.value);
    }
    const handlerChangePlaceCERT = (event) => {
        setCERTplace(event.target.value);
    }
    const handlerChangeNameCERT = (event) => {
        setCERTname(event.target.value);
    }
    // const handlerSubmitRMS = async (event) => {
    //     event.preventDefault();
    //     try {
    //         var reciept = await SupplyChain.methods.addRMS(RMSaddress, RMSname, RMSplace).send({ from: currentaccount });
    //         if (reciept) {
    //             loadBlockchaindata();
    //         }
    //     }
    //     catch (err) {
    //         alert("An error occured!!!")
    //     }
    // }
    const handlerSubmitMAN = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.addManufacturer(MANaddress, MANname, MANplace).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        }
        catch (err) {
            alert("An error occured!!!")
        }
    }
    const handlerSubmitDIS = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.addDistributor(DISaddress, DISname, DISplace).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        }
        catch (err) {
            alert("An error occured!!!")
        }
    }
    const handlerSubmitRET = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.addRetailer(RETaddress, RETname, RETplace).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        }
        catch (err) {
            alert("An error occured!!!")
        }
    }
    const handlerSubmitCERT = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.addCertification(CERTaddress, CERTname, CERTplace).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        }
        catch (err) {
            alert("An error occured!!!")
        }
    }
    const handlerSubmitFAR =async () => {
       
        // var reciept = await  SupplyChain.methods.checkOwner().call();
        // if(reciept){
        //     console.log("sdf");
            Axios.post("http://localhost:3001/api/insert" , {
            aadhar_no: Aadhar, 
            wallet: Faraddress, 
            quantity: quantity
            });
        // }
        // else{
        //     console.log("shjdf");
        //     // alert("An error occured!!!");
        // }

    };
    // console.log(handlerSubmitFAR());



    return (
        <div className='container p-4 mt-3 mb-3 bg-dark text-white '>
            <span onClick={redirect_to_home} className="btn btn-danger btn-sm">HOME</span>
            <div class="alert alert-light" role="alert">
            <span><b>Current Account Address:</b> {currentaccount}</span></div>
            
            {/* <h4>Raw Material Suppliers:</h4>
            <form onSubmit={handlerSubmitRMS}>
                <input className="form-control-sm" type="text" onChange={handlerChangeAddressRMS} placeholder="Ethereum Address" required />
                <input className="form-control-sm" type="text" onChange={handlerChangeNameRMS} placeholder="Raw Material Supplier Name" required />
                <input className="form-control-sm" type="text" onChange={handlerChangePlaceRMS} placeholder="Based In" required />
                <button className="btn btn-outline-success btn-sm" onSubmit={handlerSubmitRMS}>Register</button>
            </form>
            <table className="table table-sm">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Place</th>
                        <th scope="col">Ethereum Address</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(RMS).map(function (key) {
                        return (
                            <tr key={key}>
                                <td>{RMS[key].id}</td>
                                <td>{RMS[key].name}</td>
                                <td>{RMS[key].place}</td>
                                <td>{RMS[key].addr}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table> */}
            <div class="alert alert-success" role="alert">
            <h4>Manufacturers:</h4></div>
            <form onSubmit={handlerSubmitMAN}>
                <input className="form-control-sm mr-2" type="text" onChange={handlerChangeAddressMAN} placeholder="Ethereum Address" required />
                <input className="form-control-sm mr-2" type="text" onChange={handlerChangeNameMAN} placeholder="Manufacturer Name" required />
                <input className="form-control-sm mr-2" type="text" onChange={handlerChangePlaceMAN} placeholder="Based In" required />
                <button className="btn btn-outline-success btn-sm mr-2" onSubmit={handlerSubmitMAN}>Register</button>
            </form>
            <table className="table table-sm table-light mt-2">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Place</th>
                        <th scope="col">Ethereum Address</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(MAN).map(function (key) {
                        return (
                            <tr key={key}>
                                <td>{MAN[key].id}</td>
                                <td>{MAN[key].name}</td>
                                <td>{MAN[key].place}</td>
                                <td>{MAN[key].addr}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div class="alert alert-dark " role="alert">
            <h4>Distributors:</h4></div>
            <form onSubmit={handlerSubmitDIS}>
                <input className="form-control-sm mr-2" type="text" onChange={handlerChangeAddressDIS} placeholder="Ethereum Address" required />
                <input className="form-control-sm mr-2" type="text" onChange={handlerChangeNameDIS} placeholder="Distributor Name" required />
                <input className="form-control-sm mr-2" type="text" onChange={handlerChangePlaceDIS} placeholder="Based In" required />
                <button className="btn btn-outline-success btn-sm mr-2" onSubmit={handlerSubmitDIS}>Register</button>
            </form>
            <table className="table table-sm table-light mt-2">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Place</th>
                        <th scope="col">Ethereum Address</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(DIS).map(function (key) {
                        return (
                            <tr key={key}>
                                <td>{DIS[key].id}</td>
                                <td>{DIS[key].name}</td>
                                <td>{DIS[key].place}</td>
                                <td>{DIS[key].addr}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div class="alert alert-dark" role="alert">
            <h4>Retailers:</h4></div>
            <form onSubmit={handlerSubmitRET}>
                <input className="form-control-sm mr-2" type="text" onChange={handlerChangeAddressRET} placeholder="Ethereum Address" required />
                <input className="form-control-sm mr-2" type="text" onChange={handlerChangeNameRET} placeholder="Retailer Name" required />
                <input className="form-control-sm mr-2" type="text" onChange={handlerChangePlaceRET} placeholder="Based In" required />
                <button className="btn btn-outline-success btn-sm mr-2" onSubmit={handlerSubmitRET}>Register</button>
            </form>
            <table className="table table-sm table-light mt-2">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Place</th>
                        <th scope="col">Ethereum Address</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(RET).map(function (key) {
                        return (
                            <tr key={key}>
                                <td>{RET[key].id}</td>
                                <td>{RET[key].name}</td>
                                <td>{RET[key].place}</td>
                                <td>{RET[key].addr}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div class="alert alert-dark" role="alert">
            <h4>Certification Agency:</h4></div>
            <form onSubmit={handlerSubmitCERT}>
                <input className="form-control-sm mr-2" type="text" onChange={handlerChangeAddressCERT} placeholder="Ethereum Address" required />
                <input className="form-control-sm mr-2" type="text" onChange={handlerChangeNameCERT} placeholder="Agency Name" required />
                <input className="form-control-sm mr-2" type="text" onChange={handlerChangePlaceCERT} placeholder="Based In" required />
                <button className="btn btn-outline-success btn-sm mr-2" onSubmit={handlerSubmitCERT}>Register</button>
            </form>
            <table className="table table-sm table-light mt-2">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Place</th>
                        <th scope="col">Ethereum Address</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(CERT).map(function (key) {
                        return (
                            <tr key={key}>
                                <td>{CERT[key].id}</td>
                                <td>{CERT[key].name}</td>
                                <td>{CERT[key].place}</td>
                                <td>{CERT[key].addr}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div class="alert alert-dark " role="alert">
            <h4>Farmers:</h4></div>
            <form onSubmit={handlerSubmitFAR}>
                <input className="form-control-sm mr-2" type="text" onChange={(e)=>{
                    setAadhar(e.target.value);
                }} 
                placeholder="Aadhar number" maxLength="12" minLength="12" required />
                <input className="form-control-sm mr-2" type="text" onChange={(e)=>{
                    setFaraddress(e.target.value);
                }}  placeholder="Ethereum Address" required />
                <input className="form-control-sm mr-2" type="number" onChange={(e)=>{
                    setquantity(e.target.value);
                }}  placeholder="Total Fertilizer" required />
                <button className="btn btn-outline-success btn-sm mr-2" onSubmit={handlerSubmitFAR}>Register</button>
            </form>
        </div>
    )
}

export default AssignRoles
