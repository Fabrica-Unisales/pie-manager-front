"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getCurso, salvarCurso } from "../storageCursos";

export default function Page() {
  const router = useRouter();
  const params = useParams();

  const [curso, setCurso] = useState({
    id: "",
    nome: "",
    coordenador: "",
  });

  useEffect(() => {
    const dados = getCurso(params.id);
    if (dados) {
      setCurso(dados);
    }
  }, [params.id]);

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
      <h1>✏️ Editar Curso</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID:</label>
          <input
            name="id"
            value={curso.id}
            disabled // 🔒 ID bloqueado na edição
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
