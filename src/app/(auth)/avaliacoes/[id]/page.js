'use client';
import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Button } from 'antd';
import { useRouter } from 'next/navigation';

export default function EditAvaliacaoForm({ params }) {
  const [form] = Form.useForm();
  const router = useRouter();
  const avaliacaoId = Number(params.id);

  useEffect(() => {
    const avaliacoes = JSON.parse(localStorage.getItem('avaliacoes')) || [];
    const avaliacao = avaliacoes.find((a) => a.id === avaliacaoId);

    if (avaliacao) {
      form.setFieldsValue(avaliacao);
    }
  }, [avaliacaoId, form]);

  const onFinish = (values) => {
    const avaliacoes = JSON.parse(localStorage.getItem('avaliacoes')) || [];

    const index = avaliacoes.findIndex((a) => a.id === avaliacaoId);
    if (index !== -1) {
      avaliacoes[index] = { id: avaliacaoId, ...values };
      localStorage.setItem('avaliacoes', JSON.stringify(avaliacoes));
    }

    router.push('/avaliacoes');
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
        <InputNumber min={0} max={10} style={{ width: '100%' }} />
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
        onClick={() => router.push('/avaliacoes')}
      >
        Cancelar
      </Button>
    </Form>
  );
}
