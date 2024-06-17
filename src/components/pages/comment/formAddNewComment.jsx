import style from './formAddNewComment.module.css';
import React from 'react';
import { driveIdToLink } from '../../includes/googleLinks';

const FormAddNewComment = (props) => {
  console.log('form new post PROPS = ', props.userAuthData.profilePicture);
  let textComment = React.createRef(); //шаг 1 сделали ссылку
  const addComment = () => {
    let tmpInfoForCreateComment = {
      actorId: props.userAuthData.id,
      topicId: props.postId,
      commentContent: '',
      isReply: false
    };
    tmpInfoForCreateComment.commentContent = textComment.current.value;
    console.log('ВРЕМЕННЫЙ ДЛЯ СОЗДАНИЯ КОММЕНТА ЧЕК = ', tmpInfoForCreateComment);

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
      window.location.reload()
  };

  return (
    <div className={style.MainContainer}>
      <div className={style.userAvatar}>
        <img className={style.userAvaImg} src={driveIdToLink(props.userAuthData.profilePicture)} />
      </div>

      <div className={style.textAreaInput}>
        <input ref={textComment}></input>
      </div>

      <div className={style.sendButton}>
        <img
          className={style.sendButtonImg}
          onClick={addComment}
          src="https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_send-1024.png"
        />
      </div>
    </div>
  );
};

export default FormAddNewComment;
