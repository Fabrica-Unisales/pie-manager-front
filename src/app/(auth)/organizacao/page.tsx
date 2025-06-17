'use client';

import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Input, Space, Modal } from 'antd';

export default function OrganizacaoPage() {
  const [organizacoes, setOrganizacoes] = useState<any[]>([]);
  const [editando, setEditando] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleFinish = (values: any) => {
    console.log('Valores recebidos do formulário:', values);
    let newData;
    if (editando !== null) {
      // Editar registro existente
      newData = organizacoes.map((org, idx) =>
        idx === editando
          ? { ...org, ...values, id: org.id, key: org.key }
          : org
      );
      setModalVisible(false);
      setEditando(null);
      editForm.resetFields();
    } else {
      // Novo registro
      const nova = {
        id: String(Date.now()),
        key: String(Date.now()),
        nome: values.nome || '',
        curso_id: values.curso_id || '',
        semestre: values.semestre || '',
        ano: values.ano || '',
        professor: values.professor || '',
        coordenador_id: values.coordenador_id || '',
        periodo_id: values.periodo_id || '',
      };
      newData = [...organizacoes, nova];
      form.resetFields();
    }
    setOrganizacoes(newData);
    localStorage.setItem('organizacoes', JSON.stringify(newData));
  };

  const handleEdit = (record: any, idx: number) => {
    setEditando(idx);
    setModalVisible(true);
    editForm.setFieldsValue(record);
  };

  const handleDelete = (idx: number) => {
    const newData = organizacoes.filter((_, i) => i !== idx);
    setOrganizacoes(newData);
    localStorage.setItem('organizacoes', JSON.stringify(newData));
    if (editando === idx) setEditando(null);
  };

  const columns = [
    { title: 'Nome', dataIndex: 'nome', key: 'nome', render: (text: string) => text || '-' },
    { title: 'Curso', dataIndex: 'curso_id', key: 'curso_id', render: (text: string) => text || '-' },
    { title: 'Semestre', dataIndex: 'semestre', key: 'semestre', render: (text: string) => text || '-' },
    { title: 'Ano', dataIndex: 'ano', key: 'ano', render: (text: string) => text || '-' },
    { title: 'Professor', dataIndex: 'professor', key: 'professor', render: (text: string) => text || '-' },
    {
      title: 'Ações',
      key: 'acoes',
      render: (_: any, record: any, idx: number) => (
        <Space>
          <Button size="small" onClick={() => handleEdit(record, idx)}>Editar</Button>
          <Button size="small" danger onClick={() => handleDelete(idx)}>Excluir</Button>
        </Space>
      ),
    },
  ];

  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  useEffect(() => {
    let orgs = [];
    try {
      const raw = localStorage.getItem('organizacoes');
      const parsed = JSON.parse(raw || '[]');
      if (Array.isArray(parsed)) {
        orgs = parsed;
      } else if (parsed && Array.isArray(parsed.data)) {
        orgs = parsed.data;
      }
    } catch {
      orgs = [];
      localStorage.removeItem('organizacoes');
    }
    setOrganizacoes(orgs);
  }, []);

  return (
    <div style={{ padding: 24, maxWidth: 500, margin: '0 auto' }}>
      <h2>Nova Organização de Curso e Turma</h2>
      <Form layout="vertical" onFinish={handleFinish} form={form}>
        <Form.Item name="nome" label="Nome da Organização"><Input /></Form.Item>
        <Form.Item name="coordenador_id" label="ID Coordenador"><Input /></Form.Item>
        <Form.Item name="curso_id" label="ID Curso"><Input /></Form.Item>
        <Form.Item name="periodo_id" label="ID Período"><Input /></Form.Item>
        <Form.Item name="ano" label="Ano"><Input /></Form.Item>
        <Form.Item name="semestre" label="Semestre"><Input /></Form.Item>
        <Form.Item name="professor" label="Nome do Professor"><Input /></Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>Salvar</Button>
        </Form.Item>
      </Form>
      <Table
        dataSource={organizacoes}
        columns={columns}
        pagination={{ pageSize: 5 }}
        style={{ marginTop: 24 }}
      />
      <Modal
        title="Editar Organização"
        open={modalVisible}
        onCancel={() => { setModalVisible(false); setEditando(null); editForm.resetFields(); }}
        footer={null}
        width={400}
      >
        <Form layout="vertical" form={editForm} onFinish={handleFinish}>
          <Form.Item name="nome" label="Nome da Organização"><Input /></Form.Item>
          <Form.Item name="coordenador_id" label="ID Coordenador"><Input /></Form.Item>
          <Form.Item name="curso_id" label="ID Curso"><Input /></Form.Item>
          <Form.Item name="periodo_id" label="ID Período"><Input /></Form.Item>
          <Form.Item name="ano" label="Ano"><Input /></Form.Item>
          <Form.Item name="semestre" label="Semestre"><Input /></Form.Item>
          <Form.Item name="professor" label="Nome do Professor"><Input /></Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>Salvar Alteração</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
} 