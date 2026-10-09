import { useEffect, useState } from "react";
import { employeeApi } from "../../services/api/employee.api";
import styles from "./MyProfile.module.css";

const fields = [
    ["Employee Code", "employee_code"],
    ["First Name", "first_name"],
    ["Last Name", "last_name"],
    ["Email", "email"],
    ["Phone", "phone"],
    ["Gender", "gender"],
    ["Date of Birth", "dob", true],
    ["Joining Date", "joining_date", true],
    ["Department", "department_name"],
    ["Designation", "designation_name"],
    ["Employment Type", "employment_type"],
    ["Work Location", "work_location"],
    ["Employment Status", "status"],
];

function formatValue(value, isDate = false) {
    if (!value) return "Not provided";

    if (isDate) {
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return value;

        return date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            timeZone: "UTC",
        });
    }

    return String(value)
        .replaceAll("_", " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

function MyProfile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");

    useEffect(() => {
        let objectUrl;

        employeeApi
            .getMyPhoto()
            .then(({ data }) => {
                objectUrl = URL.createObjectURL(data);
                setPhotoUrl(objectUrl);
            })
            .catch(() => {
                // Show initials if the employee has no profile photo.
            });

        return () => {
            if (objectUrl) URL.revokeObjectURL(objectUrl);
        };
    }, []);
    useEffect(() => {
        let active = true;

        const loadProfile = async () => {
            try {
                const response = await employeeApi.getMe();

                if (active) {
                    setProfile(response.data);
                }
            } catch (err) {
                if (active) {
                    setError(
                        err.response?.data?.message ||
                        "Unable to load your profile. Please try again.",
                    );
                }
            } finally {
                if (active) setLoading(false);
            }
        };

        loadProfile();

        return () => {
            active = false;
        };
    }, []);

    if (loading) {
        return <main className={styles.page}>Loading your profile...</main>;
    }

    if (error) {
        return (
            <main className={styles.page}>
                <h1>My Profile</h1>
                <p className={styles.error}>{error}</p>
            </main>
        );
    }

    if (!profile) {
        return (
            <main className={styles.page}>
                <h1>My Profile</h1>
                <p>Profile information is unavailable.</p>
            </main>
        );
    }

    const fullName = [profile.first_name, profile.last_name]
        .filter(Boolean)
        .join(" ");

    return (
        <main className={styles.page}>
            <header className={styles.header}>
                {photoUrl ? (
                    <img
                        src={photoUrl}
                        alt={`${fullName || "Employee"} profile`}
                        className={styles.avatarImage}
                    />
                ) : (
                    <div className={styles.avatar} aria-hidden="true">
                        {profile.first_name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                )}

                <div>
                    <h1>My Profile</h1>
                    <p>{fullName || "Employee"}</p>
                    <span className={styles.code}>
                        {profile.employee_code || "Employee"}
                    </span>
                </div>
            </header>

            <section className={styles.card}>
                <h2>Personal & Contact Information</h2>
                <div className={styles.grid}>
                    {fields.slice(0, 8).map(([label, key, isDate]) => (
                        <div className={styles.field} key={key}>
                            <span>{label}</span>
                            <strong>{formatValue(profile[key], isDate)}</strong>
                        </div>
                    ))}
                </div>
            </section>

            <section className={styles.card}>
                <h2>Employment Information</h2>
                <div className={styles.grid}>
                    {fields.slice(8).map(([label, key, isDate]) => (
                        <div className={styles.field} key={key}>
                            <span>{label}</span>
                            <strong>{formatValue(profile[key], isDate)}</strong>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}

export default MyProfile;