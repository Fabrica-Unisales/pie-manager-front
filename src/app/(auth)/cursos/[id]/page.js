'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Form, Input, Button, Select, message } from 'antd';

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
const turmasOptions = Object.entries(turmasNomes).map(([id, nome]) => ({ value: id, label: `${id} - ${nome}` }));

const EditarCursoPage = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params; // Obtém corretamente o ID da URL

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [curso, setCurso] = useState(null);

  useEffect(() => {
    if (!id) {
      message.error('ID inválido, redirecionando...');
      router.push('/cursos');
      return;
    }

    const cursos = JSON.parse(localStorage.getItem('cursos')) || { data: [] };
    const found = cursos.data.find(c => String(c.id) === String(id)); 

    if (found) {
      setCurso({
        ...found,
        listaTurmas: found.listaTurmas || []
      });
      form.setFieldsValue(found);
    } else {
      message.error('Curso não encontrado, redirecionando...');
      router.push('/cursos');
    }
  }, [id, form, router]);

  const onFinish = (values) => {
    setLoading(true);
    const cursos = JSON.parse(localStorage.getItem('cursos')) || { data: [], nextId: 1 };
    const novaLista = cursos.data.map(c => String(c.id) === String(id) ? { ...c, ...values } : c);

    localStorage.setItem('cursos', JSON.stringify({ data: novaLista, nextId: cursos.nextId }));
    message.success('Curso atualizado com sucesso!');
    router.push('/cursos');
  };

  if (!curso) return <p>Carregando curso...</p>;

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 24 }}>
      <h2>Editar Curso</h2>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item label="ID do Curso">
          <Input value={curso.id} disabled />
        </Form.Item>
        <Form.Item label="Nome do Curso" name="nome">
          <Input />
        </Form.Item>
        <Form.Item label="Coordenador" name="coordenador_id">
          <Select options={coordenadoresOptions} placeholder="Selecione o coordenador" />
        </Form.Item>
        <Form.Item label="Turmas" name="listaTurmas">
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

export default EditarCursoPage;
