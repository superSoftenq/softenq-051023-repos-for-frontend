import './pageWithNewsPosts.css';
import React, { useEffect, useState } from 'react';
import { renderAllPost } from '../userPageIncludes';
import FormNewPost from './formFormAddNewPost/formForAddNewPost';
import { verifyUser } from '../../includes/verifyUser.js';
import * as Cookie from '../../includes/cookie.js';
import { UnBtn } from '../../includes/unBtn/unBtn.jsx';
import Modal from '../modalPortal/Modal.jsx';
import { driveIdToLink } from '../../includes/googleLinks.js';

import DeleteBtn from '../../includes/deleteBtn.jsx';
let dataForGetPost = {
  startingPoint: 0,
  postsCount: 7,

  flags: 0
};

let newElementPost = React.createRef();

const PageWithNewsPosts = (props) => {
  let createPost = (photoId, user) => {
    let dataForPost = {
      ownerId: user.id,
      photoId: photoId
    };

    dataForPost.comment = newElementPost.current.value;
    console.log('check temp Obj = ', dataForPost);
    fetch('/api/post/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Устанавливаем заголовок Content-Type для указания типа данных
      },
      body: JSON.stringify(dataForPost)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ошибка сети или сервера');
        }
        return response.json(); // Парсим ответ сервера в формате JSON
      })
      .then((data) => {
        console.log(data); // Обрабатываем полученные данные
        getDataOfAllPost();
        setOpen(false);
      })
      .catch((error) => {
        console.error(error); // Обрабатываем ошибки
      });
    console.log('обновляю информацию о постах 1 РАЗ');

    //window.location.reload()
  };
  const [postsArray, setPosts] = useState([]);

  const [id, setId] = useState([]);

  let token = Cookie.getCookie('token');
  const getId = async () => {
    let _id = await verifyUser(token);
    setId(_id);
  };
  console.log('id == ', id);

  const [statusCode, setStatusCode] = useState([]);

  const [user, setUser] = useState([]);

  const [photos, setPhotos] = useState([]);

  const getUserData = async () => {
    let _id = await verifyUser(token);
    console.log('fdfd_' + id);
    if (_id == -1) {
      window.location.assign('/signin');
    }
    //пытаюсь получить данные пользователя 1 РАЗ
    console.log('пытаюсь получить данные пользователя 1 раз');
    fetch('/api/user/' + _id)
      .then((response) => {
        setStatusCode(response.status);
        if (response.status == 200) {
        }

        return response.json();
      })
      .then(async (data) => {
        console.log('data users = ', data);
        setUser(data);
        // if (rs == -1) {
        //   setAuthorized(-1)
        // } else if (rs != data.id) {
        //   setAuthorized(false)
        // } else {
        //   setAuthorized(true)
        // }
      });

    const objForGetPhoto = {
      flags: -1
    };
    fetch(`/api/user/${_id}/photo/get`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Устанавливаем заголовок Content-Type для указания типа данных
      },
      body: JSON.stringify(objForGetPhoto)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ошибка сети или сервера');
        }
        return response.json(); // Парсим ответ сервера в формате JSON
      })
      .then((data) => {
        console.log('data user-s photo', data); //это почему-то выполняется бесконечное число раз
        setPhotos(data);
      })
      .catch((error) => {
        console.error(error); // Обрабатываем ошибки
      });
  };

  const getDataOfAllPost = () => {
    console.log('ЗАПРОС НА ПОЛУЧЕНИЕ ВСЕХ ПОСТОВ');
    fetch('/api/feed', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Устанавливаем заголовок Content-Type для указания типа данных
      },
      body: JSON.stringify(dataForGetPost)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ошибка сети или сервера');
        }
        return response.json(); // Парсим ответ сервера в формате JSON
      })
      .then((data) => {
        console.log('DATA OF POSTS', data); //это почему-то выполняется бесконечное число раз
        setPosts(data);
      })
      .catch((error) => {
        console.error(error); // Обрабатываем ошибки
      });

    //получаю комментарии ко всем постам
  };

  useEffect(() => {
    console.log('PWNP USE EFFECT 1');
    getUserData();
  }, []);

  useEffect(() => {
    if (user != 0) {
      console.log('PWNP USE EFFECT 2');
      getDataOfAllPost();
    }
  }, [user]);

  const addComment = () => {
    let tmpInfoForCreateComment = {
      actorId: 7,
      topicId: 17,
      commentContent: 'hello my comment 2',
      isReply: false
    };

    fetch('/api/comment/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Устанавливаем заголовок Content-Type для указания типа данных
      },
      body: JSON.stringify(tmpInfoForCreateComment)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ошибка сети или сервера');
        }
        return response.json(); // Парсим ответ сервера в формате JSON
      })
      .then((data) => {
        console.log('ответ после добавление комментария = ', data); //это почему-то выполняется бесконечное число раз
      })
      .catch((error) => {
        console.error(error); // Обрабатываем ошибки
      });
  };

  const [open, setOpen] = useState(false);

  const [modalWindowContent, setModalWindowContent] = useState([]);
  const miniGalleryForModalWindowContent = (photoArray, user) => {
    console.log('arrive data mini gallary = ', photoArray);
    setOpen(true);

    let photoItems = photoArray.map((photo) => (
      <div className="photo_item">
        <div>
          {console.log('big links for check line 35', driveIdToLink(photo['link']))}
          <img
            src={driveIdToLink(photo['link'])}
            alt={photo['id']}
            id={'regular_photo_' + photo['id']}
            className="photo regular"
            onClick={() => createPost(photo['id'], user)}
          />
        </div>
        <div>
          <DeleteBtn
            buttonText="Delete"
            deleteRoute={'/api/user/' + photo['userId'] + '/photos/' + photo['id']}
            refreshPage={true}
            token={Cookie.getCookie('token')}
          />
        </div>
      </div>
    ));
    setModalWindowContent(photoItems);
  };

  return (
    <div>
      {console.log('отрисовка верстки страницы')}
      <div>
        {
          // тут была кнопка с получением данных
        }
        {console.log('user id from return == ', user.id) /*работает */}
      </div>

      <div className="formAddNewPost">
        <FormNewPost
          refForTextArea={newElementPost}
          funcForCreatePost={() => createPost(user)}
          userdata={user}
        />
      </div>

      <div>
        <UnBtn
          viewContent={() => miniGalleryForModalWindowContent(photos, user)}
          text="показать галерею"
        />
        <button onClick={addComment}>костыль add comment 2</button>
      </div>

      <div>
        <div className="myPosts">
          {console.log('вызов функции отрисовки ПОСТОВ')}
          {postsArray.length != 0 && renderAllPost(postsArray, user)}
          {/*console.log("страница новостей знает твою галерею = ", photos)*/}
        </div>
      </div>
      <Modal content={modalWindowContent} open={open} onClose={() => setOpen(false)} />
      <div></div>
    </div>
  );
};

export default PageWithNewsPosts;
