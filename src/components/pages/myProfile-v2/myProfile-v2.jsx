import { useState, useEffect } from "react";
import { verifyUser } from "../../includes/verifyUser.js";
import * as Cookie from "../../includes/cookie.js"
import { renderMyGallery } from "../userPageIncludes.jsx";
import { renderAvatar } from "../userPageIncludes.jsx";

const MyProfileV2 = (props) => {
    const googleLink = "https://drive.google.com/thumbnail?id="
    const urlRight = "&sz=w1000"

    const [id, setId] = useState([])

    useEffect(() => {
        getId()


    }, []);


    useEffect(() => {
        getUserData()
    }, [id])


    let token = Cookie.getCookie("token")

    const getId = async () => {
        let _id = await verifyUser(token)
        setId(_id)
    }


    const [user, setUser] = useState([])
    const [statusCode, setStatusCode] = useState([])
    const [photos, setPhotos] = useState([])

    const getUserData = () => {
        console.log("id = ", id)

        fetch("/api/user/" + id)
            .then((response) => {
                setStatusCode(response.status)
                if (response.status == 200) {
                }

                return response.json();
            })
            .then((data) => {
                console.log('user data = ', data)
                setUser(data)
                if (rs == -1) {
                    setAuthorized(-1)
                } else if (rs != data.id) {
                    setAuthorized(false)
                } else {
                    setAuthorized(true)
                }
            });
        const objForGetPhoto = {
            flags: -1
        }
        fetch('/api/user/'+ id + '/photos', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json' // Устанавливаем заголовок Content-Type для указания типа данных 
            },
            body: JSON.stringify(objForGetPhoto)
          }).then(response => {
            if (!response.ok) {
              throw new Error('Ошибка сети или сервера');
            }
            return response.json(); // Парсим ответ сервера в формате JSON 
          })
            .then(data => {
              console.log('data user-s photo', data); //это почему-то выполняется бесконечное число раз
              setPhotos(data)
            })
            .catch(error => {
              console.error(error); // Обрабатываем ошибки 
            });




    }
    console.log("global user data = ", user)




    return (
        <div>
            <div>{id}</div>
           <div>hello this is page MyProfile version-2</div>
            <div>{user.profilePicture !== undefined && renderAvatar(googleLink + user.profilePicture + urlRight)}</div>
            {photos.length != 0 && renderMyGallery(photos)}
        </div>
    )
}


export default MyProfileV2;