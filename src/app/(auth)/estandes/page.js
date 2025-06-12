'use client';

import React, { useEffect, useState } from 'react';
import { Button, Table, Space } from 'antd';

const projetosNomes = {
  '101': 'Sistema de Gestão Escolar',
  '102': 'App de Saúde Mental',
  '103': 'Plataforma de E-commerce',
  '104': 'Controle de Estoque',
  '105': 'Rede Social Acadêmica',
  '106': 'Gestão de Eventos'
};

const EstandesPage = () => {
  const handleAddItem = () => {
    window.location.href = '/estandes/new';
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('estandes')) || { data: [] };
    if (items.data.length > 0) {
      setData(items.data);
    }
  }, []);

  const handleDelete = (id) => {
    const estandes = JSON.parse(localStorage.getItem('estandes')) || { data: [] };
    const novaLista = estandes.data.filter(estande => estande.id !== id);
    const novoObj = { ...estandes, data: novaLista, length: novaLista.length };
    localStorage.setItem('estandes', JSON.stringify(novoObj));
    setData(novaLista);
  };

  const estandesColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Localização',
      dataIndex: 'localizacao',
      key: 'localizacao',
    },
    {
      title: 'Horários',
      dataIndex: 'horario_projeto',
      key: 'horario_projeto',
      render: (horarios) => (
        <div>
          {(horarios || [])
            .filter(horario => horario)
            .map((horario, index) => (
              <div key={horario.id}>
                {horario.horario} - {projetosNomes[horario.projeto_id] || horario.projeto_id}
                {index < (horarios ? horarios.length : 0) - 1 && <br />}
              </div>
            ))}
        </div>
      ),
    },
    {
      title: 'Ações',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a href={`/estandes/${record.id}`}>Editar</a>
          <a onClick={() => handleDelete(record.id)} style={{ color: 'red', cursor: 'pointer' }}>Excluir</a>
        </Space>
      ),
    },
  ];

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
          Adicionar Estande
        </Button>
      </div>
      <Table columns={estandesColumns} dataSource={data} rowKey="id" />
    </div>
  );
}

export default EstandesPage;