import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { interviewApi } from "../../../services/api/interview.api";
import styles from "./InterviewDetails.module.css";

const InterviewDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [interview, setInterview] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [feedbackId, setFeedbackId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savingFeedback, setSavingFeedback] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    technical: "",
    communication: "",
    problem_solving: "",
    leadership: "",
    overall_rating: "",
    recommendation: "",
    comments: "",
  });

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const interviewResponse = await interviewApi.getById(id);
      setInterview(interviewResponse.data);

      try {
        const feedbackResponse = await interviewApi.getFeedback(id);

        const data = feedbackResponse.data;

        if (data) {
          const existingFeedback = Array.isArray(data) ? data[0] : data;

          if (existingFeedback) {
            setFeedback(existingFeedback);
            setFeedbackId(existingFeedback.id);

            setForm({
              technical: existingFeedback.technical ?? "",
              communication: existingFeedback.communication ?? "",
              problem_solving:
                existingFeedback.problem_solving ?? "",
              leadership: existingFeedback.leadership ?? "",
              overall_rating:
                existingFeedback.overall_rating ?? "",
              recommendation:
                existingFeedback.recommendation ?? "",
              comments: existingFeedback.comments ?? "",
            });
          }
        }
      } catch {
        // No feedback yet.
      }
    } catch (err) {
      const message = err.response?.data?.message;

      setError(
        Array.isArray(message)
          ? message.join(", ")
          : message || "Failed to load interview."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleFeedbackSubmit = async (event) => {
    event.preventDefault();

    try {
      setSavingFeedback(true);
      setError("");

      const payload = {
        ...form,
        technical: Number(form.technical),
        communication: Number(form.communication),
        problem_solving: Number(form.problem_solving),
        leadership: Number(form.leadership),
        overall_rating: Number(form.overall_rating),
      };

      let response;

      if (feedbackId) {
        response = await interviewApi.updateFeedback(
          feedbackId,
          payload
        );
      } else {
        response = await interviewApi.createFeedback(id, payload);
      }

      setFeedback(response.data);
      setFeedbackId(response.data?.id || feedbackId);

      alert(
        feedbackId
          ? "Feedback updated successfully."
          : "Feedback submitted successfully."
      );

      await loadData();
    } catch (err) {
      const message = err.response?.data?.message;

      setError(
        Array.isArray(message)
          ? message.join(", ")
          : message || "Failed to save feedback."
      );
    } finally {
      setSavingFeedback(false);
    }
  };

  if (loading) {
    return <div className={styles.message}>Loading...</div>;
  }

  if (!interview) {
    return <div className={styles.message}>Interview not found.</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2>Interview Details</h2>
          <p>Review interview information and submit feedback.</p>
        </div>

        <button
          className={styles.secondaryButton}
          onClick={() =>
            navigate(`/hr/recruitment/interviews/${id}/edit`)
          }
        >
          Edit Interview
        </button>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <section className={styles.card}>
        <h3>Interview Information</h3>

        <div className={styles.detailsGrid}>
          <div>
            <span>Candidate</span>
            <strong>
              {interview.applicant_name ||
                interview.candidate_name ||
                "-"}
            </strong>
          </div>

          <div>
            <span>Job Opening</span>
            <strong>
              {interview.job_title || "-"}
            </strong>
          </div>

          <div>
            <span>Interview Round</span>
            <strong>
              {interview.interview_round || "-"}
            </strong>
          </div>

          <div>
            <span>Interview Type</span>
            <strong>
              {interview.interview_type || "-"}
            </strong>
          </div>

          <div>
            <span>Date</span>
            <strong>
              {interview.interview_date
                ? new Date(
                    interview.interview_date
                  ).toLocaleDateString()
                : "-"}
            </strong>
          </div>

          <div>
            <span>Time</span>
            <strong>
              {interview.interview_time || "-"}
            </strong>
          </div>

          <div>
            <span>Venue</span>
            <strong>{interview.venue || "-"}</strong>
          </div>

          <div>
            <span>Meeting Link</span>

            {interview.meeting_link ? (
              <a
                href={interview.meeting_link}
                target="_blank"
                rel="noreferrer"
              >
                Join Meeting
              </a>
            ) : (
              <strong>-</strong>
            )}
          </div>

          <div>
            <span>Interviewer</span>
            <strong>
              {interview.interviewer_name ||
                interview.interviewer_id ||
                "-"}
            </strong>
          </div>

          <div>
            <span>Status</span>
            <strong>{interview.status || "-"}</strong>
          </div>
        </div>
      </section>

      <section className={styles.card}>
        <h3>{feedback ? "Interview Feedback" : "Submit Feedback"}</h3>

        <form onSubmit={handleFeedbackSubmit}>
          <div className={styles.feedbackGrid}>
            <div className={styles.field}>
              <label htmlFor="technical">Technical *</label>

              <select
                id="technical"
                name="technical"
                value={form.technical}
                onChange={handleChange}
                required
              >
                <option value="">Select rating</option>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="communication">
                Communication *
              </label>

              <select
                id="communication"
                name="communication"
                value={form.communication}
                onChange={handleChange}
                required
              >
                <option value="">Select rating</option>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="problem_solving">
                Problem Solving *
              </label>

              <select
                id="problem_solving"
                name="problem_solving"
                value={form.problem_solving}
                onChange={handleChange}
                required
              >
                <option value="">Select rating</option>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="leadership">Leadership *</label>

              <select
                id="leadership"
                name="leadership"
                value={form.leadership}
                onChange={handleChange}
                required
              >
                <option value="">Select rating</option>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="overall_rating">
                Overall Rating *
              </label>

              <select
                id="overall_rating"
                name="overall_rating"
                value={form.overall_rating}
                onChange={handleChange}
                required
              >
                <option value="">Select rating</option>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="recommendation">
                Recommendation *
              </label>

              <select
                id="recommendation"
                name="recommendation"
                value={form.recommendation}
                onChange={handleChange}
                required
              >
                <option value="">Select recommendation</option>
                <option value="Recommended">Recommended</option>
                <option value="Hold">Hold</option>
                <option value="Reject">Reject</option>
                <option value="Second Round Required">
                  Second Round Required
                </option>
              </select>
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="comments">Comments</label>

            <textarea
              id="comments"
              name="comments"
              value={form.comments}
              onChange={handleChange}
              rows="5"
              placeholder="Enter interview comments..."
            />
          </div>

          <div className={styles.actions}>
            <button
              type="submit"
              className={styles.primaryButton}
              disabled={savingFeedback}
            >
              {savingFeedback
                ? "Saving..."
                : feedback
                  ? "Update Feedback"
                  : "Submit Feedback"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default InterviewDetails;