
import {Component} from "react";

import {Link} from "react-router-dom";

import Cookies from 'js-cookie';

import {DNA} from "react-loader-spinner"

import "./index.css"

const condition={

    isFail:"fail",
    isSuccess:"success",
    isPending:"pending"
}



class Profile extends Component {

    state={myposts:[],status:condition.isPending}

    componentDidMount(){
        this.getmyPosts();
    }

    removeJwtToken=(props)=>{
        Cookies.remove("jwtTokenBlog");
        localStorage.removeItem("user");
        const {history}=this.props 
        history.replace("/login")
       
    }

    getmyPosts = async () => {
        this.setState({ status: condition.isPending })
        const url = "https://blogbackend-3hud.onrender.com/getmyposts";
        const jwtToken = Cookies.get("jwtTokenBlog");
        const options = {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + jwtToken
            }
        }
        const response = await fetch(url, options);
        if (response.ok) {
            const data = await response.json();
            this.setState({ myposts: data, status: condition.isSuccess });
            console.log("Successfully fetched posts");
        }
        else {
            console.log("Failed to fetch posts");
            this.setState({ status: condition.isFail })
        }



    }

    deleteMyPost = async (postId) => {
        const url = "https://blogbackend-3hud.onrender.com/posts/" + postId;
        const jwtToken = Cookies.get("jwtTokenBlog");
        const options = {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + jwtToken
            }
        }
        const response = await fetch(url, options);
        if (response.ok) {
            console.log("Successfully deleted post");
            this.getmyPosts();
        }
        else {
            console.log("Failed to delete post");
        }

    }

    myPostInfo=()=>{
        const {myposts}=this.state

        return(
            <div>
                <div className="no-posts-found-container">
                {
                myposts.length===0&&<h1>No Posts Found
                    <img className="profile-no-posts-found" src="https://cdni.iconscout.com/illustration/premium/thumb/world-business-vision-9772498-8049394.png" alt="no-posts"/>
                </h1>
            }
            </div>
            <div className="my-posts-container">
            { 
                myposts.map(post => (
                    <div className="my-posts" key={post.id}>
                        <h3>{post.title}</h3>
                        <img className="my-post-image" src={post.image} alt={post.title}/>
                        <p>{post.description.slice(0,22)}....</p>
                        <div className="buttons-edit-view-delete">
                            <div>
                        <Link to={"/post/"+post.id}>
                            <button className="view-post-button" type="button">View Post</button>
                        </Link>
                        </div>
                        <div>
                            <Link to={"/edit-post/"+post.id}>
                            <button className="edit-post-button" type="button">Edit Post</button></Link>
                        </div>
                        <div>
                            <button onClick={()=>this.deleteMyPost(post.id)} className="delete-post-button" type="button">Delete Post</button>
                        </div>
                        </div>
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


    myPostsComponent=()=>{
        const {status}=this.state

        switch(status){
            case condition.isFail:
                return <h1>Something went wrong</h1>
            case condition.isSuccess:
                return this.myPostInfo()
            case condition.isPending:
                return this.loading()
            default:
                return <h1>Something went wrong</h1>
        }


    }


    render() {
        const user = JSON.parse(localStorage.getItem("user"));
        const { myposts } = this.state;
        return (
            <div>
                     <div className="navbar">
                    <div>
                    <Link to="/">
                     <button className='home-button' type="button">Home</button>
                    </Link>


                    </div>
                    <h3 className="profile-navbar-text">Profile Page</h3>

                    <div>     
                     <button className="log-out-button" type="button" onClick={this.removeJwtToken}>Log Out</button>
                    </div>

                     </div>
               
                <div className="profile-container">
                <p>You are logged in as <span className="user-full-name">{user.username} </span></p>

                <br/>
           

            <h2>My Posts: {myposts.length}</h2>
            <hr/>
            


          
            {
                this.myPostsComponent()
            }
            

            <p>Thank you for visiting our blog!</p>


            </div>

            </div>
        )
    }
}

export default Profile;