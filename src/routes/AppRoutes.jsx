import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "../shared/components/Sidebar/Sidebar";
import Navbar from "../shared/components/Navbar/Navbar";
import EmployeeOnboarding from "../pages/HR/EmployeeOnboarding";
import Login from "../pages/Login/Login";
import AdminDashboard from "../pages/Admin/Dashboard";
import EmployeeDashboard from "../pages/Employee/Dashboard";
import Dashboard from "../pages/HR/Dashboard/Dashboard";
import Departments from "../modules/departments/Departments";
import Add_Department from "../modules/departments/Add_Department";
import View_Department from "../modules/departments/View_Department";
import Designations from "../pages/HR/Designations/Designations";
import Add_Designation from "../pages/HR/Designations/Add_Designation";
import View_Designation from "../pages/HR/Designations/View_Designation";

import Edit_Designation from "../pages/HR/Designations/Edit_Designation";

import Attendance from "../pages/HR/Attendance/Attendance";
import HREmployeeManagement from "../pages/HR/EmployeeManagement";
import EmployeeDetails from "../pages/HR/EmployeeeDetails";
import Email from "../pages/HR/Email";
import Notifications from "../pages/HR/Notifications";
import LeaveManagement from "../pages/HR/LeaveManagement/LeaveManagement";
import PerformanceReviews from "../pages/HR/PerformanceReviews/PerformanceReviews";
import Reports from "../pages/HR/Reports/Reports";
import styles from "../layouts/Layout.module.css";

function HRPage({ Component, title }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className={`${styles.appLayout} ${collapsed ? styles.sidebarCollapsed : ""}`}>
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((value) => !value)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {mobileOpen && (
        <button
          type="button"
          className={styles.overlay}
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <button
        type="button"
        className={styles.mobileMenuButton}
        aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen((value) => !value)}
      >
        ☰
      </button>

      <div className={styles.mainArea}>
        <Navbar title={title} />
        <main className={styles.pageContent}>
          <Component />
        </main>
      </div>
    </div>
  );
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />

        <Route path="/hr/dashboard" element={<HRPage Component={Dashboard} title="Dashboard" />} />

        <Route path="/hr/employee-registration" element={<HRPage Component={EmployeeOnboarding} title="Employee Registration" />} />
        <Route path="/hr/employee-registration/:id" element={<HRPage Component={EmployeeOnboarding} title="Edit Employee" />} />

        <Route path="/hr/departments" element={<HRPage Component={Departments} title="Departments" />} />
        <Route path="/hr/departments/add" element={<HRPage Component={Add_Department} title="Department Management" />} />
        <Route path="/hr/view-department/:id" element={<HRPage Component={View_Department} title="Department Details" />} />
        <Route path="/hr/edit-department/:id" element={<HRPage Component={Add_Department} title="Edit Department" />} />

        <Route path="/hr/designations" element={<HRPage Component={Designations} title="Designations" />} />
        <Route path="/hr/designations/add" element={<HRPage Component={Add_Designation} title="Add Designation" />} />
        <Route path="/hr/designations/view/:id" element={<HRPage Component={View_Designation} title="Designation Details" />} />
        <Route path="/hr/designations/edit/:id" element={<HRPage Component={Edit_Designation} title="Edit Designation" />} />


        <Route path="/hr/attendance" element={<HRPage Component={Attendance} title="Attendance" />} />
        <Route path="/hr/employeemanagement" element={<HRPage Component={HREmployeeManagement} title="Employee Management" />} />
        <Route path="/hr/employees/:id" element={<HRPage Component={EmployeeDetails} title="Employee Details" />} />
        <Route path="/hr/notifications" element={<HRPage Component={Notifications} title="Notifications" />} />
        <Route path="/hr/email" element={<HRPage Component={Email} title="Email" />} />
        <Route path="/hr/leave-management" element={<HRPage Component={LeaveManagement} title="Leave Management" />} />
        <Route path="/hr/performance-reviews" element={<HRPage Component={PerformanceReviews} title="Performance Reviews" />} />
        <Route path="/hr/reports" element={<HRPage Component={Reports} title="Reports" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
