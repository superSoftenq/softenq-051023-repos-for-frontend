
import './textInPost.css'

const TextInPost = (props) => {
    return (
        <div className="textInPost">
        <div>
            {props.message}
        </div>
        </div>
    )
}

export default TextInPost;