import './closeBtn.css'
import closeImg from '../../assets/close_cross.png'
function CloseBtn(props) {
    return (
         <div className="close_btn"><a onClick={async(event) => {
            window.location.assign(props.link);
          }}><img src={closeImg} className="close_btn_pic" alt="close picture" /></a>
          
          </div>
          
    )
}

export default CloseBtn