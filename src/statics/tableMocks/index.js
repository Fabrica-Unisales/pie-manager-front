import React from 'react';
import { Space, Tag } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => {return(<a>{text}</a>)},
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a href={`/itens/${record.key}`}>Edit</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const controleAvaliacoesColumns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Projeto ID',
    dataIndex: 'projeto_id',
    key: 'projeto_id',
  },
  {
    title: 'Avaliador ID',
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
    render: (text) => text || '-',
  },
  {
    title: 'Ações',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a href={`/controleAvaliacoes/${record.id}`}>Editar</a>
        <a
        onClick={() => {
          const saved = JSON.parse(localStorage.getItem('controleAvaliacao')) || { data: [] };
          const atualizados = saved.data.filter((item) => item.id !== record.id);
          localStorage.setItem('controleAvaliacao', JSON.stringify({ ...saved, data: atualizados }));
          window.location.reload();
        }}
      >
        Excluir
      </a>
      </Space>
    ),
  },
];

export { columns, controleAvaliacoesColumns };