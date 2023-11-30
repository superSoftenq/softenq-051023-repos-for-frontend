import Login from "../includes/login.jsx";
import Logout from "../includes/logout.jsx";
import FileUploadForm from '../includes/fileUploadForm.jsx';
import DeleteBtn from "../includes/deleteBtn.jsx"
import *  as Cookie from "../includes/cookie.js"
import * as GoogleLinks from "../includes/googleLinks.js"
import './userPageIncludes.css'
export const renderAvatar = (link) => (
    <img src = {link}  alt="" className = "photo avatar"/>
);
export const renderLogout = () => {
   return <Logout
    buttonText = "Log out"
   />
};
export const renderLogin = () => {
    return <Login
        buttonText = "Sign in"
    />
 };
 export const renderMyGallery = (photoArray) => {
    let photoItems = photoArray.map((photo) => 
            <div className="photo_item">
                <div>
                <img src = {GoogleLinks.driveIdToLink(photo["link"])}  alt={photo["id"]} id = {"regular_photo_" + photo["id"]} className = "photo regular"/>
                </div>
                <div>
                    <DeleteBtn
                        buttonText = "Delete"
                        deleteRoute = {"/api/user/" + photo["userId"] + "/photos/" + photo["id"]}
                        refreshPage = {true}
                        token = {Cookie.getCookie("token")}
                    />
                </div>
            </div>
        
        
   )
    return (
        <>
            <div>Gallery</div>
            {photoItems}
        </>
    ) 
}
export const renderGallery = (photoArray) => {
    let photoItems = photoArray.map((photo) => 
        <div className="photo_item">
            <div>
            <img src = {GoogleLinks.driveIdToLink(photo["link"])}  alt={photo["id"]} id = {"regular_photo_" + photo["id"]} className = "photo regular"/>
            </div>
        </div>
        
   )
    return (
        <>
            <div>Gallery</div>
            {photoItems}
        </>
    ) 
}
export const renderAvatarForm = (user) => {
    return <FileUploadForm
        title = {<p>Загрузить аватар</p>}
        urlLeft = {'/api/user/'} 
        urlRight = {'/avatar'}
        userId = {user.id}
        formClassName = {'avatar_form'}
        refreshPage = {true}
        />
}
export const renderRegularForm = (user) => {
    return <FileUploadForm
        title = {<p>Загрузить фотографии</p>}
        urlLeft = {'/api/user/'} 
        urlRight = {'/photos'}
        userId = {user.id}
        formClassName = {'regular_form'}
        refreshPage = {true}
        />
}