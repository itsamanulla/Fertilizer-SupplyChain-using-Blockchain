import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json"

function Track() {
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
   // const [RMS, setRMS] = useState();
    const [MAN, setMAN] = useState();
    const [CERT, setCERT] = useState();
    const [DIS, setDIS] = useState();
    const [RET, setRET] = useState();
    const [TrackTillSold, showTrackTillSold] = useState(false);
    const [TrackTillRetail, showTrackTillRetail] = useState(false);
    const [TrackTillDistribution, showTrackTillDistribution] = useState(false);
    const [TrackTillCertificate, showTrackTillCertificate] = useState(false);
    const [TrackTillCertificateReject, showTrackTillCertificateReject] = useState(false);

    const [TrackTillManufacture, showTrackTillManufacture] = useState(false);
   // const [TrackTillRMS, showTrackTillRMS] = useState(false);
    const [TrackTillOrdered, showTrackTillOrdered] = useState(false);

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
                fer[i + 1] = await supplychain.methods.FertilizerStock(i + 1).call();
                ferStage[i + 1] = await supplychain.methods.showStage(i + 1).call();
            }
            setFER(fer);
            setFerStage(ferStage);
            // const rmsCtr = await supplychain.methods.rmsCtr().call();
            // const rms = {};
            // for (i = 0; i < rmsCtr; i++) {
            //     rms[i + 1] = await supplychain.methods.RMS(i + 1).call();
            // }
            // setRMS(rms);
            const manCtr = await supplychain.methods.manCtr().call();
            const man = {};
            for (i = 0; i < manCtr; i++) {
                man[i + 1] = await supplychain.methods.MAN(i + 1).call();
            }
            setMAN(man);
            const certCtr =  await supplychain.methods.CertCtr().call();
            const cert = {};
            for (i = 0; i < certCtr; i++) {
                cert[i] = await supplychain.methods.CERT(i + 1).call();
            }
            setCERT(cert);
            const disCtr = await supplychain.methods.disCtr().call();
            const dis = {};
            for (i = 0; i < disCtr; i++) {
                dis[i + 1] = await supplychain.methods.DIS(i + 1).call();
            }
            setDIS(dis);
            const retCtr = await supplychain.methods.retCtr().call();
            const ret = {};
            for (i = 0; i < retCtr; i++) {
                ret[i + 1] = await supplychain.methods.RET(i + 1).call();
            }
            setRET(ret);
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
    if (TrackTillSold) {
        return (
            <div className="container-xl bg-light text-dark mt-3 p-3">
                <article className="col-4 mt-2">
                    <h3><b><u>Fertilizer:</u></b></h3>
                    <span><b>Fertilizer ID: </b>{FER[ID].id}</span>
                    <br />
                    <span><b>Name:</b> {FER[ID].name}</span>
                    <br />
                    <span><b>Description: </b>{FER[ID].description}</span>
                    <br />
                    <span><b>Current stage: </b>{FerStage[ID]}</span>
                </article>
                <hr />
                <br />
                <section className="row">

                    {/* <article className="col-3">
                        <h4><u>Raw Materials Supplied by:</u></h4>
                        <p><b>Supplier ID: </b>{RMS[FER[ID].RMSid].id}</p>
                        <p><b>Name:</b> {RMS[FER[ID].RMSid].name}</p>
                        <p><b>Place: </b>{RMS[FER[ID].RMSid].place}</p>
                    </article>
                    <span>&#10132;</span> */}
                    <article className="col-3">
                        <h4><u>Manufactured by:</u></h4>
                        <p><b>Manufacturer ID: </b>{MAN[FER[ID].MANid].id}</p>
                        <p><b>Name:</b> {MAN[FER[ID].MANid].name}</p>
                        <p><b>Place: </b>{MAN[FER[ID].MANid].place}</p>
                    </article>
                    <span>&#10132;</span>
                    <article className="col-3">
                        <h4><u>Distributed by:</u></h4>
                        <p><b>Distributor ID: </b>{DIS[FER[ID].DISid].id}</p>
                        <p><b>Name:</b> {DIS[FER[ID].DISid].name}</p>
                        <p><b>Place: </b>{DIS[FER[ID].DISid].place}</p>
                    </article>
                    <span>&#10132;</span>
                    <article className="col-3">
                        <h4><u>Retailed by:</u></h4>
                        <p><b>Retailer ID: </b>{RET[FER[ID].RETid].id}</p>
                        <p><b>Name:</b> {RET[FER[ID].RETid].name}</p>
                        <p><b>Place: </b>{RET[FER[ID].RETid].place}</p>
                    </article>
                    <span>&#10132;</span>
                    <article className="col-3">
                        <h4><u>Sold</u></h4>
                    </article>
                </section>
                <button onClick={() => {
                    showTrackTillSold(false);
                }} className="btn btn-outline-success btn-sm mr-2">Track Another Item</button>
                <span onClick={() => {
                    history.push('/')
                }} className="btn btn-outline-danger btn-sm"> HOME</span>
            </div >
        )
    }
    if (TrackTillRetail) {
        return (
            <div className="container-xl bg-light text-dark mt-3 p-3">
                <article className="col-4 mt-2">
                    <h3><b><u>Fertilizer:</u></b></h3>
                    <span><b>Fertilizer ID: </b>{FER[ID].id}</span>
                    <br />
                    <span><b>Name:</b> {FER[ID].name}</span>
                    <br />
                    <span><b>Description: </b>{FER[ID].description}</span>
                    <br />
                    <span><b>Current stage: </b>{FerStage[ID]}</span>
                </article>
                <hr />
                <br />
                <section className="row">

                    {/* <article className="col-3">
                        <h4><u>Raw Materials Supplied by:</u></h4>
                        <p><b>Supplier ID: </b>{RMS[FER[ID].RMSid].id}</p>
                        <p><b>Name:</b> {RMS[FER[ID].RMSid].name}</p>
                        <p><b>Place: </b>{RMS[FER[ID].RMSid].place}</p>
                    </article>
                    <span>&#10132;</span> */}
                    <article className="col-3">
                        <h4><u>Manufactured by:</u></h4>
                        <p><b>Manufacturer ID: </b>{MAN[FER[ID].MANid].id}</p>
                        <p><b>Name:</b> {MAN[FER[ID].MANid].name}</p>
                        <p><b>Place: </b>{MAN[FER[ID].MANid].place}</p>
                    </article>
                    <span>&#10132;</span>
                    <article className="col-3">
                        <h4><u>Certified by:</u></h4>
                        <p><b>Certification Agency ID: </b>{CERT[FER[ID].CERid].id}</p>
                        <p><b>Name:</b> {CERT[FER[ID].CERid].name}</p>
                        <p><b>Place: </b>{CERT[FER[ID].CERid].place}</p>
                    </article>
                    <span>&#10132;</span>
                    <article className="col-3">
                        <h4><u>Distributed by:</u></h4>
                        <p><b>Distributor ID: </b>{DIS[FER[ID].DISid].id}</p>
                        <p><b>Name:</b> {DIS[FER[ID].DISid].name}</p>
                        <p><b>Place: </b>{DIS[FER[ID].DISid].place}</p>
                    </article>
                    <span>&#10132;</span>
                    <article className="col-3">
                        <h4><u>Retailed by:</u></h4>
                        <p><b>Retailer ID: </b>{RET[FER[ID].RETid].id}</p>
                        <p><b>Name:</b> {RET[FER[ID].RETid].name}</p>
                        <p><b>Place: </b>{RET[FER[ID].RETid].place}</p>
                    </article>
                </section>
                <button onClick={() => {
                    showTrackTillRetail(false);
                }} className="btn btn-outline-success btn-sm mr-2">Track Another Item</button>
                <span onClick={() => {
                    history.push('/')
                }} className="btn btn-outline-danger btn-sm"> HOME</span>
            </div >
        )
    }
    if (TrackTillDistribution) {
        return (
            <div className="container-xl bg-light text-dark mt-3 p-3">
                <article className="col-4 mt-2">
                    <h3><b><u>Fertilizer:</u></b></h3>
                    <span><b>Fertilizer ID: </b>{FER[ID].id}</span>
                    <br />
                    <span><b>Name:</b> {FER[ID].name}</span>
                    <br />
                    <span><b>Description: </b>{FER[ID].description}</span>
                    <br />
                    <span><b>Current stage: </b>{FerStage[ID]}</span>
                </article>
                <hr />
                <br />
                <section className="row">

                    {/* <article className="col-3">
                        <h4><u>Raw Materials Supplied by:</u></h4>
                        <p><b>Supplier ID: </b>{RMS[FER[ID].RMSid].id}</p>
                        <p><b>Name:</b> {RMS[FER[ID].RMSid].name}</p>
                        <p><b>Place: </b>{RMS[FER[ID].RMSid].place}</p>
                    </article>
                    <span>&#10132;</span> */}
                    <article className="col-3">
                        <h4><u>Manufactured by:</u></h4>
                        <p><b>Manufacturer ID: </b>{MAN[FER[ID].MANid].id}</p>
                        <p><b>Name:</b> {MAN[FER[ID].MANid].name}</p>
                        <p><b>Place: </b>{MAN[FER[ID].MANid].place}</p>
                    </article>
                    <span>&#10132;</span>
                    <article className="col-3">
                        <h4><u>Certified by:</u></h4>
                        <p><b>Certification Agency ID: </b>{CERT[FER[ID].CERid].id}</p>
                        <p><b>Name:</b> {CERT[FER[ID].CERid].name}</p>
                        <p><b>Place: </b>{CERT[FER[ID].CERid].place}</p>
                    </article>
                    <span>&#10132;</span>
                    <article className="col-3">
                        <h4><u>Distributed by:</u></h4>
                        <p><b>Distributor ID: </b>{DIS[FER[ID].DISid].id}</p>
                        <p><b>Name:</b> {DIS[FER[ID].DISid].name}</p>
                        <p><b>Place: </b>{DIS[FER[ID].DISid].place}</p>
                    </article>
                </section>
                <button onClick={() => {
                    showTrackTillDistribution(false);
                }} className="btn btn-outline-success btn-sm mr-2">Track Another Item</button>
                <span onClick={() => {
                    history.push('/')
                }} className="btn btn-outline-danger btn-sm"> HOME</span>
            </div >
        )
    }
    if (TrackTillCertificate) {
        return (
            <div className="container-xl bg-light text-dark mt-3 p-3">
                <article className="col-4 mt-2">
                    <h3><b><u>Fertilizer:</u></b></h3>
                    <span><b>Fertilizer ID: </b>{FER[ID].id}</span>
                    <br />
                    <span><b>Name:</b> {FER[ID].name}</span>
                    <br />
                    <span><b>Description: </b>{FER[ID].description}</span>
                    <br />
                    <span><b>Current stage: </b>{FerStage[ID]}</span>
                </article>
                <hr />
                <br />
                <section className="row">

                    {/* <article className="col-3">
                        <h4><u>Raw Materials Supplied by:</u></h4>
                        <p><b>Supplier ID: </b>{RMS[FER[ID].RMSid].id}</p>
                        <p><b>Name:</b> {RMS[FER[ID].RMSid].name}</p>
                        <p><b>Place: </b>{RMS[FER[ID].RMSid].place}</p>
                    </article>
                    <span>&#10132;</span> */}
                    <article className="col-3">
                        <h4><u>Manufactured by:</u></h4>
                        <p><b>Manufacturer ID: </b>{MAN[FER[ID].MANid].id}</p>
                        <p><b>Name:</b> {MAN[FER[ID].MANid].name}</p>
                        <p><b>Place: </b>{MAN[FER[ID].MANid].place}</p>
                    </article>
                    <span>&#10132;</span>
                    <article className="col-3">
                        <h4><u>Certified by:</u></h4>
                        <p><b>Certification Agency ID: </b>{CERT[FER[ID].CERid].id}</p>
                        <p><b>Name:</b> {CERT[FER[ID].CERid].name}</p>
                        <p><b>Place: </b>{CERT[FER[ID].CERid].place}</p>
                    </article>
                    
                </section>
                <button onClick={() => {
                    showTrackTillCertificate(false);
                }} className="btn btn-outline-success btn-sm mr-2">Track Another Item</button>
                <span onClick={() => {
                    history.push('/')
                }} className="btn btn-outline-danger btn-sm"> HOME</span>
            </div >
        )
    }
    // rejection case start
    if (TrackTillCertificateReject) {
        return (
            <div className="container-xl bg-light text-dark mt-3 p-3">
                <article className="col-4 mt-2">
                    <h3><b><u>Fertilizer:</u></b></h3>
                    <span><b>Fertilizer ID: </b>{FER[ID].id}</span>
                    <br />
                    <span><b>Name:</b> {FER[ID].name}</span>
                    <br />
                    <span><b>Description: </b>{FER[ID].description}</span>
                    <br />
                    <span><b>Current stage: </b>{FerStage[ID]}</span>
                </article>
                <hr />
                <br />
                <section className="row">

                    {/* <article className="col-3">
                        <h4><u>Raw Materials Supplied by:</u></h4>
                        <p><b>Supplier ID: </b>{RMS[FER[ID].RMSid].id}</p>
                        <p><b>Name:</b> {RMS[FER[ID].RMSid].name}</p>
                        <p><b>Place: </b>{RMS[FER[ID].RMSid].place}</p>
                    </article>
                    <span>&#10132;</span> */}
                    <article className="col-3">
                        <h4><u>Manufactured by:</u></h4>
                        <p><b>Manufacturer ID: </b>{MAN[FER[ID].MANid].id}</p>
                        <p><b>Name:</b> {MAN[FER[ID].MANid].name}</p>
                        <p><b>Place: </b>{MAN[FER[ID].MANid].place}</p>
                    </article>
                    <span>&#10132;</span>
                    <article className="col-3">
                       <label><b>Certification Rejected</b></label>
                    </article>
                    
                </section>
                <button onClick={() => {
                    showTrackTillCertificateReject(false);
                }} className="btn btn-outline-success btn-sm mr-2">Track Another Item</button>
                <span onClick={() => {
                    history.push('/')
                }} className="btn btn-outline-danger btn-sm"> HOME</span>
            </div >
        )
    }
    //rejection case end
    if (TrackTillManufacture) {
        return (
            <div className="container-xl bg-light text-dark mt-3 p-3">
                <article className="col-4 mt-2">
                    <h3><b><u>Fertilizer:</u></b></h3>
                    <span><b>Fertilizer ID: </b>{FER[ID].id}</span>
                    <br />
                    <span><b>Name:</b> {FER[ID].name}</span>
                    <br />
                    <span><b>Description: </b>{FER[ID].description}</span>
                    <br />
                    <span><b>Current stage: </b>{FerStage[ID]}</span>
                </article>
                <hr />
                <br />
                <section className="row">

                    {/* <article className="col-3">
                        <h4><u>Raw Materials Supplied by:</u></h4>
                        <p><b>Supplier ID: </b>{RMS[FER[ID].RMSid].id}</p>
                        <p><b>Name:</b> {RMS[FER[ID].RMSid].name}</p>
                        <p><b>Place: </b>{RMS[FER[ID].RMSid].place}</p>
                    </article>
                    <span>&#10132;</span> */}
                    <article className="col-3">
                        <h4><u>Manufactured by:</u></h4>
                        <p><b>Manufacturer ID: </b>{MAN[FER[ID].MANid].id}</p>
                        <p><b>Name:</b> {MAN[FER[ID].MANid].name}</p>
                        <p><b>Place: </b>{MAN[FER[ID].MANid].place}</p>
                    </article>
                </section>
                <button onClick={() => {
                    showTrackTillManufacture(false);
                }} className="btn btn-outline-success btn-sm mr-2">Track Another Item</button>
                <span onClick={() => {
                    history.push('/')
                }} className="btn btn-outline-danger btn-sm"> HOME</span>
            </div >
        )
    }
    // if (TrackTillRMS) {
    //     return (
    //         <div className="container-xl">
    //             <article className="col-4">
    //                 <h3><b><u>Fertilizer:</u></b></h3>
    //                 <span><b>Fertilizer ID: </b>{FER[ID].id}</span>
    //                 <br />
    //                 <span><b>Name:</b> {FER[ID].name}</span>
    //                 <br />
    //                 <span><b>Description: </b>{FER[ID].description}</span>
    //                 <br />
    //                 <span><b>Current stage: </b>{FerStage[ID]}</span>
    //             </article>
    //             <hr />
    //             <br />
    //             <section className="row">

    //                 <article className="col-3">
    //                     <h4><u>Raw Materials Supplied by:</u></h4>
    //                     <p><b>Supplier ID: </b>{RMS[FER[ID].RMSid].id}</p>
    //                     <p><b>Name:</b> {RMS[FER[ID].RMSid].name}</p>
    //                     <p><b>Place: </b>{RMS[FER[ID].RMSid].place}</p>
    //                 </article>
    //             </section>
    //             <button onClick={() => {
    //                 showTrackTillRMS(false);
    //             }} className="btn btn-outline-success btn-sm">Track Another Item</button>
    //             <span onClick={() => {
    //                 history.push('/')
    //             }} className="btn btn-outline-danger btn-sm"> HOME</span>
    //         </div >
    //     )
    // }
    if (TrackTillOrdered) {
        return (
            <div className="container-xl bg-light text-dark">
                <article className="col-4 mt-2" >
                    <h3><b><u>Fertilizer:</u></b></h3>
                    <span><b>Fertilizer ID: </b>{FER[ID].id}</span>
                    <br />
                    <span><b>Name:</b> {FER[ID].name}</span>
                    <br />
                    <span><b>Description: </b>{FER[ID].description}</span>
                    <br />
                    <span><b>Current stage: </b>{FerStage[ID]}</span>
                    <hr />
                    <br />
                    <h5>Fertilizer Not Yet Processed...</h5>
                    <button onClick={() => {
                        showTrackTillOrdered(false);
                    }} className="btn btn-outline-success btn-sm mr-2">Track Another Item</button>
                    <span onClick={() => {
                        history.push('/')
                    }} className="btn btn-outline-danger btn-sm"> HOME</span>
                </article>
                {/* <section className="row">
                    
                    <article className="col-3">
                        <h4><u>Raw Materials Supplied by:</u></h4>
                        <p><b>Supplier ID: </b>{RMS[FER[ID].RMSid].id}</p>
                        <p><b>Name:</b> {RMS[FER[ID].RMSid].name}</p>
                        <p><b>Place: </b>{RMS[FER[ID].RMSid].place}</p>
                    </article>
                </section> */}
            </div >
        )
    }
    const handlerChangeID = (event) => {
        setID(event.target.value);
    }
    const redirect_to_home = () => {
        history.push('/')
    }
    console.log(FER[ID]);
    const handlerSubmit = async (event) => {
        event.preventDefault();
        var ctr = await SupplyChain.methods.fertilizerCtr().call();
        if (!((ID > 0) && (ID <= ctr)))
            alert("Invalid Fertilizer ID!!!");
        else {
            // eslint-disable-next-line
            if (FER[ID].stage == 6)
                showTrackTillSold(true);
            // eslint-disable-next-line
            else if (FER[ID].stage == 5)
                showTrackTillRetail(true);
            // eslint-disable-next-line
            else if (FER[ID].stage == 4)
                showTrackTillDistribution(true);
            // eslint-disable-next-line
            else if (FER[ID].stage == 3)
            showTrackTillCertificateReject(true);
        // eslint-disable-next-line
            else if (FER[ID].stage == 2)
                showTrackTillCertificate(true);
            else if (FER[ID].stage == 1)
                showTrackTillManufacture(true);
            // eslint-disable-next-line
            // else if (FER[ID].stage == 1)
            //     showTrackTillRMS(true);
            else
                showTrackTillOrdered(true);

        }
    }

    return (
        <div className='container bg-light text-dark mt-4 p-4'>
            <div class="alert alert-success" role="alert">
            <span><b>Current Account Address:</b> {currentaccount}</span></div>
            <span onClick={redirect_to_home} className="btn btn-outline-danger btn-sm mb-4"> HOME</span>
            <table className="table table-sm table-bordered table-light">
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
            <h5>Enter Fertilizer ID to Track it</h5>

            <form onSubmit={handlerSubmit}>
                <input className="form-control-sm mr-2" type="text" onChange={handlerChangeID} placeholder="Enter Fertilizer ID" required />
                <button className="btn btn-outline-success btn-sm" onSubmit={handlerSubmit}>Track</button>
            </form>
        </div>
    )
}

export default Track
