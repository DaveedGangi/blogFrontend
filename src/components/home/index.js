
import {Component} from "react";

import {Link} from "react-router-dom";

import Cookies from "js-cookie"

import {DNA} from "react-loader-spinner"

import Lottie from 'react-lottie';



import "./index.css"

import animation from '../animate/animation.json'

const condition={

    isFail:"fail",
    isSuccess:"success",
    isPending:"pending"
}




class Home extends Component {

    state={posts:[],status:condition.isPending,searchText:""}

    componentDidMount(){
        this.getPosts();
    }
    
    getPosts = async () => {
        this.setState({status:condition.isPending})
        const {searchText} = this.state;

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
            const filteredData=data.filter((each)=>each.title.toLowerCase().includes(searchText.toLowerCase()))
            console.log(filteredData)
            if(response.ok) {
                this.setState({posts: filteredData,status:condition.isSuccess});
                console.log("Successfully fetched posts");
            }
            else{
                console.log("Failed to fetch posts");
                this.setState({status:condition.isFail})
            }
        }


    inputSearchText=(e)=>{
        this.setState({searchText:e.target.value},()=>{
            this.getPosts()
        })
    }

blogList=()=>{
    const {posts}=this.state
    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: animation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }
    return(
        <div className="home-container">

        <p className="description-text">WordFlow is a dynamic and user-friendly platform that empowers users to effortlessly create, share, and manage their blog posts. With a sleek interface and powerful tools, writers can focus on what matters most—crafting compelling stories and ideas. Users can customize their profiles, explore a wide range of topics, interact through comments, and engage with a vibrant community of bloggers. Whether you're a casual writer or a seasoned blogger, WordFlow provides the perfect space to let your words flow.</p>
        
        <hr/>
        
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
  
        {
            posts.length===0?
            <div className="empty-posts"><div> <Lottie className="Lottie" 
            options={defaultOptions}
        
        />
           </div>
           <p>Please add a post</p></div>
        :<div className="posts-container">
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
}

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
<h1 className="loading-text">Loading...</h1>
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
                    <h1 className="blog-heading-for-navbar">WordFlow</h1>
                     <Link className="profile" to="/profile"><span className="user-name">{user.username[0]}</span></Link>
                </div>

                <h3 className="welcome-blog-heading">Welcome to WordFlow App</h3>
                  


                <div className="input-search-container">
                 <div>
                <input onChange={this.inputSearchText} className="search-input-text" type="search" placeholder="search for posts here..."/>
                </div>
                </div>

              


                {
                    this.homeComponent()
                }

        
            </div>
        );
    }



}

export default Home;