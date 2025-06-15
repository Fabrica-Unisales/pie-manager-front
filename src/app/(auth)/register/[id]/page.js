'use client';
import React, { useEffect } from 'react';
import { Form, Input, Button, Select, message } from 'antd';

const { Option } = Select;

export default function EditarUsuarioForm({ params }) {
    const [form] = Form.useForm();

    useEffect(() => {
        
        const users = JSON.parse(localStorage.getItem('users')) || { data: [] };
        const usuario = (users.data || []).find(u => String(u.id) === String(params.id));
        if (usuario) {
            form.setFieldsValue(usuario);
        } else {
            message.error('Usuário não encontrado!');
        }
    }, [form, params.id]);

    const onFinish = (values) => {
        const users = JSON.parse(localStorage.getItem('users')) || { data: [] };
        const updated = users.data.map(u =>
            String(u.id) === String(params.id) ? { ...u, ...values } : u
        );
        localStorage.setItem('users', JSON.stringify({ ...users, data: updated }));
        message.success('Usuário atualizado com sucesso!');
        window.location.href = '/register';
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            style={{ maxWidth: 400, margin: '0 auto', marginTop: 32 }}
        >
            <Form.Item
                label="Nome"
                name="nome"
                rules={[{ required: true, message: 'Por favor, insira o nome do usuário.' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="E-mail"
                name="email"
                rules={[
                    { required: true, message: 'Por favor, insira o e-mail do usuário.' },
                    { type: 'email', message: 'O e-mail não é válido.' }
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Senha"
                name="senha_hash"
                rules={[{ required: true, message: 'Por favor, insira a senha.' }]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                label="Matrícula"
                name="matricula"
                rules={[{ required: true, message: 'Por favor, insira a matrícula.' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Usuário"
                name="usuario"
                rules={[{ required: true, message: 'Por favor, insira o nome de usuário.' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Tipo"
                name="tipo"
                rules={[{ required: true, message: 'Por favor, selecione o tipo de usuário.' }]}
            >
                <Select placeholder="Selecione o tipo">
                    <Option value="Aluno">Aluno</Option>
                    <Option value="Professor">Professor</Option>
                    <Option value="Coordenador">Coordenador</Option>
                    <Option value="AvaliadorExterno">Avaliador Externo</Option>
                </Select>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" block>
                    Salvar
                </Button>
            </Form.Item>
            <Button
                style={{ marginTop: 8 }}
                block
                onClick={() => window.location.href = '/register'}
            >
                Cancelar
            </Button>
        </Form>
    );
}