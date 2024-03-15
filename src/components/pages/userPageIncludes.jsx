import Login from "../includes/login.jsx";
import Logout from "../includes/logout.jsx";
import FileUploadForm from '../includes/fileUploadForm.jsx';
import DeleteBtn from "../includes/deleteBtn.jsx"
import *  as Cookie from "../includes/cookie.js"
import * as GoogleLinks from "../includes/googleLinks.js"
import './userPageIncludes.css'
import { NavLink } from "react-router-dom";
import Post from "./newPosts/post.jsx";

export const renderAvatar = (link) => (
    <img src={link} alt="" className="photo avatar" />
);
export const renderLogout = () => {
    return <Logout
        buttonText="Log out"
    />
};
export const renderLogin = () => {
    return <Login
        buttonText="Sign in"
    />
};
export const renderNews = (props) => {
    return (
        <div>
            <button onClick={async (event) => { window.location.assign("/news") }}>News</button>

        </div>
    )
}
export const renderMyGallery = (photoArray) => {
    
    let photoItems = photoArray.map((photo) =>
        <div className="photo_item">
            <div>
                {console.log('big links for check line 35', GoogleLinks.driveIdToLink(photo["link"]))}
                <img src={GoogleLinks.driveIdToLink(photo["link"])} alt={photo["id"]} id={"regular_photo_" + photo["id"]} className="photo regular" />
            </div>
            <div>
                <DeleteBtn
                    buttonText="Delete"
                    deleteRoute={"/api/user/" + photo["userId"] + "/photos/" + photo["id"]}
                    refreshPage={true}
                    token={Cookie.getCookie("token")}
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
                <img src={GoogleLinks.driveIdToLink(photo["link"])} alt={photo["id"]} id={"regular_photo_" + photo["id"]} className="photo regular" />
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
        title={<p>Загрузить аватар</p>}
        urlLeft={'/api/user/'}
        urlRight={'/avatar'}
        userId={user.id}
        formClassName={'avatar_form'}
        refreshPage={true}
    />
}
export const renderRegularForm = (user) => {
    return <FileUploadForm
        title={<p>Загрузить фотографии</p>}
        urlLeft={'/api/user/'}
        urlRight={'/photos'}
        userId={user.id}
        formClassName={'regular_form'}
        refreshPage={true}
    />
}

export const renderAllPost = (postArray) => {
    console.log('arrive data = ', postArray);
    let postItems = postArray.map((post) =>
        <div className="post_item">
            <div>
                <Post message = 'hello for test hard Code'/>

            </div>
            
        </div>


    )
    return (
        <>
            <div>Gallery</div>
            <div>
            <Post message = 'hello for test hard Code'/>
            {console.log('postItems = ', postItems)}
            {postItems}
    
            </div>
            
            
        </>
    )
}