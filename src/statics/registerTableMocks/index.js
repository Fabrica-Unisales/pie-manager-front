import React from 'react';
import { Space, Tag } from 'antd';

const columns = [
  
  {
    title: 'Nome',
    dataIndex: 'nome',
    key: 'nome',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'E-mail',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Matrícula',
    dataIndex: 'matricula',
    key: 'matricula',
  },
  {
    title: 'Usuário',
    dataIndex: 'usuario',
    key: 'usuario',
  },
  {
    title: 'Tipo',
    dataIndex: 'tipo',
    key: 'tipo',
    render: (tipo) => (
      <Tag color={
        tipo === 'Aluno' ? 'blue' :
        tipo === 'Professor' ? 'green' :
        tipo === 'Coordenador' ? 'geekblue' :
        tipo === 'AvaliadorExterno' ? 'purple' : 'default'
      }>
        {tipo}
      </Tag>
    ),
  },
  {
    title: 'Ação',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a href={`/register/${record.id}`}>Editar</a>
        <a>Excluir</a>
      </Space>
    ),
  },
];

export { columns };