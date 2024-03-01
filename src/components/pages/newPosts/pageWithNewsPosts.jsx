import Post from "./post";
import './pageWithNewsPosts.css'

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
                this page from new Posts
                {listPostsFromComp}
                
        </div>
    )
}

export default PageWithNewsPosts;