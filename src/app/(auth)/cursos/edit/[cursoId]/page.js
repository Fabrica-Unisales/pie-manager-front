'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditCursoPage() {
    const { cursoId } = useParams();
    const [nome, setNome] = useState('');
    const [coordenadorId, setCoordenadorId] = useState('');
    const [coordenadores, setCoordenadores] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const storedCursos = JSON.parse(localStorage.getItem('cursos') || '{}').data || [];
        const curso = storedCursos.find(c => c.id === cursoId);
        if (curso) {
            setNome(curso.nome);
            setCoordenadorId(curso.coordenador_id);
        }
        const storedUsuarios = JSON.parse(localStorage.getItem('usuarios') || '{}').data || [];
        setCoordenadores(storedUsuarios.filter(u => u.tipo === 'Coordenador'));
    }, [cursoId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const storedCursos = JSON.parse(localStorage.getItem('cursos') || '{}');
        storedCursos.data = storedCursos.data.map(curso =>
            curso.id === cursoId ? { ...curso, nome, coordenador_id: coordenadorId } : curso
        );
        localStorage.setItem('cursos', JSON.stringify(storedCursos));
        router.push('/cursos');
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Editar Curso</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-1">Nome</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className="border p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Coordenador</label>
                    <select
                        value={coordenadorId}
                        onChange={(e) => setCoordenadorId(e.target.value)}
                        className="border p-2 w-full"
                        required
                    >
                        <option value="">Selecione um Coordenador</option>
                        {coordenadores.map(coordenador => (
                            <option key={coordenador.id} value={coordenador.id}>{coordenador.nome}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Salvar</button>
            </form>
        </div>
    );
}