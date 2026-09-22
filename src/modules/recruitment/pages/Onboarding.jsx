import { useEffect, useState } from "react";
import { applicantApi } from "../../../services/api/applicant.api";
import styles from "./Onboarding.module.css";

const Onboarding = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCandidates = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await applicantApi.getAll();

      const data = response.data || [];

      setCandidates(
        data.filter(
          (candidate) =>
            candidate.status === "Selected" ||
            candidate.status === "Offer Accepted" ||
            candidate.status === "Accepted"
        )
      );
    } catch (err) {
      const message = err.response?.data?.message;

      setError(
        Array.isArray(message)
          ? message.join(", ")
          : message || "Failed to load onboarding candidates."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCandidates();
  }, []);

  if (loading) {
    return (
      <div className={styles.message}>
        Loading onboarding candidates...
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2>Onboarding</h2>
          <p>Manage selected candidates through onboarding.</p>
        </div>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      {candidates.length === 0 ? (
        <div className={styles.empty}>
          <h3>No candidates ready for onboarding</h3>
          <p>
            Candidates will appear here after their offer is accepted.
          </p>
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Experience</th>
                <th>Joining Date</th>
                <th>Status</th>
                <th>Progress</th>
              </tr>
            </thead>

            <tbody>
              {candidates.map((candidate) => (
                <tr key={candidate.id}>
                  <td>{candidate.applicant_name || "-"}</td>

                  <td>{candidate.email || "-"}</td>

                  <td>{candidate.phone || "-"}</td>

                  <td>
                    {candidate.experience_years != null
                      ? `${candidate.experience_years} years`
                      : "-"}
                  </td>

                  <td>
                    {candidate.joining_date
                      ? new Date(
                          candidate.joining_date
                        ).toLocaleDateString()
                      : "-"}
                  </td>

                  <td>
                    <span className={styles.status}>
                      {candidate.status || "-"}
                    </span>
                  </td>

                  <td>
                    <span className={styles.progress}>
                      Not Started
                    </span>
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

export default Onboarding;