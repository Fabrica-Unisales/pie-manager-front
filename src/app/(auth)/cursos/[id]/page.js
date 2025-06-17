'use client';
import { useParams } from 'next/navigation';
import { cursos, turmas } from '@/mocks/CursoMocks';

export default function DetalhesCursoPage() {
  const { id } = useParams();
  const curso = cursos.find(c => c.id === id);
  const turmasDoCurso = turmas.filter(t => t.curso_id === id);

  if (!curso) return <div>Curso não encontrado</div>;

  return (
    <div>
      <h1>{curso.nome}</h1>
      <p>ID: {curso.id}</p>
      <p>Coordenador ID: {curso.coordenador_id}</p>
      
      <h2>Turmas deste curso</h2>
      <ul>
        {turmasDoCurso.map(turma => (
          <li key={turma.id}>
            {turma.periodo_id} - {turma.ano}/{turma.semestre}
          </li>
        ))}
      </ul>
    </div>
  );
}