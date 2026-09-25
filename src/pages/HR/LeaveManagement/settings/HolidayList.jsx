import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Settings } from "lucide-react";

import { initialHolidays } from "./leaveSettingsData";
import { readSetting, writeSetting } from "./leaveSettingsStorage";

import styles from "./HolidayList.module.css";

const emptyForm = { date: "", name: "", type: "Public" };

const formatDate = (date) =>
  new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));

const HolidayList = () => {
  const [holidays, setHolidays] = useState(() =>
    readSetting("holidays", initialHolidays)
  );
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const saveList = (next) => {
    setHolidays(next);
    writeSetting("holidays", next);
  };

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setErrors({});
    setIsFormOpen(true);
  };

  const openEdit = (holiday) => {
    setEditingId(holiday.id);
    setForm({
      date: holiday.date,
      name: holiday.name,
      type: holiday.type,
    });
    setErrors({});
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setErrors({});
    setIsFormOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const validate = () => {
    const next = {};

    if (!form.date) next.date = "Holiday date is required.";
    if (!form.name.trim()) next.name = "Holiday name is required.";

    if (
      form.date &&
      holidays.some(
        (holiday) =>
          holiday.id !== editingId && holiday.date === form.date
      )
    ) {
      next.date = "A holiday already exists on this date.";
    }

    return next;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validate();

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    const holiday = {
      id: editingId || `H-${Date.now()}`,
      date: form.date,
      name: form.name.trim(),
      type: form.type,
    };

    const next = editingId
      ? holidays.map((item) =>
          item.id === editingId ? holiday : item
        )
      : [...holidays, holiday];

    saveList(next);
    closeForm();
  };

  const deleteHoliday = (holiday) => {
    if (!window.confirm(`Delete "${holiday.name}"?`)) return;

    saveList(holidays.filter((item) => item.id !== holiday.id));
  };

  const years = useMemo(
    () =>
      [...new Set(holidays.map((holiday) => holiday.date.slice(0, 4)))].sort(),
    [holidays]
  );

  const [year, setYear] = useState("All");
  const visibleHolidays = holidays
    .filter((holiday) => year === "All" || holiday.date.startsWith(year))
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <span className={styles.eyebrow}>SETTINGS</span>
          <h1>Holiday List</h1>
         
        </div>

        <div className={styles.headerActions}>
          <Link
            to="/hr/leave-management/settings"
            className={styles.navigationButton}
            aria-label="Back to Settings"
          >
            <Settings size={16} strokeWidth={2} />
            <span>Back to Settings</span>
          </Link>
          <button type="button" className={styles.primaryButton} onClick={openAdd}>
            + Add Holiday
          </button>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h2>Organization holidays</h2>
            <p>These dates can be used by leave validation to exclude holidays.</p>
          </div>

          <div className={styles.headerTools}>
            <select value={year} onChange={(event) => setYear(event.target.value)} aria-label="Filter by year">
              <option value="All">All years</option>
              {years.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
            <span className={styles.count}>{visibleHolidays.length} Holidays</span>
          </div>
        </div>

        {visibleHolidays.length ? (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr><th>Date</th><th>Holiday</th><th>Type</th><th /></tr>
              </thead>
              <tbody>
                {visibleHolidays.map((holiday) => (
                  <tr key={holiday.id}>
                    <td><strong>{formatDate(holiday.date)}</strong></td>
                    <td>{holiday.name}</td>
                    <td><span className={styles.type}>{holiday.type}</span></td>
                    <td className={styles.actionCell}>
                      <button type="button" className={styles.viewButton} onClick={() => openEdit(holiday)}>Edit</button>
                      <button type="button" className={styles.deleteButton} onClick={() => deleteHoliday(holiday)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={styles.emptyState}>
            <strong>No holidays found</strong>
            <p>Add a holiday or change the year filter.</p>
          </div>
        )}
      </div>

      {isFormOpen ? (
        <div className={styles.overlay}>
          <div className={styles.modal} role="dialog" aria-modal="true">
            <div className={styles.modalHeader}>
              <div>
                <span className={styles.eyebrow}>SETTINGS</span>
                <h2>{editingId ? "Edit Holiday" : "Add Holiday"}</h2>
                <p>Keep the organization holiday list accurate.</p>
              </div>
              <button type="button" className={styles.closeButton} onClick={closeForm}>×</button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className={styles.formGrid}>
                <div className={styles.field}>
                  <label htmlFor="date">Date</label>
                  <input id="date" name="date" type="date" value={form.date} onChange={handleChange} />
                  {errors.date && <span className={styles.error}>{errors.date}</span>}
                </div>

                <div className={styles.field}>
                  <label htmlFor="type">Holiday Type</label>
                  <select id="type" name="type" value={form.type} onChange={handleChange}>
                    <option value="Public">Public</option>
                    <option value="Company">Company</option>
                    <option value="Optional">Optional</option>
                  </select>
                </div>

                <div className={`${styles.field} ${styles.fullWidth}`}>
                  <label htmlFor="name">Holiday Name</label>
                  <input id="name" name="name" value={form.name} onChange={handleChange} placeholder="e.g. Republic Day" />
                  {errors.name && <span className={styles.error}>{errors.name}</span>}
                </div>
              </div>

              <div className={styles.actions}>
                <button type="button" className={styles.secondaryButton} onClick={closeForm}>Cancel</button>
                <button type="submit" className={styles.primaryButton}>{editingId ? "Update Holiday" : "Save Holiday"}</button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default HolidayList;
