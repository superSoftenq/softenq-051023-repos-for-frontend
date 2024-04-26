import style from './commentItem.module.css'
import { useEffect, useState } from 'react'

const CommentItem = (props) => {

    const [userInfo, setUserInfo] = useState([])
    const [statusCode, setStatusCode] = useState([])
    const getUserInfo = () => {
      fetch("/api/user/" + props.avtorId)
      .then((response) => {
        setStatusCode(response.status)
        if (response.status == 200) {
        }

        return response.json();
      })
      .then(async (data) => {
        console.log('data users in COMMNET inTem = ', data)
        setUserInfo(data)
        // if (rs == -1) {
        //   setAuthorized(-1)
        // } else if (rs != data.id) {
        //   setAuthorized(false)
        // } else {
        //   setAuthorized(true)
        // }


      });
    }
    useEffect(() => {
      getUserInfo()
    }, []);

  

    

    return(
        <div className={style.mainContainerOfItem}>

            <div className={style.userAvatarContainer}>
                    <img src='https://avatars.mds.yandex.net/i?id=20978d9bcf9074e6f2f9f08b54cc45f489bce488-2816701-images-thumbs&n=13'/>
            </div>

            <div className={style.userInfoContainer}>
                <div className={style.userName}>
                        {userInfo.username}
                </div>

                <div className={style.commentContent}>
                        {props.text}
                </div>

                <div className={style.commentDownBar}>
                    15-17
                </div>

            </div>

        </div>
    )
} 

export default CommentItem;