import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Settings } from "lucide-react";

import { initialLeavePeriods } from "./leaveSettingsData";
import { readSetting, writeSetting } from "./leaveSettingsStorage";

import styles from "./LeavePeriod.module.css";

const emptyForm = {
  periodName: "",
  startDate: "",
  endDate: "",
  company: "",
  isActive: true,
};

const LeavePeriod = () => {
  const [periods, setPeriods] = useState(() =>
    readSetting("leavePeriods", initialLeavePeriods)
  );
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const saveList = (next) => {
    setPeriods(next);
    writeSetting("leavePeriods", next);
  };

  const openAdd = () => {
    setEditingId(null);
    setErrors({});
    setForm(emptyForm);
    setIsFormOpen(true);
  };

  const openEdit = (period) => {
    setEditingId(period.id);
    setErrors({});
    setIsFormOpen(true);
    setForm({
      periodName: period.periodName,
      startDate: period.startDate,
      endDate: period.endDate,
      company: period.company,
      isActive: period.isActive,
    });
  };

  const closeForm = () => {
    setEditingId(null);
    setErrors({});
    setForm(emptyForm);
    setIsFormOpen(false);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const validate = () => {
    const next = {};

    if (!form.periodName.trim()) next.periodName = "Period name is required.";
    if (!form.company.trim()) next.company = "Company is required.";
    if (!form.startDate) next.startDate = "Start date is required.";
    if (!form.endDate) next.endDate = "End date is required.";

    if (form.startDate && form.endDate && form.startDate >= form.endDate) {
      next.endDate = "End date must be after the start date.";
    }

    const overlaps = periods.some((period) => {
      if (period.id === editingId) return false;

      return (
        form.startDate <= period.endDate &&
        form.endDate >= period.startDate
      );
    });

    if (form.startDate && form.endDate && overlaps) {
      next.startDate = "This period overlaps an existing period.";
    }

    if (
      form.isActive &&
      periods.some((period) => period.id !== editingId && period.isActive)
    ) {
      // We allow it and automatically deactivate the old active period.
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

    const period = {
      id: editingId || `LP-${Date.now()}`,
      periodName: form.periodName.trim(),
      startDate: form.startDate,
      endDate: form.endDate,
      company: form.company.trim(),
      isActive: form.isActive,
    };

    const next = editingId
      ? periods.map((item) => ({
          ...item,
          ...(item.id === editingId
            ? period
            : form.isActive
              ? { isActive: false }
              : {}),
        }))
      : [
          ...periods.map((item) =>
            form.isActive ? { ...item, isActive: false } : item
          ),
          period,
        ];

    saveList(next);
    closeForm();
  };

  const activatePeriod = (id) => {
    saveList(
      periods.map((period) => ({
        ...period,
        isActive: period.id === id,
      }))
    );
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <span className={styles.eyebrow}>SETTINGS</span>
          <h1>Leave Period</h1>
          
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
            + Add Leave Period
          </button>
        </div>
      </div>

      <div className={styles.infoBanner}>
        <strong>
          {periods.find((period) => period.isActive)?.periodName ||
            "No active leave period"}
        </strong>
        <span>
          Only one leave period can be active at a time.
        </span>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h2>Leave periods</h2>
            <p>Define the cycles used for leave allocation and processing.</p>
          </div>
          <span className={styles.count}>{periods.length} Periods</span>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Period</th>
                <th>Start</th>
                <th>End</th>
                <th>Company</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {periods.map((period) => (
                <tr key={period.id}>
                  <td><strong>{period.periodName}</strong></td>
                  <td>{period.startDate}</td>
                  <td>{period.endDate}</td>
                  <td>{period.company}</td>
                  <td>
                    <span className={period.isActive ? styles.active : styles.inactive}>
                      {period.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className={styles.actionCell}>
                    {!period.isActive && (
                      <button
                        type="button"
                        className={styles.activateButton}
                        onClick={() => activatePeriod(period.id)}
                      >
                        Activate
                      </button>
                    )}
                    <button
                      type="button"
                      className={styles.viewButton}
                      onClick={() => openEdit(period)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isFormOpen ? (
        <div className={styles.overlay}>
          <div className={styles.modal} role="dialog" aria-modal="true">
            <div className={styles.modalHeader}>
              <div>
                <span className={styles.eyebrow}>SETTINGS</span>
                <h2>{editingId ? "Edit Leave Period" : "Add Leave Period"}</h2>
                <p>Define the start and end dates for the leave cycle.</p>
              </div>
              <button type="button" className={styles.closeButton} onClick={closeForm}>×</button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className={styles.formGrid}>
                <div className={styles.field}>
                  <label htmlFor="periodName">Period Name</label>
                  <input id="periodName" name="periodName" value={form.periodName} onChange={handleChange} placeholder="e.g. Leave Period 2027" />
                  {errors.periodName && <span className={styles.error}>{errors.periodName}</span>}
                </div>

                <div className={styles.field}>
                  <label htmlFor="company">Company</label>
                  <input id="company" name="company" value={form.company} onChange={handleChange} placeholder="Company name" />
                  {errors.company && <span className={styles.error}>{errors.company}</span>}
                </div>

                <div className={styles.field}>
                  <label htmlFor="startDate">Start Date</label>
                  <input id="startDate" name="startDate" type="date" value={form.startDate} onChange={handleChange} />
                  {errors.startDate && <span className={styles.error}>{errors.startDate}</span>}
                </div>

                <div className={styles.field}>
                  <label htmlFor="endDate">End Date</label>
                  <input id="endDate" name="endDate" type="date" value={form.endDate} onChange={handleChange} />
                  {errors.endDate && <span className={styles.error}>{errors.endDate}</span>}
                </div>

                <label className={styles.checkbox}>
                  <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} />
                  Set as active leave period
                </label>
              </div>

              <div className={styles.actions}>
                <button type="button" className={styles.secondaryButton} onClick={closeForm}>Cancel</button>
                <button type="submit" className={styles.primaryButton}>{editingId ? "Update Period" : "Save Period"}</button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default LeavePeriod;
