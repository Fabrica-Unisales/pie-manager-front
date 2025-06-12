'use client';

import React, { useState } from 'react';
import { Form, Input, Button, Space, TimePicker } from 'antd';
import { useRouter } from 'next/navigation';

const NewEstandePage = () => {
  const router = useRouter();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const estandes = JSON.parse(localStorage.getItem('estandes')) || { data: [], nextId: 1 };
    const novoEstande = {
      id: String(estandes.nextId),
      localizacao: values.localizacao,
      horario_projeto: values.horarios.map((horario, index) => ({
        id: index + 1,
        horario: horario.horario.format('HH:mm'),
        projeto_id: horario.projeto_id
      }))
    };

    estandes.data.push(novoEstande);
    estandes.nextId += 1;
    estandes.length = estandes.data.length;
    localStorage.setItem('estandes', JSON.stringify(estandes));
    router.push('/estandes');
  };

  return (
    <div style={{ padding: 24, maxWidth: 600, margin: '0 auto' }}>
      <h1>Novo Estande</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          name="localizacao"
          label="Localização"
          rules={[{ required: true, message: 'Por favor, insira a localização' }]}
        >
          <Input placeholder="Ex: Bloco A - Sala 101" />
        </Form.Item>

        <Form.List name="horarios">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                  <Form.Item
                    {...restField}
                    name={[name, 'horario']}
                    rules={[{ required: true, message: 'Horário é obrigatório' }]}
                  >
                    <TimePicker format="HH:mm" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'projeto_id']}
                    rules={[{ required: true, message: 'ID do projeto é obrigatório' }]}
                  >
                    <Input placeholder="ID do Projeto" />
                  </Form.Item>
                  
                  <Button type="link" onClick={() => remove(name)} danger>
                    Remover
                  </Button>
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block>
                  Adicionar Horário
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Salvar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NewEstandePage; 