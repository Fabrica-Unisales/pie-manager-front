'use client';

import React, { useState } from 'react';
import { Form, Input, Select, Button, message } from 'antd';
import { useRouter } from 'next/navigation';

const tiposDeUsuario = [
  { value: 'Aluno', label: 'Aluno' },
  { value: 'Professor', label: 'Professor' },
  { value: 'Coordenador', label: 'Coordenador' },
  { value: 'Avaliador Externo', label: 'Avaliador Externo' },
];

const NovoUsuario = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const salvarUsuario = (valores) => {
    setLoading(true);

    const usuarios = JSON.parse(localStorage.getItem('users')) || {
      data: [],
      nextId: 1,
    };

    const novoUsuario = {
      id: String(usuarios.nextId),
      ...valores,
    };

    const atualizados = {
      data: [...usuarios.data, novoUsuario],
      nextId: usuarios.nextId + 1,
      length: usuarios.data.length + 1,
    };

    localStorage.setItem('users', JSON.stringify(atualizados));
    message.success('Usuário adicionado com sucesso!');
    router.push('/usuarios');
  };

  const cancelarCadastro = () => router.push('/usuarios');

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 24 }}>
      <h2>Novo Usuário</h2>

      <Form layout="vertical" onFinish={salvarUsuario}>
        <Form.Item
          label="Nome"
          name="nome"
          rules={[{ required: true, message: 'Por favor, insira seu nome.' }]}
        >
          <Input placeholder="Nome do usuário" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Por favor, insira seu Email.' }]}
        >
          <Input type="email" placeholder="Exemplo: nomeusuario@gmail.com" />
        </Form.Item>

        <Form.Item
          label="Senha"
          name="senha_hash"
          rules={[{ required: true, message: 'Por favor, informe sua senha.' }]}
        >
          <Input.Password placeholder="Sua senha" />
        </Form.Item>

        <Form.Item
          label="Matrícula"
          name="matricula"
          rules={[{ required: true, message: 'Por favor, informe seu número de matrícula.' }]}
        >
          <Input placeholder="Exemplo: 00001" />
        </Form.Item>

        <Form.Item
          label="Usuário"
          name="usuario"
          rules={[{ required: true, message: 'Por favor, informe seu nome de usuário.' }]}
        >
          <Input placeholder="Exemplo: victor.m" />
        </Form.Item>

        <Form.Item
          label="Tipo"
          name="tipo"
          rules={[{ required: true, message: 'Por favor, escolha seu tipo de usuário.' }]}
        >
          <Select options={tiposDeUsuario} placeholder="Tipo de usuário" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Salvar
          </Button>
          <Button onClick={cancelarCadastro} style={{ marginLeft: 8 }}>
            Cancelar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NovoUsuario;
