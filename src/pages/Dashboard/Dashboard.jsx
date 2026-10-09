
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { employeeApi } from "../../services/api/employee.api";
import styles from "./Dashboard.module.css";

function getInitials(firstName, lastName) {
  return [firstName, lastName]
    .filter(Boolean)
    .map((name) => name.charAt(0).toUpperCase())
    .join("") || "U";
}

function EmployeeDashboard() {
  const [profile, setProfile] = useState(null);
  const [photoUrl, setPhotoUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    let imageUrl = "";

    async function loadDashboard() {
      try {
        const response = await employeeApi.getMe();

        if (active) {
          setProfile(response.data);
        }

        try {
          const photoResponse = await employeeApi.getMyPhoto();

          if (active) {
            imageUrl = URL.createObjectURL(photoResponse.data);
            setPhotoUrl(imageUrl);
          } else {
            URL.revokeObjectURL(URL.createObjectURL(photoResponse.data));
          }
        } catch {
          // The initials avatar is used when no photo is available.
        }
      } catch (err) {
        if (active) {
          setError(
            err.response?.data?.message ||
              "Unable to load your dashboard. Please try again."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadDashboard();

    return () => {
      active = false;
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, []);

  if (loading) {
    return (
      <main className={styles.page}>
        <p className={styles.status}>Loading your dashboard...</p>
      </main>
    );
  }

  if (error || !profile) {
    return (
      <main className={styles.page}>
        <h1>Employee Dashboard</h1>
        <p className={styles.error}>
          {error || "Employee information is unavailable."}
        </p>
      </main>
    );
  }

  const fullName = [profile.first_name, profile.last_name]
    .filter(Boolean)
    .join(" ") || "Employee";

  const firstName = profile.first_name || "there";

  return (
    <main className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>EMPLOYEE SELF-SERVICE</p>
          <h1>Welcome back, {firstName}!</h1>
          <p className={styles.subtitle}>
            Here's your personal workspace at a glance.
          </p>
        </div>

        <Link to="/my-profile" className={styles.headerButton}>
          View My Profile
        </Link>
      </header>

      <section className={styles.profileBanner}>
        <div className={styles.profileIdentity}>
          {photoUrl ? (
            <img
              className={styles.avatar}
              src={photoUrl}
              alt={`${fullName}'s profile`}
            />
          ) : (
            <div className={styles.avatarFallback} aria-hidden="true">
              {getInitials(profile.first_name, profile.last_name)}
            </div>
          )}

          <div className={styles.profileText}>
            <span className={styles.profileLabel}>YOUR PROFILE</span>
            <h2>{fullName}</h2>
            <p>{profile.designation_name || "Designation not provided"}</p>
            <span className={styles.employeeCode}>
              {profile.employee_code || "Employee code not provided"}
            </span>
          </div>
        </div>

        <div className={styles.profileDetails}>
          <div>
            <span>Department</span>
            <strong>{profile.department_name || "Not provided"}</strong>
          </div>
          <div>
            <span>Email address</span>
            <strong>{profile.email || "Not provided"}</strong>
          </div>
          <div>
            <span>Work location</span>
            <strong>{profile.work_location || "Not provided"}</strong>
          </div>
          <div>
            <span>Employment status</span>
            <strong>{profile.status || "Not provided"}</strong>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <div>
            <h2>Quick Actions</h2>
            <p>Access your employee services.</p>
          </div>
        </div>

        <div className={styles.actionGrid}>
          <Link to="/my-profile" className={styles.actionCard}>
            <span className={styles.actionIcon}>♙</span>
            <span className={styles.actionTitle}>My Profile</span>
            <span className={styles.actionDescription}>
              View your personal and employment information.
            </span>
            <span className={styles.actionLink}>View profile ↗</span>
          </Link>

          <div className={styles.actionCard}>
            <span className={styles.actionIcon}>▤</span>
            <span className={styles.actionTitle}>My Documents</span>
            <span className={styles.actionDescription}>
              Employee document access is not available on this dashboard yet.
            </span>
            <span className={styles.comingSoon}>Coming soon</span>
          </div>

          <div className={styles.actionCard}>
            <span className={styles.actionIcon}>▦</span>
            <span className={styles.actionTitle}>Leave Management</span>
            <span className={styles.actionDescription}>
              Leave requests and balances will appear here when employee
              self-service is implemented.
            </span>
            <span className={styles.comingSoon}>Coming soon</span>
          </div>

          <div className={styles.actionCard}>
            <span className={styles.actionIcon}>◷</span>
            <span className={styles.actionTitle}>Attendance</span>
            <span className={styles.actionDescription}>
              Attendance information will be available in a future update.
            </span>
            <span className={styles.comingSoon}>Coming soon</span>
          </div>
        </div>
      </section>

      <section className={styles.bottomGrid}>
        <div className={styles.infoCard}>
          <div className={styles.infoHeading}>
            <span className={styles.infoIcon}>▤</span>
            <div>
              <h2>My Documents</h2>
              <p>Keep your employment information accessible.</p>
            </div>
          </div>
          <p className={styles.infoBody}>
            A dedicated document view and secure download actions can be
            connected here after employee document permissions are implemented.
          </p>
          <span className={styles.comingSoon}>Coming soon</span>
        </div>

        <div className={styles.infoCard}>
          <div className={styles.infoHeading}>
            <span className={styles.infoIcon}>✦</span>
            <div>
              <h2>More employee services</h2>
              <p>Your self-service workspace will grow over time.</p>
            </div>
          </div>

          <ul className={styles.featureList}>
            <li>
              <span>Leave requests</span>
              <span className={styles.comingSoon}>Coming soon</span>
            </li>
            <li>
              <span>Attendance history</span>
              <span className={styles.comingSoon}>Coming soon</span>
            </li>
            <li>
              <span>My requests</span>
              <span className={styles.comingSoon}>Coming soon</span>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}

export default EmployeeDashboard;
