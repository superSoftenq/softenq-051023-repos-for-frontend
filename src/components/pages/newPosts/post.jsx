import HeaderPost from "./headerPost";
import TextInPost from "./textInPost";
import './post.css'
import DownBar from "./downbar";
import React, { useEffect, useState } from "react"


const Post = (props) => {

/*
background: -webkit-linear-gradient(45deg, rgb(153, 163, 160), rgb(147, 159, 159) 8%);
background: -moz-linear-gradient(45deg, rgb(153, 163, 160), rgb(147, 159, 159) 8%);
background: linear-gradient(45deg, rgb(153, 163, 160), rgb(147, 159, 159) 8%);


*/
const [likes, setLikes] = useState([])
const [statusCode, setStatusCode] = useState([])
let tmpDate = props.publicationDate;
let localDate = new Date(tmpDate)
let normDate = String(localDate.toUTCString())
const getLikesPost = async () => {
     console.log('пытаюсь получит ЛАЙКИ')
     
    fetch("/api/post/" + props.postId + "/getlikes")
      .then((response) => {
        setStatusCode(response.status)
        if (response.status == 200) {
        }

        return response.json();
      })
      .then((data) => {
        console.log('data Likes = ', data)
        setLikes(data)
        if (rs == -1) {
          setAuthorized(-1)
        } else if (rs != data.id) {
          setAuthorized(false)
        } else {
          setAuthorized(true)
        }
      });
   }

useEffect(() => {
  fetch("/api/post/" + props.postId + "/getlikes")
  .then((response) => {
    setStatusCode(response.status)
    if (response.status == 200) {
    }

    return response.json();
  })
  .then((data) => {
    console.log('data Likes = ', data)
    setLikes(data)
    if (rs == -1) {
      setAuthorized(-1)
    } else if (rs != data.id) {
      setAuthorized(false)
    } else {
      setAuthorized(true)
    }
  });
     
   }, []);


console.log('PROPS = ', props)
let likess = likes.length
console.log("all likes in post = ", likess)
    return (
        
        
        <div className="bigClassPosts">
               <div className="Post"> 
           <div className="HeaderInPost">
                <HeaderPost 
                avtorPosta = {props.avtorPosta}
                timeByPost = {normDate}/>
           </div>

           <div className="TextInPost">
                <TextInPost message = {props.message} />
           </div>
           
           <div>
                <img className="fhotoInPost" src="https://images.unsplash.com/photo-1531564701487-f238224b7ce3?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG9zdHxlbnwwfHwwfHx8MA%3D%3D"/>
           </div>

           <div>
            <DownBar likecounter = {likess} repostCounter = {props.repostCounter} postId = {props.postId}/>
           </div>

           
        </div>


        </div>
        
        
        
    )
}

export default Post;