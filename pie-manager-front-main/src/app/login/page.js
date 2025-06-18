'use client';
import React from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd'; // 'message' importado aqui
import 'antd/dist/reset.css';
import {buildMocks} from '@/mocks/mocksFactory';

const LoginPage = () => {
    const onFinish = (values) => {
        const users = JSON.parse(localStorage.getItem('users'));

        const user = users.find(user => user.username === values.username && user.password === values.password);
        if (user) {
            console.log('Login successful:', values);
            localStorage.setItem('loggedUser', JSON.stringify(user));
            window.location.href = '/home';
        } else {
            console.log('Login failed:', values);
            alert('Usuário ou senha inválidos'); 
        }
    };
     const loadMyMocks = () => {
        buildMocks();
        
        message.success('Mocks carregados com sucesso!');
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Falha:', errorInfo);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Form
                name="login"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                style={{ width: 300 }}
            >
                <h2 style={{ textAlign: 'center' }}>Login</h2>
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Por favor, insira seu nome de usuário!' }]}
                >
                    <Input placeholder="Usuário" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
                >
                    <Input.Password placeholder="Senha" />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked">
                    <Checkbox>Lembrar-me</Checkbox>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        Entrar
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button type="link" style={{ width: '100%' }} onClick={loadMyMocks}>
                        Carregar Mocks
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LoginPage;