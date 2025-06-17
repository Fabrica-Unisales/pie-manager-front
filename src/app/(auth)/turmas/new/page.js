'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NewTurmaPage() {
    const [cursoId, setCursoId] = useState('');
    const [periodoId, setPeriodoId] = useState('');
    const [ano, setAno] = useState('');
    const [semestre, setSemestre] = useState('');
    const [professorId, setProfessorId] = useState('');
    const [selectedAlunos, setSelectedAlunos] = useState([]);
    const [cursos, setCursos] = useState([]);
    const [professores, setProfessores] = useState([]);
    const [alunos, setAlunos] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const storedCursos = JSON.parse(localStorage.getItem('cursos') || '{}').data || [];
        const storedUsuarios = JSON.parse(localStorage.getItem('usuarios') || '{}').data || [];
        setCursos(storedCursos);
        setProfessores(storedUsuarios.filter(u => u.tipo === 'Professor'));
        setAlunos(storedUsuarios.filter(u => u.tipo === 'Aluno'));
    }, []);

    const handleAlunoToggle = (alunoId) => {
        setSelectedAlunos(prev =>
            prev.includes(alunoId) ? prev.filter(id => id !== alunoId) : [...prev, alunoId]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const storedTurmas = JSON.parse(localStorage.getItem('turmas') || '{}');
        const storedCursos = JSON.parse(localStorage.getItem('cursos') || '{}');
        const storedUsuarios = JSON.parse(localStorage.getItem('usuarios') || '{}').data || [];
        const professor = storedUsuarios.find(u => u.id === professorId) || { id: professorId, nome: 'Desconhecido' };
        const selectedAlunosData = storedUsuarios.filter(u => selectedAlunos.includes(u.id));

        const newTurma = {
            id: String(storedTurmas.nextId || 1),
            curso_id: cursoId,
            periodo_id: periodoId,
            ano: parseInt(ano),
            semestre: parseInt(semestre),
            professor,
            listaAlunos: selectedAlunosData
        };

        storedTurmas.data = storedTurmas.data || [];
        storedTurmas.data.push(newTurma);
        storedTurmas.nextId = (storedTurmas.nextId || 1) + 1;
        storedTurmas.length = storedTurmas.data.length;

        const curso = storedCursos.data.find(c => c.id === cursoId);
        if (curso) curso.listaTurmas.push(newTurma.id);

        localStorage.setItem('turmas', JSON.stringify(storedTurmas));
        localStorage.setItem('cursos', JSON.stringify(storedCursos));
        router.push('/turmas');
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Adicionar Nova Turma</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-1">Curso</label>
                    <select
                        value={cursoId}
                        onChange={(e) => setCursoId(e.target.value)}
                        className="border p-2 w-full"
                        required
                    >
                        <option value="">Selecione um Curso</option>
                        {cursos.map(curso => (
                            <option key={curso.id} value={curso.id}>{curso.nome}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Período ID</label>
                    <input
                        type="text"
                        value={periodoId}
                        onChange={(e) => setPeriodoId(e.target.value)}
                        className="border p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Ano</label>
                    <input
                        type="number"
                        value={ano}
                        onChange={(e) => setAno(e.target.value)}
                        className="border p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Semestre</label>
                    <input
                        type="number"
                        value={semestre}
                        onChange={(e) => setSemestre(e.target.value)}
                        className="border p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Professor</label>
                    <select
                        value={professorId}
                        onChange={(e) => setProfessorId(e.target.value)}
                        className="border p-2 w-full"
                        required
                    >
                        <option value="">Selecione um Professor</option>
                        {professores.map(professor => (
                            <option key={professor.id} value={professor.id}>{professor.nome}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Alunos</label>
                    {alunos.map(aluno => (
                        <div key={aluno.id} className="flex items-center">
                            <input
                                type="checkbox"
                                checked={selectedAlunos.includes(aluno.id)}
                                onChange={() => handleAlunoToggle(aluno.id)}
                                className="mr-2"
                            />
                            <span>{aluno.nome}</span>
                        </div>
                    ))}
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Salvar</button>
            </form>
        </div>
    );
}