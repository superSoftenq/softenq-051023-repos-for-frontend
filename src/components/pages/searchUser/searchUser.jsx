import style from './searchUser.module.css';
import React, { useEffect, useState } from 'react';
import { renderUserList } from '../userPageIncludes';
import { ItemUser } from './itemUser';

const SearchUser = (props) => {
  console.log('props in SerchUser Page = ', props);

  const [userList, setUserList] = useState([]);

  let textFindUser = React.createRef(); //шаг 1 сделали ссылку

  const findUser = (userName) => {
    let tempObj = {
      flags: 0 // пока что других нет

      //userName: textFindUser.current.value
    };

    tempObj.username = textFindUser.current.value;
    console.log('temp obj for fetch find userName = ', tempObj.username);
    fetch('/api/user/search', {
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
        console.log('полученные пользователь', data); // Обрабатываем полученные данные
        setUserList(data);
      })
      .catch((error) => {
        console.error(error); // Обрабатываем ошибки
      });
  };

  return (
    <div className={style.searchUserPage}>
      <div className={style.mainContent}>
        <div className={style.textArea}>
          <textarea onChange={findUser} ref={textFindUser}></textarea>
        </div>

        <div>
          <img
            onClick={findUser}
            className={style.logoSearch}
            src="https://w7.pngwing.com/pngs/111/369/png-transparent-computer-icons-web-search-engine-search-box-introduction-internet-microsoft-autocomplete.png"
          />
        </div>
      </div>
      <div>
        <h2>результаты поиска</h2>
      </div>
      <div className={style.containerUserList}>
        <div className={style.item}>
          <div className="item">{userList.length != 0 && renderUserList(userList)}</div>

          <div>
            <ItemUser />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchUser;
