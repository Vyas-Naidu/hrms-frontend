import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Route guards
import PublicRoutes from "./PublicRoutes";
import ProtectedRoute from "./ProtectedRoutes";

// Layout
import AppLayout from "../layouts/AppLayout";

// Auth
import Login from "../pages/Login/Login";

// Dashboard
import Dashboard from "../pages/Dashboard/Dashboard";

// Shared pages
import Notifications from "../pages/HR/Notifications";
import Email from "../pages/HR/Email";

// Employees
import EmployeeOnboarding from "../modules/employees/pages/EmployeeOnboarding";
import EmployeeManagement from "../modules/employees/pages/EmployeeManagement";
import EmployeeDetails from "../modules/employees/pages/EmployeeDetails";
import MyProfile from "../pages/Employee/MyProfile";

// Departments
import Departments from "../modules/departments/Departments";
import Add_Department from "../modules/departments/Add_Department";
import View_Department from "../modules/departments/View_Department";

// Designations
import Designations from "../modules/designations/Designations";
import Add_Designation from "../modules/designations/Add_Designation";
import View_Designation from "../modules/designations/View_Designation";
import Edit_Designation from "../modules/designations/Edit_Designation";

// HR
import Attendance from "../pages/HR/Attendance/Attendance";
import PerformanceReviews from "../pages/HR/PerformanceReviews/PerformanceReviews";
import Reports from "../pages/HR/Reports/Reports";

// Leave Management
import LeaveManagement from "../pages/HR/LeaveManagement/LeaveManagement";
import LeaveSettings from "../pages/HR/LeaveManagement/settings/LeaveSettings";
import LeaveTypes from "../pages/HR/LeaveManagement/settings/LeaveTypes";
import LeavePeriod from "../pages/HR/LeaveManagement/settings/LeavePeriod";
import HolidayList from "../pages/HR/LeaveManagement/settings/HolidayList";
import LeaveAllocations from "../pages/HR/LeaveManagement/settings/LeaveAllocations";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* =====================================================
            PUBLIC ROUTES
        ===================================================== */}

        <Route element={<PublicRoutes />}>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* =====================================================
            PROTECTED APPLICATION
        ===================================================== */}

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>

            {/* =================================================
                ALL AUTHENTICATED USERS
            ================================================= */}

            <Route path="/dashboard" element={<Dashboard />} />

            <Route
              path="/notifications"
              element={<Notifications />}
            />

            <Route
              path="/email"
              element={<Email />}
            />

            {/* =================================================
                ADMIN + HR
            ================================================= */}

            <Route element={<ProtectedRoute roles={["ADMIN", "HR"]} />}>

              {/* Employee Registration */}
              <Route
                path="/hr/employee-registration"
                element={<EmployeeOnboarding />}
              />

              <Route
                path="/hr/employee-registration/:id"
                element={<EmployeeOnboarding />}
              />

              {/* Employee Management */}
              <Route
                path="/hr/employeemanagement"
                element={<EmployeeManagement />}
              />

              <Route
                path="/hr/employees/:id"
                element={<EmployeeDetails />}
              />

              {/* Departments */}
              <Route
                path="/hr/departments"
                element={<Departments />}
              />

              <Route
                path="/hr/departments/add"
                element={<Add_Department />}
              />

              <Route
                path="/hr/view-department/:id"
                element={<View_Department />}
              />

              <Route
                path="/hr/edit-department/:id"
                element={<Add_Department />}
              />

              {/* Designations */}
              <Route
                path="/hr/designations"
                element={<Designations />}
              />

              <Route
                path="/hr/designations/add"
                element={<Add_Designation />}
              />

              <Route
                path="/hr/designations/view/:id"
                element={<View_Designation />}
              />

              <Route
                path="/hr/designations/edit/:id"
                element={<Edit_Designation />}
              />

              {/* Attendance */}
              <Route
                path="/hr/attendance"
                element={<Attendance />}
              />

              {/* Leave Management */}
              <Route
                path="/hr/leave-management"
                element={<LeaveManagement />}
              />

              <Route
                path="/hr/leave-management/settings"
                element={<LeaveSettings />}
              />

              <Route
                path="/hr/leave-management/settings/leave-types"
                element={<LeaveTypes />}
              />

              <Route
                path="/hr/leave-management/settings/leave-period"
                element={<LeavePeriod />}
              />

              <Route
                path="/hr/leave-management/settings/holidays"
                element={<HolidayList />}
              />

              <Route
                path="/hr/leave-management/settings/allocations"
                element={<LeaveAllocations />}
              />

              {/* Reports */}
              <Route
                path="/hr/reports"
                element={<Reports />}
              />

            </Route>

            {/* =================================================
                HR ONLY
            ================================================= */}

            <Route element={<ProtectedRoute roles={["HR"]} />}>

              <Route
                path="/hr/performance-reviews"
                element={<PerformanceReviews />}
              />

            </Route>

            {/* =================================================
                EMPLOYEE
            ================================================= */}

            {/* EMPLOYEE SELF-SERVICE */}
            <Route element={<ProtectedRoute roles={["EMPLOYEE"]} />}>
              <Route path="/my-profile" element={<MyProfile />} />
            </Route>

            {/* =================================================
                FALLBACK
            ================================================= */}

            <Route
              path="*"
              element={<Navigate to="/dashboard" replace />}
            />

          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;