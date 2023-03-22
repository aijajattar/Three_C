import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function TCCRegister() {

  // navigate hook to navigate to the desired component
  let nav = useNavigate();

  // keeping the consumer in state
  let [consumer, setConsumer] = useState();

  // callback function to populate the consumer object whenever an input is given
  let inputHandler = (e) => {
    setConsumer({ ...consumer, [e.target.name]: e.target.value })
  }

  // callback function to send and fetch the data from the server
  let checkHandler = (e) => {

    // prevents the data from being shown in the url
    e.preventDefault();

    // checking the consumer details entered by the user
    console.log(consumer);

    // using axios to post the consumer details
    axios.post("http://localhost:7070/consumer/consumers", consumer)
    
    .then(
      // if the promise if fulfilled then print the data on console  
      // after printing, navigate it to the login page  
      (res)=>{ 
        console.log(res.data)
        nav("/login")
      }, 
      // if the request is rejected, print the message onto the console
      ()=>{
        console.log("user already exists")
      }
    )

      

  }


  return (
    <div className="container p-5 rounded-5 bg-secondary" style={{maxWidth:"40rem"}}>

      <h2 className="mb-3 text-center" >CONSUMER REGISTRATION</h2>

      <form onSubmit={checkHandler} className="needs-validation">

        <div className="row">

          <div className="mb-3 col">
            <label htmlFor="fullname" className="form-label">Name</label>
            <input type="text" className="form-control" name="fullname" id="fullname" onChange={inputHandler} required></input>
            <div className="valid-feedback">Looks good!</div>
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

        
        <button type="submit" className="btn btn-success m-2">Register</button>
        <button type="reset" className="btn btn-danger m-2">Reset</button>

      </form>
    </div>
  )
}