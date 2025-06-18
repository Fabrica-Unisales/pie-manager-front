"use client";
import React, { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
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

export default function EditarTurmaPage() {
  const router = useRouter();
  const params = useParams();
  const turmaId = params?.id;

  const [form] = Form.useForm();

  // Busca cursos e usuários
  const cursos = JSON.parse(localStorage.getItem("cursos") || "[]");
  const professores = usuarios.filter(u => u.tipo === "Professor");
  const alunos = usuarios.filter(u => u.tipo === "Aluno");

  // Busca a turma e curso correspondente
  useEffect(() => {
    let turmaAtual = null;
    let cursoIdAtual = null;
    for (const curso of cursos) {
      const turma = (curso.listaTurmas || []).find(t => String(t.id) === String(turmaId));
      if (turma) {
        turmaAtual = turma;
        cursoIdAtual = curso.id;
        break;
      }
    }
    if (!turmaAtual) {
      message.error("Turma não encontrada!");
      router.push("/turma");
      return;
    }
    form.setFieldsValue({
      cursoId: cursoIdAtual,
      ano: turmaAtual.ano,
      semestre: turmaAtual.semestre,
      periodo_id: turmaAtual.periodo_id,
      professor_id: turmaAtual.professor_id,
      listaAlunos: turmaAtual.listaAlunos,
    });
  }, [turmaId]);

  const handleSubmit = (values) => {
    // Remove a turma do curso antigo (caso o curso seja alterado)
    let turmaEncontrada = false;
    const novosCursos = cursos.map(curso => {
      let listaTurmas = curso.listaTurmas || [];
      if (listaTurmas.some(t => String(t.id) === String(turmaId))) {
        listaTurmas = listaTurmas.filter(t => String(t.id) !== String(turmaId));
        turmaEncontrada = true;
      }
      // Se é o novo curso, adiciona a turma editada
      if (String(curso.id) === String(values.cursoId)) {
        listaTurmas = [...listaTurmas, { ...values, id: Number(turmaId) }];
      }
      return { ...curso, listaTurmas };
    });

    if (!turmaEncontrada) {
      message.error("Turma não encontrada!");
      router.push("/turma");
      return;
    }

    localStorage.setItem("cursos", JSON.stringify(novosCursos));
    message.success("Turma editada com sucesso!");
    router.push("/turma");
  };

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", background: "#fff", padding: 24, borderRadius: 8 }}>
      <h2>Editar Turma</h2>
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
            Salvar
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