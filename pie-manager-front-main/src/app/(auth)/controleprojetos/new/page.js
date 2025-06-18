'use client';

import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import { useRouter } from 'next/navigation';

const CriarProjeto = () => {
  const [formulario] = Form.useForm();
  const router = useRouter();

  const [listaTurmas, setListaTurmas] = useState([]);
  const [docentes, setDocentes] = useState([]);
  const [alunosSistema, setAlunosSistema] = useState([]);
  const [alunosTurma, setAlunosTurma] = useState([]);

  useEffect(() => {
    const cursosArmazenados = JSON.parse(localStorage.getItem('cursos')) || [];
    const usuariosRaw = localStorage.getItem('users');
    let usuarios = { data: [] };

    try {
      if (usuariosRaw) {
        usuarios = JSON.parse(usuariosRaw);
      }
    } catch (erro) {
      console.warn('Erro ao processar usuários:', erro);
    }

    const turmasExtraidas = cursosArmazenados.flatMap(c => c.listaTurmas || []);
    setListaTurmas(turmasExtraidas);

    const profs = usuarios.data.filter(u => u.tipo === 'Professor');
    setDocentes(profs);

    const alunos = usuarios.data.filter(u => u.tipo === 'Aluno');
    setAlunosSistema(alunos);
  }, []);

  const aoSelecionarTurma = (turmaId) => {
    const turma = listaTurmas.find(t => t.id === turmaId);
    if (turma && turma.listaAlunos) {
      setAlunosTurma(turma.listaAlunos);
      formulario.setFieldValue('participantes', []);
    } else {
      setAlunosTurma([]);
    }
  };

  const registrarProjeto = (dados) => {
    if (!dados.participantes || dados.participantes.length < 2 || dados.participantes.length > 5) {
      message.error('Selecione entre 2 e 5 alunos.');
      return;
    }

    const projetosExistentes = JSON.parse(localStorage.getItem('projetos')) || { data: [], nextId: 1, length: 0 };

    const projetoNovo = {
      id: projetosExistentes.nextId.toString(),
      titulo: dados.titulo,
      descricao: dados.descricao,
      id_turma: dados.turma,
      id_Professor: dados.professor,
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
         <Select placeholder="Selecione uma turma" onChange={atualizarAlunosDaTurma}> 
      {turmasDisponiveis
      .filter(turma => turma.ativo) 
        .map((turma) => (
        <Select.Option key={turma.id} value={turma.id}>
          {turma.curso_id} - {turma.ano}/{turma.semestre}
        </Select.Option>
      ))}
          </Select>
        </Form.Item>

        <Form.Item label="Professor Orientador" name="professor" rules={[{ required: true }]}>
          <Select placeholder="Selecione o professor">
            {docentes.map(p => (
              <Select.Option key={p.id} value={p.id}>
                {p.nome}
              </Select.Option>
            ))}
          </Select>
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