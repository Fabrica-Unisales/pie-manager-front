'use client';
import React from 'react';
import { Form, Input, InputNumber, Button } from 'antd';

export default function NewAvaliacaoForm() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    // Recupera avaliações anteriores ou cria array vazio
    const avaliacoes = JSON.parse(localStorage.getItem('avaliacoes')) || [];

    // Adiciona um ID simples (timestamp) — ideal para chave única
    const novaAvaliacao = { id: Date.now(), ...values };

    // Salva no localStorage
    localStorage.setItem('avaliacoes', JSON.stringify([...avaliacoes, novaAvaliacao]));

    // Redireciona após salvar
    window.location.href = '/avaliacoes';
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ maxWidth: 600, margin: '0 auto', marginTop: 32 }}
    >
      <Form.Item
        label="Nome do Projeto"
        name="nomeProjeto"
        rules={[{ required: true, message: 'Insira o nome do projeto.' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Nome do Avaliador"
        name="nomeAvaliador"
        rules={[{ required: true, message: 'Insira o nome do avaliador.' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Nota"
        name="nota"
        rules={[{ required: true, message: 'Insira a nota.' }]}
      >
        <InputNumber min={0} max={10} step={0.1} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        label="Comentário"
        name="comentario"
        rules={[{ required: true, message: 'Insira um comentário.' }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Salvar Avaliação
        </Button>
      </Form.Item>

      <Button
        style={{ marginTop: 8 }}
        block
        onClick={() => window.location.href = '/avaliacoes'}
      >
        Cancelar
      </Button>
    </Form>
  );
}
