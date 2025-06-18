import React from 'react';
import { Space, Tag,  } from 'antd';

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
const projetosColumns = [
  {
    title: 'Título',
    dataIndex: 'titulo',
    key: 'titulo',
  },
  {
    title: 'Descrição',
    dataIndex: 'descricao',
    key: 'descricao',
  },
  {
    title: 'Turma',
    dataIndex: 'id_turma',
    key: 'id_turma',
  },
  {
    title: 'Professor',
    dataIndex: 'id_Professor',
    key: 'id_Professor',
  },
  {
    title: 'Alunos',
    dataIndex: 'listaAlunos',
    key: 'listaAlunos',
    render: (_, record) => (
      <span>{Array.isArray(record.listaAlunos) ? record.listaAlunos.join(', ') : '-'}</span>
    )
  },
  {
    title: 'Ações',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a href={`/projetos/edit/${record.id}`}>Editar</a>
        <a>Excluir</a>
      </Space>
    ),
  },
];


export {columns, projetosColumns};