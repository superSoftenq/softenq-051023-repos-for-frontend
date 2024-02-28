
import './downBar.css'


const DownBar = (props) =>{
    return (
        <div className="downBar">
            
            <div>
            <img className="likesIcon" src="https://logowik.com/content/uploads/images/940_like_icon.jpg"/>
                {props.likecounter}
            </div>
        

            <div>
            <img className='repostIcon' src='https://w7.pngwing.com/pngs/956/289/png-transparent-brand-angle-technology-angle-cdr-angle-white.png'/>
            {props.repostCounter}
            </div>

        </div>
    )
}
export default DownBar;