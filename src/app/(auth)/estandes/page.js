'use client';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import { columnsEstandes } from '@/statics/tableMocks';
import estandesMocks from '@/mocks/estandesMocks';

const App = () => {
  const handleAddEstande = () => {
    window.location.href = '/estandes/new';
  };

  const [data, setData] = useState([]);
  
  useEffect(() => {
    // Inicializa os mocks se não existirem no localStorage
    if (!localStorage.getItem('estandes')) {
      estandesMocks.build();
    }

    const estandes = JSON.parse(localStorage.getItem('estandes')) || { data: [] };
    console.log('Dados do localStorage:', estandes);

    if (estandes.data && estandes.data.length > 0) {
      const mapped = estandes.data.map((item) => {
        console.log('Item sendo mapeado:', item); // Debug do item individual
        const firstHorario = item.horario_projeto && item.horario_projeto[0];
        console.log('Horário do projeto:', firstHorario);
        
        const mappedItem = {
          key: item.id,
          name: item.name,
          localizacao: item.localizacao,
          horario: firstHorario?.horario || '-',
          projeto_id: firstHorario?.projeto_id || '-'
        };
        console.log('Item mapeado:', mappedItem); // Debug do item após mapeamento
        return mappedItem;
      });
      
      console.log('Dados mapeados:', mapped);
      setData(mapped);
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
          onClick={handleAddEstande}
        >
          Adicionar Estande
        </Button>
      </div>
      <Table columns={columnsEstandes} dataSource={data} />
    </div>
  );
}

export default App;