'use client';
import React, { useEffect, useState } from 'react';
import { Button, Table, Space } from 'antd';
import { useRouter } from 'next/navigation';

const coordenadores = {
  301: 'Prof. Maria Silva',
  302: 'Prof. João Pereira',
  303: 'Prof. Fernanda Costa',
  304: 'Prof. Ricardo Lima'
};

const turmas = {
  401: 'Turma A',
  402: 'Turma B',
  403: 'Turma C',
  404: 'Turma D',
  405: 'Turma E'
};

const CursosPage = () => {
  const router = useRouter();

  const handleAddItem = () => {
    router.push('/cursos/new');
  };

  const handleEditItem = (id) => {
    if (id) {
      router.push(`/cursos/${id}`);
    } else {
      console.error('ID do curso não definido!');
    }
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    const cursosSalvos = JSON.parse(localStorage.getItem('cursos')) || { data: [], nextId: 1 };

    if (cursosSalvos.data.length > 0) {
      setData(cursosSalvos.data.map(curso => ({
        id: curso.id || cursosSalvos.nextId++, // Garante que o ID não seja vazio
        nome: curso.nome,
        coordenador: `${curso.coordenador_id} - ${coordenadores[curso.coordenador_id] || 'Desconhecido'}`,
        listaTurmas: curso.listaTurmas ? curso.listaTurmas.map(id => turmas[id] || `ID ${id}`) : ['Nenhuma turma']
      })));
    }
  }, []);

  const handleDelete = (id) => {
    const cursos = JSON.parse(localStorage.getItem('cursos')) || { data: [], nextId: 1 };
    const novaLista = cursos.data.filter(curso => curso.id !== id);
    localStorage.setItem('cursos', JSON.stringify({ data: novaLista, nextId: cursos.nextId }));
    setData(novaLista);
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', sorter: (a, b) => a.id - b.id },
    { title: 'Nome do Curso', dataIndex: 'nome', key: 'nome' },
    { title: 'Coordenador', dataIndex: 'coordenador', key: 'coordenador' },
    { title: 'Turmas', dataIndex: 'listaTurmas', key: 'listaTurmas', render: (turmas) => turmas.join(', ') },
    { 
      title: 'Ações', 
      key: 'action', 
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEditItem(record.id)}>Editar</Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>Excluir</Button>
        </Space>
      ),
    }
  ];

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 16, textAlign: 'right' }}>
        <Button type="primary" onClick={handleAddItem}>
          Adicionar Curso
        </Button>
      </div>
      <Table columns={columns} dataSource={data} rowKey="id" />
    </div>
  );
};

export default CursosPage;
