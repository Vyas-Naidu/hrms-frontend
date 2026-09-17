import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { designationApi } from "../../../services/api/designation.api";
import styles from "./View_Designation.module.css";

const View_Designation = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [designation, setDesignation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDesignation = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await designationApi.getById(id);

        setDesignation(response.data);
      } catch (error) {
        console.error("Failed to load designation:", error);

        setError(
          error?.response?.data?.message ||
            "Failed to load designation details."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadDesignation();
    }
  }, [id]);

  if (loading) {
    return (
      <div className={styles.viewDesignationPage}>
        <p>Loading designation...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.viewDesignationPage}>
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

  if (!designation) {
    return (
      <div className={styles.viewDesignationPage}>
        <p>Designation not found.</p>
      </div>
    );
  }

  return (
    <div className={styles.viewDesignationPage}>
      <button
        className={styles.backBtn}
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <h2>Designation Details</h2>

      <div className={styles.detailsCard}>
        <div className={styles.detailRow}>
          <span>Designation ID</span>
          <strong>{designation.id}</strong>
        </div>

        <div className={styles.detailRow}>
          <span>Designation Name</span>
          <strong>{designation.designation_name}</strong>
        </div>

        <div className={styles.detailRow}>
          <span>Department</span>
          <strong>
            {designation.department_name || "—"}
          </strong>
        </div>

        <div className={styles.detailRow}>
          <span>Department ID</span>
          <strong>
            {designation.department_id || "—"}
          </strong>
        </div>

        <div className={styles.detailRow}>
          <span>Created At</span>
          <strong>
            {designation.created_at
              ? new Date(
                  designation.created_at
                ).toLocaleString()
              : "—"}
          </strong>
        </div>

        <div className={styles.detailRow}>
          <span>Updated At</span>
          <strong>
            {designation.updated_at
              ? new Date(
                  designation.updated_at
                ).toLocaleString()
              : "—"}
          </strong>
        </div>
      </div>
    </div>
  );
};

export default View_Designation;