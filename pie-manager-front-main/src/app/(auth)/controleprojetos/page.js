'use client';

import { useEffect, useState } from 'react';
import { Table, Button, Tag, Space } from 'antd';
import { useRouter } from 'next/navigation';
import ProjetoMocks from '@/mocks/projetomocks'; 

const GerenciarProjetos = () => {
  const [projetos, setProjetos] = useState([]);
  const router = useRouter();

  useEffect(() => {
    let armazenado = localStorage.getItem('trabalhos');

    if (!armazenado) {
      ProjetoMocks.build();
      armazenado = localStorage.getItem('trabalhos');
    }

    if (armazenado) {
      const obj = JSON.parse(armazenado);
      setProjetos(obj.data || []);
    }
  }, []);

  const excluirProjeto = (id) => {
    const atualizado = projetos.filter((proj) => proj.id !== id);
    localStorage.setItem(
      'trabalhos',
      JSON.stringify({
        data: atualizado,
        nextId: atualizado.length + 1,
        length: atualizado.length
      })
    );
    setProjetos(atualizado);
  };

  const irParaNovoProjeto = () => {
    router.push('/controleprojetos/novo');
  };

  const colunas = [
    {
      title: 'Código',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Título',
      dataIndex: 'titulo',
      key: 'titulo',
      render: (texto) => <a>{texto}</a>
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
      title: 'Orientador',
      dataIndex: 'id_Professor',
      key: 'id_Professor',
      render: (professor) => professor?.nome || 'Desconhecido'
    },
    {
      title: 'Alunos',
      dataIndex: 'listaAlunos',
      key: 'listaAlunos',
      render: (lista) => (
        <>
          {(lista || []).map((aluno) => (
            <Tag key={aluno.id} color="geekblue">
              {aluno.nome.toUpperCase()}
            </Tag>
          ))}
        </>
      )
    },
    {
      title: 'Ações',
      key: 'acoes',
      render: (_, registro) => (
        <Space size="middle">
          <a href={`/projetos/${registro.id}`}>Editar</a>
          <a
            onClick={() => excluirProjeto(registro.id)}
            style={{ color: 'crimson', cursor: 'pointer' }}
          >
            Remover
          </a>
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: 24 }}>
      <div style={{ textAlign: 'right', marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={irParaNovoProjeto}
          style={{
            backgroundColor: '#1677ff',
            color: '#fff',
            fontWeight: 'bold',
            borderRadius: 6,
            padding: '6px 14px'
          }}
        >
          Novo Projeto
        </Button>
      </div>
      <Table
        columns={colunas}
        dataSource={projetos}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default GerenciarProjetos;