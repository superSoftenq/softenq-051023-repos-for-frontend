import style from './unBtn.module.css'

export const UnBtn = (props) => {

    return(
        <div className={style.button}>
            <button onClick = {props.viewContent}> {props.text}</button>
        </div>
    )
}