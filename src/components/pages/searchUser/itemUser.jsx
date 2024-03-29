import style from "./itemUser.module.css"

export const ItemUser = () => {
    
    return(
        <div>
            THIS IS ITEM USER заглушка

            <div className= {style.profilePicture}>
                
            </div>
            <div className= {style.userName}>
                vanya Ivanov
            </div>

            <div className={style.userId}>
                id: 3
            </div>

            <div className={style.userEmail}>
                email: vanya@mail.ru
            </div>
        </div>
    )
}