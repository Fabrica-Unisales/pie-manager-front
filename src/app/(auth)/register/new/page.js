'use client';
import React from 'react';
import { Form, Input, Button, Select } from 'antd';

const { Option } = Select;

export default function NovoUsuarioForm() {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        const usersRaw = localStorage.getItem('users');
        const users = usersRaw ? JSON.parse(usersRaw) : { data: [], nextId: 1 };

        const errors = [];

        const emailJaExiste = users.data.some(u => u.email === values.email);
        const matriculaJaExiste = users.data.some(u => u.matricula === values.matricula);
        const usuarioJaExiste = users.data.some(u => u.usuario === values.usuario);

        if (emailJaExiste) {
            errors.push({
                name: 'email',
                errors: ['Este e-mail já está em uso.'],
            });
        }

        if (matriculaJaExiste) {
            errors.push({
                name: 'matricula',
                errors: ['Esta matrícula já está em uso.'],
            });
        }

        if (usuarioJaExiste) {
            errors.push({
                name: 'usuario',
                errors: ['Este nome de usuário já está em uso.'],
            });
        }

        if (errors.length > 0) {
            form.setFields(errors);
            return;
        }

        const id = users.nextId || (users.data.length + 1);
        const newUser = { ...values, id };
        const updatedData = [...users.data, newUser];
        const updatedUsers = {
            data: updatedData,
            nextId: id + 1,
            length: updatedData.length,
        };

        localStorage.setItem('users', JSON.stringify(updatedUsers));
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
                <Button
                    type="primary"
                    htmlType="submit"
                    block
                >
                    Cadastrar
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
