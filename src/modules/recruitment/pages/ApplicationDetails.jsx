import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { applicantApi } from "../../../services/api/applicant.api";

import styles from "./ApplicationDetails.module.css";

const ApplicationDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchApplication = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await applicantApi.getById(id);

      setApplication(response.data);
    } catch (err) {
      console.error("Failed to fetch application:", err);
      setError("Failed to load application.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplication();
  }, [id]);

  const updateStatus = async (status) => {
    try {
      setSaving(true);
      setError("");

      const response = await applicantApi.update(id, {
        status,
      });

      setApplication(response.data ?? { ...application, status });
    } catch (err) {
      console.error("Failed to update application status:", err);

      const data = err?.response?.data;

      if (Array.isArray(data?.message)) {
        setError(data.message.join(", "));
      } else if (data?.message) {
        setError(data.message);
      } else {
        setError("Failed to update application status.");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading application...</div>;
  }

  if (!application) {
    return (
      <div className={styles.page}>
        <div className={styles.error}>
          {error || "Application not found."}
        </div>

        <button
          type="button"
          className={styles.secondaryButton}
          onClick={() => navigate("/hr/recruitment/applications")}
        >
          Back to Applications
        </button>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1>{application.applicant_name}</h1>
          <p>Candidate Application</p>
        </div>

        <button
          type="button"
          className={styles.secondaryButton}
          onClick={() => navigate("/hr/recruitment/applications")}
        >
          Back
        </button>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.content}>
        <section className={styles.card}>
          <h2>Personal Information</h2>

          <div className={styles.infoGrid}>
            <div>
              <span>Name</span>
              <strong>{application.applicant_name || "-"}</strong>
            </div>

            <div>
              <span>Email</span>
              <strong>{application.email || "-"}</strong>
            </div>

            <div>
              <span>Phone</span>
              <strong>{application.phone || "-"}</strong>
            </div>
          </div>
        </section>

        <section className={styles.card}>
          <h2>Professional Information</h2>

          <div className={styles.infoGrid}>
            <div>
              <span>Current Company</span>
              <strong>{application.current_company || "-"}</strong>
            </div>

            <div>
              <span>Current Salary</span>
              <strong>
                {application.current_salary != null
                  ? application.current_salary
                  : "-"}
              </strong>
            </div>

            <div>
              <span>Expected Salary</span>
              <strong>
                {application.expected_salary != null
                  ? application.expected_salary
                  : "-"}
              </strong>
            </div>

            <div>
              <span>Experience</span>
              <strong>
                {application.experience_years != null
                  ? `${application.experience_years} years`
                  : "-"}
              </strong>
            </div>

            <div>
              <span>Notice Period</span>
              <strong>
                {application.notice_period_days != null
                  ? `${application.notice_period_days} days`
                  : "-"}
              </strong>
            </div>
          </div>
        </section>

        <section className={styles.card}>
          <h2>Recruitment Information</h2>

          <div className={styles.infoGrid}>
            <div>
              <span>Source</span>
              <strong>{application.source || "-"}</strong>
            </div>

            <div>
              <span>Applied On</span>
              <strong>
                {application.applied_at
                  ? new Date(application.applied_at).toLocaleDateString()
                  : "-"}
              </strong>
            </div>

            <div>
              <span>Current Status</span>
              <strong>{application.status || "-"}</strong>
            </div>
          </div>
        </section>

        <section className={styles.card}>
          <h2>Documents</h2>

          {application.resume_url ? (
            <a
              href={application.resume_url}
              target="_blank"
              rel="noreferrer"
              className={styles.resumeLink}
            >
              View Resume
            </a>
          ) : (
            <p>No resume available.</p>
          )}
        </section>

        <section className={styles.screeningCard}>
          <div>
            <h2>Screening Decision</h2>
            <p>
              Update the candidate's screening status after reviewing the
              application.
            </p>
          </div>

          <div className={styles.screeningActions}>
            <button
              type="button"
              className={styles.shortlistButton}
              disabled={saving}
              onClick={() => updateStatus("Shortlisted")}
            >
              Shortlist
            </button>

            <button
              type="button"
              className={styles.holdButton}
              disabled={saving}
              onClick={() => updateStatus("Hold")}
            >
              Hold
            </button>

            <button
              type="button"
              className={styles.rejectButton}
              disabled={saving}
              onClick={() => updateStatus("Rejected")}
            >
              Reject
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ApplicationDetails;