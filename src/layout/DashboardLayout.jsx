import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { Outlet } from 'react-router';

import { useAuth } from '../contexts/AuthContext';

export function DashboardLayout() {
  const { user } = useAuth();

  return (
    <main className="dashboard-layout">
      <Sidebar />
      <article className="dashboard-main-page">
        <header className="dashboard-header">
          <h1>{`Halo ${user.username} 👋`}</h1>
        </header>
        <section className="dashboard-main-page-outlet">
          <Outlet />
        </section>
      </article>
    </main>
  );
}
