"use client";
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Typography, Card, Flex, message, Spin, Select } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useRouter, useParams } from 'next/navigation';
import { fetchUsersGrupo6, editUserGrupo6 } from '../services/UserServiceGrupo6';

const { Title, Paragraph } = Typography;

export default function EditUserPage() {
  const params = useParams();
  const userId = Array.isArray(params.id) ? parseInt(params.id[0], 10) : parseInt(params.id, 10);
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  // Carrega os dados do usuário
  const loadUserData = async () => {
    setLoading(true);
    try {
      const allUsers = await fetchUsersGrupo6();
      const userToEdit = allUsers.find(user => user.id === userId);
      if (userToEdit) {
        setCurrentUser(userToEdit);
        form.setFieldsValue(userToEdit);
      } else {
        message.error('Usuário não encontrado.');
        router.push('/users');
      }
    } catch (error) {
      message.error("Erro ao carregar dados do usuário.");
      router.push('/users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId && !isNaN(userId)) {
      loadUserData();
    } else {
      setLoading(false);
      message.error('ID de usuário inválido.');
      router.push('/users');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const onFinish = async (values) => {
    setSaving(true);
    try {
      await editUserGrupo6({ ...currentUser, ...values, id: currentUser.id });
      setSuccess(true);
      message.success('Usuário atualizado com sucesso!');
      router.push('/users');
    } catch (error) {
      message.error("Erro ao atualizar dados do usuário.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: 24, textAlign: 'center', marginTop: 50 }}>
        <Spin size="large" />
        <div>Carregando usuário...</div>
      </div>
    );
  }

  if (!currentUser && !loading) {
    return (
      <div style={{ padding: 24, textAlign: 'center', marginTop: 50 }}>
        <Title level={3}>Usuário não encontrado.</Title>
        <Button type="primary" onClick={() => router.push('/users')}>Voltar para a lista</Button>
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <Flex vertical gap="middle">
        <Title level={2}><UserOutlined /> Editar Usuário</Title>
        <Paragraph>
          Altere os dados do usuário e clique em "Atualizar" para salvar as mudanças.
        </Paragraph>
        {success && (
          <div style={{ color: 'green', textAlign: 'center', marginBottom: 16 }}>
            Alterações salvas com sucesso!
          </div>
        )}
        <Card title={`Editando: ${currentUser?.nome || 'Usuário'}`} style={{ maxWidth: 400, margin: '0 auto', marginTop: 32 }}>
          <Form form={form} name="edit_user_form" onFinish={onFinish} layout="vertical" initialValues={currentUser}>
            <Form.Item name="nome" label="Nome" rules={[{ required: true, message: 'Por favor, insira o nome!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Por favor, insira o email!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="senha_hash" label="Senha" rules={[{ required: true, message: 'Por favor, insira a senha!' }]}>
              <Input.Password />
            </Form.Item>
            <Form.Item name="matricula" label="Matrícula" rules={[{ required: true, message: 'Por favor, insira a matrícula!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="usuario" label="Usuário" rules={[{ required: true, message: 'Por favor, insira o usuário!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="tipo" label="Tipo" rules={[{ required: true, message: 'Por favor, selecione o tipo!' }]}>
              <Select>
                <Select.Option value="Aluno">Aluno</Select.Option>
                <Select.Option value="Professor">Professor</Select.Option>
                <Select.Option value="Coordenador">Coordenador</Select.Option>
                <Select.Option value="AvaliadorExterno">Avaliador Externo</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={saving}>
                Atualizar
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Flex>
    </div>
  );
} 