import { NavLink } from "react-router-dom"
import "./universalButton.css"



export const UniversalButton = (props) => {

    return(
        <div>
            <div onClick={props.func}>
                <NavLink className="universalBtn" to = {props.toGoto}> {props.textInBtn} </NavLink>
            </div>
        </div>
    )
}