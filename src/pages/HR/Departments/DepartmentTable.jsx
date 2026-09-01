// import React, { useState, useEffect } from "react";
// import { departmentApi } from "../../../services/api/department.api";
// import {
//   Search,
//   ChevronDown,
//   SlidersHorizontal,
//   Download,
//   Eye,
//   Pencil,
//   Trash2,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";

// import styles from "./DepartmentTable.module.css";

// const departments = [
//   {
//     id: "DPT-001",
//     name: "Engineering",
//     description: "Handles product development and engineering activities",
//     employees: 35,
//     manager: "Johns Izmirfarg",
//     status: "Active",
//   },
//   {
//     id: "DPT-002",
//     name: "Human Resources",
//     description: "Manages HR functions and employee relations",
//     employees: 28,
//     manager: "Admin Alex R.",
//     status: "Active",
//   },
//   {
//     id: "DPT-003",
//     name: "Sales",
//     description: "Handles sales, business development and client relations",
//     employees: 20,
//     manager: "Davin Alex R.",
//     status: "Active",
//   },
//   {
//     id: "DPT-004",
//     name: "Finance",
//     description: "Manages accounting, budgeting and financial operations",
//     employees: 15,
//     manager: "David Houson",
//     status: "Active",
//   },
//   {
//     id: "DPT-005",
//     name: "Marketing",
//     description: "Handles marketing strategies and brand management",
//     employees: 12,
//     manager: "Sneha Rao",
//     status: "Active",
//   },
//   {
//     id: "DPT-006",
//     name: "IT Support",
//     description: "Provides IT infrastructure and technical support",
//     employees: 8,
//     manager: "Vikram Mehta",
//     status: "Active",
//   },
//   {
//     id: "DPT-007",
//     name: "Operations",
//     description: "Manages day-to-day operations and processes",
//     employees: 4,
//     manager: "Priya Sharma",
//     status: "Inactive",
//   },
//   {
//     id: "DPT-008",
//     name: "Administration",
//     description: "Handles administrative and support functions",
//     employees: 2,
//     manager: "Arjun Reddy",
//     status: "Active",
//   },
// ];

// const DepartmentTable = () => {
//   const [search, setSearch] = useState("");
//   const [status, setStatus] = useState("All Status");

//   const filteredDepartments = departments.filter((department) => {
//     const matchesSearch =
//       department.name.toLowerCase().includes(search.toLowerCase()) ||
//       department.id.toLowerCase().includes(search.toLowerCase());

//     const matchesStatus =
//       status === "All Status" || department.status === status;

//     return matchesSearch && matchesStatus;
//   });

//   return (
//     <div className="department-table-card">

//       {/* ==========================
//           TOOLBAR
//       ========================== */}

//       <div className="department-table-toolbar">

//         <div className="department-search">
//           <Search size={18} />

//           <input
//             type="text"
//             placeholder="Search departments..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>


//         <div className="department-table-actions">

//           <div className="status-select">
//             <select
//               value={status}
//               onChange={(e) => setStatus(e.target.value)}
//             >
//               <option>All Status</option>
//               <option>Active</option>
//               <option>Inactive</option>
//             </select>

//             <ChevronDown size={16} />
//           </div>


//           <button className="filter-btn" title="Filter">
//             <SlidersHorizontal size={17} />
//           </button>


//           <button className="export-btn">
//             <Download size={17} />
//             <span>Export</span>
//           </button>

//         </div>

//       </div>


//       {/* ==========================
//           TABLE
//       ========================== */}

//       <div className="department-table-wrapper">

//         <table className="department-table">

//           <thead>
//             <tr>
//               <th>DEPARTMENT ID</th>
//               <th>DEPARTMENT NAME</th>
//               <th>DESCRIPTION</th>
//               <th>EMPLOYEES</th>
//               <th>MANAGER</th>
//               <th>STATUS</th>
//               <th>ACTION</th>
//             </tr>
//           </thead>

//           <tbody>

//             {filteredDepartments.map((department) => (
//               <tr key={department.id}>

//                 <td>{department.id}</td>

//                 <td className="department-name">
//                   {department.name}
//                 </td>

//                 <td className="department-description">
//                   {department.description}
//                 </td>

//                 <td>{department.employees}</td>

//                 <td>{department.manager}</td>

//                 <td>
//                   <span
//                     className={`department-status ${
//                       department.status === "Active"
//                         ? "active"
//                         : "inactive"
//                     }`}
//                   >
//                     {department.status}
//                   </span>
//                 </td>

//                 <td>
//                   <div className="department-actions">

//                     <button title="View">
//                       <Eye size={16} />
//                     </button>

//                     <button title="Edit">
//                       <Pencil size={16} />
//                     </button>

//                     <button title="Delete">
//                       <Trash2 size={16} />
//                     </button>

//                   </div>
//                 </td>

//               </tr>
//             ))}

//           </tbody>

//         </table>

//       </div>


//       {/* ==========================
//           FOOTER
//       ========================== */}

//       <div className="department-table-footer">

//         <span>
//           Showing 1 to {filteredDepartments.length} of{" "}
//           {filteredDepartments.length} departments
//         </span>

//         <div className="pagination">

//           <button disabled>
//             <ChevronLeft size={16} />
//           </button>

//           <button className="active-page">
//             1
//           </button>

//           <button>
//             <ChevronRight size={16} />
//           </button>

//         </div>

//       </div>

//     </div>
//   );
// };

// export default DepartmentTable;

import React, { useEffect, useState } from "react";
import {
  Search,
  Download,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { departmentApi } from "../../../services/api/department.api";

import styles from "./DepartmentTable.module.css";

const DepartmentTable = () => {
  const [departments, setDepartments] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await departmentApi.getAll();

      setDepartments(response.data);
    } catch (error) {
      console.error("Failed to load departments:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load departments."
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredDepartments = departments.filter((department) => {
    const searchValue = search.toLowerCase();

    return (
      String(department.id)
        .toLowerCase()
        .includes(searchValue) ||
      department.department_name
        ?.toLowerCase()
        .includes(searchValue) ||
      department.department_code
        ?.toLowerCase()
        .includes(searchValue)
    );
  });

  return (
    <div className={styles["department-table-card"]}>

      {/* TOOLBAR */}

      <div className={styles["department-table-toolbar"]}>

        <div className={styles["department-search"]}>
          <Search size={18} />

          <input
            type="text"
            placeholder="Search departments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className={styles["department-table-actions"]}>

          <button className={styles["export-btn"]}>
            <Download size={17} />
            <span>Export</span>
          </button>

        </div>

      </div>

      {/* LOADING */}

      {loading && (
        <div className={"department-table-message"}>
          Loading departments...
        </div>
      )}

      {/* ERROR */}

      {!loading && error && (
        <div className={["department-table-message", "error"].join(" ")}>
          {error}
        </div>
      )}

      {/* TABLE */}

      {!loading && !error && (
        <div className={styles["department-table-wrapper"]}>

          <table className={styles["department-table"]}>

            <thead>
              <tr>
                <th>ID</th>
                <th>DEPARTMENT NAME</th>
                <th>DEPARTMENT CODE</th>
                <th>CREATED AT</th>
                <th>UPDATED AT</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>

              {filteredDepartments.length === 0 ? (
                <tr>
                  <td colSpan="6">
                    No departments found.
                  </td>
                </tr>
              ) : (
                filteredDepartments.map((department) => (
                  <tr key={department.id}>

                    <td>
                      {department.id}
                    </td>

                    <td className={styles["department-name"]}>
                      {department.department_name}
                    </td>

                    <td>
                      {department.department_code}
                    </td>

                    <td>
                      {new Date(
                        department.created_at
                      ).toLocaleDateString()}
                    </td>

                    <td>
                      {new Date(
                        department.updated_at
                      ).toLocaleDateString()}
                    </td>

                    <td>
                      <div className={styles["department-actions"]}>

                        <button title="View">
                          <Eye size={16} />
                        </button>

                        <button title="Edit">
                          <Pencil size={16} />
                        </button>

                        <button title="Delete">
                          <Trash2 size={16} />
                        </button>

                      </div>
                    </td>

                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>
      )}

      {/* FOOTER */}

      {!loading && !error && (
        <div className={styles["department-table-footer"]}>

          <span>
            Showing {filteredDepartments.length} of{" "}
            {departments.length} departments
          </span>

          <div className={styles["pagination"]}>

            <button disabled>
              <ChevronLeft size={16} />
            </button>

            <button className={styles["active-page"]}>
              1
            </button>

            <button disabled>
              <ChevronRight size={16} />
            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default DepartmentTable;