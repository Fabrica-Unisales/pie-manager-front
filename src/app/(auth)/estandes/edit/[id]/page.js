'use client';
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, TimePicker, message } from 'antd';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';

const EstandeForm = ({ initialData, onFinish, onCancel }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({
        name: initialData.name,
        localizacao: initialData.localizacao,
        horario: dayjs(initialData.horario_projeto[0]?.horario, 'HH:mm'),
      });
    }
  }, [initialData, form]);

  return (
    <Form
      form={form}
      name="editEstande"
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
          <Button onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="primary" htmlType="submit">
            Salvar Alterações
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

const EditEstande = ({ params }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [estandeData, setEstandeData] = useState(null);
  const id = React.use(params).id;

  useEffect(() => {
    const loadEstande = async () => {
      try {
        const estandes = JSON.parse(localStorage.getItem('estandes'));
        if (estandes && estandes.data) {
          const estande = estandes.data.find(item => item.id === parseInt(id));
          if (estande) {
            setEstandeData(estande);
            setLoading(false);
          } else {
            message.error('Estande não encontrado');
            router.push('/estandes');
          }
        }
      } catch (error) {
        console.error('Erro ao carregar estande:', error);
        message.error('Erro ao carregar estande');
        router.push('/estandes');
      }
    };

    loadEstande();
  }, [id, router]);

  const handleFinish = async (values) => {
    try {
      const estandes = JSON.parse(localStorage.getItem('estandes'));
      if (estandes && estandes.data) {
        const index = estandes.data.findIndex(item => item.id === parseInt(id));
        if (index !== -1) {
          const horario = values.horario.format('HH:mm');
          estandes.data[index] = {
            ...estandes.data[index],
            name: values.name,
            localizacao: values.localizacao,
            horario_projeto: [{
              id: parseInt(id),
              horario: horario,
              projeto_id: String(id)
            }]
          };

          localStorage.setItem('estandes', JSON.stringify(estandes));
          message.success('Estande atualizado com sucesso!');
          router.push('/estandes');
        }
      }
    } catch (error) {
      console.error('Erro ao atualizar estande:', error);
      message.error('Erro ao atualizar estande. Tente novamente.');
    }
  };

  const handleCancel = () => {
    router.push('/estandes');
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div style={{ padding: 24, maxWidth: 600, margin: '0 auto' }}>
      <h2 style={{ marginBottom: 24 }}>Editar Estande</h2>
      <EstandeForm 
        initialData={estandeData}
        onFinish={handleFinish}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default EditEstande; 