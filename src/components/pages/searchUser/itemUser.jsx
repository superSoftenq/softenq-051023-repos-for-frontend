import { UniversalButton } from "../../includes/universalButton/universalButton"
import style from "./itemUser.module.css"
import { driveIdToLink } from "../../includes/googleLinks"

export const ItemUser = (props) => {

    let linkOnAvatar = driveIdToLink(props.profilePicture)

    return (
        <div className={style.mainContent}>
           

            <div className={style.profilePicture}>
                <img src={linkOnAvatar}/>
                
            </div>
            <div className={style.infoAboutUser} >
                <div>
                    <UniversalButton textInBtn = 'перейти' toGoto = {'/user/' + props.userId}/>
                </div>

                <div className={style.userName}>
                    {props.userName}
                </div>

                <div className={style.userId}>
                    ID: {props.userId}
                </div>

                <div className={style.userEmail}>
                    {props.userEmail}
                </div>
            </div>

        </div>
    )
}