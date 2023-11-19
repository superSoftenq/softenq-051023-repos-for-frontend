import { NavLink, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react"
import FileUploadForm from '../includes/fileUploadForm.jsx';
import PageNotFound from '../includes/pageNotFound.jsx'
import './userProfile.css'
import Logout from "../includes/logout.jsx";
import * as Cookie from "../includes/cookie.js"
import { verifyUser } from "../includes/verifyUser.js";
function UserProfile(props) {
    
    const renderScreen = () => (
        <img src = {link}  alt="" className = "photo"/>
    );
    const [user, setUser] = useState([])
    const [statusCode, setStatusCode] = useState([])
    const [isAuthorized, setAuthorized] = useState([])

    const googleLink = "https://drive.google.com/u/0/uc?id=";
    const urlRight = "&export=download"
    const params = useParams();
    // const link = async () => fetch(`/api/user/${user.id}/avatar`)
    console.log(user.profilePicture)
    const link = googleLink + user.profilePicture + urlRight
    console.log(link)
    const id = params.userId
    let token = Cookie.getCookie("token")
    let logout = <Logout></Logout>
    let userPage = 
    <div className="head"> 
        <p className="title">Вы запросили информацию о пользователе, вот его данные:</p>
        <div >
            {user.profilePicture !== undefined && renderScreen()}
        </div>
        <p className = "infoAboutUser">id: {user.id}</p>
        <p className = "infoAboutUser">username: {user.username}</p>
        <p className = "infoAboutUser">email: {user.email}</p>
        
    </div>
    let form = <FileUploadForm
    urlLeft = {'/api/user/'} 
    urlRight = {'/avatar'}
    userId = {user.id}/>
     let pageNotFound = <PageNotFound></PageNotFound>
    const getUserData = async () => {
        let response =  await fetch("/api/user/" + id)
        .then((response) => {
            console.log(response.status)
            setStatusCode(response.status)
            if (response.status == 200) {
            }
            return  response.json();
        })
        .then((data) => {
            setUser(data)
        });
        response = await verifyUser(token)
        if(response == user.id) {
            userPage = logout + userPage + form
        }   else {
            
        }
    }
    useEffect(() => {
        getUserData()
    }, [])
    return ((statusCode == 200)? userPage : pageNotFound)
  }
  
  
  export default UserProfile