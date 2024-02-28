import Post from "./post";

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

        
        <div>
                this page from new Posts
                {listPostsFromComp}
                
        </div>
    )
}

export default PageWithNewsPosts;