// import axios from "axios";
// import { useEffect } from "react";
import { useSelector } from "react-redux";
import TCSBids from "./TCSBids";
// import { useLocation } from "react-router-dom";
import TCSPosts from "./TCSPosts";

export default function TCSAccount() {

    let SP = useSelector((state) => {
        return state.SP;
    })

    // let expertises=SP.expertise;
    // useEffect(()=>{
    //     axios.post("http://192.168.1.100:7070/post/expertise")
    // },[])


    return (
        <div className="container bg-light my-2 rounded-3 p-2" style={{ maxWidth: "70rem" }}>
            <div className="text-center h5" >Hello, {SP.fullname}
            </div>
            <div className="row">
                <div className="col-sm">
                    <TCSPosts expertise={SP.expertise} ></TCSPosts>
                </div>
                <div className="col-sm">
                    <TCSBids SPId={SP.serviceProviderId}></TCSBids>
                </div>
                <div className="col-sm"></div>
                <div className="col-sm"></div>
            </div>
        </div>
    )
}