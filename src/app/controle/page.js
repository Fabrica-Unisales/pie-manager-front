'use client';

import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  InputNumber,
  Typography,
  Divider,
  message,
  Table,
  Space,
} from 'antd';
import { usuariosMocks } from '@/mocks/usuariosMocks';
import { cursosMocks } from '@/mocks/cursosMocks';

const { Title } = Typography;

const ControlePage = () => {
  const [form] = Form.useForm();
  const [projetos, setProjetos] = useState([]);
  const [contadorId, setContadorId] = useState(0);
  const [formVisivel, setFormVisivel] = useState(false);
  const [editandoId, setEditandoId] = useState(null);

  const coordenadores = usuariosMocks.filter(u => u.tipo === 'Coordenador');
  const professores = usuariosMocks.filter(u => u.tipo === 'Professor');
  const alunos = usuariosMocks.filter(u => u.tipo === 'Aluno');

  const handleSubmit = (values) => {
    const cursoSelecionado = cursosMocks.find(c => c.id === values.curso);
    const coordenadorSelecionado = usuariosMocks.find(u => u.id === values.coordenador);
    const professorSelecionado = usuariosMocks.find(u => u.id === values.professor);
    const alunosSelecionados = usuariosMocks.filter(u => values.alunos.includes(u.id));

    const baseId = Math.floor(Date.now() / 1000) + contadorId;

    const novoProjeto = {
      id: `projeto-${baseId}`,
      nome: values.nome,
      coordenador_id: coordenadorSelecionado?.id,
      coordenador_nome: coordenadorSelecionado?.nome,
      listaTurmas: [
        {
          id: `turma-${baseId}`,
          curso_id: cursoSelecionado?.cursoId,
          curso_nome: cursoSelecionado?.nome,
          periodo_id: cursoSelecionado?.periodoId,
          periodo_numero: values.periodoNumero,
          ano: values.ano,
          semestre: values.semestre,
          professor: professorSelecionado,
          listaAlunos: alunosSelecionados,
        },
      ],
    };

    if (editandoId) {
      setProjetos(prev =>
        prev.map(p => (p.id === editandoId ? { ...novoProjeto, id: editandoId } : p))
      );
      message.success('Projeto editado com sucesso!');
    } else {
      setProjetos([...projetos, novoProjeto]);
      setContadorId(contadorId + 1);
      message.success('Projeto cadastrado com sucesso!');
    }

    form.resetFields();
    setFormVisivel(false);
    setEditandoId(null);
  };

  const handleEditar = (projeto) => {
    const turma = projeto.listaTurmas[0];
    form.setFieldsValue({
      nome: projeto.nome,
      curso: cursosMocks.find(c => c.cursoId === turma.curso_id && c.periodoId === turma.periodo_id)?.id,
      periodoNumero: turma.periodo_numero,
      ano: turma.ano,
      semestre: turma.semestre,
      coordenador: projeto.coordenador_id,
      professor: turma.professor?.id,
      alunos: turma.listaAlunos.map(a => a.id),
    });
    setFormVisivel(true);
    setEditandoId(projeto.id);
  };

  const handleExcluir = (id) => {
    setProjetos(prev => prev.filter(p => p.id !== id));
    message.success('Projeto excluído');
  };

  const columns = [
    {
      title: 'Projeto',
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
      dataIndex: ['listaTurmas', 0, 'curso_nome'],
      key: 'curso_nome',
    },
    {
      title: 'Período',
      key: 'periodo',
      render: (_, record) => {
        const turma = record.listaTurmas[0];
        return `${turma.periodo_id} - ${turma.periodo_numero}º`;
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
      <Title level={2}>Controle de Projetos</Title>

      {!formVisivel && (
        <Button type="primary" onClick={() => setFormVisivel(true)}>
          Cadastrar Novo Projeto
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
              label="Nome do Projeto"
              name="nome"
              rules={[{ required: true, message: 'Digite o nome do projeto' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Curso"
              name="curso"
              rules={[{ required: true, message: 'Selecione o curso' }]}
            >
              <Select placeholder="Selecione um curso">
                {cursosMocks.map(curso => (
                  <Select.Option key={curso.id} value={curso.id}>
                    {curso.nome}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Período (número)"
              name="periodoNumero"
              rules={[{ required: true, message: 'Informe o período' }]}
            >
              <Select placeholder="Selecione o período">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                  <Select.Option key={num} value={num}>
                    {num}º
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Ano"
              name="ano"
              rules={[{ required: true, message: 'Informe o ano' }]}
            >
              <InputNumber min={2020} max={2100} />
            </Form.Item>

            <Form.Item
              label="Semestre"
              name="semestre"
              rules={[{ required: true, message: 'Informe o semestre' }]}
            >
              <Select placeholder="1 ou 2">
                <Select.Option value={1}>1</Select.Option>
                <Select.Option value={2}>2</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Coordenador"
              name="coordenador"
              rules={[{ required: true, message: 'Selecione um coordenador' }]}
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
              label="Professor"
              name="professor"
              rules={[{ required: true, message: 'Selecione um professor' }]}
            >
              <Select placeholder="Selecione o professor">
                {professores.map(prof => (
                  <Select.Option key={prof.id} value={prof.id}>
                    {prof.nome}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Alunos"
              name="alunos"
              rules={[{ required: true, message: 'Selecione os alunos' }]}
            >
              <Select mode="multiple" placeholder="Selecione os alunos">
                {alunos.map(aluno => (
                  <Select.Option key={aluno.id} value={aluno.id}>
                    {aluno.nome}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  {editandoId ? 'Salvar Alterações' : 'Cadastrar Projeto'}
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

      <Title level={3}>Projetos Cadastrados</Title>

      <Table
        dataSource={projetos}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default ControlePage;
