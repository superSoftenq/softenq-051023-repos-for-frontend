import './formForAddNewPost.css';
import HeaderLine from './headerLine';
import DownLine from './downLine';

const FormNewPost = (props) => {
  console.log('props FORMA = ', props);

  return (
    <div className="FormNewPost">
      <div className="headerLine">
        <HeaderLine userAva={props.userdata.profilePicture} refForTextArea={props.refForTextArea} />
      </div>

      <div>
        <DownLine funcForCreatePost={props.funcForCreatePost} userdata={props.userdata} />
      </div>
    </div>
  );
};

export default FormNewPost;
