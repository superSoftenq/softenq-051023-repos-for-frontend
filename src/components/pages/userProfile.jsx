import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react"
import './userProfile.css'

function UserProfile() {
    const [user, setUser] = useState([])



    
    const params = useParams();
    const id = params.userId
    const getUserData = () => {
        let response = fetch("/api/user/" + id)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            setUser(data)
        });
    }
    useEffect(() => {
        getUserData()
    }, [])

    x

    return (
        <div className="head"> 
           



        <p className="zagolovok">вы запросили информацию о пользователе, вот его данные:</p>
        <p className = "infoAboutUser">id: {user.id}</p>
        <p className = "infoAboutUser">username: {user.username}</p>
        <p className = "infoAboutUser">email: {user.email}</p>
        </div>
    )
  }
  
  
  export default UserProfile