'use client';
import React, { useEffect, useState } from 'react';
import { Button, Table, Space } from 'antd';

const AvaliacaoPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('avaliacoes')) || [];
    setData(storedItems);
  }, []);

  const handleAddAvaliacao = () => {
    window.location.href = '/avaliacoes/new';
  };

  const handleDelete = (id) => {
    const confirm = window.confirm('Tem certeza que deseja deletar esta avaliação?');
    if (!confirm) return;

    const updated = data.filter((item) => item.id !== id);
    localStorage.setItem('avaliacoes', JSON.stringify(updated));
    setData(updated);
  };

  const columns = [
    {
      title: 'Projeto',
      dataIndex: 'nomeProjeto',
      key: 'nomeProjeto',
    },
    {
      title: 'Avaliador',
      dataIndex: 'nomeAvaliador',
      key: 'nomeAvaliador',
    },
    {
      title: 'Nota',
      dataIndex: 'nota',
      key: 'nota',
    },
    {
      title: 'Comentário',
      dataIndex: 'comentario',
      key: 'comentario',
    },
    {
      title: 'Ações',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => (window.location.href = `/avaliacoes/${record.id}`)}
            style={{
              backgroundColor: '#4CAF50',
              border: 'none',
              borderRadius: '6px',
              padding: '4px 12px',
              fontWeight: 'bold',
            }}
          >
            Editar
          </Button>
    
          <Button
            type="primary"
            danger
            onClick={() => handleDelete(record.id)}
            style={{
              borderRadius: '6px',
              padding: '4px 12px',
              fontWeight: 'bold',
            }}
          >
            Deletar
          </Button>
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
          backgroundColor: '#1E90FF', // azul mais suave
          color: '#fff',
            borderRadius: '6px',
            padding: '8px 16px', // botão mais largo e alto
              fontSize: '16px',
              fontWeight: 'bold',
            border: 'none',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease-in-out',
        }}
        onClick={handleAddAvaliacao}
        onMouseEnter={(e) => (e.target.style.backgroundColor = '#007BFF')}
        onMouseLeave={(e) => (e.target.style.backgroundColor = '#1E90FF')}
      >
      Adicionar Avaliação
      </Button>

      </div>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={(record) => record.id || record.nomeProjeto}
      />
    </div>
  );
};

export default AvaliacaoPage;
