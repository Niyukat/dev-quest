import logo from "./assets/logo.png";

function Header() {
    return (
        <header>
            <img src={logo} className="logo" alt="logo" />
        </header>
    )
}

export default Header;