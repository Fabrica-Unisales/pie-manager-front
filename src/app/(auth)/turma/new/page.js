"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button, Form, Input, Select, message } from "antd";
import { usuarios } from "@/mocks/usuarios";

const periodos = [
  { id: 1, nome: "1" },
  { id: 2, nome: "2" },
  { id: 3, nome: "3" },
  { id: 4, nome: "4" },
  { id: 5, nome: "5" },
  { id: 6, nome: "6" },
  { id: 7, nome: "7" },
  { id: 8, nome: "8" },
  { id: 9, nome: "9" },
  { id: 10, nome: "10" },
];

export default function NovaTurmaPage() {
  const router = useRouter();
  const [form] = Form.useForm();

  // Pegando cursos para o select
  const cursos = JSON.parse(localStorage.getItem("cursos") || "[]");
  const professores = usuarios.filter(u => u.tipo === "Professor");
  const alunos = usuarios.filter(u => u.tipo === "Aluno");

  const handleSubmit = (values) => {
    // Gera objeto turma com cursoId
    const novaTurma = {
      ...values,
      id: Date.now(),
    };

    // Atualiza o curso correto adicionando a turma
    const idx = cursos.findIndex(c => String(c.id) === String(values.cursoId));
    if (idx === -1) {
      message.error("Curso não encontrado!");
      return;
    }
    const listaTurmas = [...(cursos[idx].listaTurmas || []), novaTurma];
    cursos[idx].listaTurmas = listaTurmas;
    localStorage.setItem("cursos", JSON.stringify(cursos));
    message.success("Turma cadastrada com sucesso!");
    router.push("/turma");
  };

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", background: "#fff", padding: 24, borderRadius: 8 }}>
      <h2>Nova Turma</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ listaAlunos: [] }}
      >
        <Form.Item
          name="cursoId"
          label="Curso"
          rules={[{ required: true, message: "Selecione o curso" }]}
        >
          <Select placeholder="Selecione o curso">
            {cursos.map(curso => (
              <Select.Option key={curso.id} value={curso.id}>{curso.nome}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="ano" label="Ano" rules={[{ required: true }]}>
          <Input type="number" min={2000} max={2100} />
        </Form.Item>
        <Form.Item name="semestre" label="Semestre" rules={[{ required: true }]}>
          <Select style={{ width: 120 }}>
            <Select.Option value={1}>1</Select.Option>
            <Select.Option value={2}>2</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="periodo_id" label="Período" rules={[{ required: true }]}>
          <Select style={{ width: 160 }}>
            {periodos.map(p => (
              <Select.Option key={p.id} value={p.id}>{p.nome}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="professor_id" label="Professor" rules={[{ required: true }]}>
          <Select style={{ width: 180 }}>
            {professores.map(prof => (
              <Select.Option key={prof.id} value={prof.id}>{prof.nome}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="listaAlunos" label="Alunos" rules={[{ required: true }]}>
          <Select mode="multiple" maxTagCount={2} style={{ minWidth: 220 }}>
            {alunos.map(aluno => (
              <Select.Option key={aluno.id} value={aluno.id}>{aluno.nome}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Cadastrar
          </Button>
          <Button
            style={{ marginLeft: 8 }}
            onClick={() => router.push("/turma")}
          >
            Cancelar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}