import { Link } from "react-router-dom"
import TCBtnLoggedIn from "./TCBtnLoggedIn";

export default function TCNavbar() {

    return (
        <div style={{ backgroundColor: "rgb(237, 241, 214)" }}>

            {/* Navigation bar */}
            <nav className="navbar navbar-light  pt-3 pb-3" >

                <div className="d-flex mx-4">

                    <Link to={"/"} className="navbar-brand">Connect Contact Conduct</Link>
                    <div className="justify-content-end ms-0">

                        <Link to={"/"} className="btn">Home</Link>

                        <Link to={"/register"} className="btn btn-warning me-2">Register</Link>

                        <Link to={"/login"} className="btn btn-warning me-2">Login</Link>

                        <TCBtnLoggedIn />

                    </div>
                </div>
            </nav>
        </div>
    )
}