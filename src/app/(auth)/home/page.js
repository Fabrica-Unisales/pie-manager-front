'use client';
import React from 'react';
import { Button } from 'antd';

const App = () => {
  const handleAddItem = () => {
    window.location.href = '/novoItem';
  };
  const handleGoToOrganizacao = () => {
    window.location.href = '/organizacao';
  };

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 16, textAlign: 'right' }}>
        <Button type="primary" onClick={handleGoToOrganizacao} style={{ marginRight: 8 }}>
          Ir para Cursos e Turmas
        </Button>
      </div>
    </div>
  );
}

export default App;