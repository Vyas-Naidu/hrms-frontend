import { useEffect, useState } from "react";
//import { recruitmentApi } from "../../../services/api/recruitment.api";
import {
  recruitmentDashboardMock,
  recruitmentPipelineMock,
} from "../mockData";
import styles from "./RecruitmentDashboard.module.css";

const RecruitmentDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [pipeline, setPipeline] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

//   useEffect(() => {
//     const loadDashboard = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const [dashboardResponse, pipelineResponse] =
//           await Promise.all([
//             recruitmentApi.getDashboard(),
//             recruitmentApi.getPipeline(),
//           ]);

//         setDashboard(dashboardResponse.data);
//         setPipeline(pipelineResponse.data);
//       } catch (err) {
//         const message = err.response?.data?.message;

//         setError(
//           Array.isArray(message)
//             ? message.join(", ")
//             : message || "Failed to load recruitment dashboard."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadDashboard();
//   }, []);
useEffect(() => {
  setDashboard(recruitmentDashboardMock);
  setPipeline(recruitmentPipelineMock);
  setLoading(false);
}, []);

  if (loading) {
    return (
      <div className={styles.message}>
        Loading recruitment dashboard...
      </div>
    );
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  const metrics = [
    {
      label: "Open Job Openings",
      value: dashboard?.open_job_openings ?? 0,
    },
    {
      label: "Applications Received",
      value: dashboard?.applications_received ?? 0,
    },
    {
      label: "Shortlisted Candidates",
      value: dashboard?.shortlisted_candidates ?? 0,
    },
    {
      label: "Interviews Scheduled",
      value: dashboard?.interviews_scheduled ?? 0,
    },
    {
      label: "Selected Candidates",
      value: dashboard?.selected_candidates ?? 0,
    },
    {
      label: "Offers Sent",
      value: dashboard?.offers_sent ?? 0,
    },
    {
      label: "Offers Accepted",
      value: dashboard?.offers_accepted ?? 0,
    },
    {
      label: "Employees Joined",
      value: dashboard?.employees_joined ?? 0,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2>Recruitment Dashboard</h2>
          <p>Overview of the recruitment process.</p>
        </div>
      </div>

      <div className={styles.metricsGrid}>
        {metrics.map((metric) => (
          <div className={styles.card} key={metric.label}>
            <span className={styles.cardLabel}>
              {metric.label}
            </span>

            <strong className={styles.cardValue}>
              {metric.value}
            </strong>
          </div>
        ))}
      </div>

      <section className={styles.pipelineSection}>
        <h3>Recruitment Pipeline</h3>

        <div className={styles.pipeline}>
          {[
            "Applications",
            "Shortlisted",
            "Interviews",
            "Selected",
            "Offers",
            "Accepted",
            "Joined",
          ].map((stage) => {
            const key = stage
              .toLowerCase()
              .replace(/\s+/g, "_");

            return (
              <div className={styles.pipelineCard} key={stage}>
                <span>{stage}</span>
                <strong>{pipeline?.[key] ?? 0}</strong>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default RecruitmentDashboard;