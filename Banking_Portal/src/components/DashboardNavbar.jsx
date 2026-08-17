import { useState, useRef } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { DASHBOARD_NAV_LINKS } from "../utils/constants";

function DashboardNavbar({ onClickTransaction }) {
    const { user, updateUser, logout } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const fileInputRef = useRef(null);
    const [profileImg, setProfileImg] = useState(user?.profileImage || "/images/default_user.png");

    const handleImageChange =(e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file size (max 1MB to prevent localStorage overflow)
        if (file.size > 1024 * 1024) {
            showToast('Image size must be less than 1MB', 'warning');
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            const newImage = reader.result;
            setProfileImg(newImage);

            updateUser({ ...user, profileImage: newImage });
            showToast('Profile image updated!', 'success');
        };
        reader.readAsDataURL(file);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    const handleAddTransaction = (e) => {
        e.preventDefault();
        setIsMenuOpen(false);
        onClickTransaction();
    };

    return (
        <header>
            <div className="header-contain">
                <div className="bname">
                    <h1>{user?.bank.toUpperCase() + " Portal" || "Banking Portal"}</h1>
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

                <nav className={isMenuOpen ? "active" : ""} id="nav-menu" role="navigation" aria-label="Dashboard navigation">
                    <div className="info">
                        <input
                            type="file"
                            id="imgInput"
                            accept="image/*"
                            hidden
                            ref={fileInputRef}
                            onChange={handleImageChange}
                        />
                        <img id="profileImg" src={profileImg} alt={`${user?.name || 'User'}'s profile`} />
                        <button
                            className="profile-img-btn"
                            onClick={() => fileInputRef.current.click()}
                            aria-label="Change profile picture"
                        >
                            <i className="fa-solid fa-circle-plus" style={{ color: "rgb(101, 174, 108)" }}></i>
                        </button>
                        <h3 id="name">{user?.name || ""}</h3>
                        <p id="email">{user?.email || ""}</p>
                    </div>

                    <ul>
                        {DASHBOARD_NAV_LINKS.map(link => (
                            <li key={link.label}>
                                <a href={link.href} onClick={() => setIsMenuOpen(false)}>
                                    <i className={`fa-solid ${link.icon}`} style={{ color: "white" }}></i>
                                    &nbsp;&nbsp;{link.label}
                                </a>
                            </li>
                        ))}
                        <li id="transBtn">
                            <button className="nav-link-btn" onClick={handleAddTransaction}>
                                <i className="fa-solid fa-circle-plus" style={{ color: "white" }}></i>
                                &nbsp;&nbsp;Add Transaction
                            </button>
                        </li>
                        <li>
                            <Link to='/profile'>
                                <i className="fa-solid fa-user-pen" style={{ color: "white" }}></i>
                                &nbsp;&nbsp;Profile
                            </Link>
                        </li>
                        <li id="logout" onClick={handleLogout}>
                            <Link to='/'>
                                <i className="fa-solid fa-right-from-bracket" style={{ color: "white" }}></i>
                                &nbsp;&nbsp;Logout
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default DashboardNavbar