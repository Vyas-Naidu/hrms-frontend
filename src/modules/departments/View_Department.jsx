import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { departmentApi } from "../../services/api/department.api";
import styles from "./View_Department.module.css";

const View_Department = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDepartment = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await departmentApi.getById(id);

        setDepartment(response.data);
      } catch (error) {
        console.error("Failed to load department:", error);

        setError(
          error?.response?.data?.message ||
          "Failed to load department details."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadDepartment();
    }
  }, [id]);

  if (loading) {
    return (
      <div className={styles.viewDepartmentPage}>
        <p>Loading department...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.viewDepartmentPage}>
        <button
          className={styles.backBtn}
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <p className={styles.error}>{error}</p>
      </div>
    );
  }

  if (!department) {
    return (
      <div className={styles.viewDepartmentPage}>
        <p>Department not found.</p>
      </div>
    );
  }

  return (
    <div className={styles.viewDepartmentPage}>

      <button
        className={styles.backBtn}
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <h2>Department Details</h2>

      <div className={styles.detailsCard}>

        <div className={styles.detailRow}>
          <span>Department ID</span>
          <strong>{department.id}</strong>
        </div>

        <div className={styles.detailRow}>
          <span>Department Name</span>
          <strong>{department.department_name}</strong>
        </div>

        <div className={styles.detailRow}>
          <span>Department Code</span>
          <strong>{department.department_code}</strong>
        </div>

        <div className={styles.detailRow}>
          <span>Created At</span>
          <strong>
            {department.created_at
              ? new Date(department.created_at).toLocaleString()
              : "—"}
          </strong>
        </div>

        <div className={styles.detailRow}>
          <span>Updated At</span>
          <strong>
            {department.updated_at
              ? new Date(department.updated_at).toLocaleString()
              : "—"}
          </strong>
        </div>

      </div>

    </div>
  );
};

export default View_Department;