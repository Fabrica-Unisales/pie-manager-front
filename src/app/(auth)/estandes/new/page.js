'use client';
import React, { useCallback } from 'react';
import { Form, Input, Button, TimePicker, message } from 'antd';
import { useRouter } from 'next/navigation';

const NewEstande = () => {
  const router = useRouter();
  const [form] = Form.useForm();

  const onFinish = useCallback(async (values) => {
    try {
      const estandesStorage = JSON.parse(localStorage.getItem('estandes')) || { data: [], nextId: 1 };
      
      const horario = values.horario.format('HH:mm');

      const novoEstande = {
        id: estandesStorage.nextId,
        name: values.name,
        localizacao: values.localizacao,
        horario_projeto: [{
          id: estandesStorage.nextId,
          horario: horario,
          projeto_id: String(estandesStorage.nextId)
        }]
      };

      estandesStorage.data.push(novoEstande);
      estandesStorage.nextId += 1;
      estandesStorage.length = estandesStorage.data.length;

      localStorage.setItem('estandes', JSON.stringify(estandesStorage));

      message.success('Estande adicionado com sucesso!');
      router.push('/estandes');
    } catch (error) {
      console.error('Erro ao adicionar estande:', error);
      message.error('Erro ao adicionar estande. Tente novamente.');
    }
  }, [router]);

  const handleCancel = useCallback(() => {
    router.push('/estandes');
  }, [router]);

  return (
    <div style={{ padding: 24, maxWidth: 600, margin: '0 auto' }}>
      <h2 style={{ marginBottom: 24 }}>Adicionar Novo Estande</h2>
      
      <Form
        form={form}
        name="newEstande"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        style={{ background: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
      >
        <Form.Item
          name="name"
          label="Nome do Estande"
          rules={[{ required: true, message: 'Por favor, insira o nome do estande' }]}
        >
          <Input placeholder="Digite o nome do estande" />
        </Form.Item>

        <Form.Item
          name="localizacao"
          label="Localização"
          rules={[{ required: true, message: 'Por favor, insira a localização' }]}
        >
          <Input placeholder="Digite a localização do estande" />
        </Form.Item>

        <Form.Item
          name="horario"
          label="Horário"
          rules={[{ required: true, message: 'Por favor, selecione o horário' }]}
        >
          <TimePicker format="HH:mm" placeholder="Selecione o horário" />
        </Form.Item>

        <Form.Item>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'flex-end' }}>
            <Button onClick={handleCancel}>
              Cancelar
            </Button>
            <Button type="primary" htmlType="submit">
              Adicionar Estande
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NewEstande;