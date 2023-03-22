import axios from "axios";
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export default function TCCLogin() {
    
    let link=useSelector((state)=>{
        return state.link;
    })
    // states to keep the username and password
    let [user, setU]=useState();
    let [pass, setP]=useState();

    let loginDispatcher=useDispatch();

    // navigate to user account
    let navi=useNavigate();

    // retrieving the message from navigate
    let message=useLocation();

    // consumer object to be sent to the REST API
    let consumer={
        "username":user,
        "password":pass
    }

    // callback function to send the login request to the REST API
    let loginHandler= (e)=>{

        // prevents the data from being shown in the url
        e.preventDefault();
        
        // using post method to send the login request
        axios.post(link+`/consumer/login`, consumer)
        
        .then(
            // print the response data on console if the promise if fulfilled
            (response)=>{
                console.log(response.data)
                loginDispatcher({type:"login", consumer:response.data, user:true})
                navi("/myaccount", response.data)
            },
            // print message if promise is rejected
            ()=>{
                console.log("wrong user credentials")
            }
        )
    }
    return (
        <div>
            <div className="container-fluid p-5 rounded-5 bg-secondary" style={{maxWidth:"25rem"}}>
                {
                    message==null?<></>:<></>       // work on this one later
                }
                <h2 className="text-center pb-2">CONSUMER LOGIN</h2>

                <form onSubmit={loginHandler}>
                    
                    {/* <div className="row"> */}
                        
                        <div className="mb-3 col">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" className="form-control" id="username" onChange={(e) => { setU(e.target.value) }}></input>
                        </div>
                        
                        <div className="mb-3 col">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" onChange={(e) => { setP(e.target.value) }} ></input>
                        </div>
                    
                    {/* </div> */}
                    
                    
                <button type="submit" className="btn btn-success m-2">Login</button>
                <button type="reset" className="btn btn-danger m-2">Reset</button>
                
                </form>
            </div>
        </div>
    )
}