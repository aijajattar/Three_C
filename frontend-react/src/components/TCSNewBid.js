import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";


export default function TCSNewBid(props){

    let link=useSelector((state)=>{
        return state.link;
    })
    let navi=useNavigate();
    let linkstate=useLocation();
    let post=linkstate.state;

    let dispatchbid=useDispatch();
    let spId=useSelector((state)=>{
        return state.SP.serviceProviderId;
    })

    let [bid, setbid]=useState({
        post:{
            postId:post.postId
        },
        serviceProvider:{
            serviceProviderId:spId
        }
    })

    // checking
    useEffect(()=>{
        console.log(post.postId)
    },[post])

    let inputHandler=(e)=>{
        setbid({...bid, [e.target.name]:e.target.value})
        console.log(bid)
    }

    let submitHandler=(e)=>{
        e.preventDefault();
        // console.log(bid)
        // dispatchbid({type:"newbid", data:bid})

        axios.post(link+`/bid/bids`, bid)
        .then((response)=>{
            console.log(response.data)
            navi("/spaccount")
        })
        .catch(()=>{})

    }

    return(
        <div >
            <form onSubmit={submitHandler}>
                <input className="text-center" type="number" name="amount" placeholder="enter amount here" onInput={inputHandler}></input>
                <input className="text-center" type="text" name="note" placeholder="note (optional)" onInput={inputHandler}></input>
                <button type="submit">Submit</button>
            </form>
            
        </div>
    )
}