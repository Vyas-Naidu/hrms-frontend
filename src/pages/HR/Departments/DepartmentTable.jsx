import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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


  // ADD THIS HERE
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this department?"
    );

    if (!confirmed) return;

    try {
      await departmentApi.remove(id);

      setDepartments((prev) =>
        prev.filter((department) => department.id !== id)
      );

      alert("Department deleted successfully!");
    } catch (error) {
      console.error("Failed to delete department:", error);

      const message =
        error.response?.data?.message ||
        "Cannot delete this department because it is being used.";

      alert(message);
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

                        <button
                          title="View"
                          onClick={() => navigate(`/hr/view-department/${department.id}`)}
                        >
                          <Eye size={16} />
                        </button>

                        <button
                          title="Edit"
                          onClick={() => navigate(`/hr/edit-department/${department.id}`)}
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          title="Delete"
                          onClick={() => handleDelete(department.id)}
                        >
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
