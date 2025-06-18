'use client';

import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  Typography,
  Divider,
  message,
  Table,
  Space,
} from 'antd';
import { usuariosMocks } from '@/mocks/usuariosMocks';
import { cursosMocks } from '@/mocks/cursosMocks';
import { turmasMocks } from '@/mocks/turmasMocks';

const { Title } = Typography;

const ControlePage = () => {
  const [form] = Form.useForm();
  const [organizacoes, setOrganizacoes] = useState([]);
  const [formVisivel, setFormVisivel] = useState(false);
  const [editandoId, setEditandoId] = useState(null);

  const coordenadores = usuariosMocks.filter(u => u.tipo === 'Coordenador');

  const handleSubmit = (values) => {
    const coordenadorSelecionado = usuariosMocks.find(u => u.id === values.coordenador);
    const turmaSelecionada = turmasMocks.find(t => t.id === values.turma);

    const novoId = organizacoes.length > 0
      ? Math.max(...organizacoes.map(o => parseInt(o.id))) + 1
      : 1;

    const novaOrganizacao = {
      id: String(editandoId || novoId),
      nome: values.nome,
      coordenador_id: coordenadorSelecionado?.id,
      coordenador_nome: coordenadorSelecionado?.nome,
      listaTurmas: [
        {
          ...turmaSelecionada,
        },
      ],
    };

    if (editandoId) {
      setOrganizacoes(prev =>
        prev.map(p => (p.id === editandoId ? novaOrganizacao : p))
      );
      message.success('Organização editada com sucesso!');
    } else {
      setOrganizacoes([...organizacoes, novaOrganizacao]);
      message.success('Organização cadastrada com sucesso!');
    }

    form.resetFields();
    setFormVisivel(false);
    setEditandoId(null);
  };

  const handleEditar = (organizacao) => {
    const turma = organizacao.listaTurmas[0];
    form.setFieldsValue({
      nome: organizacao.nome,
      coordenador: organizacao.coordenador_id,
      turma: turma.id,
    });
    setFormVisivel(true);
    setEditandoId(organizacao.id);
  };

  const handleExcluir = (id) => {
    setOrganizacoes(prev => prev.filter(p => p.id !== id));
    message.success('Organização excluída');
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
    },
    {
      title: 'Coordenador',
      dataIndex: 'coordenador_nome',
      key: 'coordenador_nome',
    },
    {
      title: 'Curso',
      key: 'curso',
      render: (_, record) => record.listaTurmas[0].curso_nome,
    },
    {
      title: 'Período',
      key: 'periodo',
      render: (_, record) => {
        const turma = record.listaTurmas[0];
        return `${turma.periodo_id}º`;
      },
    },
    {
      title: 'Ano/Semestre',
      key: 'ano_semestre',
      render: (_, record) => {
        const turma = record.listaTurmas[0];
        return `${turma.ano}/${turma.semestre}`;
      },
    },
    {
      title: 'Professor',
      key: 'professor',
      render: (_, record) => record.listaTurmas[0].professor?.nome,
    },
    {
      title: 'Alunos',
      key: 'alunos',
      render: (_, record) =>
        record.listaTurmas[0].listaAlunos.map(a => a.nome).join(', '),
    },
    {
      title: 'Ações',
      key: 'acoes',
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleEditar(record)}>Editar</Button>
          <Button type="link" danger onClick={() => handleExcluir(record.id)}>Excluir</Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Controle de Organização de Cursos e Turmas</Title>

      {!formVisivel && (
        <Button type="primary" onClick={() => setFormVisivel(true)}>
          Cadastrar Nova Organização
        </Button>
      )}

      {formVisivel && (
        <>
          <Divider />
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            style={{ maxWidth: 600, marginTop: 24 }}
          >
            <Form.Item
              label="Nome"
              name="nome"
              rules={[{ required: true, message: 'Digite o nome' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Coordenador"
              name="coordenador"
              rules={[{ required: true, message: 'Selecione o coordenador' }]}
            >
              <Select placeholder="Selecione o coordenador">
                {coordenadores.map(coord => (
                  <Select.Option key={coord.id} value={coord.id}>
                    {coord.nome}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Turma"
              name="turma"
              rules={[{ required: true, message: 'Selecione a turma' }]}
            >
              <Select placeholder="Selecione a turma">
                {turmasMocks.map(turma => (
                  <Select.Option key={turma.id} value={turma.id}>
                    {`${turma.curso_nome} - ${turma.ano}/${turma.semestre} - Prof: ${turma.professor?.nome}`}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  {editandoId ? 'Salvar Alterações' : 'Cadastrar Organização'}
                </Button>
                <Button onClick={() => { form.resetFields(); setFormVisivel(false); setEditandoId(null); }}>
                  Cancelar
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </>
      )}

      <Divider />

      <Title level={3}>Organizações Cadastradas</Title>

      <Table
        dataSource={organizacoes}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default ControlePage;
