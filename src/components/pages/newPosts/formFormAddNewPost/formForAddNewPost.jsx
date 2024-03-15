import './formForAddNewPost.css'
import HeaderLine from './headerLine';
import DownLine from './downLine';

const FormNewPost = (props) => {


    return(
        <div className='FormNewPost'>
            <div className='headerLine'>
                <HeaderLine />
            </div>

            <div>
                <DownLine />
            </div>
        </div>
    )
}

export default FormNewPost;