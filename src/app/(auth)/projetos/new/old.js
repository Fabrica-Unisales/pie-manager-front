'use client';
import React, { useState } from 'react';
import { Form, Input, Select, Button, message } from 'antd';
import { useRouter } from 'next/navigation';

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
const alunosOptions = Object.entries(alunoNomes).map(([id, nome]) => ({ value: id, label: nome }));

const list = [];

const NovoProjetosPage = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const submitchange = (props) => {

    };

    const onFinish = (values) => {
        setLoading(true);
        const projetos = JSON.parse(localStorage.getItem('projetos')) || { data: [], nextId: 1 };
        const novoProjetos = {
            id: String(projetos.nextId),
            ...values,
        };
        const novaLista = [...projetos.data, novoProjetos];
        const novoObj = {
            data: novaLista,
            nextId: projetos.nextId + 1,
            length: novaLista.length
        };
        localStorage.setItem('projetos', JSON.stringify(novoObj));
        //message.success('Projeto adicionado com sucesso!');
        router.push('/projetos');
    };
//todo====================================================================================
    return (
        <div style={{ maxWidth: 500, margin: '0 auto', padding: 24 }}>
            <h2>Novo Projetos</h2>
            <Form layout="vertical" onFinish={onFinish} >
                <Form.Item label="Titulo" name="titulo" rules={[{ required: true, message: 'Informe o titulo' }]}>
                    <Input placeholder="Nome do Projeto" />
                </Form.Item>
                <Form.Item label="Descricao" name="descricao" rules={[{ required: false, message: 'Informe a descricao' }]}>
                    <Input placeholder="descricao do projeto" />
                </Form.Item>
                <Form.Item label="id_turma" name="id_turma" rules={[{ required: true, message: 'Informe o id da turma' }]}>
                    <Select options={turmaOptions}></Select>
                </Form.Item>
                <Form.Item label="id_Professor" name="id_professor" rules={[{ required: true, message: 'Informe o id do professor' }]}>
                    <Select options={professorOptions}></Select>
                </Form.Item>
                <Form.Item label="alunos" name="listaAlunos" rules={[{ required: false, message: 'Informe o nome de usuário' }]}>
                    <Select options={alunosOptions}></Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>Salvar</Button>
                    <Button onClick={() => router.push('/projetos')} style={{ marginLeft: 8 }}>Cancelar</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default NovoProjetosPage;