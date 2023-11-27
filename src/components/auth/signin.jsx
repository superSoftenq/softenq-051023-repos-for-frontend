import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
  } from "react-router-dom";
import * as Cookie from "../includes/cookie"
import SignupBtn from "../includes/signupbtn";
let count = 0;
const max_count = 3;
const cookieNameToken = "token"
const daysToExpire = 1
function SignIn() {
  return (
    <>
        <h3>signin</h3>
      <div className="form">
        <form onSubmit={async (event) => {
            event.preventDefault();
            if(count >= max_count){
                return;
            }
            let form = document.getElementById('signin');
            let dataJson = {
                username : form.querySelector('input[name="username"]').value,
                password : form.querySelector('input[name="password"]').value
            }
            console.log(dataJson);
            let response = await fetch("api/auth/signin", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataJson)
                })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    if(data.accessToken != null){
                        
                        Cookie.setCookie(cookieNameToken, data.accessToken, daysToExpire)
                        window.location.assign('/login_succeed');
                    }
                    else {
                        count++;
                        if(max_count - count > 0){
                            all.innerHTML = "Invalid password or username. Attempts remained: " + (max_count - count);
                        }
                        else{
                            all.innerHTML = "Too many unsuccessful attempts. Please try again later ";
                        }
                        
                    }
                });
        }} id = "signin" method = "POST">
            <input className = "form-field" name='username' type="text" placeholder='username'/>
            <input className = "form-field" name='password' type="password" placeholder='password'/>
            <input type="submit" value = "Login"/>
        </form>
        <SignupBtn
        buttonText = {"Sign up"}/>

        
      </div>
    <div  id="all">
    </div>
    <div id="user">

    </div>
    <div id="mod">

    </div>
    <div id="admin">

    </div>
    
    </>
  )
}

export default SignIn