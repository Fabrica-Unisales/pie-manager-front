'use client';

import React, { useEffect, useState } from 'react';
import { Button, Table, InputNumber, Input, Form, Select } from 'antd';
import EstandeMocks from '@/mocks/EstandeMocks';

export default function ControleEstandePage() {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [projetos, setProjetos] = useState([]);
  const [avaliadores, setAvaliadores] = useState([]);
  const [nextId, setNextId] = useState(1); 

  useEffect(() => {
    const armazenado = localStorage.getItem('estandes');
    if (!armazenado) {
      EstandeMocks.build();
    }

    const estandesData = JSON.parse(localStorage.getItem('estandes'));

    if (estandesData) {
      setDataSource(estandesData.data || []);
      setProjetos(estandesData.projetos || []);
      setAvaliadores(estandesData.avaliadores || []);
      setNextId(estandesData.nextId || 1); 
    }
  }, []);

  const salvarLocal = (dados, nextIdAtual = 1) => {
    localStorage.setItem(
      'estandes',
      JSON.stringify({
        data: dados,
        projetos,
        avaliadores,
        nextId: nextIdAtual,
        length: dados.length,
      })
    );
  };

  const onFinish = (values) => {
    const estandesData = JSON.parse(localStorage.getItem('estandes'));
    const currentId = estandesData?.nextId || nextId;

    if (editingId) {
      const atualizados = dataSource.map((item) =>
        item.id === editingId ? { ...item, ...values, id: editingId } : item
      );
      setDataSource(atualizados);
      salvarLocal(atualizados, currentId);
      setEditingId(null);
    } else {
      const novo = {
        id: String(currentId).padStart(2, '0'), 
        ...values,
      };
      const novosDados = [...(dataSource || []), novo];
      setDataSource(novosDados);
      salvarLocal(novosDados, currentId + 1); 
      setNextId(currentId + 1); 
    }

    form.resetFields();
  };

  const handleEdit = (record) => {
    form.setFieldsValue(record);
    setEditingId(record.id);
  };

  const handleDelete = (id) => {
    const filtrado = dataSource.filter((item) => item.id !== id);
    setDataSource(filtrado);
    salvarLocal(filtrado, nextId); 
  };

  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: 'Projeto ID', dataIndex: 'projeto_id' },
    { title: 'Avaliador ID', dataIndex: 'avaliador_id' },
    { title: 'Nota', dataIndex: 'nota' },
    { title: 'Comentário', dataIndex: 'comentario' },
    {
      title: 'Ações',
      dataIndex: 'actions',
      render: (_, record) => (
        <>
          <Button
            style={{ marginRight: 8 }}
            onClick={() => handleEdit(record)}
            size="small"
          >
            Editar
          </Button>
          <Button danger onClick={() => handleDelete(record.id)} size="small">
            Deletar
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 24 }}>Controle de Estande de Avaliação</h2>
      <Form form={form} layout="inline" onFinish={onFinish}>
        <Form.Item name="projeto_id" rules={[{ required: true, message: 'Informe o projeto' }]}>
          <Select placeholder="Selecione o Projeto" style={{ width: 160 }}>
            {projetos.map((projeto) => (
              <Select.Option key={projeto.id} value={projeto.id}>
                {projeto.id}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="avaliador_id" rules={[{ required: true, message: 'Informe o avaliador' }]}>
          <Select placeholder="Selecione o Avaliador" style={{ width: 160 }}>
            {avaliadores.map((avaliador) => (
              <Select.Option key={avaliador.id} value={avaliador.id}>
                {avaliador.id}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="nota" rules={[{ required: true, message: 'Informe a nota' }]}>
          <InputNumber min={0} max={10} step={0.1} placeholder="Nota" style={{ width: 100 }} />
        </Form.Item>
        <Form.Item name="comentario" rules={[{ required: true, message: 'Informe o comentário' }]}>
          <Input placeholder="Comentário" style={{ width: 200 }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {editingId ? 'Atualizar Avaliação' : 'Adicionar Avaliação'}
          </Button>
        </Form.Item>
      </Form>

      <Table
        style={{ marginTop: 32 }}
        dataSource={dataSource}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}
