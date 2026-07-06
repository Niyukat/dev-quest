import logo from './assets/logo.png'
import './index.css'
import Board from "./Board.tsx";

function App() {
  return (
    <>
      <header>
        <img src={logo} className="logo" alt="logo" />
      </header>
      <section className="main">
        <Board />
      </section>
    </>
  )
}

export default App
