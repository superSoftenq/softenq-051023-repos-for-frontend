import React, { useEffect, useMemo } from "react"
import { createPortal } from "react-dom"
import style from './Modal.module.css'


const modalRootElement = document.querySelector("#modal")
const Modal = (props) => {
    //console.log('props in modal window = ', props)

    
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
                
                   {props.funcForViewContent(props.photos, props.user)}
                </div>
            </div>, element)

    }
    return null;

}
export default Modal;