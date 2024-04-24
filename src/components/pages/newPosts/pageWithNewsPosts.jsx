import Post from "./post";
import './pageWithNewsPosts.css'
import { NavLink, json } from "react-router-dom";
import React, { useEffect, useState } from "react"
import { renderAllPost } from "../userPageIncludes";
import FormNewPost from "./formFormAddNewPost/formForAddNewPost";
import { verifyUser } from "../../includes/verifyUser.js";
import * as Cookie from "../../includes/cookie.js"
import { UniversalButton } from "../../includes/universalButton/universalButton.jsx";
import { UniversalHeader } from "../../includes/universalHeader/universalHeader.jsx";
import { UnBtn } from "../../includes/unBtn/unBtn.jsx";


let dataForGetPost = {
  startingPoint: 0,
  postsCount: 9999,

  flags: 0
}

let newElementPost = React.createRef();



const PageWithNewsPosts = (props) => {


  const [id, setId] = useState([])

  let token = Cookie.getCookie("token")
  const getId = async () => {
    let _id = await verifyUser(token)
    setId(_id)
  }
  console.log('id == ', id)

  const [postsArray, setPosts] = useState([])

  const [statusCode, setStatusCode] = useState([])

  const [user, setUser] = useState([])

  const [photos, setPhotos] = useState([])

  const getUserData = async () => {
    let _id = await verifyUser(token)
    console.log("fdfd_" + id)
    if (_id == -1) {
      window.location.assign("/signin");
    }
    fetch("/api/user/" + _id)
      .then((response) => {
        setStatusCode(response.status)
        if (response.status == 200) {
        }

        return response.json();
      })
      .then(async (data) => {
        console.log('data users = ', data)
        setUser(data)
        if (rs == -1) {
          setAuthorized(-1)
        } else if (rs != data.id) {
          setAuthorized(false)
        } else {
          setAuthorized(true)
        }


      });
      const objForGetPhoto = {
        flags: -1
    }
    fetch(`/api/user/${_id}/photo/get`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Устанавливаем заголовок Content-Type для указания типа данных 
      },
      body: JSON.stringify(objForGetPhoto)
    }).then(response => {
      if (!response.ok) {
        throw new Error('Ошибка сети или сервера');
      }
      return response.json(); // Парсим ответ сервера в формате JSON 
    })
      .then(data => {
        console.log('data user-s photo', data); //это почему-то выполняется бесконечное число раз
        setPhotos(data)
      })
      .catch(error => {
        console.error(error); // Обрабатываем ошибки 
      });

  }

  const getDataOfAllPost = () => {
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
        console.log('PUPER DATA', data); //это почему-то выполняется бесконечное число раз
        setPosts(data)
      })
      .catch(error => {
        console.error(error); // Обрабатываем ошибки 
      });


  }


  useEffect(() => {
    getUserData()
  }, []);

  useEffect(() => {
    if (user != 0) {
      getDataOfAllPost()
    }

  }, [user]);



  let createPost = () => {


    let dataForPost = {
      ownerId: user.id,
      photoId: 4
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





  return (


    <div>


      <div>
        {
          // тут была кнопка с получением данных 
        }
        {console.log('user id from return == ', user.id)/*работает */}
      </div>

      <div className="formAddNewPost">
        <FormNewPost refForTextArea={newElementPost} funcForCreatePost={createPost} userdata={user} />
      </div>

      <div>
        <UnBtn text="показать галерею" />
      </div>

      <div>
        <div className="myPosts">


          {postsArray.length != 0 && renderAllPost(postsArray)}
          {console.log("страница новостей знает твою галерею = ", photos)}
        </div>
      </div>

    </div>
  )
}

export default PageWithNewsPosts;