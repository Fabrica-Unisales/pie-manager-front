'use client';
import React, { useEffect, useState } from 'react';
import { Button, Table, Space } from 'antd';
import { avaliacoesColumns } from '@/statics/tableMocks';

const projetosNomes = {
  '101': 'Sistema de Gestão Escolar',
  '102': 'App de Saúde Mental',
  '103': 'Plataforma de E-commerce',
  '104': 'Controle de Estoque',
  '105': 'Rede Social Acadêmica',
  '106': 'Gestão de Eventos'
};

const avaliadoresNomes = {
  '201': 'Prof. Ana Paula',
  '202': 'Prof. Carlos Silva',
  '203': 'Prof. Beatriz Souza',
  '204': 'Prof. João Mendes'
};

const AvaliacoesPage = () => {
    const handleAddItem = () => {
      window.location.href = '/avaliacoes/new';
    };
  
    const [data, setData] = useState([]);
    useEffect(() => {
      const items = JSON.parse(localStorage.getItem('avaliacoes')) || [];
      if (items.length > 0) {
        setData(items.data);
      }
    }, []);
  
    const handleDelete = (id) => {
      const avaliacoes = JSON.parse(localStorage.getItem('avaliacoes')) || { data: [] };
      const novaLista = avaliacoes.data.filter(avaliacao => avaliacao.id !== id);
      const novoObj = { ...avaliacoes, data: novaLista, length: novaLista.length };
      localStorage.setItem('avaliacoes', JSON.stringify(novoObj));
      setData(novaLista);
    };
  
    const columns = avaliacoesColumns.map(col => {
      if (col.dataIndex === 'projeto_id') {
        return { ...col, render: (id) => projetosNomes[id] || id };
      }
      if (col.dataIndex === 'avaliador_id') {
        return { ...col, render: (id) => avaliadoresNomes[id] || id };
      }
      if (col.key === 'action') {
        return {
          ...col,
          render: (_, record) => (
            <Space size="middle">
              <a href={`/avaliacoes/${record.id}`}>Editar</a>
              <a onClick={() => handleDelete(record.id)} style={{ color: 'red', cursor: 'pointer' }}>Excluir</a>
            </Space>
          ),
        };
      }
      return col;
    });
  
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
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
  
  export default AvaliacoesPage;