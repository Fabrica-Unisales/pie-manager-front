"use client";
import React, { useEffect, useState } from "react";
import { Button, Table, Space, Tag } from "antd";
import { useRouter } from "next/navigation";

const columns = [
  {
    title: "Nome",
    dataIndex: "nome",
    key: "nome",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Matrícula",
    dataIndex: "matricula",
    key: "matricula",
  },
  {
    title: "Tipo",
    key: "tipo",
    dataIndex: "tipo",
    render: (tipo) => {
      let color;
      switch (tipo) {
        case "Professor":
          color = "geekblue";
          break;
        case "Coordenador":
          color = "volcano";
          break;
        case "AvaliadorExterno":
          color = "gold";
          break;
        default:
          color = "green";
      }
      return (
        <Tag color={color} key={tipo}>
          {tipo.toUpperCase()}
        </Tag>
      );
    },
  },
  {
    title: "Ação",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        {}
        <a href={`/usuarios/${record.id}`}>Editar</a>
        <a>Excluir</a>
      </Space>
    ),
  },
];

const UsuariosPage = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || {
      data: [],
    };

    const processedData = storedUsers.data.map((user) => ({
      ...user,
      key: user.id,
    }));
    setUsers(processedData);
  }, []);

  const handleAddItem = () => {
    router.push("/usuarios/new");
  };

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 16, textAlign: "right" }}>
        <Button type="primary" onClick={handleAddItem}>
          Adicionar Usuário
        </Button>
      </div>
      <Table columns={columns} dataSource={users} />
    </div>
  );
};

export default UsuariosPage;
