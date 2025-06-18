'use client';
import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import 'antd/dist/reset.css';
import { buildMocks } from '@/mocks/mocksFactory';

const LoginPage = () => {
  const onFinish = (values) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(
      (user) => user.username === values.username && user.password === values.password
    );
    if (user) {
      console.log('Login successful:', values);

      // Salva o usuário logado no localStorage
      localStorage.setItem('loggedUser', JSON.stringify(user));

      // Redireciona para home
      window.location.href = '/home';
    } else {
      console.log('Login failed:', values);
      alert('Nome de usuário ou senha inválidos!');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const loadMyMocks = () => {
    buildMocks();
    alert('Mocks carregados!');
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
          rules={[{ required: true, message: 'Por favor, insira seu nome de usuario!' }]}
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Log in
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="link" style={{ width: '100%' }} onClick={loadMyMocks}>
            Load Mocks
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
