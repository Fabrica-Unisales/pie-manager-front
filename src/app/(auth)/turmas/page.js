'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function TurmasPage() {
    const [turmas, setTurmas] = useState([]);

    useEffect(() => {
        const storedTurmas = JSON.parse(localStorage.getItem('turmas') || '{}').data || [];
        setTurmas(storedTurmas);
    }, []);

    const handleDelete = (id) => {
        const storedTurmas = JSON.parse(localStorage.getItem('turmas') || '{}');
        const storedCursos = JSON.parse(localStorage.getItem('cursos') || '{}');
        storedTurmas.data = storedTurmas.data.filter(turma => turma.id !== id);
        storedTurmas.length = storedTurmas.data.length;
        storedCursos.data = storedCursos.data.map(curso => ({
            ...curso,
            listaTurmas: curso.listaTurmas.filter(turmaId => turmaId !== id)
        }));
        localStorage.setItem('turmas', JSON.stringify(storedTurmas));
        localStorage.setItem('cursos', JSON.stringify(storedCursos));
        setTurmas(storedTurmas.data);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Turmas</h1>
            <Link href="/turmas/new" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">
                Adicionar Nova Turma
            </Link>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">ID</th>
                        <th className="border p-2">Curso</th>
                        <th className="border p-2">Período</th>
                        <th className="border p-2">Ano</th>
                        <th className="border p-2">Semestre</th>
                        <th className="border p-2">Professor</th>
                        <th className="border p-2">Alunos</th>
                        <th className="border p-2">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {turmas.map(turma => (
                        <tr key={turma.id}>
                            <td className="border p-2">{turma.id}</td>
                            <td className="border p-2">{turma.curso_id}</td>
                            <td className="border p-2">{turma.periodo_id}</td>
                            <td className="border p-2">{turma.ano}</td>
                            <td className="border p-2">{turma.semestre}</td>
                            <td className="border p-2">{turma.professor.nome}</td>
                            <td className="border p-2">{turma.listaAlunos.length}</td>
                            <td className="border p-2">
                                <Link href={`/turmas/edit/${turma.id}`} className="text-blue-500 mr-2">Editar</Link>
                                <button onClick={() => handleDelete(turma.id)} className="text-red-500">Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}