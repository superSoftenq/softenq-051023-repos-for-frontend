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


console.log('PROPS in post jsx = ', props)
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
                <img className="fhotoInPost" src='{photolink}'/>
           </div>

           <div>
            <DownBar likecounter = {likess} repostCounter = {props.repostCounter} postId = {props.postId}/>
           </div>

           
        </div>


        </div>
        
        
        
    )
}

export default Post;