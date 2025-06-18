"use client";
import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input } from "antd";

const OrganizacaoPage = () => {
  const [organizacoes, setOrganizacoes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const stored = localStorage.getItem("organizacoes");
    if (stored) setOrganizacoes(JSON.parse(stored));
  }, []);

  const salvarLocalStorage = (data) => {
    localStorage.setItem("organizacoes", JSON.stringify(data));
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const novaOrganizacao = {
        id: String(Date.now()),
        ...values,
      };

      const novas = [...organizacoes, novaOrganizacao];
      setOrganizacoes(novas);
      salvarLocalStorage(novas);
      setIsModalOpen(false);
      form.resetFields();
    });
  };

  const columns = [
    { title: "Nome", dataIndex: "nome", key: "nome" },
    { title: "Curso", dataIndex: "curso_id", key: "curso_id" },
    { title: "Ano", dataIndex: "ano", key: "ano" },
    { title: "Semestre", dataIndex: "semestre", key: "semestre" },
    { title: "Professor", dataIndex: "professor", key: "professor" },
    { title: "Coordenador ID", dataIndex: "coordenador_id", key: "coordenador_id" },
    { title: "Período", dataIndex: "periodo_id", key: "periodo_id" },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h1>Cursos e Turmas</h1>
      <Button type="primary" onClick={() => setIsModalOpen(true)} style={{ marginBottom: 16 }}>
        Nova Organização
      </Button>
      <Table dataSource={organizacoes} columns={columns} rowKey="id" />

      <Modal
        title="Cadastrar Organização"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        okText="Salvar"
        cancelText="Cancelar"
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Nome" name="nome" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Curso ID" name="curso_id" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Ano" name="ano" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Semestre" name="semestre" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Professor" name="professor" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Coordenador ID" name="coordenador_id" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Período ID" name="periodo_id" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default OrganizacaoPage;
