import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Download, Eye, Pencil, Trash2 } from "lucide-react";

import { employeeApi } from "../../../services/api/employee.api";
import {
  clearSelectedEmployee,
  fetchEmployeeById,
} from "../../../store/slices/employeeSlice";
import styles from "./EmployeeDetails.module.css";

const firstValue = (object, keys, fallback = "—") => {
  for (const key of keys) {
    const value = object?.[key];
    if (value !== undefined && value !== null && String(value).trim() !== "") {
      return value;
    }
  }
  return fallback;
};

const normalizeList = (response) => {
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.data?.value)) return response.data.value;
  if (Array.isArray(response?.data?.documents)) return response.data.documents;
  return [];
};

const formatDate = (value) => {
  if (!value || value === "—") return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString();
};

const getFileNameFromHeaders = (headers, fallback) => {
  const disposition = headers?.["content-disposition"] || "";
  const match = disposition.match(/filename="?([^";]+)"?/i);
  return match?.[1] || fallback;
};

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedEmployee, isLoadingById, errorById } = useSelector(
    (state) => state.employees,
  );

  const [activeTab, setActiveTab] = useState("personal");
  const [documents, setDocuments] = useState([]);
  const [documentsLoading, setDocumentsLoading] = useState(false);
  const [documentsError, setDocumentsError] = useState("");
  const [downloadingId, setDownloadingId] = useState(null);

  useEffect(() => {
    dispatch(fetchEmployeeById(id));
    return () => dispatch(clearSelectedEmployee());
  }, [dispatch, id]);

  useEffect(() => {
    if (activeTab !== "documents" || !id) return;

    let cancelled = false;

    const loadDocuments = async () => {
      try {
        setDocumentsLoading(true);
        setDocumentsError("");
        const response = await employeeApi.getDocuments(id);
        if (!cancelled) setDocuments(normalizeList(response));
      } catch (error) {
        if (!cancelled) {
          setDocumentsError(
            error?.response?.data?.message ||
              error?.message ||
              "Failed to load documents.",
          );
        }
      } finally {
        if (!cancelled) setDocumentsLoading(false);
      }
    };

    loadDocuments();

    return () => {
      cancelled = true;
    };
  }, [activeTab, id]);

  const handleDownload = async (fileRecord) => {
    if (!fileRecord?.id) return;

    try {
      setDownloadingId(fileRecord.id);

      const response = await employeeApi.downloadDocument(fileRecord.id);
      const blob = response.data;
      const url = window.URL.createObjectURL(blob);
      const fallbackName =
        fileRecord.original_file_name ||
        fileRecord.originalFileName ||
        fileRecord.file_name ||
        fileRecord.fileName ||
        fileRecord.document_name ||
        fileRecord.documentName ||
        "document";
      const fileName = getFileNameFromHeaders(response.headers, fallbackName);

      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = fileName;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Document download failed:", error);
      setDocumentsError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to download document.",
      );
    } finally {
      setDownloadingId(null);
    }
  };

  const employee = selectedEmployee;

  const fullName = useMemo(
    () =>
      `${firstValue(employee, ["first_name", "firstName"], "")} ${firstValue(
        employee,
        ["last_name", "lastName"],
        "",
      )}`.trim() || "Employee",
    [employee],
  );

  const statusClass = String(
    firstValue(employee, ["status", "employee_status"], "unknown"),
  )
    .toLowerCase()
    .replace(/\s+/g, "-");

  const handleEdit = () => {
    navigate(`/hr/employee-registration/${id}`);
  };

  const handleDelete = async () => {
    if (!window.confirm(`Delete ${fullName}? This action cannot be undone.`)) {
      return;
    }

    try {
      await employeeApi.remove(id);
      navigate("/hr/employeemanagement", { replace: true });
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to delete employee.",
      );
    }
  };

  if (isLoadingById) {
    return <div className={styles["employee-details-state"]}>Loading employee details...</div>;
  }

  if (errorById) {
    return (
      <div className={styles["employee-details-state"]}>
        <p>{errorById}</p>
        <button
          type="button"
          className={styles["details-back-button"]}
          onClick={() => navigate("/hr/employeemanagement")}
        >
          <ArrowLeft size={17} /> Back to Employees
        </button>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className={styles["employee-details-state"]}>
        <p>Employee not found.</p>
        <button
          type="button"
          className={styles["details-back-button"]}
          onClick={() => navigate("/hr/employeemanagement")}
        >
          <ArrowLeft size={17} /> Back to Employees
        </button>
      </div>
    );
  }

  // GET /employees/:id now returns these nested records.
  const personalInfo = employee.personal_info || employee.personalInfo || {};
  const addresses = employee.addresses || [];

  const currentAddress =
    addresses.find((address) =>
      ["current", "Current"].includes(address?.address_type),
    ) || employee.current_address || employee.currentAddress || {};

  const permanentAddress =
    addresses.find((address) =>
      ["permanent", "Permanent"].includes(address?.address_type),
    ) || employee.permanent_address || employee.permanentAddress || {};

  const personalFields = [
    ["Employee ID", firstValue(employee, ["employee_code", "employeeCode"])],
    ["First Name", firstValue(employee, ["first_name", "firstName"])],
    ["Last Name", firstValue(employee, ["last_name", "lastName"])],
    ["Email", firstValue(employee, ["email"])],
    ["Phone", firstValue(employee, ["phone", "mobile_number", "mobileNumber"])],
    ["Gender", firstValue(employee, ["gender"])],
    ["Date of Birth", formatDate(firstValue(employee, ["dob", "date_of_birth", "dateOfBirth"], "—"))],
    ["Joining Date", formatDate(firstValue(employee, ["joining_date", "joiningDate"], "—"))],
    ["Employment Type", firstValue(employee, ["employment_type", "employmentType"])],
    ["Work Location", firstValue(employee, ["work_location", "workLocation"])],
    ["Father Name", firstValue(personalInfo, ["father_name", "fatherName"])],
    ["Father Aadhaar", firstValue(personalInfo, ["father_aadhaar_number", "fatherAadhaarNumber"])],
    ["Mother Name", firstValue(personalInfo, ["mother_name", "motherName"])],
    ["Mother Aadhaar", firstValue(personalInfo, ["mother_aadhaar_number", "motherAadhaarNumber"])],
    ["Marital Status", firstValue(personalInfo, ["marital_status", "maritalStatus"])],
    ["Nationality", firstValue(personalInfo, ["nationality"])],
    ["Blood Group", firstValue(personalInfo, ["blood_group", "bloodGroup"])],
    ["Emergency Contact", firstValue(personalInfo, ["emergency_contact_name", "emergencyContactName"])],
    ["Emergency Mobile", firstValue(personalInfo, ["emergency_contact_number", "emergencyContactNumber"])],
    ["Emergency Relation", firstValue(personalInfo, ["emergency_contact_relation", "emergencyContactRelation"])],
  ];

  const addressFields = (address) => [
    ["House No", firstValue(address, ["house_no", "houseNo"])],
    ["Street", firstValue(address, ["street"])],
    ["City", firstValue(address, ["city"])],
    ["State", firstValue(address, ["state"])],
    ["Pincode", firstValue(address, ["pincode", "pin_code"])],
    ["Country", firstValue(address, ["country"])],
  ];

  return (
    <section className={styles["employee-details-page"]}>
      <button
        type="button"
        className={styles["details-back-link"]}
        onClick={() => navigate("/hr/employeemanagement")}
      >
        <ArrowLeft size={17} /> Back to Employees
      </button>

      <div className={styles["employee-details-hero"]}>
        <div className={styles["employee-hero-main"]}>
          <div className={styles["employee-details-avatar"]}>
            {`${firstValue(employee, ["first_name", "firstName"], "")[0] || ""}${
              firstValue(employee, ["last_name", "lastName"], "")[0] || ""
            }`}
          </div>

          <div>
            <p className={styles["details-eyebrow"]}>Employee Details</p>
            <h1>{fullName}</h1>
            <div className={styles["employee-hero-meta"]}>
              <span>{firstValue(employee, ["department_name", "departmentName"])}</span>
              <span>{firstValue(employee, ["designation_name", "designationName"])}</span>
              <span className={[styles["details-status"], styles[statusClass]].filter(Boolean).join(" ")}>
                {firstValue(employee, ["status", "employee_status"], "Unknown")}
              </span>
            </div>
          </div>
        </div>

        <div className={styles["employee-hero-actions"]}>
          <button type="button" className={styles["details-edit-button"]} onClick={handleEdit}>
            <Pencil size={17} /> Edit
          </button>
          <button type="button" className={styles["details-delete-button"]} onClick={handleDelete}>
            <Trash2 size={17} /> Delete
          </button>
        </div>
      </div>

      <div className={styles["employee-details-card"]}>
        <div className={styles["details-tabs"]} role="tablist" aria-label="Employee information">
          {[
            ["personal", "Personal"],
            ["documents", "Documents"],
            ["address", "Address"],
          ].map(([key, label]) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={activeTab === key}
              className={[styles["details-tab"], (activeTab === key ? styles["active"] : "")].filter(Boolean).join(" ")}
              onClick={() => setActiveTab(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className={styles["details-tab-content"]}>
          {activeTab === "personal" && (
            <div className={styles["details-section"]}>
              <h2>Personal Information</h2>
              <div className={styles["details-grid"]}>
                {personalFields.map(([label, value]) => (
                  <div className={styles["detail-field"]} key={label}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "documents" && (
            <div className={styles["details-section"]}>
              <h2>Documents</h2>
              {documentsLoading ? (
                <div className={styles["details-empty"]}>Loading documents...</div>
              ) : documentsError ? (
                <div className={styles["details-error"]}>{documentsError}</div>
              ) : documents.length === 0 ? (
                <div className={styles["details-empty"]}>No documents found for this employee.</div>
              ) : (
                <div className={styles["documents-list"]}>
                  {documents.map((doc) => {
                    const url = `${import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"}/documents/${doc.id}`;
                    const name = firstValue(
                      doc,
                      ["original_file_name", "originalFileName", "document_name", "documentName"],
                      "Document",
                    );
                    const type = firstValue(
                      doc,
                      ["document_type", "documentType", "type"],
                      "—",
                    );

                    return (
                      <div className={styles["document-row"]} key={doc.id || `${name}-${type}`}>
                        <div className={styles["document-info"]}>
                          <strong>{name}</strong>
                          <span>{type}</span>
                        </div>
                        <div className={styles["document-actions"]}>
                          <a
                            className={styles["document-action"]}
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Eye size={16} /> View
                          </a>
                          <button
                            type="button"
                            className={styles["document-action"]}
                            onClick={() => handleDownload(doc)}
                            disabled={downloadingId === doc.id}
                          >
                            <Download size={16} />
                            {downloadingId === doc.id ? "Downloading..." : "Download"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === "address" && (
            <div className={styles["details-section"]}>
              <h2>Address</h2>
              <div className={styles["address-columns"]}>
                <div className={styles["address-block"]}>
                  <h3>Current Address</h3>
                  <div className={styles["details-grid"]}>
                    {addressFields(currentAddress).map(([label, value]) => (
                      <div className={styles["detail-field"]} key={`current-${label}`}>
                        <span>{label}</span>
                        <strong>{value}</strong>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles["address-block"]}>
                  <h3>Permanent Address</h3>
                  <div className={styles["details-grid"]}>
                    {addressFields(permanentAddress).map(([label, value]) => (
                      <div className={styles["detail-field"]} key={`permanent-${label}`}>
                        <span>{label}</span>
                        <strong>{value}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EmployeeDetails;
