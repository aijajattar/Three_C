import axios from "axios";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"


export default function TCSBids(props){

    let link=useSelector((state)=>{return state.link})
    
    let [bids,setBids]=useState([]);
    useEffect(()=>{
        let sp=Number.parseInt(props.SPId);
        console.log(sp)
        axios.get( link+`/bid/sp/`+sp)

        .then((response)=>{
            console.log(response.data)
            setBids(response.data)
        })

        .catch(()=>{})
    },[props, link])

    let [contact, setContact]=useState({fullname:"", phone:""});

    let [isShown, toggleShown]=useState(false);
    let showcontact=(e)=>{
        console.log(e.target.id)

        axios.get(link+`/bid/getcontact/`+e.target.id)

        .then((response)=>{
            console.log(response.data); 
            setContact(response.data)
            toggleShown(!isShown)}
            )

        .catch(()=>{})


    }
    

    
    return (
        <div>
            <h1 className='text-center'>Your Bids</h1>
            {
                bids.map((bid) => {
                    return <div key={bid.bidId}>
                        <div className="card text-white bg-dark border-danger" style={{ maxWidth: "10rem" }}>
                        {/* <p className="card-header text-center bg-primary p-1"> {post.category.name}</p> */}
                            {/* <div className="card-header p-1">{post.title}  </div> */}
                            <div className="card-body p-1">
                                
                                {/* <h5 className="card-title">Checking the title</h5> */}
                                {/* <h5 className="card-title">Hello this is title</h5> */}
                                <p className="card-text "> ₹{bid.amount}.00</p>
                                <p className="card-text "> {bid.note}</p>
                                {
                                    bid.accepted?<><span className="badge bg-info">Accepted</span><button className=" text-dark badge" id={bid.bidId} onClick={showcontact}>{isShown?"Hide":"Show"} contact details</button>{isShown?<>Name: {contact.fullname}, Phone: {contact.phone}</>:<></>}</>:<></>
                                }
                                {/* <Link className='btn btn-success' to="/tcsbid" state={post}>BID</Link> */}
                            </div>
                        </div>
                    </div>
                })
            }
        </div>
    )
}