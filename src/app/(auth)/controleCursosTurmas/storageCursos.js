// storageCursos.js

const KEY = "cursos";

// Pega todos os cursos
export function getCursos() {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}

// Salva (cria ou atualiza) um curso
export function saveCurso(curso) {
  const cursos = getCursos();
  const index = cursos.findIndex((c) => c.id === curso.id);

  if (index >= 0) {
    cursos[index] = curso; // Atualiza
  } else {
    cursos.push(curso); // Cria
  }

  localStorage.setItem(KEY, JSON.stringify(cursos));
}

// Pega um curso específico pelo ID
export function getCursoById(id) {
  const cursos = getCursos();
  return cursos.find((c) => c.id === id);
}

// Deleta um curso pelo ID
export function deleteCurso(id) {
  const cursos = getCursos();
  const novosCursos = cursos.filter((c) => c.id !== id);
  localStorage.setItem(KEY, JSON.stringify(novosCursos));
}
