import './headerPost.css';
const HeaderPost = (props) => {
  console.log('props in HEADER = ', props);
  let alarmFunc = () => {
    alert('hello');
  };
  const goUser = (userId) => {
    window.location.assign(`/user/${userId}`);
  };

  return (
    <div className="headerPost">
      <div className="avatarUser">
        <img onClick={() => goUser(props.avtorId)} className="avatarIcon" src={props.srccc} />
      </div>
      <div onClick={() => goUser(props.avtorId)} className="NameUser">
        {props.avtorPosta}
      </div>
      <div className="time">{props.timeByPost}</div>
      <div className="dotdotdot">
        <img
          className="moreIcon"
          onClick={alarmFunc}
          src="https://cdn-icons-png.flaticon.com/512/149/149403.png"
        />
      </div>
    </div>
  );
};

export default HeaderPost;
