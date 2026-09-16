import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  BriefcaseBusiness,
  CalendarDays,
  Camera,
  CheckCircle2,
  Clock3,
  DeleteIcon,
  Download,
  Edit3,
  Eye,
  FileText,
  Home,
  Mail,
  MapPin,
  MoreHorizontal,
  Phone,
  Trash2,
  User,
  UserRound,
  Users,
} from "lucide-react";

import { employeeApi } from "../../services/api/employee.api";

import {
  clearSelectedEmployee,
  fetchEmployeeById,
} from "../../store/slices/employeeSlice";

import styles from "./EmployeeDetails.module.css";


/* =====================================================
   HELPERS
===================================================== */

const firstValue = (object, keys, fallback = "—") => {
  for (const key of keys) {
    const value = object?.[key];

    if (
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ""
    ) {
      return value;
    }
  }

  return fallback;
};


const normalizeList = (response) => {
  if (Array.isArray(response?.data)) {
    return response.data;
  }

  if (Array.isArray(response?.data?.value)) {
    return response.data.value;
  }

  if (Array.isArray(response?.data?.documents)) {
    return response.data.documents;
  }

  return [];
};


const formatDate = (value) => {
  if (!value || value === "—") {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};


const getFileNameFromHeaders = (headers, fallback) => {
  const disposition =
    headers?.["content-disposition"] || "";

  const match = disposition.match(
    /filename="?([^";]+)"?/i
  );

  return match?.[1] || fallback;
};


/* =====================================================
   COMPONENT
===================================================== */

const EmployeeDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    selectedEmployee,
    isLoadingById,
    errorById,
  } = useSelector((state) => state.employees);


  const [activeView, setActiveView] =
    useState("overview");

  const [documents, setDocuments] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [documentsLoading, setDocumentsLoading] =
    useState(false);

  const [documentsError, setDocumentsError] =
    useState("");

  const [downloadingId, setDownloadingId] =
    useState(null);


  /* =====================================================
     GET EMPLOYEE
  ===================================================== */

  useEffect(() => {
    if (!id) return;

    dispatch(fetchEmployeeById(id));

    return () => {
      dispatch(clearSelectedEmployee());
    };
  }, [dispatch, id]);


  /* =====================================================
     GET DOCUMENTS
  ===================================================== */

  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    const loadDocuments = async () => {
      try {
        setDocumentsLoading(true);
        setDocumentsError("");

        const response = await employeeApi.getDocuments(id);

        const documentList = normalizeList(response);

        if (cancelled) return;

        setDocuments(documentList);

        console.log(
          "EMPLOYEE DOCUMENTS FULL DATA:",
          JSON.stringify(documentList, null, 2)
        );

        // Find the uploaded Passport Size Photo.
        // The GET /documents response shown in the console uses:
        // documentName: "Profile Photo"
        // documentType: "Profile"
        // Some backend versions may instead return document_type:
        // "PROFILE_PHOTO", so support both formats.
        const photoDocument = documentList.find((doc) => {
          const documentType = String(
            doc?.document_type ??
            doc?.documentType ??
            doc?.document_key ??
            doc?.documentKey ??
            ""
          )
            .trim()
            .toUpperCase();

          const documentName = String(
            doc?.document_name ??
            doc?.documentName ??
            ""
          )
            .trim()
            .toUpperCase();

          return (
            documentType === "PROFILE_PHOTO" ||
            documentName === "PROFILE PHOTO"
          );
        });

        console.log("PROFILE PHOTO DOCUMENT:", photoDocument);

        if (!photoDocument?.id) {
          console.log(
            "No Passport Size Photo found in employee documents:",
            documentList
          );
          setProfilePhoto(null);
          return;
        }

        // Download the actual uploaded photo from the document endpoint.
        const photoResponse =
          await employeeApi.downloadDocument(photoDocument.id);

        if (cancelled) return;

        // Get the actual image Blob
        const blob = photoResponse?.data;

        if (!(blob instanceof Blob)) {
          console.error(
            "Profile photo download did not return a valid Blob:",
            photoResponse
          );
          setProfilePhoto(null);
          return;
        }

        // Create image URL
        const photoUrl = window.URL.createObjectURL(blob);

        setProfilePhoto(photoUrl);

        // Keep the same photo for the sidebar
        localStorage.setItem("employeeProfilePhoto", photoUrl);

        window.dispatchEvent(new Event("profilePhotoUpdated"));

      } catch (error) {
        console.error(
          "Failed to load profile photo:",
          error
        );

        if (!cancelled) {
          setProfilePhoto(null);
          setDocumentsError(
            error?.response?.data?.message ||
            error?.message ||
            "Failed to load documents."
          );
        }
      } finally {
        if (!cancelled) {
          setDocumentsLoading(false);
        }
      }
    };

    loadDocuments();

    return () => {
      cancelled = true;
    };
  }, [id]);

  /* =====================================================
     DOWNLOAD DOCUMENT
  ===================================================== */

  const handleDownload = async (fileRecord) => {
    if (!fileRecord?.id) return;

    try {
      setDownloadingId(fileRecord.id);

      const response =
        await employeeApi.downloadDocument(
          fileRecord.id
        );

      const blob = response.data;

      const url =
        window.URL.createObjectURL(blob);

      const fallbackName =
        fileRecord.original_file_name ||
        fileRecord.originalFileName ||
        fileRecord.file_name ||
        fileRecord.fileName ||
        fileRecord.document_name ||
        fileRecord.documentName ||
        "document";

      const fileName =
        getFileNameFromHeaders(
          response.headers,
          fallbackName
        );

      const anchor =
        document.createElement("a");

      anchor.href = url;
      anchor.download = fileName;

      document.body.appendChild(anchor);

      anchor.click();

      anchor.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(
        "Document download failed:",
        error
      );

      setDocumentsError(
        error?.response?.data?.message ||
        error?.message ||
        "Failed to download document."
      );
    } finally {
      setDownloadingId(null);
    }
  };


  /* =====================================================
     EMPLOYEE DATA
  ===================================================== */

  const employee = selectedEmployee;


  const fullName = useMemo(() => {
    const firstName = firstValue(
      employee,
      ["first_name", "firstName"],
      ""
    );

    const lastName = firstValue(
      employee,
      ["last_name", "lastName"],
      ""
    );

    return (
      `${firstName} ${lastName}`.trim() ||
      "Employee"
    );
  }, [employee]);

  // ADD HERE
  useEffect(() => {
    if (!fullName || fullName === "Employee") return;

    localStorage.setItem("employeeProfileName", fullName);

    window.dispatchEvent(new Event("profilePhotoUpdated"));
  }, [fullName]);

  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((name) =>
      name.charAt(0).toUpperCase()
    )
    .join("");


  const status = firstValue(
    employee,
    ["status", "employee_status"],
    "Active"
  );


  const department = firstValue(employee, [
    "department_name",
    "departmentName",
  ]);


  const designation = firstValue(employee, [
    "designation_name",
    "designationName",
  ]);


  const employmentType = firstValue(employee, [
    "employment_type",
    "employmentType",
  ]);


  const joiningDate = firstValue(employee, [
    "joining_date",
    "joiningDate",
  ]);


  const workLocation = firstValue(employee, [
    "work_location",
    "workLocation",
  ]);


  const email = firstValue(
    employee,
    ["email"]
  );


  const phone = firstValue(employee, [
    "phone",
    "mobile_number",
    "mobileNumber",
  ]);


  const personalInfo =
    employee?.personal_info ||
    employee?.personalInfo ||
    {};


  const addresses =
    employee?.addresses || [];


  const currentAddress =
    addresses.find((address) =>
      ["current", "Current"].includes(
        address?.address_type
      )
    ) ||
    employee?.current_address ||
    employee?.currentAddress ||
    {};


  const permanentAddress =
    addresses.find((address) =>
      ["permanent", "Permanent"].includes(
        address?.address_type
      )
    ) ||
    employee?.permanent_address ||
    employee?.permanentAddress ||
    {};


  /* =====================================================
     EMPLOYEE INFORMATION
  ===================================================== */

  const personalFields = [
    [
      "Employee ID",
      firstValue(employee, [
        "employee_code",
        "employeeCode",
      ]),
    ],

    [
      "First Name",
      firstValue(employee, [
        "first_name",
        "firstName",
      ]),
    ],

    [
      "Last Name",
      firstValue(employee, [
        "last_name",
        "lastName",
      ]),
    ],

    [
      "Email",
      email,
    ],

    [
      "Phone",
      phone,
    ],

    [
      "Gender",
      firstValue(employee, ["gender"]),
    ],

    [
      "Date of Birth",
      formatDate(
        firstValue(employee, [
          "dob",
          "date_of_birth",
          "dateOfBirth",
        ])
      ),
    ],

    [
      "Joining Date",
      formatDate(joiningDate),
    ],

    [
      "Employment Type",
      employmentType,
    ],

    [
      "Work Location",
      workLocation,
    ],

    [
      "Father Name",
      firstValue(personalInfo, [
        "father_name",
        "fatherName",
      ]),
    ],

    [
      "Mother Name",
      firstValue(personalInfo, [
        "mother_name",
        "motherName",
      ]),
    ],

    [
      "Marital Status",
      firstValue(personalInfo, [
        "marital_status",
        "maritalStatus",
      ]),
    ],

    [
      "Nationality",
      firstValue(personalInfo, [
        "nationality",
      ]),
    ],

    [
      "Blood Group",
      firstValue(personalInfo, [
        "blood_group",
        "bloodGroup",
      ]),
    ],

    [
      "Emergency Contact",
      firstValue(personalInfo, [
        "emergency_contact_name",
        "emergencyContactName",
      ]),
    ],
  ];


  /* =====================================================
     ADDRESS FIELDS
  ===================================================== */

  const addressFields = (address) => [
    [
      "House No",
      firstValue(address, [
        "house_no",
        "houseNo",
      ]),
    ],

    [
      "Street",
      firstValue(address, ["street"]),
    ],

    [
      "City",
      firstValue(address, ["city"]),
    ],

    [
      "State",
      firstValue(address, ["state"]),
    ],

    [
      "Pincode",
      firstValue(address, [
        "pincode",
        "pin_code",
      ]),
    ],

    [
      "Country",
      firstValue(address, ["country"]),
    ],
  ];

  /* =====================================================
     BUTTON ACTIONS
  ===================================================== */

  const handleProfilePhotoChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Profile photo must be JPG, JPEG, or PNG");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Profile photo must not exceed 5 MB");
      event.target.value = "";
      return;
    }

    try {
      setUploadingPhoto(true);

      const formData = new FormData();

      formData.append(
        "documentsMetadata",
        JSON.stringify([
          {
            documentKey: "PROFILE_PHOTO",
            fileName: file.name,
          },
        ])
      );

      formData.append("profilePhoto", file);

      await employeeApi.uploadDocuments(id, formData);

      const newPhotoUrl = URL.createObjectURL(file);

      localStorage.setItem("employeeProfilePhoto", newPhotoUrl);
      localStorage.setItem("employeeProfileName", fullName);

      window.dispatchEvent(new Event("profilePhotoUpdated"));

      setProfilePhoto((oldUrl) => {
        if (oldUrl) {
          URL.revokeObjectURL(oldUrl);
        }

        return newPhotoUrl;
      });
      const response = await employeeApi.getDocuments(id);

      setDocuments(normalizeList(response));

      alert("Profile photo updated successfully!");
    } catch (error) {
      console.error(
        "Profile photo upload failed:",
        error
      );

      alert(
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update profile photo."
      );
    } finally {
      setUploadingPhoto(false);
      event.target.value = "";
    }
  };

  const handleEdit = () => {
    navigate(`/hr/employee-registration/${id}`);
  };


  const handleBack = () => {
    navigate("/hr/employeemanagement");
  };


  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Delete ${fullName}? This action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    try {
      await employeeApi.remove(id);

      navigate(
        "/hr/employeemanagement",
        {
          replace: true,
        }
      );
    } catch (error) {
      alert(
        error?.response?.data?.message ||
        error?.message ||
        "Failed to delete employee."
      );
    }
  };


  /* =====================================================
     LOADING
  ===================================================== */

  if (isLoadingById) {
    return (
      <div
        className={
          styles["employee-details-state"]
        }
      >
        Loading employee details...
      </div>
    );
  }


  if (errorById) {
    return (
      <div
        className={
          styles["employee-details-state"]
        }
      >
        <p>{errorById}</p>

        <button
          type="button"
          onClick={handleBack}
          className={
            styles["state-back-button"]
          }
        >
          <ArrowLeft size={16} />
          Back to Employees
        </button>
      </div>
    );
  }


  if (!employee) {
    return (
      <div
        className={
          styles["employee-details-state"]
        }
      >
        <p>Employee not found.</p>

        <button
          type="button"
          onClick={handleBack}
          className={
            styles["state-back-button"]
          }
        >
          <ArrowLeft size={16} />
          Back to Employees
        </button>
      </div>
    );
  }


  /* =====================================================
     MAIN PAGE
  ===================================================== */

  return (
    <div
      className={
        styles["employee-details-page"]
      }
    >

      {/* =================================================
          HEADER
      ================================================= */}

      <div
        className={
          styles["overview-header"]
        }
      >

        <div>
          <div className={styles["breadcrumb"]}>
            <button
              type="button"
              onClick={handleBack}
              className={styles["breadcrumb-link"]}
            >
              Employees
            </button>

            <span>/</span>

            <strong>Employee Overview</strong>
          </div>


          <p>
            View employee information and
            manage employee details.
          </p>

        </div>


        <div
          className={
            styles["header-actions"]
          }
        >

          <button
            type="button"
            className={
              styles["edit-button"]
            }
            onClick={handleEdit}
          >
            <Edit3 size={16} />
          </button>


          <button
            type="button"
            className={styles["delete-button"]}
            onClick={handleDelete}
            title="More / Delete"
          >
            <Trash2 size={17} />
          </button>

          {/* <button
            type="button"
            className={
              styles["back-button"]
            }
            onClick={handleBack}
          >
            <ArrowLeft size={16} />
            Back
          </button> */}

        </div>

      </div>




      {/* =================================================
    EMPLOYEE PROFILE
================================================= */}
      <section className={styles["employee-profile"]}>

        {/* LEFT - PHOTO + DETAILS */}
        <div className={styles["profile-left"]}>
          <div
            className={styles["profile-avatar"]}
            title="Click to change profile photo"
          >
            <label className={styles["profile-photo-label"]}>
              {profilePhoto ? (
                <img
                  src={profilePhoto}
                  alt={`${fullName} profile`}
                  className={styles["profile-photo"]}
                />
              ) : (
                <span className={styles["profile-initials"]}>
                  {initials || "E"}
                </span>
              )}

              <input
                type="file"
                accept="image/jpeg,image/png"
                onChange={handleProfilePhotoChange}
                disabled={uploadingPhoto}
                className={styles["profile-photo-input"]}
              />

              <span className={styles["profile-photo-overlay"]}>
                {uploadingPhoto ? "Uploading..." : " "}
              </span>
            </label>

            {/* Camera button */}
            <label className={styles["camera-button"]}>
              <Camera size={20} strokeWidth={2.5} />

              <input
                type="file"
                accept="image/jpeg,image/png"
                onChange={handleProfilePhotoChange}
                disabled={uploadingPhoto}
                className={styles["camera-input"]}
              />
            </label>
          </div>
          {/* Employee Details */}
          <div className={styles["profile-details"]}>

            {/* Name + Status */}
            <div className={styles["profile-name-row"]}>

              <h2>{fullName}</h2>

              <span
                className={
                  status?.toLowerCase() === "inactive"
                    ? styles["inactive-badge"]
                    : styles["active-badge"]
                }
              >
                <span />
                {status}
              </span>

            </div>

            {/* Designation */}
            <div className={styles["profile-designation"]}>
              {designation}
            </div>

            {/* Contact Information */}
            <div className={styles["profile-contact"]}>

              <span>
                <Mail size={16} />
                {email}
              </span>
              <div className={styles["profile-contact"]}>
                <span>
                  <Phone size={16} />
                  {phone}
                </span>
              </div>



              <div className={styles["profile-contact"]}></div>
              <span>
                <MapPin size={16} />
                {workLocation}
              </span>

              <span>
                <CalendarDays size={16} />
                Joined {formatDate(joiningDate)}
              </span>

            </div>

          </div>
        </div>

      </section>



      {/* =================================================
          SUMMARY CARDS
      ================================================= */}

      <div
        className={
          styles["overview-summary"]
        }
      >

        {/* YEARS */}

        <div
          className={`${styles["summary-card"]} ${styles["green-card"]}`}
        >

          <div
            className={
              styles["summary-icon"]
            }
          >
            <Clock3 size={21} />
          </div>


          <div>

            <span>
              Years of Service
            </span>

            <strong>
              {joiningDate !== "—"
                ? `${Math.max(
                  0,
                  (
                    (
                      new Date() -
                      new Date(joiningDate)
                    ) /
                    (1000 * 60 * 60 * 24 * 365)
                  )
                ).toFixed(1)} Years`
                : "—"}
            </strong>

          </div>

        </div>


        {/* DEPARTMENT */}

        <div
          className={`${styles["summary-card"]} ${styles["blue-card"]}`}
        >

          <div
            className={
              styles["summary-icon"]
            }
          >
            <Users size={21} />
          </div>


          <div>

            <span>
              Department
            </span>

            <strong>
              {department}
            </strong>

          </div>

        </div>


        {/* DESIGNATION */}

        <div
          className={`${styles["summary-card"]} ${styles["purple-card"]}`}
        >

          <div
            className={
              styles["summary-icon"]
            }
          >
            <BriefcaseBusiness size={21} />
          </div>


          <div>

            <span>
              Designation
            </span>

            <strong>
              {designation}
            </strong>

          </div>

        </div>


        {/* TYPE */}

        <div
          className={`${styles["summary-card"]} ${styles["yellow-card"]}`}
        >

          <div
            className={
              styles["summary-icon"]
            }
          >
            <UserRound size={21} />
          </div>


          <div>

            <span>
              Employment Type
            </span>

            <strong>
              {employmentType}
            </strong>

          </div>

        </div>

      </div>



      {/* =================================================
          OVERVIEW
      ================================================= */}

      {activeView === "overview" && (

        <div
          className={
            styles["overview-grid"]
          }
        >

          {/* =============================================
              EMPLOYEE INFORMATION
          ============================================= */}

          <section
            className={
              styles["information-card"]
            }
          >

            <div
              className={
                styles["card-heading"]
              }
            >

              <div>

                <h3>
                  Employee Information
                </h3>

                <p>
                  Personal and employment
                  information
                </p>

              </div>

              <User size={19} />

            </div>


            <div className={styles["information-table"]}>
              {personalFields.map(([label, value]) => (
                <div
                  className={styles["information-row"]}
                  key={label}
                >
                  <span className={styles["information-label"]}>
                    {label}
                  </span>
                  <strong className={styles["information-value"]}>
                    {value}
                  </strong>
                </div>
              ))}
            </div>

          </section>


          {/* =============================================
              RIGHT SIDE
          ============================================= */}

          <div
            className={
              styles["right-column"]
            }
          >

            {/* =========================================
                RECENT ACTIVITY
            ========================================= */}

            <section
              className={
                styles["activity-card"]
              }
            >

              <div
                className={
                  styles["card-heading"]
                }
              >

                <div>

                  <h3>
                    Recent Activity
                  </h3>

                  <p>
                    Latest employee updates
                  </p>

                </div>

                <Clock3 size={19} />

              </div>


              <div
                className={
                  styles["activity-list"]
                }
              >

                <div
                  className={
                    styles["activity-item"]
                  }
                >

                  <div
                    className={
                      styles["activity-icon-green"]
                    }
                  >
                    <Edit3 size={16} />
                  </div>


                  <div>

                    <strong>
                      Profile updated
                    </strong>

                    <span>
                      Employee information
                      available
                    </span>

                  </div>


                  <small>
                    Recent
                  </small>

                </div>


                <div
                  className={
                    styles["activity-item"]
                  }
                >

                  <div
                    className={
                      styles["activity-icon-blue"]
                    }
                  >
                    <CalendarDays size={16} />
                  </div>


                  <div>

                    <strong>
                      Employee joined
                    </strong>

                    <span>
                      Joining date recorded
                    </span>

                  </div>


                  <small>
                    {formatDate(joiningDate)}
                  </small>

                </div>


                <div
                  className={
                    styles["activity-item"]
                  }
                >

                  <div
                    className={
                      styles["activity-icon-purple"]
                    }
                  >
                    <FileText size={16} />
                  </div>


                  <div>

                    <strong>
                      Documents uploaded
                    </strong>

                    <span>
                      Employee documents
                      available
                    </span>

                  </div>


                  <small>
                    {documents.length}
                  </small>

                </div>


                <div
                  className={
                    styles["activity-item"]
                  }
                >

                  <div
                    className={
                      styles["activity-icon-orange"]
                    }
                  >
                    <CheckCircle2 size={16} />
                  </div>


                  <div>

                    <strong>
                      Attendance status
                    </strong>

                    <span>
                      Employee is currently
                      active
                    </span>

                  </div>


                  <small>
                    Active
                  </small>

                </div>

              </div>

            </section>


            {/* =========================================
                QUICK ACTIONS
            ========================================= */}

            <section
              className={
                styles["quick-card"]
              }
            >

              <div
                className={
                  styles["card-heading"]
                }
              >

                <div>

                  <h3>
                    Quick Actions
                  </h3>

                  <p>
                    Frequently used actions
                  </p>

                </div>

                <MoreHorizontal size={19} />

              </div>


              <div
                className={
                  styles["quick-actions"]
                }
              >

                <button
                  type="button"
                  className={
                    styles["quick-action-blue"]
                  }
                  onClick={handleEdit}
                >
                  <Edit3 size={18} />

                  <span>
                    Edit
                  </span>
                </button>


                <button
                  type="button"
                  className={
                    styles["quick-action-green"]
                  }
                  onClick={() =>
                    setActiveView("documents")
                  }
                >
                  <FileText size={18} />

                  <span>
                    Documents
                  </span>
                </button>


                <button
                  type="button"
                  className={
                    styles["quick-action-purple"]
                  }
                  onClick={() =>
                    setActiveView("address")
                  }
                >
                  <MapPin size={18} />

                  <span>
                    Address
                  </span>
                </button>

              </div>

            </section>

          </div>

        </div>

      )}


      {/* =================================================
          DOCUMENTS
      ================================================= */}

      {activeView === "documents" && (

        <section
          className={
            styles["full-card"]
          }
        >

          <div
            className={
              styles["view-header"]
            }
          >

            <div>

              <h3>
                Employee Documents
              </h3>

              <p>
                Documents uploaded for this
                employee.
              </p>

            </div>


            <button
              type="button"
              className={
                styles["small-back"]
              }
              onClick={() =>
                setActiveView("overview")
              }
            >
              <ArrowLeft size={15} />
              Overview
            </button>

          </div>


          {documentsLoading ? (

            <div
              className={
                styles["empty-box"]
              }
            >
              Loading documents...
            </div>

          ) : documentsError ? (

            <div
              className={
                styles["error-box"]
              }
            >
              {documentsError}
            </div>

          ) : documents.length === 0 ? (

            <div
              className={
                styles["empty-box"]
              }
            >
              No documents found.
            </div>

          ) : (

            <div
              className={
                styles["documents-list"]
              }
            >

              {documents.map((doc) => {

                const url = `${import.meta.env.VITE_API_BASE_URL ||
                  "http://localhost:3000"
                  }/documents/${doc.id}`;


                const name = firstValue(
                  doc,
                  [
                    "original_file_name",
                    "originalFileName",
                    "document_name",
                    "documentName",
                  ],
                  "Document"
                );


                const type = firstValue(
                  doc,
                  [
                    "document_type",
                    "documentType",
                    "type",
                  ],
                  "Document"
                );


                return (

                  <div
                    className={
                      styles["document-row"]
                    }
                    key={
                      doc.id ||
                      `${name}-${type}`
                    }
                  >

                    <div
                      className={
                        styles["document-info"]
                      }
                    >

                      <div
                        className={
                          styles["document-icon"]
                        }
                      >
                        <FileText size={18} />
                      </div>


                      <div>

                        <strong>
                          {name}
                        </strong>

                        <span>
                          {type}
                        </span>

                      </div>

                    </div>


                    <div
                      className={
                        styles["document-actions"]
                      }
                    >

                      <a
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className={
                          styles["document-button"]
                        }
                      >
                        <Eye size={15} />
                        View
                      </a>


                      <button
                        type="button"
                        onClick={() =>
                          handleDownload(doc)
                        }
                        disabled={
                          downloadingId ===
                          doc.id
                        }
                        className={
                          styles["document-button"]
                        }
                      >
                        <Download size={15} />

                        {downloadingId ===
                          doc.id
                          ? "Downloading..."
                          : "Download"}
                      </button>

                    </div>

                  </div>

                );
              })}

            </div>

          )}

        </section>

      )}


      {/* =================================================
          ADDRESS
      ================================================= */}

      {activeView === "address" && (

        <section
          className={
            styles["full-card"]
          }
        >

          <div
            className={
              styles["view-header"]
            }
          >

            <div>

              <h3>
                Address Information
              </h3>

              <p>
                Current and permanent
                address.
              </p>

            </div>


            <button
              type="button"
              className={
                styles["small-back"]
              }
              onClick={() =>
                setActiveView("overview")
              }
            >
              <ArrowLeft size={15} />
              Overview
            </button>

          </div>


          <div
            className={
              styles["address-grid"]
            }
          >

            <div
              className={
                styles["address-card"]
              }
            >

              <h4>
                <MapPin size={17} />
                Current Address
              </h4>


              {addressFields(
                currentAddress
              ).map(([label, value]) => (

                <div
                  className={
                    styles["address-row"]
                  }
                  key={`current-${label}`}
                >

                  <span>
                    {label}
                  </span>

                  <strong>
                    {value}
                  </strong>

                </div>

              ))}

            </div>


            <div
              className={
                styles["address-card"]
              }
            >

              <h4>
                <Home size={17} />
                Permanent Address
              </h4>


              {addressFields(
                permanentAddress
              ).map(([label, value]) => (

                <div
                  className={
                    styles["address-row"]
                  }
                  key={`permanent-${label}`}
                >

                  <span>
                    {label}
                  </span>

                  <strong>
                    {value}
                  </strong>

                </div>

              ))}

            </div>

          </div>

        </section>

      )}

    </div>
  );
};


export default EmployeeDetails;