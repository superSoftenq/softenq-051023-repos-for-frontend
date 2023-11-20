import "./login.css"
function Login(props) {
    return (
         <div><button className="login_btn" onClick={async(event) => {
            window.location.assign("/signin");
          }}>{props.buttonText}</button></div>
    )
}

export default Login