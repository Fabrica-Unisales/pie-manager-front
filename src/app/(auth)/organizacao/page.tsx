"use client";
import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Select, Space, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;
const ORGANIZACOES_KEY = "organizacoes";

// ✅ Tipagem da Organização
interface Organizacao {
  id: string;
  nome: string;
  curso_id: string;
  semestre: string;
  ano: string;
  coordenador_id: string;
  periodo_id: string;
  professor: string;
  listaAlunos: string[];
}

// ✅ Mock simplificado para professores e alunos
const usuariosMock = [
  { id: "1", nome: "Wilson" },
  { id: "2", nome: "Maria" },
  { id: "3", nome: "Carlos" },
];

const alunosMock = [
  { id: "4", nome: "João" },
  { id: "5", nome: "Ana" },
  { id: "6", nome: "Pedro" },
];

const PageOrganizacao = () => {
  const [organizacoes, setOrganizacoes] = useState<Organizacao[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editando, setEditando] = useState<Organizacao | null>(null);
  const [form] = Form.useForm();

  // Carrega do localStorage
  useEffect(() => {
    const dataString = localStorage.getItem(ORGANIZACOES_KEY);
    const data: Organizacao[] = dataString ? JSON.parse(dataString) : [];
    setOrganizacoes(data);
  }, []);

  const salvarOrganizacoes = (data: Organizacao[]) => {
    localStorage.setItem(ORGANIZACOES_KEY, JSON.stringify(data));
    setOrganizacoes(data);
  };

  const handleDelete = (id: string) => {
    const atualizadas = organizacoes.filter((org) => org.id !== id);
    salvarOrganizacoes(atualizadas);
    message.success("Organização excluída!");
  };

  const handleEdit = (record: Organizacao) => {
    setEditando(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleAdd = () => {
    setEditando(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editando) {
        const atualizadas = organizacoes.map((org) =>
          org.id === editando.id ? { ...editando, ...values } : org
        );
        salvarOrganizacoes(atualizadas);
        message.success("Organização editada!");
      } else {
        const nova: Organizacao = {
          ...values,
          id: Date.now().toString(), // gera ID único
        };
        salvarOrganizacoes([...organizacoes, nova]);
        message.success("Organização adicionada!");
      }
      setModalVisible(false);
    });
  };

  const columns = [
    { title: "Nome", dataIndex: "nome" },
    { title: "Curso ID", dataIndex: "curso_id" },
    { title: "Ano", dataIndex: "ano" },
    { title: "Semestre", dataIndex: "semestre" },
    { title: "Período", dataIndex: "periodo_id" },
    { title: "Professor", dataIndex: "professor" },
    {
      title: "Alunos",
      dataIndex: "listaAlunos",
      render: (alunos: string[]) => alunos?.join(", "),
    },
    {
      title: "Ações",
      render: (_: any, record: Organizacao) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>Editar</Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>Excluir</Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAdd}
        style={{ marginBottom: 16 }}
      >
        Adicionar Organização
      </Button>

      <Table dataSource={organizacoes} columns={columns} rowKey="id" />

      <Modal
        title={editando ? "Editar Organização" : "Nova Organização"}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleOk}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="nome" label="Nome" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="curso_id" label="Curso ID" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="ano" label="Ano" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="semestre" label="Semestre" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="periodo_id" label="Período ID" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="coordenador_id" label="Coordenador ID" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="professor" label="Professor" rules={[{ required: true }]}>
            <Select>
              {usuariosMock.map((u) => (
                <Option key={u.id} value={u.nome}>{u.nome}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="listaAlunos" label="Alunos">
            <Select mode="multiple">
              {alunosMock.map((a) => (
                <Option key={a.id} value={a.nome}>{a.nome}</Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default PageOrganizacao;
