"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCursosTurmas, deletarCursoTurma } from "./storage";

export default function Page() {
  const router = useRouter();
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    const data = getCursosTurmas();
    setCursos(data);
  }, []);

  const handleDelete = (id) => {
    if (confirm("DESEJA REALMENTE EXCLUIR?")) {
      deleteCursoTurma(id);
      setCursos(getCursosTurmas());
    }
  };

  return (
    <div>
      <h1>CONTROLE DE CURSOS E TURMAS</h1>
      <button onClick={() => router.push("/auth/controleCursosTurmas/new")}>
        NOVO CURSO/TURMA
      </button>

      {cursos.length === 0 && <p>Sem cursos cadastrados.</p>}

      <ul>
        {cursos.map((curso) => (
          <li key={curso.id}>
            <strong>{curso.nome}</strong> (ID: {curso.id})
            <button
              onClick={() =>
                router.push(`/auth/controleCursosTurmas/${curso.id}`)
              }
            >
              EDITAR
            </button>
            <button onClick={() => handleDelete(curso.id)}> EXCLUIR </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
