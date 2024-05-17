import './headerLine.css';
import { driveIdToLink } from '../../../includes/googleLinks';

const HeaderLine = (props) => {
  return (
    <div className="headerLineInFormAddPost">
      <div className="avatarUserFormAddPost">
        <img className="avatarIconFormAddPost" src={driveIdToLink(props.userAva)} />
      </div>

      <div className="plateForText">
        <textarea ref={props.refForTextArea} className="plateForTextTextArea"></textarea>
      </div>
    </div>
  );
};

export default HeaderLine;
