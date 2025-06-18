"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { listarCursos, salvarCurso } from "../storageCursos";

export default function EditarCurso() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [curso, setCurso] = useState({
    id: "",
    nome: "",
    coordenador: "",
    area: "",
    cargaHoraria: "",
    status: "Ativo",
  });

  useEffect(() => {
    const cursos = listarCursos();
    const cursoExistente = cursos.find((c) => c.id === id);
    if (cursoExistente) {
      setCurso(cursoExistente);
    }
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setCurso({ ...curso, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    salvarCurso(curso);
    router.push("/controleCursosTurmas/cursos");
  }

  return (
    <div className="container" style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>Editar Curso</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "400px",
        }}
      >
        <label>
          <strong>Tag (ID):</strong>
          <input
            name="id"
            value={curso.id}
            readOnly
            style={{ width: "100%" }}
          />
        </label>

        <label>
          <strong>Nome do Curso:</strong>
          <input
            name="nome"
            value={curso.nome}
            onChange={handleChange}
            required
            style={{ width: "100%" }}
          />
        </label>

        <label>
          <strong>Coordenador:</strong>
          <input
            name="coordenador"
            value={curso.coordenador}
            onChange={handleChange}
            required
            style={{ width: "100%" }}
          />
        </label>

        <label>
          <strong>Área:</strong>
          <select
            name="area"
            value={curso.area}
            onChange={handleChange}
            required
            style={{ width: "100%" }}
          >
            <option value="">Selecione...</option>
            <option value="TI">TI</option>
            <option value="Saúde">Saúde</option>
            <option value="Engenharia">Engenharia</option>
            <option value="Negócios">Negócios</option>
            <option value="Outros">Outros</option>
          </select>
        </label>

        <label>
          <strong>Carga Horária:</strong>
          <input
            type="number"
            name="cargaHoraria"
            value={curso.cargaHoraria}
            onChange={handleChange}
            required
            style={{ width: "100%" }}
          />
        </label>

        <label>
          <strong>Status:</strong>
          <select
            name="status"
            value={curso.status}
            onChange={handleChange}
            required
            style={{ width: "100%" }}
          >
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
          </select>
        </label>

        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <button type="submit">Salvar</button>
          <button
            type="button"
            onClick={() => router.push("/controleCursosTurmas/cursos")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
