"use client";
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Typography, Select, Card, Flex, message, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

import { fetchUsersGrupo6, editUserGrupo6 } from '@/app/users/services/UserServiceGrupo6';

const { Title, Paragraph } = Typography;
const { Option } = Select;

export default function EditUserPage({ params }) {
  const [form] = Form.useForm();
  const router = useRouter();
  const userId = parseInt(params.id, 10);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
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
        console.error("Erro ao carregar dados do usuário para edição:", error);
        message.error("Erro ao carregar dados do usuário.");
        router.push('/users');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      loadUserData();
    }
  }, [userId, form, router]);

  const onFinish = async (values) => {
    try {
      if (currentUser) {
        await editUserGrupo6({ ...values, id: currentUser.id });
        message.success('Usuário atualizado com sucesso!');
        router.push('/users');
      }
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      message.error("Erro ao atualizar dados do usuário.");
    }
  };

  const handleCancel = () => {
    router.push('/users');
  };

  if (loading) {
    return (
      <div style={{ padding: 24, textAlign: 'center', marginTop: 50 }}>
        <Spin size="large" tip="Carregando usuário..." />
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

        <Card title={`Editando: ${currentUser?.nome || 'Usuário'}`} style={{ maxWidth: 400, margin: '0 auto', marginTop: 32 }}>
          <Form form={form} name="edit_user_form" onFinish={onFinish} layout="vertical">
            {/* mesmos campos que nas outras páginas */}
          </Form>
        </Card>
      </Flex>
    </div>
  );
}
