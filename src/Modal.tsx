import {createPortal} from "react-dom";
import {type ReactNode, useEffect} from "react";
import {X} from "lucide-react";

type ModalProps = {
    title: string,
    children: ReactNode,
    onClose: () => void
}

function Modal({title, children, onClose}: ModalProps) {
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
                    <h3 className="modal-title">{title}</h3>
                    <button onClick={() => onClose()} className="close-modal-btn"><X /></button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );

    return (
        createPortal(modalContent, modal)
    );
}

export default Modal;