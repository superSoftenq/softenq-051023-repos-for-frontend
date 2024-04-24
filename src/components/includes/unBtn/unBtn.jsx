import style from './unBtn.module.css'

export const UnBtn = (props) => {

    return(
        <div className={style.button}>
            <button onClick = {props.viewMiniGallery}> {props.text}</button>
        </div>
    )
}