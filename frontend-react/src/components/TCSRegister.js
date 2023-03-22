import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function TCSRegister() {

    // extracting link from the redux store
    let link = useSelector((state) => {return state.link})

    // let link=useSelector((state)=>{console.log(state.serverlink);return state.serverlink})
    let [categories, setCats] = useState([]);

    // fetching the expertises as soon as the component is loaded
    useEffect(() => {
        // console.log(link)
        axios.get(link + `/expertise/expertises`)

            .then((response) => {
                setCats(response.data)
                console.log(response.data)
            })

            .catch(() => { })
    }, [link])



    // navigate hook to navigate to the desired component
    let nav = useNavigate();

    // keeping the consumer in state
    let [SP, setSP] = useState({ expertise: [] });

    // let expertise=[]

    let catHandler = (e) => {
        let exp = {
            expertiseId: Number.parseInt(e.target.id)
        }
        if (e.target.checked) {
            console.log("checked");
            SP.expertise.push(exp);
            // console.log(expertise)
        }
        else {
            console.log("unchecked");
            SP.expertise.pop(exp);
            // console.log(expertise)
        }
        console.log(SP);
    }

    // callback function to populate the consumer object whenever an input is given
    let inputHandler = (e) => {
        setSP({ ...SP, [e.target.name]: e.target.value })
    }

    // callback function to send and fetch the data from the server
    let checkHandler = (e) => {

        // prevents the data from being shown in the url
        e.preventDefault();

        // checking the consumer details entered by the user
        console.log(SP)


        // using axios to post the consumer details
        axios.post(link+`/serviceprovider/serviceproviders`, SP)

            .then(
                // if the promise if fulfilled then print the data on console  
                // after printing, navigate it to the login page  
                (res) => {
                    console.log(res.data)

                    nav("/login",{state:{message:"Registered successfully", show:true}})
                },
                // if the request is rejected, print the message onto the console
                () => {
                    console.log("user already exists")
                }
            )
    }


    return (
        <div className="container px-5 py-5 rounded-5 bg-secondary" style={{ maxWidth: "40rem" }}>

            <h2 className="mb-3 text-center">SERVICE PROVIDER REGISTRATION</h2>

            <form onSubmit={checkHandler} className="needs-validation">

                <div className="row">

                    <div className="mb-3 col">
                        <label htmlFor="fullname" className="form-label">Name</label>
                        <input type="text" className="form-control" name="fullname" id="fullname" onChange={inputHandler} required></input>
                        <div className="valid-feedback">Looks good!</div>
                    </div>

                    <div className="mb-3 col">
                        <label htmlFor="city" className="form-label">City</label>
                        <input type="text" className="form-control" name="city" id="city" onChange={inputHandler} required></input>
                    </div>

                </div>

                <div className="row">
                    <div className="mb-3 col">
                        <label htmlFor="phone" className="form-label">Mobile</label>
                        <input type="text" className="form-control" name="phone" id="phone" onChange={inputHandler} required></input>
                    </div>


                    <div className="mb-3 col">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" name="email" id="email" onChange={inputHandler} required></input>
                    </div>

                </div>

                <div className="row">

                    <div className="mb-3 col">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" className="form-control" name="username" id="username" onChange={inputHandler} required></input>
                    </div>

                    <div className="mb-3 col">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" id="password" onChange={inputHandler} required></input>
                    </div>

                </div>

                <div className="row d-flex flex-inline">
                    {
                        categories.map((cat) => {
                            return <div className="form-check form-switch mb-3 col ms-3 mt-2">
                                <input className="form-check-input" type="checkbox" id={cat.expertiseId} key={cat.expertiseId} onChange={catHandler} />
                                <label className="form-check-label" htmlFor={cat.expertiseId}>{cat.name}</label>
                            </div>
                        })
                    }
                </div>

                <button type="submit" className="btn btn-success m-2">Register</button>
                <button type="reset" className="btn btn-danger m-2">Reset</button>

            </form>
        </div>
    )
}