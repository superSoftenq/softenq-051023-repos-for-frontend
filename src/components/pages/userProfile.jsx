import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react"


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
    return (
        <>
            <div><h1>username:</h1>{user.username}</div>
            <div><h1>email:</h1>{user.email}</div>
        </>
        
    )
  }
  export default UserProfile