import EditableField from "./EditableField.tsx";

type EditableInputProps = {
    onSave: (value: string) => void;
    onCancel: () => void;
    defaultValue: string;
    name: string;
};

function EditableInput({onSave, onCancel, defaultValue, name}: EditableInputProps) {
    return (
        <EditableField onSubmit={(formData: FormData) => {
            const value = formData.get(name)

            if (typeof value === "string") {
                onSave(value);
            }
        }} onCancel={onCancel}>
            <input
                onBlur={(e) => {
                    const form = e.currentTarget.form;
                    const nextFocusedElement = e.relatedTarget;

                    if (form && nextFocusedElement instanceof Node && form.contains(nextFocusedElement)) {
                        return;
                    }

                    onSave(e.currentTarget.value);
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