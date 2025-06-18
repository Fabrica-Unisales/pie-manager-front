"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getCursoTurmaPorId, atualizaCursoTurma } from "../storage";

export default function EditPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [form, setForm] = useState({
    id: "",
    nome: "",
    coordenador_id: "",
    listaTurmas: [],
  });

  useEffect(() => {
    const data = getCursoTurmaPorId(id);
    if (data) {
      setForm(data);
    } else {
      alert("CURSO NÃO ENCONTRADO.");
      router.push("/auth/controleCursosTurmas");
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    atualizaCursoTurma(id, form);
    router.push("/auth/controleCursosTurmas");
  };

  return (
    <div>
      <h1>EDITAR CURSO/TURMA</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="ID DO CURSO"
          value={form.id}
          disabled
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
