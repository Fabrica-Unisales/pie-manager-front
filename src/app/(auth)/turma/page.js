"use client";
import React, { useEffect, useState } from "react";
import { Button, Table, Popconfirm, message } from "antd";
import { useRouter } from "next/navigation";
import { usuarios } from "@/mocks/usuarios";

const periodos = [
  { id: 1, nome: "2025/1" },
  { id: 2, nome: "2025/2" },
];

export default function TurmasPage() {
  const router = useRouter();
  const [turmas, setTurmas] = useState([]);

  useEffect(() => {
    carregarTurmas();
  }, []);

  const carregarTurmas = () => {
    const cursos = JSON.parse(localStorage.getItem("cursos") || "[]");
    const turmasList = cursos.flatMap(curso =>
      (curso.listaTurmas || []).map(turma => ({
        ...turma,
        cursoId: curso.id,
        nomeCurso: curso.nome,
      }))
    );
    setTurmas(turmasList);
  };

  const getProfessorNome = id =>
    usuarios.find(u => u.id === id && u.tipo === "Professor")?.nome || "—";
  const getAlunoNomes = ids =>
    usuarios
      .filter(u => u.tipo === "Aluno" && ids?.includes(u.id))
      .map(a => a.nome)
      .join(", ");

  const handleEdit = turmaId => {
    router.push(`/turma/${turmaId}`);
  };

  const handleRemove = turmaId => {
    const cursos = JSON.parse(localStorage.getItem("cursos") || "[]");
    let alterado = false;
    const novosCursos = cursos.map(curso => {
      const turmasFiltradas = (curso.listaTurmas || []).filter(t => String(t.id) !== String(turmaId));
      if (turmasFiltradas.length !== (curso.listaTurmas || []).length) alterado = true;
      return { ...curso, listaTurmas: turmasFiltradas };
    });
    if (alterado) {
      localStorage.setItem("cursos", JSON.stringify(novosCursos));
      message.success("Turma removida!");
      carregarTurmas();
    }
  };

  const columns = [
    { title: "Ano", dataIndex: "ano" },
    { title: "Semestre", dataIndex: "semestre" },
    {
      title: "Período",
      dataIndex: "periodo_id",
      render: id => periodos.find(p => p.id === id)?.nome || id
    },
    {
      title: "Professor",
      dataIndex: "professor_id",
      render: id => getProfessorNome(id)
    },
    {
      title: "Alunos",
      dataIndex: "listaAlunos",
      render: ids => getAlunoNomes(ids)
    },
    {
      title: "Curso",
      dataIndex: "nomeCurso"
    },
    {
      title: "Ações",
      render: (_, record) => (
        <>
          <Button onClick={() => handleEdit(record.id)} type="link">Editar</Button>
          <Popconfirm
            title="Remover esta turma?"
            onConfirm={() => handleRemove(record.id)}
            okText="Sim"
            cancelText="Não"
          >
            <Button danger type="link">Remover</Button>
          </Popconfirm>
        </>
      ),
    }
  ];

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 16, display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
        <h2 style={{ margin: 0, flex: 1 }}>Turmas</h2>
        <Button
          type="primary"
          style={{
            background: "#1890ff",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            padding: "8px 16px",
            cursor: "pointer",
            fontSize: 16,
          }}
          onClick={() => router.push("/turma/new")}
        >
          Adicionar Turma
        </Button>
      </div>
      <Table
        dataSource={turmas}
        columns={columns}
        rowKey="id"
        locale={{ emptyText: "Nenhuma turma cadastrada" }}
      />
    </div>
  );
}