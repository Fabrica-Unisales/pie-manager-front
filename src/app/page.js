'use client';
import React, { useState, useEffect } from 'react';
import Card from '../components/Card/Card';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import UserMocks from '../mocks/UserMocks';

const Home = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('users')) {
      UserMocks.build();
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(
      (u) => (u.username === usuario) && u.password === senha
    );
    if (user) {
      localStorage.setItem('usuarioLogado', JSON.stringify(user));
      window.location.href = '/dashboard';
    } else {
      setErro('Usuário ou senha inválidos.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card style={{ width: 350 }}>
        <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Sistema de Gestão de Projetos integradores</h2>
        <form onSubmit={handleLogin}>
          <Input
            label="Usuário"
            value={usuario}
            onChange={e => setUsuario(e.target.value)}
            placeholder="Usuário"
            name="usuario"
          />
          <Input
            label="Senha"
            type="password"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            placeholder="Senha"
            name="senha"
          />
          {erro && <div style={{ color: 'var(--danger)', marginBottom: 12 }}>{erro}</div>}
          <Button type="submit" style={{ width: '100%' }}>Entrar</Button>
        </form>
        <div style={{ textAlign: 'center', marginTop: 12 }}>
          <a href="#" style={{ color: 'var(--primary)', fontSize: 14 }}>Esqueci a senha</a>
        </div>
      </Card>
    </div>
  );
};

export default Home;