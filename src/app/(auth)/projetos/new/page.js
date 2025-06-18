'use client';

import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import { useRouter } from 'next/navigation';

const CriarProjeto = () => {
  const [formulario] = Form.useForm();
  const router = useRouter();

  const [alunosSistema, setAlunosSistema] = useState([]);
  const [alunosTurma, setAlunosTurma] = useState([]);

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

  useEffect(() => {
    const cursosArmazenados = JSON.parse(localStorage.getItem('cursos')) || [];
    const usuariosRaw = localStorage.getItem('usuarios');
    let usuarios = { data: [] };

    try {
      if (usuariosRaw) {
        usuarios = JSON.parse(usuariosRaw);
      }
    } catch (erro) {
      console.warn('Erro ao processar usuários:', erro);
    }

    const alunos = usuarios.data.filter(u => u.tipo === 'Aluno');
    setAlunosSistema(alunos);
    setAlunosTurma(alunos)
  }, []);

  const registrarProjeto = (dados) => {
    if (!dados.participantes || dados.participantes.length < 2 || dados.participantes.length > 5) {
      message.error('Selecione entre 2 e 5 alunos.');
      return;
    }

    const projetosExistentes = JSON.parse(localStorage.getItem('projetos')) || { data: [], nextId: 1};

    const projetoNovo = {
      id: String(projetosExistentes.nextId),
      titulo: dados.titulo,
      descricao: dados.descricao,
      id_turma: dados.turma,
      id_professor: dados.professor,
      listaAlunos: dados.participantes
    };

    const novaLista = [...projetosExistentes.data, projetoNovo];

    const atualizado = {
      data: novaLista,
      nextId: projetosExistentes.nextId + 1,
      length: novaLista.length
    };

    localStorage.setItem('projetos', JSON.stringify(atualizado));
    message.success('Projeto cadastrado com sucesso!');
    router.push('/projetos');
  };

  return (
    <div style={{ padding: 24, maxWidth: 700, margin: '0 auto' }}>
      <h2>Novo Projeto</h2>
      <Form layout="vertical" form={formulario} onFinish={registrarProjeto}>
        <Form.Item label="Nome do Projeto" name="titulo" rules={[{ required: true }]}>
          <Input placeholder="Título do projeto" />
        </Form.Item>

        <Form.Item label="Descrição" name="descricao" rules={[{ required: true }]}>
          <Input.TextArea rows={3} placeholder="Breve descrição" />
        </Form.Item>

        <Form.Item label="Turma" name="turma" rules={[{ required: true }]}>
          <Select placeholder="Selecione a turma" options={turmaOptions}></Select>
        </Form.Item>

        <Form.Item label="Professor Orientador" name="professor" rules={[{ required: true }]}>
          <Select placeholder="Selecione o professor" options={professorOptions}></Select>
        </Form.Item>

        <Form.Item label="Alunos Participantes (2 a 5)" name="participantes" rules={[{ required: true }]}>
          <Select
            mode="multiple"
            placeholder="Selecione os alunos"
            options={alunosTurma.map(a => ({ label: a.nome, value: a.id }))}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">Cadastrar</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CriarProjeto;