import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaBell,
  FaEnvelope,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";

function Navbar({ title, user, onMenuClick }) {
  return (
    <nav className={styles["navbar"]}>

      {/* Left */}

      <div className={styles["navbar-left"]}>

        <button className={styles["menu-btn"]} type="button" aria-label="Open navigation" onClick={onMenuClick}>
          <FaBars />
        </button>

        <div>
          <h2>{title}</h2>
          {/* <p>Welcome back, {user?.name}</p> */}
        </div>

      </div>

      {/* Center */}

      <div className={styles["navbar-search"]}>

        <FaSearch className={styles["search-icon"]} />

        <input
          type="text"
          placeholder="Search..."
        />

      </div>

      {/* Right */}

      <div className={styles["navbar-right"]}>

        <Link
          to="/hr/notifications"
          className={styles["icon-btn"]}
          aria-label="Open notifications"
        >
          <FaBell />
          <span className={styles["badge"]}>3</span>
        </Link>

        <button className={styles["icon-btn"]}>
          <FaEnvelope />
          <span className={styles["badge"]}>5</span>
        </button>

        <div className={styles["profile"]}>

          <FaUserCircle className={styles["profile-icon"]}/>

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