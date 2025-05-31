'use client';
import React from 'react';
import { Form, Input, InputNumber, Button } from 'antd';

export default function ControleCursosTurmasForm({ params }) {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Form values:', values);
    };

    const exampleData = {
        id: '',
        nome: '',
        coordenador_id: '',
        listaTurmas: [
            {
                id: '',
                curso_id: '',
                periodo_id: '',
                ano: 2025,
                semestre: 1,
                professor: '',
                listaAlunos: [],
            },
        ],
    };

    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={exampleData}
            onFinish={onFinish}
            style={{ maxWidth: 600, margin: '0 auto', marginTop: 32 }}
        >
            <Form.Item
                label="ID"
                name="id"
                rules={[{ required: true, message: 'Por favor, insira o ID.' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Nome"
                name="nome"
                rules={[{ required: true, message: 'Por favor, insira o nome.' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Coordenador ID"
                name="coordenador_id"
                rules={[{ required: true, message: 'Por favor, insira o Coordenador ID.' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Turma - ID"
                name={['listaTurmas', 0, 'id']}
                rules={[{ required: true, message: 'Por favor, insira o ID da turma.' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Curso ID"
                name={['listaTurmas', 0, 'curso_id']}
                rules={[{ required: true, message: 'Por favor, insira o Curso ID.' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Período ID"
                name={['listaTurmas', 0, 'periodo_id']}
                rules={[{ required: true, message: 'Por favor, insira o Período ID.' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Ano"
                name={['listaTurmas', 0, 'ano']}
                rules={[{ required: true, message: 'Por favor, insira o Ano.' }]}
            >
                <InputNumber min={2000} max={2100} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
                label="Semestre"
                name={['listaTurmas', 0, 'semestre']}
                rules={[{ required: true, message: 'Por favor, insira o Semestre.' }]}
            >
                <InputNumber min={1} max={2} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
                label="Professor"
                name={['listaTurmas', 0, 'professor']}
                rules={[{ required: true, message: 'Por favor, insira o nome do Professor.' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Lista de Alunos (IDs separados por vírgula)"
                name={['listaTurmas', 0, 'listaAlunos']}
                rules={[{ required: true, message: 'Por favor, insira os IDs dos Alunos.' }]}
            >
                <Input placeholder="Ex: aluno1, aluno2, aluno3" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" block>
                    Salvar
                </Button>
            </Form.Item>

            <Button
                style={{ marginTop: 8 }}
                block
                onClick={() => window.location.href = '/home'}
            >
                Cancelar
            </Button>
        </Form>
    );
}

