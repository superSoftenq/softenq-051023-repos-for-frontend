import style from './commentItem.module.css';
import { useEffect, useState } from 'react';
import { driveIdToLink } from '../../includes/googleLinks';

const CommentItem = (props) => {
  console.log('propc in comment = ', props);
  const [userInfo, setUserInfo] = useState([]);
  const [statusCode, setStatusCode] = useState([]);
  const getUserInfo = () => {
    fetch('/api/user/' + props.avtorId)
      .then((response) => {
        setStatusCode(response.status);
        if (response.status == 200) {
        }

        return response.json();
      })
      .then(async (data) => {
        console.log('data users in COMMNET inTem = ', data);
        setUserInfo(data);
        // if (rs == -1) {
        //   setAuthorized(-1)
        // } else if (rs != data.id) {
        //   setAuthorized(false)
        // } else {
        //   setAuthorized(true)
        // }
      });
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  const deleteThisComment = () => {
    fetch(`/api/comment/${props.commentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json' // Устанавливаем заголовок Content-Type для указания типа данных
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ошибка сети или сервера');
        }
        return response.json(); // Парсим ответ сервера в формате JSON
      })
      .then((data) => {
        console.log('data user-s photo', data); //это почему-то выполняется бесконечное число раз
        //можно обновить страницу и проверить удален ли коммент
      })
      .catch((error) => {
        console.error(error); // Обрабатываем ошибки
      });
  };

  const goUser = (userId) => {
    window.location.assign(`/user/${userId}`);
  };

  return (
    <div className={style.mainContainerOfItem}>
      <div className={style.userAvatarContainer}>
        <img onClick={() => goUser(userInfo.id)} src={driveIdToLink(userInfo.profilePicture)} />
      </div>

      <div className={style.userInfoContainer}>
        <div onClick={() => goUser(userInfo.id)} className={style.userName}>
          {userInfo.username}
        </div>

        <div className={style.commentContent}>{props.text}</div>

        <div className={style.commentDownBar}>15-17</div>
      </div>

      <div className={style.deleteBtnIcon}>
        <img
          onClick={() => deleteThisComment()}
          src="https://yandex-images.clstorage.net/ObK5K6080/92bf9187I/M37vkjE7x1WKyohIu56jFmmFd1b_i-inmOsqHqrAWkVhkRjCRNLSgPEUc3hNlhoFksQdZKC8m_JdFR3fxa-yrX82-p8AJsMg94OMPeu-rwJh8AJau_qAtuyCI2_GhHshdZEVZ-0SR0VdsK_M3H6nLMfwXTxRIYqvua211q3iNyCjAkOqkS_iweJ67WzHVsO62UifXrcaGAZw5wejPl0jvEw8HatFructCQh3xHjGN6gGHHUkiQiSFyml4V6JxkfIs45HVrlvOlHe_nmYn5K_Uh3Ed-Z3khxKQHdrv8rhD8i8UJ1PoaLX3Y1of4iQktOA5tx9MDXMTqPNiWk2jW5jeF8u2_JtR0495orJdJ_O1zolsCdS006MNqSHh6fW7QucBAhVVw12H3E1LNMgAN7XjH6A1fAF8KKHAS1NFjFCJ_gvOlumgTdCNaoCiUz7xitWuVRTav_eUEqAR5vfYlGnAGTkcd-lhutpxYDv5Ii-exzSwFWoNdhSI5GtIZ4pmjdIp5bj1r1X6sWqHmH8H84jEh3EC_ZP8mSmdPcvb8rBW1AQgBEfIb6HwbmAp-woBoMoFlyZLLE4rmORMbUSTQrvzPOKI_IJuy4FljLpzBOmu9axXH-ic1aUNsRro3vKoc-0pLwdcyVeV1HFqFNMIPKrgHKEncAZ-FIDASGpDj2Sx0Az8tsejZPOTToCocCXcjOqyWhf0rO6fJosJ_djYt0rhAxICc8tLpsJEQQ_APx-G4wizN3AaXQCr4VJIQbVDqe4i57T6tG_quEaOg0owy6fqvlg3zbL-hxG6CePO_oRd4wUmDmvVZLbxf1MQ9zwXkPkClRBZOFg1gsdNTFagbrn5B8G_1KZL4695sYh2Hcio2KZMHNaQ8bMXih7Y7_GAb-sFIC9B9XKS90FUK94SAK__E6siTghtJLjBVWpBjHi7yi7xm9W0dfucQJCWTiTJoui7XBXVu9m9MLcj6_bVkl8"
        />
      </div>
    </div>
  );
};

export default CommentItem;
