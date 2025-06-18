'use client';
import React, { useState } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import { useRouter } from 'next/navigation';

const projetosNomes = {
  '101': 'Sistema de Gestão Escolar',
  '102': 'App de Saúde Mental',
  '103': 'Plataforma de E-commerce',
  '104': 'Controle de Estoque',
  '105': 'Rede Social Acadêmica',
  '106': 'Gestão de Eventos'
};

const avaliadoresNomes = {
  '201': 'Prof. Ana Paula',
  '202': 'Prof. Carlos Silva',
  '203': 'Prof. Beatriz Souza',
  '204': 'Prof. João Mendes'
};

const projetosOptions = Object.entries(projetosNomes).map(([id, nome]) => ({ value: id, label: nome }));
const avaliadoresOptions = Object.entries(avaliadoresNomes).map(([id, nome]) => ({ value: id, label: nome }));

const NovaAvaliacaoPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = (values) => {
    setLoading(true);
    const avaliacoes = JSON.parse(localStorage.getItem('avaliacoes')) || { data: [], nextId: 1, length: 0 };
    const novaAvaliacao = {
      id: String(avaliacoes.nextId || avaliacoes.data.length + 1),
      ...values,
      nota: parseFloat(values.nota)
    };
    const novaLista = [...avaliacoes.data, novaAvaliacao];
    const novoObj = {
      data: novaLista,
      nextId: (parseInt(novaAvaliacao.id) + 1),
      length: novaLista.length
    };
    localStorage.setItem('avaliacoes', JSON.stringify(novoObj));
    message.success('Avaliação adicionada com sucesso!');
    router.push('/avaliacoes');
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 24 }}>
      <h2>Nova Avaliação</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="Projeto" name="projeto_id" rules={[{ required: true, message: 'Selecione o projeto' }]}> 
          <Select options={projetosOptions} placeholder="Selecione o projeto" />
        </Form.Item>
        <Form.Item label="Avaliador" name="avaliador_id" rules={[{ required: true, message: 'Selecione o avaliador' }]}> 
          <Select options={avaliadoresOptions} placeholder="Selecione o avaliador" />
        </Form.Item>
        <Form.Item label="Nota" name="nota" rules={[{ required: true, message: 'Informe a nota' }]}> 
          <Input type="number" step="0.1" min={0} max={10} placeholder="Nota" />
        </Form.Item>
        <Form.Item label="Comentário" name="comentario" rules={[{ required: true, message: 'Informe um comentário' }]}> 
          <Input.TextArea rows={3} placeholder="Comentário" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>Salvar</Button>
          <Button style={{ marginLeft: 8 }} onClick={() => router.push('/avaliacoes')}>Cancelar</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NovaAvaliacaoPage; 