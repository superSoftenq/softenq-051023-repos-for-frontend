import './headerLine.css'

const HeaderLine = (props) => {


    return(
        <div className="headerLineInFormAddPost">
            
            <div className="avatarUserFormAddPost">
            <img className='avatarIconFormAddPost' src='https://cdn-icons-png.flaticon.com/512/1077/1077114.png'/>
            </div>

            <div className="plateForText" >
                <textarea className='plateForTextTextArea'></textarea>
            </div>

        </div>
    )
}

export default HeaderLine;