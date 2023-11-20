import * as Cookie from "../includes/cookie"
import "./logout.css"
function Logout(props) {
    return (
         <div><button className="logout_btn" onClick={async(event) => {
            Cookie.deleteCookie("token")
            window.location.assign(window.location.href);
          }}>{props.buttonText}</button></div>
    )
}

export default Logout