import './index.css'
import Board from "./Board.tsx";
import Header from "./Header.tsx";

function App() {
  return (
    <>
      <Header />
      <section className="main">
        <Board />
      </section>
    </>
  )
}

export default App
