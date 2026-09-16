import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Code2 } from "lucide-react";

import styles from "./AssociateSoftwareDeveloper.module.css";

const AssociateSoftwareDeveloper = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    designationName: "Associate Software Developer",
    designationid: "",
    department: "Development",
    manager: "",
    location: "",
    description: "",
    status: "Active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    console.log(
      "Associate Software Developer:",
      formData
    );

    alert(
      "Associate Software Developer designation saved successfully!"
    );
  };

  return (
    <div className={styles.associateSoftwareDeveloperContent}>

      {/* HEADER */}
      <div className={styles.associateSoftwareDeveloperHeader}>

        <button
          type="button"
          className={styles.backBtn}
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <h1>Associate Software Developer</h1>

        <p>
          Add and manage Associate Software Developer
          designation information.
        </p>

      </div>

      {/* TITLE */}
      <div className={styles.designationTitle}>

        <div className={styles.designationIcon}>
          <Code2 size={30} />
        </div>

        <div>
          <h2>Associate Software Developer</h2>

          <p>
            Designation Information
          </p>
        </div>

      </div>

      {/* FORM */}
      <div className={styles.designationFormCard}>

        <div className={styles.formGrid}>

          {/* DESIGNATION NAME */}
          <div className={styles.formGroup}>

            <label>
              Designation Name
            </label>

            <input
              type="text"
              name="designationName"
              value={formData.designationName}
              readOnly
            />

          </div>

          {/* DESIGNATION CODE */}
          <div className={styles.formGroup}>

            <label>
              Designation id
            </label>

            <input
              type="text"
              name="designationid"
              placeholder="Enter designation id"
              value={formData.designationid}
              onChange={handleChange}
            />

          </div>

          {/* DEPARTMENT */}
          <div className={styles.formGroup}>

            <label>
              Department
            </label>

            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
            >
              <option value="Development">
                Development
              </option>

              <option value="Testing">
                Testing
              </option>

              <option value="DevOps">
                DevOps
              </option>

              <option value="HR">
                HR
              </option>

              <option value="Sales">
                Sales
              </option>

              <option value="Finance">
                Finance
              </option>
            </select>

          </div>

          {/* MANAGER */}
          <div className={styles.formGroup}>

            <label>
              Manager
            </label>

            <input
              type="text"
              name="manager"
              placeholder="Enter manager name"
              value={formData.manager}
              onChange={handleChange}
            />

          </div>

          {/* LOCATION */}
          <div className={styles.formGroup}>

            <label>
              Location
            </label>

            <input
              type="text"
              name="location"
              placeholder="Enter location"
              value={formData.location}
              onChange={handleChange}
            />

          </div>

          {/* STATUS */}
          <div className={styles.formGroup}>

            <label>
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>
            </select>

          </div>

          {/* DESCRIPTION */}
          <div className={`${styles.formGroup} ${styles.fullWidth}`}>

            <label>
              Description
            </label>

            <textarea
              name="description"
              rows="4"
              placeholder="Enter Associate Software Developer designation description"
              value={formData.description}
              onChange={handleChange}
            />

          </div>

        </div>

        {/* ACTIONS */}
        <div className={styles.formActions}>

          <button
            type="button"
            className={styles.saveBtn}
            onClick={handleSave}
          >
            Save Associate Software Developer
          </button>

        </div>

      </div>

    </div>
  );
};

export default AssociateSoftwareDeveloper;