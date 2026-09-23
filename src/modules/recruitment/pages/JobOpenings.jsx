import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jobOpeningsMock } from "../mockData";
import { recruitmentApi } from "../../../services/api/recruitment.api";

import styles from "./JobOpenings.module.css";

const JobOpenings = () => {
  const navigate = useNavigate();

  const [jobOpenings, setJobOpenings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchJobOpenings = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await recruitmentApi.getJobOpenings();

      setJobOpenings(response.data ?? []);
    } catch (err) {
      console.error("Failed to fetch job openings:", err);
      setJobOpenings(jobOpeningsMock); // Fallback to mock data
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobOpenings();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job opening?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await recruitmentApi.deleteJobOpening(id);

      setJobOpenings((previous) =>
        previous.filter((job) => job.id !== id)
      );
    } catch (err) {
      console.error("Failed to delete job opening:", err);

      const data = err?.response?.data;

      if (Array.isArray(data?.message)) {
        setError(data.message.join(", "));
      } else if (data?.message) {
        setError(data.message);
      } else {
        setError("Failed to delete job opening.");
      }
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading job openings...</div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1>Job Openings</h1>
          <p>Manage and track your organization's job openings.</p>
        </div>

        <button
          type="button"
          className={styles.primaryButton}
          onClick={() => navigate("/hr/recruitment/job-openings/add")}
        >
          + Create Job Opening
        </button>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      {jobOpenings.length === 0 ? (
        <div className={styles.emptyState}>
          <h2>No Job Openings</h2>
          <p>Create your first job opening to start recruitment.</p>

          <button
            type="button"
            className={styles.primaryButton}
            onClick={() => navigate("/hr/recruitment/job-openings/add")}
          >
            Create Job Opening
          </button>
        </div>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Vacancies</th>
                <th>Employment Type</th>
                <th>Location</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {jobOpenings.map((job) => (
                <tr key={job.id}>
                  <td>{job.job_title}</td>

                  <td>
                    {job.department_name || job.department?.department_name || "-"}
                  </td>

                  <td>
                    {job.designation_name ||
                      job.designation?.designation_name ||
                      "-"}
                  </td>

                  <td>{job.num_vacancies}</td>

                  <td>{job.employment_type || "-"}</td>

                  <td>{job.location || "-"}</td>

                  <td>
                    <span className={styles.status}>{job.status || "-"}</span>
                  </td>

                  <td>
                    <div className={styles.actions}>
                      <button
                        type="button"
                        onClick={() =>
                          navigate(
                            `/hr/recruitment/job-openings/${job.id}/edit`
                          )
                        }
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className={styles.deleteButton}
                        onClick={() => handleDelete(job.id)}
                      >
                        Delete
                      </button>
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

export default JobOpenings;