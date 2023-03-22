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

    let [address, setAddress]=useState({consumer:{consumerId}});

    // callback function to store input in the post object
    let inputHandler=(e)=>{
        setAddress({...address, [e.target.name]:e.target.value})
        console.log(address)
    }

    // callback function to post the address to the server
    let createAddress=(e)=>{
        e.preventDefault();
        
        console.log(address);

        axios.post(link+`/address/addresses`, address)

        .then((response)=>{
            console.log(response.data)
            addressDispatch({type:"newaddress", address:response.data});
            navi("/myaccount");
        })

        .catch(()=>{})

    }


    return (
        <div className="container m-4 mx-auto bg-light p-3 rounded-3">
            <form onSubmit={createAddress}>
                <table className="table table-dark table-responsive-sm">
                    <thead className="table-dark">
                        <tr>
                            <th>Details</th><th>Locality</th><th>City</th><th>Pincode</th>
                        </tr>
                    </thead>
                    <tbody className="table-light">
                        <tr>
                            <td>
                                <input type="text" name="details" id="details" onChange={inputHandler} required></input>
                            </td>
                            <td>
                                <input type="text" name="locality" id="locality" onChange={inputHandler} required></input>
                            </td>
                            <td>
                                <input type="text" name="city" id="city" onChange={inputHandler} required></input>
                            </td>
                            <td>
                                <input type="number" name="pincode" id="pincode" onChange={inputHandler} required></input>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit" className="btn btn-success">Submit</button>
            </form>

        </div>
    )
}