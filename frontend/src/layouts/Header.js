import { Link } from "react-router-dom"
const Header = () => {
    return (
        <nav className="navbar bg-primary">
            <div className="container-fluid">
                <Link className="navbar-brand mb-0 h1 text-light" to={'../employee/list'}>Employee Manager</Link>
            </div>
        </nav>
    )
}

export default Header