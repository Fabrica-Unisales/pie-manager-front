'use client';
import { Button } from 'antd';
import React from 'react';

const App = () => {
  const handleAddItem = () => {
    window.location.href = '/novoItem';
  };

  const handleAddProjeto = () => {
    window.location.href = '/projetos/new';
  }

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 16, textAlign: 'right' }}>
        <Button type='primary' onClick={handleAddItem}>
          Adicionar Item
        </Button>
        <Button style={{ marginLeft: 8 }} on onClick= {handleAddProjeto}>
          Adicionar Projeto
        </Button>
      </div>
    </div>
  );
}

export default App;