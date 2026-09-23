import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {applicationsMock} from "../mockData";
import { applicantApi } from "../../../services/api/applicant.api";

import styles from "./Applications.module.css";

const Applications = () => {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await applicantApi.getAll();

      setApplications(response.data ?? []);
    } catch (err) {
      console.error("Failed to fetch applications:", err);
      setApplications(applicationsMock); // Fallback to mock data
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const filteredApplications = applications.filter((application) => {
    const candidateName = application.applicant_name?.toLowerCase() ?? "";
    const company = application.current_company?.toLowerCase() ?? "";
    const searchValue = search.toLowerCase();

    const matchesSearch =
      candidateName.includes(searchValue) ||
      company.includes(searchValue);

    const matchesStatus =
      statusFilter === "All" ||
      application.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return <div className={styles.loading}>Loading applications...</div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1>Applications</h1>
          <p>Review and manage candidate applications.</p>
        </div>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.filters}>
        <input
          type="search"
          placeholder="Search candidate or company..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Applied">Applied</option>
          <option value="Shortlisted">Shortlisted</option>
          <option value="Rejected">Rejected</option>
          <option value="Hold">Hold</option>
        </select>
      </div>

      {filteredApplications.length === 0 ? (
        <div className={styles.emptyState}>
          <h2>No Applications</h2>
          <p>No candidate applications match your filters.</p>
        </div>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Email</th>
                <th>Experience</th>
                <th>Current Company</th>
                <th>Source</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredApplications.map((application) => (
                <tr key={application.id}>
                  <td>{application.applicant_name}</td>
                  <td>{application.email || "-"}</td>
                  <td>
                    {application.experience_years != null
                      ? `${application.experience_years} years`
                      : "-"}
                  </td>
                  <td>{application.current_company || "-"}</td>
                  <td>{application.source || "-"}</td>
                  <td>
                    <span className={styles.status}>
                      {application.status || "-"}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className={styles.viewButton}
                      onClick={() =>
                        navigate(
                          `/hr/recruitment/applications/${application.id}`
                        )
                      }
                    >
                      View
                    </button>
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

export default Applications;