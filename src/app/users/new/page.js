"use client";
import React from 'react';
import { Form, Input, Button, Typography, Select, Card, Flex, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { addUserGrupo6 } from '@/app/users/services/UserServiceGrupo6';

const { Title, Paragraph } = Typography;
const { Option } = Select;

const NewUserPage = () => {
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = async (values) => {
    try {
      await addUserGrupo6(values);
      message.success('Usuário registrado com sucesso!');
      form.resetFields();
      router.push('/users');
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      message.error("Erro ao registrar dados do usuário.");
    }
  };

  const handleCancel = () => {
    router.push('/users');
  };

  return (
    <div style={{ padding: 24, position: 'relative' }}>
      <div style={{ position: 'absolute', top: 24, left: 24 }}>
        <Link href="/home">
          <Button type="default">Voltar para Home</Button>
        </Link>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Flex vertical gap="middle" style={{ width: '100%', maxWidth: 800 }}>
          <Title level={2} style={{ textAlign: 'center' }}><UserOutlined /> Cadastrar Novo Usuário</Title>
          <Paragraph style={{ textAlign: 'center' }}>
            Preencha o formulário abaixo para adicionar um novo usuário ao sistema.
          </Paragraph>
          <Card
            title="Dados do Novo Usuário"
            style={{ maxWidth: 400, margin: '0 auto', marginTop: 32 }}
          >
            <Form
              form={form}
              name="new_user_form"
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
                <Button type="primary" htmlType="submit" block>
                  Registrar Usuário
                </Button>
                <Button
                  onClick={handleCancel}
                  block
                  style={{ marginTop: 8 }}
                >
                  Cancelar
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Flex>
      </div>
    </div>
  );
};

export default NewUserPage;
