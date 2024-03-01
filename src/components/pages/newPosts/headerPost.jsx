
import './headerPost.css'
const HeaderPost= (props) => {

    let alarmFunc = () => {
        alert('hello')
    }

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
                <img className='moreIcon' onClick={alarmFunc} src='https://cdn-icons-png.flaticon.com/512/149/149403.png'/>
            </div>
        </div>
    )
}

export default HeaderPost;