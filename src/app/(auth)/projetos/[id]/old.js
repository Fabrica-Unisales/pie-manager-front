'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Form, Input, Select, Button, message } from 'antd';
/*
const turmaOptions = JSON.parse(localStorage.getItem('turmas')) || { data: [] };

const option = JSON.parse(localStorage.getItem('usuarios')) || { data: [] };

const professor = array.forEach(option => {
 if (option.tipo == 'Professor') {
  professor.push(option);
 }
});;

const professorOptions = professor;
*/

const alunoNomes = {
  '1': 'João Silva',
  '6': 'Maria',
  '7': 'Ana Paula',
  '10': 'Carlos Silva',
  '23': 'Beatriz Souza',
  '24': 'João Mendes'
 };

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

const alunoNomes = {
 '7': 'Ana Paula',
 '10': 'Carlos Silva',
 '23': 'Beatriz Souza',
 '24': 'João Mendes'
};

const turmaOptions = Object.entries(turmaNomes).map(([id, nome]) => ({ value: id, label: nome }));
const professorOptions = Object.entries(professorNomes).map(([id, nome]) => ({ value: id, label: nome }));
const alunoOptions = Object.entries(alunoNomes).map(([id, nome]) => ({ value: id, label: nome }));

const EditarProjetosPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [projeto, setProjeto] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('projetos')) || { data: [] };
    const encontrado = data.data.find((p) => p.id === id);
    if (!encontrado) {
      message.error('Projeto não encontrado');
      router.push('/projetos');
    } else {
      setProjeto(encontrado);
      form.setFieldsValue(encontrado);
    }
  }, [id, form, router]);

  const onFinish = (values) => {
    setLoading(true);
    const projetos = JSON.parse(localStorage.getItem('projetos')) || { data: [] };
    const novaLista = projetos.data.map((p) => (p.id === id ? { ...p, ...values } : p));
    const novoObj = { ...projetos, data: novaLista };
    localStorage.setItem('projetos', JSON.stringify(novoObj));
    //message.success('Projeto atualizado com sucesso!');
    router.push('/projetos');
  };
//todo=============================================================================================
  if (!projeto) return null;
  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 24 }}>
      <h2>Editar Usuário</h2>
      <Form layout="vertical" form={form} onFinish={onFinish} initialValues={projeto}>
        <Form.Item label="Titulo" name="titulo" rules={[{ required: true, message: 'Informe o titulo' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Descricao" name="descricao" rules={[{ required: false, message: 'Informe a descricao' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="id_turma" name="id_turma" rules={[{ required: false, message: 'Informe o id da turma' }]}>
        <Select options={turmaOptions}></Select>
        </Form.Item>
        <Form.Item label="id_Professor" name="id_Professor" rules={[{ required: false, message: 'Informe o id do professor' }]}>
        <Select options={professorOptions}></Select>
        </Form.Item>
        <Form.Item label="Usuário" name="usuario" rules={[{ required: false, message: 'Informe o nome de usuário' }]}>
          <Input placeholder="ex: joao silva" />
        </Form.Item>
        
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>Salvar</Button>
          <Button onClick={() => router.push('/projetos')} style={{ marginLeft: 8 }}>Cancelar</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditarProjetosPage;