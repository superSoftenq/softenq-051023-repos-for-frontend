import React, { useEffect, useMemo } from "react"
import { createPortal } from "react-dom"
import style from './Modal.module.css'
import { renderMyGalleryForCreatePost } from "../newPosts/pageWithNewsPosts"

const modalRootElement = document.querySelector("#modal")
const Modal = (props) => {
    console.log('props = ', props)

    
    const open = props.open
    const onClose = props.onClose
    const element = useMemo(() => document.createElement("div"), []);



    useEffect(() => {
        if (open) {
            modalRootElement.appendChild(element);

            return () => {
                modalRootElement.removeChild(element)
            };
        }

    })

    if (open) {
        return createPortal(
            <div className={style.modal_background} onClick={onClose}>
                <div className={style.modal_card} onClick={(e) => e.stopPropagation()}>
                   <div>hello</div>
                   
                   {renderMyGalleryForCreatePost(props.photos, props.user)}
                   <div>hello</div>
                   <div>hello</div>
                   <div>hello</div>
                   <div>hello</div>

                </div>
            </div>, element)

    }
    return null;

}
export default Modal;