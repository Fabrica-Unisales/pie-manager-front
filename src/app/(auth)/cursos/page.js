'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CursosPage() {
    const [cursos, setCursos] = useState([]);

    useEffect(() => {
        const storedCursos = JSON.parse(localStorage.getItem('cursos') || '{}').data || [];
        setCursos(storedCursos);
    }, []);

    const handleDelete = (id) => {
        const storedCursos = JSON.parse(localStorage.getItem('cursos') || '{}');
        storedCursos.data = storedCursos.data.filter(curso => curso.id !== id);
        storedCursos.length = storedCursos.data.length;
        localStorage.setItem('cursos', JSON.stringify(storedCursos));
        setCursos(storedCursos.data);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Cursos</h1>
            <Link href="/cursos/new" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">
                Adicionar Novo Curso
            </Link>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">ID</th>
                        <th className="border p-2">Nome</th>
                        <th className="border p-2">Coordenador</th>
                        <th className="border p-2">Turmas</th>
                        <th className="border p-2">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {cursos.map(curso => (
                        <tr key={curso.id}>
                            <td className="border p-2">{curso.id}</td>
                            <td className="border p-2">{curso.nome}</td>
                            <td className="border p-2">{curso.coordenador_id}</td>
                            <td className="border p-2">{curso.listaTurmas.length}</td>
                            <td className="border p-2">
                                <Link href={`/cursos/edit/${curso.id}`} className="text-blue-500 mr-2">Editar</Link>
                                <button onClick={() => handleDelete(curso.id)} className="text-red-500">Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}