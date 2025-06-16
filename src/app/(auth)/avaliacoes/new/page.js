'use client';
import React from 'react';
import { Form, Input, InputNumber, Button } from 'antd';

export default function NewAvaliacaoForm() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const stored = JSON.parse(localStorage.getItem('avaliacoes')) || {
      data: [],
      nextId: 1,
      length: 0,
    };
  
    const novaAvaliacao = { id: Date.now(), ...values };
  
    const atualizadas = [...stored.data, novaAvaliacao];
  
    const updatedData = {
      data: atualizadas,
      nextId: Date.now(),
      length: atualizadas.length,
    };
  
    localStorage.setItem('avaliacoes', JSON.stringify(updatedData));
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
