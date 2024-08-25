
import {Component} from "react";

import Cookies from 'js-cookie';

import {Link} from "react-router-dom";

import {DNA} from "react-loader-spinner"


import "./index.css"

const condition={

    isFail:"fail",
    isSuccess:"success",
    isPending:"pending"
}







class EditPost extends Component {

    state = {
        title:"",
        description:"",
        image:"",
        id:"",
        status:condition.isPending
    }
    componentDidMount(){
        this.getPost();
    }
    getPost=async()=>{
        this.setState({status:condition.isPending});
        const {match} = this.props;
        const {params} = match;
        const {id} = params;
        const jwtToken = Cookies.get("jwtTokenBlog")
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
            console.log("getMyPost:",data)
            this.setState({title:data.title,description:data.description,image:data.image,id:data.id,status:condition.isSuccess});
        }
        else{
            console.error("Failed to fetch post");
            this.setState({status:condition.isFail});
        }
    }

    updatePost=async(e,id)=>{
        e.preventDefault();
        const {title,description,image} = this.state;
        const jwtToken = Cookies.get("jwtTokenBlog")
        const url = `https://blogbackend-3hud.onrender.com/posts/${id}`;
        const data = {
            title,
            description,
            image
        }
        const options={
            method: 'PUT',
            headers: {
                "Content-Type":"application/json",
                Authorization: `Bearer ${jwtToken}`
            },
            body:JSON.stringify(data)
        }
        const response=await fetch(url, options);
        if(response.ok){
            const data = await response.json();
            console.log("updatePost:",data)
            this.setState({title:"",description:"",image:""});
            this.props.history.push("/");
        
        }
        else{
            console.error("Failed to update post");
        }

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

editPostForm=()=>{
    const {title,description,image,id} = this.state;

    return(
        <div className="form-container-for-edit-post">
        <form className="form-edit-post" onSubmit={(e)=>this.updatePost(e,id)}>
            <label htmlFor="title">Title</label>
            <input className="input" type="text" id="title" value={title} onChange={(e)=>this.setState({title:e.target.value})}/>
            <label htmlFor="description">Description</label>
            <textarea className="input" rows="14" cols="38"  type="text" id="description" value={description} onChange={(e)=>this.setState({description:e.target.value})} required></textarea>
            <label htmlFor="image">Image</label>
            <input className="input" type="text" id="image" value={image} onChange={(e)=>this.setState({image:e.target.value})}/>
            <br/>
            <button className="button-update" type="submit">Update</button>

        </form>
        </div>


    )
}
    
    
        formEditComponent =()=>{
            const {status}=this.state
    
            switch(status){
                case condition.isFail:
                    return <h1>Something went wrong</h1>
                case condition.isSuccess:
                    return this.editPostForm()
                case condition.isPending:
                    return this.loading()
                default:
                    return <h1>Something went wrong</h1>
            }
            
        }
        

    render(){
     
        const user = JSON.parse(localStorage.getItem("user"));

        return(
            <div className="bg-for-post-edit">

                <div className="navbar">
                    <h1>
                        <Link className="home-link" to="/">Home</Link>
                    </h1>
                    <p>Edit your post</p>
                    <Link className="profile" to="/profile"><span className="user-name">{user.username[0]}</span></Link>
                </div>
                
              

                {
                    this.formEditComponent()
                }

            
            </div>
        )
    }



}


export default EditPost;