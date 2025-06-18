'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Form, Input, InputNumber, Button, message, Select } from 'antd';
import { MocksAvaliacaoEstandes } from '@/mocks/MocksAvaliacaoEstandes';

const { Option } = Select;

export default function EditAvaliacaoPage() {
  const router = useRouter();
  const params = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [avaliacao, setAvaliacao] = useState(null);
  const avaliadores = MocksAvaliacaoEstandes.getAvaliadores();

  useEffect(() => {
    const savedData = localStorage.getItem('avaliacoes');
    const avaliacoes = savedData ? JSON.parse(savedData) : [];
    
    const id = Number(params.id);
    const found = avaliacoes.find(item => item.id === id);
    
    if (found) {
      setAvaliacao(found);
      form.setFieldsValue({
        nomeProjeto: found.nomeProjeto,
        avaliador_id: found.avaliador_id,
        notaProjeto: found.notaProjeto,
        comentario: found.comentario,
      });
    }
    setLoading(false);
  }, [params.id, form]);

  const onFinish = (values) => {
    const avaliadorSelecionado = avaliadores.find(av => av.id === values.avaliador_id);
    
    const savedData = localStorage.getItem('avaliacoes');
    const avaliacoes = savedData ? JSON.parse(savedData) : [];
    

    const novaLista = avaliacoes.map(item => 
      item.id === avaliacao.id ? { 
        ...item, 
        ...values,
        nomeAvaliador: avaliadorSelecionado?.nome || ''
      } : item
    );
    
    localStorage.setItem('avaliacoes', JSON.stringify(novaLista));
    
    message.success('Avaliação atualizada com sucesso!');
    router.push('/avaliacaoestandes');
  };

  if (loading) return <div>Carregando...</div>;
  if (!avaliacao) return <div>Avaliação não encontrada.</div>;

  return (
    <div style={{ padding: 24 }}>
      <h2>Editar Avaliação</h2>
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