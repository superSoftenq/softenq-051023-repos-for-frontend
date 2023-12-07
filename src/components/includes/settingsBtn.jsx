import './settingsBtn.css'
import settingsImg from '../../assets/settings.png'
function SettingsBtn(props) {
    return (
         <div className="settings_btn"><a onClick={async(event) => {
            window.location.assign("/settings");
          }}><img src={settingsImg} className="settings_btn_pic" alt="settings picture" /></a>
          
          </div>
          
    )
}

export default SettingsBtn