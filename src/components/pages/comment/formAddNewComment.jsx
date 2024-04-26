
import style from "./formAddNewComment.module.css"
import React from "react";

const FormAddNewComment = (props) => {
    let textComment = React.createRef(); //шаг 1 сделали ссылку
    const addComment = () => {
        let tmpInfoForCreateComment = {
    
          actorId:props.userAuthData.id,
          topicId:props.postId,
          commentContent: "",
          isReply: false
        }
        tmpInfoForCreateComment.commentContent = textComment.current.value;
        console.log('ВРЕМЕННЫЙ ДЛЯ СОЗДАНИЯ КОММЕНТА ЧЕК = ', tmpInfoForCreateComment)
    
        fetch('/api/comment/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json' // Устанавливаем заголовок Content-Type для указания типа данных 
          },
          body: JSON.stringify(tmpInfoForCreateComment)
        }).then(response => {
          if (!response.ok) {
            throw new Error('Ошибка сети или сервера');
          }
          return response.json(); // Парсим ответ сервера в формате JSON 
        })
          .then(data => {
            console.log('ответ после добавление комментария = ', data); //это почему-то выполняется бесконечное число раз
            location.reload();
            
          })
          .catch(error => {
            console.error(error); // Обрабатываем ошибки 
          });
    
      }

    return(
        <div className={style.MainContainer}>
            <div className={style.userAvatar}>
                <img className = {style.userAvaImg} src= 'https://www.imagensempng.com.br/wp-content/uploads/2021/08/Icone-usuario-Png.png'/>
            </div>

            <div className={style.textAreaInput}>
                
                <input ref={textComment}></input>
            </div>

            <div className={style.sendButton}>
                <img className =  {style.sendButtonImg} 
                onClick={addComment}
                src="https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_send-1024.png"/>
            </div>



        </div>
    )
}

export default FormAddNewComment;