import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TCHome from "./components/TCHome";
import Login from "./components/Login";
import TCCAccount from "./components/TCCAccount";
import TCNavbar from "./components/TCNavbar";
import TCCNewPost from "./components/TCCNewPost";
import Register from "./components/Register";
import TCSAccount from "./components/TCSAccount";
import TCSNewBid from "./components/TCSNewBid";
import TCCNewAddress from "./components/TCCNewAddress";
import TCCShowBids from "./components/TCCShowBids";


export default function ThreeC() {

    return (
        <div>
            {/* <ThreeC></ThreeC> */}
            <BrowserRouter>

                    <TCNavbar></TCNavbar>

                    {/* Defining routes to different components */}
                    <Routes>

                        <Route path="/" element={<TCHome />}></Route>

                        <Route path="/register" element={<Register />}></Route>

                        <Route path="/login" element={<Login />}></Route>

                        <Route path="/myaccount" element={<TCCAccount />}></Route>

                        <Route path="/showbids" element={<TCCShowBids/>}></Route>

                        <Route path="/newpost" element={<TCCNewPost />}></Route>

                        <Route path="/newaddress" element={<TCCNewAddress/>}></Route>

                        <Route path="/spaccount" element={<TCSAccount />}></Route>

                        <Route path="/tcsbid" element={<TCSNewBid />}></Route>

                        <Route path="*" element={<TCHome />}></Route>
 
                    </Routes>

            </BrowserRouter>
        </div>
    )
}