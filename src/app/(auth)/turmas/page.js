'use client';
import React, { useEffect, useState } from 'react';
import { Button, Table, Space } from 'antd';

const cursosNomes = {
  'MAT101': 'Matemática Básica',
  'FIS102': 'Física Aplicada',
  'QUI103': 'Química Orgânica',
  'HIS104': 'História Contemporânea',
  'BIO105': 'Biologia Celular'
};

const professoresNomes = {
  'P001': 'Prof. João Silva',
  'P002': 'Prof. Ana Mendes',
  'P003': 'Prof. Carlos Souza',
  'P004': 'Prof. Beatriz Oliveira'
};

const alunosNomes = {
  'A001': 'Carlos Almeida',
  'A002': 'Fernanda Souza',
  'A003': 'Lucas Santos',
  'A004': 'Mariana Oliveira',
  'A005': 'Roberto Lima',
  'A006': 'Juliana Mendes',
  'A007': 'Felipe Costa',
  'A008': 'Camila Rocha',
  'A009': 'Ana Beatriz',
  'A010': 'Ricardo Moreira',
  'A011': 'Eduardo Pereira',
  'A012': 'Patrícia Vieira',
  'A013': 'Mateus Freitas'
};

const TurmasPage = () => {
    const handleAddTurma = () => {
      window.location.href = '/turmas/new';
    };
  
    const [data, setData] = useState([]);

    useEffect(() => {
      const turmas = JSON.parse(localStorage.getItem('turmas')) || { data: [], nextId: 1 };
      if (turmas.data.length > 0) {
        setData(turmas.data.map(turma => ({
          ...turma,
          id: turma.id || turmas.nextId++ // Auto-incrementa o ID se estiver vazio
        })));
      }
    }, []);
  
    const handleDelete = (id) => {
      const turmas = JSON.parse(localStorage.getItem('turmas')) || { data: [], nextId: 1 };
      const novaLista = turmas.data.filter(turma => turma.id !== id);
      localStorage.setItem('turmas', JSON.stringify({ data: novaLista, nextId: turmas.nextId }));
      setData(novaLista);
    };
  
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        sorter: (a, b) => a.id - b.id
      },
      {
        title: 'Curso',
        dataIndex: 'curso_id',
        key: 'curso',
        render: (id) => cursosNomes[id] || id
      },
      {
        title: 'Período',
        dataIndex: 'periodo_id',
        key: 'periodo'
      },
      {
        title: 'Ano',
        dataIndex: 'ano',
        key: 'ano'
      },
      {
        title: 'Semestre',
        dataIndex: 'semestre',
        key: 'semestre'
      },
      {
        title: 'Professor',
        dataIndex: 'professor_id',
        key: 'professor',
        render: (id) => professoresNomes[id] || id
      },
      {
        title: 'Alunos',
        dataIndex: 'listaAlunos',
        key: 'alunos',
        render: (ids) => ids.map(id => alunosNomes[id] || id).join(', ')
      },
      {
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            <a href={`/turmas/${record.id}`}>Editar</a>
            <a onClick={() => handleDelete(record.id)} style={{ color: 'red', cursor: 'pointer' }}>Excluir</a>
          </Space>
        ),
      }
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
            onClick={handleAddTurma}
          >
            Adicionar Turma
          </Button>
        </div>
        <Table columns={columns} dataSource={data} rowKey="id" />
      </div>
    );
};

export default TurmasPage;
