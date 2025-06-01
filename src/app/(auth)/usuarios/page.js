'use client';

import React, { useEffect, useState } from 'react';
import { Button, Table, Space, Popconfirm, message } from 'antd';
import { useRouter } from 'next/navigation';
import UsersMocks from '@/mocks/UsuariosMocks';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const router = useRouter();

  const carregarUsuarios = () => {
    let dados = JSON.parse(localStorage.getItem('users'));

    if (!dados || !dados.data || dados.data.length === 0) {
      UsersMocks.build();
      dados = JSON.parse(localStorage.getItem('users'));
    }

    setUsuarios(dados.data || []);
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const NovoUsuario = () => {
    router.push('/usuarios/new');
  };

  const excluirUsuario = (id) => {
    const dados = JSON.parse(localStorage.getItem('users')) || { data: [] };
    const novaLista = dados.data.filter((user) => user.id !== id);

    const atualizado = {
      ...dados,
      data: novaLista,
      length: novaLista.length,
    };

    localStorage.setItem('users', JSON.stringify(atualizado));
    setUsuarios(novaLista);
    message.success('Usuário excluído com sucesso!');
  };

  const colunasTabela = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Nome', dataIndex: 'nome', key: 'nome' },
    { title: 'E-mail', dataIndex: 'email', key: 'email' },
    { title: 'Matrícula', dataIndex: 'matricula', key: 'matricula' },
    {
      title: 'Ações',
      key: 'action',
      render: (_, usuario) => (
        <Space>
          <Button
            type="primary"
            style={{ backgroundColor: 'green', borderColor: 'green' }}
            onClick={() => router.push(`/usuarios/${usuario.id}`)}
          >
            Editar Usuário
          </Button>

          <Popconfirm
            title="Tem certeza que deseja excluir este usuário?"
            onConfirm={() => excluirUsuario(usuario.id)}
            okText="Sim"
            cancelText="Não"
          >
            <Button danger>
              Excluir Usuário
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 16, textAlign: 'right' }}>
        <Button type="primary" onClick={NovoUsuario}>
          Cadastrar novo usuário
        </Button>
      </div>
      <Table
        columns={colunasTabela}
        dataSource={usuarios}
        rowKey="id"
      />
    </div>
  );
};

export default Usuarios;
