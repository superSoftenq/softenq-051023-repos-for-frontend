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
                <input className = "form-field" name='username' type="text" placeholder='username' pattern="^[a-zA-Z][a-zA-Z0-9-_\.]{3,64}$"/>
                <input className = "form-field" name='email' type="text" placeholder='email' pattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$" />
                <input className = "form-field" name='password' type="text" placeholder='password' pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"/>
                <input type="submit" value = "Sign Up"/>
            </form>
        </div>
        
        <div id="message"></div>
        </>
    }
}