import {createPortal} from "react-dom";
import {type ReactNode, useEffect} from "react";
import {X} from "lucide-react";
import './Modal.css';

type ModalProps = {
    title: string | ReactNode,
    children: ReactNode,
    footer: ReactNode,
    onClose: () => void
}

function Modal({title, children, footer, onClose}: ModalProps) {
    const modal = document.getElementById("modal-container");

    useEffect(() => {
        document.body.style.overflow = "hidden";
        
        return () => {
            document.body.style.overflow = "";
        }
    }, []);

    if (!modal) {
        return null;
    }

    const modalContent = (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <div className="modal-title-container">
                        {typeof title === "string" ? <h3 className="modal-title">{title}</h3> : title}
                    </div>
                    <button onClick={() => onClose()} className="close-modal-btn"><X /></button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
                <div className="modal-footer">
                    {footer}
                </div>
            </div>
        </div>
    );

    return (
        createPortal(modalContent, modal)
    );
}

export default Modal;