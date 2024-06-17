import style from './universalHeader.module.css';
import { UniversalButton } from '../universalButton/universalButton';
import { logOutFunc } from '../funcForLogOut/logout';
import SettingsBtn from '../settingsBtn';
import Logout from '../logout';

export const UniversalHeader = (props) => {
  return (
    <div>
      <div className={style.mainContent}>
      <div className={style.butForMyPage}>
        <UniversalButton toGoto="/myProfile-v2" textInBtn="Моя страница" />
      </div>

      <div className={style.butForNews}>
        <UniversalButton toGoto="/news" textInBtn="Новости" />
      </div>

      <div className={style.butForSearch}>
        <UniversalButton toGoto="/usersearch" textInBtn="Поиск пользователей" />
      </div>

      { /*
        <div className={style.logOut}>
        <UniversalButton textInBtn="logout" toGoto="/myProfile" func={logOutFunc} />
      </div> */
      }

      <div className={style.SettingsBtn}>
        <UniversalButton className= {style.logOutLink} toGoto="/settings" textInBtn="Настройки" />
      </div>

      <div className={style.signUpV2}>
        <UniversalButton toGoto="/signup-v2" textInBtn="signUp-v2" />
        
      </div>
      <div className={style.logOut}>
        <Logout buttonText = 'Выйти'/>
      </div>

    </div>
    
      

    </div>
  );
};
