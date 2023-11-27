import UserProfile from "./userProfile.jsx";
import * as Cookie from "../includes/cookie.js"
import { verifyUser } from "../includes/verifyUser.js";
import SignIn from "../auth/signin.jsx";
import { NavLink, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react"
import FileUploadForm from '../includes/fileUploadForm.jsx';
import PageNotFound from '../includes/pageNotFound.jsx'
import './userProfile.css'
import Logout from "../includes/logout.jsx";
import Login from "../includes/login.jsx";
function MyProfile(props){
    const renderScreen = () => (
        <img src = {link}  alt="" className = "photo"/>
    );
    const renderLogout = () => {
       return <Logout
        buttonText = "Log out"
       />
    };
    const renderLogin = () => {
        return <Login
            buttonText = "Sign in"
        />
     };
    const renderAvatarForm = () => {
        return <FileUploadForm
            title = {<p>Загрузить аватар</p>}
            urlLeft = {'/api/user/'} 
            urlRight = {'/avatar'}
            userId = {user.id}
            formClassName = {'avatar_form'}
            refreshPage = {true}
            />
    }
    const renderRegularForm = () => {
        return <FileUploadForm
            title = {<p>Загрузить фотографии</p>}
            urlLeft = {'/api/user/'} 
            urlRight = {'/photos'}
            userId = {user.id}
            formClassName = {'regular_form'}
            refreshPage = {false}
            />
    }
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
    let userPage = 
    <div className="head"> 
        <div>
        { isAuthorized !== -1  && renderLogout()}
        { isAuthorized == -1 && renderLogin()}
        </div>
        <p className="title">Вы зашли на свою страницу, ваши данные:</p>
        <div >
            {user.profilePicture !== undefined && renderScreen()}
        </div>
        <p className = "infoAboutUser">id: {user.id}</p>
        <p className = "infoAboutUser">username: {user.username}</p>
        <p className = "infoAboutUser">email: {user.email}</p>
        <div>
            
            {isAuthorized == true && renderAvatarForm()}
        </div>
        <div>
            
            {isAuthorized == true && renderRegularForm()}
        </div>
    </div>
    let pageNotFound = <PageNotFound></PageNotFound>
    const getUserData = async () => {
        let _id =  await verifyUser(token)
        console.log("fdfd_"+ id)
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
        return ((statusCode == 200)? userPage : pageNotFound)
    
  }

export default MyProfile