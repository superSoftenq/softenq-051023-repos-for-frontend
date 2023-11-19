import { NavLink, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react"
import FileUploadForm from '../includes/fileUploadForm.jsx';
import PageNotFound from '../includes/pageNotFound.jsx'
import './userProfile.css'
import Logout from "../includes/logout.jsx";
import * as Cookie from "../includes/cookie.js"
import { verifyUser } from "../includes/verifyUser.js";
import Login from "../includes/login.jsx";
function UserProfile(props) {
    
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
    const renderForm = () => {
        return <FileUploadForm
            urlLeft = {'/api/user/'} 
            urlRight = {'/avatar'}
            userId = {user.id}/>
    }
    const [user, setUser] = useState([])
    const [statusCode, setStatusCode] = useState([])
    const [isAuthorized, setAuthorized] = useState([])

    const googleLink = "https://drive.google.com/u/0/uc?id=";
    const urlRight = "&export=download"
    const params = useParams();
    // const link = async () => fetch(`/api/user/${user.id}/avatar`)
    const link = googleLink + user.profilePicture + urlRight
    const id = params.userId
    let token = Cookie.getCookie("token")
    let userPage = 
    <div className="head"> 
        <div>
        { isAuthorized === true && renderLogout()}
        { isAuthorized === -1 && renderLogin()}
        </div>
        <p className="title">Вы запросили информацию о пользователе, вот его данные:</p>
        <div >
            {user.profilePicture !== undefined && renderScreen()}
        </div>
        <p className = "infoAboutUser">id: {user.id}</p>
        <p className = "infoAboutUser">username: {user.username}</p>
        <p className = "infoAboutUser">email: {user.email}</p>
        <div>
            {isAuthorized == true && renderForm()}
        </div>
    </div>
    let pageNotFound = <PageNotFound></PageNotFound>
    const getUserData = async () => {
        let response =  await fetch("/api/user/" + id)
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
  
  
  export default UserProfile