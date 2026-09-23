import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { interviewsMock } from "../mockData";
import { interviewApi } from "../../../services/api/interview.api";
import styles from "./Interviews.module.css";

const Interviews = () => {
  const navigate = useNavigate();

  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadInterviews = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await interviewApi.getAll();
      setInterviews(response.data || []);
    } catch (err) {
      console.error("Failed to load interviews:", err);
      setInterviews(interviewsMock);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInterviews();
  }, []);

  const handleCancel = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this interview?",
    );

    if (!confirmed) return;

    try {
      await interviewApi.cancel(id);
      await loadInterviews();
    } catch (err) {
      const message = err.response?.data?.message;

      setError(
        Array.isArray(message)
          ? message.join(", ")
          : message || "Failed to cancel interview.",
      );
    }
  };

  if (loading) {
    return <div className={styles.message}>Loading interviews...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2>Interviews</h2>
          <p>Schedule and manage candidate interviews.</p>
        </div>

        <button
          className={styles.primaryButton}
          onClick={() => navigate("/hr/recruitment/interviews/add")}
        >
          Schedule Interview
        </button>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      {interviews.length === 0 ? (
        <div className={styles.empty}>
          <h3>No interviews found</h3>
          <p>Schedule an interview for a shortlisted candidate.</p>
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Round</th>
                <th>Type</th>
                <th>Date</th>
                <th>Time</th>
                <th>Interviewer</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {interviews.map((interview) => (
                <tr key={interview.id}>
                  <td>
                    {interview.applicant_name ||
                      interview.candidate_name ||
                      "-"}
                  </td>

                  <td>{interview.interview_round || "-"}</td>

                  <td>{interview.interview_type || "-"}</td>

                  <td>
                    {interview.interview_date
                      ? new Date(interview.interview_date).toLocaleDateString()
                      : "-"}
                  </td>

                  <td>{interview.interview_time || "-"}</td>

                  <td>
                    {interview.interviewer_name ||
                      interview.interviewer_id ||
                      "-"}
                  </td>

                  <td>
                    <span className={styles.status}>
                      {interview.status || "-"}
                    </span>
                  </td>

                  <td>
                    <div className={styles.actions}>
                      <button
                        className={styles.viewButton}
                        onClick={() =>
                          navigate(`/hr/recruitment/interviews/${interview.id}`)
                        }
                      >
                        View
                      </button>

                      {interview.status !== "Cancelled" && (
                        <button
                          className={styles.cancelButton}
                          onClick={() => handleCancel(interview.id)}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Interviews;
