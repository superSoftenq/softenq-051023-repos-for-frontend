
import './downBar.css'


const DownBar = (props) =>{
    const likesIcon = 'https://icons8.com/icon/24816/facebook-like'
    
    return (
        <div className="downBar">
            
            <div>
            <img className="likesIcon" src= 'https://icones.pro/wp-content/uploads/2021/04/icone-noire-noir.png' />
                {props.likecounter}
            </div>
        

            <div>
            <img className='repostIcon' src='https://static-00.iconduck.com/assets.00/send-icon-2048x1863-u8j8xnb6.png'/>
            {props.repostCounter}
            </div>

        </div>
    )
/*"https://logowik.com/content/uploads/images/940_like_icon.jpg" */
}
export default DownBar;