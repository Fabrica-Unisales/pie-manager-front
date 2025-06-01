'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Form, Input, Select, Button, message } from 'antd';

const tiposDeUsuario = [
  { value: 'aluno', label: 'Aluno' },
  { value: 'professor', label: 'Professor' },
  { value: 'coordenador', label: 'Coordenador' },
  { value: 'avaliadorExterno', label: 'Avaliador Externo' },
];

const EditarUsuarios = () => {
  const router = useRouter();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    const carregarUsuario = () => {
      const usuarios = JSON.parse(localStorage.getItem('users')) || { data: [] };
      const usuario = usuarios.data.find((u) => u.id === id);

      if (!usuario) {
        message.error('Usuário não encontrado');
        router.push('/usuarios');
      } else {
        form.setFieldsValue(usuario);
      }
    };

    carregarUsuario();
  }, [id, form, router]);

  
  const atualizarUsuario = (dados) => {
    setLoading(true);

    const usuarios = JSON.parse(localStorage.getItem('users')) || { data: [] };
    const atualizados = usuarios.data.map((u) =>
      u.id === id ? { ...u, ...dados } : u
    );

    localStorage.setItem('users', JSON.stringify({ ...usuarios, data: atualizados }));
    message.success('Usuário atualizado com sucesso!');
    router.push('/usuarios');
  };

  const cancelarEdicao = () => router.push('/usuarios');

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 24 }}>
      <h2>Editar Usuário</h2>

      <Form layout="vertical" form={form} onFinish={atualizarUsuario}>
        <Form.Item
          label="Nome"
          name="nome"
          rules={[{ required: true, message: 'Informe o nome' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="E-mail"
          name="email"
          rules={[{ required: true, message: 'Informe o e-mail' }]}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item
          label="Usuário"
          name="usuario"
          rules={[{ required: true, message: 'Informe o nome de usuário' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Matrícula"
          name="matricula"
          rules={[{ required: true, message: 'Informe a matrícula' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Senha"
          name="senha_hash"
          rules={[{ required: true, message: 'Informe a senha' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Tipo"
          name="tipo"
          rules={[{ required: true, message: 'Selecione o tipo' }]}
        >
          <Select options={tiposDeUsuario} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Salvar
          </Button>
          <Button onClick={cancelarEdicao} style={{ marginLeft: 8 }}>
            Cancelar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditarUsuarios;
