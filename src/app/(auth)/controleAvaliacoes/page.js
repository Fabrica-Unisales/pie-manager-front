'use client';

import React, { useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import { controleAvaliacoesColumns } from '@/statics/tableMocks';

const App = () => {
  const handleAddItem = () => {
    window.location.href = '/controleAvaliacoes/new';
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    const avaliacoes = JSON.parse(localStorage.getItem('controleAvaliacao')) || { data: [] };
    if (avaliacoes.data.length > 0) {
      setData(avaliacoes.data);
    }
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 16, textAlign: 'right' }}>
        <Button
          type="primary"
          style={{
            background: '#1890ff',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            padding: '8px 16px',
            cursor: 'pointer',
            fontSize: 16,
          }}
          onClick={handleAddItem}
        >
          Adicionar Avaliação
        </Button>
      </div>
      <Table columns={controleAvaliacoesColumns} dataSource={data} />
    </div>
  );
};

export default App;
