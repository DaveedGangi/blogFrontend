import {Component} from "react";

import {Link} from "react-router-dom";

import Cookies from "js-cookie";

import "./index.css";


class AddNewPost extends Component {

    state={title:"",description:"",image:""};

    addTitle=(e)=>this.setState({title:e.target.value});
    
    addTextArea=(e)=>this.setState({description:e.target.value});
    
    addImage=(e)=>this.setState({image:e.target.value});
    
    addPost=async(e)=> {
        e.preventDefault();
        const jwtToken = Cookies.get("jwtTokenBlog")

       const url="https://blogbackend-3hud.onrender.com/posts";
       const data={
        title:this.state.title,
        description:this.state.description,
        image:this.state.image,
       }

       const options={
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+jwtToken
        },
        body:JSON.stringify(data),
       }

       const response = await fetch(url,options);
       if(response.ok){
        this.setState({title:"",description:"",image:""});
        console.log("Post added successfully");
       }
       else{
        console.error("Failed to add post");
       }



    }

    render(){
        const user = JSON.parse(localStorage.getItem("user"));
        const {title, description,image} = this.state;
        return(
            <div className="bg-for-post-add">
                <div className="navbar">
                    <h1>
                        <Link className="home-link" to="/">Home</Link>
                    </h1>
                    <h3 className="add-nav-bar-text">Add your favourite post</h3>
                    <Link className="profile" to="/profile"><span className="user-name">{user.username[0]}</span></Link>
                </div>


                <div className="add-post-container">
                <h1>Add New Post</h1>
                
                <form className="form-add-post" onSubmit={this.addPost}>
                    <label htmlFor="title">Title</label>
                    <input className="input" value={title} onChange={this.addTitle} placeholder="Enter a Title" type="text" id="title" name="title" required />
                    <label  htmlFor="description">Description</label>
                    <textarea className="input" value={description} onChange={this.addTextArea} placeholder="Enter your description" id="description" name="description" rows="4" cols="38" required></textarea>
                    <label htmlFor="imageUrl">Image URL</label>
                    <input className="input" value={image} onChange={this.addImage} placeholder="Enter your image Url" type="text" id="imageUrl" name="imageUrl" required />
                    <div>
                    <button className="button-for-add-post" type="submit">Submit</button>
                    </div>
                </form>

                </div>
            </div>
        )
    }


}

export default AddNewPost;