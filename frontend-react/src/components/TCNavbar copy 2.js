import { BsList } from "react-icons/bs"
import { Link } from "react-router-dom"
import TCBtnLoggedIn from "./TCBtnLoggedIn";

export default function TCNavbar() {

    return (
        <div style={{ backgroundColor: "rgb(157, 192, 139)" }}>

            {/* Navigation bar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light pt-3 pb-3" >

                <div className="container-fluid mx-4">

                    <Link to={"/"} className="navbar-brand">Connect Contact Conduct</Link>

                    <button className="btn navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menulist">
                        <BsList ></BsList>
                    </button>

                    <div className="collapse navbar-collapse" id="menulist">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        
                        <li className="nav-item">
                        <Link to={"/"} className="nav-link active">Home</Link>
                        </li>

                        <li className="nav-item">
                        <Link to={"/register"} className="btn btn-warning me-2">Register</Link>
                        </li>
                        
                        <li className="nav-item">
                        <Link to={"/login"} className="btn btn-warning me-2">Login</Link>
                        </li>
                        
                        <li className="nav-item">
                        <TCBtnLoggedIn />
                        </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}