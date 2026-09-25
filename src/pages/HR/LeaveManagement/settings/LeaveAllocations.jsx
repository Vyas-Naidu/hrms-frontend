import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Settings } from "lucide-react";

import styles from "./LeaveAllocations.module.css";

const leaveTypes = [
  "Casual Leave",
  "Sick Leave",
  "Earned Leave",
];

const employees = [
  {
    id: "EMP-125",
    name: "Ravi Kumar",
  },
  {
    id: "EMP-124",
    name: "Priya Sharma",
  },
  {
    id: "EMP-123",
    name: "Arjun Reddy",
  },
];

const initialAllocations = [
  {
    id: "LA-001",
    employeeId: "EMP-125",
    employee: "Ravi Kumar",
    leaveType: "Casual Leave",
    period: "Leave Period 2026",
    allocated: 12,
    carryForward: 0,
    used: 4,
  },
  {
    id: "LA-002",
    employeeId: "EMP-124",
    employee: "Priya Sharma",
    leaveType: "Sick Leave",
    period: "Leave Period 2026",
    allocated: 10,
    carryForward: 0,
    used: 2,
  },
  {
    id: "LA-003",
    employeeId: "EMP-123",
    employee: "Arjun Reddy",
    leaveType: "Earned Leave",
    period: "Leave Period 2026",
    allocated: 18,
    carryForward: 3,
    used: 5,
  },
];

const initialForm = {
  employeeId: "",
  leaveType: "",
  allocated: "",
  carryForward: "0",
};

const LeaveAllocations = () => {
  const [allocations, setAllocations] =
    useState(initialAllocations);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = {};

    if (!form.employeeId) {
      nextErrors.employeeId = "Employee is required.";
    }

    if (!form.leaveType) {
      nextErrors.leaveType = "Leave type is required.";
    }

    if (!form.allocated) {
      nextErrors.allocated = "Allocation is required.";
    } else if (Number(form.allocated) <= 0) {
      nextErrors.allocated =
        "Allocation must be greater than 0.";
    }

    if (Number(form.carryForward) < 0) {
      nextErrors.carryForward =
        "Carry-forward cannot be negative.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const employee = employees.find(
      (item) => item.id === form.employeeId
    );

    setAllocations((current) => [
      ...current,
      {
        id: `LA-${String(current.length + 1).padStart(
          3,
          "0"
        )}`,
        employeeId: form.employeeId,
        employee: employee.name,
        leaveType: form.leaveType,
        period: "Leave Period 2026",
        allocated: Number(form.allocated),
        carryForward: Number(form.carryForward),
        used: 0,
      },
    ]);

    setForm(initialForm);
    setErrors({});
    setIsFormOpen(false);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1>Leave Allocations</h1>
         
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
            onClick={() => {
            setForm(initialForm);
            setErrors({});
            setIsFormOpen(true);
          }}
        >
          + Allocate Leave
          </button>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h2>Employee Leave Allocations</h2>
            <p>
              Leave quota assigned to employees for the active
              leave period.
            </p>
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Leave Type</th>
                <th>Period</th>
                <th>Allocated</th>
                <th>Carry Forward</th>
                <th>Used</th>
                <th>Remaining</th>
              </tr>
            </thead>

            <tbody>
              {allocations.map((allocation) => {
                const remaining =
                  allocation.allocated +
                  allocation.carryForward -
                  allocation.used;

                return (
                  <tr key={allocation.id}>
                    <td>
                      <strong>{allocation.employee}</strong>
                      <small>
                        {allocation.employeeId}
                      </small>
                    </td>

                    <td>{allocation.leaveType}</td>
                    <td>{allocation.period}</td>
                    <td>{allocation.allocated}</td>
                    <td>{allocation.carryForward}</td>
                    <td>{allocation.used}</td>
                    <td>
                      <strong>{remaining}</strong>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {isFormOpen && (
        <div
          className={styles.overlay}
          onMouseDown={() => setIsFormOpen(false)}
        >
          <div
            className={styles.modal}
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          >
            <div className={styles.modalHeader}>
              <div>
                <h2>Allocate Leave</h2>
                <p>
                  Assign leave quota to an employee.
                </p>
              </div>

              <button
                type="button"
                className={styles.closeButton}
                onClick={() => setIsFormOpen(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className={styles.formGrid}>
                <div className={styles.field}>
                  <label htmlFor="employeeId">
                    Employee
                  </label>

                  <select
                    id="employeeId"
                    name="employeeId"
                    value={form.employeeId}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select employee
                    </option>

                    {employees.map((employee) => (
                      <option
                        key={employee.id}
                        value={employee.id}
                      >
                        {employee.name} ({employee.id})
                      </option>
                    ))}
                  </select>

                  {errors.employeeId && (
                    <span className={styles.error}>
                      {errors.employeeId}
                    </span>
                  )}
                </div>

                <div className={styles.field}>
                  <label htmlFor="leaveType">
                    Leave Type
                  </label>

                  <select
                    id="leaveType"
                    name="leaveType"
                    value={form.leaveType}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select leave type
                    </option>

                    {leaveTypes.map((leaveType) => (
                      <option
                        key={leaveType}
                        value={leaveType}
                      >
                        {leaveType}
                      </option>
                    ))}
                  </select>

                  {errors.leaveType && (
                    <span className={styles.error}>
                      {errors.leaveType}
                    </span>
                  )}
                </div>

                <div className={styles.field}>
                  <label htmlFor="allocated">
                    Allocated Leaves
                  </label>

                  <input
                    id="allocated"
                    name="allocated"
                    type="number"
                    min="0"
                    step="0.5"
                    value={form.allocated}
                    onChange={handleChange}
                  />

                  {errors.allocated && (
                    <span className={styles.error}>
                      {errors.allocated}
                    </span>
                  )}
                </div>

                <div className={styles.field}>
                  <label htmlFor="carryForward">
                    Carry Forward
                  </label>

                  <input
                    id="carryForward"
                    name="carryForward"
                    type="number"
                    min="0"
                    step="0.5"
                    value={form.carryForward}
                    onChange={handleChange}
                  />

                  {errors.carryForward && (
                    <span className={styles.error}>
                      {errors.carryForward}
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={() => setIsFormOpen(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className={styles.primaryButton}
                >
                  Save Allocation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveAllocations;