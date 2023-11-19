function FileUploadForm(props) {
    return (
    <>
    <div>
        <form onSubmit={async (event) => {
            event.preventDefault();
            let formElem = document.querySelector('form')
            let result = document.getElementById("result")
        result.innerHTML = "Loading file"
        console.log(props.urlLeft + props.userId + props.urlRight)
        let response = await fetch (props.urlLeft + props.userId + props.urlRight, {method: 'POST',
        body: new FormData(formElem)})
        console.log(response.body)
        if ( response.status == 200){
            result.innerHTML = "File sent"
        } else {
            result.innerHTML = "Error occured" 
        }
        if(props.refreshPage){
            window.location.assign(window.location.href);
        }
        }} action = "#">
            <input type="file" multiple name = "files" required />
            <input type="submit" value="upload files"/>
        </form>
        <div id="result">.</div>
    </div>
     </>
    )
}

export default FileUploadForm