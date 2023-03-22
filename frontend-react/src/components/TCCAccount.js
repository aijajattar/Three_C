import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TCCAddresses from "./TCCAddresses";
import TCCPosts from "./TCCPosts";

export default function TCCAccount() {

    let consumer=useSelector((state)=>{
        return state.consumer;
    })
    let user=useSelector((state)=>{
        return state.user;
    })

    let navi=useNavigate();

    let myhtml=<div className="container bg-light my-2 rounded-3 p-2" style={{maxWidth:"70rem"}}>
    <div className="text-center h5" >Hello, {consumer.fullname}</div>
    <TCCAddresses addresses={consumer.addresses}></TCCAddresses>
    <TCCPosts posts={consumer.posts}></TCCPosts>
</div>

    return (
        <>
            {
            user?(myhtml): (navi("/login"))
            }
        </>
    )
}