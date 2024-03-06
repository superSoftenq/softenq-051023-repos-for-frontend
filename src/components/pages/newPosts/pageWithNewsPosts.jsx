import Post from "./post";
import './pageWithNewsPosts.css'
import { NavLink } from "react-router-dom";
import React from "react";

const PageWithNewsPosts= (props) => {
    
    let listPostsFromComp = props.DateForPost.posts.map
    ( p => <Post 
        id = {p.id}
        avtorPosta = {p.avtorPosta}
        timeByPost = {p.timeByPost}
        message = {p.message} 
        likecounter = {p.likecounter} 
        repostCounter = {p.repostCounter}/>)

    let dataForPost = 
    {
    ownerId: "568",
    photoId: "7799"
}
     let createPost = () => {
      fetch('/api/post/create', {
        method: 'POST',
        headers: { 
           'Content-Type': 'application/json' // Устанавливаем заголовок Content-Type для указания типа данных 
         }, 
        body: JSON.stringify(dataForPost)}).then(response => { 
           if (!response.ok) { 
             throw new Error('Ошибка сети или сервера'); 
           } 
           return response.json(); // Парсим ответ сервера в формате JSON 
         }) 
         .then(data => { 
           console.log(data); // Обрабатываем полученные данные 
         }) 
         .catch(error => { 
           console.error(error); // Обрабатываем ошибки 
         });
     }
    return(

        
        <div className="myPosts">
                <div >
                    <NavLink className="butForHome" to = '/myprofile'> My Profile</NavLink>
                    </div>
                <div>
                    <div><textarea ></textarea></div>
                    <div><button onClick={createPost}> add new Post</button></div>
                </div>
                {listPostsFromComp}
                
        </div>
    )
}

export default PageWithNewsPosts;