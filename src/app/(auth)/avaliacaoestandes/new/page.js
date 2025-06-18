'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Form, Input, InputNumber, Button, message, Select } from 'antd';
import { MocksAvaliacaoEstandes } from '@/mocks/MocksAvaliacaoEstandes';

const { Option } = Select;

export default function NovaAvaliacaoPage() {
  const [form] = Form.useForm();
  const router = useRouter();
  const avaliadores = MocksAvaliacaoEstandes.getAvaliadores();

  const onFinish = (values) => {
    
    const avaliadorSelecionado = avaliadores.find(av => av.id === values.avaliador_id);
    
    
    const savedData = localStorage.getItem('avaliacoes');
    const avaliacoes = savedData ? JSON.parse(savedData) : [];
    
    const maiorId = avaliacoes.length > 0 ? Math.max(...avaliacoes.map(av => av.id)) : 17;
    const proximoId = maiorId + 1;
    
    const novaAvaliacao = {
      ...values,
      id: proximoId,
      projeto_id: Math.floor(Math.random() * 1000) + 100,
      nomeAvaliador: avaliadorSelecionado?.nome || '',
    };
    
    const novaLista = [...avaliacoes, novaAvaliacao];
    localStorage.setItem('avaliacoes', JSON.stringify(novaLista));
    
    message.success('Avaliação adicionada!');
    router.push('/avaliacaoestandes');
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Nova Avaliação</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ maxWidth: 500, margin: '0 auto', marginTop: 32 }}
      >
        <Form.Item
          label="Nome do Projeto"
          name="nomeProjeto"
          rules={[{ required: true, message: 'Informe o nome do projeto.' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Avaliador"
          name="avaliador_id"
          rules={[{ required: true, message: 'Selecione um avaliador.' }]}
        >
          <Select placeholder="Selecione um avaliador">
            {avaliadores.map(avaliador => (
              <Option key={avaliador.id} value={avaliador.id}>
                {avaliador.nome} - {avaliador.especialidade}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Nota"
          name="notaProjeto"
          rules={[{ required: true, type: 'number', min: 0, max: 10, message: 'Nota de 0 a 10.' }]}
        >
          <InputNumber step={0.1} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="Comentário"
          name="comentario"
          rules={[{ required: true, message: 'Informe um comentário.' }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Salvar
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={() => router.back()}>
            Cancelar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}