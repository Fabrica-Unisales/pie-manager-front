"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button, Form, Input, Select, message } from "antd";
import { usuarios } from "@/mocks/usuarios";

export default function EditarCursoPage() {
  const router = useRouter();
  const params = useParams();
  const cursoId = params?.id;

  const [form] = Form.useForm();
  const [curso, setCurso] = useState(null);
  const [cursos, setCursos] = useState([]);

  const coordenadores = usuarios.filter(u => u.tipo === "Coordenador");

  useEffect(() => {
    const lista = JSON.parse(localStorage.getItem("cursos") || "[]");
    setCursos(lista);
    const encontrado = lista.find(c => String(c.id) === String(cursoId));
    if (!encontrado) {
      message.error("Curso não encontrado!");
      router.push("/curso");
      return;
    }
    setCurso(encontrado);
    form.setFieldsValue({
      nome: encontrado.nome,
      coordenador_id: encontrado.coordenador_id,
    });
  }, [cursoId]);

  const handleSalvarCurso = (values) => {
    const novosCursos = cursos.map(c =>
      String(c.id) === String(cursoId)
        ? { ...c, ...values }
        : c
    );
    localStorage.setItem("cursos", JSON.stringify(novosCursos));
    setCursos(novosCursos);
    message.success("Curso atualizado!");
    router.push("/curso");
  };

  if (!curso) return null;

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", background: "#fff", padding: 24, borderRadius: 8 }}>
      <h2>Editar Curso</h2>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          nome: curso.nome,
          coordenador_id: curso.coordenador_id
        }}
        onFinish={handleSalvarCurso}
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
            Salvar
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={() => router.push("/curso")}>
            Cancelar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}