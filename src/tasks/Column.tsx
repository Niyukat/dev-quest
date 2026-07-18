import type {ReactNode} from "react";

type ColumnProps = {
    title: string;
    children: ReactNode;
};

function Column({title, children}: ColumnProps) {
    return (
        <div className="board-column">
            <h3 className="column-title">{title}</h3>
            <div className="column-body">{children}</div>
        </div>
    );
}

export default Column;