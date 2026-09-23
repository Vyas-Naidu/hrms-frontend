import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { interviewApi } from "../../../services/api/interview.api";
import { applicantApi } from "../../../services/api/applicant.api";
import { recruitmentApi } from "../../../services/api/recruitment.api";
import styles from "./InterviewForm.module.css";

const initialForm = {
  applicant_id: "",
  job_opening_id: "",
  interview_round: "",
  interview_type: "",
  interview_date: "",
  interview_time: "",
  venue: "",
  meeting_link: "",
  interviewer_id: "",
  status: "Scheduled",
};

const InterviewForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [form, setForm] = useState(initialForm);
  const [applicants, setApplicants] = useState([]);
  const [jobOpenings, setJobOpenings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditMode);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setInitialLoading(true);

        const [applicantsResponse, openingsResponse] = await Promise.all([
          applicantApi.getAll(),
          recruitmentApi.getJobOpenings(),
        ]);

        const applicantData = applicantsResponse.data || [];
        const openingData = openingsResponse.data || [];

        setApplicants(applicantData);
        setJobOpenings(openingData);

        if (isEditMode) {
          const interviewResponse = await interviewApi.getById(id);

          setForm({
            ...initialForm,
            ...interviewResponse.data,
            applicant_id:
              interviewResponse.data.applicant_id?.toString() || "",
            job_opening_id:
              interviewResponse.data.job_opening_id?.toString() || "",
          });
        }
      } catch (err) {
        const message = err.response?.data?.message;

        setError(
          Array.isArray(message)
            ? message.join(", ")
            : message || "Failed to load interview data."
        );
      } finally {
        setInitialLoading(false);
      }
    };

    loadData();
  }, [id, isEditMode]);

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

    if (!form.job_opening_id) {
      setError("Please select a job opening.");
      return;
    }

    if (!form.interview_round) {
      setError("Please select an interview round.");
      return;
    }

    if (!form.interview_type) {
      setError("Please select an interview type.");
      return;
    }

    if (!form.interview_date) {
      setError("Please select an interview date.");
      return;
    }

    if (!form.interview_time) {
      setError("Please select an interview time.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        ...form,
        applicant_id: Number(form.applicant_id),
        job_opening_id: Number(form.job_opening_id),
        interviewer_id: form.interviewer_id
          ? Number(form.interviewer_id)
          : null,
      };

      if (isEditMode) {
        await interviewApi.update(id, payload);
      } else {
        await interviewApi.create(payload);
      }

      navigate("/hr/recruitment/management?tab=interviews");
    } catch (err) {
      const message = err.response?.data?.message;

      setError(
        Array.isArray(message)
          ? message.join(", ")
          : message || "Failed to save interview."
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
        <div>
          <h2>{isEditMode ? "Edit Interview" : "Schedule Interview"}</h2>
          <p>
            {isEditMode
              ? "Update interview details."
              : "Schedule an interview for a candidate."}
          </p>
        </div>
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
            <label htmlFor="job_opening_id">Job Opening *</label>

            <select
              id="job_opening_id"
              name="job_opening_id"
              value={form.job_opening_id}
              onChange={handleChange}
            >
              <option value="">Select job opening</option>

              {jobOpenings.map((opening) => (
                <option key={opening.id} value={opening.id}>
                  {opening.job_title}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="interview_round">Interview Round *</label>

            <select
              id="interview_round"
              name="interview_round"
              value={form.interview_round}
              onChange={handleChange}
            >
              <option value="">Select round</option>
              <option value="Round 1">Round 1</option>
              <option value="Round 2">Round 2</option>
              <option value="Round 3">Round 3</option>
              <option value="Final">Final</option>
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="interview_type">Interview Type *</label>

            <select
              id="interview_type"
              name="interview_type"
              value={form.interview_type}
              onChange={handleChange}
            >
              <option value="">Select type</option>
              <option value="HR">HR</option>
              <option value="Technical">Technical</option>
              <option value="Managerial">Managerial</option>
              <option value="Final">Final</option>
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="interview_date">Date *</label>

            <input
              id="interview_date"
              type="date"
              name="interview_date"
              value={form.interview_date}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="interview_time">Time *</label>

            <input
              id="interview_time"
              type="time"
              name="interview_time"
              value={form.interview_time}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="venue">Venue</label>

            <input
              id="venue"
              type="text"
              name="venue"
              value={form.venue}
              onChange={handleChange}
              placeholder="Interview venue"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="meeting_link">Meeting Link</label>

            <input
              id="meeting_link"
              type="url"
              name="meeting_link"
              value={form.meeting_link}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="interviewer_id">Interviewer ID</label>

            <input
              id="interviewer_id"
              type="number"
              name="interviewer_id"
              value={form.interviewer_id}
              onChange={handleChange}
              min="1"
              placeholder="Interviewer ID"
            />
          </div>

          {isEditMode && (
            <div className={styles.field}>
              <label htmlFor="status">Status</label>

              <select
                id="status"
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          )}
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => navigate("/hr/recruitment/management?tab=interviews")}
          >
            Cancel
          </button>

          <button
            type="submit"
            className={styles.primaryButton}
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : isEditMode
                ? "Update Interview"
                : "Schedule Interview"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InterviewForm;