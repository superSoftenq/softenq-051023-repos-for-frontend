
import './downBar.css'
import React, { useEffect, useState } from "react"
import { verifyUser } from '../../includes/verifyUser'
import * as Cookie from "../../includes/cookie.js"
import Modal from '../modalPortal/Modal.jsx'



const DownBar = (props) => {

  const likesIcon = 'https://icons8.com/icon/24816/facebook-like'
  const [statusCode, setStatusCode] = useState([])
  const [user, setUser] = useState([])
  const [id, setId] = useState([])
  const [likes, setLikes] = useState([])
  const [open, setOpen] = useState(false);


  let token = Cookie.getCookie("token")
  const getId = async () => {
    let _id = await verifyUser(token)
    setId(_id)
  }
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
      .then((data) => {
        //console.log('data users = ', data)
        setUser(data)
        // if (rs == -1) {
        //   setAuthorized(-1)
        // } else if (rs != data.id) {
        //   setAuthorized(false)
        // } else {
        //   setAuthorized(true)
        // }
      });

  }

  useEffect(() => {
    getUserData()


  }, []);

  useEffect(()=>{
    getAllLikes()
  }, [user])



  //console.log('пропсы в нижней панели = ', props)
  const getAllLikes = () => {
    fetch("/api/post/" + props.postId + "/getlikes")
      .then((response) => {
        setStatusCode(response.status)
        if (response.status == 200) {
        }

        return response.json();
      })
      .then((data) => {
        //console.log('data Likes ПЕРВАЯ ЗАГРУЗКА = ', data)
        setLikes(data)
        
      });
  }
  
  const addLike = () => {


    let dataForAddLike = {
      actorId: user.id,

    }
    dataForAddLike.postId = props.postId;
    console.log('check user ID = ', user.id)
    console.log('check temp Obj = ', dataForAddLike)
    fetch('/api/like/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Устанавливаем заголовок Content-Type для указания типа данных 
      },
      body: JSON.stringify(dataForAddLike)
    }).then(response => {
      if (!response.ok) {
        throw new Error('Ошибка сети или сервера');
      }
      return response.json(); // Парсим ответ сервера в формате JSON 
    })
      .then(data => {
        getAllLikes()
        console.log("str mess after like submit", data); // Обрабатываем полученные данные
        

      })
      .catch(error => {
        console.error(error); // Обрабатываем ошибки 
      });

  }

  return (
    <div className="downBar">

      <div>
      {likes.length}
        <img className="likesIcon" src='https://icones.pro/wp-content/uploads/2021/04/icone-noire-noir.png'
          onClick={addLike} />
        
      </div>

      <div className='commentIcon'>
        
        <img  on onClick= {props.onShow} src='https://static-00.iconduck.com/assets.00/comment-icon-1024x964-julk98bl.png'/>
      </div>
      <div>
        <img className='repostIcon' src='https://static-00.iconduck.com/assets.00/send-icon-2048x1863-u8j8xnb6.png' />
        {props.repostCounter}
      </div>

      <Modal 
      open = {open}
      onClose = {()=> setOpen(false)}/>

    </div>
  )
  /*"https://logowik.com/content/uploads/images/940_like_icon.jpg" */
}
export default DownBar;