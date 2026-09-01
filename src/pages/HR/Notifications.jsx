import { FaBell, FaCheckCircle, FaInfoCircle, FaExclamationCircle } from "react-icons/fa";
import styles from "./Notifications.module.css";

const notifications = [
  {
    id: 1,
    title: "New employee added",
    message: "A new employee profile was added to the HRMS.",
    time: "10 minutes ago",
    type: "success",
    unread: true,
  },
  {
    id: 2,
    title: "Leave request pending",
    message: "A leave request is waiting for your review.",
    time: "1 hour ago",
    type: "info",
    unread: true,
  },
  {
    id: 3,
    title: "Document verification required",
    message: "An employee document needs to be reviewed.",
    time: "3 hours ago",
    type: "warning",
    unread: true,
  },
  {
    id: 4,
    title: "Monthly report available",
    message: "The latest HR monthly report is ready to review.",
    time: "Yesterday",
    type: "info",
    unread: false,
  },
];

const notificationIcons = {
  success: FaCheckCircle,
  info: FaInfoCircle,
  warning: FaExclamationCircle,
};

function Notifications() {
  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <div>
          <div className={styles.eyebrow}>
            <FaBell aria-hidden="true" />
            HRMS notifications
          </div>
          <h1>Notifications</h1>
          <p>Stay updated with important HR activities and system events.</p>
        </div>

        <div className={styles.summary} aria-label="Notification summary">
          <strong>{notifications.filter((item) => item.unread).length}</strong>
          <span>Unread</span>
        </div>
      </div>

      <div className={styles.list}>
        {notifications.map((notification) => {
          const Icon = notificationIcons[notification.type];

          return (
            <article
              key={notification.id}
              className={`${styles.notification} ${
                notification.unread ? styles.unread : ""
              }`}
            >
              <div className={`${styles.icon} ${styles[notification.type]}`}>
                <Icon aria-hidden="true" />
              </div>

              <div className={styles.content}>
                <div className={styles.titleRow}>
                  <h2>{notification.title}</h2>
                  {notification.unread && <span className={styles.dot} aria-label="Unread" />}
                </div>
                <p>{notification.message}</p>
                <time>{notification.time}</time>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default Notifications;
