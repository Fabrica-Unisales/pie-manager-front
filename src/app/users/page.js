"use client";
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Table, Space, Popconfirm, message, Typography, Select, Card, Flex } from 'antd';
import { UserOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import {
  fetchUsersGrupo6,
  addUserGrupo6,
  editUserGrupo6,
  removeUserGrupo6
} from '@/services/UserServiceGrupo6';

const { Title, Paragraph } = Typography;
const { Option } = Select;

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  const loadUsers = async () => {
    try {
      const data = await fetchUsersGrupo6();
      setUsers(data);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
      message.error("Erro ao carregar dados dos usuários.");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const onFinish = async (values) => {
    try {
      if (editingUser) {
        await editUserGrupo6({ ...values, id: editingUser.id });
        message.success('Usuário atualizado com sucesso!');
        setEditingUser(null);
      } else {
        await addUserGrupo6(values);
        message.success('Usuário registrado com sucesso!');
      }
      form.resetFields();
      loadUsers();
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
      message.error("Erro ao salvar dados do usuário.");
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    form.setFieldsValue(user);
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
            onClick={() => handleEdit(record)}
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
    <Flex vertical gap="middle" style={{ padding: '20px' }}>
      <Title level={2}><UserOutlined /> Controle de Usuários</Title>
      <Paragraph>
        Esta é a página para gerenciar o registro, consulta e edição de usuários.
      </Paragraph>

      <Card title={editingUser ? 'Editar Usuário' : 'Novo Usuário'} style={{ width: '100%' }}>
        <Form
          form={form}
          name="user_form"
          onFinish={onFinish}
          layout="vertical"
          initialValues={{ tipo: 'Aluno' }}
        >
          <Form.Item
            name="nome"
            label="Nome Completo"
            rules={[{ required: true, message: 'Por favor, insira o nome!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Nome Completo" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Por favor, insira o email!' },
              { type: 'email', message: 'Email inválido!' },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="senha_hash"
            label="Senha (Hash)"
            rules={[{ required: true, message: 'Por favor, insira a senha!' }]}
          >
            <Input.Password prefix={<UserOutlined />} placeholder="Senha" />
          </Form.Item>
          <Form.Item
            name="matricula"
            label="Matrícula"
            rules={[{ required: true, message: 'Por favor, insira a matrícula!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Matrícula" />
          </Form.Item>
          <Form.Item
            name="usuario"
            label="Nome de Usuário"
            rules={[{ required: true, message: 'Por favor, insira o nome de usuário!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Nome de Usuário" />
          </Form.Item>
          <Form.Item
            name="tipo"
            label="Tipo de Usuário"
            rules={[{ required: true, message: 'Por favor, selecione o tipo de usuário!' }]}
          >
            <Select placeholder="Selecione o tipo">
              <Option value="Aluno">Aluno</Option>
              <Option value="Professor">Professor</Option>
              <Option value="Coordenador">Coordenador</Option>
              <Option value="AvaliadorExterno">Avaliador Externo</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {editingUser ? 'Atualizar Usuário' : 'Registrar Usuário'}
              </Button>
              {editingUser && (
                <Button
                  onClick={() => {
                    setEditingUser(null);
                    form.resetFields();
                  }}
                >
                  Cancelar Edição
                </Button>
              )}
            </Space>
          </Form.Item>
        </Form>
      </Card>

      <Card title="Lista de Usuários" style={{ width: '100%' }}>
        <Table
          columns={columns}
          dataSource={users}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </Flex>
  );
};

export default UsersPage;
