import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import JobOpenings from "./JobOpenings";
import Applications from "./Applications";
import Interviews from "./Interviews";
import Offers from "./Offers";
import Onboarding from "./Onboarding";

import styles from "./RecruitmentManagement.module.css";

const tabs = [
  {
    id: "job-openings",
    label: "Job Openings",
    component: JobOpenings,
  },
  {
    id: "applications",
    label: "Applications",
    component: Applications,
  },
  {
    id: "interviews",
    label: "Interviews",
    component: Interviews,
  },
  {
    id: "offers",
    label: "Offers",
    component: Offers,
  },
  {
    id: "onboarding",
    label: "Onboarding",
    component: Onboarding,
  },
];

function RecruitmentManagement() {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTabFromUrl = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState(
    tabs.some((tab) => tab.id === activeTabFromUrl)
      ? activeTabFromUrl
      : "job-openings",
  );

  const activeTabConfig = tabs.find((tab) => tab.id === activeTab);
  const ActiveComponent = activeTabConfig.component;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>Recruitment Management</h1>
          <p>Manage the complete recruitment process.</p>
        </div>
      </div>

      <div
        className={styles.tabs}
        role="tablist"
        aria-label="Recruitment management"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`${styles.tab} ${
              activeTab === tab.id ? styles.activeTab : ""
            }`}
            onClick={() => {
              setActiveTab(tab.id);
              setSearchParams({ tab: tab.id });
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.content}>
        <ActiveComponent />
      </div>
    </div>
  );
}

export default RecruitmentManagement;
