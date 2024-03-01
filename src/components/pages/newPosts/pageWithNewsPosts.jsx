import Post from "./post";
import './pageWithNewsPosts.css'
import { NavLink } from "react-router-dom";

const PageWithNewsPosts= (props) => {
    
    let listPostsFromComp = props.DateForPost.posts.map
    ( p => <Post 
        id = {p.id}
        avtorPosta = {p.avtorPosta}
        timeByPost = {p.timeByPost}
        message = {p.message} 
        likecounter = {p.likecounter} 
        repostCounter = {p.repostCounter}/>)
    return(

        
        <div className="myPosts">
                <div >
                    <NavLink className="butForHome" to = '/myprofile'> My Profile</NavLink>
                    </div>
                
                {listPostsFromComp}
                
        </div>
    )
}

export default PageWithNewsPosts;