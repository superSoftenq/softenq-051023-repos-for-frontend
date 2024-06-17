import './headerPost.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { helperDeleterPost } from '../userPageIncludes';
import Modal from '../modalPortal/Modal';
import React from 'react';

import { useState, useEffect } from 'react';
let newTextInPost = React.createRef();

const HeaderPost = (props) => {
  const [editingPost, setEditingPost] = useState([])
  const [statusEditPost, setstatusEditPost] = useState()
  const [openModal, setOpenModal] = useState(false);
  const [contentInModal, setcontentInModal] = useState()
  
  console.log('props in HEADER = ', props);
  
  const goUser = (userId) => {
    window.location.assign(`/user/${userId}`);
  };
  const options = [
    'Удалить', 'Редактировать', 'three'
  ];
  const defaultOption = options[0];
  
  

  const contentForEditPost_step1 = (postId) => {



    console.log('start edit post')
    fetch(`/api/post/${postId}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Ошибка сети или сервера');
    }
    return response.json(); // Парсим ответ сервера в формате JSON
  })
  .then((data) => {
    console.log('data about редактирование поста = ', data)
    setEditingPost(data)
    setstatusEditPost(!statusEditPost)
  })
  .catch((error) => {
    console.error(error); // Обрабатываем ошибки
  });
  
  }
  const saveChanges = () =>{

    let textPost = {

      photoId: editingPost.photoId,
      comment: 'hello',
      viewsDifference: 0,
      privacy: 0
    }
    
    textPost.comment = newTextInPost.current.value
    console.log(`text in POST =`, textPost)

    fetch(`/api/post/${editingPost.id}/edit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Устанавливаем заголовок Content-Type для указания типа данных
      },
      body: JSON.stringify(textPost)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ошибка сети или сервера');
        }
        return response.json(); // Парсим ответ сервера в формате JSON
      })
      .then((data) => {
        console.log(data); // Обрабатываем полученные данные
        setOpenModal(false)
        
      })
      .catch((error) => {
        console.error(error); // Обрабатываем ошибки
      });
    
    window.location.reload()

  }


  const contentForEditPost_step2 = () => {
    console.log(editingPost)
    setOpenModal(true)
    let content = <div>
      <textarea ref = {newTextInPost} defaultValue={editingPost.comment}></textarea>
      
      <div><button onClick={()=> saveChanges()}> Сохранить изменения</button></div>
      
    </div>
    setcontentInModal(content)
    

  }

  useEffect(()=> {
    contentForEditPost_step2()

  }, [statusEditPost])
  useEffect(()=> {
    setOpenModal(false)
  }, [])
  

  return (
    <div className="headerPost">
      <div className="avatarUser">
        <img onClick={() => goUser(props.avtorId)} className="avatarIcon" src={props.srccc} />
      </div>
      <div onClick={() => goUser(props.avtorId)} className="NameUser">
        {props.avtorPosta}
      </div>
      <div className="time">{props.timeByPost}</div>
      <div className="dotdotdot">
        {/* {<img
          className="moreIcon"
          onClick={()=> Menu()}
          src="https://cdn-icons-png.flaticon.com/512/149/149403.png"
        />} */}
        <Dropdown options={options} placeholder= "действия" 
        onChange={(item)=> {
            console.log('item = ', item.value)
            if (item.value == "Удалить") {
              helperDeleterPost(props.postId)
            }
            if (item.value == "Редактировать") {
              contentForEditPost_step1(props.postId)
            }
            

        }}/>
      </div>
      <Modal content={contentInModal} open={openModal} onClose={() => setOpenModal(false)} />
      
    </div>
  );
};

export default HeaderPost;
