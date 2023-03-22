import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react"
import axios from "axios";

export default function TCSLogin() {

    // method to dispatch the service provider data to the redux store
    let spdispatch = useDispatch();

    // extracting link from the redux store
    let link = useSelector((state) => { return state.link })

    // method to navigate to the other page
    let navi = useNavigate();

    // storing username and password in state
    let [user, setU] = useState("");
    let [pass, setP] = useState("");

    // login credentials object
    let serviceprovider = {
        "username": user,
        "password": pass
    }

    // flag for showing the alert
    let [flag, setFlag] = useState(false);
    let alert = <h6 className="alert alert-danger show" >Wrong username or password</h6>


    // callback function to use when user clicks on login button
    let loginHandler = (e) => {

        e.preventDefault();

        // sending the login credentials to the server
        axios.post(link + `/serviceprovider/login`, serviceprovider)

            // on successful login
            .then((response) => {

                console.log(response.data)

                // dispatching user data to redux store and navigating to user account page
                spdispatch({ type: "splogin", sp: response.data })
                navi("/spaccount", response.data.expertise)
            })

            // on wrong credentials, setting the alert flag to true
            .catch(() => {
                setFlag(true);
            })
    }
    return (
        <div>
            <div className="container p-5 rounded-5 bg-secondary" style={{ maxWidth: "23rem" }}>
                {flag ? alert : <></>}
                <h2 className="mb-3 text-center">SERVICE PROVIDER LOGIN</h2>
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
