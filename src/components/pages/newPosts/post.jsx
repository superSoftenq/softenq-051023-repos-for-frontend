import HeaderPost from './headerPost';
import TextInPost from './textInPost';
import './post.css';
import DownBar from './downbar';
import React, { useEffect, useState } from 'react';
import { driveIdToLink } from '../../includes/googleLinks';
import { renderCommentOfPost } from '../userPageIncludes';
import FormAddNewComment from '../comment/formAddNewComment';

const Post = (props) => {
  /*
  background: -webkit-linear-gradient(45deg, rgb(153, 163, 160), rgb(147, 159, 159) 8%);
  background: -moz-linear-gradient(45deg, rgb(153, 163, 160), rgb(147, 159, 159) 8%);
  background: linear-gradient(45deg, rgb(153, 163, 160), rgb(147, 159, 159) 8%);
  
  
  */
  const [postPhoto, setPostPhoto] = useState([]);
  const [likes, setLikes] = useState([]);
  const [statusCode, setStatusCode] = useState([]);
  const [commetsArray, setCommentsArray] = useState([]);
  const [show_comments, setShowComments] = useState(true);
  const [commentsBar, setCommentsBar] = useState([]);

  let tmpDate = props.publicationDate;
  let localDate = new Date(tmpDate);
  let normDate = String(localDate.toUTCString());
  console.log('props.photoId', props.photoId);

  const getCommentForThisPost = () => {
    let tmpDateForGetAllComment = {
      isReply: false
    };
    fetch('/api/comment/' + props.postId + '/getall', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Устанавливаем заголовок Content-Type для указания типа данных
      },
      body: JSON.stringify(tmpDateForGetAllComment)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ошибка сети или сервера');
        }
        return response.json(); // Парсим ответ сервера в формате JSON
      })
      .then((data) => {
        console.log('получаю комменты к конкретному посту', data); //это почему-то выполняется бесконечное число раз
        setCommentsArray(data);
      })
      .catch((error) => {
        console.error(error); // Обрабатываем ошибки
      });
  };

  const getLikesPost = async () => {
    console.log('пытаюсь получит ЛАЙКИ');

    fetch('/api/post/' + props.postId + '/getlikes')
      .then((response) => {
        setStatusCode(response.status);
        if (response.status == 200) {
        }

        return response.json();
      })
      .then((data) => {
        console.log('data Likes = ', data);
        setLikes(data);
        if (rs == -1) {
          setAuthorized(-1);
        } else if (rs != data.id) {
          setAuthorized(false);
        } else {
          setAuthorized(true);
        }
      });
  };

  useEffect(() => {
    console.log('USE EFFECT 1');
    fetch('/api/post/' + props.postId + '/getlikes')
      .then((response) => {
        //setStatusCode(response.status)
        if (response.status == 200) {
        }

        return response.json();
      })
      .then((data) => {
        console.log('data Likes = ', data);
        setLikes(data);
        //тут была неработающая с rs проверка авторизации
      });
  }, []);

  useEffect(() => {
    console.log('USE EFFECT 2');
    getCommentForThisPost();
  }, []);

  useEffect(() => {
    setCommentsBar(renderCommentOfPost(commetsArray));
  }, [commetsArray]);

  useEffect(() => {
    console.log('USE EFFECT 3', props.photoId);
    fetch('/api/photo/' + props.photoId)
      .then((response) => {
        console.log('resp: ', response);
        // console.log('response.json(): ', response.json());
        // setPostPhoto(response.json());
        setStatusCode(response.status);
        // if (response.status == 200) {
        // }

        return response.json();
      })
      .then((data) => {
        console.log('photo in ONE post data = ', data);
        setPostPhoto(data);

        //тут была неработающая с rs проверка авторизации
      })
      .catch((err) => console.log('err: ', err));
  }, [props.photoId]);

  //console.log("такая ссылка должна получится = ", driveIdToLink(postPhoto.googleDriveId))
  console.log('PROPS in post jsx = ', props);
  let likess = likes.length;
  //const handleOnShow = () => setShowComments(!show_comments);
  //console.log("all likes in post = ", likess)
  const deletePost = () => {
    fetch(`/api/post/${props.postId}/delete`, {
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
  return (
    <div className="bigClassPosts">
      <div></div>

      <div className="Post">
        <div className="HeaderInPost">
          <HeaderPost avtorPosta={props.avtorPosta} timeByPost={normDate} />
        </div>

        <div className="TextInPost">
          <TextInPost message={props.message} />
        </div>

        <div>
          <img className="fhotoInPost" src={driveIdToLink(postPhoto.googleDriveId)} />
        </div>

        <div>
          <DownBar likecounter={likess} repostCounter={props.repostCounter} postId={props.postId} />
        </div>

        <div className="commentBar">
          <div>тут должны быть комменты</div>
          {props.postId}

          {commentsBar}
        </div>

        <div className="addCommentForm">
          <FormAddNewComment postId={props.postId} userAuthData={props.userAuthData} />
        </div>

        <div>
          <button onClick={() => deletePost()}> delete</button>
        </div>
      </div>
    </div>
  );
};

export default Post;
