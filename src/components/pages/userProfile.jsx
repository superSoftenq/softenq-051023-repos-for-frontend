import { NavLink, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react"
import FileUploadForm from '../includes/fileUploadForm.jsx';
import './userProfile.css'

function UserProfile(props) {
    const [user, setUser] = useState([])
    const googleLink = "https://drive.google.com/u/0/uc?id=";
    const urlRight = "&export=download"

    
    const params = useParams();
    // const link = async () => fetch(`/api/user/${user.id}/avatar`)
    console.log(user.profilePicture)
    const link = googleLink + user.profilePicture + urlRight
    console.log(link)
    const id = params.userId
    const getUserData = async () => {
        let response =  await fetch("/api/user/" + id)
        .then((response) => {
            return  response.json();
        })
        .then((data) => {
            setUser(data)
        });
    }
    useEffect(() => {
        getUserData()
    }, [])

    const renderScreen = () => (
        <img src = {link}  alt="" />
    );


    return (
        <div className="head"> 
           



        <p className="zagolovok">вы запросили информацию о пользователе, вот его данные:</p>
        <p className = "infoAboutUser">id: {user.id}</p>
        <p className = "infoAboutUser">username: {user.username}</p>
        <p className = "infoAboutUser">email: {user.email}</p>
        <div className = "photo">
            {user.profilePicture !== undefined && renderScreen()}
        </div>
        <FileUploadForm
        urlLeft = {'/api/user/'} 
        urlRight = {'/avatar'}
        userId = {user.id}/>
        </div>
         
    )
  }
  
  
  export default UserProfile