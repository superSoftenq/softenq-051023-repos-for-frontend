import { NavLink, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react"
import PageNotFound from '../includes/pageNotFound.jsx'
import './userProfile.css'
import * as Cookie from "../includes/cookie.js"
import * as GoogleLinks from "../includes/googleLinks.js"
import { verifyUser } from "../includes/verifyUser.js";
import * as UserPageIncludes from "./userPageIncludes.jsx"
function UserProfile(props) {
    
    
    
    const [user, setUser] = useState([])
    const [statusCode, setStatusCode] = useState([])
    const [isAuthorized, setAuthorized] = useState([])
    const [photos, setPhotos] = useState([])
    
    const params = useParams();
    // const link = async () => fetch(`/api/user/${user.id}/avatar`)
    const link = GoogleLinks.driveIdToLink(user.profilePicture);
    const id = params.userId
    let token = Cookie.getCookie("token")
    let userPage = 
    <div className="head"> 
        <div>
        { isAuthorized !== -1  && UserPageIncludes.renderLogout()}
        { isAuthorized == -1 && UserPageIncludes.renderLogin()}
        </div>
        <p className="title">Вы запросили информацию о пользователе, вот его данные:</p>
        <div >
            {user.profilePicture !== undefined && UserPageIncludes.renderAvatar(link)}
        </div>
        <p className = "infoAboutUser">id: {user.id}</p>
        <p className = "infoAboutUser">username: {user.username}</p>
        <p className = "infoAboutUser">email: {user.email}</p>
        <div>
            {photos.length != 0 && UserPageIncludes.renderGallery(photos)}
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
            let photoLinks = await fetch("/api/user/" + id + "/photos")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                return data;
            })
            console.log(photoLinks)
            setPhotos(photoLinks)
            setUser(data)
            if (rs == -1) {
                setAuthorized(-1)
            } else if (rs != data.id) {
                setAuthorized(false)
            } else {
                setAuthorized(true)
                window.location.assign("/myprofile");
            }
        });
        
    }
    useEffect(() => {
        getUserData()
    }, [])
    return ((statusCode == 200)? userPage : pageNotFound)
  }
  
  
  export default UserProfile