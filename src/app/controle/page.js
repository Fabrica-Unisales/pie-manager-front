'use client';
import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Button, Table, Popconfirm, message } from 'antd';

export default function ControleCursosTurmas() {
  const [form] = Form.useForm();
  const [organizacoes, setOrganizacoes] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('organizacoes');
    if (stored) {
      setOrganizacoes(JSON.parse(stored));
    }
  }, []);

  const salvarLocalStorage = (data) => {
    localStorage.setItem('organizacoes', JSON.stringify(data));
  };

  const onFinish = (values) => {
    const novaOrganizacao = {
      id: editandoId || Date.now(),
      nome: values.nome,
      coordenador_id: values.coordenador_id,
      listaTurmas: [
        {
          id: Date.now(),
          curso_id: values.curso_id,
          periodo_id: values.periodo_id,
          ano: values.ano,
          semestre: values.semestre,
          professor: values.professor,
          listaAlunos: values.listaAlunos
            ? values.listaAlunos.split(',').map(a => a.trim())
            : [],
        },
      ],
    };

    let novasOrganizacoes;
    if (editandoId) {
      novasOrganizacoes = organizacoes.map(org =>
        org.id === editandoId ? novaOrganizacao : org
      );
      message.success('Organização editada com sucesso!');
    } else {
      novasOrganizacoes = [...organizacoes, novaOrganizacao];
      message.success('Organização cadastrada com sucesso!');
    }

    setOrganizacoes(novasOrganizacoes);
    salvarLocalStorage(novasOrganizacoes);
    form.resetFields();
    setEditandoId(null);
  };

  const editar = (org) => {
    setEditandoId(org.id);
    const turma = org.listaTurmas[0];

    form.setFieldsValue({
      nome: org.nome,
      coordenador_id: org.coordenador_id,
      curso_id: turma.curso_id,
      periodo_id: turma.periodo_id,
      ano: turma.ano,
      semestre: turma.semestre,
      professor: turma.professor,
      listaAlunos: turma.listaAlunos.join(', '),
    });
  };

  const remover = (id) => {
    const novasOrganizacoes = organizacoes.filter(org => org.id !== id);
    setOrganizacoes(novasOrganizacoes);
    salvarLocalStorage(novasOrganizacoes);
    message.success('Organização removida com sucesso!');
  };

  const colunas = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (_, record, index) => index + 1,
    },
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
    },
    {
      title: 'Coordenador ID',
      dataIndex: 'coordenador_id',
      key: 'coordenador_id',
    },
    {
      title: 'Turma',
      key: 'turma',
      render: (_, record) => {
        const turma = record.listaTurmas[0];
        return (
          <div>
            <div><b>Curso ID:</b> {turma.curso_id}</div>
            <div><b>Período ID:</b> {turma.periodo_id}</div>
            <div><b>Ano:</b> {turma.ano}</div>
            <div><b>Semestre:</b> {turma.semestre}</div>
            <div><b>Professor:</b> {turma.professor}</div>
            <div>
              <b>Alunos:</b> {Array.isArray(turma.listaAlunos) ? turma.listaAlunos.join(', ') : turma.listaAlunos}
            </div>
          </div>
        );
      },
    },
    {
      title: 'Ações',
      key: 'acoes',
      render: (_, record) => (
        <div>
          <Button onClick={() => editar(record)} style={{ marginRight: 8 }}>
            Editar
          </Button>
          <Popconfirm
            title="Tem certeza que deseja excluir?"
            onConfirm={() => remover(record.id)}
            okText="Sim"
            cancelText="Não"
          >
            <Button danger>Excluir</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 20 }}>
      <h1>Cadastro de Organização de Cursos e Turmas</h1>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Nome"
          name="nome"
          rules={[{ required: true, message: 'Por favor, insira o nome.' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Coordenador ID"
          name="coordenador_id"
          rules={[{ required: true, message: 'Por favor, insira o Coordenador ID.' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Curso ID"
          name="curso_id"
          rules={[{ required: true, message: 'Por favor, insira o Curso ID.' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Período ID"
          name="periodo_id"
          rules={[{ required: true, message: 'Por favor, insira o Período ID.' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Ano"
          name="ano"
          rules={[{ required: true, message: 'Por favor, insira o Ano.' }]}
        >
          <InputNumber min={2000} max={2100} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Semestre"
          name="semestre"
          rules={[{ required: true, message: 'Por favor, insira o Semestre.' }]}
        >
          <InputNumber min={1} max={2} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Professor"
          name="professor"
          rules={[{ required: true, message: 'Por favor, insira o nome do Professor.' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Lista de Alunos (IDs separados por vírgula)"
          name="listaAlunos"
          rules={[{ required: true, message: 'Por favor, insira os IDs dos Alunos.' }]}
        >
          <Input placeholder="Ex: aluno1, aluno2, aluno3" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            {editandoId ? 'Atualizar' : 'Salvar'}
          </Button>
        </Form.Item>
      </Form>

      <h2>Organizações Cadastradas</h2>
      <Table
        dataSource={organizacoes}
        columns={colunas}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}
