import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { departmentApi } from "../../../services/api/department.api";
import { designationApi } from "../../../services/api/designation.api";
import { recruitmentApi } from "../../../services/api/recruitment.api";

import styles from "./JobOpeningForm.module.css";

const initialFormData = {
  job_title: "",
  department_id: "",
  designation_id: "",
  num_vacancies: 1,
  employment_type: "",
  experience_required: "",
  qualification: "",
  required_skills: "",
  salary_min: "",
  salary_max: "",
  job_description: "",
  location: "",
  closing_date: "",
  status: "Open",
};

const JobOpeningForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState(initialFormData);
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadFormData = async () => {
      try {
        setLoading(true);
        setError("");

        const [departmentResponse, designationResponse] = await Promise.all([
          departmentApi.getAll(),
          designationApi.getAll(),
        ]);

        setDepartments(departmentResponse.data ?? []);
        setDesignations(designationResponse.data ?? []);

        if (isEditMode) {
          const response = await recruitmentApi.getJobOpeningById(id);
          const opening = response.data;

          setFormData({
            job_title: opening.job_title ?? "",
            department_id: opening.department_id ?? "",
            designation_id: opening.designation_id ?? "",
            num_vacancies: opening.num_vacancies ?? 1,
            employment_type: opening.employment_type ?? "",
            experience_required: opening.experience_required ?? "",
            qualification: opening.qualification ?? "",
            required_skills: opening.required_skills ?? "",
            salary_min: opening.salary_min ?? "",
            salary_max: opening.salary_max ?? "",
            job_description: opening.job_description ?? "",
            location: opening.location ?? "",
            closing_date: opening.closing_date
              ? opening.closing_date.slice(0, 10)
              : "",
            status: opening.status ?? "Open",
          });
        }
      } catch (err) {
        console.error("Failed to load job opening form:", err);
        setError("Failed to load job opening data.");
      } finally {
        setLoading(false);
      }
    };

    loadFormData();
  }, [id, isEditMode]);

  const filteredDesignations = useMemo(() => {
    if (!formData.department_id) {
      return [];
    }

    return designations.filter(
      (designation) =>
        Number(designation.department_id) === Number(formData.department_id)
    );
  }, [designations, formData.department_id]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (name === "department_id") {
      setFormData((previous) => ({
        ...previous,
        department_id: value,
        designation_id: "",
      }));
    }
  };

  const getErrorMessage = (err, fallback) => {
    const data = err?.response?.data;

    if (Array.isArray(data?.message)) {
      return data.message.join(", ");
    }

    if (data?.message) {
      return data.message;
    }

    if (data?.error) {
      return data.error;
    }

    return fallback;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!formData.job_title.trim()) {
      setError("Job title is required.");
      return;
    }

    if (!formData.department_id) {
      setError("Department is required.");
      return;
    }

    if (!formData.designation_id) {
      setError("Designation is required.");
      return;
    }

    if (!formData.employment_type) {
      setError("Employment type is required.");
      return;
    }

    if (!formData.num_vacancies || Number(formData.num_vacancies) < 1) {
      setError("Number of vacancies must be at least 1.");
      return;
    }

    if (
      formData.salary_min !== "" &&
      formData.salary_max !== "" &&
      Number(formData.salary_min) > Number(formData.salary_max)
    ) {
      setError("Minimum salary cannot be greater than maximum salary.");
      return;
    }

    const payload = {
      ...formData,
      department_id: Number(formData.department_id),
      designation_id: Number(formData.designation_id),
      num_vacancies: Number(formData.num_vacancies),
      salary_min:
        formData.salary_min === "" ? null : Number(formData.salary_min),
      salary_max:
        formData.salary_max === "" ? null : Number(formData.salary_max),
    };

    try {
      setSubmitting(true);

      if (isEditMode) {
        await recruitmentApi.updateJobOpening(id, payload);
      } else {
        await recruitmentApi.createJobOpening(payload);
      }

      navigate("/hr/recruitment/job-openings");
    } catch (err) {
      console.error("Failed to save job opening:", err);
      setError(
        getErrorMessage(err, "Failed to save job opening. Please try again.")
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1>{isEditMode ? "Edit Job Opening" : "Create Job Opening"}</h1>
          <p>
            {isEditMode
              ? "Update the job opening details."
              : "Create a new job opening for recruitment."}
          </p>
        </div>

        <button
          type="button"
          className={styles.secondaryButton}
          onClick={() => navigate("/hr/recruitment/job-openings")}
        >
          Back
        </button>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label htmlFor="job_title">Job Title *</label>
            <input
              id="job_title"
              name="job_title"
              value={formData.job_title}
              onChange={handleChange}
              placeholder="e.g. Frontend Developer"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="department_id">Department *</label>
            <select
              id="department_id"
              name="department_id"
              value={formData.department_id}
              onChange={handleChange}
            >
              <option value="">Select department</option>

              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.department_name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="designation_id">Designation *</label>
            <select
              id="designation_id"
              name="designation_id"
              value={formData.designation_id}
              onChange={handleChange}
              disabled={!formData.department_id}
            >
              <option value="">Select designation</option>

              {filteredDesignations.map((designation) => (
                <option key={designation.id} value={designation.id}>
                  {designation.designation_name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="num_vacancies">Number of Vacancies *</label>
            <input
              id="num_vacancies"
              name="num_vacancies"
              type="number"
              min="1"
              value={formData.num_vacancies}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="employment_type">Employment Type *</label>
            <select
              id="employment_type"
              name="employment_type"
              value={formData.employment_type}
              onChange={handleChange}
            >
              <option value="">Select employment type</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="experience_required">
              Experience Required
            </label>
            <input
              id="experience_required"
              name="experience_required"
              value={formData.experience_required}
              onChange={handleChange}
              placeholder="e.g. 0-2 years"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="qualification">Qualification</label>
            <input
              id="qualification"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              placeholder="e.g. B.Tech / B.E."
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="location">Location</label>
            <input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Hyderabad"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="salary_min">Minimum Salary</label>
            <input
              id="salary_min"
              name="salary_min"
              type="number"
              min="0"
              value={formData.salary_min}
              onChange={handleChange}
              placeholder="e.g. 400000"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="salary_max">Maximum Salary</label>
            <input
              id="salary_max"
              name="salary_max"
              type="number"
              min="0"
              value={formData.salary_max}
              onChange={handleChange}
              placeholder="e.g. 600000"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="closing_date">Closing Date</label>
            <input
              id="closing_date"
              name="closing_date"
              type="date"
              value={formData.closing_date}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="required_skills">Required Skills</label>
          <textarea
            id="required_skills"
            name="required_skills"
            rows="3"
            value={formData.required_skills}
            onChange={handleChange}
            placeholder="e.g. React, JavaScript, HTML, CSS"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="job_description">Job Description</label>
          <textarea
            id="job_description"
            name="job_description"
            rows="6"
            value={formData.job_description}
            onChange={handleChange}
            placeholder="Describe the role, responsibilities and requirements..."
          />
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => navigate("/hr/recruitment/job-openings")}
            disabled={submitting}
          >
            Cancel
          </button>

          <button
            type="submit"
            className={styles.primaryButton}
            disabled={submitting}
          >
            {submitting
              ? "Saving..."
              : isEditMode
                ? "Update Job Opening"
                : "Create Job Opening"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobOpeningForm;