import type {ReactNode} from "react";

type ColumnProps = {
    key: string;
    title: string;
    children: ReactNode;
};

function Column({key, title, children}: ColumnProps) {
    return (
        <div key={key} className="board-column">
            <h3 className="column-title">{title}</h3>
            <div className="column-body">{children}</div>
        </div>
    );
}

export default Column;