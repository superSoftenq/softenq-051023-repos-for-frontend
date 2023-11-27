import './signupBtn.css'
function SignupBtn(props) {
    return (
         <div><button className="signup_btn" onClick={async(event) => {
            window.location.assign("/signup");
          }}>{props.buttonText}</button></div>
    )
}

export default SignupBtn