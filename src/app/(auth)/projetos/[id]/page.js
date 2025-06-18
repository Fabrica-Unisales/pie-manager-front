'use client';

import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import { useRouter, useParams } from 'next/navigation';

const ProjetoEditPage = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [turmas, setTurmas] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [alunosFiltrados, setAlunosFiltrados] = useState([]);

  useEffect(() => {
    const cursos = JSON.parse(localStorage.getItem('cursos')) || [];
    const usersRaw = localStorage.getItem('users');
    let users = { data: [] };

    try {
      if (usersRaw) {
        users = JSON.parse(usersRaw);
      }
    } catch (error) {
      console.warn('Erro ao ler users do localStorage:', error);
    }

    const turmasExtraidas = cursos.flatMap(curso => curso.listaTurmas || []);
    setTurmas(turmasExtraidas);

    const profs = (users?.data || []).filter(u => u.tipo === 'Professor');
    setProfessores(profs);

    const alunos = (users?.data || []).filter(u => u.tipo === 'Aluno');
    setAlunos(alunos);

    const projetos = JSON.parse(localStorage.getItem('projetos')) || { data: [] };
    const projeto = projetos.data.find(p => p.id === id);
    if (projeto) {
      setAlunosFiltrados(alunos.filter(a => projeto.listaAlunos.includes(a.id)));
      form.setFieldsValue({
        titulo: projeto.titulo,
        descricao: projeto.descricao,
        id_turma: projeto.id_turma,
        id_Professor: projeto.id_Professor,
        listaAlunos: projeto.listaAlunos
      });
    }
  }, [id, form]);

  const handleChangeTurma = (turmaId) => {
    const turmaSelecionada = turmas.find(t => t.id === turmaId);
    if (turmaSelecionada && turmaSelecionada.listaAlunos) {
      setAlunosFiltrados(turmaSelecionada.listaAlunos);
      form.setFieldValue('listaAlunos', []);
    } else {
      setAlunosFiltrados([]);
    }
  };

  const onFinish = (values) => {
    if (!values.listaAlunos || values.listaAlunos.length < 2 || values.listaAlunos.length > 5) {
      message.error('O projeto deve ter de 2 a 5 alunos.');
      return;
    }

    const projetos = JSON.parse(localStorage.getItem('projetos')) || { data: [] };

    const projetoAtualizado = {
      id,
      titulo: values.titulo,
      descricao: values.descricao,
      id_turma: values.id_turma,
      id_Professor: values.id_Professor,
      listaAlunos: values.listaAlunos
    };

    const novaLista = projetos.data.map(p => (p.id === id ? projetoAtualizado : p));

    const atualizado = {
      ...projetos,
      data: novaLista
    };

    localStorage.setItem('projetos', JSON.stringify(atualizado));
    message.success('Projeto atualizado com sucesso!');
    router.push('/projetos');
  };

  return (
    <div style={{ padding: 24, maxWidth: 700, margin: '0 auto' }}>
      <h2>Editar Projeto</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="titulo" label="Título" rules={[{ required: true }]}> 
          <Input />
        </Form.Item>

        <Form.Item name="descricao" label="Descrição" rules={[{ required: true }]}> 
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item name="id_turma" label="Turma" rules={[{ required: true }]}> 
          <Select placeholder="Selecione a turma" onChange={handleChangeTurma}>
            {turmas.map(t => (
              <Select.Option key={t.id} value={t.id}>
                {t.curso_id} - {t.ano}/{t.semestre}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="id_Professor" label="Professor" rules={[{ required: true }]}> 
          <Select placeholder="Selecione o professor">
            {professores.map(p => (
              <Select.Option key={p.id} value={p.id}>
                {p.nome}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="listaAlunos" label="Alunos (2 a 5)" rules={[{ required: true }]}> 
          <Select
            mode="multiple"
            placeholder="Selecione os alunos"
            options={alunosFiltrados.map(a => ({ label: a.nome, value: a.id }))}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">Salvar Alterações</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProjetoEditPage;
