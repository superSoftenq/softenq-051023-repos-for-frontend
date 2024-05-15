import { useState, useEffect } from 'react';
import { verifyUser } from '../../includes/verifyUser.js';
import * as Cookie from '../../includes/cookie.js';
import { renderMyGallery } from '../userPageIncludes.jsx';
import { renderAvatar } from '../userPageIncludes.jsx';
import style from './myProfile-v2.module.css';
import FileUploadForm from '../../includes/fileUploadForm.jsx';
import { renderRegularForm } from '../userPageIncludes.jsx';

const MyProfileV2 = (props) => {
  const googleLink = 'https://drive.google.com/thumbnail?id=';
  const urlRight = '&sz=w1000';
  const [id, setId] = useState([]);

  const [userFollowingList, setUserFollowingList] = useState([]);

  useEffect(() => {
    getId();
  }, []);

  useEffect(() => {
    if (id != 0) {
      getUserData();
      getUserFollowing();
    }
  }, [id]);

  let token = Cookie.getCookie('token');

  const getId = async () => {
    let _id = await verifyUser(token);
    setId(_id);
  };

  const [user, setUser] = useState([]);
  const [statusCode, setStatusCode] = useState([]);
  const [photos, setPhotos] = useState([]);

  const getUserData = () => {
    console.log('id = ', id);

    fetch('/api/user/' + id)
      .then((response) => {
        setStatusCode(response.status);
        if (response.status == 200) {
        }

        return response.json();
      })
      .then((data) => {
        console.log('user data = ', data);
        setUser(data);
      })
      .catch((error) => {
        console.error(error); // Обрабатываем ошибки
      });
    const objForGetPhoto = {
      flags: -1
    };
    fetch(`/api/user/${id}/photo/get`, {
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
  console.log('global user data = ', user);

  const getUserFollowing = () => {
    fetch('/api/relation/subscribe_count/' + id)
      .then((response) => {
        setStatusCode(response.status);
        if (response.status == 200) {
        }

        return response.json();
      })
      .then((data) => {
        console.log('user following list = ', data);
        setUserFollowingList(data);
      })
      .catch((error) => {
        console.error(error); // Обрабатываем ошибки
      });
  };

  const [modalActive, setModalActive] = useState(false);

  return (
    <div className={style.MyProfileV2PAge}>
      <div className={style.MainConteiner}>
        <div className={style.profilePicture}>
          {user.profilePicture !== undefined &&
            renderAvatar(googleLink + user.profilePicture + urlRight)}
        </div>

        <div className={style.infoAboutUser}>
          <div className={style.userName}> {user.username} </div>

          <div className={style.userId}> # {user.id} </div>

          <div className={style.userEmail}> {user.email} </div>

          <div className={style.countFollowing}> поклонники: {userFollowingList.length}</div>
        </div>
      </div>

      <div className={style.regFormPhoto}>{renderRegularForm(user)}</div>

      <div className={style.userGallery}>{photos.length != 0 && renderMyGallery(photos)}</div>
    </div>
  );
};

export default MyProfileV2;
