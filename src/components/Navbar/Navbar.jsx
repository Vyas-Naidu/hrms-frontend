import "./Navbar.css";
import {
  FaBars,
  FaBell,
  FaEnvelope,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";

function Navbar({ title, user, onMenuClick }) {
  return (
    <nav className="navbar">

      {/* Left */}

      <div className="navbar-left">

        <button className="menu-btn" type="button" aria-label="Open navigation" onClick={onMenuClick}>
          <FaBars />
        </button>

        <div>
          <h2>{title}</h2>
          {/* <p>Welcome back, {user?.name}</p> */}
        </div>

      </div>

      {/* Center */}

      <div className="navbar-search">

        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search..."
        />

      </div>

      {/* Right */}

      <div className="navbar-right">

        <button className="icon-btn">
          <FaBell />
          <span className="badge">3</span>
        </button>

        <button className="icon-btn">
          <FaEnvelope />
          <span className="badge">5</span>
        </button>

        <div className="profile">

          <FaUserCircle className="profile-icon"/>

          <div>

            <h4>{user?.name}</h4>

            <span>{user?.role}</span>

          </div>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;