'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Form, Input, Button, Select, message } from 'antd';

const professoresNomes = {
  'P001': 'Prof. João Silva',
  'P002': 'Prof. Ana Mendes',
  'P003': 'Prof. Carlos Souza',
  'P004': 'Prof. Beatriz Oliveira'
};

const cursosNomes = {
  'MAT101': 'Matemática Básica',
  'FIS102': 'Física Aplicada',
  'QUI103': 'Química Orgânica',
  'HIS104': 'História Contemporânea',
  'BIO105': 'Biologia Celular'
};

const alunosNomes = {
  'A001': 'Carlos Almeida',
  'A002': 'Fernanda Souza',
  'A003': 'Lucas Santos',
  'A004': 'Mariana Oliveira',
  'A005': 'Roberto Lima',
  'A006': 'Juliana Mendes',
  'A007': 'Felipe Costa',
  'A008': 'Camila Rocha',
  'A009': 'Ana Beatriz',
  'A010': 'Ricardo Moreira',
  'A011': 'Eduardo Pereira',
  'A012': 'Patrícia Vieira',
  'A013': 'Mateus Freitas'
};

const cursosOptions = Object.entries(cursosNomes).map(([id, nome]) => ({ value: id, label: nome }));
const professoresOptions = Object.entries(professoresNomes).map(([id, nome]) => ({ value: id, label: nome }));
const alunosOptions = Object.entries(alunosNomes).map(([id, nome]) => ({ value: id, label: nome }));

const EditarTurmaPage = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [turma, setTurma] = useState(null);

  useEffect(() => {
    const turmas = JSON.parse(localStorage.getItem('turmas')) || { data: [], nextId: 1 };
    const found = turmas.data.find(t => String(t.id) === String(id));

    if (found) {
      setTurma(found);
      form.setFieldsValue(found);
    } else {
      message.error('Turma não encontrada');
      router.push('/turmas');
    }
  }, [id, form, router]);

  const onFinish = (values) => {
    setLoading(true);
    const turmas = JSON.parse(localStorage.getItem('turmas')) || { data: [], nextId: 1 };
    const novaLista = turmas.data.map(t => String(t.id) === String(id) ? { ...t, ...values } : t);

    localStorage.setItem('turmas', JSON.stringify({ data: novaLista, nextId: turmas.nextId }));
    message.success('Turma atualizada com sucesso!');
    router.push('/turmas');
  };

  if (!turma) return <p>Carregando turma...</p>;

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 24 }}>
      <h2>Editar Turma</h2>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item label="ID da Turma">
          <Input value={turma.id} disabled /> {/* Exibe o ID e impede edição */}
        </Form.Item>
        <Form.Item label="Curso" name="curso_id">
          <Select options={cursosOptions} placeholder="Selecione o curso" />
        </Form.Item>
        <Form.Item label="Período" name="periodo_id">
          <Input placeholder="Informe o período" />
        </Form.Item>
        <Form.Item label="Ano" name="ano">
          <Input type="number" placeholder="Informe o ano" />
        </Form.Item>
        <Form.Item label="Semestre" name="semestre">
          <Input type="number" placeholder="Informe o semestre" />
        </Form.Item>
        <Form.Item label="Professor" name="professor_id">
          <Select options={professoresOptions} placeholder="Selecione o professor" />
        </Form.Item>
        <Form.Item label="Alunos" name="listaAlunos">
          <Select mode="multiple" options={alunosOptions} placeholder="Selecione os alunos" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>Salvar</Button>
          <Button style={{ marginLeft: 8 }} onClick={() => router.push('/turmas')}>Cancelar</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditarTurmaPage;
