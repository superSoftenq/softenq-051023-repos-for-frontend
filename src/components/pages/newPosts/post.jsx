import HeaderPost from "./headerPost";
import TextInPost from "./textInPost";
import './post.css'
import DownBar from "./downbar";

const Post = (props) => {


    return (
        
        
        <div className="bigClassPosts">
               <div className="Post"> 
           <div className="HeaderInPost">
                <HeaderPost 
                avtorPosta = {props.avtorPosta}
                timeByPost = {props.timeByPost}/>
           </div>

           <div className="TextInPost">
                <TextInPost message = {props.message} />
           </div>
           
           <div>
                <img className="fhotoInPost" src="https://images.unsplash.com/photo-1531564701487-f238224b7ce3?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG9zdHxlbnwwfHwwfHx8MA%3D%3D"/>
           </div>

           <div>
            <DownBar likecounter = {props.likecounter} repostCounter = {props.repostCounter} />
           </div>

           
        </div>


        </div>
        
        
        
    )
}

export default Post;