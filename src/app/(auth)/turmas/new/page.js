'use client';
import React, { useState } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import { useRouter } from 'next/navigation';

const cursosNomes = {
  'MAT101': 'Matemática Básica',
  'FIS102': 'Física Aplicada',
  'QUI103': 'Química Orgânica',
  'HIS104': 'História Contemporânea',
  'BIO105': 'Biologia Celular'
};

const professoresNomes = {
  'P001': 'Prof. João Silva',
  'P002': 'Prof. Ana Mendes',
  'P003': 'Prof. Carlos Souza',
  'P004': 'Prof. Beatriz Oliveira'
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

const NovaTurmaPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = (values) => {
    setLoading(true);
    const turmas = JSON.parse(localStorage.getItem('turmas')) || { data: [], nextId: 1, length: 0 };
    const novaTurma = {
      id: String(turmas.nextId || turmas.data.length + 1),
      ...values,
      listaAlunos: values.listaAlunos || []
    };
    const novaLista = [...turmas.data, novaTurma];
    const novoObj = {
      data: novaLista,
      nextId: (parseInt(novaTurma.id) + 1),
      length: novaLista.length
    };
    localStorage.setItem('turmas', JSON.stringify(novoObj));
    message.success('Turma adicionada com sucesso!');
    router.push('/turmas');
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 24 }}>
      <h2>Nova Turma</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="Curso" name="curso_id" rules={[{ required: true, message: 'Selecione o curso' }]}> 
          <Select options={cursosOptions} placeholder="Selecione o curso" />
        </Form.Item>
        <Form.Item label="Período" name="periodo_id" rules={[{ required: true, message: 'Informe o período' }]}> 
          <Input placeholder="Período" />
        </Form.Item>
        <Form.Item label="Ano" name="ano" rules={[{ required: true, message: 'Informe o ano' }]}> 
          <Input type="number" placeholder="Ano" />
        </Form.Item>
        <Form.Item label="Semestre" name="semestre" rules={[{ required: true, message: 'Informe o semestre' }]}> 
          <Input type="number" placeholder="Semestre" />
        </Form.Item>
        <Form.Item label="Professor" name="professor_id" rules={[{ required: true, message: 'Selecione o professor' }]}> 
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

export default NovaTurmaPage;
