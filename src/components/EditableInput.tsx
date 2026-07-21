import EditableField from "./EditableField.tsx";

type EditableInputProps = {
    onSave: (value: string) => boolean;
    onCancel: () => void;
    defaultValue: string;
    name: string;
    errors: string[];
};

function EditableInput({onSave, onCancel, defaultValue, name, errors}: EditableInputProps) {
    return (
        <EditableField onSave={onSave} onCancel={onCancel} name={name} errors={errors}>
            <input
                onBlur={(e) => {
                    const form = e.currentTarget.form;
                    const nextFocusedElement = e.relatedTarget;

                    if (form && nextFocusedElement instanceof Node && form.contains(nextFocusedElement)) {
                        return;
                    }

                    if (!onSave(e.currentTarget.value)) {
                        e.currentTarget.focus();
                    }
                }}
                name={name}
                autoFocus={true}
                className="editable-input"
                defaultValue={defaultValue}
            />
        </EditableField>
    )
}

export default EditableInput;