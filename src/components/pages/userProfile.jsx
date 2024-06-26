import { NavLink, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import PageNotFound from '../includes/pageNotFound.jsx';
import './userProfile.css';
import * as Cookie from '../includes/cookie.js';
import * as GoogleLinks from '../includes/googleLinks.js';
import { verifyUser } from '../includes/verifyUser.js';
import * as UserPageIncludes from './userPageIncludes.jsx';
import { UniversalButton } from '../includes/universalButton/universalButton.jsx';
import { UniversalHeader } from '../includes/universalHeader/universalHeader.jsx';

function UserProfile(props) {
  console.log('props in userProfile Page = ', props);
  const [authUserId, setAuthUserId] = useState();
  const [user, setUser] = useState([]);
  const [statusCode, setStatusCode] = useState([]);
  const [isAuthorized, setAuthorized] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [userFollowingList, setUserFollowingList] = useState([]);
  const [subs, setSubs] = useState(false);

  const params = useParams();
  // const link = async () => fetch(`/api/user/${user.id}/avatar`)
  const link = GoogleLinks.driveIdToLink(user.profilePicture);
  const id = params.userId;
  let token = Cookie.getCookie('token');

  const getId = async () => {
    let _id = await verifyUser(token);
    setAuthUserId(_id);
  };

  const subscribe = () => {
    console.log('старт запроса на подписку');
    if (authUserId != -1) {
      let tempObj = {
        targetId: user.id,
        actorId: authUserId
      };
      console.log(`пользователь авторизован т.к. id = ${authUserId}`);
      fetch('/api/relation/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // Устанавливаем заголовок Content-Type для указания типа данных
        },
        body: JSON.stringify(tempObj)
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Ошибка сети или сервера');
          }
          return response.json(); // Парсим ответ сервера в формате JSON
        })
        .then((data) => {
          console.log('ответ по Результату подписки = ', data); // Обрабатываем полученные данные
          setSubs(!subs);
        })
        .catch((error) => {
          console.error(error); // Обрабатываем ошибки
        });
    } else {
      console.log(`пользователь не авторизован т.к. id = ${authUserId}`);
    }
  };
  const getUserFollowing = () => {
    console.log('ID = , ', id);
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
  let userPage = (
    <div className="head">
      <div className="up_menu_container">
        <div className="up_menu">
          {/* isAuthorized !== -1  && UserPageIncludes.renderLogout()*/}
          {
            // isAuthorized !== -1  && UserPageIncludes.renderNews()
          }
          {isAuthorized == -1 && UserPageIncludes.renderLogin()}
        </div>
      </div>
      <div className="up_avatar_container">
        <div className="up_avatar">
          {user.profilePicture !== undefined && UserPageIncludes.renderAvatar(link)}
        </div>
        <div className="up_userinfo">
          <p className="infoAboutUser up_username">
            <h2>@{user.username}</h2>
          </p>
          <p className="infoAboutUser up_id">
            <h3>#{user.id}</h3>
            <h2>поклонники: {userFollowingList.length}</h2>
          </p>
        </div>
      </div>
      <div>
        <button onClick={() => subscribe()}>Подписаться</button>
      </div>
      <div>{photos.length != 0 && UserPageIncludes.renderGallery(photos)}</div>
    </div>
  );
  let pageNotFound = <PageNotFound></PageNotFound>;
  const getUserData = async () => {
    let response = await fetch('/api/user/' + id)
      .then((response) => {
        setStatusCode(response.status);
        if (response.status == 200) {
        }
        return response.json();
      })
      .then(async (data) => {
        // let rs = await verifyUser(token)
        // console.log(data.id == rs)
        // console.log(rs)
        // let photoLinks = await fetch("/api/user/" + id + "/photos")
        // .then((response) => {
        //     return response.json();
        // })
        // .then((data) => {
        //     return data;
        // })
        // console.log(photoLinks)
        // setPhotos(photoLinks)
        setUser(data);
        if (rs == -1) {
          setAuthorized(-1);
        } else if (rs != data.id) {
          setAuthorized(false);
        } else {
          setAuthorized(true);
          window.location.assign('/myprofile');
        }
      });
  };
  useEffect(() => {
    console.log('effect 1');
    getUserData();
    getId();
    getUserFollowing();
  }, []);
  useEffect(() => {
    console.log('effect 2');
    getUserFollowing();
  }, [subs]);
  return statusCode == 200 ? userPage : pageNotFound;
}

export default UserProfile;
