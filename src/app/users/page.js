"use client";
import React, { useState, useEffect } from 'react';
import { Button, Table, Space, Popconfirm, message, Typography, Card, Flex } from 'antd';
import { UserOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { fetchUsersGrupo6, removeUserGrupo6 } from './services/UserServiceGrupo6';
import UserMocksGrupo6 from '@/mocks/UserMocksGrupo6';

const { Title, Paragraph } = Typography;

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      UserMocksGrupo6.build();
    }
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await fetchUsersGrupo6();
      setUsers(data);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
      message.error("Erro ao carregar dados dos usuários.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await removeUserGrupo6(id);
      message.success('Usuário excluído com sucesso!');
      loadUsers();
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      message.error("Erro ao excluir usuário.");
    }
  };

  const handleAddNewUser = () => {
    router.push('/users/new');
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
      sorter: (a, b) => a.nome.localeCompare(b.nome),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: 'Matrícula',
      dataIndex: 'matricula',
      key: 'matricula',
      sorter: (a, b) => a.matricula.localeCompare(b.matricula),
    },
    {
      title: 'Usuário',
      dataIndex: 'usuario',
      key: 'usuario',
      sorter: (a, b) => a.usuario.localeCompare(b.usuario),
    },
    {
      title: 'Tipo',
      dataIndex: 'tipo',
      key: 'tipo',
      sorter: (a, b) => a.tipo.localeCompare(b.tipo),
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => router.push(`/users/${record.id}`)}
          >
            Editar
          </Button>
          <Popconfirm
            title="Tem certeza que deseja excluir este usuário?"
            onConfirm={() => handleDelete(record.id)}
            okText="Sim"
            cancelText="Não"
          >
            <Button type="primary" danger icon={<DeleteOutlined />}>
              Excluir
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24, position: 'relative' }}>
      <div style={{ position: 'absolute', top: 24, left: 24 }}>
        <Link href="/home">
          <Button type="default">Voltar para Home</Button>
        </Link>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Flex vertical gap="middle" style={{ width: '100%', maxWidth: 800 }}>
          <Title level={2} style={{ textAlign: 'center' }}><UserOutlined /> Lista de Usuários</Title>
          <Paragraph style={{ textAlign: 'center' }}>
            Esta é a lista de todos os usuários cadastrados no sistema. Você pode adicionar, editar ou excluir usuários.
          </Paragraph>

          <div style={{ marginBottom: 16, textAlign: 'right' }}>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAddNewUser}>
              Adicionar Novo Usuário
            </Button>
          </div>

          <Card title="Usuários Registrados" style={{ width: '100%' }}>
            <Table columns={columns} dataSource={users} rowKey="id" pagination={{ pageSize: 10 }} />
          </Card>
        </Flex>
      </div>
    </div>
  );
};

export default UsersPage;
