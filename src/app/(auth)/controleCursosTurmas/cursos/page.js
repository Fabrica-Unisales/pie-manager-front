"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCursos, deletarCurso } from "./storageCursos";

export default function Page() {
  const router = useRouter();
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    const data = getCursos();
    setCursos(data);
  }, []);

  const handleDelete = (id) => {
    if (confirm("Deseja realmente excluir este curso?")) {
      deletarCurso(id);
      setCursos(getCursos());
    }
  };

  return (
    <div>
      <h1>📚 Gerenciamento de Cursos</h1>
      <button onClick={() => router.push("/controleCursosTurmas/cursos/new")}>
        ➕ Novo Curso
      </button>

      {cursos.length === 0 ? (
        <p>🔍 Nenhum curso cadastrado.</p>
      ) : (
        <ul>
          {cursos.map((curso) => (
            <li key={curso.id}>
              <strong>{curso.nome}</strong> (ID: {curso.id})
              <br />
              <button
                onClick={() =>
                  router.push(`/controleCursosTurmas/cursos/${curso.id}`)
                }
              >
                ✏️ Editar
              </button>
              <button onClick={() => handleDelete(curso.id)}>❌ Excluir</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
