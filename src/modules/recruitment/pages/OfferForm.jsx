import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { applicantApi } from "../../../services/api/applicant.api";
import { recruitmentApi } from "../../../services/api/recruitment.api";
import { offerApi } from "../../../services/api/offer.api";
import styles from "./OfferForm.module.css";

const initialForm = {
  applicant_id: "",
  position: "",
  salary: "",
  joining_date: "",
  location: "",
  validity: "",
  employment_type: "",
};

const OfferForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [applicants, setApplicants] = useState([]);
  const [jobOpenings, setJobOpenings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [applicantsResponse, openingsResponse] =
          await Promise.all([
            applicantApi.getAll(),
            recruitmentApi.getJobOpenings(),
          ]);

        setApplicants(applicantsResponse.data || []);
        setJobOpenings(openingsResponse.data || []);
      } catch (err) {
        const message = err.response?.data?.message;

        setError(
          Array.isArray(message)
            ? message.join(", ")
            : message || "Failed to load data."
        );
      } finally {
        setInitialLoading(false);
      }
    };

    loadData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!form.applicant_id) {
      setError("Please select a candidate.");
      return;
    }

    if (!form.position) {
      setError("Please select a position.");
      return;
    }

    if (!form.salary) {
      setError("Please enter salary.");
      return;
    }

    if (!form.joining_date) {
      setError("Please select joining date.");
      return;
    }

    if (!form.validity) {
      setError("Please select offer validity date.");
      return;
    }

    if (!form.employment_type) {
      setError("Please select employment type.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        ...form,
        applicant_id: Number(form.applicant_id),
        salary: Number(form.salary),
      };

      await offerApi.create(payload);

      navigate("/hr/recruitment/offers");
    } catch (err) {
      const message = err.response?.data?.message;

      setError(
        Array.isArray(message)
          ? message.join(", ")
          : message || "Failed to create offer."
      );
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <div className={styles.message}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Create Offer</h2>
        <p>Create a job offer for a selected candidate.</p>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label htmlFor="applicant_id">Candidate *</label>

            <select
              id="applicant_id"
              name="applicant_id"
              value={form.applicant_id}
              onChange={handleChange}
            >
              <option value="">Select candidate</option>

              {applicants.map((applicant) => (
                <option key={applicant.id} value={applicant.id}>
                  {applicant.applicant_name} - {applicant.email}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="position">Position *</label>

            <select
              id="position"
              name="position"
              value={form.position}
              onChange={handleChange}
            >
              <option value="">Select position</option>

              {jobOpenings.map((opening) => (
                <option
                  key={opening.id}
                  value={opening.job_title}
                >
                  {opening.job_title}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="salary">Salary *</label>

            <input
              id="salary"
              type="number"
              name="salary"
              value={form.salary}
              onChange={handleChange}
              min="0"
              placeholder="Enter salary"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="joining_date">
              Joining Date *
            </label>

            <input
              id="joining_date"
              type="date"
              name="joining_date"
              value={form.joining_date}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="location">Location</label>

            <input
              id="location"
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Work location"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="validity">Offer Valid Until *</label>

            <input
              id="validity"
              type="date"
              name="validity"
              value={form.validity}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="employment_type">
              Employment Type *
            </label>

            <select
              id="employment_type"
              name="employment_type"
              value={form.employment_type}
              onChange={handleChange}
            >
              <option value="">Select type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => navigate("/hr/recruitment/offers")}
          >
            Cancel
          </button>

          <button
            type="submit"
            className={styles.primaryButton}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Offer"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OfferForm;