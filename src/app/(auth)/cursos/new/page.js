'use client';
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import { useRouter } from 'next/navigation';

const coordenadoresNomes = {
  '301': 'Prof. Mariana Costa',
  '302': 'Prof. Fernando Lima',
  '303': 'Prof. Renata Oliveira'
};

const turmasNomes = {
  '501': 'Turma A',
  '502': 'Turma B',
  '503': 'Turma C'
};

const coordenadoresOptions = Object.entries(coordenadoresNomes).map(([id, nome]) => ({ value: id, label: `${id} - ${nome}` }));

const NovoCursoPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [turmasOptions, setTurmasOptions] = useState([]);

  useEffect(() => {
    setTurmasOptions(Object.entries(turmasNomes).map(([id, nome]) => ({ value: id, label: `${id} - ${nome}` })));
  }, []);

  const onFinish = (values) => {
    setLoading(true);
    const cursos = JSON.parse(localStorage.getItem('cursos')) || { data: [], nextId: 1 };

    const novoCurso = {
      id: cursos.nextId, // Agora ID será corretamente atribuído e auto-incrementado
      nome: values.nome,
      coordenador_id: values.coordenador_id,
      listaTurmas: values.listaTurmas
    };

    const novaLista = [...cursos.data, novoCurso];

    const novoObj = {
      data: novaLista,
      nextId: cursos.nextId + 1 // Auto-incremento para evitar IDs duplicados
    };

    localStorage.setItem('cursos', JSON.stringify(novoObj));
    message.success('Curso adicionado com sucesso!');
    router.push('/cursos');
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 24 }}>
      <h2>Novo Curso</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="Nome do Curso" name="nome" rules={[{ required: true, message: 'Digite o nome do curso' }]}> 
          <Input placeholder="Digite o nome do curso" />
        </Form.Item>
        <Form.Item label="Coordenador" name="coordenador_id" rules={[{ required: true, message: 'Selecione o coordenador' }]}> 
          <Select options={coordenadoresOptions} placeholder="Selecione o coordenador" />
        </Form.Item>
        <Form.Item label="Turmas" name="listaTurmas" rules={[{ required: true, message: 'Informe as turmas' }]}> 
          <Select mode="multiple" options={turmasOptions} placeholder="Selecione as turmas" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>Salvar</Button>
          <Button style={{ marginLeft: 8 }} onClick={() => router.push('/cursos')}>Cancelar</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NovoCursoPage;
