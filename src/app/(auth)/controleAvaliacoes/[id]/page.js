'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Form, Input, InputNumber, Button, Select } from 'antd';

export default function EditControleAvaliacaoForm() {
  const [form] = Form.useForm();
  const params = useParams();
  const [avaliacao, setAvaliacao] = useState(null);

  const projetos = JSON.parse(localStorage.getItem('projetos'))?.data || [];
  const usuarios = JSON.parse(localStorage.getItem('users')) || [];

  const avaliadores = usuarios.filter((u) =>
    ['Professor', 'AvaliadorExterno'].includes(u.tipo)
  );

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('controleAvaliacao')) || { data: [] };
    const encontrada = saved.data.find((item) => item.id === params.id);
    if (encontrada) {
      setAvaliacao(encontrada);
      form.setFieldsValue(encontrada);
    }
  }, [form, params.id]);

  const onFinish = (values) => {
    const saved = JSON.parse(localStorage.getItem('controleAvaliacao')) || { data: [], nextId: 1 };
    const atualizados = saved.data.map((item) =>
      item.id === values.id ? { ...values, nota: parseFloat(values.nota) } : item
    );

    localStorage.setItem('controleAvaliacao', JSON.stringify({ ...saved, data: atualizados }));
    window.location.href = '/controleAvaliacoes';
  };

  if (!avaliacao) return null;

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ maxWidth: 400, margin: '0 auto', marginTop: 32 }}
    >
      <Form.Item label="ID" name="id">
        <Input disabled />
      </Form.Item>

      <Form.Item
        label="Projeto"
        name="projeto_id"
        rules={[{ required: true, message: 'Selecione um projeto.' }]}
      >
        <Select placeholder="Selecione">
          {projetos.map((proj) => (
            <Select.Option key={proj.id} value={proj.id}>
              {proj.titulo}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Avaliador"
        name="avaliador_id"
        rules={[{ required: true, message: 'Selecione um avaliador.' }]}
      >
        <Select placeholder="Selecione">
          {avaliadores.map((user) => (
            <Select.Option key={user.id} value={user.id}>
              {user.nome}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Nota"
        name="nota"
        rules={[{ required: true, message: 'Informe a nota.' }]}
      >
        <InputNumber min={0} max={10} step={0.1} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        label="Comentário"
        name="comentario"
        rules={[{ required: true, message: 'Informe o comentário.' }]}
      >
        <Input.TextArea rows={3} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Salvar
        </Button>
      </Form.Item>

      <Button block onClick={() => window.location.href = '/controleAvaliacoes'}>
        Cancelar
      </Button>
    </Form>
  );
}