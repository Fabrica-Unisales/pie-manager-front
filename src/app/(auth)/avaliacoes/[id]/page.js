'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Form, Input, Button, Select, message } from 'antd';

const coordenadoresNomes = {
  '301': 'Prof. Mariana Costa',
  '302': 'Prof. Fernando Lima',
  '303': 'Prof. Renata Oliveira'
};

const cursosNomes = {
  '401': 'Ciência da Computação',
  '402': 'Engenharia de Software',
  '403': 'Sistemas de Informação'
};

const cursosOptions = Object.entries(cursosNomes).map(([id, nome]) => ({ value: id, label: nome }));
const coordenadoresOptions = Object.entries(coordenadoresNomes).map(([id, nome]) => ({ value: id, label: nome }));

const EditarCursoPage = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [curso, setCurso] = useState(null);

  useEffect(() => {
    const cursos = JSON.parse(localStorage.getItem('cursos')) || { data: [] };
    const found = cursos.data.find(c => c.id === id);
    if (found) {
      setCurso(found);
      form.setFieldsValue(found);
    } else {
      message.error('Curso não encontrado');
      router.push('/cursos');
    }
  }, [id, form, router]);

  const onFinish = (values) => {
    setLoading(true);
    const cursos = JSON.parse(localStorage.getItem('cursos')) || { data: [] };
    const novaLista = cursos.data.map(c => c.id === id ? { ...c, ...values, listaTurmas: values.listaTurmas.split(',').map(turmaId => ({ id: turmaId.trim() })) } : c);
    const novoObj = { ...cursos, data: novaLista };
    localStorage.setItem('cursos', JSON.stringify(novoObj));
    message.success('Curso atualizado com sucesso!');
    router.push('/cursos');
  };

  if (!curso) return null;

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 24 }}>
      <h2>Editar Curso</h2>
      <Form layout="vertical" form={form} onFinish={onFinish} initialValues={curso}>
        <Form.Item label="Nome do Curso" name="nome" rules={[{ required: true, message: 'Selecione o curso' }]}> 
          <Select options={cursosOptions} placeholder="Selecione o curso" />
        </Form.Item>
        <Form.Item label="Coordenador" name="coordenador_id" rules={[{ required: true, message: 'Selecione o coordenador' }]}> 
          <Select options={coordenadoresOptions} placeholder="Selecione o coordenador" />
        </Form.Item>
        <Form.Item label="Turmas (IDs separados por vírgula)" name="listaTurmas" rules={[{ required: true, message: 'Informe as turmas' }]}> 
          <Input placeholder="Exemplo: 501, 502, 503" />
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
