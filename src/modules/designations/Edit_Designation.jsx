import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronDown, ArrowLeft } from "lucide-react";
import styles from "./Add_Designation.module.css";

import { designationApi } from "../../services/api/designation.api";

const DEPARTMENT_API = "http://localhost:3000/departments";

const designations = [
  "Software Engineer",
  "Associate Software Developer",
  "Senior Developer",
  "Team Lead",
  "Project Manager",
];

const Edit_Designation = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [designation, setDesignation] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [departments, setDepartments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [departmentLoading, setDepartmentLoading] = useState(true);

  // Get existing designation
  useEffect(() => {
    const fetchDesignation = async () => {
      try {
        setLoading(true);

        const response = await designationApi.getById(id);

        setDesignation(response.data.designation_name || "");
        setDepartmentId(
          response.data.department_id
            ? String(response.data.department_id)
            : ""
        );
      } catch (error) {
        console.error("Error fetching designation:", error);

        const message =
          error?.response?.data?.message ||
          "Unable to load designation";

        alert(
          Array.isArray(message)
            ? message.join(", ")
            : message
        );

        navigate("/hr/designations");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDesignation();
    }
  }, [id, navigate]);

  // Get departments
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setDepartmentLoading(true);

        const response = await fetch(DEPARTMENT_API);

        if (!response.ok) {
          throw new Error("Failed to fetch departments");
        }

        const data = await response.json();

        setDepartments(data);
      } catch (error) {
        console.error("Error fetching departments:", error);
        alert("Unable to load departments");
      } finally {
        setDepartmentLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  // Update designation
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!departmentId) {
      alert("Please select a department");
      return;
    }

    if (!designation) {
      alert("Please select a designation");
      return;
    }

    try {
      setSaving(true);

      const response = await designationApi.update(id, {
        designationName: designation,
      });

      alert("Designation updated successfully!");

      navigate("/hr/designations");
    } catch (error) {
      console.error("Error updating designation:", error);

      const message =
        error?.response?.data?.message ||
        "Failed to update designation";

      alert(
        Array.isArray(message)
          ? message.join(", ")
          : message
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading || departmentLoading) {
    return (
      <div className={styles.addDesignationPage}>
        <p>Loading designation...</p>
      </div>
    );
  }

  return (
    <div className={styles.addDesignationPage}>

      <button
        className={styles.backBtn}
        type="button"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <h2>Edit Designation</h2>

      <form
        className={styles.designationForm}
        onSubmit={handleUpdate}
      >

        {/* SELECT DEPARTMENT */}
        <label>Select Department</label>

        <div className={styles.selectWrapper}>
          <select
            value={departmentId}
            onChange={(e) => setDepartmentId(e.target.value)}
            disabled={saving}
          >
            <option value="">Select Department</option>

            {departments.map((department) => (
              <option
                key={department.id}
                value={department.id}
              >
                {department.department_name}
              </option>
            ))}
          </select>

          <ChevronDown size={18} />
        </div>

        {/* SELECT DESIGNATION */}
        <label>Select Designation</label>

        <div className={styles.selectWrapper}>
          <select
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            disabled={saving}
          >
            <option value="">Select Designation</option>

            {designations.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>

          <ChevronDown size={18} />
        </div>

        {/* UPDATE */}
        <button
          type="submit"
          className={styles.saveBtn}
          disabled={saving}
        >
          {saving ? "Updating..." : "Update Designation"}
        </button>

      </form>
    </div>
  );
};

export default Edit_Designation;