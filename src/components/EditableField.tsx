import {Check, X} from "lucide-react";
import type {ReactNode} from "react";
import './editable.css';
import InputError from "./InputError.tsx";

type EditableFieldProps = {
    onSave: (value: string) => boolean;
    onCancel: () => void;
    children: ReactNode;
    name: string;
    errors: string[];
};

function EditableField({onSave, onCancel, children, name, errors}: EditableFieldProps) {
    return (
        <form onSubmit={(e) => {
            e.preventDefault();

            const form = e.currentTarget;
            const formData = new FormData(form);
            const value = formData.get(name)

            if (typeof value === "string" && !onSave(value)) {
                const field = form.elements.namedItem(name);

                if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
                    field.focus();
                }
            }
        }} className="editable-field-container">
            <div className="input-group">
                {children}
                <InputError errors={errors} />
            </div>
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