import * as Cookie from "../includes/cookie.js"
import { verifyUser } from "../includes/verifyUser.js";
import { NavLink, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react"
import PageNotFound from '../includes/pageNotFound.jsx'
import * as UserPageIncludes from "./userPageIncludes.jsx"
import SettingsBtn from "../includes/settingsBtn.jsx";
import './userProfile.css'
import { UniversalHeader } from "../includes/universalHeader/universalHeader.jsx";
import { UniversalButton } from "../includes/universalButton/universalButton.jsx";
import { logOutFunc } from "../includes/funcForLogOut/logout.jsx";

function MyProfile(props) {


    const [id, setId] = useState([])
    let token = Cookie.getCookie("token")
    const getId = async () => {
        let _id = await verifyUser(token)
        setId(_id)
    }
    console.log(id)
    const [user, setUser] = useState([])
    const [statusCode, setStatusCode] = useState([])
    const [isAuthorized, setAuthorized] = useState([])
    const [photos, setPhotos] = useState([])



    //const googleLink = "https://drive.google.com/u/0/uc?id=";
    const googleLink = "https://drive.google.com/thumbnail?id="

    //const urlRight = "&export=download"
    const urlRight = "&sz=w1000"
    const params = useParams();
    // const link = async () => fetch(`/api/user/${user.id}/avatar`)
    const link = googleLink + user.profilePicture + urlRight
    let userPage =
        <div className="head">

            <div className="up_menu_container">

                <div className="up_menu">
                    {isAuthorized !== -1 && UserPageIncludes.renderLogout()}

                    <UniversalHeader />
                    {isAuthorized == -1 && UserPageIncludes.renderLogin()}

                    {isAuthorized == true && <SettingsBtn />}

                </div>


            </div>
            <div className="up_avatar_container">
                <div className="up_avatar">
                    {user.profilePicture !== undefined && UserPageIncludes.renderAvatar(link)}
                </div>
                <div className="up_userinfo">
                    <p className="infoAboutUser up_username"><h2>@{user.username}</h2></p>
                    <p className="infoAboutUser up_id"><h3>#{user.id}</h3></p>
                </div>
            </div>
            <div>
                {isAuthorized == true && UserPageIncludes.renderRegularForm(user)}
            </div>
            <div>
                {console.log('id 59 line = ', id)}
                <UniversalButton textInBtn='My Posts' />
                <UniversalButton textInBtn='My Gallery' />

                {photos.length != 0 && UserPageIncludes.renderMyGallery(photos)}
            </div>

        </div>
    let pageNotFound = <PageNotFound></PageNotFound>
    const getUserData = async () => {
        let _id = await verifyUser(token)
        console.log("fdfd_" + id)
        if (_id == -1) {
            window.location.assign("/signin");
        }
        let response = await fetch("/api/user/" + _id)
            .then((response) => {
                setStatusCode(response.status)
                if (response.status == 200) {
                }

                return response.json();
            })
            .then(async (data) => {

                // let rs = await verifyUser(token)
                // console.log(data.id == rs)
                // console.log(rs)
                // let photoLinks = await fetch("/api/user/" + rs + "/photos")
                // .then((response) => {
                //     return response.json();
                // })
                // .then((data) => {
                //     return data;
                // })
                // console.log('тут должна быть ссылка photoLinks',photoLinks)
                // setPhotos(photoLinks)
                console.log('user INFO FROM PAGE MY-PROFILE = ', data)
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
    return (
        (statusCode == 200) ? userPage : pageNotFound
    )


}

export default MyProfile