import * as Cookie from "../cookie"

export const logOutFunc = () => {
    console.log('типо функция для выхода')
    Cookie.deleteCookie("token")
    window.location.assign(window.location.href);
    
    
}