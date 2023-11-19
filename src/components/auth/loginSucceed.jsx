import './loginSucceed.css'
import React, { useEffect, useState } from "react"
import * as Cookie from "../includes/cookie"
import { verifyUser } from '../includes/verifyUser'
function LoginSucceed() {
    const [userId, setUserId] = useState([])
    let token =  Cookie.getCookie("token")
    const renderScreen = () => (
      <button className = "proceed_btn" onClick={async(event) => {
        window.location.assign("/user/" + userId);
      }}>Go to my page </button>
    );
    const getUserData = async () => {
      let response =  await verifyUser(token)
      setUserId(response)
  }
  useEffect(() => {
      getUserData()
  }, [])
    return (
      <>
        <div><h1>Logged in successfully</h1></div>
        <div>
        {userId !== undefined && renderScreen()}
        </div>
      </>
    )
  }
  export default LoginSucceed