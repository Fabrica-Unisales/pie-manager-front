'use client';

import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Space, TimePicker } from 'antd';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';

const EditEstandePage = ({ params }) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params || !params.id) return;
    const estandes = JSON.parse(localStorage.getItem('estandes')) || { data: [] };
    const estande = estandes.data.find(e => e.id === params.id);
    
    if (estande) {
      form.setFieldsValue({
        localizacao: estande.localizacao,
        horarios: estande.horario_projeto.map(h => ({
          horario: dayjs(h.horario, 'HH:mm'),
          projeto_id: h.projeto_id
        }))
      });
    }
    setLoading(false);
  }, [params, form]);

  const onFinish = (values) => {
    const estandes = JSON.parse(localStorage.getItem('estandes')) || { data: [] };
    const index = estandes.data.findIndex(e => e.id === params.id);
    
    if (index !== -1) {
      estandes.data[index] = {
        id: params.id,
        localizacao: values.localizacao,
        horario_projeto: values.horarios.map((horario, idx) => ({
          id: idx + 1,
          horario: horario.horario.format('HH:mm'),
          projeto_id: horario.projeto_id
        }))
      };
      
      localStorage.setItem('estandes', JSON.stringify(estandes));
      router.push('/estandes');
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div style={{ padding: 24, maxWidth: 600, margin: '0 auto' }}>
      <h1>Editar Estande</h1>
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
          <Space>
            <Button type="primary" htmlType="submit">
              Salvar
            </Button>
            <Button onClick={() => router.push('/estandes')}>
              Cancelar
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditEstandePage; 