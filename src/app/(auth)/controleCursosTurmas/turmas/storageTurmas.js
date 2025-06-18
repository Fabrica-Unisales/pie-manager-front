// storageTurmas.js

const KEY = "turmas";

// Pega todas as turmas
export function getTurmas() {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}

// Salva (cria ou atualiza) uma turma
export function saveTurma(turma) {
  const turmas = getTurmas();
  const index = turmas.findIndex((t) => t.id === turma.id);

  if (index >= 0) {
    turmas[index] = turma; // Atualiza
  } else {
    turmas.push(turma); // Cria
  }

  localStorage.setItem(KEY, JSON.stringify(turmas));
}

// Pega uma turma específica pelo ID
export function getTurmaById(id) {
  const turmas = getTurmas();
  return turmas.find((t) => t.id === id);
}

// Deleta uma turma pelo ID
export function deleteTurma(id) {
  const turmas = getTurmas();
  const novasTurmas = turmas.filter((t) => t.id !== id);
  localStorage.setItem(KEY, JSON.stringify(novasTurmas));
}
