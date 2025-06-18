"use client";
import { useState, useEffect } from "react";
import { addTurma } from "../storageTurmas";
import { getTurmasById, updateTurma } from "../storageTurmas";
import { getCursos } from "../../cursos/storageCursos";
import { useRouter } from "next/navigation";

export default function NovaTurma() {
  const router = useRouter();

  const [turma, setTurma] = useState({
    id: "",
    periodo: "",
    turno: "",
    curso: "",
  });

  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    const listaCursos = getCursos();
    setCursos(listaCursos);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTurma({ ...turma, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!turma.id || !turma.periodo || !turma.turno || !turma.curso) {
      alert("Preencha todos os campos!");
      return;
    }

    addTurma(turma);
    router.push("/controleCursosTurmas/turmas");
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Cadastrar Nova Turma</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">ID da Turma (Número)</label>
          <input
            type="text"
            name="id"
            value={turma.id}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Período</label>
          <input
            type="text"
            name="periodo"
            value={turma.periodo}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Turno</label>
          <select
            name="turno"
            value={turma.turno}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Selecione</option>
            <option value="Matutino">Matutino</option>
            <option value="Vespertino">Vespertino</option>
            <option value="Noturno">Noturno</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Curso</label>
          <select
            name="curso"
            value={turma.curso}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Selecione</option>
            {cursos.map((curso) => (
              <option key={curso.id} value={curso.nome}>
                {curso.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="space-x-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Salvar
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
          >
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
}
