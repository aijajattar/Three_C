import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios"


export default function TCCNewPost() {

    // method to save the post into the redux store
    let postDispatch = useDispatch();

    // extracting link from the redux store
    let link = useSelector((state) => { return state.link })

    // retrieving consumer id from redux store
    let consumerId = useSelector((state) => { return state.consumer.consumerId })

    // method to navigate user to another component
    let navi = useNavigate();

    // storing list of categories in state
    let [categories, setCats] = useState([]);

    // storing list of addresses in state
    let [addresses, setAdds] = useState([])

    // keeping almost final post in state to use it in final post object
    let [post, setPost] = useState({});

    // storing expertiseId in state for using it in the dummy post
    let [expertiseId, setExp] = useState();

    // storing addressId in state for using it in the dummy post
    let [addressId, setAddId] = useState();

    // storing date in state to parse it
    let [date, setDate] = useState();

    // creating a post template to use it in json
    let templatePost = {
        category: {
            expertiseId
        },
        address: {
            addressId
        },
        consumer: {
            consumerId
        },
        date
    }

    useEffect(() => {
        // fetching all the categories as soon as the component is mounted
        axios.get(link + `/expertise/expertises`)
        .then(
            (response) => {
                setCats(response.data)
        })

        // registering callback function for when the promise is rejected
        .catch(() => {
            setCats([])
        })
        
        
        // fetching all the addresses of the consumer
        axios.get(link + `/address/consumer/` + consumerId)
        .then(
            (response) => {
                console.log(response.data)
                setAdds(response.data)
            })

        // registering callback function for when the promise is rejected
        .catch(() => {
            setAdds([])
        })
    }, [link, consumerId])



    // callback function to store input in the post object
    let inputHandler = (e) => {
        setPost({ ...post, ...templatePost, [e.target.name]: e.target.value })
        // console.log(e.target.value)
        // console.log(post)
    }

    // callback function to store date when user changes it
    let dateHandler = ((e) => {
        // console.log(e.target.value)
        console.log(Date.parse(e.target.value))
        setDate(Date.parse(e.target.value))
        // console.log(typeof (Date.parse(e.target.value)))
        // console.log(Date.now())
    })

    // callback function to set the expertise when a category is selected
    let categorySelect = (e) => {
        setExp(e.target.value);
        // console.log(post)
    }

    // callback function to set the address when an address is selected
    let addressSelect = (e) => {
        setAddId(e.target.value);
    }

    // callback function to create a new post and post it to server
    let createPost = (e) => {
        e.preventDefault();

        // creating the final post object
        setPost({ ...post, ...templatePost })

        // sending the final post object to the server
        axios.post(link + `/post/posts`, post)

        .then((response) => {
            postDispatch({ type: "savepost", newpost: response.data })
            navi("/myaccount")
        })

        .catch(() => { })
    }

    return (
        <div className="container m-4 mx-auto bg-light p-3 rounded-3" style={{ width: "fit-content", maxWidth: "23rem" }}>
            <h1 className="text-center">New Post</h1>
            <form onSubmit={createPost} className="m-3">
                <div className="row d-flex flex-row">

                    {/* Title */}
                    <div className="card text-white bg-dark mb-2" style={{ maxWidth: "23rem" }}>
                        <div className="card-header text-center">Title</div>
                        <input className="form-control mb-3" autoFocus placeholder="What do you need help with?" type="text" name="title" id="title" onChange={inputHandler} required style={{ maxWidth: "23rem" }}></input>
                    </div>

                    {/* Category */}
                    <div className="card text-white bg-dark mb-2" style={{ maxWidth: "23rem" }}>
                        <div className="card-header text-center">Category</div>
                            <select className="form-control form-select form-select-sm mb-3" name="category" defaultValue={88888} onChange={categorySelect} required>
                                <option className="text-center" value={88888} disabled>-- select category --</option>
                                {
                                    categories.map((cat) => {
                                        return <option key={cat.expertiseId} value={cat.expertiseId}>{cat.name}</option>
                                    })
                                }
                            </select>
                        
                    </div>
                    
                    {/* Addresses */}
                    <div className="card text-white bg-dark mb-2" style={{ maxWidth: "23rem" }}>
                        <div className="card-header text-center">Address</div>
                        <select className="form-control form-select form-select-sm mb-3" name="address" defaultValue={9999} onChange={addressSelect} required>
                            <option className="text-center" value={9999} disabled>-- select address --</option>

                            {
                                addresses.map((add) => {
                                    return <option key={add.addressId} value={add.addressId}>{add.details + ", " + add.city + " - " + add.pincode}</option>
                                })
                            }
                            {/* <option className=""><a href="/newaddress">New</a></option> */}
                        </select>
                    </div>
                     
                    {/* Date and time */}
                    <div className="card text-white bg-dark mb-2" style={{ maxWidth: "23rem" }}>
                        <div className="card-header text-center">Date and Time</div>
                        <input className="form-control mb-3" name="servicedate" id="servicedate" type="datetime-local" onChange={dateHandler} required style={{ maxWidth: "23rem" }}></input>
                    </div>
                    
                    {/* Description */}
                    <div className="card text-white bg-dark mb-2" style={{ maxWidth: "23rem" }}>
                        <div className="card-header text-center">Description</div>
                        <textarea className="form-control mb-3" placeholder="Please describe the problem in a few words.."
                            rows="3" name="description" id="description" onChange={inputHandler}
                            required style={{ maxWidth: "23rem" }}></textarea>
                    </div>
                </div>

                {/* Buttons */}
                <div className="d-flex flex-row">
                <button type="submit" className="btn btn-success me-2">Submit</button>
                <button type="reset" className="btn btn-danger">Reset</button>
                </div>
            </form>
        </div>
    )
}