"use client";
import React from "react";
import { Button, Form, Input, Select, message } from "antd";
import { useRouter } from "next/navigation";
import { usuarios } from "@/mocks/usuarios";

export default function NovoCursoPage() {
  const [form] = Form.useForm();
  const router = useRouter();

  const coordenadores = usuarios.filter(u => u.tipo === "Coordenador");

  const handleSubmit = (values) => {
    // Busca os cursos atuais e adiciona o novo
    const cursos = JSON.parse(localStorage.getItem("cursos") || "[]");
    const novoCurso = {
      ...values,
      id: Date.now(),
      listaTurmas: []
    };
    localStorage.setItem("cursos", JSON.stringify([...cursos, novoCurso]));
    message.success("Curso cadastrado com sucesso!");
    router.push("/curso");
  };

  return (
    <div style={{ maxWidth: 480, margin: "40px auto", background: "#fff", padding: 24, borderRadius: 8 }}>
      <h2>Novo Curso</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Nome"
          name="nome"
          rules={[{ required: true, message: "Informe o nome do curso" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Coordenador"
          name="coordenador_id"
          rules={[{ required: true, message: "Selecione o coordenador" }]}
        >
          <Select placeholder="Selecione o coordenador">
            {coordenadores.map(coord => (
              <Select.Option key={coord.id} value={coord.id}>
                {coord.nome}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Cadastrar
          </Button>
          <Button
            style={{ marginLeft: 8 }}
            onClick={() => router.push("/curso")}
          >
            Cancelar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}