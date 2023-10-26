import React, {Component} from "react";
import './signup.css'
export default class SignUp extends Component{
    constructor(){
        super();
    }

    render(){
        return <>
        <h3>signup</h3>
        <div className="form">
            <form onSubmit={async (event) => {
                event.preventDefault();
                let form = document.getElementById('signup');
                let dataJson = {
                    username : form.querySelector('input[name="username"]').value,
                    password : form.querySelector('input[name="password"]').value,
                    email : form.querySelector('input[name="email"]').value,
                    roles: ["user"]
                }
                console.log(dataJson);
                let response = await fetch("/api/auth/signup", {
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
                        console.log(data.message);
                        message.innerHTML = data.message;
                    });
            }} id = "signup">
                <input className = "form-field" name='username' type="text" placeholder='username' pattern="^[a-zA-Z][a-zA-Z0-9-_\]{3,64}$"/>
                <input className = "form-field" name='email' type="text" placeholder='email' pattern="^\S+@\S+$" />
                <input className = "form-field" name='password' type="password" placeholder='password' pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"/>
                <input type="submit" value = "Sign Up"/>
            </form>
            
        </div>
        
        <div id="message"></div>
        <form className = "stylesignin" action="/signin">
            <input type="submit" value = "Go to Login page"/>
        </form>
        </>
    }
}