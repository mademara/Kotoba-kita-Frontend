import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { Outlet } from 'react-router';
export function DashboardLayout() {
  return (
    <main className="dashboard-layout">
      <Sidebar />
      <article className="dashboard-main-page">
        <header className="dashboard-header">
          <h1>Nama user</h1>
        </header>
        <section className="dashboard-main-page-outlet">
          <Outlet />
          <footer className="dashboard-footer-lisense">
            <p>
              Data kosakata bersumber dari:
              <a
                href="https://www.edrdg.org/wiki/index.php/JMdict-EDICT_Dictionary_Project"
                target="_blank"
                rel="noopener noreferrer"
              >
                JMdict/EDICT
              </a>
              , oleh:
              <a
                href="https://www.edrdg.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Electronic Dictionary Research and Development Group
              </a>
              , digunakan di bawah lisensi:
              <a
                href="https://creativecommons.org/licenses/by-sa/4.0/"
                target="_blank"
                rel="noopener noreferrer"
              >
                CC BY-SA 4.0
              </a>
              . Dataset disederhanakan via:
              <a
                href="https://github.com/scriptin/jmdict-simplified"
                target="_blank"
                rel="noopener noreferrer"
              >
                jmdict-simplified,
              </a>
              oleh Dmitry Scriptin.
            </p>
          </footer>
        </section>
      </article>
    </main>
  );
}
