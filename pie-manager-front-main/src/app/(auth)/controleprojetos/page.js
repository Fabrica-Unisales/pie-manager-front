'use client';

import { useEffect, useState } from 'react';
import { Table, Button, Tag, Space } from 'antd';
import { useRouter } from 'next/navigation';

const professoresNomes = {
  'prof-joao': 'João da Silva',
  'prof-ana': 'Ana Lima',
  'prof-carlos': 'Carlos Mendes',
  'prof-helena': 'Helena Souza',
  'prof-marcos': 'Marcos Rocha'
};

const GerenciarProjetos = () => {
  const [projetos, setProjetos] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const armazenado = localStorage.getItem('projetos');
    if (armazenado) {
      const obj = JSON.parse(armazenado);
      setProjetos(obj.data || []);
    }
  }, []);

  const excluirProjeto = (id) => {
    const atualizado = projetos.filter((proj) => proj.id !== id);
    localStorage.setItem('projetos', JSON.stringify({ data: atualizado }));
    setProjetos(atualizado);
  };

  const irParaNovoProjeto = () => {
    router.push('/projetos/novo');
  };

  const colunas = [
    {
      title: 'Código',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Projeto',
      dataIndex: 'titulo',
      key: 'titulo',
      render: (texto) => <a>{texto}</a>
    },
    {
      title: 'Resumo',
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
      render: (id) => professoresNomes[id] || id
    },
    {
      title: 'Participantes',
      dataIndex: 'listaAlunos',
      key: 'listaAlunos',
      render: (lista) => (
        <>
          {(lista || []).map((aluno, idx) => (
            <Tag color="geekblue" key={idx}>
              {aluno.toUpperCase()}
            </Tag>
          ))}
        </>
      )
    },
    {
      title: 'Opções',
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
