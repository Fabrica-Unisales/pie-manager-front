"use client";
import React, { useEffect, useState } from "react";
import { Button, Table, Popconfirm, message } from "antd";
import { projetos } from "@/mocks/projetos";
localStorage.setItem("projetos", JSON.stringify(projetos));
import { useRouter } from "next/navigation";
import { usuarios } from "@/mocks/usuarios";


const getProjetoTitulo = (id, projetos) =>
  projetos.find(p => String(p.id) === String(id))?.titulo || "—";
const getAvaliadorNome = (id, usuarios) =>
  usuarios.find(u => String(u.id) === String(id))?.nome || "—";

export default function AvaliacoesPage() {
  const router = useRouter();
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [projetos, setProjetos] = useState([]);
  const [avaliadores, setAvaliadores] = useState([]);

  useEffect(() => {
    carregarAvaliacoes();
  }, []);

  const carregarAvaliacoes = () => {
    const avaliacoesLS = JSON.parse(localStorage.getItem("avaliacoes") || "[]");
    const projetosLS = JSON.parse(localStorage.getItem("projetos") || "[]");
    setAvaliacoes(avaliacoesLS);
    setProjetos(projetosLS);
    setAvaliadores(usuarios.filter(u => u.tipo === "AvaliadorExterno"));
  };

  const handleEdit = id => {
    router.push(`/avaliacao/${id}`);
  };

  const handleRemove = id => {
    const novasAvaliacoes = avaliacoes.filter(a => String(a.id) !== String(id));
    localStorage.setItem("avaliacoes", JSON.stringify(novasAvaliacoes));
    message.success("Avaliação removida!");
    setAvaliacoes(novasAvaliacoes);
  };

  const columns = [
    {
      title: "Projeto",
      dataIndex: "projeto_id",
      render: id => getProjetoTitulo(id, projetos),
    },
    {
      title: "Avaliador",
      dataIndex: "avaliador_id",
      render: id => getAvaliadorNome(id, usuarios),
    },
    {
      title: "Nota",
      dataIndex: "nota",
      render: nota => (nota != null ? nota.toFixed(2) : "—"),
    },
    {
      title: "Comentário",
      dataIndex: "comentario",
      ellipsis: true,
    },
    {
      title: "Ações",
      render: (_, record) => (
        <>
          <Button onClick={() => handleEdit(record.id)} type="link">Editar</Button>
          <Popconfirm
            title="Remover esta avaliação?"
            onConfirm={() => handleRemove(record.id)}
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
        <h2 style={{ margin: 0, flex: 1 }}>Avaliações</h2>
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
          onClick={() => router.push("/avaliacao/new")}
        >
          Nova Avaliação
        </Button>
      </div>
      <Table
        dataSource={avaliacoes}
        columns={columns}
        rowKey="id"
        locale={{ emptyText: "Nenhuma avaliação cadastrada" }}
      />
    </div>
  );
}