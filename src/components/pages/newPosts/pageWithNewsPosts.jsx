import Post from "./post";
import './pageWithNewsPosts.css'
import { NavLink, json } from "react-router-dom";
import React from "react";
let bigdata = {

}

let dataForGetPost = {
  startingPoint: 0,
  postsCount: 9999,

  flags: 0
}

let dataForPost =
{
  ownerId: 568,
  photoId: 7799,
  comment:'hello this is my first post from dataBase'
}

let createPost = () => {
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
let getPost = () => {
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
      console.log('data = ', data); // Обрабатываем полученные данные
      bigdata = data 
      
    })
    .catch(error => {
      console.error(error); // Обрабатываем ошибки 
    });


}

const PageWithNewsPosts = (props) => {

  let listPostsFromComp = props.DateForPost.posts.map
    (p => <Post
      id={p.id}
      avtorPosta={p.avtorPosta}
      timeByPost={p.timeByPost}
      message={p.message}
      likecounter={p.likecounter}
      repostCounter={p.repostCounter} />)

  return (


    <div className="myPosts">
      <div >
        <NavLink className="butForHome" to='/myprofile'> My Profile</NavLink>
      </div>
      <div>
        <div><textarea ></textarea></div>
        <div><button onClick={createPost}> add new Post</button></div>
        <div><button>view all post</button></div>
      </div>
      <div>
      {getPost()}
        {console.log('bigdata = ',bigdata)}
      </div>

      {listPostsFromComp}

    </div>
  )
}

export default PageWithNewsPosts;