function Board() {
    return (
        <div className="board">
            <div className="board-column">
                <h3 className="column-title">TODO</h3>
                <div className="column-body"></div>
            </div>
            <div className="board-column">
                <h3 className="column-title">BLOCKED</h3>
                <div className="column-body"></div>
            </div>
            <div className="board-column">
                <h3 className="column-title">IN PROGRESS</h3>
                <div className="column-body"></div>
            </div>
            <div className="board-column">
                <h3 className="column-title">IN TESTING</h3>
                <div className="column-body"></div>
            </div>
            <div className="board-column">
                <h3 className="column-title">CLOSED</h3>
                <div className="column-body"></div>
            </div>
        </div>
    );
}

export default Board;