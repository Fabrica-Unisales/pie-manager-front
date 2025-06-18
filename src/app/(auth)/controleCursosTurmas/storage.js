import { jsx } from "react/jsx-runtime";

const STORAGE_KEY = "cursos_turmas";

// BUSCA TODOS OS CURSOS E TURMAS
export const getCursosTurmas = () => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// ADICIONA UM NOVO CURSO OU UMA NOVA TURMA
export const addCursoTurma = (novo) => {
  const data = getCursosTurmas();
  data.push(novo);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// ATUALIZA UM CURSO OU UMA TURMA EXISTENTE
export const atualizaCursoTurma = (id, atualizado) => {
  const data = getCursosTurmas();
  const index = data.findIndex((item) => item.id === id);
  if (index !== -1) {
    data[index] = atualizado;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
};

// DELETA UM CURSO OU UMA TURMA
export const deletarCursoTurma = (id) => {
  const data = getCursosTurmas();
  const filtrado = data.filter((item) => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtrado));
};

// BUSCA UM CURSO OU UMA TURMA ESPECÍFICA PELO ID
export const getCursoTurmaPorId = (id) => {
  const data = getCursosTurmas();
  return data.find((item) => item.id === id);
};
