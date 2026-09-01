import { useMemo, useState } from "react";
import {
  FaArchive,
  FaChevronLeft,
  FaChevronRight,
  FaEnvelope,
  FaEnvelopeOpen,
  FaInbox,
  FaPaperclip,
  FaPen,
  FaSearch,
  FaStar,
  FaTrash,
  FaTimes,
} from "react-icons/fa";

import styles from "./Email.module.css";

const initialEmails = [
  {
    id: 1,
    sender: "HRMS Admin",
    subject: "Welcome to HRMS",
    preview: "Your HRMS account and employee profile are ready.",
    body: "Welcome to HRMS. Your employee account and profile have been successfully created and are ready to use.",
    time: "10:30 AM",
    unread: true,
    starred: true,
    attachment: false,
    folder: "inbox",
  },
  {
    id: 2,
    sender: "HR Department",
    subject: "Monthly attendance report",
    preview: "The monthly attendance report is available for review.",
    body: "The monthly attendance report is now available. Please review the attendance details and take any required action.",
    time: "Yesterday",
    unread: true,
    starred: false,
    attachment: true,
    folder: "inbox",
  },
  {
    id: 3,
    sender: "Payroll Team",
    subject: "Salary processing update",
    preview: "Salary processing for this month has been completed.",
    body: "Salary processing for this month has been completed successfully.",
    time: "Aug 30",
    unread: false,
    starred: false,
    attachment: true,
    folder: "archive",
  },
  {
    id: 4,
    sender: "Leave Management",
    subject: "Leave request notification",
    preview: "A leave request requires your attention.",
    body: "A leave request has been submitted and requires your attention.",
    time: "Aug 29",
    unread: false,
    starred: false,
    attachment: false,
    folder: "inbox",
  },
  {
    id: 5,
    sender: "System",
    subject: "Document verification completed",
    preview: "Employee document verification has been completed.",
    body: "Employee document verification has been completed successfully.",
    time: "Aug 28",
    unread: false,
    starred: true,
    attachment: false,
    folder: "archive",
  },
];

const folders = [
  { id: "inbox", label: "Inbox", icon: FaInbox },
  { id: "starred", label: "Starred", icon: FaStar },
  { id: "archive", label: "Archive", icon: FaArchive },
  { id: "trash", label: "Trash", icon: FaTrash },
];

function Email() {
  const [emails, setEmails] = useState(initialEmails);
  const [activeFolder, setActiveFolder] = useState("inbox");
  const [search, setSearch] = useState("");
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [showCompose, setShowCompose] = useState(false);

  const unreadCount = emails.filter(
    (email) => email.folder === "inbox" && email.unread
  ).length;

  const filteredEmails = useMemo(() => {
    const term = search.trim().toLowerCase();

    return emails.filter((email) => {
      let folderMatch = false;

      if (activeFolder === "starred") {
        folderMatch = email.starred && email.folder !== "trash";
      } else {
        folderMatch = email.folder === activeFolder;
      }

      if (!folderMatch) {
        return false;
      }

      if (!term) {
        return true;
      }

      return (
        email.sender.toLowerCase().includes(term) ||
        email.subject.toLowerCase().includes(term) ||
        email.preview.toLowerCase().includes(term)
      );
    });
  }, [emails, activeFolder, search]);

  const toggleStar = (id) => {
    setEmails((current) =>
      current.map((email) =>
        email.id === id
          ? { ...email, starred: !email.starred }
          : email
      )
    );
  };

  const openEmail = (email) => {
    setSelectedEmail(email);

    setEmails((current) =>
      current.map((item) =>
        item.id === email.id
          ? { ...item, unread: false }
          : item
      )
    );
  };

  const moveEmail = (id, folder) => {
    setEmails((current) =>
      current.map((email) =>
        email.id === id ? { ...email, folder } : email
      )
    );

    setSelectedEmail(null);
  };

  const closeEmail = () => {
    setSelectedEmail(null);
  };

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>HRMS communication</p>

          <h1>Mailbox</h1>

          <p className={styles.subtitle}>
            Manage your HR-related messages and notifications.
          </p>
        </div>

        <button
          type="button"
          className={styles.composeButton}
          onClick={() => setShowCompose(true)}
        >
          <FaPen aria-hidden="true" />
          Compose
        </button>
      </div>

      <div className={styles.mailbox}>
        <aside className={styles.sidebar} aria-label="Mailbox folders">
          {folders.map((folder) => {
            const Icon = folder.icon;

            const count =
              folder.id === "inbox"
                ? unreadCount
                : folder.id === "starred"
                  ? emails.filter(
                      (email) =>
                        email.starred && email.folder !== "trash"
                    ).length
                  : undefined;

            return (
              <button
                key={folder.id}
                type="button"
                className={`${styles.folder} ${
                  activeFolder === folder.id ? styles.active : ""
                }`}
                onClick={() => {
                  setActiveFolder(folder.id);
                  setSelectedEmail(null);
                }}
              >
                <Icon aria-hidden="true" />

                <span>{folder.label}</span>

                {count > 0 && <strong>{count}</strong>}
              </button>
            );
          })}
        </aside>

        <main className={styles.content}>
          <div className={styles.toolbar}>
            <div className={styles.search}>
              <FaSearch aria-hidden="true" />

              <input
                type="search"
                placeholder="Search mailbox"
                aria-label="Search mailbox"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <span className={styles.messageCount}>
              {filteredEmails.length}{" "}
              {filteredEmails.length === 1 ? "message" : "messages"}
            </span>
          </div>

          {selectedEmail ? (
            <div className={styles.emailDetails}>
              <div className={styles.detailsHeader}>
                <button
                  type="button"
                  className={styles.backButton}
                  onClick={closeEmail}
                >
                  <FaChevronLeft aria-hidden="true" />
                  Back
                </button>

                <div className={styles.detailsActions}>
                  <button
                    type="button"
                    onClick={() =>
                      toggleStar(selectedEmail.id)
                    }
                    aria-label={
                      selectedEmail.starred
                        ? "Unstar message"
                        : "Star message"
                    }
                  >
                    <FaStar
                      className={
                        selectedEmail.starred
                          ? styles.starred
                          : ""
                      }
                    />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      moveEmail(
                        selectedEmail.id,
                        selectedEmail.folder === "trash"
                          ? "inbox"
                          : "trash"
                      )
                    }
                    aria-label="Move message to trash"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>

              <div className={styles.detailsContent}>
                <h2>{selectedEmail.subject}</h2>

                <div className={styles.senderRow}>
                  <div className={styles.senderAvatar}>
                    {selectedEmail.sender.charAt(0)}
                  </div>

                  <div>
                    <strong>{selectedEmail.sender}</strong>
                    <span>{selectedEmail.time}</span>
                  </div>
                </div>

                <p className={styles.body}>
                  {selectedEmail.body}
                </p>

                {selectedEmail.attachment && (
                  <div className={styles.detailsAttachment}>
                    <FaPaperclip aria-hidden="true" />
                    Attachment
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              {filteredEmails.length > 0 ? (
                <div className={styles.emailList}>
                  {filteredEmails.map((email) => (
                    <article
                      key={email.id}
                      className={`${styles.email} ${
                        email.unread ? styles.unread : ""
                      }`}
                      onClick={() => openEmail(email)}
                    >
                      <button
                        type="button"
                        className={styles.starButton}
                        aria-label={
                          email.starred
                            ? "Unstar message"
                            : "Star message"
                        }
                        onClick={(event) => {
                          event.stopPropagation();
                          toggleStar(email.id);
                        }}
                      >
                        <FaStar
                          className={
                            email.starred
                              ? styles.starred
                              : ""
                          }
                          aria-hidden="true"
                        />
                      </button>

                      <div className={styles.emailBody}>
                        <div className={styles.emailTop}>
                          <strong>{email.sender}</strong>

                          <time>{email.time}</time>
                        </div>

                        <h2>{email.subject}</h2>

                        <p>{email.preview}</p>

                        {email.attachment && (
                          <span className={styles.attachment}>
                            <FaPaperclip aria-hidden="true" />
                            Attachment
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        className={styles.openButton}
                        aria-label={`Open message from ${email.sender}`}
                        onClick={(event) => {
                          event.stopPropagation();
                          openEmail(email);
                        }}
                      >
                        {email.unread ? (
                          <FaEnvelope aria-hidden="true" />
                        ) : (
                          <FaEnvelopeOpen aria-hidden="true" />
                        )}
                      </button>
                    </article>
                  ))}
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <FaEnvelopeOpen aria-hidden="true" />
                  <h2>No messages</h2>
                  <p>
                    There are no messages in this mailbox.
                  </p>
                </div>
              )}
            </>
          )}

          <div className={styles.pagination}>
            <span>
              {filteredEmails.length > 0
                ? `1–${filteredEmails.length} of ${filteredEmails.length} messages`
                : "0 messages"}
            </span>

            <div>
              <button
                type="button"
                className={styles.pageButton}
                disabled
                aria-label="Previous page"
              >
                <FaChevronLeft aria-hidden="true" />
              </button>

              <button
                type="button"
                className={styles.pageButton}
                disabled
                aria-label="Next page"
              >
                <FaChevronRight aria-hidden="true" />
              </button>
            </div>
          </div>
        </main>
      </div>

      {showCompose && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowCompose(false)}
        >
          <div
            className={styles.composeModal}
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.composeHeader}>
              <h2>New Message</h2>

              <button
                type="button"
                onClick={() => setShowCompose(false)}
                aria-label="Close compose"
              >
                <FaTimes />
              </button>
            </div>

            <input
              type="email"
              placeholder="To"
              aria-label="Recipient"
            />

            <input
              type="text"
              placeholder="Subject"
              aria-label="Subject"
            />

            <textarea
              placeholder="Write your message..."
              aria-label="Message"
              rows="8"
            />

            <div className={styles.composeFooter}>
              <button
                type="button"
                className={styles.sendButton}
                onClick={() => setShowCompose(false)}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Email;