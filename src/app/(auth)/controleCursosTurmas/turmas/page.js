"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getTurmas, deleteTurma } from "./storageTurmas";

export default function Turmas() {
  const [turmas, setTurmas] = useState([]);

  useEffect(() => {
    setTurmas(getTurmas());
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = confirm("Tem certeza que deseja excluir esta turma?");
    if (confirmDelete) {
      deleteTurma(id);
      setTurmas(getTurmas());
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-6">Gerenciar Turmas</h1>

      <Link href="/controleCursosTurmas/turmas/new">
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Nova Turma
        </button>
      </Link>

      <div className="mt-8">
        {turmas.length === 0 ? (
          <p className="text-gray-600">Nenhuma turma cadastrada.</p>
        ) : (
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">ID</th>
                <th className="border p-2">Período</th>
                <th className="border p-2">Turno</th>
                <th className="border p-2">Curso</th>
                <th className="border p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {turmas.map((turma) => (
                <tr key={turma.id}>
                  <td className="border p-2">{turma.id}</td>
                  <td className="border p-2">{turma.periodo}</td>
                  <td className="border p-2">{turma.turno}</td>
                  <td className="border p-2">{turma.curso}</td>
                  <td className="border p-2 space-x-2">
                    <Link href={`/controleCursosTurmas/turmas/${turma.id}`}>
                      <button className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500">
                        Editar
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(turma.id)}
                      className="bg-red-600 px-3 py-1 rounded text-white hover:bg-red-700"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
