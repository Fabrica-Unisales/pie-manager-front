import React from 'react';
import { Space, Tag, Button, Popconfirm, message } from 'antd';
import { useRouter } from 'next/navigation';

const handleDelete = (key) => {
  try {
    const estandes = JSON.parse(localStorage.getItem('estandes'));
    if (estandes && estandes.data) {
      // Filtra o estande a ser removido
      estandes.data = estandes.data.filter(item => item.id !== key);
      estandes.length = estandes.data.length;
      
      // Atualiza o localStorage
      localStorage.setItem('estandes', JSON.stringify(estandes));
      message.success('Estande excluído com sucesso!');
      
      // Recarrega a página para atualizar a tabela
      window.location.reload();
    }
  } catch (error) {
    console.error('Erro ao excluir estande:', error);
    message.error('Erro ao excluir estande. Tente novamente.');
  }
};

const TableActions = ({ record }) => {
  const router = useRouter();

  return (
    <Space size="middle">
      <Button 
        type="link" 
        onClick={() => router.push(`/estandes/edit/${record.key}`)}
      >
        Editar
      </Button>
      <Popconfirm
        title="Excluir estande"
        description="Tem certeza que deseja excluir este estande?"
        onConfirm={() => handleDelete(record.key)}
        okText="Sim"
        cancelText="Não"
      >
        <Button type="link" danger>
          Excluir
        </Button>
      </Popconfirm>
    </Space>
  );
};

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
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

const columnsEstandes = [  
  {
    title: 'Nome',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Localização',
    dataIndex: 'localizacao',
    key: 'localizacao',
  },
  {
    title: 'Horário',
    dataIndex: 'horario',
    key: 'horario',
  },
  {
    title: 'ID do Projeto',
    dataIndex: 'projeto_id',
    key: 'projeto_id',
    render: (text) => text || '-'
  },
  {
    title: 'Ações',
    key: 'acoes',
    render: (_, record) => <TableActions record={record} />
  },
];  

export {columns, columnsEstandes};