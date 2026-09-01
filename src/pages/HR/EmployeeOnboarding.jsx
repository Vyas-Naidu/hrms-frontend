import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EmployeeOnboarding.css";

import {
  Check,
  ArrowLeft,
  ArrowRight,
  FileText,
  GraduationCap,
  Briefcase,
  File,
} from "lucide-react";

import { departmentApi } from "../../services/api/department.api";
import { designationApi } from "../../services/api/designation.api";
import { employeeApi } from "../../services/api/employee.api";

const EmployeeOnboarding = () => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);

  // ==========================================
  // BACKEND OPTIONS
  // ==========================================

  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);

  const [isLoadingOptions, setIsLoadingOptions] = useState(true);
  const [optionsError, setOptionsError] = useState("");

  // ==========================================
  // SUBMISSION STATE
  // ==========================================

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // ==========================================
  // FORM DATA
  // ==========================================

  const [formData, setFormData] = useState({
    // Employee Registration
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    gender: "",
    dateOfBirth: "",
    joiningDate: "",

    // Backend IDs
    department: "",
    designation: "",

    reportingManager: "",
    employmentType: "",
    workLocation: "",
    employeeStatus: "",

    // Personal Information
    fatherName: "",
    fatherAadharNumber: "",
    motherName: "",
    MotherAadharNumber: "",
    maritalStatus: "",
    nationality: "",
    bloodGroup: "",
    emergencyName: "",
    emergencyMobile: "",
    emergencyRelation: "",

    // Address
    houseNo: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",

    // Permanent Address
    permanentHouseNo: "",
    permanentStreet: "",
    permanentCity: "",
    permanentState: "",
    permanentPincode: "",
    permanentCountry: "",
    permanentAddress: "",

    // Current Address
    currentHouseNo: "",
    currentStreet: "",
    currentCity: "",
    currentState: "",
    currentPincode: "",
    currentCountry: "",
    currentAddress: "",

    sameAsPermanent: false,

    // Documents
    documents: [],
  });

  // ==========================================
  // LOAD DEPARTMENTS + DESIGNATIONS
  // ==========================================

  useEffect(() => {
    const loadRegistrationOptions = async () => {
      try {
        setIsLoadingOptions(true);
        setOptionsError("");

        const [departmentResponse, designationResponse] = await Promise.all([
          departmentApi.getAll(),
          designationApi.getAll(),
        ]);

        setDepartments(departmentResponse.data);
        setDesignations(designationResponse.data);
      } catch (error) {
        console.error("Failed to load departments/designations:", error);

        setOptionsError(
          "Unable to load departments and designations. Please refresh and try again.",
        );
      } finally {
        setIsLoadingOptions(false);
      }
    };

    loadRegistrationOptions();
  }, []);

  // ==========================================
  // FORM UPDATE
  // ==========================================

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ==========================================
  // BUILD BACKEND PAYLOAD
  // ==========================================

  const buildEmployeeData = () => {
    return {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,

      phone: formData.mobileNumber,
      gender: formData.gender,
      dob: formData.dateOfBirth,
      joiningDate: formData.joiningDate,

      departmentId: formData.department ? Number(formData.department) : null,

      designationId: formData.designation ? Number(formData.designation) : null,

      managerId: formData.reportingManager
        ? Number(formData.reportingManager)
        : null,

      employmentType: formData.employmentType,
      workLocation: formData.workLocation,

      status: formData.employeeStatus || "Active",
    };
  };
  const buildPersonalInfo = () => {
    return {
      fatherName: formData.fatherName,
      fatherAadhaarNumber: formData.fatherAadharNumber,
      motherName: formData.motherName,
      motherAadhaarNumber: formData.MotherAadharNumber,
      maritalStatus: formData.maritalStatus,
      nationality: formData.nationality,
      bloodGroup: formData.bloodGroup,
      emergencyContactName: formData.emergencyName,
      emergencyContactNumber: formData.emergencyMobile,
      emergencyContactRelation: formData.emergencyRelation,
    };
  };

  const buildAddresses = () => {
    return {
      sameAsCurrentAddress: formData.sameAsPermanent,
      permanentAddress: {
        houseNo: formData.permanentHouseNo,
        street: formData.permanentStreet,
        city: formData.permanentCity,
        state: formData.permanentState,
        pincode: formData.permanentPincode,
        country: formData.permanentCountry,
      },

      currentAddress: {
        houseNo: formData.currentHouseNo,
        street: formData.currentStreet,
        city: formData.currentCity,
        state: formData.currentState,
        pincode: formData.currentPincode,
        country: formData.currentCountry,
      },
    };
  };
 const buildDocumentsMetadata = () => {
  return formData.documents.map((document) => ({
    documentKey: document.documentKey,
    fileName: document.file.name,
  }));
};
  const appendDocumentFiles = (formDataToSend) => {
  formData.documents.forEach((document) => {
    switch (document.documentKey) {
      case "PROFILE_PHOTO":
        formDataToSend.append("profilePhoto", document.file);
        break;

      case "AADHAAR":
        formDataToSend.append("aadhaar", document.file);
        break;

      case "PAN":
        formDataToSend.append("pan", document.file);
        break;

      case "DRIVING_LICENSE":
        formDataToSend.append("drivingLicense", document.file);
        break;

      case "TENTH":
      case "INTERMEDIATE":
      case "DIPLOMA":
      case "DEGREE":
      case "PG":
        formDataToSend.append("education", document.file);
        break;

      case "EXPERIENCE":
        formDataToSend.append("experience", document.file);
        break;

      case "RESUME":
        formDataToSend.append("resume", document.file);
        break;

      default:
        console.warn(
          `Unsupported document key: ${document.documentKey}`,
        );
    }
  });
};
  // ==========================================
  // EMPLOYEE SUBMISSION
  // ==========================================

 const submitEmployee = async () => {
  try {
    setIsSubmitting(true);
    setSubmitError("");

    const employeeData = buildEmployeeData();
    const personalInfo = buildPersonalInfo();
    const addresses = buildAddresses();
    const documentsMetadata = buildDocumentsMetadata();

    const formDataToSend = new FormData();

    formDataToSend.append(
      "employeeData",
      JSON.stringify(employeeData),
    );

    formDataToSend.append(
      "personalInfo",
      JSON.stringify(personalInfo),
    );

    formDataToSend.append(
      "addresses",
      JSON.stringify(addresses),
    );

    formDataToSend.append(
      "documentsMetadata",
      JSON.stringify(documentsMetadata),
    );

    appendDocumentFiles(formDataToSend);

    console.log("Submitting employee registration...");
    console.log("employeeData:", employeeData);
    console.log("personalInfo:", personalInfo);
    console.log("addresses:", addresses);
    console.log("documentsMetadata:", documentsMetadata);

    // Validate required documents before sending the request.
    const uploadedDocumentKeys = formData.documents.map(
      (document) => document.documentKey,
    );

    const requiredDocumentKeys = [
      "PROFILE_PHOTO",
      "AADHAAR",
      "PAN",
      "TENTH",
      "DEGREE",
      "RESUME",
    ];

    const missingDocument = requiredDocumentKeys.find(
      (key) => !uploadedDocumentKeys.includes(key),
    );

    if (missingDocument) {
      throw new Error(`${missingDocument} document is required`);
    }

    const hasIntermediate = uploadedDocumentKeys.includes("INTERMEDIATE");
    const hasDiploma = uploadedDocumentKeys.includes("DIPLOMA");

    if (!hasIntermediate && !hasDiploma) {
      throw new Error(
        "Either Intermediate or Diploma certificate is required",
      );
    }

    if (hasIntermediate && hasDiploma) {
      throw new Error(
        "Upload either Intermediate or Diploma certificate, not both",
      );
    }

    const response = await employeeApi.create(formDataToSend);

    console.log(
      "Employee registration successful:",
      response.data,
    );

    const employeeCode =
      response.data?.employeeCode ||
      response.data?.employee?.employee_code;

    alert(
      employeeCode
        ? `Employee Registration Completed Successfully!\n\nEmployee Code: ${employeeCode}`
        : "Employee Registration Completed Successfully!",
    );

    navigate("/hr/employeemanagement");
  } catch (error) {
    console.error("Employee registration failed:", error);
    console.error("Status:", error.response?.status);
    console.error("Backend response:", error.response?.data);
    console.error("Backend message:", error.response?.data?.message);

    setSubmitError(
      error.response?.data?.message ||
        error.message ||
        "Employee registration failed. Please try again.",
    );
  } finally {
    setIsSubmitting(false);
  }
};

  // ==========================================
  // STEP NAVIGATION
  // ==========================================

  const nextStep = async () => {
    setSubmitError("");

    setCompletedSteps((prev) => {
      if (!prev.includes(currentStep)) {
        return [...prev, currentStep];
      }

      return prev;
    });

    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
      return;
    }

    await submitEmployee();
  };

  const previousStep = () => {
    if (isSubmitting) {
      return;
    }

    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    } else {
      navigate("/hr/employeemanagement");
    }
  };

  const steps = ["Employee", "Personal", "Address", "Documents"];

  return (
    <div className="employee-onboarding-page">
      <div className="wizard-card">
        {/* Header */}
        <div className="wizard-header">
          <h1>Create Employee</h1>
        </div>

        {/* Progress Steps */}
        <div className="progress-container">
          {steps.map((step, index) => {
            const stepNumber = index + 1;

            const isCompleted = completedSteps.includes(stepNumber);

            const isCurrent = currentStep === stepNumber;

            return (
              <React.Fragment key={step}>
                <div className="progress-step">
                  <div
                    className={`step-circle ${
                      isCompleted ? "completed" : isCurrent ? "current" : ""
                    }`}
                    onClick={() => {
                      if (isCompleted || stepNumber < currentStep) {
                        setCurrentStep(stepNumber);
                      }
                    }}
                  >
                    {isCompleted ? (
                      <Check size={18} strokeWidth={3} />
                    ) : (
                      stepNumber
                    )}
                  </div>

                  <span
                    className={`step-label ${
                      isCompleted
                        ? "completed-label"
                        : isCurrent
                          ? "current-label"
                          : ""
                    }`}
                  >
                    {step}
                  </span>
                </div>

                {index < steps.length - 1 && (
                  <div
                    className={`step-line ${
                      completedSteps.includes(stepNumber)
                        ? "completed-line"
                        : ""
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Form Content */}
        <div className="wizard-content">
          {optionsError && <div className="form-error">{optionsError}</div>}

          {submitError && <div className="form-error">{submitError}</div>}

          {currentStep === 1 && (
            <EmployeeRegistration
              formData={formData}
              updateField={updateField}
              departments={departments}
              designations={designations}
              isLoadingOptions={isLoadingOptions}
            />
          )}

          {currentStep === 2 && (
            <PersonalInformation
              formData={formData}
              updateField={updateField}
            />
          )}

          {currentStep === 3 && (
            <AddressManagement formData={formData} updateField={updateField} />
          )}

          {currentStep === 4 && (
            <DocumentManagement formData={formData} setFormData={setFormData} />
          )}
        </div>

        {/* Buttons */}
        <div className="wizard-buttons">
          <button
            type="button"
            className="back-btn"
            onClick={previousStep}
            disabled={isSubmitting}
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <button
            type="button"
            className="next-btn"
            onClick={nextStep}
            disabled={isSubmitting}
          >
            {currentStep === 4 ? (
              isSubmitting ? (
                "Submitting..."
              ) : (
                "Finish"
              )
            ) : (
              <>
                Save & Continue
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

/* =====================================================
   STEP 1 - EMPLOYEE REGISTRATION
===================================================== */

const EmployeeRegistration = ({
  formData,
  updateField,
  departments,
  designations,
  isLoadingOptions,
}) => {
  return (
    <div className="step-form">
      <h2>Employee Registration</h2>

      <p>Enter basic employee information</p>

      <div className="form-grid">
        <Input
          label="First Name"
          value={formData.firstName}
          onChange={(e) => updateField("firstName", e.target.value)}
        />

        <Input
          label="Last Name"
          value={formData.lastName}
          onChange={(e) => updateField("lastName", e.target.value)}
        />

        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => updateField("email", e.target.value)}
        />

        <Input
          label="Mobile Number"
          value={formData.mobileNumber}
          onChange={(e) => updateField("mobileNumber", e.target.value)}
        />

        <Select
          label="Gender"
          value={formData.gender}
          onChange={(e) => updateField("gender", e.target.value)}
          options={["Male", "Female", "Other"]}
        />

        <Input
          label="Date of Birth"
          type="date"
          value={formData.dateOfBirth}
          onChange={(e) => updateField("dateOfBirth", e.target.value)}
        />

        <Input
          label="Joining Date"
          type="date"
          value={formData.joiningDate}
          onChange={(e) => updateField("joiningDate", e.target.value)}
        />

        <Select
          label="Department"
          value={formData.department}
          onChange={(e) => updateField("department", e.target.value)}
          disabled={isLoadingOptions}
          options={departments.map((department) => ({
            value: String(department.id),
            label: department.department_name,
          }))}
        />

        <Select
          label="Designation"
          value={formData.designation}
          onChange={(e) => updateField("designation", e.target.value)}
          disabled={isLoadingOptions}
          options={designations.map((designation) => ({
            value: String(designation.id),
            label: designation.designation_name,
          }))}
        />

        <Input
          label="Reporting Manager"
          value={formData.reportingManager}
          onChange={(e) => updateField("reportingManager", e.target.value)}
        />

        <Select
          label="Employment Type"
          value={formData.employmentType}
          onChange={(e) => updateField("employmentType", e.target.value)}
          options={["Full Time", "Part Time", "Contract", "Intern", "Training"]}
        />

        <Input
          label="Work Location"
          value={formData.workLocation}
          onChange={(e) => updateField("workLocation", e.target.value)}
        />

        <Select
          label="Status"
          value={formData.employeeStatus}
          onChange={(e) => updateField("employeeStatus", e.target.value)}
          options={["Active", "Inactive", "Resigned"]}
        />
      </div>
    </div>
  );
};

/* =====================================================
   STEP 2 - PERSONAL INFORMATION
===================================================== */

const PersonalInformation = ({ formData, updateField }) => {
  return (
    <div className="step-form">
      <h2>Personal Information</h2>

      <p>Enter employee personal details</p>

      <div className="form-grid">
        <Input
          label="Father Name"
          value={formData.fatherName}
          onChange={(e) => updateField("fatherName", e.target.value)}
        />

        <Input
          label="Father AadharNumber"
          value={formData.fatherAadharNumber}
          onChange={(e) => updateField("fatherAadharNumber", e.target.value)}
        />

        <Input
          label="Mother Name"
          value={formData.motherName}
          onChange={(e) => updateField("motherName", e.target.value)}
        />

        <Input
          label="Mother AadharNumber"
          value={formData.MotherAadharNumber}
          onChange={(e) => updateField("MotherAadharNumber", e.target.value)}
        />

        <Select
          label="Marital Status"
          value={formData.maritalStatus}
          onChange={(e) => updateField("maritalStatus", e.target.value)}
          options={["Single", "Married", "Divorced", "Widowed"]}
        />

        <Input
          label="Nationality"
          value={formData.nationality}
          onChange={(e) => updateField("nationality", e.target.value)}
        />

        <Select
          label="Blood Group"
          value={formData.bloodGroup}
          onChange={(e) => updateField("bloodGroup", e.target.value)}
          options={["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]}
        />

        <Input
          label="Emergency Contact Number"
          value={formData.emergencyMobile}
          onChange={(e) => updateField("emergencyMobile", e.target.value)}
        />
      </div>
    </div>
  );
};

/* =====================================================
   STEP 3 - ADDRESS
===================================================== */

const AddressManagement = ({ formData, updateField }) => {
  const copyPermanentToCurrent = (checked) => {
    updateField("sameAsPermanent", checked);

    if (checked) {
      updateField("currentHouseNo", formData.permanentHouseNo);

      updateField("currentStreet", formData.permanentStreet);

      updateField("currentCity", formData.permanentCity);

      updateField("currentState", formData.permanentState);

      updateField("currentPincode", formData.permanentPincode);

      updateField("currentCountry", formData.permanentCountry);

      updateField("currentAddress", formData.permanentAddress);
    }
  };

  return (
    <div className="step-form">
      <h2>Address Management</h2>

      <p>Enter employee permanent and current address details</p>

      <h3 className="address-section-title">Permanent Address</h3>

      <div className="form-grid">
        <Input
          label="House No"
          value={formData.permanentHouseNo}
          onChange={(e) => updateField("permanentHouseNo", e.target.value)}
        />

        <Input
          label="Street"
          value={formData.permanentStreet}
          onChange={(e) => updateField("permanentStreet", e.target.value)}
        />

        <Input
          label="City"
          value={formData.permanentCity}
          onChange={(e) => updateField("permanentCity", e.target.value)}
        />

        <Input
          label="State"
          value={formData.permanentState}
          onChange={(e) => updateField("permanentState", e.target.value)}
        />

        <Input
          label="Pincode"
          value={formData.permanentPincode}
          onChange={(e) => updateField("permanentPincode", e.target.value)}
        />

        <Input
          label="Country"
          value={formData.permanentCountry}
          onChange={(e) => updateField("permanentCountry", e.target.value)}
        />

        <Input
          label="Permanent Address"
          value={formData.permanentAddress}
          onChange={(e) => updateField("permanentAddress", e.target.value)}
        />
      </div>

      <div className="address-copy-option">
        <label>
          <input
            type="checkbox"
            checked={formData.sameAsPermanent}
            onChange={(e) => copyPermanentToCurrent(e.target.checked)}
          />
          Same as Permanent Address
        </label>
      </div>

      <h3 className="address-section-title">Current Address</h3>

      <div className="form-grid">
        <Input
          label="House No"
          value={formData.currentHouseNo}
          onChange={(e) => updateField("currentHouseNo", e.target.value)}
        />

        <Input
          label="Street"
          value={formData.currentStreet}
          onChange={(e) => updateField("currentStreet", e.target.value)}
        />

        <Input
          label="City"
          value={formData.currentCity}
          onChange={(e) => updateField("currentCity", e.target.value)}
        />

        <Input
          label="State"
          value={formData.currentState}
          onChange={(e) => updateField("currentState", e.target.value)}
        />

        <Input
          label="Pincode"
          value={formData.currentPincode}
          onChange={(e) => updateField("currentPincode", e.target.value)}
        />

        <Input
          label="Country"
          value={formData.currentCountry}
          onChange={(e) => updateField("currentCountry", e.target.value)}
        />

        <Input
          label="Current Address"
          value={formData.currentAddress}
          onChange={(e) => updateField("currentAddress", e.target.value)}
        />
      </div>
    </div>
  );
};

/* =====================================================
   STEP 4 - DOCUMENT MANAGEMENT
===================================================== */

const DocumentManagement = ({ formData, setFormData }) => {
  const documentOptions = [
    {
      key: "AADHAAR",
      label: "Aadhaar",
      type: "document",
    },
    {
      key: "PAN",
      label: "PAN",
      type: "document",
    },
    {
      key: "PROFILE_PHOTO",
      label: "Passport Size Photo",
      type: "photo",
    },
    {
      key: "DRIVING_LICENSE",
      label: "Driving License",
      type: "document",
    },
    {
      key: "TENTH",
      label: "10th Certificate",
      type: "education",
    },
    {
      key: "INTERMEDIATE",
      label: "Intermediate Certificate",
      type: "education",
    },
    {
      key: "DIPLOMA",
      label: "Diploma Certificate",
      type: "education",
    },
    {
      key: "DEGREE",
      label: "Degree Certificate",
      type: "education",
    },
    {
      key: "EXPERIENCE",
      label: "Experience Letter",
      type: "experience",
    },
    {
      key: "RESUME",
      label: "Resume",
      type: "resume",
    },
  ];

  const addDocument = (documentKey, e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const documentDefinition = documentOptions.find(
      (document) => document.key === documentKey,
    );

    if (!documentDefinition) {
      return;
    }

    const newDocument = {
      documentKey,
      documentName: file.name,
      documentType: documentDefinition.type,
      file,
      fileUrl: URL.createObjectURL(file),
      uploadedDate: new Date().toLocaleDateString(),
    };

    setFormData((prev) => ({
      ...prev,
      documents: [
        ...prev.documents.filter(
          (document) => document.documentKey !== documentKey,
        ),
        newDocument,
      ],
    }));

    e.target.value = "";
  };

  const removeDocument = (documentKey) => {
    setFormData((prev) => {
      const documentToRemove = prev.documents.find(
        (document) => document.documentKey === documentKey,
      );

      if (documentToRemove?.fileUrl) {
        URL.revokeObjectURL(documentToRemove.fileUrl);
      }

      return {
        ...prev,
        documents: prev.documents.filter(
          (document) => document.documentKey !== documentKey,
        ),
      };
    });
  };

  const getUploadedDocument = (documentKey) => {
    return formData.documents.find(
      (document) => document.documentKey === documentKey,
    );
  };

  return (
    <div className="step-form">
      <h2>Document Management</h2>

      <p>Upload employee documents</p>

      <div className="document-options">
        {documentOptions.map((document) => {
          const uploadedDocument = getUploadedDocument(document.key);

          return (
            <label className="document-box" key={document.key}>
              <span>
                {document.type === "education" ? (
                  <GraduationCap size={24} />
                ) : document.type === "experience" ? (
                  <Briefcase size={24} />
                ) : document.type === "photo" ? (
                  <File size={24} />
                ) : (
                  <FileText size={24} />
                )}
              </span>

              {document.label}

              <input
                type="file"
                onChange={(e) => addDocument(document.key, e)}
              />

              {uploadedDocument && (
                <small>✓ {uploadedDocument.documentName}</small>
              )}
            </label>
          );
        })}
      </div>

      {formData.documents.length > 0 && (
        <div className="uploaded-documents">
          <h3>Uploaded Documents</h3>

          {formData.documents.map((document) => (
            <div className="uploaded-document" key={document.documentKey}>
              <div>
                <span>{document.documentName}</span>
                <small>
                  {document.documentKey} · {document.uploadedDate}
                </small>
              </div>

              <button
                type="button"
                onClick={() => removeDocument(document.documentKey)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
/* =====================================================
   REUSABLE INPUT
===================================================== */

const Input = ({ label, type = "text", value, onChange }) => {
  return (
    <div className="form-group">
      <label>{label}</label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={`Enter ${label}`}
      />
    </div>
  );
};

/* =====================================================
   REUSABLE SELECT
===================================================== */

const Select = ({ label, value, onChange, options, disabled = false }) => {
  return (
    <div className="form-group">
      <label>{label}</label>

      <select value={value} onChange={onChange} disabled={disabled}>
        <option value="">
          {disabled ? `Loading ${label}...` : `Select ${label}`}
        </option>

        {options.map((option) => {
          const optionValue =
            typeof option === "object" ? option.value : option;

          const optionLabel =
            typeof option === "object" ? option.label : option;

          return (
            <option key={optionValue} value={optionValue}>
              {optionLabel}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default EmployeeOnboarding;