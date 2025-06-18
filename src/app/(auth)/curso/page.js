"use client";
import React, { useState, useEffect } from "react";
import { Button, Table, Popconfirm, message } from "antd";
import { useRouter } from "next/navigation";
import { usuarios } from "@/mocks/usuarios";

export default function CursoPage() {
  const router = useRouter();

  const [cursos, setCursos] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cursos");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("cursos", JSON.stringify(cursos));
  }, [cursos]);

  const coordenadores = usuarios.filter(u => u.tipo === "Coordenador");

  const getCoordenadorNome = (id) =>
    coordenadores.find(c => c.id === id)?.nome || "Não encontrado";

  const handleRemoveCurso = (cursoId) => {
    setCursos(cursos.filter(c => c.id !== cursoId));
    message.success("Curso removido!");
  };

  const columns = [
    { title: "Nome", dataIndex: "nome" },
    {
      title: "Coordenador",
      dataIndex: "coordenador_id",
      render: id => getCoordenadorNome(id)
    },
    {
      title: "Ações",
      render: (_, record) => (
        <>
          <Button
            onClick={() => router.push(`/curso/${record.id}`)}
            type="link"
          >
            Editar
          </Button>
          <Popconfirm
            title="Tem certeza que deseja remover este curso?"
            onConfirm={() => handleRemoveCurso(record.id)}
            okText="Sim"
            cancelText="Não"
          >
            <Button danger type="link">Remover</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 16, display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
        <h2 style={{ margin: 0, flex: 1 }}>Cursos</h2>
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
          onClick={() => router.push("/curso/new")}
        >
          Adicionar Curso
        </Button>
      </div>
      <Table
        dataSource={cursos}
        columns={columns}
        rowKey="id"
        locale={{ emptyText: "Nenhum curso cadastrado" }}
      />
    </div>
  );
}