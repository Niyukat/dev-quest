import EditableField from "./EditableField.tsx";

type EditableTextProps = {
    onSave: (value: string) => void;
    onCancel: () => void;
    defaultValue: string;
    name: string;
};

function EditableText({onSave, onCancel, defaultValue, name}: EditableTextProps) {
    return (
        <EditableField onSubmit={(formData: FormData) => {
            const value = formData.get(name)

            if (typeof value === "string") {
                onSave(value);
            }
        }} onCancel={onCancel}>
            <textarea
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

export default EditableText;