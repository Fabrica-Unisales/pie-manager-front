
const STORAGE_KEY = "turmas";

// Buscar todas as turmas
export function getTurmas() {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// Buscar turma por ID
export function getTurmaById(id) {
  const turmas = getTurmas();
  return turmas.find((t) => t.id === id);
}

// Adicionar turma
export function addTurma(turma) {
  const turmas = getTurmas();
  turmas.push(turma);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(turmas));
}

// Atualizar turma
export function updateTurma(id, turmaAtualizada) {
  const turmas = getTurmas();
  const index = turmas.findIndex((t) => t.id === id);
  if (index !== -1) {
    turmas[index] = turmaAtualizada;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(turmas));
  }
}

// Remover turma
export function deleteTurma(id) {
  const turmas = getTurmas();
  const filtradas = turmas.filter((t) => t.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtradas));
}
