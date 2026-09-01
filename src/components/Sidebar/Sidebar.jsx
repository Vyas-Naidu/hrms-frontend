
import { NavLink } from "react-router-dom";
import {

  Building2,
  ClipboardList,
  UsersRound,
  CalendarDays,
  ClipboardCheck,
  Star,
  FileText,
  Home,
} from "lucide-react";
import styles from "./Sidebar.module.css";

const Sidebar = ({ open = false, onClose }) => {
 const menu = [
  {
    name: "Dashboard",
    path: "/hr/dashboard",
    icon: Home,
  },
  {
    name: "Departments",
    path: "/hr/departments",
    icon: Building2,
  },
  {
    name: "Designations",
    path: "/hr/designations",
    icon: ClipboardList,
  },
   {
    name: "Attendance",
    path: "/hr/attendance",
    icon: ClipboardCheck,
   },
  {
    name: "Employees",
    path: "/hr/employeemanagement",
    icon: UsersRound,
  },
  {
    name: "Leave Management",
    path: "/hr/leave-management",
    icon: CalendarDays,
  },
  {
    name: "Performance Reviews",
    path: "/hr/performance-reviews",
    icon: Star,
  },
  {
    name: "Reports",
    path: "/hr/reports",
    icon: FileText,
  },
];

  return (
    <aside className={[styles["sidebar"], (open ? styles["open"] : "")].filter(Boolean).join(" ")} aria-label="Main navigation">

      <div className={styles["sidebar-logo"]}>
        <img
          src="/hrms-logo.png"
          alt="HRMS - Human Resource Management System"
        />
      </div>

      <nav className={styles["sidebar-menu"]}>
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                isActive
                  ? [styles["sidebar-link"], styles["active"]].join(" ")
                  : styles["sidebar-link"]
            }
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

    </aside>
  );
};

export default Sidebar;