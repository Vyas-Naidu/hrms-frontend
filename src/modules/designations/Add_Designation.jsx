import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ArrowLeft } from "lucide-react";
import styles from "./Add_Designation.module.css";

import { designationApi } from "../../services/api/designation.api";

// const DESIGNATION_API = "http://localhost:3000/designations";
const DEPARTMENT_API = "http://localhost:3000/departments";

const designations = [
  "Software Engineer",
  "Associate Software Developer",
  "Senior Developer",
  "Team Lead",
  "Project Manager",
];

const Add_Designation = () => {
  const navigate = useNavigate();

  const [designation, setDesignation] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [departmentLoading, setDepartmentLoading] = useState(true);

  // Get departments from database
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

  const handleSave = async (e) => {
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
      setLoading(true);

      const response = await designationApi.create({
        designationName: designation,
        department_id: Number(departmentId),
      });

      alert("Designation added successfully!");

      navigate("/hr/designations");
    } catch (error) {
      console.error("Error creating designation:", error);

      const message =
        error?.response?.data?.message ||
        "Failed to create designation";

      alert(
        Array.isArray(message)
          ? message.join(", ")
          : message
      );
    } finally {
      setLoading(false);
    }
  };
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

      <h2>Add Designation</h2>

      <form
        className={styles.designationForm}
        onSubmit={handleSave}
      >

        {/* SELECT DEPARTMENT */}
        <div className={styles.formGroup}>
        <label>Select Department</label>

        <div className={styles.selectWrapper}>
          <select
            value={departmentId}
            onChange={(e) => setDepartmentId(e.target.value)}
            disabled={departmentLoading}
          >
            <option value="">
              {departmentLoading
                ? "Loading departments..."
                : "Select Department"}
            </option>

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
        </div>

        {/* SELECT DESIGNATION */}
        <div className={styles.formGroup}>
        <label>Select Designation</label>

        <div className={styles.selectWrapper}>
          <select
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
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
        </div>
        {/* SAVE */}
        <button
          type="submit"
          className={styles.saveBtn}
          disabled={loading || departmentLoading}
        >
          {loading ? "Saving..." : "Save Designation"}
        </button>

      </form>
    </div>
  );
};

export default Add_Designation;