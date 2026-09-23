import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
  FaHome,
  FaBuilding,
  FaClipboardList,
  FaUsers,
  FaBriefcase,
  FaCalendarCheck,
  FaCalendarAlt,
  FaStar,
  FaFileAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";

import styles from "./Sidebar.module.css";

const navigationGroups = [
  {
    items: [
      {
        label: "Dashboard",
        path: "/hr/dashboard",
        icon: FaHome,
      },
    ],
  },
  {
    items: [
      {
        label: "Departments",
        path: "/hr/departments",
        icon: FaBuilding,
      },
      {
        label: "Designations",
        path: "/hr/designations",
        icon: FaClipboardList,
      },
      {
        label: "Employees",
        path: "/hr/employeemanagement",
        icon: FaUsers,
      },
    ],
  },
  {
    items: [
      {
        label: "Attendance",
        path: "/hr/attendance",
        icon: FaCalendarCheck,
      },
      {
        label: "Leave Management",
        path: "/hr/leave-management",
        icon: FaCalendarAlt,
      },
      {
        label: "Performance Reviews",
        path: "/hr/performance-reviews",
        icon: FaStar,
      },
      {
        label: "Reports",
        path: "/hr/reports",
        icon: FaFileAlt,
      },
    ],
  },
];

const recruitmentItems = [
  {
    label: "Dashboard",
    path: "/hr/recruitment/dashboard",
  },
  {
    label: "Recruitment Management",
    path: "/hr/recruitment/management",
  },
];

function Sidebar({
  collapsed,
  onToggle,
  mobileOpen = false,
  onMobileClose,
}) {
  const navigate = useNavigate();
  const [recruitmentOpen, setRecruitmentOpen] = useState(false);

  const handleLogout = () => {
    navigate("/", { replace: true });
  };

  return (
    <aside
      className={`${styles.sidebar} ${
        collapsed ? styles.collapsed : ""
      } ${mobileOpen ? styles.mobileOpen : ""}`}
      aria-label="Main navigation"
    >
      {/* Logo */}
      <button
        type="button"
        className={styles.logoArea}
        onClick={onToggle}
        aria-label={
          collapsed ? "Expand sidebar" : "Collapse sidebar"
        }
      >
        <img
          src="/hrms-logo.png"
          alt="HRMS"
          className={`${styles.logo} ${styles.logoFull}`}
        />

        <img
          src="/hrms-logo-icon.png"
          alt="HRMS"
          className={`${styles.logo} ${styles.logoCollapsed}`}
        />
      </button>

      {/* Mobile close button */}
      <button
        type="button"
        className={styles.mobileCloseButton}
        onClick={onMobileClose}
        aria-label="Close navigation"
      >
        ×
      </button>

      {/* Navigation */}
      <nav className={styles.navigation}>
        {navigationGroups.map((group, groupIndex) => (
          <div className={styles.group} key={groupIndex}>
            {group.items.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onMobileClose}
                  data-tooltip={collapsed ? item.label : ""}
                  className={({ isActive }) =>
                    `${styles.navItem} ${
                      isActive ? styles.active : ""
                    }`
                  }
                >
                  <span className={styles.icon}>
                    <Icon />
                  </span>

                  <span className={styles.label}>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        ))}

        {/* Recruitment */}
        <div className={styles.group}>
          <button
            type="button"
            className={styles.navItem}
            onClick={() =>
              setRecruitmentOpen((previous) => !previous)
            }
            data-tooltip={collapsed ? "Recruitment" : ""}
            aria-expanded={recruitmentOpen}
          >
            <span className={styles.icon}>
              <FaBriefcase />
            </span>

            <span className={styles.label}>Recruitment</span>

            <span className={styles.dropdownArrow}>
              {recruitmentOpen ? "⌃" : "⌄"}
            </span>
          </button>

          {recruitmentOpen && (
            <div className={styles.subMenu}>
              {recruitmentItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onMobileClose}
                  className={({ isActive }) =>
                    `${styles.subNavItem} ${
                      isActive ? styles.subActive : ""
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Bottom section */}
      <div className={styles.bottom}>
        <button
          type="button"
          className={styles.logout}
          onClick={handleLogout}
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>

        <button
          type="button"
          className={styles.profile}
          data-tooltip={collapsed ? "Dominic Toretto" : ""}
        >
          <span className={styles.avatar}>
            <FaUser />
          </span>

          <span className={styles.profileInfo}>
            <strong>Dominic Toretto</strong>
            <small>HR Administrator</small>
          </span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
