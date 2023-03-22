import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function TCSPosts(props) {
    
    // extracting link from the redux store
    let link=useSelector((state)=>{return state.link})

    // extracting all the expertise ids of the SP
    let expertiseIds = props.expertise.map((exp) => { return exp.expertiseId })

    // storing the list of posts relevant to the SP in state
    const [postList, setPostList] = useState([]);

    // fetching all the posts related to the SP as soon as the component loads
    useEffect(() => {

        axios.post(link+`/post/expertise`, expertiseIds)
            .then((response) => {
                setPostList(response.data)
                // console.log(response.data)
            })
            .catch(() => {
                console.log("unable to fetch")
            })
    }, [link,])

    return (
        <div>
            <h1 className='text-center'>Posts</h1>
            {
                postList.map((post) => {
                    return <div key={post.postId}>
                        <div className="card text-white bg-dark border-danger" style={{ maxWidth: "10rem" }}>
                        <p className="card-header text-center bg-primary p-1"> {post.category.name}</p>
                            <div className="card-header p-1">{post.title}  </div>
                            <div className="card-body p-1">
                                
                                {/* <h5 className="card-title">Checking the title</h5> */}
                                {/* <h5 className="card-title">Hello this is title</h5> */}
                                <p className="card-text "> {post.description}</p>
                                <p>{post.date}</p>
                                <p className="card-text font-italic">Address: {post.address.locality}, {post.address.city}-{post.address.pincode}</p>
                                <Link className='btn btn-success' to="/tcsbid" state={post}>BID</Link>
                            </div>
                        </div>
                    </div>
                })
            }
        </div>
    )
}

