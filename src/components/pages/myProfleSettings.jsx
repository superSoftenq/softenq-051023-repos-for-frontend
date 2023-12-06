import * as Cookie from "../includes/cookie.js"
import { verifyUser } from "../includes/verifyUser.js";
import { NavLink, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react"
import PageNotFound from '../includes/pageNotFound.jsx'
import * as UserPageIncludes from "./userPageIncludes.jsx"
import CloseBtn from "../includes/closeBtn.jsx"
function MyProfileSettings(props){
    const [id, setId] = useState([])
    let token = Cookie.getCookie("token")  
    const getId = async () => {
        let _id =  await verifyUser(token)
        setId(_id)
    }
    
    console.log(id)
    const [user, setUser] = useState([])
    const [statusCode, setStatusCode] = useState([])
    const [isAuthorized, setAuthorized] = useState([])
    const googleLink = "https://drive.google.com/u/0/uc?id=";
    const urlRight = "&export=download"
    const params = useParams();
    // const link = async () => fetch(`/api/user/${user.id}/avatar`)
    const link = googleLink + user.profilePicture + urlRight
    let settingsForm = 
    <form onSubmit={async (event) => {
        event.preventDefault();
    
        let form = document.getElementById('settings');
        let dataJson = {
            userId: user.id,
            username: form.querySelector('input[name="username"]').value,
            email: form.querySelector('input[name="email"]').value
        }
        console.log(dataJson);
        let response = await fetch("api/settings", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify(dataJson)
            })
            window.location.assign(window.location.href);
    }} id = "settings" method = "POST">
        <p>Изменить имя</p>
        <input className = "form-field" name='username' id='username_input' type="text" pattern="^[a-zA-Z][a-zA-Z0-9-_\]{3,64}$"/>
        <p>Изменить email</p>
        <input className = "form-field" name='email' id='email_input' type="text" />
        <input type="submit" value = "Сохранить изменения"/>
    </form>
    let settingsPage = 
    <div className="head"> 
        <p className="title">Настройки</p>
        <div>
            <CloseBtn
            link = "/myprofile"
            />
        </div>
        <p className = "infoAboutUser">id: {user.id}</p>
        {settingsForm}
        <div>
            {user.profilePicture !== undefined && UserPageIncludes.renderAvatar(link)}
        </div>
        <div>
            
            {isAuthorized == true && UserPageIncludes.renderAvatarForm(user)}
        </div>
    </div>
    
    let pageNotFound = <PageNotFound></PageNotFound>
    const getUserData = async () => {
        let _id =  await verifyUser(token)
        if(_id == -1) {
            window.location.assign("/signin");
        }
        let response =  await fetch("/api/user/" + _id)
        .then((response) => {
            setStatusCode(response.status)
            if (response.status == 200) {
            }
            return  response.json();
        })
        .then(async(data) => {
            let rs = await verifyUser(token)
            console.log(data.id == rs)
            console.log(rs)
            setUser(data)
            username_input.value = data.username;
            email_input.value = data.email;
            if (rs == -1) {
                setAuthorized(-1)
            } else if (rs != data.id) {
                setAuthorized(false)
            } else {
                setAuthorized(true)
            }
        });
        
    }
    useEffect(() => {
        getUserData()
    }, [])
        return ((statusCode == 200)? settingsPage : pageNotFound)
    
  }

export default MyProfileSettings