
import './headerPost.css'
const HeaderPost= (props) => {
    return (
        <div className='headerPost'>
            <div className="avatarUser">
            <img className='avatarIcon' src='https://cdn-icons-png.flaticon.com/512/1077/1077114.png'/>
            </div>
            <div className="NameUser">
                {props.avtorPosta}
            </div>
            <div className="time">
                {props.timeByPost}
            </div>
            <div className="dotdotdot">
                <button>  </button>
            </div>
        </div>
    )
}

export default HeaderPost;