"use client";
import React, { useEffect, useState } from "react";
import { Button, Table, Space, Tag, Modal } from "antd";
import { useRouter } from "next/navigation";

const UsuariosPage = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);

  const loadUsers = () => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || {
      data: [],
    };
    const processedData = storedUsers.data.map((user) => ({
      ...user,
      key: user.id,
    }));
    setUsers(processedData);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = (userId) => {
    Modal.confirm({
      title: "Tem certeza que quer apagar este ser?",
      content: "Lembre-se: uma vez no abismo, não há retorno.",
      okText: "Sim, para o esquecimento!",
      okType: "danger",
      cancelText: "Não, ele pode ser útil",
      onOk() {
        const storedUsers = JSON.parse(localStorage.getItem("users"));
        const newUserData = storedUsers.data.filter(
          (user) => user.id !== userId
        );

        const updatedUsers = { ...storedUsers, data: newUserData };
        localStorage.setItem("users", JSON.stringify(updatedUsers));

        loadUsers();
      },
    });
  };

  const handleAddItem = () => {
    router.push("/usuarios/cadastrar");
  };

  const columns = [
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
      render: (text, record) => <a href={`/usuarios/${record.id}`}>{text}</a>,
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
          <a href={`/usuarios/${record.id}`}>Editar</a>
          {}
          <a
            onClick={() => handleDelete(record.id)}
            style={{ color: "red", cursor: "pointer" }}
          >
            Excluir
          </a>
        </Space>
      ),
    },
  ];

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
