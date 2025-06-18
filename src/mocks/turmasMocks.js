// src/mocks/turmasMocks.js
import { usuariosMocks } from './usuariosMocks';
import { cursosMocks } from './cursosMocks';

const turmasSemCursoNome = [
  {
    id: 1,
    curso_id: 'TADS_MATUTINO',
    periodo_id: 1,
    ano: 2025,
    semestre: 1,
    professor: usuariosMocks.find(u => u.id === 3),
    listaAlunos: usuariosMocks.filter(u => [5, 6, 10].includes(u.id)),
  },
  {
    id: 2,
    curso_id: 'ADS_VESPERTINO',
    periodo_id: 2,
    ano: 2025,
    semestre: 2,
    professor: usuariosMocks.find(u => u.id === 9),
    listaAlunos: usuariosMocks.filter(u => [8, 1].includes(u.id)),
  },
  {
    id: 3,
    curso_id: 'TADS_NOTURNO',
    periodo_id: 1,
    ano: 2025,
    semestre: 1,
    professor: usuariosMocks.find(u => u.id === 3),
    listaAlunos: usuariosMocks.filter(u => [10, 5].includes(u.id)),
  },
  {
    id: 4,
    curso_id: 'SI_NOTURNO',
    periodo_id: 2,
    ano: 2025,
    semestre: 2,
    professor: usuariosMocks.find(u => u.id === 9),
    listaAlunos: usuariosMocks.filter(u => [6, 1].includes(u.id)),
  },
  {
    id: 5,
    curso_id: 'ENG_MATUTINO',
    periodo_id: 1,
    ano: 2025,
    semestre: 1,
    professor: usuariosMocks.find(u => u.id === 3),
    listaAlunos: usuariosMocks.filter(u => [8, 1].includes(u.id)),
  },
];

export const turmasMocks = turmasSemCursoNome.map(turma => {
  const curso = cursosMocks.find(c => c.id === turma.curso_id);
  return {
    ...turma,
    curso_nome: curso?.nome || 'Curso não encontrado',
  };
});
