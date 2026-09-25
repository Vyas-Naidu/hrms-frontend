import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Settings } from "lucide-react";

import { initialLeaveTypes } from "./leaveSettingsData";
import { readSetting, writeSetting } from "./leaveSettingsStorage";

import styles from "./LeaveTypes.module.css";

const emptyForm = {
  name: "",
  maxDaysAllowed: "",
  isPaid: true,
  isCarryForward: false,
  maxCarryForwardDays: "0",
  isEncashable: false,
  applicableAfterDays: "0",
};

const LeaveTypes = () => {
  const [leaveTypes, setLeaveTypes] = useState(() =>
    readSetting("leaveTypes", initialLeaveTypes),
  );
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [selected, setSelected] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const saveList = (next) => {
    setLeaveTypes(next);
    writeSetting("leaveTypes", next);
  };

  const openAdd = () => {
    setEditingId(null);
    setSelected(null);
    setErrors({});
    setForm(emptyForm);
    setIsFormOpen(true);
  };

  const openEdit = (item) => {
    setSelected(null);
    setEditingId(item.id);
    setErrors({});
    setIsFormOpen(true);
    setForm({
      name: item.name,
      maxDaysAllowed: String(item.maxDaysAllowed),
      isPaid: item.isPaid,
      isCarryForward: item.isCarryForward,
      maxCarryForwardDays: String(item.maxCarryForwardDays),
      isEncashable: item.isEncashable,
      applicableAfterDays: String(item.applicableAfterDays),
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
    const normalizedName = form.name.trim().toLowerCase();

    if (!form.name.trim()) next.name = "Leave type name is required.";

    if (
      leaveTypes.some(
        (item) =>
          item.id !== editingId &&
          item.name.trim().toLowerCase() === normalizedName,
      )
    ) {
      next.name = "This leave type already exists.";
    }

    if (!form.maxDaysAllowed || Number(form.maxDaysAllowed) <= 0) {
      next.maxDaysAllowed = "Enter a value greater than 0.";
    }

    if (
      form.isCarryForward &&
      (!form.maxCarryForwardDays || Number(form.maxCarryForwardDays) < 0)
    ) {
      next.maxCarryForwardDays = "Enter a valid carry-forward limit.";
    }

    if (Number(form.applicableAfterDays) < 0) {
      next.applicableAfterDays = "Cannot be negative.";
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

    const data = {
      name: form.name.trim(),
      maxDaysAllowed: Number(form.maxDaysAllowed),
      isPaid: form.isPaid,
      isCarryForward: form.isCarryForward,
      maxCarryForwardDays: form.isCarryForward
        ? Number(form.maxCarryForwardDays)
        : 0,
      isEncashable: form.isEncashable,
      applicableAfterDays: Number(form.applicableAfterDays),
    };

    const next = editingId
      ? leaveTypes.map((item) =>
          item.id === editingId ? { ...item, ...data } : item,
        )
      : [
          ...leaveTypes,
          {
            id: `LT-${Date.now()}`,
            ...data,
          },
        ];

    saveList(next);
    closeForm();
  };

  const deleteType = (item) => {
    const confirmed = window.confirm(
      `Delete "${item.name}"? Existing allocations may reference this leave type.`,
    );

    if (!confirmed) return;

    saveList(leaveTypes.filter((entry) => entry.id !== item.id));
    setSelected(null);
    setIsFormOpen(false);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <span className={styles.eyebrow}>SETTINGS</span>
          <h1>Leave Types</h1>
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

          <button
            type="button"
            className={styles.primaryButton}
            onClick={openAdd}
          >
            + Add Leave Type
          </button>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h2>Leave policies</h2>
            <p>Define the rules used when leave is allocated and applied.</p>
          </div>
          <span className={styles.count}>{leaveTypes.length} Types</span>
        </div>

        {leaveTypes.length ? (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Leave Type</th>
                  <th>Max Days</th>
                  <th>Paid</th>
                  <th>Carry Forward</th>
                  <th>Encashable</th>
                  <th>Applicable After</th>
                  <th />
                </tr>
              </thead>

              <tbody>
                {leaveTypes.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <strong>{item.name}</strong>
                    </td>
                    <td>{item.maxDaysAllowed} days</td>
                    <td>
                      <span className={item.isPaid ? styles.yes : styles.no}>
                        {item.isPaid ? "Yes" : "No"}
                      </span>
                    </td>
                    <td>
                      {item.isCarryForward
                        ? `${item.maxCarryForwardDays} days`
                        : "No"}
                    </td>
                    <td>
                      <span
                        className={item.isEncashable ? styles.yes : styles.no}
                      >
                        {item.isEncashable ? "Yes" : "No"}
                      </span>
                    </td>
                    <td>{item.applicableAfterDays} days</td>
                    <td className={styles.actionCell}>
                      <button
                        type="button"
                        className={styles.viewButton}
                        onClick={() => setSelected(item)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={styles.emptyState}>
            <strong>No leave types configured</strong>
            <p>Add the first leave policy to continue.</p>
            <button
              type="button"
              className={styles.primaryButton}
              onClick={openAdd}
            >
              Add Leave Type
            </button>
          </div>
        )}
      </div>

      {(selected || isFormOpen) && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal} role="dialog" aria-modal="true">
            {selected ? (
              <>
                <div className={styles.modalHeader}>
                  <div>
                    <span className={styles.eyebrow}>POLICY</span>
                    <h2>{selected.name}</h2>
                    <p>Leave Type Configuration</p>
                  </div>
                  <button
                    type="button"
                    className={styles.closeButton}
                    onClick={() => setSelected(null)}
                  >
                    ×
                  </button>
                </div>

                <div className={styles.detailsGrid}>
                  <div>
                    <span>Maximum Days</span>
                    <strong>{selected.maxDaysAllowed} days</strong>
                  </div>
                  <div>
                    <span>Paid Leave</span>
                    <strong>{selected.isPaid ? "Yes" : "No"}</strong>
                  </div>
                  <div>
                    <span>Carry Forward</span>
                    <strong>
                      {selected.isCarryForward ? "Allowed" : "Not Allowed"}
                    </strong>
                  </div>
                  <div>
                    <span>Maximum Carry Forward</span>
                    <strong>{selected.maxCarryForwardDays} days</strong>
                  </div>
                  <div>
                    <span>Encashable</span>
                    <strong>{selected.isEncashable ? "Yes" : "No"}</strong>
                  </div>
                  <div>
                    <span>Applicable After</span>
                    <strong>{selected.applicableAfterDays} days</strong>
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button
                    type="button"
                    className={styles.dangerButton}
                    onClick={() => deleteType(selected)}
                  >
                    Delete
                  </button>
                  <span className={styles.actionSpacer} />
                  <button
                    type="button"
                    className={styles.secondaryButton}
                    onClick={() => setSelected(null)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className={styles.primaryButton}
                    onClick={() => openEdit(selected)}
                  >
                    Edit
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className={styles.modalHeader}>
                  <div>
                    <span className={styles.eyebrow}>SETTINGS</span>
                    <h2>{editingId ? "Edit Leave Type" : "Add Leave Type"}</h2>
                    <p>Configure the leave policy for this type.</p>
                  </div>
                  <button
                    type="button"
                    className={styles.closeButton}
                    onClick={closeForm}
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className={styles.formGrid}>
                    <div className={styles.field}>
                      <label htmlFor="name">Leave Type Name</label>
                      <input
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="e.g. Casual Leave"
                      />
                      {errors.name && (
                        <span className={styles.error}>{errors.name}</span>
                      )}
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="maxDaysAllowed">
                        Maximum Days Allowed
                      </label>
                      <input
                        id="maxDaysAllowed"
                        name="maxDaysAllowed"
                        type="number"
                        min="1"
                        value={form.maxDaysAllowed}
                        onChange={handleChange}
                        placeholder="e.g. 12"
                      />
                      {errors.maxDaysAllowed && (
                        <span className={styles.error}>
                          {errors.maxDaysAllowed}
                        </span>
                      )}
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="applicableAfterDays">
                        Applicable After Days
                      </label>
                      <input
                        id="applicableAfterDays"
                        name="applicableAfterDays"
                        type="number"
                        min="0"
                        value={form.applicableAfterDays}
                        onChange={handleChange}
                      />
                      {errors.applicableAfterDays && (
                        <span className={styles.error}>
                          {errors.applicableAfterDays}
                        </span>
                      )}
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="maxCarryForwardDays">
                        Maximum Carry Forward Days
                      </label>
                      <input
                        id="maxCarryForwardDays"
                        name="maxCarryForwardDays"
                        type="number"
                        min="0"
                        value={form.maxCarryForwardDays}
                        onChange={handleChange}
                        disabled={!form.isCarryForward}
                      />
                      {errors.maxCarryForwardDays && (
                        <span className={styles.error}>
                          {errors.maxCarryForwardDays}
                        </span>
                      )}
                    </div>

                    <div className={styles.checkboxGroup}>
                      <label className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          name="isPaid"
                          checked={form.isPaid}
                          onChange={handleChange}
                        />{" "}
                        Paid Leave
                      </label>
                      <label className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          name="isCarryForward"
                          checked={form.isCarryForward}
                          onChange={handleChange}
                        />{" "}
                        Allow Carry Forward
                      </label>
                      <label className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          name="isEncashable"
                          checked={form.isEncashable}
                          onChange={handleChange}
                        />{" "}
                        Allow Encashment
                      </label>
                    </div>
                  </div>

                  <div className={styles.formActions}>
                    <span className={styles.actionSpacer} />
                    <button
                      type="button"
                      className={styles.secondaryButton}
                      onClick={closeForm}
                    >
                      Cancel
                    </button>
                    <button type="submit" className={styles.primaryButton}>
                      {editingId ? "Update Leave Type" : "Save Leave Type"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveTypes;
