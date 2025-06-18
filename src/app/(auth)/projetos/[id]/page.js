'use client';

import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import { useRouter, useParams } from 'next/navigation';

const turmaNomes = {
  '101': 'Medicina',
  '102': 'Tecnico',
  '103': 'Engenhero',
  '104': 'Marckting',
 };
 
 const professorNomes = {
  '201': 'Prof. Ana Paula',
  '202': 'Prof. Carlos Silva',
  '203': 'Prof. Beatriz Souza',
  '204': 'Prof. João Mendes'
 };

 const turmaOptions = Object.entries(turmaNomes).map(([id, nome]) => ({ value: id, label: nome }));
 const professorOptions = Object.entries(professorNomes).map(([id, nome]) => ({ value: id, label: nome }));

const EditarProjetosPage = () => {
  const [formulario] = Form.useForm();
  const router = useRouter();
  const params = useParams();
  const projetoId = params.id;

  const [alunosTodos, setAlunosTodos] = useState([]);
  const [alunosFiltrados, setAlunosFiltrados] = useState([]);

  useEffect(() => {
    const usuariosJSON = localStorage.getItem('usuarios');
    let usuarios = { data: [] };

    try {
      if (usuariosJSON) {
        usuarios = JSON.parse(usuariosJSON);
      }
    } catch (err) {
      console.error('Erro ao ler usuários:', err);
    }

    const alunos = usuarios.data.filter((u) => u.tipo === 'Aluno');
    setAlunosTodos(alunos);

    const todosProjetos = JSON.parse(localStorage.getItem('projetos')) || { data: [] };
    const projetoExistente = todosProjetos.data.find((proj) => proj.id === projetoId);

    if (projetoExistente) {
      const alunosProjeto = alunos.filter((a) => projetoExistente.listaAlunos.includes(a.id));
      setAlunosFiltrados(alunos);

      formulario.setFieldsValue({
        titulo: projetoExistente.titulo,
        descricao: projetoExistente.descricao,
        turma: projetoExistente.id_turma,
        professor: projetoExistente.id_professor,
        participantes: projetoExistente.listaAlunos
      });
    }
  }, [projetoId, formulario]);

  const salvarProjeto = (valores) => {
    if (!valores.participantes || valores.participantes.length < 2 || valores.participantes.length > 5) {
      message.warning('Escolha entre 2 a 5 alunos para o projeto.');
      return;
    }

    const todosProjetos = JSON.parse(localStorage.getItem('projetos')) || { data: [] };
    const atualizado = {
      id: projetoId,
      titulo: valores.titulo,
      descricao: valores.descricao,
      id_turma: valores.turma,
      id_professor: valores.professor,
      listaAlunos: valores.participantes
    };

    const novaLista = todosProjetos.data.map((p) =>
      p.id === projetoId ? atualizado : p
    );

    localStorage.setItem('projetos', JSON.stringify({ data: novaLista }));
    message.success('Projeto editado com sucesso!');
    router.push('/projetos');
  };

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: 24 }}>
      <h2>Atualizar Dados do Projeto</h2>
      <Form layout="vertical" form={formulario} onFinish={salvarProjeto}>
        <Form.Item label="Nome do Projeto" name="titulo" rules={[{ required: true }]}>
          <Input placeholder="Digite o título do projeto" />
        </Form.Item>

        <Form.Item label="Descrição" name="descricao" rules={[{ required: true }]}>
          <Input.TextArea rows={3} placeholder="Digite uma descrição resumida" />
        </Form.Item>

        <Form.Item label="Turma" name="turma" rules={[{ required: true }]}>
          <Select placeholder="Selecione uma turma" options={turmaOptions}></Select>
        </Form.Item>

        <Form.Item label="Professor Responsável" name="professor" rules={[{ required: true }]}>
          <Select placeholder="Escolha o professor orientador" options={professorOptions}></Select>
        </Form.Item>

        <Form.Item label="Alunos Participantes (2 a 5)" name="participantes" rules={[{ required: true }]}>
          <Select
            mode="multiple"
            placeholder="Selecione os alunos"
            options={(alunosFiltrados || []).map((a) => ({
              label: a.nome,
              value: a.id
            }))}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Salvar Projeto
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditarProjetosPage;