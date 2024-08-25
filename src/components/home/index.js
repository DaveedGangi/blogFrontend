
import {Component} from "react";

import {Link} from "react-router-dom";

import Cookies from "js-cookie"
import {DNA} from "react-loader-spinner"


import "./index.css"

const condition={

    isFail:"fail",
    isSuccess:"success",
    isPending:"pending"
}




class Home extends Component {

    state={posts:[],status:condition.isPending}

    componentDidMount(){
        this.getPosts();
    }
    
    getPosts = async () => {
        this.setState({status:condition.isPending})

        const url="https://blogbackend-3hud.onrender.com/posts";
        const jwtToken=Cookies.get("jwtTokenBlog")
        const options={
            method:"GET",
            headers:{
                "Authorization":"Bearer "+jwtToken
            }
        }

            const response = await fetch(url,options);
            const data = await response.json();
            if(response.ok) {
                this.setState({posts: data,status:condition.isSuccess});
                console.log("Successfully fetched posts");
            }
            else{
                console.log("Failed to fetch posts");
                this.setState({status:condition.isFail})
            }
        }

blogList=()=>{
    const {posts}=this.state
    return(
        <div className="home-container">

        <p>You can create new posts, edit existing posts, and delete posts.</p>
        <p>You can also view other users' posts and leave comments.</p>
        
        <div className="info-posts">
            <div>
                <h3>Total Posts: {posts.length}</h3>
            </div>
            <div>
            <Link to="add-new-post">
            <button type="button" className="add-new-post-button">Add a New Post</button></Link>
            </div>
        </div>

    <br/>
    <div className="posts-container">
        {
            posts.map((post) => (
                <div className="posts" key={post.id}>
                    <p>Posted by: {post.username}</p>
                    <h2>{post.title}</h2>
                    <p>{post.description.slice(0,22)}....</p>
                    <Link to={`/post/${post.id}`}>Read More</Link>
                </div>
            ))
        }
    </div>

        </div>


    )
}

    
loading=()=>(
    <div className='loader'>
        <div>
        <DNA
visible={true}
height="80"
width="80"
ariaLabel="dna-loading"
wrapperStyle={{}}
wrapperClass="dna-wrapper"
/>
<h1>Loading...</h1>
</div>
    </div>
)


    homeComponent =()=>{
        const {status}=this.state

        switch(status){
            case condition.isFail:
                return <h1>Something went wrong</h1>
            case condition.isSuccess:
                return this.blogList()
            case condition.isPending:
                return this.loading()
            default:
                return <h1>Something went wrong</h1>
        }
        
    }
    

    render() {
        const user = JSON.parse(localStorage.getItem("user"));
        const jwtToken=Cookies.get("jwtTokenBlog")
        const {posts}=this.state;
        console.log(posts);
        if(!jwtToken){
            this.props.history.replace("/login")
        }
        return (
            <div>
                <div className="navbar">
                    <h1>Blog</h1>
                    <p>Welcome to Blog App</p>
                    <Link className="profile" to="/profile"><span className="user-name">{user.username[0]}</span></Link>
                </div>

              


                {
                    this.homeComponent()
                }

        
            </div>
        );
    }



}

export default Home;