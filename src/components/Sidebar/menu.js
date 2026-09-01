import {
  FaHome,
  FaUsers,
  FaBuilding,
  FaIdBadge,
  FaClipboardCheck,
  FaCalendarAlt,
  FaMoneyCheckAlt,
  FaUserGraduate,
  FaChartBar,
  FaCog,
  FaUserCircle,
  FaSignOutAlt,
  FaUserTie,
} from "react-icons/fa";

export const adminMenu = [
  { id: 1, name: "Dashboard", path: "/admin/dashboard", icon: <FaHome /> },
  { id: 2, name: "Employees", path: "/admin/employees", icon: <FaUsers /> },
  { id: 3, name: "Departments", path: "/admin/departments", icon: <FaBuilding /> },
  { id: 4, name: "Designations", path: "/admin/designations", icon: <FaIdBadge /> },
  { id: 5, name: "Recruitment", path: "/admin/recruitment", icon: <FaUserTie /> },
  { id: 6, name: "Attendance", path: "/admin/attendance", icon: <FaClipboardCheck /> },
  { id: 7, name: "Leave", path: "/admin/leave", icon: <FaCalendarAlt /> },
  { id: 8, name: "Payroll", path: "/admin/payroll", icon: <FaMoneyCheckAlt /> },
  { id: 9, name: "Training", path: "/admin/training", icon: <FaUserGraduate /> },
  { id: 10, name: "Reports", path: "/admin/reports", icon: <FaChartBar /> },
  { id: 11, name: "Settings", path: "/admin/settings", icon: <FaCog /> },
];

export const hrMenu = [
  { id: 1, name: "Dashboard", path: "/hr/dashboard", icon: <FaHome /> },
  { id: 2, name: "Employees", path: "/hr/employees", icon: <FaUsers /> },
  { id: 3, name: "Recruitment", path: "/hr/recruitment", icon: <FaUserTie /> },
  { id: 4, name: "Attendance", path: "/hr/attendance", icon: <FaClipboardCheck /> },
  { id: 5, name: "Leave", path: "/hr/leave", icon: <FaCalendarAlt /> },
  { id: 6, name: "Training", path: "/hr/training", icon: <FaUserGraduate /> },
  { id: 7, name: "Reports", path: "/hr/reports", icon: <FaChartBar /> },
];

export const employeeMenu = [
  { id: 1, name: "Dashboard", path: "/employee/dashboard", icon: <FaHome /> },
  { id: 2, name: "My Profile", path: "/employee/profile", icon: <FaUserCircle /> },
  { id: 3, name: "Attendance", path: "/employee/attendance", icon: <FaClipboardCheck /> },
  { id: 4, name: "Leave", path: "/employee/leave", icon: <FaCalendarAlt /> },
  { id: 5, name: "Payroll", path: "/employee/payroll", icon: <FaMoneyCheckAlt /> },
  { id: 6, name: "Documents", path: "/employee/documents", icon: <FaUsers /> },
];