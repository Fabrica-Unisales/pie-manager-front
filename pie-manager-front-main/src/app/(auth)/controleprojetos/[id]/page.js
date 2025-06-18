'use client';

import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import { useRouter, useParams } from 'next/navigation';

const EditarProjeto = () => {
  const [formulario] = Form.useForm();
  const router = useRouter();
  const params = useParams();
  const projetoId = params.id;

  const [turmasDisponiveis, setTurmasDisponiveis] = useState([]);
  const [docentes, setDocentes] = useState([]);
  const [alunosTodos, setAlunosTodos] = useState([]);
  const [alunosFiltrados, setAlunosFiltrados] = useState([]);

  useEffect(() => {
    const cursosArmazenados = JSON.parse(localStorage.getItem('cursos')) || [];

   const usuariosJSON = localStorage.getItem('users');
let usuarios = { data: [] };

try {
  if (usuariosJSON) {
    const parsed = JSON.parse(usuariosJSON);

    if (Array.isArray(parsed)) {
      // Caso o conteúdo seja um array direto
      usuarios.data = parsed;
    } else if (parsed && Array.isArray(parsed.data)) {
      // Caso esteja no formato esperado
      usuarios = parsed;
    } else {
      console.warn('Formato inesperado para os dados de usuários:', parsed);
    }
  }
} catch (err) {
  console.error('Erro ao processar usuários:', err);
}


    const turmasExtraidas = cursosArmazenados.flatMap((curso) => curso.listaTurmas || []);
    setTurmasDisponiveis(turmasExtraidas);
    console.log('Usuários carregados:', usuarios);

    const usuariosValidos = Array.isArray(usuarios?.data) ? usuarios.data : [];

     const profs = usuariosValidos.filter(u => u.tipo === 'Professor');
    setDocentes(profs);

     const alunos = usuariosValidos.filter(u => u.tipo === 'Aluno');
    setAlunosTodos(alunos);

    const todosProjetos = JSON.parse(localStorage.getItem('projetos')) || { data: [] };
    const projetoExistente = todosProjetos.data.find((proj) => proj.id === projetoId);

    if (projetoExistente) {
      const alunosProjeto = alunos.filter((a) => projetoExistente.listaAlunos.includes(a.id));
      setAlunosFiltrados(alunosProjeto);

      formulario.setFieldsValue({
        titulo: projetoExistente.titulo,
        descricao: projetoExistente.descricao,
        turma: projetoExistente.id_turma,
        professor: projetoExistente.id_Professor,
        participantes: projetoExistente.listaAlunos
      });
    }
  }, [projetoId, formulario]);

  const atualizarAlunosDaTurma = (turmaSelecionadaId) => {
    const turma = turmasDisponiveis.find((t) => t.id === turmaSelecionadaId);
    if (turma && turma.listaAlunos) {
      setAlunosFiltrados(turma.listaAlunos);
      formulario.setFieldValue('participantes', []);
    } else {
      setAlunosFiltrados([]);
    }
  };

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
      id_Professor: valores.professor,
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
          <Select placeholder="Selecione uma turma" onChange={atualizarAlunosDaTurma}>
            {turmasDisponiveis.map((turma) => (
              <Select.Option key={turma.id} value={turma.id}>
                {turma.curso_id} - {turma.ano}/{turma.semestre}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Professor Responsável" name="professor" rules={[{ required: true }]}>
          <Select placeholder="Escolha o professor orientador">
            {docentes.map((docente) => (
              <Select.Option key={docente.id} value={docente.id}>
                {docente.nome}
              </Select.Option>
            ))}
          </Select>
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

export default EditarProjeto;
