import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { usercontext } from "../appcontext";
import styles from "./dashboard.module.css";

function Sidebar() {
  const { username, profilePhoto } = useContext(usercontext);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <div className={styles.avatarWrapper}>
          <img src={profilePhoto || "https://via.placeholder.com/72?text=AI"} alt="Profile" />
        </div>
        <div>
          <h2>{username || "AI Mentor"}</h2>
          <p>Career guidance dashboard</p>
        </div>
      </div>

      <nav className={styles.sidebarNav}>
        <NavLink to="/" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink} end>
          Overview
        </NavLink>
        <NavLink to="/ai-mentor" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
          AI Mentor
        </NavLink>
        <NavLink to="/ai-mentor/history" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
          Mentor History
        </NavLink>
        <NavLink to="/analysis/history" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
          Resume History
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
          Profile
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
