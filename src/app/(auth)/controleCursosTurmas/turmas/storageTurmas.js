import { MOCK_TURMAS } from "@/mocks/mockTurmas";

const STORAGE_KEY = "turmas";

export function listarTurmas() {
  if (typeof window === "undefined") return [];

  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    return JSON.parse(data);
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_TURMAS));
    return MOCK_TURMAS;
  }
}

export function salvarTurma(turma) {
  const turmas = listarTurmas();
  const index = turmas.findIndex((t) => t.id === turma.id);
  if (index !== -1) {
    turmas[index] = turma;
  } else {
    turmas.push(turma);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(turmas));
}

export function removerTurma(id) {
  const turmas = listarTurmas();
  const atualizados = turmas.filter((t) => t.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(atualizados));
}

export function getTurmaById(id) {
  const turmas = listarTurmas();
  return turmas.find((t) => t.id === id);
}

export function updateTurma(id, turmaAtualizada) {
  const turmas = listarTurmas();
  const index = turmas.findIndex((t) => t.id === id);
  if (index !== -1) {
    turmas[index] = turmaAtualizada;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(turmas));
  }
}
