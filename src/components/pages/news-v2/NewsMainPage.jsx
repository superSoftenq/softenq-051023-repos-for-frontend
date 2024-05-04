import './newsMainPage.css';
import React, { useEffect, useState } from 'react';
import { verifyUser } from '../../includes/verifyUser';
import * as Cookie from '../../includes/cookie.js';
import FormNewPost from '../newPosts/formFormAddNewPost/formForAddNewPost';
import { renderAllPost } from '../userPageIncludes.jsx';

const NewsMainPage = (props) => {
  const [user, setUser] = useState([]);
  const [id, setId] = useState(undefined);
  const [postsArray, setPostsArray] = useState([]);
  const [lentaPostov, setLentaPostov] = useState(undefined);

  useEffect(() => {
    getId();
  }, []);

  useEffect(() => {
    console.log('получаю данные пользователя использя ID = ', id);
    if (id != undefined) {
      getUserData(id);
    }
  }, [id]);

  useEffect(() => {
    getDataOfAllPost();
  }, [user]);

  const getUserData = (identificator) => {
    fetch('/api/user/' + identificator)
      .then((response) => {
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
  };
  const getId = async () => {
    try {
      let token = Cookie.getCookie('token');
      let _id = await verifyUser(token);
      console.log('test id =', _id);
      setId(_id);
    } catch (e) {
      console.log('error: '.e);
    }
  };

  const getDataOfAllPost = () => {
    let dataForGetPost = {
      startingPoint: 0,
      postsCount: 7,

      flags: 0
    };
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
        setPostsArray(data);
      })
      .catch((error) => {
        console.error(error); // Обрабатываем ошибки
      });

    //получаю комментарии ко всем постам
  };

  return (
    <div>
      {console.log('ОТРИСОВКА СТРАНИЦЫ')}
      тут должна быть форма постов
      <div className="myPosts">{renderAllPost(postsArray, user)}</div>
      <div></div>
    </div>
  );
};

export default NewsMainPage;
