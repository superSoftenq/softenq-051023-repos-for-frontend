import style from './commentItem.module.css'

const CommentItem = (props) => {


    return(
        <div className={style.mainContainerOfItem}>

            <div className={style.userAvatarContainer}>
                    <img src='https://avatars.mds.yandex.net/i?id=20978d9bcf9074e6f2f9f08b54cc45f489bce488-2816701-images-thumbs&n=13'/>
            </div>

            <div className={style.userInfoContainer}>
                <div className={style.userName}>
                        ivanov Ivan
                </div>

                <div className={style.commentContent}>
                        hello i from ital
                </div>

                <div className={style.commentDownBar}>
                    15-17
                </div>

            </div>

        </div>
    )
} 

export default CommentItem;