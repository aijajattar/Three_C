// import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsFillPlusSquareFill } from "../../node_modules/react-icons/bs"
export default function TCCPosts(props) {
    let posts = props.posts;
    
    let postkey=100;

    return (
        <div className="card">
            <h5 className="text-center">YOUR POSTS</h5>
            <div className="card-body d-flex flex-wrap bg-light p-2 rounded">
                <div className="card text-white bg-dark" style={{ maxWidth: "23rem" }}>
                    <div className="card-header text-center">Create New Post</div>
                    <div className="card-body">
                        {/* <h5 className="card-title">Checking the title</h5> */}
                        {/* <h5 className="card-title">Hello this is title</h5> */}
                        <p className="card-text text-center"> <Link to="/newpost"><BsFillPlusSquareFill size="2em"></BsFillPlusSquareFill></Link> </p>
                    </div>
                </div>
                {
                    posts.map((post) => {
                        postkey++;
                        return <div className="card text-white bg-dark p-0" key={postkey} style={{ maxWidth: "10rem" }}>
                            <p className="card-header text-center bg-primary p-1"> {post.category.name}</p>
                            <div className="card-header text-center p-0">{post.title}</div>
                            <div className="card-body">
                                {/* <h5 className="card-title">Checking the title</h5> */}
                                {/* <h5 className="card-title">Hello this is title</h5> */}
                                <p className="card-text">{post.description}</p>
                                
                            </div>
                            <Link to="/showbids" state={post} className="btn btn-success p-0"> Show bids</Link>
                        </div>
                    })
                }
            </div>
        </div>

    )
}