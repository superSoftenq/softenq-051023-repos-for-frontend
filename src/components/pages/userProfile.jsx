import { NavLink, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react"
import FileUploadForm from '../includes/fileUploadForm.jsx';
import PageNotFound from '../includes/pageNotFound.jsx'
import './userProfile.css'

function UserProfile(props) {
    
    const renderScreen = () => (
        <img src = {link}  alt="" className = "photo"/>
    );
    const [user, setUser] = useState([])
    const [statusCode, setStatusCode] = useState([])
    const googleLink = "https://drive.google.com/u/0/uc?id=";
    const urlRight = "&export=download"
    const params = useParams();
    // const link = async () => fetch(`/api/user/${user.id}/avatar`)
    console.log(user.profilePicture)
    const link = googleLink + user.profilePicture + urlRight
    console.log(link)
    const id = params.userId
    let userPage = <div className="head"> 
    <p className="zagolovok">вы запросили информацию о пользователе, вот его данные:</p>
    <p className = "infoAboutUser">id: {user.id}</p>
    <p className = "infoAboutUser">username: {user.username}</p>
    <p className = "infoAboutUser">email: {user.email}</p>
    <div >
        {user.profilePicture !== undefined && renderScreen()}
    </div>
    <FileUploadForm
    urlLeft = {'/api/user/'} 
    urlRight = {'/avatar'}
    userId = {user.id}/>
    </div>
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
    }
    useEffect(() => {
        getUserData()
    }, [])
    return ((statusCode == 200)? userPage : pageNotFound)
  }
  
  
  export default UserProfile