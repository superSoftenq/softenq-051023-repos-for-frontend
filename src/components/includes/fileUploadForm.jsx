import './fileUploadForm.css'

function FileUploadForm(props) {
    return (
    <>
    <div>
        {props.title}
        <form onSubmit={async (event) => {
            event.preventDefault();
            let formElem = document.querySelector('.' + props.formClassName)
            let result = document.getElementById("result_" + props.formClassName)
            let loader = document.getElementById("loader_" + props.formClassName)
            const loaderW = "50px"
            const loaderH = "50px"
        result.innerHTML = "Loading file"
        loader.classList.add("loader")
        loader.style
        console.log(props.urlLeft + props.userId + props.urlRight)
        let response = await fetch (props.urlLeft + props.userId + props.urlRight, {method: 'POST',
        body: new FormData(formElem)})
        console.log(response.body)
        loader.classList.remove("loader")
        if ( response.status == 200){
            result.innerHTML = "File sent"
        } else {
            result.innerHTML = "Error occured" 
        }
        if(props.refreshPage){
            window.location.assign(window.location.href);
        }
        }} action = "#" className = {props.formClassName}>
            <input type="file" multiple name = "files" required />
            <input type="submit" value="upload files"/>
        </form>
        <div className = "load_con">
            <div id={"loader_" + props.formClassName} ></div>
            <div id={"result_" + props.formClassName} className ="text"></div>
        </div>
        
        
    </div>
     </>
    )
}

export default FileUploadForm