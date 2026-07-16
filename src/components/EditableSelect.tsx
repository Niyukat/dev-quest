import type {ReactNode} from "react";

type EditableSelectProps<T extends string> = {
    onSave: (value: T) => void;
    value: T;
    name: string;
    children: ReactNode;
}

function EditableSelect<T extends string>({onSave, value, name, children}: EditableSelectProps<T>) {
    return (
        <select
            onChange={(e)=> onSave(e.currentTarget.value as T)}
            name={name}
            value={value}
            className="task-status-select">
            {children}
        </select>
    );
}

export default EditableSelect;