import React from 'react'
import { useHistory } from "react-router-dom"


function Home() {
    const history = useHistory()
    const redirect_to_roles = () => {
        history.push('/roles')
    }
    const redirect_to_addfer = () => {
        history.push('/addfer')
    }
    const redirect_to_supply = () => {
        history.push('/supply')
    }
    const redirect_to_track = () => {
        history.push('/track')
    }
    const redirect_to_order = () => {
        history.push('/orderFertilizer')
    }
    const redirect_to_subsidy = () => {
        history.push('/SendSubsidy')
    }
    return (
        <div>
        <div class="container-fluid" >
            <div class="container" >

                <div className='mt-5'>
                <h3 class="alert alert-primary text-center">FERTILIZER SUPPLYCHAIN FLOW :- </h3>
                <br />
                <div class="alert alert-warning" role="alert">
                <h6>(Note: Here <u>Owner</u> is the person who deployed the smart contract on the blockchain)</h6></div>
                </div>
                <div class="row">
                    <div class="col-sm-6 mb-3 mb-sm-0">
                        <div class="card">
                            <div class="card-body">

                                <h5 class="card-title alert alert-secondary">Step 1: Owner Should Register Manufacturers, Distributors and Retailers</h5>
                                <h6 class="card-text">(Note: This is a one time step. Skip to step 2 if already done)</h6>
                                <button onClick={redirect_to_roles} className="btn btn-outline-primary btn-sm">Register</button>
                                <br />
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 ">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title alert alert-secondary">Step 2: Owner should order fertilizers</h5>
                                <button onClick={redirect_to_addfer} className="btn btn-outline-primary btn-sm">Order Fertilizers</button>
                                <br />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-5">
                    <div class="col-sm-6 mb-3 mb-sm-0">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title alert alert-secondary">Step 3: Control Supply Chain</h5>
                                <button onClick={redirect_to_supply} className="btn btn-outline-primary btn-sm">Control Supply Chain</button>
                            </div></div></div>
                    {/* <br />
            <hr />
            <br /> */}
                    <div class="col-sm-6">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title alert alert-secondary"><b>Track</b> the fertilizers:</h5>
                                <button onClick={redirect_to_track} className="btn btn-outline-primary btn-sm">Track Fertilizers</button>
                            </div></div></div>
                            <div class="col-sm-6 mt-4 mb-4">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title alert alert-secondary"><b>BUY</b> fertilizers:</h5>
                                <button onClick={redirect_to_order} className="btn btn-outline-primary btn-sm"> Orderrtilizers</button>
                            </div></div></div>
                            <div class="col-sm-6 mt-4 mb-4">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title alert alert-secondary"><b>subsidy</b> :</h5>
                                <button onClick={redirect_to_subsidy} className="btn btn-outline-primary btn-sm"> subsidy</button>
                            </div></div></div>
                </div>
            </div>
        </div></div>
    )
}

export default Home
