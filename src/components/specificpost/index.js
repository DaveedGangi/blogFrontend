
import {Component} from "react"

import {Link} from "react-router-dom";

import Cookies from 'js-cookie';

import {DNA} from "react-loader-spinner"

import "./index.css";

const condition={

    isFail:"fail",
    isSuccess:"success",
    isPending:"pending"
}


class Post extends Component {

    state ={post:[],comments:[],commentShow:false,comment:"",status:condition.isPending}

    componentDidMount(){
        this.getSpecificPost();
        this.getComments();
    }

    getSpecificPost=async()=>{
        this.setState({status:condition.isPending});
        const {match} = this.props;
        const {params} = match;
        const {id} = params;
        const jwtToken =Cookies.get("jwtTokenBlog")
        const url = `https://blogbackend-3hud.onrender.com/posts/${id}`;
        
        const options={
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            }
        }

        const response=await fetch(url, options);
        if(response.ok){
            const data = await response.json();
            this.setState({post:data,status:condition.isSuccess});
        }
        else{
            console.error("Failed to fetch post");
            this.setState({status:condition.isFail});
        }
    
    }

    getComments=async()=>{
        const {match} = this.props;
        const {params} = match;
        const {id} = params;
        const jwtToken = Cookies.get("jwtTokenBlog")
        const url = `https://blogbackend-3hud.onrender.com/getcomments/${id}`;

        const options={
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            }
        }
        const response=await fetch(url, options);
        if(response.ok){
            const data = await response.json();
            this.setState({comments:data});
        }
        else{
            console.error("Failed to fetch comments");
        }
    }

    showComment=()=>{
        this.setState((prevState)=>({commentShow:!prevState.commentShow}));
    }

    commentText=(e)=>{
        this.setState({comment:e.target.value});
    }


    addComment=async(e)=>{
        e.preventDefault();
        const {match} = this.props;
        const {params} = match;
        const {id} = params;
        const jwtToken = Cookies.get("jwtTokenBlog")
        const url = `https://blogbackend-3hud.onrender.com/addcomment/${id}`;
        const data = {
            content:this.state.comment
        }

        const options={
            method: 'POST',
            headers: {
                "Content-Type":"application/json",
                Authorization: `Bearer ${jwtToken}`
            },
            body:JSON.stringify(data)
        }
            const response=await fetch(url, options);
            if(response.ok){
                const data = await response.json();
                this.setState((prevState)=>({comments:[...prevState.comments,data],comment:"",commentShow:false}));
                this.getComments();
            }
            else{
                console.error("Failed to add comment");
            }
        }



    deleteComment=async(id)=>{
        const jwtToken = Cookies.get("jwtTokenBlog")
        const url = `https://blogbackend-3hud.onrender.com/deletecomment/${id}`;
        const options={
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        }
        const response=await fetch(url, options);
        if(response.ok){
            this.getComments();
        }
        else{
            console.error("Failed to delete comment");
        }
    }

 specificPost=()=>{
    const {post,comments,commentShow,comment} = this.state;
    const user=JSON.parse(localStorage.getItem("user"));
    console.log("user",user)
    return(
        <div className="post-info-container">
        <div className="date-time">
            <p>Date: {new Date(post.datetime).toLocaleDateString()}</p>
            <p>Time: {new Date(post.datetime).toLocaleTimeString()}</p>
        </div>
        <h1>{post.title}</h1>
        <div>
            <img className="post-image" src={post.image} alt="post-image-not-found" />
        </div>
        <p className="description">{post.description}</p>
        <p className="posted-by">Posted by: {post.username}</p>

        <div className="comment-show-hide-container">
            <p>Comments:{comments.length}</p>
            <div>
                {
                    commentShow?
                
                <button className="show-and-hide-comment-button" type="button" onClick={this.showComment}>Hide Comments</button>
                :

                <button className="show-and-hide-comment-button" type="button" onClick={this.showComment}>Show Comments</button>
                }
            </div>
        </div>

        <div className={commentShow? "comment-show" : "comment-hide"}>
            <p>Add a comment:</p>
            <form onSubmit={this.addComment} className="comment-input-container">
                <div>
            <textarea rows="5" cols="40" value={comment} onChange={this.commentText} className="comment-input" type="text" placeholder="Your comment" required/>
                </div>
                <div>
            <button className="add-comment-button-for-post" type="submit">Add Comment</button>
                </div>
            </form>

            {comments.length===0? <p>No comments yet</p> :

            <div>

           {
            comments.map((comment)=>{
                return(
                    <div key={comment.id} className="comment-container">
                        <div className="date-time">
                            <p>Date: {new Date(comment.datetime).toLocaleDateString()}</p>
                            <p>Time: {new Date(comment.datetime).toLocaleTimeString()}</p>
                        </div>
                        <p className="comment-text">{comment.content}</p>
                        <p>Commented by: {comment.username}</p>
                          

                     {user.username===comment.username&&
                        <div>
                            <button className="delete-comment-button" type="button" onClick={()=>this.deleteComment(comment.id)}>Delete</button>
                        </div>
                       }







                    </div>
                )
            })
           }

           </div>

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


    specificComponent=()=>{
        const {status}=this.state

        switch(status){
            case condition.isFail:
                return <h1>Something went wrong</h1>
            case condition.isSuccess:
                return this.specificPost()
            case condition.isPending:
                return this.loading()
            default:
                return <h1>Something went wrong</h1>
        }


    }

    render(){
      
        const user = JSON.parse(localStorage.getItem("user")); 

        return (
            <div>
              <div className="navbar">
                    <h1>
                        <Link className="home-link" to="/">Home</Link>
                    </h1>
                    <h3 className="navbar-post-info-text">Post info</h3>
                    <Link className="profile" to="/profile"><span className="user-name">{user.username[0]}</span></Link>
                </div>

             

                    {
                        this.specificComponent()
                    }


            </div>
        )
    }

}

export default Post;