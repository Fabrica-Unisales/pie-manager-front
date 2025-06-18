'use client';

import React, { useEffect, useState } from 'react';
import { Button, Table, Tag, Space } from 'antd';
import { projetosColumns as baseColumns } from '@/statics/tableMocks';

const nomesProfessores = {
  'prof-joao': 'Prof. João da Silva',
  'prof-ana': 'Profª. Ana Lima',
  'prof-carlos': 'Prof. Carlos Mendes',
  'prof-helena': 'Profª. Helena Souza',
  'prof-marcos': 'Prof. Marcos Rocha'
};

const ProjetosPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const projetos = JSON.parse(localStorage.getItem('projetos')) || { data: [] };
    if (projetos.data && projetos.data.length > 0) {
      setData(projetos.data);
    }
  }, []);

  const handleDelete = (id) => {
    const projetos = JSON.parse(localStorage.getItem('projetos')) || { data: [] };
    const novaLista = projetos.data.filter(proj => proj.id !== id);
    const novoObj = { ...projetos, data: novaLista, length: novaLista.length };
    localStorage.setItem('projetos', JSON.stringify(novoObj));
    setData(novaLista);
  };

  const handleAddProjeto = () => {
    window.location.href = '/projetos/new';
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Título',
      dataIndex: 'titulo',
      key: 'titulo',
      render: (text) => <a>{text}</a>
    },
    {
      title: 'Descrição',
      dataIndex: 'descricao',
      key: 'descricao'
    },
    {
      title: 'Turma',
      dataIndex: 'id_turma',
      key: 'id_turma'
    },
    {
      title: 'Professor',
      dataIndex: 'id_Professor',
      key: 'id_Professor',
      render: (id) => nomesProfessores[id] || id
    },
    {
      title: 'Alunos',
      dataIndex: 'listaAlunos',
      key: 'listaAlunos',
      render: (alunos) => (
        <>
          {(alunos || []).map((aluno) => (
            <Tag color="blue" key={aluno}>
              {aluno.toUpperCase()}
            </Tag>
          ))}
        </>
      )
    },
    {
      title: 'Ações',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a href={`/projetos/${record.id}`}>Editar</a>
          <a onClick={() => handleDelete(record.id)} style={{ color: 'red', cursor: 'pointer' }}>Excluir</a>
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 16, textAlign: 'right' }}>
        <Button
          type="primary"
          onClick={handleAddProjeto}
          style={{
            background: '#1890ff',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            padding: '8px 16px',
            cursor: 'pointer',
            fontSize: 16
          }}
        >
          Adicionar Projeto
        </Button>
      </div>
      <Table columns={columns} dataSource={data} rowKey="id" />
    </div>
  );
};

export default ProjetosPage;