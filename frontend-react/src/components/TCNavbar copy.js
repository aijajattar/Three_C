import { Link } from "react-router-dom"
import TCBtnLoggedIn from "./TCBtnLoggedIn";

export default function TCNavbar() {
    
    return (
        <div style={{ backgroundColor: "rgb(157, 192, 139)" }}>

            {/* Navigation bar */}
            <nav className="navbar navbar-expand-sm navbar-light bg-light pt-3 pb-3" >

                <div className="container mx-4">
                    <Link to={"/"} className="navbar-brand">Connect Contact Conduct</Link>
                    <Link to={"/"} className="nav-link active">Home</Link>
                    <Link to={"/register"} className="btn btn-warning me-2">Register</Link>
                    <Link to={"/login"} className="btn btn-warning me-2">Login</Link>

                    <Link to={"/login"} className="btn btn-info me-2" state={{show:true, message:"Hello"}}>Go to Login</Link>

                    <TCBtnLoggedIn/>
                        
                </div>
            </nav>
        </div>
    )
}