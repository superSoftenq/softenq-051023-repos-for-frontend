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
        console.log(result)
        if ( response.status == 200){
            result.innerHTML = "File sent"
        } else {
            result.innerHTML = "Error occured"
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