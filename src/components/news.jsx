import { NavLink } from "react-router-dom"

const News = (props) => {
    return (
        <div>
            <NavLink to = '/news' > {props.textLink} </NavLink>
        </div>
    )
}

export default News;