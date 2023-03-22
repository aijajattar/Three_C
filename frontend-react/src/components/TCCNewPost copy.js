import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function TCCNewPost(){

    // method to save the post into the redux store
    let postDispatch=useDispatch();

    // extracting link from the redux store
    let link = useSelector((state) => {return state.link})

    // retrieving consumer id from redux store
    let consumerId=useSelector((state)=>{
        return state.consumer.consumerId
    })

    // method to navigate user to another component
    let navi=useNavigate();

    // storing list of categories in state
    let [categories, setCats]=useState([]);

    // storing list of addresses in state
    let [addresses, setAdds]=useState([])

    // keeping almost final post in state to use it in final post object
    let [post,setPost]=useState({});

    // storing expertiseId in state for using it in the dummy post
    let [expertiseId,setExp]=useState();

    // storing addressId in state for using it in the dummy post
    let [addressId, setAddId]=useState();

    // creating a post template to use it in json
    let templatePost={
        category:{
            expertiseId
        },
        address:{
            addressId
        },
        consumer:{
            consumerId
        }
    }

    // fetching all the categories as soon as the component is mounted
    useEffect(()=>
    {
        axios.get(link+`/expertise/expertises`)
        .then(
            (response)=>{
                setCats(response.data)
            },
            ()=>{
                // registering callback function for when the promise is rejected
                setCats([])
            }
        )
        
        axios.get(link+`/address/consumer/`+consumerId)
        .then(
            (response)=>{
                console.log(response.data)
                setAdds(response.data)
            },
            ()=>{
                // registering callback function for when the promise is rejected
                setAdds([])
            }
        )
    },[link, consumerId])


    
    // callback function to store input in the post object
    let inputHandler=(e)=>{
        setPost({...post, ...templatePost, [e.target.name]: e.target.value})
        console.log(e.target.value)
        console.log(post)
    }

    // callback function to set the expertise when a category is selected
    let categorySelect=(e)=>{
        setExp(e.target.value);
        console.log(post)
    }

    // callback function to set the address when an address is selected
    let addressSelect=(e)=>{
        setAddId(e.target.value);
    }
    
    // callback function to create a new post and post it to server
    let createPost=(e)=>{
        e.preventDefault();
        
        setPost({...post, ...templatePost})

        axios.post(link+`/post/posts`, post)
        
        .then((response)=>{
            postDispatch({type:"savepost", newpost:response.data})
            navi("/myaccount")

        })
        
        .catch(()=>{})
        
    }

    return(
        <div className="container m-4 mx-auto bg-light p-3 rounded-3">
            <form  onSubmit={createPost}>
            <table className="table table-dark table-responsive-sm">
                <thead className="table-dark">
                    <tr>
                        <th>Category</th><th>Address</th><th>Title</th><th>Description</th>
                    </tr>
                </thead>
                <tbody className="table-light">
                    <tr>
                        <td>
                            <select className="form-select form-select-sm" name="category" onChange={categorySelect} required>
                            <option selected disabled>select category</option>
                                {
                                    categories.map((cat)=>{
                                        return <option key={cat.expertiseId} value={cat.expertiseId}>{cat.name}</option>
                                    })
                                }
                            </select>
                            
                        </td>
                        <td>
                            <select className="form-select form-select-sm" name="address" defaultValue={9999} onChange={addressSelect} required>
                                <option value={9999} disabled>select address</option>
                                
                                {
                                    addresses.map((add)=>{
                                        return <option key={add.addressId} value={add.addressId}>{add.details+", "+add.city+" - "+add.pincode}</option>
                                    })
                                }
                                <option className="">Add New Address</option>
                            </select>
                        </td>
                        <td>
                            <input type="text" name="title" id="title" onChange={inputHandler} required></input>
                        </td>
                        <td>
                            <input type="text" name="description" id="description" onChange={inputHandler} required></input>
                        </td>
                    </tr>
                    <tr className="table-dark">
                        <button type="submit" className="btn btn-success">Submit</button>
                    </tr>
                </tbody>
            </table>
            </form>
        </div>
    )
}