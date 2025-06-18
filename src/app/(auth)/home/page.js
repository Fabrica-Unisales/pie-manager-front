'use client';
import React from 'react';

const App = () => {
  const handleAddItem = () => {
    window.location.href = '/novoItem';
  };

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 16, textAlign: 'right' }}>
      </div>
    </div>
  );
}

export default App;