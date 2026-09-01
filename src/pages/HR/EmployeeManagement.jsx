import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Search,
  Download,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import "./EmployeeManagement.css";

import { departmentApi } from "../../services/api/department.api";
import { designationApi } from "../../services/api/designation.api";

import { fetchEmployees } from "../../store/slices/employeeSlice";

function EmployeeManagement() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All Departments");
  const [designation, setDesignation] = useState("All Designations");
  const [page, setPage] = useState(1);
  
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);

  const [isLoadingFilters, setIsLoadingFilters] = useState(true);
  const [filterError, setFilterError] = useState("");

  const dispatch = useDispatch();

  const {
    data: employees,
    isLoading,
    error,
  } = useSelector((state) => state.employees);

  // =====================================================
  // LOAD EMPLOYEES
  // =====================================================

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  // =====================================================
  // LOAD DEPARTMENTS + DESIGNATIONS
  // =====================================================

  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        setIsLoadingFilters(true);
        setFilterError("");

        const [departmentResponse, designationResponse] = await Promise.all([
          departmentApi.getAll(),
          designationApi.getAll(),
        ]);

        console.log("Departments API response:", departmentResponse.data);

        console.log("Designations API response:", designationResponse.data);

        const departmentList = Array.isArray(departmentResponse.data)
          ? departmentResponse.data
          : departmentResponse.data?.value || [];

        const designationList = Array.isArray(designationResponse.data)
          ? designationResponse.data
          : designationResponse.data?.value || [];

        setDepartments(departmentList);
        setDesignations(designationList);
      } catch (error) {
        console.error("Failed to load department/designation filters:", error);

        setFilterError(
          error?.response?.data?.message ||
            "Failed to load departments and designations.",
        );
      } finally {
        setIsLoadingFilters(false);
      }
    };

    loadFilterOptions();
  }, []);

  // =====================================================
  // FILTER EMPLOYEES
  // =====================================================

  const filteredEmployees = employees.filter((employee) => {
    const fullName =
      `${employee.first_name || ""} ${employee.last_name || ""}`.trim();

    const searchTerm = search.trim().toLowerCase();

    const searchMatch =
      fullName.toLowerCase().includes(searchTerm) ||
      (employee.employee_code || "").toLowerCase().includes(searchTerm) ||
      (employee.email || "").toLowerCase().includes(searchTerm);

    const employeeDepartment = (employee.department_name || "")
      .trim()
      .toLowerCase();

    const employeeDesignation = (employee.designation_name || "")
      .trim()
      .toLowerCase();

    const selectedDepartment = department.trim().toLowerCase();

    const selectedDesignation = designation.trim().toLowerCase();

    const departmentMatch =
      department === "All Departments" ||
      employeeDepartment === selectedDepartment;

    const designationMatch =
      designation === "All Designations" ||
      employeeDesignation === selectedDesignation;

    return searchMatch && departmentMatch && designationMatch;
  });

  // =====================================================
  // ACTIONS
  // =====================================================

  const handleView = (id) => {
    navigate(`/hr/employees/${id}`);
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <section className="employee-page">
      <h1>Employee Management</h1>

      {/* Search / Filter */}
      <div className="filter-card">
        <div className="search-box">
          <Search />

          <input
            type="text"
            placeholder="Search employees"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        {/* Department */}
        <div className="select-box">
          <select
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
              setPage(1);
            }}
            disabled={isLoadingFilters}
          >
            <option value="All Departments">
              {isLoadingFilters ? "Loading Departments..." : "All Departments"}
            </option>

            {!isLoadingFilters &&
              departments.map((dept) => (
                <option key={dept.id} value={dept.department_name}>
                  {dept.department_name}
                </option>
              ))}
          </select>

          <ChevronDown />
        </div>

        {/* Designation */}
        <div className="select-box">
          <select
            value={designation}
            onChange={(e) => {
              setDesignation(e.target.value);
              setPage(1);
            }}
            disabled={isLoadingFilters}
          >
            <option value="All Designations">
              {isLoadingFilters
                ? "Loading Designations..."
                : "All Designations"}
            </option>

            {!isLoadingFilters &&
              designations.map((desig) => (
                <option key={desig.id} value={desig.designation_name}>
                  {desig.designation_name}
                </option>
              ))}
          </select>

          <ChevronDown />
        </div>

        <button className="export-button">
          <Download />
          Export
        </button>

        <button
          className="add-button"
          onClick={() => navigate("/hr/employee-registration")}
        >
          <span>+</span>
          Add Employee
        </button>
      </div>

      {/* Filter error */}
      {filterError && <div className="no-data">{filterError}</div>}

      {/* Employee Table */}
      <div className="employee-card">
        <h2>Employee List</h2>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Photo</th>
                <th>Name</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Joining Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {/* Loading */}
              {isLoading ? (
                <tr>
                  <td colSpan="10" className="no-data">
                    Loading employees...
                  </td>
                </tr>
              ) : error ? (
                /* API Error */
                <tr>
                  <td colSpan="10" className="no-data">
                    {error}
                  </td>
                </tr>
              ) : filteredEmployees.length > 0 ? (
                /* Employees */
                filteredEmployees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.employee_code}</td>

                    <td>
                      <div className="employee-avatar">
                        {`${employee.first_name?.[0] || ""}${
                          employee.last_name?.[0] || ""
                        }`}
                      </div>
                    </td>

                    <td>
                      {employee.first_name} {employee.last_name}
                    </td>

                    <td>
                      <span className="department-text">
                        {employee.department_name}
                      </span>
                    </td>

                    <td>{employee.designation_name}</td>

                    <td>{employee.email}</td>

                    <td>{employee.phone}</td>

                    <td>
                      <span
                        className={`status ${
                          employee.status?.toLowerCase().replace(/\s+/g, "-") ||
                          ""
                        }`}
                      >
                        {employee.status || "Unknown"}
                      </span>
                    </td>

                    <td>{employee.joining_date}</td>

                    <td>
                      <div className="action-buttons">
                        <button
                          type="button"
                          className="view-button"
                          onClick={() => handleView(employee.id)}
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                /* No Results */
                <tr>
                  <td colSpan="10" className="no-data">
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination UI */}
        {filteredEmployees.length > 0 && (
          <div className="pagination-container">
            <button className="pagination-arrow">
              <ChevronLeft />
            </button>

            {[1, 2, 3, 4, 5].map((number) => (
              <button
                key={number}
                className={`page-number ${page === number ? "selected" : ""}`}
                onClick={() => setPage(number)}
              >
                {number}
              </button>
            ))}

            <button className="pagination-arrow">
              <ChevronRight />
            </button>

            <div className="pagination-spacer" />

            <button className="previous-button">Previous</button>

            <button className="next-button">Next</button>
          </div>
        )}
      </div>

      <footer className="footer">
        <span>Copyright 2026 HRMS</span>

        <div>
          <span>Privacy Policy</span>
          <b>|</b>
          <span>Terms and Conditions</span>
        </div>
      </footer>
    </section>
  );
}

export default EmployeeManagement;
