import { useNavigate } from "react-router-dom"
import { useState } from "react";
import { NAV_LINKS } from "../utils/constants";

function Header() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <header>
            <div className="header-container">
                <div className="logo">
                    <img src="/images/image.png" alt="Banking App Logo" />
                    <h1>Banking App</h1>
                </div>

                <button
                    onClick={toggleMenu}
                    className="hamburger"
                    id="hamburger"
                    aria-label="Toggle navigation menu"
                    aria-expanded={isMenuOpen}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <nav className={isMenuOpen ? "active" : ""} id="nav-menu" role="navigation" aria-label="Main navigation">
                    <ul>
                        {NAV_LINKS.map(link => (
                            <li key={link.label}>
                                <a href={link.href} onClick={() => setIsMenuOpen(false)}>{link.label}</a>
                            </li>
                        ))}
                    </ul>

                    <div className="nav-buttons">
                        <button onClick={() => navigate('/login')} type="button" className="login-btn" id="login">Login</button>
                        <button onClick={() => navigate('/signup')} type="button" className="signup-btn" id="signup">Sign Up</button>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header