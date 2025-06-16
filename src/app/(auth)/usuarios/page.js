'use client';
import React, { useEffect, useState } from 'react';
import { Button, Table, Space } from 'antd';
import UsuariosMocks from '@/mocks/usuariosMocks';

const UsuariosPage = () => {
  const [usuarios, setUsuarios] = useState([]);

useEffect(() => {
  const usuarios = JSON.parse(localStorage.getItem('usuarios'));
  if (!usuarios || !usuarios.data || usuarios.data.length === 0) {
    UsuariosMocks.build();
  }
  const dados = JSON.parse(localStorage.getItem('usuarios'));
  setUsuarios(dados.data || []);
}, []);
  const handleAddUser = () => {
    window.location.href = '/usuarios/new';
  };

  const handleDelete = (id) => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || { data: [] };
    const novaLista = usuarios.data.filter(user => user.id !== id);
    const novoObj = { ...usuarios, data: novaLista, length: novaLista.length };
    localStorage.setItem('usuarios', JSON.stringify(novoObj));
    setUsuarios(novaLista);
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Nome', dataIndex: 'nome', key: 'nome' },
    { title: 'Matrícula', dataIndex: 'matricula', key: 'matricula' },
    { title: 'Usuário', dataIndex: 'usuario', key: 'usuario' },
    { title: 'E-mail', dataIndex: 'email', key: 'email' },
    { title: 'Tipo', dataIndex: 'tipo', key: 'tipo' },
    {
      title: 'Ações',
      key: 'action',
      render: (_, record) => (
        <Space>
          <a href={`/usuarios/${record.id}`}>Editar</a>
          <a onClick={() => handleDelete(record.id)} style={{ color: 'red' }}>Excluir</a>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 16, textAlign: 'right' }}>
        <Button type="primary" onClick={handleAddUser}>Adicionar Usuário</Button>
      </div>
      <Table columns={columns} dataSource={usuarios} rowKey="id" />
    </div>
  );
};

export default UsuariosPage;