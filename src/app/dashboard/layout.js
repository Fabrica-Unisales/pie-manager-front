'use client';
import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';

const DashboardLayout = ({ children }) => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{ marginLeft: 220, flex: 1, padding: '32px 24px', background: 'var(--gray-light)' }}>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout; 