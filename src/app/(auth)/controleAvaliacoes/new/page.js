'use client';

import React from 'react';
import { Form, Input, InputNumber, Button, Select } from 'antd';

const defaultAvaliacao = {
  projeto_id: '',
  avaliador_id: '',
  nota: 0,
  comentario: '',
};

export default function NewControleAvaliacaoForm() {
  const [form] = Form.useForm();

  const projetos = JSON.parse(localStorage.getItem('projetos'))?.data || [];
  const usuarios = JSON.parse(localStorage.getItem('users')) || [];

  const avaliadores = usuarios.filter((u) =>
    ['Professor', 'AvaliadorExterno'].includes(u.tipo)
  );

  const onFinish = (values) => {
    const saved = JSON.parse(localStorage.getItem('controleAvaliacao')) || {
      data: [],
      nextId: 1,
      length: 0,
    };

    const novaAvaliacao = {
      id: String(saved.nextId),
      projeto_id: values.projeto_id,
      avaliador_id: values.avaliador_id,
      nota: parseFloat(values.nota),
      comentario: values.comentario,
    };

    saved.data.push(novaAvaliacao);
    saved.nextId += 1;
    saved.length = saved.data.length;

    localStorage.setItem('controleAvaliacao', JSON.stringify(saved));
    window.location.href = '/controleAvaliacoes';
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={defaultAvaliacao}
      onFinish={onFinish}
      style={{ maxWidth: 400, margin: '0 auto', marginTop: 32 }}
    >
      <Form.Item
        label="ID do Projeto"
        name="projeto_id"
        rules={[{ required: true, message: 'Por favor, selecione o projeto.' }]}
      >
        <Select placeholder="Selecione um projeto">
          {projetos.map((proj) => (
            <Select.Option key={proj.id} value={proj.id}>
              {proj.titulo}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="ID do Avaliador"
        name="avaliador_id"
        rules={[{ required: true, message: 'Por favor, selecione o avaliador.' }]}
      >
        <Select placeholder="Selecione um avaliador">
          {avaliadores.map((user) => (
            <Select.Option key={user.id} value={user.id}>
              {user.nome} ({user.tipo})
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Nota"
        name="nota"
        rules={[{ required: true, message: 'Por favor, insira a nota.' }]}
      >
        <InputNumber min={0} max={10} step={0.1} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        label="Comentário"
        name="comentario"
        rules={[{ required: true, message: 'Por favor, insira o comentário.' }]}
      >
        <Input.TextArea rows={3} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Salvar
        </Button>
      </Form.Item>

      <Button
        style={{ marginTop: 8 }}
        block
        onClick={() => window.location.href = '/controleAvaliacoes'}
      >
        Cancelar
      </Button>
    </Form>
  );
}