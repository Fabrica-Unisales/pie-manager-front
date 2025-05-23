'use client';
import React, { use, useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import { columns } from '@/statics/tableMocks';


const App = () => {
  const handleAddItem = () => {
    window.location.href = '/itens/new';
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('items')) || [];
    if (items.length > 0) {
      setData(items.data);
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
          Adicionar Item
        </Button>
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default App;