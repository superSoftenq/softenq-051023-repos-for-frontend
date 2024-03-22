import Post from "./post";
import './pageWithNewsPosts.css'
import { NavLink, json } from "react-router-dom";
import React, { useEffect, useState } from "react"
import { renderAllPost } from "../userPageIncludes";
import FormNewPost from "./formFormAddNewPost/formForAddNewPost";

let dataForGetPost = {
  startingPoint: 0,
  postsCount: 9999,

  flags: 0
}

let newElementPost = React.createRef();

let createPost = () => {

  
  let dataForPost = {
    ownerId: 568,
  photoId: 7799
  }

  dataForPost.comment = newElementPost.current.value;
  console.log('check temp Obj = ', dataForPost)
  fetch('/api/post/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' // Устанавливаем заголовок Content-Type для указания типа данных 
    },
    body: JSON.stringify(dataForPost)
  }).then(response => {
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


const PageWithNewsPosts = (props) => {

  const [postsArray, setPosts] = useState([])

  useEffect(() => {
    fetch('/api/feed', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Устанавливаем заголовок Content-Type для указания типа данных 
      },
      body: JSON.stringify(dataForGetPost)
    }).then(response => {
      if (!response.ok) {
        throw new Error('Ошибка сети или сервера');
      }
      return response.json(); // Парсим ответ сервера в формате JSON 
    })
      .then(data => {
        console.log(data); //это почему-то выполняется бесконечное число раз
        setPosts(data)
      })
      .catch(error => {
        console.error(error); // Обрабатываем ошибки 
      });

  }, []);
  
  
  return (


    <div className="myPosts">
      <div >
        <NavLink className="butForHome" to='/myprofile'> My Profile</NavLink>
      </div>
      <div>
        <FormNewPost refForTextArea={newElementPost} funcForCreatePost = {createPost}/>
      </div>
      <div>
        
        
        <div><button className="butForViewAllPost">view all post</button></div>
      </div>
      <div>
      
        
        {postsArray.length != 0 && renderAllPost(postsArray)}
      </div>
      
    </div>
  )
}

export default PageWithNewsPosts;