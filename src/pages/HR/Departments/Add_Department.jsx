import { departmentApi } from "../../../services/api/department.api";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Add_Department.module.css";

const Add_Department = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    departmentName: "",
    departmentCode: "",
    designations: [],
  });

  const [designationInput, setDesignationInput] = useState("");

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:3000/departments/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch department");
        }

        return response.json();
      })
      .then((data) => {
        console.log("Department from backend:", data);

        setFormData({
          departmentName: data.department_name,
          departmentCode: data.department_code,
          designations: [],
        });
      })
      .catch((error) => {
        console.error("Error fetching department:", error);
      });
  }, [id]);
  // ==========================
  // HANDLE INPUT CHANGE
  // ==========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  // ==========================
  // ADD DESIGNATION
  // ==========================

  const addDesignation = () => {
    const designation = designationInput.trim();

    if (!designation) {
      return;
    }

    // Prevent duplicate designations
    const alreadyExists = formData.designations.some(
      (item) =>
        item.toLowerCase() === designation.toLowerCase()
    );

    if (alreadyExists) {
      alert("This designation already exists.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      designations: [
        ...prev.designations,
        designation,
      ],
    }));


    setDesignationInput("");
  };


  // ==========================
  // REMOVE DESIGNATION
  // ==========================

  const removeDesignation = (index) => {
    setFormData((prev) => ({
      ...prev,
      designations: prev.designations.filter(
        (_, i) => i !== index
      ),
    }));
  };


  // ==========================
  // SUBMIT
  // ==========================
  
    const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.departmentName.trim()) {
    alert("Please enter department name");
    return;
  }

  if (!formData.departmentCode.trim()) {
    alert("Please enter department code");
    return;
  }

  try {
    let response;

    if (id) {
      response = await departmentApi.update(id, {
        departmentName: formData.departmentName.trim(),
        departmentCode: formData.departmentCode.trim(),
      });
    } else {
      response = await departmentApi.create({
        departmentName: formData.departmentName.trim(),
        departmentCode: formData.departmentCode.trim(),
        designations: formData.designations,
      });
    }

    console.log("Backend response:", response.data);

    alert(
      id
        ? "Department updated successfully!"
        : "Department created successfully!"
    );

    navigate("/hr/departments");
} catch (error) {
    const data = error?.response?.data;

    let message = "Failed to save department";

    if (Array.isArray(data?.message)) {
      message = data.message.join(", ");
    } else if (data?.message) {
      message = data.message;
    } else if (data?.error) {
      message = data.error;
    }

    alert(message);
  }
  
};


  // ==========================
  // JSX
  // ==========================

  return (
    <div className={styles["add-department-page"]}>

      <div className={styles["department-form-container"]}>

        {/* ==========================
            HEADER
        ========================== */}

        <div className={styles["department-form-header"]}>

          <h2>Add Department</h2>

          <p>
            Create a department and add its designations.
          </p>

        </div>


        {/* ==========================
            FORM
        ========================== */}

        <form onSubmit={handleSubmit}>


          {/* ==========================
              DEPARTMENT NAME
          ========================== */}

          <div className={styles["form-field"]}>

            <label htmlFor="department_name">
              Department Name
            </label>

            <input
              id="departmentName"
              type="text"
              name="departmentName"
              placeholder="Enter department name"
              value={formData.departmentName}
              onChange={handleChange}
            />
          </div>


          {/* ==========================
              DEPARTMENT CODE
          ========================== */}

          <div className={styles["form-field"]}>

            <label htmlFor="department_code">
              Department Code
            </label>
            <input
              id="departmentCode"
              type="text"
              name="departmentCode"
              placeholder="Enter department code"
              value={formData.departmentCode}
              onChange={handleChange}
            />

          </div>


          {/* ==========================
              DESIGNATIONS
          ========================== */}
<div className={styles["designation-field"]}>

  <label htmlFor="designationInput">
    Designations
  </label>

  <div className={styles["designation-input-row"]}>

    <input
      id="designationInput"
      type="text"
      placeholder="Enter designation"
      value={designationInput}
      onChange={(e) => setDesignationInput(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          addDesignation();
        }
      }}
    />

    <button
      type="button"
      className={styles["add-designation-btn"]}
      onClick={addDesignation}
    >
      + Add
    </button>

  </div>

  {formData.designations.length > 0 && (
    <div className={styles["designation-list"]}>
      {formData.designations.map((designation, index) => (
        <div
          className={styles["designation-item"]}
          key={`${designation}-${index}`}
        >
          <input
            type="text"
            value={designation}
            readOnly
          />

          <button
            type="button"
            className={styles["remove-designation-btn"]}
            onClick={() => removeDesignation(index)}
            title="Remove designation"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )}

</div>


          {/* ==========================
              ACTION BUTTONS
          ========================== */}

          <div
            className={
              styles["department-actions"]
            }
          >

            {/* SAVE LEFT */}

            <button
              type="submit"
              className={
                styles["save-button"]
              }
            >
              Save Department
            </button>


            {/* CANCEL RIGHT */}

            <button
              type="button"
              className={
                styles["cancel-button"]
              }
              onClick={() =>
                navigate("/hr/departments")
              }
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default Add_Department;