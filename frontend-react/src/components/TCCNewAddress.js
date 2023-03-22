import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function TCCNewAddress(props) {

    // method to save the post into the redux store
    let addressDispatch = useDispatch();

    // extracting link from the redux store
    let link = useSelector((state) => { return state.link })

    // retrieving consumer id from redux store
    let consumerId = useSelector((state) => {
        return state.consumer.consumerId
    })

    // method to navigate user to another component
    let navi = useNavigate();

    let [address, setAddress] = useState({ consumer: { consumerId } });

    // callback function to store input in the post object
    let inputHandler = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value })
        console.log(address)
    }

    // callback function to post the address to the server
    let createAddress = (e) => {
        e.preventDefault();

        console.log(address);

        axios.post(link + `/address/addresses`, address)

            .then((response) => {
                console.log(response.data)
                addressDispatch({ type: "newaddress", address: response.data });
                navi("/myaccount");
            })

            .catch(() => { })

    }


    return (
        <div className="container m-4 mx-auto p-3 bg-light rounded-3" style={{ maxWidth: "23rem" }}>
            <h1 className="text-center">New Address</h1>
            <form onSubmit={createAddress} className="m-3">
                <div className="row d-flex flex-row">

                    <div className="card text-white bg-dark mb-2" style={{ maxWidth: "23rem" }}>
                        <div className="card-header text-center">Details</div>
                        <input className="form-control mb-3" placeholder="Room No. 12, Ideal Boys Hostel" type="text-area" name="details" id="details" onChange={inputHandler} required style={{ maxWidth: "23rem" }}></input>

                    </div>

                    <div className="card text-white bg-dark mb-2" style={{ maxWidth: "23rem" }}>
                        <div className="card-header text-center">Locality</div>
                        <input className="form-control mb-3" placeholder="Deep Bangla Chowk" type="text-area" name="locality" id="locality" onChange={inputHandler} required style={{ maxWidth: "23rem" }}></input>

                    </div>

                    <div className="card text-white bg-dark mb-2" style={{ maxWidth: "23rem" }}>
                        <div className="card-header text-center">City</div>
                        <input className="form-control mb-3" placeholder="Pune" type="text-area" name="city" id="city" onChange={inputHandler} required style={{ maxWidth: "23rem" }}></input>

                    </div>

                    <div className="card text-white bg-dark mb-2" style={{ maxWidth: "23rem" }}>
                        <div className="card-header text-center">Pincode</div>
                        <input className="form-control mb-3" placeholder="411016" type="Number" min={111111} max={999999} name="pincode" id="pincode" onChange={inputHandler} required style={{ maxWidth: "23rem" }}></input>

                    </div>

                </div><div className="d-flex flex-row">
                    <button type="submit" className="btn btn-success me-2">Submit</button>
                    <button type="reset" className="btn btn-danger">Reset</button>
                </div>
            </form>

        </div>
    )
}