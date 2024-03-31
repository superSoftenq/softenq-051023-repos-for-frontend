import style from "./universalHeader.module.css"
import { UniversalButton } from "../universalButton/universalButton"
import { logOutFunc } from "../funcForLogOut/logout"
import SettingsBtn from "../settingsBtn"

export const UniversalHeader = (props) => {

    return (
        <div className={style.mainContent}>
            <div className={style.butForMyPage}>
                <UniversalButton toGoto="/myProfile" textInBtn="go to my page" />
            </div>

            <div className={style.butForNews}>
                <UniversalButton toGoto="/news" textInBtn="news" />
            </div>
           
            <div className={style.butForSearch}>
                <UniversalButton toGoto="/usersearch" textInBtn="search User" />
            </div>

            <div className={style.logOut}>
                <UniversalButton textInBtn = "logout" toGoto= "/myProfile" func = {logOutFunc}  />
            </div>

            <div className={style.SettingsBtn}>
                <UniversalButton toGoto = "/settings" textInBtn = "settings" /> 
            </div>
        </div>
    )
}