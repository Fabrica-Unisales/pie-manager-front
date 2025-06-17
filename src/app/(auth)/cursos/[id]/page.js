'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CursoDetailPage() {
    const { cursoId } = useParams();
    const [curso, setCurso] = useState(null);
    const [turmas, setTurmas] = useState([]);

    useEffect(() => {
        const storedCursos = JSON.parse(localStorage.getItem('cursos') || '{}').data || [];
        const storedTurmas = JSON.parse(localStorage.getItem('turmas') || '{}').data || [];
        const cursoData = storedCursos.find(c => c.id === cursoId);
        const turmasData = storedTurmas.filter(t => t.curso_id === cursoId);
        setCurso(cursoData);
        setTurmas(turmasData);
    }, [cursoId]);

    if (!curso) return <div>Carregando...</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">{curso.nome}</h1>
            <p><strong>Coordenador ID:</strong> {curso.coordenador_id}</p>
            <h2 className="text-xl font-semibold mt-6 mb-4">Turmas</h2>
            <Link href={`/cursos/${cursoId}/new-turma`} className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">
                Adicionar Nova Turma
            </Link>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">ID</th>
                        <th className="border p-2">Período</th>
                        <th className="border p-2">Ano</th>
                        <th className="border p-2">Semestre</th>
                        <th className="border p-2">Professor</th>
                        <th className="border p-2">Alunos</th>
                    </tr>
                </thead>
                <tbody>
                    {turmas.map(turma => (
                        <tr key={turma.id}>
                            <td className="border p-2">{turma.id}</td>
                            <td className="border p-2">{turma.periodo_id}</td>
                            <td className="border p-2">{turma.ano}</td>
                            <td className="border p-2">{turma.semestre}</td>
                            <td className="border p-2">{turma.professor.name}</td>
                            <td className="border p-2">{turma.listaAlunos.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}