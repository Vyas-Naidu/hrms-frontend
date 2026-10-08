import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../shared/components/Sidebar/Sidebar";
import Navbar from "../shared/components/Navbar/Navbar";

import styles from "./Layout.module.css";

function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div
      className={`${styles.appLayout} ${
        collapsed ? styles.sidebarCollapsed : ""
      }`}
    >
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((value) => !value)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {mobileOpen && (
        <button
          type="button"
          className={styles.overlay}
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <button
        type="button"
        className={styles.mobileMenuButton}
        aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen((value) => !value)}
      >
        ☰
      </button>

      <div className={styles.mainArea}>
        <Navbar />

        <main className={styles.pageContent}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;