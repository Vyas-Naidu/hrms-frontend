import { NavLink, useNavigate } from "react-router-dom";

import {
  FaHome,
  FaBuilding,
  FaClipboardList,
  FaUsers,
  FaCalendarCheck,
  FaCalendarAlt,
  FaStar,
  FaFileAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";

import {
  logoutUser,
  getCurrentUser,
  getCurrentRole,
} from "../../../services/auth";

import styles from "./Sidebar.module.css";
import { useEffect, useState } from "react";
import { employeeApi } from "../../../services/api/employee.api";

const navigationByRole = {
  ADMIN: [
    {
      items: [
        {
          label: "Dashboard",
          path: "/dashboard",
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
          label: "Reports",
          path: "/hr/reports",
          icon: FaFileAlt,
        },
      ],
    },
  ],

  HR: [
    {
      items: [
        {
          label: "Dashboard",
          path: "/dashboard",
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
  ],

  EMPLOYEE: [
    {
      items: [
        {
          label: "Dashboard",
          path: "/dashboard",
          icon: FaHome,
        },
      ],
    },
  ],
};

function Sidebar({
  collapsed,
  onToggle,
  mobileOpen = false,
  onMobileClose,
}) {
  const navigate = useNavigate();

  const user = getCurrentUser();
  const role = getCurrentRole();
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    if (role !== "EMPLOYEE") return;

    let objectUrl;

    employeeApi
      .getMyPhoto()
      .then(({ data }) => {
        objectUrl = URL.createObjectURL(data);
        setPhotoUrl(objectUrl);
      })
      .catch(() => {
        // No photo uploaded: retain the default avatar.
      });

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [role]);
  const navigationGroups = navigationByRole[role] ?? [];

  const fullName = [user?.firstName, user?.lastName]
    .filter(Boolean)
    .join(" ");

  const roleLabel = {
    ADMIN: "Administrator",
    HR: "HR Administrator",
    EMPLOYEE: "Employee",
  }[role] || role || "User";

  const handleLogout = () => {
    logoutUser();
    navigate("/login", { replace: true });
  };

  return (
    <aside
      className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""
        } ${mobileOpen ? styles.mobileOpen : ""}`}
      aria-label="Main navigation"
    >
      <button
        type="button"
        className={styles.logoArea}
        onClick={onToggle}
        aria-label={
          collapsed
            ? "Expand sidebar"
            : "Collapse sidebar"
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

      <button
        type="button"
        className={styles.mobileCloseButton}
        onClick={onMobileClose}
        aria-label="Close navigation"
      >
        ×
      </button>

      <nav className={styles.navigation}>
        {navigationGroups.map((group, groupIndex) => (
          <div
            className={styles.group}
            key={groupIndex}
          >
            {group.items.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onMobileClose}
                  data-tooltip={
                    collapsed ? item.label : ""
                  }
                  className={({ isActive }) =>
                    `${styles.navItem} ${isActive ? styles.active : ""
                    }`
                  }
                >
                  <span className={styles.icon}>
                    <Icon />
                  </span>

                  <span className={styles.label}>
                    {item.label}
                  </span>
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>

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
          onClick={() => {
            if (role === "EMPLOYEE") {
              navigate("/my-profile");
              onMobileClose?.();
            }
          }}
          data-tooltip={collapsed ? fullName || "User" : ""}
          aria-label={
            role === "EMPLOYEE" ? "Open my profile" : fullName || "User"
          }
        >
          <span className={styles.avatar}>
            {photoUrl && role === "EMPLOYEE" ? (
              <img
                src={photoUrl}
                alt=""
                className={styles.avatarImage}
              />
            ) : (
              <FaUser />
            )}
          </span>

          <span className={styles.profileInfo}>
            <strong>{fullName || "User"}</strong>
            <small>{roleLabel}</small>
          </span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;