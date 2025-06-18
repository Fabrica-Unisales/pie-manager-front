"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { salvarCurso } from "../storageCursos";

export default function Page() {
  const router = useRouter();

  const [curso, setCurso] = useState({
    id: "",
    nome: "",
    coordenador: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurso({ ...curso, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!curso.id || !curso.nome) {
      alert("ID e Nome são obrigatórios.");
      return;
    }
    salvarCurso(curso);
    router.push("/controleCursosTurmas/cursos");
  };

  return (
    <div>
      <h1>➕ Cadastrar Curso</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID:</label>
          <input
            name="id"
            value={curso.id}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Nome:</label>
          <input
            name="nome"
            value={curso.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Coordenador:</label>
          <input
            name="coordenador"
            value={curso.coordenador}
            onChange={handleChange}
          />
        </div>
        <br />
        <button type="submit">💾 Salvar</button>
        <button type="button" onClick={() => router.push("/controleCursosTurmas/cursos")}>
          ↩️ Voltar
        </button>
      </form>
    </div>
  );
}
