import React from 'react';
import { Space, Tag } from 'antd';

// Colunas para a Tabela de Cursos
const cursosColumns = [
  {
    title: 'Nome do Curso',
    dataIndex: 'nome',
    key: 'nome',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Coordenador',
    dataIndex: 'coordenador_id',
    key: 'coordenador_id',
  },
  {
    title: 'Turmas',
    key: 'turmas',
    dataIndex: 'listaTurmas',
    render: (_, { listaTurmas }) => (
      <>
        {listaTurmas && listaTurmas.length > 0 ? (
          listaTurmas.map((turma) => (
            <Tag color="blue" key={turma.id}>
              {turma.nome}
            </Tag>
          ))
        ) : (
          <Tag color="red">Nenhuma Turma</Tag>
        )}
      </>
    ),
  },
  {
    title: 'Ações',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a href={`/cursos/${record.id}`}>Editar</a>
        <a>Excluir</a>
      </Space>
    ),
  },
];

// Colunas para a Tabela de Turmas (por exemplo, para dentro do formulário de Curso)
const turmasColumns = [
  {
    title: 'Nome da Turma',
    dataIndex: 'nome',
    key: 'nome',
  },
  {
    title: 'Período',
    dataIndex: 'periodo',
    key: 'periodo',
  },
  {
    title: 'Ações',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a href={`/turmas/${record.id}`}>Editar</a>
        <a>Excluir</a>
      </Space>
    ),
  },
];

// Colunas para a Tabela de Avaliações (já tinha)
const avaliacoesColumns = [
  {
    title: 'Projeto',
    dataIndex: 'projeto_id',
    key: 'projeto_id',
  },
  {
    title: 'Avaliador',
    dataIndex: 'avaliador_id',
    key: 'avaliador_id',
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
        <a href={`/avaliacoes/${record.id}`}>Editar</a>
        <a>Excluir</a>
      </Space>
    ),
  },
];

export { cursosColumns, turmasColumns, avaliacoesColumns };
