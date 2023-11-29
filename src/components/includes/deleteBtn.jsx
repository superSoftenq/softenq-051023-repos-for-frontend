import './deleteBtn.css'
function DeleteBtn(props) {
    return (
         <div><button className="delete_btn" onClick={async(event) => {
            await fetch(props.deleteRoute, {
                method: "DELETE",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "x-access-token": props.token
                }})
            .then(() =>{
                if(props.refreshPage){
                   window.location.assign(window.location.href);
                }
            })
           
          }}>{props.buttonText}</button></div>
    )
}

export default DeleteBtn