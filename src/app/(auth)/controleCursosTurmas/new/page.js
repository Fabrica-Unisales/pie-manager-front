"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addCursoTurma } from "../storage";

export default function NewPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    id: "",
    nome: "",
    coordenador_id: "",
    listaTurmas: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.id || !form.nome) {
      alert("ID E NOME SÃO OBRIGATÓRIOS!");
      return;
    }
    addCursoTurma(form);
    router.push("/auth/controleCursosTurmas");
  };

  return (
    <div>
      <h1>CADASTRO DE CURSO/TURMA</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="ID DO CURSO  "
          value={form.id}
          onChange={(e) => setForm({ ...form, id: e.target.value })}
        />
        <input
          placeholder="NOME DO CURSO"
          value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })}
        />
        <input
          placeholder="ID DO COORDENADOR"
          value={form.coordenador_id}
          onChange={(e) => setForm({ ...form, coordenador_id: e.target.value })}
        />

        <button type="submit">SALVAR</button>
        <button type="button" onClick={() => router.push("/auth/controleCursosTurmas")}>
          VOLTAR
        </button>
      </form>
    </div>
  );
}
