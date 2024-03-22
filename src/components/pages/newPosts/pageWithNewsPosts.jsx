import Post from "./post";
import './pageWithNewsPosts.css'
import { NavLink, json } from "react-router-dom";
import React, { useEffect, useState } from "react"
import { renderAllPost } from "../userPageIncludes";
import FormNewPost from "./formFormAddNewPost/formForAddNewPost";



let renderPost = (props) => {
console.log('props.message = ',props.message )
  return(
    <div>
      <Post message = {props.message}/>
    </div>
  )
}
let bigdata = {

}

let dataForGetPost = {
  startingPoint: 0,
  postsCount: 9999,

  flags: 0
}



let newElementPost = React.createRef();

let checkTempObj = () => {
  
}
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
let getPost = () => {
  let response = fetch('/api/feed', {
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
      console.log('RESPONSE DIMA FETCH POST', response);
      console.log('data = ', data); // Обрабатываем полученные данные
      bigdata = data 
      console.log('call func for render all post');
      
      renderAllPost(data)
      renderPost(data)
      console.log('data[0].comment = ',data[0].comment )
      return(
        <renderPost message={data[0].comment}/>
      )
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
        
        <div><button className="butForAddNewPost" > add new Post</button></div>
        <div><button className="butForViewAllPost">view all post</button></div>
      </div>
      <div>
      
        {console.log('bigdata = ',bigdata)}
        {postsArray.length != 0 && renderAllPost(postsArray)}
      </div>
      <div>
        <button onClick={createPost}>add new post</button>
        <textarea ref={newElementPost}></textarea>

        <FormNewPost refForTextArea={newElementPost} funcForCreatePost = {createPost}/>
      </div>
      

      {/*listPostsFromComp*/}

    </div>
  )
}

export default PageWithNewsPosts;