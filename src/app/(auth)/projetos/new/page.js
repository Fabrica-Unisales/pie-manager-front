'use client';

import React from 'react';
import { Form, Input, Button, message } from 'antd';

export default function NovoProjetoForm() {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        const alunosArray = values.lista_alunos
            .split(',')
            .map(a => a.trim())
            .filter(a => a);

        if (alunosArray.length < 2 || alunosArray.length > 5) {
            message.error('O projeto deve ter entre 2 e 5 alunos.');
            return;
        }

        const projetosRaw = localStorage.getItem('projetos');
        const projetos = projetosRaw ? JSON.parse(projetosRaw) : { data: [], nextId: 1 };

        const id = projetos.nextId || (projetos.data.length + 1);

        const newProjeto = {
            id: id.toString(),
            titulo: values.titulo,
            descricao: values.descricao,
            id_turma: values.id_turma,
            id_professor: values.id_professor,
            lista_alunos: alunosArray,
        };

        const updatedData = [...projetos.data, newProjeto];
        const updatedProjetos = {
            data: updatedData,
            nextId: id + 1,
            length: updatedData.length,
        };

        localStorage.setItem('projetos', JSON.stringify(updatedProjetos));
        message.success('Projeto cadastrado com sucesso!');

        window.location.href = '/projetos';
    };

    const onCancel = () => {
        window.location.href = '/projetos';
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            style={{ maxWidth: 500, margin: '0 auto', marginTop: 32 }}
        >
            <Form.Item
                label="Título do Projeto"
                name="titulo"
                rules={[{ required: true, message: 'Por favor, insira o título do projeto.' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Descrição"
                name="descricao"
                rules={[{ required: true, message: 'Por favor, insira a descrição do projeto.' }]}
            >
                <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item
                label="Turma"
                name="id_turma"
                rules={[{ required: true, message: 'Por favor, insira a turma.' }]}
            >
                <Input placeholder="Ex.: TDS01" />
            </Form.Item>

            <Form.Item
                label="Professor Responsável (ID ou Nome)"
                name="id_professor"
                rules={[{ required: true, message: 'Por favor, insira o professor responsável.' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Alunos Participantes (mínimo 2, máximo 5 — separados por vírgula)"
                name="lista_alunos"
                rules={[{ required: true, message: 'Por favor, insira os alunos participantes.' }]}
            >
                <Input placeholder="Ex.: aluno1, aluno2, aluno3" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" block>
                    Cadastrar Projeto
                </Button>
            </Form.Item>

            <Button
                style={{ marginTop: 8 }}
                block
                onClick={onCancel}
            >
                Cancelar
            </Button>
        </Form>
    );
}
