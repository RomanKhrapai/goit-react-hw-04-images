import React,{Component} from "react";
import { createPortal } from "react-dom";

import { Overlay } from "./Overlay.styles";
import { ModalWindow } from "./ModalWindow.styles";

const modalRoot = document.querySelector('#modal-root')

class Modal extends Component{

    componentDidMount(){
window.addEventListener('keydown', this.hendeleKeyDoun )
    }

    componentWillUnmount(){
window.removeEventListener('keydown',this.hendeleKeyDoun)
    }

hendeleKeyDoun = e=>{
    if(e.code==='Escape'){
        this.props.onClose();
    }
}

hendleBackDropClick = e=>{
    if(e.currentTarget===e.target){
        this.props.onClose();
    }
}

    render(){
        return createPortal(
            <Overlay onClick={this.hendleBackDropClick}>
                <ModalWindow> {this.props.children} </ModalWindow>
            </Overlay>,modalRoot
        )
    }
}

export default Modal;