"use client";
import React from "react";
import { Form, Input, Button, Select } from "antd";
import { useRouter } from "next/navigation";

const { Option } = Select;

const NewUserForm = () => {
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = (values) => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || {
      data: [],
      nextId: 1,
    };

    const newUser = {
      id: String(storedUsers.nextId),
      ...values,
      senha_hash: values.senha,
    };

    const updatedUsers = {
      data: [...storedUsers.data, newUser],
      nextId: storedUsers.nextId + 1,
    };

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    const loginUsers = updatedUsers.data.map((u) => ({
      username: u.email,
      password: u.senha_hash,
    }));
    localStorage.setItem("login_users", JSON.stringify(loginUsers));

    alert("Usuário cadastrado com o glamour necessário!");
    router.push("/usuarios");
  };

  return (
    <div style={{ maxWidth: 500, margin: "32px auto" }}>
      <h2>Cadastro de Novo Usuário</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ tipo: "Aluno" }}
      >
        <Form.Item
          label="Nome Completo"
          name="nome"
          rules={[
            { required: true, message: "O nome é obrigatório, querido." },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Preciso de um email válido!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Usuário"
          name="usuario"
          rules={[{ required: true, message: "Escolha um nome de usuário." }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Senha"
          name="senha"
          rules={[
            {
              required: true,
              message: 'Uma senha, por favor. E que não seja "1234".',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Matrícula"
          name="matricula"
          rules={[{ required: true, message: "A matrícula é indispensável." }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Tipo de Usuário"
          name="tipo"
          rules={[
            { required: true, message: "Defina o papel deste pobre coitado." },
          ]}
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
            Salvar
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

export default NewUserForm;
