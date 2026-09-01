import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";


// Common HR UI
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import EmployeeOnboarding from "../pages/HR/EmployeeOnboarding";

// Login
import Login from "../pages/Login/Login";

// Admin
import AdminDashboard from "../pages/Admin/Dashboard";

// Employee
import EmployeeDashboard from "../pages/Employee/Dashboard";

// HR
import Dashboard from "../pages/HR/Dashboard/Dashboard";
import Departments from "../pages/HR/Departments/Departments";
import Designations from "../pages/HR/Designations/Designations";
import Attendance from "../pages/HR/Attendance/Attendance";
import HREmployeeManagement from "../pages/HR/EmployeeManagement";
import EmployeeDetails from "../pages/HR/EmployeeDetails/EmployeeDetails";
import LeaveManagement from "../pages/HR/LeaveManagement/LeaveManagement";
import PerformanceReviews from "../pages/HR/PerformanceReviews/PerformanceReviews";
import Reports from "../pages/HR/Reports/Reports";

import "../layouts/Layout.css";


// Common HR page structure
function HRPage({ Component, title }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-layout">

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {sidebarOpen && (
        <button
          className="sidebar-backdrop"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="main-area">

        <Navbar title={title} onMenuClick={() => setSidebarOpen((open) => !open)} />

        <main className="page-content">
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

        {/* Login */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
              <Route
          path="/hr/employee-registration"
          element={
            <HRPage
              Component={EmployeeOnboarding}
              title="Employee Registration"
            />
          }
        />

        {/* Admin */}
        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />


        {/* Employee */}
        <Route
          path="/employee/dashboard"
          element={<EmployeeDashboard />}
        />


        {/* HR Dashboard */}
        <Route
          path="/hr/dashboard"
          element={
            <HRPage
              Component={Dashboard}
              title="Dashboard"
            />
          }
        />


        {/* HR Departments */}
        <Route
          path="/hr/departments"
          element={
            <HRPage
              Component={Departments}
              title="Departments"
            />
          }
        />


        {/* HR Designations */}
        <Route
          path="/hr/designations"
          element={
            <HRPage
              Component={Designations}
              title="Designations"
            />
          }
        />


        {/* HR Attendance */}
        <Route
          path="/hr/attendance"
          element={
            <HRPage
              Component={Attendance}
              title="Attendance"
            />
          }
        />


        {/* HR Employee Management */}
        <Route
          path="/hr/employeemanagement"
          element={
            <HRPage
              Component={HREmployeeManagement}
              title="Employee Management"
            />
          }
        />

        {/* HR Employee Details */}
        <Route
          path="/hr/employees/:id"
          element={
            <HRPage
              Component={EmployeeDetails}
              title="Employee Details"
            />
          }
        />


        {/* HR Leave Management */}
        <Route
          path="/hr/leave-management"
          element={
            <HRPage
              Component={LeaveManagement}
              title="Leave Management"
            />
          }
        />


        {/* HR Performance Reviews */}
        <Route
          path="/hr/performance-reviews"
          element={
            <HRPage
              Component={PerformanceReviews}
              title="Performance Reviews"
            />
          }
        />


        {/* HR Reports */}
        <Route
          path="/hr/reports"
          element={
            <HRPage
              Component={Reports}
              title="Reports"
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;