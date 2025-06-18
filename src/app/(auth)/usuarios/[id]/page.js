"use client";
import React, { useEffect } from "react";
import { Form, Input, Button, Select } from "antd";
import { useRouter, useParams } from "next/navigation";

const { Option } = Select;

const EditUserForm = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (id) {
      const storedUsers = JSON.parse(localStorage.getItem("users")) || {
        data: [],
      };
      const userToEdit = storedUsers.data.find((user) => user.id === id);

      if (userToEdit) {
        form.setFieldsValue({
          ...userToEdit,
          senha: userToEdit.senha_hash,
        });
      } else {
        alert("Usuário não encontrado. Que pena.");
        router.push("/usuarios");
      }
    }
  }, [id, form, router]);

  const onFinish = (values) => {
    const storedUsers = JSON.parse(localStorage.getItem("users"));

    const userIndex = storedUsers.data.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      alert(
        "Não foi possível encontrar o usuário para atualizar. Tente novamente."
      );
      return;
    }

    const updatedUser = {
      ...storedUsers.data[userIndex],
      ...values,
      senha_hash: values.senha,
    };

    storedUsers.data[userIndex] = updatedUser;
    localStorage.setItem("users", JSON.stringify(storedUsers));

    const loginUsers = storedUsers.data.map((u) => ({
      username: u.email,
      password: u.senha_hash,
    }));
    localStorage.setItem("login_users", JSON.stringify(loginUsers));

    alert("Usuário atualizado com sucesso. Ficou... aceitável.");
    router.push("/usuarios");
  };

  return (
    <div style={{ maxWidth: 500, margin: "32px auto" }}>
      <h2>Editando Usuário</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        {}
        <Form.Item
          label="Nome Completo"
          name="nome"
          rules={[{ required: true, message: "O nome é obrigatório." }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, type: "email", message: "Email inválido." },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Usuário"
          name="usuario"
          rules={[{ required: true, message: "Usuário é obrigatório." }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Senha"
          name="senha"
          rules={[{ required: true, message: "Senha é obrigatória." }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Matrícula"
          name="matricula"
          rules={[{ required: true, message: "Matrícula é obrigatória." }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Tipo de Usuário"
          name="tipo"
          rules={[{ required: true, message: "Tipo é obrigatório." }]}
        >
          <Select>
            <Option value="Aluno">Aluno</Option>
            <Option value="Professor">Professor</Option>
            <Option value="Coordenador">Coordenador</Option>
            <Option value="AvaliadorExterno">Avaliador Externo</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Salvar Alterações
          </Button>
        </Form.Item>
        <Button
          style={{ marginTop: 8 }}
          block
          onClick={() => router.push("/usuarios")}
        >
          Cancelar
        </Button>
      </Form>
    </div>
  );
};

export default EditUserForm;
