import {Check, X} from "lucide-react";
import type {ReactNode} from "react";
import './editable.css';

type EditableFieldProps = {
    onSubmit: (formData: FormData) => void;
    onCancel: () => void;
    children: ReactNode;
};

function EditableField({onSubmit, onCancel, children}: EditableFieldProps) {
    return (
        <form action={onSubmit} className="editable-field-container">
            {children}
            <div className="editable-field-actions">
                <button
                    type="submit"
                    className="edit-confirm-btn">
                    <Check size={18}/>
                </button>
                <button
                    onClick={onCancel}
                    type="button"
                    className="edit-cancel-btn">
                    <X size={18} />
                </button>
            </div>
        </form>
    )
}

export default EditableField;