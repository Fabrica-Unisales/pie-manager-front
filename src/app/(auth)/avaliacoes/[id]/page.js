'use client';
import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Button } from 'antd';
import { useRouter, useParams } from 'next/navigation';

export default function EditAvaliacaoForm() {
  const [form] = Form.useForm();
  const router = useRouter();
  const { id } = useParams();
  const avaliacaoId = parseInt(id, 10); // conversão segura para número

  useEffect(() => {
    if (!avaliacaoId || isNaN(avaliacaoId)) {
      alert('ID inválido');
      router.push('/avaliacoes');
      return;
    }

    const stored = JSON.parse(localStorage.getItem('avaliacoes'));
    const avaliacoes = stored?.data || [];
    const avaliacao = avaliacoes.find((a) => Number(a.id) === avaliacaoId);

    if (avaliacao) {
      form.setFieldsValue(avaliacao);
    } else {
      alert('Avaliação não encontrada');
      router.push('/avaliacoes');
    }
  }, [avaliacaoId, form, router]);

  const onFinish = (values) => {
    const stored = JSON.parse(localStorage.getItem('avaliacoes')) || { data: [], nextId: 1, length: 0 };
    const avaliacoes = stored.data;

    const index = avaliacoes.findIndex((a) => Number(a.id) === avaliacaoId);
    if (index !== -1) {
      // mantém campos antigos que não estão no formulário (como projeto_id e avaliador_id)
      avaliacoes[index] = { ...avaliacoes[index], ...values, id: String(avaliacaoId) };
      localStorage.setItem('avaliacoes', JSON.stringify({ ...stored, data: avaliacoes }));
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
