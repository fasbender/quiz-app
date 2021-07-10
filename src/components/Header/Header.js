import { Link } from "react-router-dom"
import "./header.css"

const Header = () => {
    return (
        <div className="header-container">
            <Link to="/" className="header">Welcome to the Quiz</Link>
        </div>
    )
}

export default Header
