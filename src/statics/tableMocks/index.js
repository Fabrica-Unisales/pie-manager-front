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

export { columns, avaliacoesColumns };