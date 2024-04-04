import { useState, useEffect } from "react";
import { verifyUser } from "../../includes/verifyUser.js";
import * as Cookie from "../../includes/cookie.js"

const MyProfileV2 = (props) => {

    const [id, setId] = useState([])

    let token = Cookie.getCookie("token")

    const getId = async () => {
        let _id = await verifyUser(token)
        setId(_id)
    }


    const [user, setUser] = useState([])

    const getUserData = () => {
        console.log("id = ", id)
        
    }



    useEffect(() => {
        getId()
        getUserData() //эта функция при первой загрузке не выполняется

      }, []);
    return (
        <div>
            <div>{id}</div>
            hello this is page MyProfile version-2
        </div>
    )
}


export default MyProfileV2;